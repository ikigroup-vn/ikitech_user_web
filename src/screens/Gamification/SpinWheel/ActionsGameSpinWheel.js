import { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import Sidebar from "../../../components/Partials/Sidebar";
import Topbar from "../../../components/Partials/Topbar";
import Loading from "../../Loading";
import NotAccess from "../../../components/Partials/NotAccess";
import ActionsGameSpinWheelContent from "./ActionsGameSpinWheelContent";
import Footer from "../../../components/Partials/Footer";
import * as AgencyAction from "../../../actions/agency";
import * as groupCustomerAction from "../../../actions/group_customer";
const ActionsGameSpinWheelStyles = styled.div``;

class ActionsGameSpinWheel extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    const { fetchAllAgencyType, fetchGroupCustomer } = this.props;
    const { store_code } = this.props.match.params;
    fetchAllAgencyType(store_code);
    fetchGroupCustomer(store_code);
    if (this.state.isLoading !== true) {
      var isShow = true;
      this.setState({ isShow, isLoading: true });
    }
  }
  render() {
    const { auth } = this.props;
    const { store_code } = this.props.match.params;
    const { isShow } = this.state;
    if (auth) {
      return (
        <ActionsGameSpinWheelStyles id="wrapper">
          <Sidebar store_code={store_code} />
          <div className="col-10 col-10-wrapper">
            <div id="content-wrapper" className="d-flex flex-column">
              <div id="content">
                <Topbar store_code={store_code} />
                {typeof isShow == "undefined" ? (
                  <div style={{ height: "500px" }}></div>
                ) : isShow == true ? (
                  <div class="container-fluid">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <h4 className="h4 title_content mb-0 text-gray-800">
                        Thêm trò chơi quay thưởng
                      </h4>
                    </div>
                    <br></br>
                    <div class="card mb-4">
                      <div class="card-header title_content">
                        Nhập thông tin trò chơi
                      </div>
                      <div class="card-body" style={{ padding: "0.8rem" }}>
                        <ActionsGameSpinWheelContent store_code={store_code} />
                      </div>
                    </div>
                  </div>
                ) : (
                  <NotAccess></NotAccess>
                )}
              </div>
              <Footer />
            </div>
          </div>
        </ActionsGameSpinWheelStyles>
      );
    } else if (auth === false) {
      return <Redirect to="/login" />;
    } else {
      return <Loading />;
    }
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.authReducers.login.authentication,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchAllAgencyType: (store_code) => {
      dispatch(AgencyAction.fetchAllAgencyType(store_code));
    },
    fetchGroupCustomer: (store_code) => {
      dispatch(groupCustomerAction.fetchGroupCustomer(store_code));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActionsGameSpinWheel);
