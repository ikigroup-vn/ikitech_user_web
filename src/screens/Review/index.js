import React, { Component } from "react";
import Sidebar from "../../components/Partials/Sidebar";
import Topbar from "../../components/Partials/Topbar";
import Footer from "../../components/Partials/Footer";
import Alert from "../../components/Partials/Alert";
import * as Types from "../../constants/ActionType";
import ModalRemove from "../../components/Review/ModalRemove";
import ListReview from "../../components/Review/ListReview"
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Loading from "../Loading";
import * as reviewAction from "../../actions/review";
import General from "../../components/Review/General";
import NotAccess from "../../components/Partials/NotAccess";

import Pagination from "../../components/Review/Pagination";

class Store extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modalremove: {
        title: "",
        id: "",
        filter_by: null,
        filter_by_value: null
      },
    }
  }


  handleDelCallBack = (modal) => {
    this.setState({ modalremove: modal });
  };
  componentDidMount() {

    this.props.fetchAllReview(this.props.match.params.store_code);

  }
  componentDidUpdate() {
    if (this.state.isLoading != true && typeof this.props.permission.product_list != "undefined") {
      var permissions = this.props.permission
      // var censorship = permissions.customer_review_censorship
      var isShow = permissions.customer_review_list


      this.setState({ isLoading: true, censorship:true, isShow })

    }
  }

  passFilter  = (filter_by, filter_by_value) =>{
    this.setState({filter_by, filter_by_value})
  }

  getParams = (filter_by, filter_by_value) => {
    var params = ``;
    if (filter_by != "" && filter_by != null && filter_by_value != "" && filter_by_value != null) {
      params = params + `&filter_by=${filter_by}&filter_by_value=${filter_by_value}`;
    }

    return params
  }

  render() {
    var { store_code } = this.props.match.params;
    var { alert, reviews } = this.props
    var { modalremove, censorship, isShow ,filter_by_value ,filter_by} = this.state
    if (this.props.auth) {
      return (
        <div id="wrapper">
          <Sidebar store_code={store_code} />
          <div className="col-10 col-10-wrapper">

            <div id="content-wrapper" className="d-flex flex-column">
              <div id="content">
                <Topbar store_code={store_code} />
                {typeof isShow == "undefined" ? <div style={{ height: "500px" }}></div> :
                  isShow == true ?

                    <div class="container-fluid">
                      <Alert
                        type={Types.ALERT_UID_STATUS}
                        alert={alert}
                      />
                      <div
                        style={{ display: "flex", justifyContent: "space-between" }}
                      >
                        <h4 className="h4 title_content mb-0 text-gray-800">
                          Đánh giá</h4>

                      </div>
                      <br></br>

                      <General passFilter = {this.passFilter} reviews={reviews} store_code={store_code} />

                      <div class="card shadow mb-4">
                        <div class="card-header py-3">
                          <h6 class="m-0 font-weight-bold text-primary">
                            Danh sách đánh giá
                          </h6>
                        </div>
                        <div class="card-body">
                          <ListReview
                          filter_by = {filter_by}
                          filter_by_value = {filter_by_value}
                          getParams  = {this.getParams}
                            censorship={censorship}
                            handleDelCallBack={this.handleDelCallBack}
                            store_code={store_code}
                            reviews={reviews}
                          ></ListReview>
                          <Pagination store_code={store_code} reviews={reviews} />

                        </div>
                      </div>
                    </div>
                    : <NotAccess />}

              </div>

              <Footer />
            </div>

            <ModalRemove modal={modalremove} store_code={store_code} />

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
    reviews: state.reviewReducers.review.allReview,
    alert: state.reviewReducers.alert.alert_uid,
    permission: state.authReducers.permission.data,

  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {

    fetchAllReview: (store_code) => {
      dispatch(reviewAction.fetchAllReview(store_code));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Store);
