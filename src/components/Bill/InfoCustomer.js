import { data } from "jquery";
import React, { Component } from "react";
import getChannel, { IKIPOS, IKITECH } from "../../ultis/channel";
import getNamePaymentMethod from "../../ultis/payment_method";
import { filter_var, filter_arr, format } from "../../ultis/helpers";
import payment_method from "../../ultis/payment_method";

class InfoCustomer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        var { bill } = this.props
        var { payment_method_id } = bill
        var customer = bill.customer;
        var name = typeof customer == "undefined" || customer == null ? null : customer.name
        var orderTime = bill.created_at;
        var note = bill.customer_note == null ? "" : bill.customer_note
        var payment = bill.payment_method_name;
        var { customer_address } = bill;
        var phone_number = typeof customer_address == "undefined" ? null : customer_address.phone
        var email = typeof customer_address == "undefined" ? null : customer_address.email

        var address_detail = typeof customer_address == "undefined" ? null : customer_address.address_detail
        var wards_name = typeof customer_address == "undefined" ? null : customer_address.wards_name
        var district_name = typeof customer_address == "undefined" ? null : customer_address.district_name
        var province_name = typeof customer_address == "undefined" ? null : customer_address.province_name
        var name_receipt = typeof customer_address == "undefined" ? null : customer_address.name


        return (
            <div
                class="tab-pane active"
                id="duck"
                role="tabpanel"
                aria-labelledby="duck-tab"
            >
                <div class="row col-md-12 col-xs-12 form-group">
                    <div class="info_user" style={{ marginTop: "20px" }}>
                        {bill.from_pos == true && <p class="sale_user_label" id="sale_user_name">
                            <b>Đơn này từ IKIPOS (POS)</b>
                        </p>}
                        <p class="sale_user_label" id="sale_user_name">
                            Khách hàng: <span id="user_name">{name}</span>
                        </p>

                        {
                            getChannel() == IKITECH &&
                            <div> <p class="sale_user_label" id="sale_user_name">
                                Người nhận : <span id="user_name">{name_receipt}</span>
                            </p>
                                <p class="sale_user_label" id="delivery_address">
                                    Địa chỉ nhận: <span id="user_address">{address_detail}, {wards_name}, {district_name}, {province_name}</span>
                                </p>
                            </div>

                        }



                        <p class="sale_user_label">
                            Điện thoại: <span id="user_tel">{phone_number}</span>
                        </p>
                        <p class="sale_user_label">
                            Email: <span id="user_tel">{email}</span>
                        </p>
                        <p class="sale_user_label" id="booking_time">
                            Thời gian: <span id="booking_time_txt">{orderTime}</span>
                        </p>
                        <p class="sale_user_label">
                            Ghi chú: <span id="user_note">{note}</span>
                        </p>

                        {
                            getChannel() == IKIPOS &&
                            <p class="sale_user_label">
                                Phương thức thanh toán:
                                <span class="cart_payment_method">{getNamePaymentMethod(payment_method_id)}</span>

                            </p>
                        }

                        {
                            getChannel() == IKITECH &&
                            <p class="sale_user_label">
                                Thanh toán:
                                <span class="cart_payment_method">{payment}</span>

                            </p>
                        }
                    </div>

                </div>

            </div>
        );
    }
}

export default InfoCustomer;
