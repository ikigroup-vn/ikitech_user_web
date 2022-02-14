import React, { Component } from "react";
import * as Env from "../../ultis/default"
import { format } from "../../ultis/helpers"
class BadgeTable extends Component {
    constructor(props) {
        super(props);
    }



    render() {
        var { store_code, overview } = this.props
        var order = typeof overview.data_prime_time != "undefined" ? overview.data_prime_time.details_by_order_status : overview.data_prime_time
        var completed = typeof order != "undefined" && order != null ? format(Number(order.COMPLETED.total_final)) : 0
        var customer_cancelled = typeof order != "undefined" && order != null ? format(Number(order.CUSTOMER_CANCELLED.total_final)) : 0
        var customer_has_return = typeof order != "undefined" && order != null ? format(Number(order.CUSTOMER_HAS_RETURNS.total_final)) : 0
        var customer_returning = typeof order != "undefined" && order != null ? format(Number(order.CUSTOMER_RETURNING.total_final)) : 0
        var delivery_error = typeof order != "undefined" && order != null ? format(Number(order.DELIVERY_ERROR.total_final)) : 0
        var out_of_stock = typeof order != "undefined" && order != null ? format(Number(order.OUT_OF_STOCK.total_final)) : 0
        var packing = typeof order != "undefined" && order != null ? format(Number(order.PACKING.total_final)) : 0
        var shipping = typeof order != "undefined" && order != null ? format(Number(order.SHIPPING.total_final)) : 0
        var user_cancelled = typeof order != "undefined" && order != null ? format(Number(order.USER_CANCELLED.total_final)) : 0
        var waiting_for_progress = typeof order != "undefined" && order != null ? format(Number(order.WAITING_FOR_PROGRESSING.total_final)) : 0

        var count_completed = typeof order != "undefined" && order != null ? order.COMPLETED.total_order_count : 0

        var count_customer_cancelled = typeof order != "undefined" && order != null ? order.CUSTOMER_CANCELLED.total_order_count : 0
        var count_customer_has_return = typeof order != "undefined" && order != null ? order.CUSTOMER_HAS_RETURNS.total_order_count : 0
        var count_customer_returning = typeof order != "undefined" && order != null ? order.CUSTOMER_RETURNING.total_order_count : 0
        var count_delivery_error = typeof order != "undefined" && order != null ? order.DELIVERY_ERROR.total_order_count : 0
        var count_out_of_stock = typeof order != "undefined" && order != null ? order.OUT_OF_STOCK.total_order_count : 0
        var count_packing = typeof order != "undefined" && order != null ? order.PACKING.total_order_count : 0
        var count_shipping = typeof order != "undefined" && order != null ? order.SHIPPING.total_order_count : 0
        var count_user_cancelled = typeof order != "undefined" && order != null ? order.USER_CANCELLED.total_order_count : 0
        var count_waiting_for_progress = typeof order != "undefined" && order != null ? order.WAITING_FOR_PROGRESSING.total_order_count : 0


        var statusCompleted = count_completed == 0 || completed == null ? "hide-badge" : "active-badge"
        var statusCustomerCancel = count_customer_cancelled == 0 || customer_cancelled == null ? "hide-badge" : "active-badge"
        var statusCustomerHasReturn = count_customer_has_return == 0 || customer_has_return == null ? "hide-badge" : "active-badge"
        var statusCustomerReturning = count_customer_returning == 0 || customer_returning == null ? "hide-badge" : "active-badge"
        var statusDeliveryError = count_delivery_error == 0 || delivery_error == null ? "hide-badge" : "active-badge"
        var statusOutOfStock = count_out_of_stock == 0 || out_of_stock == null ? "hide-badge" : "active-badge"
        var statusPacking = count_packing == 0 || packing == null ? "hide-badge" : "active-badge"
        var statusShipping = count_shipping == 0 || shipping == null ? "hide-badge" : "active-badge"
        var statusUserCancel = count_user_cancelled == 0 || user_cancelled == null ? "hide-badge" : "active-badge"
        var statusWaitingForProgress = count_waiting_for_progress == 0 || waiting_for_progress == null ? "hide-badge" : "active-badge"



        return (

            <div class="row" style={{ height: "100%" }}>
                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6" style={{ borderRight: "1px solid #c0bfbf" }}>
                    <div class="form-group" style={{ fontSize: "15px" }}>

                        <div class="info-badge  badge-report" >
                            <p class="" id="sale_user_name">
                                <a >Đã hoàn thành: </a> <span id="user_name">
                                    <span

                                        className="total-final"
                                    >
                                        {completed}
                                    </span>
                                    <span

                                        className={`step num-badge-report ${statusCompleted}`}
                                    >
                                        {count_completed}
                                    </span>

                                </span>
                            </p>
                            <p class="" id="delivery_address">
                                <a >Khách đã hủy: </a> <span id="user_address">
                                    <span

                                        className="total-final"
                                    >
                                        {customer_cancelled}
                                    </span>
                                    <span

                                        className={`step num-badge-report ${statusCustomerCancel}`}
                                    >
                                        {count_customer_cancelled}
                                    </span>

                                </span>
                            </p>
                            <p class="">
                                <a> Đã trả hàng: </a> <span id="user_tel">
                                    <span

                                        className="total-final"
                                    >
                                        {customer_has_return}
                                    </span>
                                    <span

                                        className={`step num-badge-report ${statusCustomerHasReturn}`}
                                    >
                                        {count_customer_has_return}
                                    </span>

                                </span>
                            </p>
                            <p class="">
                                <a >Chò trả hàng: </a><span id="user_tel">
                                    <span

                                        className="total-final"
                                    >
                                        {customer_returning}
                                    </span>
                                    <span

                                        className={`step num-badge-report ${statusCustomerReturning}`}
                                    >
                                        {count_customer_returning}
                                    </span>

                                </span>
                            </p>
                            <p class="" id="booking_time">
                                <a > Lỗi giao hàng: </a><span id="booking_time_txt">
                                    <span

                                        className="total-final"
                                    >
                                        {delivery_error}
                                    </span>
                                    <span

                                        className={`step num-badge-report ${statusDeliveryError}`}
                                    >
                                        {count_delivery_error}
                                    </span>

                                </span>
                            </p>

                        </div>

                    </div>

                </div>

                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <div class="form-group" style={{ fontSize: "15px" }}>
                        <div class="info-badge badge-report" >

                            <p class="">
                                <a > Hết hàng:</a><span id="user_note">
                                    <span

                                        className="total-final"
                                    >
                                        {out_of_stock}
                                    </span>
                                    <span

                                        className={`step num-badge-report ${statusOutOfStock}`}
                                    >
                                        {count_out_of_stock}
                                    </span>

                                </span>
                            </p>

                            <p class="">
                                <a >Đang chuẩn bị hàng:</a>
                                <span class="cart_payment_method">
                                    <span

                                        className="total-final"
                                    >
                                        {packing}
                                    </span>
                                    <span

                                        className={`step num-badge-report ${statusPacking}`}
                                    >
                                        {count_packing
                                        }
                                    </span>

                                </span>
                            </p>

                            <p class="">
                                <a>Đang giao hàng:</a>
                                <span class="cart_payment_method">
                                    <span

                                        className="total-final"
                                    >
                                        {shipping}
                                    </span>
                                    <span

                                        className={`step num-badge-report ${statusShipping}`}
                                    >
                                        {count_shipping}
                                    </span>

                                </span>
                            </p>
                            <p class="">
                                <a >Shop hủy:</a>
                                <span class="cart_payment_method">
                                    <span

                                        className="total-final"
                                    >
                                        {user_cancelled}
                                    </span>
                                    <span

                                        className={`step num-badge-report ${statusUserCancel}`}
                                    >
                                        {count_user_cancelled}
                                    </span>

                                </span>
                            </p>
                            <p class="">
                                <a >Chờ xử lý:</a>
                                <span class="cart_payment_method">
                                    <span

                                        className="total-final"
                                    >
                                        {waiting_for_progress}
                                    </span>
                                    <span

                                        className={`step num-badge-report ${statusWaitingForProgress}`}
                                    >
                                        {count_waiting_for_progress}
                                    </span>

                                </span>
                            </p>
                        </div>
                    </div>

                </div>

            </div>

        );
    }
}

export default BadgeTable;
