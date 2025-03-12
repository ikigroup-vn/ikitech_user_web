import React, { Component } from "react";
import $ from "jquery";
import * as Types from "../../constants/ActionType";
import Sidebar from "../../components/Partials/Sidebar";
import Topbar from "../../components/Partials/Topbar";
import Footer from "../../components/Partials/Footer";
import ModalDelete from "../../components/Store_Address/Delete/Modal";
import NotAccess from "../../components/Partials/NotAccess";

import Table from "../../components/Appointment/Table";
import Alert from "../../components/Partials/Alert";
import { Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import Loading from "../Loading";
import * as AppointmentAction from "../../actions/appointment";
import config from "../../ultis/datatable";
import { shallowEqual } from "../../ultis/shallowEqual";

class StoreAddress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: {
        title: "",
        id: "",
      },
    };
  }

  handleDelCallBack = (modal) => {
    this.setState({ modal: modal });
  };

  componentDidMount() {
    // if(this.props.currentBranch != null && this.props.currentBranch.id != null) {
    // this.props.getAppointments(
    //   this.props.match.params.store_code,
    // );
    // }
  }

  componentWillReceiveProps(nextProps) {
    $("#dataTable").DataTable().destroy();
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (!shallowEqual(nextProps.currentBranch, this.props.currentBranch)) {
      this.props.fetchAllStoreA(
        this.props.match.params.store_code,
        nextProps.currentBranch.id
      );
    }
    return true;
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.isLoading != true &&
      typeof this.props.permission.product_list != "undefined"
    ) {
      var permissions = this.props.permission;
      // var update = permissions.delivery_pick_address_update
      var isShow = permissions.delivery_pick_address_list;

      this.setState({ isLoading: true, update: true, isShow });
    }
    $("#dataTable").DataTable(config());
  }

  render() {
    var { store_code } = this.props.match.params;
    var { update, isShow } = this.state;

    return (
      <div id="wrapper">
        <Sidebar store_code={store_code} />
        <div className="col-10 col-10-wrapper">
          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
              <div className="container-fluid">
                <Alert type={Types.ALERT_UID_STATUS} alert={this.props.alert} />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <h4 className="h4 title_content mb-0 text-gray-800">
                    Lịch hẹn
                  </h4>{" "}
                </div>

                <br></br>
                <Table
                  update={update}
                  store_code={store_code}
                  handleDelCallBack={this.handleDelCallBack}
                  // data={this.props.appointments}
                />
              </div>
            </div>

            <Footer />
          </div>
          <ModalDelete store_code={store_code} modal={this.state.modal} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    appointments: state.appointmentReducers.Appointment.appointments,
    auth: state.authReducers.login.authentication,
    alert: state.storeAReducers.alert.alert_success,
    permission: state.authReducers.permission.data,
    currentBranch: state.branchReducers.branch.currentBranch,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    getAppointments: (store_code) => {
      dispatch(AppointmentAction.getAppointments(store_code));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(StoreAddress);
