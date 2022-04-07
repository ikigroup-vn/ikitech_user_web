import React, { Component } from "react";
import { connect } from "react-redux";

import { filter_arr, format } from "../../../../ultis/helpers";

class ListStaff extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numPage: 10,
    };
  }

  onChange = (e) => {
    var { value, checked } = e.target;
    console.log(checked);
    var data = JSON.parse(value);
    if (checked == true) this.props.handleAddStaff(data, null, "add");
    else this.props.handleAddStaff(null, data.id, "remove");
  };

  checkExsit = (list, id) => {
    if (list.length > 0) {
      for (const element of list) {
        if (element.id == id) {
          return true;
        }
      }
    }
    return false;
  };

  showData = (staffs, list) => {
    console.log("dfasufbasdbfasdkjfbasdkf", staffs, list);
    var result = null;
    if (typeof staffs === "undefined") {
      return result;
    }
    if (staffs.length > 0) {
      result = staffs.map((data, index) => {
        var decentralization =
          typeof data.decentralization != "undefined" &&
          data.decentralization != null
            ? data.decentralization.name
            : "";
        var checked = this.checkExsit(list, data.id);

        return (
          <tr>
            <td>
              <div class="checkbox">
                <label>
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={this.onChange}
                    value={JSON.stringify(data)}
                  />
                </label>
              </div>
            </td>

            <td>{data.name}</td>

            <td>{data.username}</td>
            <td>{data.phone_number}</td>
            <td>
              {" "}
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(data.salary)}
            </td>
            <td>{decentralization}</td>
            <td style={{ textAlign: "center" }}>
              {data.online ? (
                <>
                  <span
                    style={{
                      background: "green",
                      padding: "0.005px 8px",
                      borderRadius: "50%",
                      marginRight: "0.3rem",
                    }}
                  >
                    {" "}
                  </span>
                  <span>Online</span>
                </>
              ) : (
                <>
                  <span
                    style={{
                      background: "red",
                      padding: "0.005px 8px",
                      borderRadius: "50%",
                      marginRight: "0.3rem",
                    }}
                  >
                    {" "}
                  </span>
                  <span>Offline</span>
                </>
              )}
            </td>
          </tr>
        );
      });
    } else {
      return result;
    }
    return result;
  };

  render() {
    var { staffs, store_code, listStaff } = this.props;
    console.log("stafff", staffs);
    return (
      <div
        class="modal fade"
        tabindex="-1"
        role="dialog"
        id="showListStaff"
        data-keyboard="false"
        data-backdrop="static"
      >
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content" style={{ maxHeight: "630px" }}>
            <div class="modal-header" style={{ background: "white" }}>
              <h4
                class="modal-title"
                style={{ color: "black", fontWeight: "bold" }}
              >
                Nhân viên
              </h4>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-hidden="true"
              >
                &times;
              </button>
            </div>

            <div class="table-responsive">
              <table
                class="table  table-hover table-border"
                style={{ color: "black" }}
              >
                <thead>
                  <tr>
                    <th></th>
                    <th>Tên nhân viên</th>
                    <th>Tên đăng nhập</th>
                    <th>Số điện thoại</th>
                    <th>Lương</th>
                    <th>Phân quyền</th>
                    <th>Trạng thái</th>
                  </tr>
                </thead>

                <tbody>{this.showData(staffs, listStaff)}</tbody>
              </table>
            </div>
            <div class="d-flex align-items-center justify-content-end p-3">
              <div>
                <button
                  type="button"
                  class="btn btn-primary pagination-btn mr-0 ml-auto"
                  data-dismiss="modal"
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {};
};
export default connect(null, mapDispatchToProps)(ListStaff);
