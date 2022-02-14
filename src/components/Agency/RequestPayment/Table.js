import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as Env from "../../../ultis/default";
import * as helper from "../../../ultis/helpers";
import { shallowEqual } from "../../../ultis/shallowEqual";
import { format } from "../../../ultis/helpers";
class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrayCheckBox: [],
            from: 0,
            isLoading: false

        }
    }



    showChatBox = (agencyId, status) => {
        this.props.handleShowChatBox(agencyId, status);
    };
    componentDidUpdate(prevProps, prevState) {
        if (
            (!shallowEqual(prevProps.requestPayment, this.props.requestPayment) &&
                prevProps.requestPayment.length == 0) || (this.state.isLoading == false && prevProps.tabId != 1)

        ) {
            helper.loadExpandTable();
            if (this.props.paramId != null) {
                window.$(`.agency-${this.props.paramId}`).trigger('click')

            }

            this.setState({ isLoading: true })
        }
    }
    changeStatusRequest = (status) => {
        var name = status == 1 ? "Thanh toán cho CTV" : "Hoàn tiền cho CTV"
        var { arrayCheckBox } = this.state
        this.props.handleChangeStatus(name, { status: status, list_id: arrayCheckBox })
    }
    onchangeSelect = (e) => {
        console.log(e.target.value)
        this.setState({ from: e.target.value })
    }
    onchangeCheckBox = (e) => {
        var value = e.target.value
        var checked = e.target.checked
        console.log(checked)
        var arrayCheckBox = [...this.state.arrayCheckBox]
        if (checked == true) {
            arrayCheckBox.push(value)
            this.setState({ arrayCheckBox: arrayCheckBox })

        }
        else {
            arrayCheckBox.forEach((element, index) => {
                console.log(element);
                if (element == value) {
                    arrayCheckBox.splice(index, 1)
                }
            });
            this.setState({ arrayCheckBox: arrayCheckBox })

        }

    }
    checkExsit = (id) => {
        for (const item of this.state.arrayCheckBox) {
            if (item == id) {
                return true
            }
        }
        return false
    }
    showData = (requestPayment) => {
        var { store_code } = this.props;
        var result = [];
        if (requestPayment.length > 0) {
            requestPayment.forEach((data, index) => {
                var avatar =
                    data.agency.customer.avatar_image == null
                        ? Env.IMG_NOT_FOUND
                        : data.agency.customer.avatar_image;
                var img_front =
                    data.agency.front_card == null
                        ? Env.IMG_NOT_FOUND
                        : data.agency.front_card;
                var img_back =
                    data.agency.back_card == null
                        ? Env.IMG_NOT_FOUND
                        : data.agency.back_card;
                var checked = this.checkExsit(data.id)

                var address_default = ""

                if (data.agency.customer != null && typeof data.agency.customer != "undefined") {
                    if (typeof data.agency.customer.default_address === 'object' && data.agency.customer.default_address !== null) {
                        if (data.agency.customer.default_address.address_detail !== null && data.agency.customer.default_address.address_detail !== "") {
                            address_default = address_default + data.agency.customer.default_address.address_detail + ", "
                        }
                        if (data.agency.customer.default_address.wards_name !== null && data.agency.customer.default_address.wards_name !== "") {
                            address_default = address_default + data.agency.customer.default_address.wards_name + ", "
                        }
                        if (data.agency.customer.default_address.district_name !== null && data.agency.customer.default_address.district_name !== "") {
                            address_default = address_default + data.agency.customer.default_address.district_name + ", "
                        }
                        if (data.agency.customer.default_address.province_name !== null && data.agency.customer.default_address.province_name !== "") {
                            address_default = address_default + data.agency.customer.default_address.province_name
                        }
                    }
                }
                if (data.from == this.state.from)
                    result.push(
                        <React.Fragment>
                            <tr class="sub-container">
                                <td>
                                    <div class="checkbox">
                                        <label>
                                            <input type="checkbox"
                                                checked={checked}
                                                onChange={this.onchangeCheckBox}
                                                value={data.id} />
                                        </label>
                                    </div>
                                </td>
                                <td>
                                    <button

                                        type="button"
                                        style={{ width: "25px" }}
                                        className={`btn-success exploder agency-${data.id}`}
                                    >
                                        <span class="fa fa-plus"></span>
                                    </button>
                                </td>{" "}
                                <td>
                                    <img
                                        src={avatar}
                                        class="img-responsive"
                                        width="100px"
                                        height="115px"
                                        alt="Image"
                                    />
                                </td>

                                <td>{data.agency.customer.name}</td>
                                <td>{data.agency.customer.phone_number}</td>
                                <td>{data.agency.cmnd}</td>
                                <td>
                                    {data.agency.customer.email == null
                                        ? "Trống"
                                        : data.agency.customer.email}
                                </td>
                                <td>{format(Number(data.money))}</td>

                            </tr>
                            <tr class="explode hide" style={{ background: "rgb(200 234 222)" }}>
                                <td colSpan={9}>
                                    <div class="row">
                                        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                            <div class="info_user">
                                                <p class="sale_user_label">
                                                    Số tài khoản:{" "}
                                                    <span id="user_tel">
                                                        {data.agency.account_number} -{" "}
                                                        {data.agency.bank}{" "}
                                                    </span>
                                                </p>
                                                <p class="sale_user_label">
                                                    Tên chủ tài khoản:{" "}
                                                    <span id="user_tel">
                                                        {data.agency.account_name}
                                                    </span>
                                                </p>
                                                <p class="sale_user_label">
                                                    Tiền thưởng:{" "}
                                                    <span id="user_tel">
                                                        {format(Number(data.agency.balance))}
                                                    </span>
                                                </p>
                                                <p class="sale_user_label">
                                                    Số điểm:{" "}
                                                    <span id="user_tel">
                                                        {data.agency.customer.points == null ? null : new Intl.NumberFormat().format(data.agency.customer.points.toString())}
                                                    </span>
                                                </p>

                                                <p class="sale_user_label" id="sale_user_name">
                                                    CMND:{" "}
                                                    <span id="user_name"> {data.agency.cmnd} </span>
                                                </p>
                                                <p class="sale_user_label" id="sale_user_name">
                                                    Nơi đăng kí:{" "}
                                                    <span id="user_name">
                                                        {" "}
                                                        {data.agency.issued_by}{" "}
                                                    </span>
                                                </p>
                                                <p class="sale_user_label" id="sale_user_name">
                                                    Địa chỉ:{" "}
                                                    <span id="user_name">
                                                        {" "}
                                                        {address_default}{" "}
                                                    </span>
                                                </p>
                                            </div>
                                        </div>
                                        <div class="col-xs-7 col-sm-7 col-md-7 col-lg-7">
                                            <div class="info_user">
                                                <div class="row">
                                                    <div style={{ textAlign: "center" }}>
                                                        <img
                                                            width="120"
                                                            height="125px"
                                                            src={img_front}
                                                            class="img-responsive"
                                                            alt="Image"
                                                        />
                                                        <p class="sale_user_label" id="sale_user_name">
                                                            Mặt trước:
                                                        </p>
                                                    </div>

                                                    <div style={{ textAlign: "center" }}>
                                                        <img
                                                            width="120px"
                                                            height="125px"
                                                            style={{ marginLeft: "10px" }}
                                                            src={img_back}
                                                            class="img-responsive"
                                                            alt="Image"
                                                        />
                                                        <p class="sale_user_label" id="sale_user_name">
                                                            Mặt sau:
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </React.Fragment>
                    );
            });
        } else {
            return result;
        }
        return result;
    };

    render() {
        var { arrayCheckBox, from } = this.state
        var requestPayment = this.props.requestPayment;
        var length = typeof requestPayment != "undefined" && requestPayment.length > 0 ? requestPayment.length : 0
        var disable_group = length == 0 ? "hide" : "show"
        var disable_item = arrayCheckBox.length > 0 ? "show" : "hide"
        var {payment_request_solve} = this.props
        console.log(from);
        return (
            <div className="request-payment">

                <div className="row" style={{ justifyContent: "space-between" }}>
                    <div className={`group-btn ${disable_group}`}>

                        <button
                            class={`btn btn-success btn-sm ${payment_request_solve == true ? "show" : "hide"}`}
                            data-toggle="modal"
                            data-target="#updateModalAllRequest"
                        >
                            <i class="fa fa-list"></i> Quyết toán cho toàn bộ CTV
                        </button>

                        <button
                            onClick={() => this.changeStatusRequest(1)}
                            data-toggle="modal"
                            data-target="#updateModalRequest"
                            style={{ marginLeft: "10px" }}
                            class={`btn btn-danger btn-sm ${disable_item} ${payment_request_solve == true ? "show" : "hide"}`}
                        >
                            <i class="fa fa-money"></i> Hoàn tiền cho CTV
                        </button>

                        <button
                            onClick={() => this.changeStatusRequest(2)}
                            data-toggle="modal"
                            data-target="#updateModalRequest"
                            style={{ marginLeft: "10px" }}

                            class={`btn btn-primary btn-sm ${disable_item} ${payment_request_solve == true ? "show" : "hide"}`}
                        >

                            <i class="fa fa-money"></i> Thanh toán cho CTV
                        </button>
                    </div>
                    <select
                        onChange={this.onchangeSelect}
                        style={{ maxWidth: "20%" }}
                        id="input"
                        class="form-control"
                    >
                        <option value="0" >Theo yêu cầu</option>
                        <option value="1" >Theo lịch</option>

                    </select>

                </div>
                <div class="table-responsive">
                    <table class="table table-border">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Hành động</th>

                                <th>Ảnh</th>

                                <th>Họ tên</th>
                                <th>Số điện thoại</th>
                                <th>CMND</th>
                                <th>Gmail</th>

                                <th>Số tiền</th>

                            </tr>
                        </thead>

                        <tbody>{this.showData(requestPayment)}</tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default Table;
