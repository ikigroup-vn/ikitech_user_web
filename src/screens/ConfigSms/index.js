import React, { Component } from "react";
import Footer from "../../components/Partials/Footer";
import NotAccess from "../../components/Partials/NotAccess";
import Sidebar from "../../components/Partials/Sidebar";
import Topbar from "../../components/Partials/Topbar";
import ModalUpdate from "../../components/OtpUnit/ModalUpdate";
import ModalCreate from "../../components/OtpUnit/ModalCreate";
import ModalDelete from "../../components/OtpUnit/ModalDelete";

import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import * as otpUnitAction from "../../actions/otp_unit";
import * as configSmsAction from "../../actions/config_sms";
import Table from "../../components/OtpUnit/Table";
import Alert from "../../components/Partials/Alert";
import * as Types from "../../constants/ActionType";
import Loading from "../Loading";
import SmsConfig from "./ConfigSms";

class ConfigSms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalremove: {
        id: "",
        title: "",
        sender: "",
      },
      modalupdate: {
        token: "",
        id: "",
      },
    };
  }

  handleDelCallBack = (modal) => {
    this.setState({ modalremove: modal });
  };

  handleUpdateCallBack = (modal) => {
    this.setState({ modalupdate: modal });
  };

  componentDidMount() {
    var { store_code } = this.props.match.params;

    this.props.fetchAllOtpUnit(store_code);
  }
  componentWillReceiveProps(nextProps) {
    // $("#dataTable").DataTable().destroy();
  }
  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.isLoading != true &&
      typeof this.props.permission.product_list != "undefined"
    ) {
      var permissions = this.props.permission;
      // var update = permissions.delivery_provider_update
      var isShow = permissions.delivery_pick_address_list;

      this.setState({ isLoading: true, isShow });
    }
    // $("#dataTable").DataTable(config());
  }
  render() {
    var { store_code } = this.props.match.params;
    var { alert, allOtpUnit } = this.props;
    var { update, isShow } = this.state;

    if (this.props.auth) {
      return (
        <div id="wrapper">
          <Sidebar store_code={store_code} />
          <div className="col-10 col-10-wrapper">
            <div id="content-wrapper" className="d-flex flex-column">
              <div id="content">
                <Topbar store_code={store_code} />
                {typeof isShow == "undefined" ? (
                  <div></div>
                ) : isShow == true ? (
                  <div class="container-fluid">
                    <Alert type={Types.ALERT_UID_STATUS} alert={alert} />
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <h4 className="h4 title_content mb-0 text-gray-800">
                        Cài đặt SMS
                      </h4>{" "}
                    </div>
                    <br></br>
                    <div class="card shadow mb-4">
                      <div class="card-header py-3">
                        <h6 class="m-0 title_content font-weight-bold text-primary">
                          Cấu hình sms
                        </h6>
                      </div>
                      <SmsConfig store_code={store_code}></SmsConfig>
                    </div>
                    <div class="card shadow mb-4">
                      <div
                        class="card-header py-3"
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <h6 class="m-0 title_content font-weight-bold text-primary">
                          Danh sách cài đặt sms
                        </h6>
                        {/* <button
                          type="button"
                          data-toggle="modal"
                          data-target="#createOtpUnitModal"
                          class="btn btn-primary btn-sm"
                        >
                          <i class="fa fa-plus"></i> Thêm
                        </button> */}
                      </div>
                      <div class="card-body" style={{ padding: "2px" }}>
                        <Table
                          update={update}
                          store_code={store_code}
                          allOtpUnit={allOtpUnit}
                          handleUpdateCallBack={this.handleUpdateCallBack}
                          handleDelCallBack={this.handleDelCallBack}
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <NotAccess />
                )}
              </div>

              <Footer />
            </div>
            <ModalCreate store_code={store_code} />
            <ModalUpdate
              modal={this.state.modalupdate}
              store_code={store_code}
            />
            <ModalDelete
              modal={this.state.modalremove}
              store_code={store_code}
            />
          </div>
        </div>
      );
    } else if (this.props.auth === false) {
      return <Redirect to="/login" />;
    } else {
      return <Loading />;
    }
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.authReducers.login.authentication,
    allOtpUnit: state.otpUnitReducers.otp_unit.allOtpUnit,
    alert: state.otpUnitReducers.alert.alert_success,
    permission: state.authReducers.permission.data,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchAllOtpUnit: (store_code) => {
      dispatch(otpUnitAction.fetchAllOtpUnit(store_code));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ConfigSms);
