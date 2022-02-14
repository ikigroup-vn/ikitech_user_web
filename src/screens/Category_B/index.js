import React, { Component } from "react";
import $ from "jquery";
import * as Types from "../../constants/ActionType";
import Sidebar from "../../components/Partials/Sidebar";
import Topbar from "../../components/Partials/Topbar";
import Footer from "../../components/Partials/Footer";
import ModalDelete from "../../components/Category_B/Delete/Modal";
import NotAccess from "../../components/Partials/NotAccess";

import Table from "../../components/Category_B/Table";
import Alert from "../../components/Partials/Alert";
import { Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import Loading from "../Loading";
import * as categoryBAction from "../../actions/category_blog";
import config from "../../ultis/datatable"
class CategoryBlog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: {
        title: "",
        id: "",
        name: ""
      },
    };
  }

  handleDelCallBack = (modal) => {
    this.setState({ modal: modal });
  };

  componentDidMount() {
    this.props.fetchAllCategoryB(this.props.match.params.store_code);
  }
  componentWillReceiveProps(nextProps) {

    $("#dataTable").DataTable().destroy();
    if (this.state.isLoading != true && typeof nextProps.permission.product_list != "undefined") {
      var permissions = nextProps.permission
      var insert = permissions.post_category_add 
      var update = permissions.post_category_update 
      var _delete = permissions.post_category_remove 
      var isShow = permissions.post_category_list

      this.setState({ isLoading: true , insert,update,_delete  , isShow})

    }
  }

  componentDidUpdate(prevProps, prevState) {


    $("#dataTable").DataTable(
      config()
    );

    $("#dataTable").DataTable(config());

    window.$(".dataTables_info").hide()

  }

  render() {
    var { store_code } = this.props.match.params
    var { category_blog } = this.props
    var { insert, update, _delete , isShow } = this.state

    if (this.props.auth) {
      return (
        <div id="wrapper">
          <Sidebar store_code={store_code} />
          <div className="col-10 col-10-wrapper">
          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
              <Topbar store_code={store_code} />
              {typeof isShow == "undefined" ?             <div style = {{height : "500px"}}></div> :
 isShow == true ?

              <div className="container-fluid">
                <Alert
                  type={Types.ALERT_UID_STATUS}
                  alert={this.props.alert}
                />
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <h4 className="h4 title_content mb-0 text-gray-800">
                    Danh mục bài viết
                  </h4>{" "}
                  <Link to={`/posts/category/create/${store_code}`}
                    class={`btn btn-info btn-icon-split btn-sm ${insert == true ? "show" : "hide"}`}                  >
                    <span class="icon text-white-50">
                      <i class="fas fa-plus"></i>
                    </span>
                    <span class="text">Thêm danh mục</span>
                  </Link>
                </div>

                <br></br>
                <div className="card shadow mb-4">
                  <div className="card-header py-3">
                    <h6 className="m-0 title_content font-weight-bold text-primary">
                      Danh sách danh mục
                    </h6>
                  </div>
                  <div className="card-body">
                    <Table update = {update} _delete = {_delete} store_code={store_code} handleDelCallBack={this.handleDelCallBack} data={category_blog} />
                  </div>
                </div>
              </div>
                                            : <NotAccess />}

            </div>

            <Footer />
          </div>
          <ModalDelete store_code={store_code} modal={this.state.modal} />
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
    category_blog: state.categoryBReducers.categoryBlog.allCategoryB,
    auth: state.authReducers.login.authentication,
    alert: state.categoryBReducers.alert.alert_success,
    permission: state.authReducers.permission.data,

  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchAllCategoryB: (id) => {
      dispatch(categoryBAction.fetchAllCategoryB(id));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CategoryBlog);
