import { data } from "jquery";
import React, { Component } from "react";
import * as billAction from "../../actions/bill"
import { connect } from "react-redux";
import ChooseShipper from "./ChooseShipper";

class InfoShipper extends Component {
    constructor(props) {
        super(props);
    }


    changeStatus = (statusCode, name) => {
        this.props.handleUpdateStatusOrder({ order_status_code: statusCode, statusName: name })
    }

    sendOrderToDelivery = () => {
        var { bill, order_code, store_code } = this.props

        this.props.sendOrderToDelivery(null, store_code, bill.id, order_code);
    }

    componentDidMount() {

      
    
      }


    render() {
        var { bill, historyDeliveryStatus } = this.props
        var shipper_name = bill.shipper_name
        var agree = bill.order_status_code == "WAITING_FOR_PROGRESSING" ? "show" : "hide"
        var disable = this.props.order_allow_change_status == true ? "show" : "hide"

        if(bill.partner_shipper_id === null) {
            return <ChooseShipper bill={bill} store_code={this.props.store_code} order_code = {bill.order_code}/>
        }

        return (
            bill.sent_delivery == false ? <div className="box box-warning cart_wrapper mb0">

                <div class="card-header py-3"><h6 class="m-0 title_content font-weight-bold text-primary">Giao vận</h6></div>

                <div
                    className="box-body table-responsive pt0"
                >

                    <div className="m-3">
                        <p className="sale_user_label bold">
                            Đơn vị vận chuyển: <span id="total_before">{shipper_name}</span>
                        </p>
                    </div>
                    <div style={{ textAlign: "center" }}>


                        <div class="m-3">
                            <button type="button" onClick={() => this.sendOrderToDelivery()} className="btn btn-primary  btn-sm" style={{ marginRight: '10px' }}>
                                <i className="fas fa-location-arrow" />&nbsp;Đăng đơn hàng</button>
                        </div>
                    </div>

                    <p class="text-justify text-center" style={{
                        fontSize: 13
                    }}>   Chuyển đơn hàng sang đơn vị vận chuyển</p>

                </div>
            </div> :

                <div className="box box-warning cart_wrapper mb0">

                    <div class="card-header py-3"><h6 class="m-0 title_content font-weight-bold text-primary">Trạng thái giao vận</h6></div>

                    <div
                        className="box-body table-responsive pt0"
                    >

                        <div className="mt-3">
                            <p className="sale_user_label bold" style={{ color: "grey" }}>
                                Đơn vị vận chuyển: <span id="total_before">{shipper_name}</span>
                            </p>
                        </div>

                        {
                            historyDeliveryStatus.map((history) =>

                                <div id="item_fee">
                                    <div className="sale_user_label bold">
                                        {history.status_text} <span> {history.time}</span>
                                    </div>
                                </div>

                            )
                        }


                    </div>
                </div>


        );
    }
}

const mapStateToProps = (state) => {
    return {
        historyDeliveryStatus: state.billReducers.bill.historyDeliveryStatus,
    };
};
const mapDispatchToProps = (dispatch, props) => {
    return {
        sendOrderToDelivery: (data, store_code, billId, order_code) => {
            dispatch(billAction.sendOrderToDelivery(data, store_code, billId, order_code));
        },

    };
};
export default connect(mapStateToProps, mapDispatchToProps)(InfoShipper);