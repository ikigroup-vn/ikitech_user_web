import { data } from "jquery";
import React, { Component } from "react";
import getChannel, { IKITECH, IKIPOS } from "../../ultis/channel";
import { filter_var, filter_arr, format } from "../../ultis/helpers";
import Modal from "./ModalPaymentPos";
import * as Types from "../../constants/ActionType"
import { connect } from "react-redux";

class TotalBill extends Component {
    constructor(props) {
        super(props);
        this.state = {
            check: false
        }
    }



    changeStatus = (status) => {
        this.setState({ check: status });
        this.props.resetCalculate({
            type: Types.GET_CALCULATE,
            data: {},
        })
        this.props.check(status)
    }

    checkRefundAll = (list_items) => {
        var check = true;
        for (const element of list_items) {
            if (Number(element.quantity) - Number(element.total_refund) > 0) {
                return check = false;
            }
        }
        return check

    }
    changeStatusModal = (statusCode, name) => {
        this.props.handleUpdateStatusOrder({ order_status_code: statusCode, statusName: name })
    }

    render() {
        var { bill } = this.props
        var shipper_name = bill.shipper_name
        var total_shipping_fee = bill.total_shipping_fee || 0
        var product_discount_amount = bill.product_discount_amount || 0
        var voucher_discount_amount = bill.voucher_discount_amount || 0
        var discount = bill.discount || 0
        var combo_discount_amount = bill.combo_discount_amount || 0
        console.log(combo_discount_amount, combo_discount_amount > 0)
        var total_final = bill.total_final
        var agree = bill.order_status_code == "WAITING_FOR_PROGRESSING" ? "show" : "hide"
        var cancel = bill.order_status_code != "WAITING_FOR_PROGRESSING" ? "show" : "hide"
        var disable = this.props.order_allow_change_status == true ? "show" : "hide"
        var list_items = filter_arr(bill.line_items);

        console.log(agree , cancel);
        return (
            <div className="box box-warning cart_wrapper mb0">

                <Modal remaining_amount={bill.remaining_amount} order_code={bill.order_code} store_code={this.props.store_code} ></Modal>
                <div class="card-header py-3"><h6 class="m-0 title_content font-weight-bold text-primary">Tổng tiền</h6></div>

                <div
                    className="box-body table-responsive pt0"
                >

                    <br />
                    <div>
                        <p className="sale_user_label bold bold group-total">
                        <div>Tạm tính</div>
                            <span id="total_selected">{format(bill.total_before_discount || 0)}</span>
                        </p>
                    </div>
                    {total_shipping_fee > 0 && <div id="item_fee">
                        <div className="sale_user_label bold bold group-total">
                        <div>Phí giao hàng:</div>

                              <span>+&nbsp;{format(total_shipping_fee)}</span>
                        </div>
                    </div>
                    }
                    {product_discount_amount > 0 && <div id={`item_fee ${product_discount_amount > 0 ? "show" : "hide"}`}>
                        <div className="sale_user_label bold group-total">
                        <div> Giảm giá sản phẩm: </div>  <span>-&nbsp;{format(product_discount_amount)}</span>
                        </div>
                    </div>
                    }
                    {combo_discount_amount > 0 && <div id={`item_fee ${combo_discount_amount > 0 ? "show" : "hide"}`}>
                        <div className="sale_user_label bold  group-total" bold group-total>
                        <div>Giảm giá Combo:</div>

                              <span>- {format(combo_discount_amount)}</span>
                        </div>
                    </div>
                    }
                    {voucher_discount_amount > 0 && <div id={`item_fee ${voucher_discount_amount > 0 ? "show" : "hide"}`}>
                        <div className="sale_user_label bold bold group-total">
                        <div>Giảm giá Voucher:</div>

                              <span>-&nbsp;{format(voucher_discount_amount)}</span>
                        </div>
                    </div>
                    }
                    {discount > 0 && <div id={`item_fee ${discount > 0 ? "show" : "hide"}`}>
                        <div className="sale_user_label bold bold group-total">
                        <div> Chiết khấu:</div>

                             <span>-&nbsp;{format(discount)}</span>
                        </div>
                    </div>
                    }

                    {bill.bonus_points_amount_used != null && bill.bonus_points_amount_used != 0 && <div>
                        <p className="sale_user_label bold bold group-total">
                        <div> Giảm giá xu:</div>

                            <span className="cart_payment_method">-&nbsp;{format(bill.bonus_points_amount_used)}
                            </span>
                        </p>
                    </div>
                    }
                    {bill.order_code_refund && <div>
                        <p className="sale_user_label bold bold group-total">
                        <div>Đã thanh toán:</div>

                            <span className="cart_payment_method">
                                {format(bill.total_final - bill.remaining_amount)}
                            </span>
                        </p>
                    </div>}
                    {/* <div>
                        <p className="sale_user_label bold">
                            Còn lại:{" "}
                            <span className="cart_payment_method">
                                {format(bill.remaining_amount)}
                            </span>
                        </p>
                    </div> */}

                    {
                        total_final > 0 && <div>
                            <p className="sale_user_label bold bold group-total">
                            <div> Thành tiền:</div>

                                <span className="cart_payment_method">
                                    {format(total_final
                                    )}
                                </span>
                            </p>
                        </div>

                    }


                    {
                        (getChannel() == IKIPOS || bill.order_from == 2 || bill.order_from == null) && (
                            <React.Fragment>
                                {/* <div>
                                <p className="sale_user_label bold">
                                    Đã thanh toán:{" "}
                                    <span className="cart_payment_method">
                                        {format(bill.total_money_refund)}

                                    </span>
                                </p>
                            </div> */}

                                <div>
                                    <p className="sale_user_label bold bold group-total">
                                    <div>Còn nợ:</div>

                                        <span className="cart_payment_method">
                                            {format(bill.remaining_amount)}

                                        </span>
                                    </p>
                                </div>
                            </React.Fragment>

                        )
                    }
                    {
                        bill.order_status_code !== "USER_CANCELLED" && bill.order_status_code !== "CUSTOMER_CANCELLED" &&
                    
                 
                            <div style={{ textAlign: "center" }}>
                                {
                                   ( bill.payment_status_code == "UNPAID" || bill.payment_status_code == "PARTIALLY_PAID")  ?

                                        (<a
                                            data-target="#modalPayment"
                                            data-toggle="modal"

                                            style={{ color: "white", background: "rgb(229, 111, 37)" }}
                                            id="sale_btn_accepted"
                                            className={`sale_btn_action sale_btn_action_10 btn btn-secondary w100p `}



                                        > Thanh toán còn lại
                                        </a>)

                                        :
                                        (
                                            bill.order_code_refund != null || this.checkRefundAll(list_items) == true ? (
                                                <a
                                                    style={{ color: "white" }}
                                                    id="sale_btn_accepted"
                                                    className={`sale_btn_action sale_btn_action_10 btn btn-secondary w100p ${cancel} `}
                                                > Đã hoàn hết sản phẩm</a>
                                            ) :
                                                (this.state.check == true ? (<a
                                                    style={{ color: "white" }}
                                                    id="sale_btn_accepted"
                                                    className={`sale_btn_action sale_btn_action_10 btn btn-secondary w100p ${cancel} `}

                                                    onClick={() => { this.changeStatus(false) }}

                                                >
                                                    Hủy
                                                </a>) : (<a
                                                    style={{ color: "white" }}
                                                    id="sale_btn_accepted"
                                                    className={`sale_btn_action sale_btn_action_10 btn btn-danger w100p ${cancel} `}

                                                    onClick={() => { this.changeStatus(true) }}

                                                >
                                                    Hoàn tiền
                                                </a>)
                                                )
                                        )

                                }






                            </div>
    }
                        

                    
                    {
                        getChannel() == IKITECH && bill.order_status_code !== "USER_CANCELLED" && bill.order_status_code !== "CUSTOMER_CANCELLED" && (
                            <div style={{ textAlign: "center" }}>


                                {
                                    bill.order_from !== 2 && bill.order_from !== null && bill.order_status_code !== "USER_CANCELLED" && bill.order_status_code !== "CUSTOMER_CANCELLED"  && bill.payment_status_code !== "UNPAID"&& bill.payment_status_code != "REFUNDS" && bill.payment_status_code !== "PARTIALLY_PAID" && bill.payment_status_code !== "PAID" &&
                                    (
                                        <React.Fragment>
                                            <a
                                                id="sale_btn_accepted"
                                                className={`sale_btn_action sale_btn_action_10 btn btn-info w100p ${agree} `}
                                                data-toggle="modal"
                                                data-target="#postModal"
                                                onClick={() => { this.changeStatusModal("PACKING", "Đang chuẩn bị hàng") }}
                                            >
                                                <i className="fa fa-check" /> Phê duyệt
                                            </a>

                                            <a
                                                id="sale_btn_accepted"
                                                className={`sale_btn_action sale_btn_action_10 btn btn-danger w100p ${cancel}`}
                                                data-toggle="modal"
                                                data-target="#postModal"
                                                onClick={() => { this.changeStatusModal("USER_CANCELLED", "Shop đã hủy") }}

                                            >
                                                <i className="fa fa-times" /> Hủy đơn
                                            </a>
                                        </React.Fragment>
                                    )

                                }

                                {/* {
                                     bill.order_from !== 2 && bill.order_from !== null && (bill.order_status_code == "USER_CANCELLED" || bill.order_status_code == "CUSTOMER_CANCELLED") &&  bill.payment_status_code !== "UNPAID" && bill.payment_status_code !== "PARTIALLY_PAID" &&
                                    (
                                        <React.Fragment>

                                            <a
                                                style={{ background: "#8f9392", color: "white" }}
                                                disabled
                                                id="sale_btn_accepted dis"
                                                className={`sale_btn_action sale_btn_action_10 btn btn-danger w100p ${cancel}`}


                                            >
                                                <i className="fa fa-times" /> Hủy đơn
                                            </a>
                                        </React.Fragment>
                                    )

                                } */}




                            </div>
                        )

                    }

                </div>
            </div >

        );
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {

        resetCalculate: (data) => {
            dispatch(data);

        }

    };
};
export default connect(null, mapDispatchToProps)(TotalBill);