import React, { Component } from "react";
import { Link } from "react-router-dom";
import getChannel, { IKITECH } from "../../ultis/channel";
import * as Env from "../../ultis/default"

class BadgeTable extends Component {
    constructor(props) {
        super(props);
    }



    render() {

        var { store_code , badges } = this.props
        var numOrderWaiting = badges.orders_waitting_for_progressing
        var numOrderPacking = badges.orders_packing
        var numOrderShipping = badges.orders_shipping
        var numUnread = badges.chats_unread
        var numVoucher = badges.voucher_total
        var numDiscount = badges.products_discount
        var numReview = badges.reviews_no_process 
        

        var statusOrderWaiting = numOrderWaiting == 0 || numOrderWaiting == null ? "hide-badge" : "active-badge"
        var statusOrderPacking = numOrderPacking == 0 || numOrderPacking == null ? "hide-badge" : "active-badge"
        var statusOrderShipping = numOrderShipping == 0 || numOrderShipping == null ? "hide-badge" : "active-badge"
        var statusUnread = numUnread == 0 || numUnread == null ? "hide-badge" : "active-badge"
        var statusVoucher = numVoucher == 0 || numVoucher == null ? "hide-badge" : "active-badge"
        var statusDiscount = numDiscount == 0 || numDiscount == null ? "hide-badge" : "active-badge"
        var statusReview = numReview == 0 || numReview == null ? "hide-badge" : "active-badge"


        return (
            <div class="form-group" style={{ fontSize: "15px" }}>
                <div class="info-badge" >
                    <p class="" id="sale_user_name">
                        <Link to={`/order/${store_code}/WAITING_FOR_PROGRESSING`}>Đơn hàng đang chờ xử lý </Link> <span id="user_name">
                            <span
                              
                                className={`step num-badge ${statusOrderWaiting}`}
                            >
                                {numOrderWaiting}
                            </span>
                           
                        </span>
                    </p>
                    <p class="" id="delivery_address">
                        <Link to={`/order/${store_code}/PACKING`}>Đơn hàng đang chuẩn bị</Link> <span id="user_address">
                              <span
                              
                                className={`step num-badge ${statusOrderPacking}`}
                            >
                                {numOrderPacking}
                            </span>
                        </span>
                    </p>
                    <p class="">
                        <Link to={`/order/${store_code}/SHIPPING`}> Đơn hàng đang giao</Link> <span id="user_tel">
                              <span
                              
                                className={`step num-badge ${statusOrderShipping}`}
                            >
                                {numOrderShipping}
                            </span>
                        </span>
                    </p>
                    <p class="">
                        <Link to={`/chat/${store_code}`}>Tin nhắn chưa đọc </Link><span id="user_tel">
                              <span
                              
                                className={`step num-badge ${statusUnread}`}
                            >
                                {numUnread}
                            </span>
                        </span>
                    </p>
                    <p class="" id="booking_time">
                        <Link to={`/voucher/${store_code}`}> Tổng voucher </Link><span id="booking_time_txt">
                              <span
                              
                                className={`step num-badge ${statusVoucher}`}
                            >
                                {numVoucher}
                            </span>
                        </span>
                    </p>
                    <p class="">
                        <Link to={`/discount/${store_code}`}> Giảm giá sản phẩm </Link><span id="user_note">
                              <span
                              
                                className={`step num-badge ${statusDiscount}`}
                            >
                                {numDiscount}
                            </span>
                        </span>
                    </p>

                   {
                       getChannel() == IKITECH &&  <p class="">
                       <Link to={`/review/${store_code}`}>Chưa đánh giá</Link>
                       <span class="cart_payment_method">
                             <span
                             
                               className={`step num-badge ${statusReview}`}
                           >
                               {numReview}
                           </span>
                       </span>
                   </p>
                   }
     
                </div>
            </div>

        );
    }
}

export default BadgeTable;
