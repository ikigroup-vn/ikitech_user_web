import React, { Component } from "react";
import { connect } from 'react-redux';

import * as Types from "../../../constants/ActionType"
import * as auth from "../../../actions/auth"
import { isEmpty , isPhone , isEmail , isSpecialCharactor } from "../../../ultis/helpers"
class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtId: "",
      txtName: "",
      txtPhone: "",
      txtEmail: "",
      txtPassword: "",
      txtCPassword: "",
    };
  }

  onChange = (e) => {
    var target = e.target;
    var name = target.name;
    var value = target.value;

    this.setState({
      [name]: value
    })
  }

  onSave = (e) => {
    e.preventDefault();
    var { txtName, txtEmail, txtPhone, txtPassword, txtCPassword } = this.state;
    if (!isEmpty(txtName) || !isEmpty(txtPassword)  || !isEmpty(txtPhone)) {
      this.props.alert({
        type: Types.ALERT_UID_STATUS,
        alert: {
          type: "danger",
          title: "Lỗi",
          disable: "show",
          content: "Vui lòng nhập đầy đủ các thông tin",
        },
      });
    }
    else {
      if(!isEmail(txtEmail) && isEmpty(txtEmail))
      {
        this.props.alert({
          type: Types.ALERT_UID_STATUS,
          alert: {
            type: "danger",
            title: "Lỗi",
            disable: "show",
            content: "Email không đúng định dạng",
          },
        });
        return;
      }
      if(!isPhone(txtPhone))
      {
        this.props.alert({
          type: Types.ALERT_UID_STATUS,
          alert: {
            type: "danger",
            title: "Lỗi",
            disable: "show",
            content: "SĐT không đúng định dạng",
          },
        });
        return;
      }
      if(!isSpecialCharactor(txtName))
      {
        this.props.alert({
          type: Types.ALERT_UID_STATUS,
          alert: {
            type: "danger",
            title: "Lỗi",
            disable: "show",
            content: "Tên không được chứa các kí tự đặc biệt",
          },
        });
        return;
      }
      if (this.state.txtCPassword === this.state.txtPassword) {
        this.props.register(this.state)
      }
      else {
        this.props.alert({
          type: Types.ALERT_UID_STATUS,
          alert: {
            type: "danger",
            title: "Lỗi",
            disable: "show",
            content: "Nhập lại mật khẩu không hợp lệ",
          },
        });
      }
    }
  }

  render() {
    var { txtName, txtEmail, txtPhone, txtPassword, txtCPassword } = this.state;
    var { products } = this.props
    console.log(products)
    return (
      <React.Fragment>
        <form onSubmit={this.onSave} className="user">
          <div className="form-group row">
            <div className="col-sm-6 mb-3 mb-sm-0">
              <input
                type="text"
                className="form-control form-control-user"
                id="exampleFirstName"
                placeholder="Họ và tên"
                autocomplete="off"
                name="txtName"
                value={txtName}
                onChange={this.onChange}

              />
            </div>
            <div className="col-sm-6">
              <input
                type="text"
                className="form-control form-control-user"
                id="exampleLastName"
                placeholder="Số điện thoại"
                autocomplete="off"
                name="txtPhone"
                value={txtPhone}
                onChange={this.onChange}
              />
            </div>
          </div>
          <div className="form-group">
            <input
              type="email"
              className="form-control form-control-user"
              id="exampleInputEmail"
              placeholder="Email"
              autocomplete="off"
              name="txtEmail"
              value={txtEmail}
              onChange={this.onChange}
            />
          </div>
          <div className="form-group row">
            <div className="col-sm-6 mb-3 mb-sm-0">
              <input
                type="text"
                className="form-control form-control-user"
                id="txtPassword"
                placeholder="Mật khẩu"
                autocomplete="off"
                name="txtPassword"
                value={txtPassword}
                onChange={this.onChange}
              />
            </div>
            <div className="col-sm-6">
              <input
                type="text"
                className="form-control form-control-user"
                id="txtPassword"
                placeholder="Nhập lại mật khẩu"
                autocomplete="off"
                name="txtCPassword"
                value={txtCPassword}
                onChange={this.onChange}
              />
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-primary btn-user btn-block"
          >
            Đăng kí
          </button>
        </form>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    products: state.products
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    register: ($form) => {
      dispatch(auth.register($form))
    },
    alert: (form) => {
      dispatch(form);
    },
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Form);