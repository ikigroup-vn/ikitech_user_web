import React, { Component } from "react";
import { connect } from "react-redux";
import * as dashboardAction from "../../actions/dashboard";
import * as placeAction from "../../actions/place";
import { shallowEqual } from "../../ultis/shallowEqual";
import { isEmail, isEmpty, isPhone } from "../../ultis/helpers";
import Validator from "../../ultis/validator";
import themeData from "../../ultis/theme_data";

class ModalEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      txtStatus: "",
      txtUserName: "",
      txtPhone: "",
      txtRule: "",
      errors: {},
      error_name: { status: false, text: "" },
    };
    const rules = [
      {
        field: "txtUserName",
        method: "isEmpty",
        validWhen: false,
        message: "Họ và tên không được để trống.",
      },
      {
        field: "txtPhone",
        method: "isEmpty",
        validWhen: false,
        message: "Số điện thoại không được để trống.",
      },
      {
        field: "txtRule",
        method: "isEmpty",
        validWhen: false,
        message: "Vai trò không được để trống.",
      },
      {
        field: "txtStatus",
        method: "isEmpty",
        validWhen: false,
        message: "Trạng thái không được để trống.",
      },
    ];
    this.validator = new Validator(rules);
  }
  listErrors = () => {
    return {
      error_name: { status: false, text: "" },
    };
  };

  onChange = (e) => {
    var target = e.target;
    var name = target.name;
    var value = target.value;

    this.setState({
      [name]: value,
    });
  };

  goBack = () => {
    var { history } = this.props;
    history.goBack();
  };

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
  handleOnClick = () => {
    const errors = this.validator.validate(this.state);

    var { txtUserName, txtPhone, txtRule, txtStatus } = this.state;
    const { store_code } = this.props;
    var error = false;
    this.setState({
      errors: errors,
    });
    if (Object.keys(errors).length > 0) {
      error = true;
    }

    if (error == true) return;

    const Formdata = {
      username: txtUserName,
      phone: txtPhone,
      rule: txtRule,
      status: txtStatus,
    };

    this.props.upadateEmployee(
      store_code,
      Formdata,
      this.state.id,
      this,
      function () {
        window.$(".modal").modal("hide");
      }
    );
  };

  render() {
    var { province } = this.props;
    var { errors, error_name } = this.state;
    var { txtUserName, txtPhone, txtRule, txtStatus } = this.state;
    return (
      <>
        {this.state.status && (
          <div
            class="alert alert-danger alert-dismissible"
            style={{ position: "fixed", top: "10px" }}
          >
            <a href="#" class="close" data-dismiss="alert" aria-label="close">
              &times;
            </a>
            <strong>Chưa nhập đủ thông tin nhân viên</strong>
          </div>
        )}

        <div class="modal" id="modalEdit">
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
                  Thêm nhân viên
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
                            onChange={this.onChange}
                            name="txtUserName"
                          />
                          {errors.txtUserName && (
                            <div
                              className="validation"
                              style={{ display: "block" }}
                            >
                              {errors.txtUserName}
                            </div>
                          )}
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
                            onChange={this.onChange}
                            name="txtPhone"
                          />
                          {errors.txtPhone && (
                            <div
                              className="validation"
                              style={{ display: "block" }}
                            >
                              {errors.txtPhone}
                            </div>
                          )}
                          {error_name.status && (
                            <div
                              className="validation"
                              style={{ display: "block" }}
                            >
                              {error_name.text}
                            </div>
                          )}
                        </div>
                        <div class="form-group">
                          <label for="product_name">Vai trò</label>
                          <select
                            class="form-control"
                            id="txtRule"
                            name="txtRule"
                            value={txtRule || ""}
                            onChange={this.onChange}
                          >
                            <option value="">-- Chọn vai trò --</option>
                            <option value="1">Tài xế</option>
                            <option value="2">Phụ xe</option>
                          </select>
                          {errors.txtRule && (
                            <div
                              className="validation"
                              style={{ display: "block" }}
                            >
                              {errors.txtRule}
                            </div>
                          )}
                        </div>
                        <div class="form-group">
                          <label>Trạng thái làm việc</label>
                          <select
                            class="form-control"
                            id="txtStatus"
                            name="txtStatus"
                            value={txtStatus || ""}
                            onChange={this.onChange}
                          >
                            <option value="">-- Chọn trạng thái --</option>
                            <option value="1">Đang làm</option>
                            <option value="2">Đã nghỉ</option>
                          </select>
                          {errors.txtStatus && (
                            <div
                              className="validation"
                              style={{ display: "block" }}
                            >
                              {errors.txtStatus}
                            </div>
                          )}
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
                <button
                  type="submit"
                  onClick={this.handleOnClick}
                  class="btn btn-warning"
                >
                  Cập nhật
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
const mapDispatchToProps = (dispatch, props) => {
  return {
    upadateEmployee: (store_code, form, id, $this, funcModal) => {
      dispatch(
        dashboardAction.updateEmployee(store_code, form, id, $this, funcModal)
      );
    },
  };
};

export default connect(null, mapDispatchToProps)(ModalEdit);
