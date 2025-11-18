import React, { Component } from "react";
import { connect } from "react-redux";
import * as dashboardAction from "../../actions/dashboard";
import * as placeAction from "../../actions/place";
import { shallowEqual } from "../../ultis/shallowEqual";
import themeData from "../../ultis/theme_data";

class ModalViewEmployee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtStatus: "",
      txtUserName: "",
      txtPhone: "",
      txtRule: "",
    };
  }

  componentWillReceiveProps(nextProps, nextState) {
    if (!shallowEqual(nextProps.modal, this.props.modal)) {
      this.setState({
        id: nextProps.modal.id,
        txtUserName: nextProps.modal.username,
        txtPhone: nextProps.modal.phone,
        txtRule: nextProps.modal.rule,
        txtStatus: nextProps.modal.status,
      });
    }
  }

  render() {
    var { txtUserName, txtPhone, txtRule, txtStatus } = this.state;
    return (
      <>
        <style>
          {`
            .employee-name-hover:hover {
              text-decoration: underline;
            }
          `}
        </style>

        <div class="modal" id="modalViewEmployee">
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div
                className="model-header-modal"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  backgroundColor: themeData().backgroundColor,
                }}
              >
                <h4 style={{ color: "white", margin: "10px" }}>
                  Xem thông tin nhân viên
                </h4>
                <button type="button" class="close" data-dismiss="modal">
                  &times;
                </button>
              </div>
              <div class="modal-body">
                <React.Fragment>
                  <form role="form">
                    <div className="row">
                      <div className="col-6 box-body-left">
                        <div class="form-group">
                          <label for="product_name">Họ và tên</label>
                          <input
                            type="text"
                            class="form-control"
                            id="txtUserName"
                            placeholder="Nhập họ tên nhân viên"
                            autoComplete="off"
                            value={txtUserName || ""}
                            name="txtUserName"
                            disabled
                          />
                        </div>
                        <div class="form-group">
                          <label for="product_name">Số điện thoại</label>
                          <input
                            type="text"
                            class="form-control"
                            id="txtPhone"
                            placeholder="Nhập số điện thoại"
                            autoComplete="off"
                            value={txtPhone || ""}
                            name="txtPhone"
                            disabled
                          />
                        </div>
                        <div class="form-group">
                          <label for="product_name">Vai trò</label>
                          <select
                            class="form-control"
                            id="txtRule"
                            name="txtRule"
                            value={txtRule || ""}
                            disabled
                          >
                            <option value="">-- Chọn vai trò --</option>
                            <option value="1">Tài xế</option>
                            <option value="2">Phụ xe</option>
                          </select>
                        </div>
                        <div class="form-group">
                          <label>Trạng thái làm việc</label>
                          <select
                            class="form-control"
                            id="txtStatus"
                            name="txtStatus"
                            value={txtStatus || ""}
                            disabled
                          >
                            <option value="">-- Chọn trạng thái --</option>
                            <option value="1">Đang làm</option>
                            <option value="2">Đã nghỉ</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </form>
                </React.Fragment>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-default"
                  data-dismiss="modal"
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default connect(null, null)(ModalViewEmployee);
