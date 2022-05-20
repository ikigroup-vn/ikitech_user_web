import React, { Component } from "react";
import { filter_var } from "../../ultis/helpers";
import { connect } from "react-redux";
import * as billAction from "../../actions/bill"
class OrderStatus extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: [
             
                {
                    name: "Đang chuẩn bị hàng",
                    code: "PACKING",
                },
                {
                    name: "Hết hàng",
                    code: "OUT_OF_STOCK",
                },
                {
                    name: "Shop đã hủy",
                    code: "USER_CANCELLED",
                },
                {
                    name: "Khách đã hủy",
                    code: "CUSTOMER_CANCELLED",
                },
                {
                    name: "Đang giao hàng",
                    code: "SHIPPING",
                },
                {
                    name: "Lỗi giao hàng",
                    code: "DELIVERY_ERROR",
                },
                {
                    name: "Đã hoàn thành",
                    code: "COMPLETED",
                },
                {
                    name: "Chờ trả hàng",
                    code: "CUSTOMER_RETURNING",
                },
                {
                    name: "Đã trả hàng",
                    code: "CUSTOMER_HAS_RETURNS",
                }

            ]

        }
    }



    changeStatus = (statusCode , name) => {
        var disable = this.props.order_allow_change_status
        if(disable == false)
        return
        this.props.handleUpdateStatusOrder({order_status_code : statusCode , statusName : name} )
    }

    showOrderStatus = (status) => {
        var orderStatus = this.state.status
        var result = null;
        if (orderStatus.length > 0) {
            var disable = this.props.order_allow_change_status == true ? "modal" : ""

            result = orderStatus.map((item, index) => {
                var active = item.code == status ? "active_status" : ""
                if(active != "")
                {
                    return (
                        <li class={`${active} hover-product`}>
                            <a >{item.name}</a>
                        </li>
                    )
                }
                else{
                    return (
                        <li 
                        data-toggle={disable}
                        data-target="#postModal"
                        class={`${active} hover-product`} onClick={() => { this.changeStatus(item.code , item.name) }}>
                            <a >{item.name}</a>
                        </li>
                    )
                }
                
            });
        } else {
            return result;
        }
        return result;
    };



    render() {
        var { bill , showBoard } = this.props
        var status = filter_var(bill.order_status_code);
        var disable = this.props.order_allow_change_status == true ? "" : "#cac4c4"

        return (
            <nav class="left-nav hidden-xs hidden-sm hidden-md">
                <ul class="nolist" style = {{minHeight : "250px"}}>
                    <li style={{ background: "rgb(31 178 151)" }} class="">
                        <a >Trạng thái đơn hàng</a>

                    </li>
                    <li style={{
                        maxHeight: "340px",
                        overflow: "auto",
                        background : disable
                    }}>
                        
                        {showBoard == true && this.showOrderStatus(status)}

                    </li>

                </ul>
            </nav>


        );
    }
}

const mapStateToProps = (state) => {
    return {
        bill: state.billReducers.bill.billID,
        auth: state.authReducers.login.authentication,
        billHistoty: state.billReducers.bill.billHistory
    };
};
const mapDispatchToProps = (dispatch, props) => {
    return {
        updateStatusOrder: (data,store_code, billId,order_code) => {
            dispatch(billAction.updateStatusOrder(data,store_code, billId,order_code));
        },

    };
};
export default connect(mapStateToProps, mapDispatchToProps)(OrderStatus);