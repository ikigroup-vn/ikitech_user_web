import { data } from "jquery";
import React, { Component } from "react";
import * as billAction from "../../actions/bill"
import { connect } from "react-redux";
import ChooseShipper from "./ChooseShipper";
import moment from "moment"
class InfoShipper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shipperId : ""
        }
    }
    


    changeStatus = (statusCode, name) => {
        this.props.handleUpdateStatusOrder({ order_status_code: statusCode, statusName: name })
    }

    sendOrderToDelivery = () => {
        var { bill, order_code, store_code } = this.props
        
        this.props.sendOrderToDelivery(null, store_code, bill.id, order_code , "SHIPPING");
    }

    componentDidMount() {

        if (this.props.bill?.partner_shipper_id) {
            this.setState({ shipperId: this.props.bill?.partner_shipper_id })
        }

    }

    showShipment = () => {
        var result = null
        var { shipment } = this.props
        console.log("van chuyen",shipment)
        if (shipment?.length > 0) {
            result = shipment.map((data) => {
               return <option value={data.id}>{data.name}</option>

            })
        }
        return result
    }
    onChangeShipper = (e) => {
        var { value } = e.target;
        this.setState({ shipperId: value })
        var { bill, order_code, store_code } = this.props
        if (value == "") {
            this.setState({
                error: "Chưa chọn phương thức vận chuyển"
            })
            return
        }
        this.props.updateOrder({
            partner_shipper_id: value
        }, store_code, order_code)
    }


    render() {
        var { bill, historyDeliveryStatus } = this.props
        var shipper_name = bill.shipper_name
        var agree = bill.order_status_code == "WAITING_FOR_PROGRESSING" ? "show" : "hide"
        var disable = this.props.order_allow_change_status == true ? "show" : "hide"

        // if(bill.partner_shipper_id === null) {
        //     return <ChooseShipper bill={bill} store_code={this.props.store_code} order_code = {bill.order_code}/>
        // }

        return (
            bill.sent_delivery == false ? <div className="box box-warning cart_wrapper mb0">

                <div class="card-header py-3"><h6 class="m-0 title_content font-weight-bold text-primary">Giao vận</h6></div>

                <div
                    className="box-body table-responsive pt0"
                >

                    <div >
                        <p className="sale_user_label bold">
                            Đơn vị vận chuyển:
                            <select name="shipperId" id="input" class="form-control" required=""
                                onChange={this.onChangeShipper}
                                value={this.state.shipperId}
                            >
                                <option value="">---Chọn đơn vị vận chuyển---</option>

                                {
                                    this.showShipment()
                                }

                            </select>
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
                                Đơn vị vận chuyển: 
                            </p>
                            <div id="total_before">{shipper_name}</div>
                        </div>

                        {
                            historyDeliveryStatus.map((history) =>

                                <div id="item_fee">
                                    <div className="sale_user_label bold">
                                        {history.status_text}:
                                    </div>
                                    <div >
                                        <span> {moment(history.time).format("DD-MM-YYYY HH:mm")}</span>
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
        shipment : state.shipmentReducers.shipment.allShipment,

    };
};
const mapDispatchToProps = (dispatch, props) => {
    return {
        sendOrderToDelivery: (data, store_code, billId, order_code , order_status_code) => {
            dispatch(billAction.sendOrderToDelivery(data, store_code, billId, order_code , order_status_code));
        },
        updateOrder: (data, store_code, order_code) => {
            dispatch(billAction.updateOrder(data, store_code, order_code));
        },
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(InfoShipper);