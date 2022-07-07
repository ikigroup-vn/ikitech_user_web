import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as Env from "../../../ultis/default";
import * as helper from "../../../ultis/helpers";
import { shallowEqual } from "../../../ultis/shallowEqual";
import { format, randomString } from "../../../ultis/helpers";
import { connect } from "react-redux";
import * as collaboratorAction from "../../../actions/collaborator";
import ModalListReferences from "./ModalListReferences";
import ModalImg from "../ModalImg"
import moment from "moment"
class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadFrist: false,
      referral_phone_number: "",
      modalImg : ""
    };
  }

  showChatBox = (collaboratorId, status) => {
    this.props.handleShowChatBox(collaboratorId, status);
  };

  showReferences = (referral_phone_number) => {
    this.setState({
      referral_phone_number: referral_phone_number
    })
  };

  componentDidMount() {
    this.setState({ loadFrist: true });
  }
  componentDidUpdate(prevProps, prevState) {
    if (
      (!shallowEqual(prevProps.collaborators, this.props.collaborators) &&
        prevProps.collaborators.length == 0) ||
      prevProps.tabId != 1 ||
      prevState.loadFrist != this.state.loadFrist
    ) {
      helper.loadExpandTable();
    }
  }


  onChangeStatus = (e, id) => {
    var checked = !this["checked" + id].checked
    var status = checked == true ? 1 : 0
    this.props.updateCollaborator(this.props.store_code, id, {
      status: status
    }
    )
  }
  showModalImg = (url) =>{
    this.setState({modalImg : url})
  }

  showData = (collaborators) => {
    var { store_code } = this.props;
    var result = null;
    if (collaborators.length > 0) {
      result = collaborators.map((data, index) => {
        var avatar =
          data.customer.avatar_image == null
            ? Env.IMG_NOT_FOUND
            : data.customer.avatar_image;
        var img_front =
          data.front_card == null ? Env.IMG_NOT_FOUND : data.front_card;
        var img_back =
          data.back_card == null ? Env.IMG_NOT_FOUND : data.back_card;

        var address_default = ""

        if (data.customer != null && typeof data.customer != "undefined") {
            if (data.customer.address_detail !== null && data.customer.address_detail !== "") {
              address_default = address_default + data.customer.address_detail + ", "
            }
            if (data.customer.wards_name !== null && data.customer.wards_name !== "") {
              address_default = address_default + data.customer.wards_name + ", "
            }
            if (data.customer.district_name !== null && data.customer.district_name !== "") {
              address_default = address_default + data.customer.district_name + ", "
            }
            if (data.customer.province_name !== null && data.customer.province_name !== "") {
              address_default = address_default + data.customer.province_name
            }
          
        }
        return (
          <React.Fragment>
            <tr class="sub-container hover-product">
              <td>
                <button
                  type="button"
                  style={{ width: "25px" }}
                  className=" btn-success exploder"
                >
                  <span class="fa fa-plus"></span>
                </button>
              </td>{" "}
              <td style = {{textAlign : "center"}}>
                <img
                  src={avatar}
                  class="img-responsive"
                  width="100px"
                  height="115px"
                  alt="Image"
                />
              </td>

              <td>{data.customer.name}</td>
              <td>{data.customer.phone_number}</td>
{/* 
              <td>
                {" "}
                {data.customer.points == null
                  ? null
                  : new Intl.NumberFormat().format(
                    data.customer.points.toString()
                  )}
              </td> */}
              <td>{data.customer.referral_phone_number || null}</td>

              <td>
                <div className="on-off" onClick={(e) => { this.onChangeStatus(e, data.id) }}>
                  <input ref={(ref) => this["checked" + data.id] = ref} type="checkbox" class="checkbox" name={`${randomString(10)}`} checked={data.status == 1 ? true : false} />

             
                  <label for="checkbox" class="switch">
                    <span class="switch__circle">
                      <span style = {{backgroundColor : data.status == 1 ? "white" : "gray"}} class="switch__circle-inner"></span>
                    </span>
                    <span class="switch__left"></span>
                    <span class="switch__right"></span>
                  </label>
                </div>
              </td>
              <td className="btn-voucher">
                <button
                  onClick={() => this.showChatBox(data.customer.id, "show")}
                  class="btn btn-success btn-sm"
                >
                  <i class="fa fa-comment-alt"></i> Chat
                </button>
                &nbsp;
                <a
                  href={`tel:${data.customer.phone_number}`}
                  class="btn btn-primary btn-sm"
                >
                  <i class="fa fa-phone"></i> Gọi ngay
                </a>
                &nbsp;

                <Link
                  style={{ margin: "2px 0" }}

                  to={`/order/${this.props.store_code}?collaborator_by_customer_id=${data.customer_id}&tab-index=1`}
                  class="btn btn-danger btn-sm"
                >
                  <i class="fa fa-history"></i> Lịch sử đơn hàng
                </Link>
                &nbsp;
                <Link
                  style={{ margin: "2px 0" }}

                  to={`/collaborator/${this.props.store_code}/report/${data.customer.id}`}
                  class="btn btn-info btn-sm"
                >
                  <i class="fa fa-bar-chart"></i> Báo cáo
                </Link>
                &nbsp;


                <a

                  data-toggle="modal" data-target="#modalListReferences"
                  class="btn btn-info btn-sm"
                  onClick={() => this.showReferences(data.customer.phone_number)}
                >
                  <span class="icon text-white">
                    <i class="fa fa-users"></i>
                  </span>
                  <span style={{ color: "white" }} class={`text `}> Danh sách giới thiệu</span>
                </a>

              </td>
            </tr>
            <tr class="explode hide" style={{ background: "rgb(200 234 222)" }}>
              <td colSpan={9}>
                <div class="row">
                  <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                    <div class="info_user">
                      <p class="sale_user_label">
                        Số tài khoản:{" "}
                        <span id="user_tel">
                          {data.account_number} - {data.bank}{" "}
                        </span>
                      </p>
                      <p class="sale_user_label">
                        Tên chủ tài khoản:{" "}
                        <span id="user_tel">{data.account_name}</span>
                      </p>
                      {/* <p class="sale_user_label">
                        Gmail:{" "}
                        <span id="user_tel">             {data.customer.email == null ? "Trống" : data.customer.email}
                        </span>
                      </p> */}
                      <p class="sale_user_label">
                        Tiền thưởng:{" "}
                        <span id="user_tel">
                          {format(Number(data.balance))}
                        </span>
                      </p>
                      <p class="sale_user_label">
                        Tên CMND:{" "}
                        <span id="user_tel">
                          {data.first_and_last_name}
                        </span>
                      </p>

                      <p class="sale_user_label" id="sale_user_name">
                        CMND: <span id="user_name"> {data.cmnd} </span>
                      </p>
                      <p class="sale_user_label" id="sale_user_name">
                        Nơi đăng kí:{" "}
                        <span id="user_name"> {data.issued_by} </span>
                      </p>
                      <p class="sale_user_label" id="sale_user_name">
                        Ngày đăng ký CTV:{" "}
                        <span id="user_name">{moment(data.created_a).format("DD-MM-YYYY")} </span>
                      </p>
                      {address_default !== "" &&  <p class="sale_user_label" id="sale_user_name">
                        Địa chỉ:{" "}
                        <span id="user_name"> {address_default} </span>
                      </p>}
                     
                    </div>
                  </div>
                  <div class="col-xs-7 col-sm-7 col-md-7 col-lg-7">
                    <div class="info_user">
                      <div class="row">
                        <div  data-toggle="modal"
                      data-target="#modalImg" style={{ textAlign: "center" , cursor : "pointer"}} onClick = {()=>this.showModalImg(img_front)}>
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

                        <div  data-toggle="modal"
                      data-target="#modalImg" style={{ textAlign: "center" ,  cursor : "pointer" }} onClick = {()=>this.showModalImg(img_back)}>
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
    var collaborators =
      typeof this.props.collaborators.data == "undefined"
        ? []
        : this.props.collaborators.data;
    return (
      <div class=""  style = {{overflow : "auto"}}>
        <ModalImg img={this.state.modalImg}></ModalImg>
        <table class="table table-border">
          <thead>
            <tr>
              <th></th>
              <th style = {{textAlign : "center"}}>Ảnh</th>

              <th>Họ tên</th>
              <th>Số điện thoại</th>

              {/* <th>Điểm</th> */}
              <th>Mã giới thiệu</th>

              <th>Trạng thái hoạt động</th>

              <th>Hành động</th>
            </tr>
          </thead>

          <tbody>{this.showData(collaborators)}</tbody>
        </table>
        <ModalListReferences store_code={this.props.store_code} referral_phone_number={this.state.referral_phone_number} />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    updateCollaborator: (store_code, id, data) => {
      dispatch(collaboratorAction.updateCollaborator(store_code, id, data));
    },

  };
};
export default connect(null, mapDispatchToProps)(Table);