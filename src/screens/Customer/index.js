import React, { Component } from "react";
import Sidebar from "../../components/Partials/Sidebar";
import Topbar from "../../components/Partials/Topbar";
import Footer from "../../components/Partials/Footer";
import Pagination from "../../components/Customer/Pagination";
import Table from "../../components/Customer/Table";
import { Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import Loading from "../Loading";
import * as customerAction from "../../actions/customer";
import Chat from "../../components/Chat";
import * as Env from "../../ultis/default";
import NotAccess from "../../components/Partials/NotAccess";
import { getQueryParams, setQueryParamInUrl } from "../../ultis/helpers"
import ModalCreate from "../../components/Customer/ModalCreate"
import getChannel, { IKIPOS, IKITECH } from "../../ultis/channel";
import * as placeAction from "../../actions/place";
import ModalEdit from "../../components/Customer/ModalEdit"
class Customer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showChatBox: "hide",
      searchValue: "",
      paginate: 1,
      openModal: false,
      openModalEdit: false,

      id_customer: "",
      modal: ""
    };
  }

  openModal = () => {
    this.setState({ openModal: true })
  }
  resetModal = () => {
    this.setState({ openModal: false })

  }
  resetModalEdit = () => {
    this.setState({ openModalEdit: false })

  }



  handleShowChatBox = (customerId, status) => {
    this.setState({
      showChatBox: status,
      customerId: customerId,
    });
    var { store_code } = this.props.match.params;
    this.props.fetchCustomerId(store_code, customerId);
    this.props.fetchChatId(store_code, customerId);
  };

  onChangeSearch = (e) => {
    this.setState({ searchValue: e.target.value });
  };
  searchData = (e) => {
    e.preventDefault();
    var { store_code } = this.props.match.params;
    var { searchValue } = this.state;
    var params = `&search=${searchValue}`;
    this.props.fetchAllCustomer(store_code, 1, params);
  };
  componentWillReceiveProps(nextProps) {
    if (
      this.state.isLoading != true &&
      typeof nextProps.permission.product_list != "undefined"
    ) {
      var permissions = nextProps.permission;
      var chat_allow = permissions.chat_allow;

      var isShow = permissions.customer_list;
      this.setState({ isLoading: true, isShow, chat_allow });
    }
  }

  componentDidMount() {
    setQueryParamInUrl("pag", pag)
    var pag = getQueryParams("pag") || 1


    this.props.fetchAllCustomer(this.props.match.params.store_code, pag);
    this.props.fetchPlaceProvince()

  }

  handleSetIdCustomer = (id) => {
    this.setState({
      id_supplier: id
    })
  }

  handleSetInfor = (item) => {
    this.setState({ modal: item })
  }

  closeChatBox = (status) => {
    this.setState({
      showChatBox: status,
    });
  };
  getPaginate = (num) => {
    this.setState({ paginate: num })
  }
  render() {
    var { customer, chat, customers } = this.props;
    console.log(customer, customers);
    var customerImg =
      typeof customer.avatar_image == "undefined" ||
        customer.avatar_image == null
        ? Env.IMG_NOT_FOUND
        : customer.avatar_image;
    var customerId =
      typeof customer.id == "undefined" || customer.id == null
        ? null
        : customer.id;
    var customerName =
      typeof customer.name == "undefined" || customer.name == null
        ? "Trống"
        : customer.name;

    var { store_code } = this.props.match.params;
    var { showChatBox, isShow, chat_allow, searchValue, paginate, openModal, modal, openModalEdit } = this.state;
    var { wards, district, province } = this.props

    if (this.props.auth) {
      return (
        <div id="wrapper">
          <Sidebar store_code={store_code} />
          <ModalCreate resetModal={this.resetModal} openModal={openModal} store_code={store_code} wards={wards} district={district} province={province} />
          <ModalEdit openModalEdit={openModalEdit} resetModal={this.resetModalEdit} store_code={store_code} wards={wards} district={district} province={province} modal={modal} />

          <div className="col-10 col-10-wrapper">
            <div id="content-wrapper" className="d-flex flex-column">
              <div id="content">
                <Topbar store_code={store_code} />
                {typeof isShow == "undefined" ? (
                  <div style={{ height: "500px" }}></div>
                ) : isShow == true ? (
                  <div className="container-fluid">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <h4 className="h4 title_content mb-0 text-gray-800">
                        Danh sách khách hàng
                      </h4>{" "}
                      <a
                        data-toggle="modal"
                        data-target="#modalCreateCustomer"
                        class="btn btn-info btn-icon-split btn-sm"
                        style={{ height: "fit-content", width: "fit-content" }}
                      >
                        <span class="icon text-white-50">
                          <i class="fas fa-plus"></i>
                        </span>
                        <span
                          style={{
                            color: "white",
                          }}
                          class={`text `}
                        >
                          Thêm khách hàng
                        </span>
                      </a>
                    </div>

                    <br></br>
                    <div className="card shadow mb-4">
                      <div className="card-header py-3">
                        <form onSubmit={this.searchData}>
                          <div
                            class="input-group mb-6"
                            style={{ marginTop: "10px" }}
                          >
                            <input
                              style={{ maxWidth: "400px" }}
                              type="search"
                              name="txtSearch"
                              value={searchValue}
                              onChange={this.onChangeSearch}
                              class="form-control"
                              placeholder="Tìm khách hàng"
                            />
                            <div class="input-group-append">
                              <button class="btn btn-primary" type="submit">
                                <i class="fa fa-search"></i>
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                      <div className="card-body">
                        <Table
                          handleSetInfor={this.handleSetInfor}
                          paginate={paginate}
                          chat_allow={chat_allow}
                          showChatBox={showChatBox}
                          handleShowChatBox={this.handleShowChatBox}
                          store_code={store_code}
                          handleDelCallBack={this.handleDelCallBack}
                          customers={customers}
                        />

                        <Pagination
                          getPaginate={this.getPaginate}

                          store_code={store_code}
                          customers={customers}
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <NotAccess />
                )}
              </div>

              <Footer />
            </div>
            {/* <Chat customerImg = {customerImg} customerId = {customerId} chat = {chat} store_code = {store_code}/> */}

            <Chat
              customerName={customerName}
              customerImg={customerImg}
              customerId={customerId}
              chat={chat}
              store_code={store_code}
              closeChatBox={this.closeChatBox}
              showChatBox={showChatBox}
            ></Chat>
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
    customers: state.customerReducers.customer.allCustomer,
    auth: state.authReducers.login.authentication,
    customer: state.customerReducers.customer.customerID,
    chat: state.chatReducers.chat.chatID,
    permission: state.authReducers.permission.data,
    wards: state.placeReducers.wards,
    province: state.placeReducers.province,
    district: state.placeReducers.district
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchAllCustomer: (id, page, params) => {
      dispatch(customerAction.fetchAllCustomer(id, page, params));
    },
    fetchCustomerId: (store_code, customerId) => {
      dispatch(customerAction.fetchCustomerId(store_code, customerId));
    },
    fetchChatId: (store_code, customerId) => {
      dispatch(customerAction.fetchChatId(store_code, customerId));
    },
    fetchPlaceProvince: () => {
      dispatch(placeAction.fetchPlaceProvince());
    },

  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Customer);
