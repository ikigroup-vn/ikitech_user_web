import React, { Component } from "react";
import * as shipmentPAction from "../../actions/shipment";
import { connect } from "react-redux";
import { shallowEqual } from "../../ultis/shallowEqual";
import * as Types from "../../constants/ActionType";
import { isEmpty } from "../../ultis/helpers";
class ModalUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      toggle: false,
      iconShow: "fa fa-fw fa-eye",
      iconHide: "fa fa-fw fa-eye-slash",
    };
  }

  onChange = (e) => {
    var target = e.target;
    var name = target.name;
    var value = target.value;

    this.setState({
      [name]: value,
    });
  };

  onSave = (e) => {
    e.preventDefault();
    var {username , password} = this.state
    if(!isEmpty(username) || !isEmpty(password))
    {
      this.props.showError({
        type: Types.ALERT_UID_STATUS,
        alert: {
          type: "danger",
          title: "Lỗi",
          disable: "show",
          content: "Điền đầy đủ thông tin và mật khẩu",
        },
      });
      return;
    }
    
    this.props.loginShipment(this.props.store_code, this.props.modalId, {
      username: username,
      password: password,
    });

    window.$(".modal").modal("hide")
  };

  togglePassword = () => {
    this.setState({ toggle: !this.state.toggle });
  };
  render() {
    var { password, username, toggle, iconHide, iconShow } = this.state;
    return (
      <div
        class="modal fade"
        tabindex="-1"
        role="dialog"
        id="modalLogin"
        data-keyboard="false"
        data-backdrop="static"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Đăng nhập</h4>

              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-hidden="true"
              >
                &times;
              </button>
            </div>
            <form
              onSubmit={this.onSave}
              role="form"
              action="#"
              method="post"
              id="updateForm"
            >
              <div class="modal-body">
                <div class="form-group">
                  <label for="product_name">Tên tài khoản</label>
                  <input
                    type="text"
                    class="form-control"
                    id="txtToken"
                    placeholder="Nhập tài khoản"
                    autocomplete="off"
                    value={username}
                    onChange={this.onChange}
                    name="username"
                  />
                </div>
                <div class="form-group">
                  <label for="product_name">Mật khẩu</label>
                  <input
                    type={toggle == true ? "text" : "password"}
                    class="form-control"
                    id="txtToken"
                    placeholder="Nhập mật khẩu"
                    autocomplete="off"
                    value={password}
                    onChange={this.onChange}
                    name="password"
                  />
                  <span
                    onClick={this.togglePassword}
                    toggle="#password-field"
                    class={toggle ? iconShow : iconHide}
                    style={{
                      float: "right",
                      marginRight: "10px",
                      marginTop: "-25px",
                      position: "relative",
                      zIndex: "2",
                    }}
                  ></span>
                </div>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-default"
                  data-dismiss="modal"
                >
                  Đóng
                </button>
                <button type="submit" class="btn btn-warning">
                  Lưu
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    loginShipment: (store_code, id, data) => {
      dispatch(shipmentPAction.loginShipment(store_code, id, data));
    },
    showError: (error) => {
      dispatch(error);
    },
  };
};
export default connect(null, mapDispatchToProps)(ModalUpdate);
