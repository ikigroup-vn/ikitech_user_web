import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Loading from "./Loading";
import * as action from "../actions/index";

class Store extends Component {
  componentDidMount() {
    this.props.fetchAllStore();
  }

  render() {
    var { stores } = this.props;
    if (this.props.auth) {
      if (stores.isApi) {
        var listStore = typeof stores.data == "undefined" ? [] : stores.data;
        if (listStore.length > 0) {
          var store_code = stores.data[0].store_code;
          return <Redirect to={`/dashboard/${store_code}`} />;
        } else {
          return <Redirect to="/home" />;
        }
      }
      else{
        return <Loading />;

      }
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
    stores: state.storeReducers.store.allStore,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchAllStore: () => {
      dispatch(action.fetchAllStore());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Store);
