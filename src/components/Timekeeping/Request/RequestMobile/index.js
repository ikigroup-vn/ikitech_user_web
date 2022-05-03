import React, { Component } from "react";
// import * as themeAction from "../../../actions/theme";
import { connect } from "react-redux";
import { shallowEqual } from "../../../../ultis/shallowEqual";
import Table from "./Table";
import Alert from "../../../Partials/Alert";
import * as Types from "../../../../constants/ActionType";

import * as requestMobileAction from "../../../../actions/request_mobile";
import { Redirect, Link } from "react-router-dom";

import NotAccess from "../../../Partials/NotAccess";

import Loading from "../../../../screens/Loading";

import moment from "moment";
import * as helper from "../../../../ultis/helpers";
import ModalIsEnd from "./Modal";
class RequestMobile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: {
        table: "",
        name: "",
        id: "",
        store_code: "",
      },
      modalIsEnd: {},
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
  handleIsEndCallback = (modal) => {
    this.setState({ modalIsEnd: modal });
  };
  componentDidMount() {
    var { store_code, branch_id } = this.props;
    this.props.fetchAllRequestMobile(store_code, branch_id);
  }

  //   componentWillReceiveProps(nextProps) {
  //     if (
  //       !shallowEqual(nextProps.theme, this.props.theme) ||
  //       nextProps.tabId != this.props.tabId
  //     ) {
  //       var theme = nextProps.theme;
  //       this.setState({
  //         store_id: theme.store_id,
  //         home_page_type: theme.home_page_type,
  //       });
  //     }
  //   }

  render() {
    var { requestMobile } = this.props;
    var { store_code, branch_id } = this.props;
    var { modal, modalIsEnd } = this.state;
    return (
      <div className="requestMobile">
        <div class="box-body">
          <Table
            store_code={store_code}
            branch_id={branch_id}
            requestMobile={requestMobile}
            handleIsEndCallback={this.handleIsEndCallback}
          />
        </div>
        <div class="box-footer"></div>
        <ModalIsEnd
          modal={modalIsEnd}
          store_code={store_code}
          branch_id={branch_id}
        />
 
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.authReducers.login.authentication,
    // shifts: state.shiftReducers.shift.allShift,
    alert: state.comboReducers.alert.alert_success,
    permission: state.authReducers.permission.data,
    requestMobile: state.requestMobileReducers.requestMobile.allRequestMobile,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchAllRequestMobile: (store_code, branch_id) => {
      dispatch(
        requestMobileAction.fetchAllRequestMobile(store_code, branch_id)
      );
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(RequestMobile);
