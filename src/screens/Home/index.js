import React, { Component } from "react";
import $ from "jquery";
import * as Types from "../../constants/ActionType";
import Topbar from "../../components/Partials/Topbar";
import Footer from "../../components/Partials/Footer";
import ModalRemove from "../../components/Store/ModalRemove";

import Table from "../../components/Home/Table";
import Alert from "../../components/Partials/Alert";
import { Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import Loading from "../Loading";
import * as dashboardAction from "../../actions/dashboard";
import config from "../../ultis/datatable"
import ListStore from "../../components/Home/ListStore";

class Home extends Component {
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
    this.props.hideLoading()
    this.props.fetchAllStore();
  }
  componentWillReceiveProps(nextProps) {
    if(this.props.loading == "show")
    this.props.hideLoading()
    if(this.props.loading_lazy == "show")
    this.props.hideLoading_lazy()
    $("#dataTable").DataTable().destroy();
  }
  componentDidUpdate(prevProps, prevState) {
    $("#dataTable").DataTable(config());
  }
  render() {
    console.log(this.props);
    if (this.props.auth) {
      return (
        <div id="wrapper">

          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
              <Topbar isHome={true} isExsitStore={true} />
              <div className="container-fluid" style={{width:"60%"}}>
                <Alert
                  type={Types.ALERT_UID_STATUS}
                  alert={this.props.alert}
                />
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <h4 className="h4 title_content mb-0 text-gray-800">
                    Cửa hàng
                  </h4>{" "}
                  <Link to="/store/create" class="btn btn-info btn-icon-split btn-sm">
                    <span class="icon text-white-50">
                      <i class="fas fa-plus"></i>
                    </span>
                    <span class="text">Thêm cửa hàng</span>
                  </Link>
                </div>

                <br></br>
                <div className="card shadow mb-4">
                  <div className="card-header py-3">
                    <h6 className="m-0 title_content font-weight-bold text-primary">
                      Danh sách cửa hàng
                    </h6>
                  </div>
                  <div className="card-body">
                    <ListStore handleDelCallBack={this.handleDelCallBack} data={this.props.stores} />

                  </div>
                </div>
              </div>
            </div>

            <Footer />
          </div>
          <ModalRemove modal={this.state.modal} />
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
    stores: state.storeReducers.store.allStore,
    auth: state.authReducers.login.authentication,
    alert: state.storeReducers.alert.alert_success,
    loading : state.loadingReducers.disable,
    loading_lazy : state.loadingReducers.disable_lazy

  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchAllStore: () => {
      dispatch(dashboardAction.fetchAllStore());
    },
    hideLoading: () => {
      dispatch({
        type: Types.SHOW_LOADING,
        loading: "hide"
      })
    },
    hideLoading_lazy: () => {
      dispatch({
        type: Types.SHOW_LOADING_LAZY,
        loading: "hide"
      })
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
