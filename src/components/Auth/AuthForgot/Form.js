import React, { Component } from "react";
import { connect } from "react-redux";
import * as Types from "../../../constants/ActionType";
import { isEmail } from "../../../ultis/helpers"
import * as auth from "../../../actions/auth";
class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtPassword: "",
      txtOTP: "",
      canSendOtp: true,
      secondCountDown: 30,
    };
  }

  componentDidMount(){
    var { alert } = { ...this.props };
    alert.disable = "hide";
    this.props.alert({
      type: Types.ALERT_UID_STATUS,
      alert,
    });

    if(isEmail(this.props.phone_number)) {
      this.onSendOtpToEmail();
    } else {
      this.onSendOtp();
    }
   

  }

  onSendOtpToEmail = () => {
    var { formData } = { ...this.props };
    if (this.state.canSendOtp == true) {
      this.startTimer();
      this.props.sendOTPToEmail(formData.formData.phone_number);
   
    }
  };

  onSendOtp = () => {
    var { formData } = { ...this.props };
    if (this.state.canSendOtp == true) {
      this.startTimer();
      this.props.sendOTP(formData.formData.phone_number);
   
    }
  };

  startTimer = () => {
    this.state.secondCountDown = 30;
    this.setState({ canSendOtp: false });
    this.countDown();
  };

  countDown = () => {
    if (this.state.secondCountDown > 0) {
      setTimeout(() => {
        var seconds = this.state.secondCountDown - 1;
        this.setState({ secondCountDown: seconds });
        this.countDown();
    
      }, 1000);
    }

    if (this.state.secondCountDown < 1) {
      this.setState({ canSendOtp: true });
    }
  };
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
    this.props.forgotOTP({
      password: this.state.txtPassword,
      otp: this.state.txtOTP,
      email_or_phone_number : this.props.phone_number,
      otp_from:isEmail(this.props.phone_number) ? "email" : "phone"
    });
  };
  goBack = (e) => {
    e.preventDefault();
    var { history } = this.props;

        history.goBack();
  };
  render() {
      
      var { txtOTP , txtPassword } = this.state;
    return (
      <React.Fragment>
        <form onSubmit={this.onSave} className="user">
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-user"
              id="exampleInputEmail"
              aria-describedby="emailHelp"
              placeholder={!isEmail(this.props.phone_number) ? "Nhập mã xác nhận từ số điện thoại"  : "Nhập mã xác nhận từ Email"}
              autocomplete="off"
              name="txtOTP"
              value={txtOTP}
              onChange={this.onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-user"
              id="txtPassword"
              placeholder="Nhập mật khẩu mới"
              autocomplete="off"
              value={txtPassword}
              onChange = {this.onChange}
              name = "txtPassword"

            />
          </div>
          <button type="submit" className="btn btn-primary btn-user btn-block">
            Xác nhận
          </button>

          {this.state.canSendOtp ? (
            <div
              className="text-center"
              onClick={isEmail(this.props.phone_number) ? this.onSendOtpToEmail : this.onSendOtp}
              style={{
                marginTop: 10,
                marginBottom: 20,
              }}
            >
              <a type = "button">Gửi lại mã</a>
            </div>
          ) : (
            <div
              className="text-center"
              style={{
                marginTop: 10,
                marginBottom: 20,
              }}
            >
              Nhận lại mã sau {this.state.secondCountDown}
            </div>
          )}

          <div
           onClick={this.goBack}
              
       
              style={{
                marginTop: 10,
                marginBottom: 20,
                
              }}
            >
              <a type = "button"> 	&#8592; Trở lại</a>
            </div>

        
        </form>
      </React.Fragment>
    );
  }
}


const mapDispatchToProps = (dispatch, props) => {
  return {
    forgotOTP: ($form) => {
      dispatch(auth.forgotOTP($form));
    },
    alert: (form) => {
      dispatch(form);
    },
    sendOTP: (phone_number) => {
      dispatch(auth.sendOTP(phone_number));
    },
    sendOTPToEmail: (email) => {
      dispatch(auth.sendOTPToEmail(email));
    },
  };
};
export default connect(null, mapDispatchToProps)(Form);
