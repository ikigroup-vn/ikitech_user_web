import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Loading from "./Loading";
import * as action from "../actions/index";
import { getBranchId, setBranchId } from "../ultis/branchUtils";
import { shallowEqual } from "../ultis/shallowEqual";
import * as dashboardAction from "../actions/dashboard";
import * as branchAction from "../actions/branch"

class Store extends Component {
  componentDidMount() {
    this.props.fetchAllStore();

  }

  componentWillReceiveProps(nextProps, nextState) {


    if (!shallowEqual(nextProps.stores, this.props.stores)) {
      var stores = nextProps.stores
      if (stores.isApi) {
        var listStore = typeof stores.data == "undefined" ? [] : stores.data;
        if (listStore.length > 0) {
          var store_code = stores.data[0].store_code;
          this.setState({
            store_code: store_code
          })
          this.props.fetchBranchStore(store_code);
        } else {
          return <Redirect to="/home" />;
        }
      }


    }


    if (!shallowEqual(nextProps.branchStore, this.props.branchStore)) {
      const branch_id = getBranchId();

      if (nextProps.branchStore != null && nextProps.branchStore.length > 0) {
        if (branch_id != null) {
          const selectedBranch = this.props.branchStore.find(
            (branch) => branch.id == branch_id
          );
          this.props.changeBranch(selectedBranch);
        } else {
          const value = nextProps.branchStore[0]?.id;
          setBranchId(value)
        }
      }

    }
  }

  render() {
    var { stores } = this.props;

    if (this.props.auth) {

      if (this.props.loadingBranch == false && stores != null && typeof stores.store_code != null && getBranchId() != null && typeof getBranchId() != "undefined") {
        var store_code = stores.data[0].store_code;
        return <Redirect to={`/dashboard/${store_code}`} />;
      } else {
        return <Loading />;

      }

    } else if (this.props.auth === false) {
      return <Redirect to="/login" />;
    }
    else
      if (this.props.loadingBranch == true) {
        return <Loading />;
      } else {
        return <Loading />;
      }
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.authReducers.login.authentication,
    stores: state.storeReducers.store.allStore,
    branchStore: state.storeReducers.store.branchStore,
    loadingBranch: state.storeReducers.store.loadingBranch
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchAllStore: () => {
      dispatch(action.fetchAllStore());
    },
    fetchBranchStore: (store_code) => {
      dispatch(dashboardAction.fetchBranchStore(store_code))
    },
    changeBranch: (branchData) => {
      dispatch(branchAction.changeBranch(branchData))
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Store);
