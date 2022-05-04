import React, { Component } from "react";
import { connect } from "react-redux";
import Sidebar from "../../../components/Partials/Sidebar";
import Topbar from "../../../components/Partials/Topbar";
import Footer from "../../../components/Partials/Footer";
import Alert from "../../../components/Partials/Alert";
import * as Types from "../../../constants/ActionType";
import Table from "../../../components/Promotion/Discount/Table";
import Pagination from "../../../components/Promotion/Discount/Pagination";
import { Link, Redirect } from "react-router-dom";
import * as discountAction from "../../../actions/discount";
import ModalDelete from "../../../components/Promotion/Discount/Delete/Modal"
import ModalIsEnd from "../../../components/Promotion/Discount/Edit/Modal"
import NotAccess from "../../../components/Partials/NotAccess";


import Loading from "../../Loading";

class Discount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      is_end: 0,
      modal: {
        table: "",
        id: "",
        store_code: ""
      },
      modalIsEnd: {}
    };
  }

  onChange = (e) => {
    var target = e.target;
    var name = target.name;
    var value = Number(target.value);
    this.setState({ [name]: value });
  };
  handleDelCallBack = (modal) => {
    this.setState({ modal: modal });
  };
  handleIsEndCallback = (modal) => {
    this.setState({ modalIsEnd: modal });
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.is_end !== this.state.is_end) {
      var { store_code } = this.props.match.params;
      var is_end = Number(nextState.is_end);
      switch (is_end) {
        case 0:
          this.props.fetchAllDiscount(store_code);
          break;
        case 1:
          this.props.fetchAllDiscountEnd(store_code);
          break;
        case 2:
          this.props.fetchAllDiscount(store_code);
          break;
        default:
          break;
      }
    }
    return true;
  }



  componentDidMount() {
    this.props.fetchAllDiscount(this.props.match.params.store_code);
  }

  componentDidUpdate() {
    if (this.state.isLoading != true && typeof this.props.permission.product_list != "undefined") {
      var permissions = this.props.permission
      var isShow = permissions.promotion


      this.setState({ isLoading: true, insert : true, update : true, _delete : true ,isShow})

    }
  }
  render() {
    var { params } = this.props.match;
    var { is_end, modal, modalIsEnd } = this.state;
    var { discounts } = this.props;
    var { store_code } = this.props.match.params
    var displayPag = is_end == 0 ? "hide" : null;
    var { insert, update, _delete, isShow } = this.state
    if (this.props.auth) {
      return (
        <div id="wrapper">
          <Sidebar store_code={store_code} />
          <div className="col-10 col-10-wrapper">

            <div id="content-wrapper" className="d-flex flex-column">
              <div id="content">
                <Topbar store_code={params.store_code} />
                {typeof isShow == "undefined" ? <div></div> : isShow == true ?

                <div class="container-fluid">
                  <Alert
                    type={Types.ALERT_UID_STATUS}
                    alert={this.props.alert}

                  />
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <h3 class="h3 title_content mb-2 text-gray-800">Giảm giá sản phẩm</h3>
                    
                    <Link
                      to={`/discount/create/${params.store_code}`}
                      class={`btn btn-info btn-icon-split  ${insert == true ? "show" : "hide"}`}                  >
                      <span style = {{display : "flex" , margin : "auto" , height: "100%",
    "justify-content": "center",
    "align-items": "center"}} class="icon text-white-50">
                        <i class="fas fa-plus"></i>
                      </span>
                      <span style = {{margin : "auto"}} class="text">Tạo giảm giá</span>
                    </Link>
                  </div>

                  <div class="form-group">
                 
                    <div class="col-sm-3" style={{ paddingLeft: "0px" }}>
                      <select
                        name="is_end"
                        id="input"
                        class="form-control"
                        required="required"
                        value={is_end}
                        onChange={this.onChange}
                      >
                        <option value="0">Chuẩn bị diễn ra</option>
                        <option value="2">Đang diễn ra</option>

                        <option value="1">Đã kết thúc</option>
                      </select>
                    </div>
                  </div>

                  <div class="card shadow mb-4">
                    <div class="card-header py-3">
                      <h6 class="m-0 font-weight-bold text-primary">
                        Danh sách chương trình
                      </h6>
                    </div>
                    <div class="card-body">
                      <Table update={update} _delete={_delete} is_end={is_end} handleIsEndCallback={this.handleIsEndCallback} handleDelCallBack={this.handleDelCallBack} params={params} discounts={discounts} />
                      <Pagination
                        display={displayPag}
                        params={params}
                        discounts={discounts}
                        store_code={store_code}
                      />
                    </div>
                  </div>
                </div>
              : <NotAccess />}

            </div>
            <ModalDelete modal={modal} />
            <ModalIsEnd modal={modalIsEnd} />


            <Footer />
          </div>
        </div>
        </div >

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
    discounts: state.discountReducers.discount.allDiscount,
    alert: state.discountReducers.alert.alert_success,
    permission: state.authReducers.permission.data,

  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchAllDiscount: (store_code) => {
      dispatch(discountAction.fetchAllDiscount(store_code));
    },
    fetchAllDiscountEnd: (store_code) => {
      dispatch(discountAction.fetchAllDiscountEnd(store_code));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Discount);
