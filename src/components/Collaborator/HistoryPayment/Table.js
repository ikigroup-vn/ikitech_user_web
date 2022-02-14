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
        }
    }


    componentDidUpdate(prevProps, prevState) {

            helper.loadExpandTable();
        
    }



    showData = (historyPayment) => {
        var result = [];
        if(typeof historyPayment == "undefined")
        {
            return null
        }
        if (historyPayment.length > 0) {
            historyPayment.forEach((data, index) => {
                var avatar =
                    data.collaborator.customer.avatar_image == null
                        ? Env.IMG_NOT_FOUND
                        : data.collaborator.customer.avatar_image;
                var img_front =
                    data.collaborator.front_card == null
                        ? Env.IMG_NOT_FOUND
                        : data.collaborator.front_card;
                var img_back =
                    data.collaborator.back_card == null
                        ? Env.IMG_NOT_FOUND
                        : data.collaborator.back_card;
                var status = data.status == 0 ? "Đã hủy" : "Đã thanh toán" 
                var _status = data.status == 0 ? "danger" : "success" 
                var address_default = ""

                if(data.collaborator.customer != null && typeof data.collaborator.customer != "undefined")
                {
                    if(typeof data.collaborator.customer.default_address === 'object' && data.collaborator.customer.default_address !== null )
                    {
                      if(data.collaborator.customer.default_address.address_detail !== null && data.collaborator.customer.default_address.address_detail !== "")
                      {
                        address_default =address_default +  data.collaborator.customer.default_address.address_detail + ", "
                      }
                      if(data.collaborator.customer.default_address.wards_name !== null && data.collaborator.customer.default_address.wards_name !== "")
                      {
                        address_default =address_default +  data.collaborator.customer.default_address.wards_name + ", "
                      }
                      if(data.collaborator.customer.default_address.district_name !== null && data.collaborator.customer.default_address.district_name !== "")
                      {
                        address_default =address_default +  data.collaborator.customer.default_address.district_name + ", "
                      }
                      if(data.collaborator.customer.default_address.province_name !== null && data.collaborator.customer.default_address.province_name !== "")
                      {
                        address_default =address_default +  data.collaborator.customer.default_address.province_name
                      }
                    }
                }
                    result.push(
                        <React.Fragment>
                            <tr class="sub-container">
                            
                                <td>
                                    <button
                                        type="button"
                                        style={{ width: "25px" }}
                                        className=" btn-success exploder"
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
                   
                                <td>{data.collaborator.customer.name}</td>
                                <td>{data.collaborator.customer.phone_number}</td>
                                <td>{data.collaborator.cmnd}</td>
                                <td>
                                    {data.collaborator.customer.email == null
                                        ? "Trống"
                                        : data.collaborator.customer.email}
                                </td>
                                <td>
                                    <h5>
                                    <span class={`badge badge-${_status}`}>{status}</span>
                                    </h5>
                                    {}
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
                                                        {data.collaborator.account_number} -{" "}
                                                        {data.collaborator.bank}{" "}
                                                    </span>
                                                </p>
                                                <p class="sale_user_label">
                                                    Tên chủ tài khoản:{" "}
                                                    <span id="user_tel">
                                                        {data.collaborator.account_name}
                                                    </span>
                                                </p>
                                                <p class="sale_user_label">
                                                    Tiền thưởng:{" "}
                                                    <span id="user_tel">
                                                        {format(Number(data.collaborator.balance))}
                                                    </span>
                                                </p>
                                                <p class="sale_user_label">
                                                    Số điểm:{" "}
                                                    <span id="user_tel">
                                                        {data.collaborator.customer.points == null ? null : new Intl.NumberFormat().format(data.collaborator.customer.points.toString())}
                                                    </span>
                                                </p>
                                                <p class="sale_user_label" id="sale_user_name">
                                                    CMND:{" "}
                                                    <span id="user_name"> {data.collaborator.cmnd} </span>
                                                </p>
                                                <p class="sale_user_label" id="sale_user_name">
                                                    Nơi đăng kí:{" "}
                                                    <span id="user_name">
                                                        {" "}
                                                        {data.collaborator.issued_by}{" "}
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
        var historyPayment = this.props.historyPayment;
        return (
            <div className="request-payment">


                <div class="table-responsive">
                    <table class="table table-border">
                        <thead>
                            <tr>
                                <th>Hành động</th>

                                <th>Ảnh</th>

                                <th>Họ tên</th>
                                <th>Số điện thoại</th>
                                <th>CMND</th>
                                <th>Gmail</th>
                                <th>Trạng thái</th>

                                <th>Số tiền</th>

                            </tr>
                        </thead>

                        <tbody>{this.showData(historyPayment)}</tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default Table;
