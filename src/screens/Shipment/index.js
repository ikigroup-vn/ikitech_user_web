import React, { Component } from "react";
import Sidebar from "../../components/Partials/Sidebar";
import Topbar from "../../components/Partials/Topbar";
import Footer from "../../components/Partials/Footer";
import ModalUpdate from "../../components/Shipment/ModalUpdate";

import Alert from "../../components/Partials/Alert";
import * as Types from "../../constants/ActionType"
import $ from "jquery";
import { Link, Redirect } from "react-router-dom";
import Table from "../../components/Shipment/Table";
import { connect } from "react-redux";
import Loading from "../Loading";
import * as shipmentAction from "../../actions/shipment";
import config from "../../ultis/datatable"



class Store extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modalremove: {
        title: "",
        id: "",
      },
      modalupdate: {
        token: "",
        id: "",
      },
    };
  }

  handleDelCallBack = (modal) => {
    this.setState({modalremove : modal});
  };

  handleUpdateCallBack = (modal) => {
    this.setState({modalupdate : modal});
  };

  componentDidMount() {
    
    var {store_code} = this.props.match.params

    this.props.fetchAllShipment(store_code)

  }
  componentWillReceiveProps(nextProps) {
    $("#dataTable").DataTable().destroy();
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.isLoading != true && typeof this.props.permission.product_list != "undefined") {
      var permissions = this.props.permission
      var update = permissions.delivery_provider_update 

      this.setState({ isLoading: true , update })

    }
    $("#dataTable").DataTable(config());
  }
  render() {
    var {store_code} = this.props.match.params;
    var {alert , shipment} = this.props
    var { update} = this.state

    if (this.props.auth) {
      return (
        <div id="wrapper">
          <Sidebar store_code={store_code} />
<div className="col-10 col-10-wrapper">

          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
              <Topbar store_code= {store_code} />

              <div class="container-fluid">
              <Alert
                  type={Types.ALERT_UID_STATUS}
                  alert={alert}
                />
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <h1 class="h3 mb-2 text-gray-800">Đơn vị vận chuyển</h1>
             
                </div>
                <br></br>
                <div class="card shadow mb-4">
                  <div class="card-header py-3">
                    <h6 class="m-0 font-weight-bold text-primary">
                      Danh sach đơn vị vận chuyển
                    </h6>
                  </div>
                  <div class="card-body">
                    <Table update = {update} store_code = {store_code} shipment = {shipment} handleUpdateCallBack = {this.handleUpdateCallBack}  handleDelCallBack = {this.handleDelCallBack}   />
                  </div>
                </div>
              </div>
            </div>

            <Footer />
          </div>
          <ModalUpdate  modal = {this.state.modalupdate} store_code = {store_code} />

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
    shipment : state.shipmentReducers.shipment.allShipment,
    alert : state.shipmentReducers.alert.alert_success,
    permission: state.authReducers.permission.data,

  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
   
    fetchAllShipment: (store_code) => {
      dispatch(shipmentAction.fetchAllShipment(store_code));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Store);
