import React, { Component } from "react";
import Sidebar from "../../components/Partials/Sidebar";
import Topbar from "../../components/Partials/Topbar";
import Footer from "../../components/Partials/Footer";
import Table from "../../components/Bill/Table";
import { Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import Loading from "../Loading";
import * as billAction from "../../actions/bill";
import Chat from "../../components/Chat";
import Pagination from "../../components/Bill/Pagination";
import NotAccess from "../../components/Partials/NotAccess";
import queryString from "query-string";
import * as customerAction from "../../actions/customer";
import { DateRangePickerComponent } from "@syncfusion/ej2-react-calendars";
import moment from "moment";
import * as helper from "../../ultis/helpers";

class Bill extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showChatBox: "hide",
      customerId: "",
      customerImg: "",
      statusOrder: "",
      isSearch: false,
      searchValue: "",
      statusPayment: "",
      numPage: 20,
      agency_by_customer_id:
        queryString.parse(window.location.search).agency_by_customer_id || null,
    };
  }
  closeChatBox = (status) => {
    this.setState({
      showChatBox: status,
    });
  };

  onChangeNumPage = (e) => {
    var { store_code } = this.props.match.params;
    var { statusOrder, statusPayment, searchValue } = this.state;
    var numPage = e.target.value;
    this.setState({
      numPage,
    });
    var params_agency =
      this.state.agency_by_customer_id != null
        ? `&agency_by_customer_id=${this.state.agency_by_customer_id}`
        : null;

    var params = `&search=${searchValue}&order_status_code=${statusOrder}&payment_status_code=${statusPayment}&limit=${numPage}`
    const branch_id = localStorage.getItem("branch_id")
    this.props.fetchAllBill(store_code, 1,branch_id, params, params_agency);
  }

  componentDidMount() {
    var { store_code, status_code } = this.props.match.params;

    if (
      this.props.customer.id !== this.state.agency_by_customer_id &&
      this.state.agency_by_customer_id != null
    ) {
      this.props.fetchCustomerId(store_code, this.state.agency_by_customer_id);
    }

    var params_agency =
      this.state.agency_by_customer_id != null
        ? `&agency_by_customer_id=${this.state.agency_by_customer_id}`
        : null;
    var status = status_code;
    var params =
      typeof status_code == "undefined"
        ? null
        : status_code != "PAID"
        ? `&field_by=order_status_code&field_by_value=${status_code}`
        : `&field_by=payment_status_code&field_by_value=${status_code}`;

    var status_order = status == "PAID" ? null : status;
    var status_payment = status == "PAID" ? status : null;
    if (status_order != null) this.setState({ statusOrder: status_order });
    if (status_payment != null)
      this.setState({ statusPayment: status_payment });
      const branch_id = localStorage.getItem("branch_id")
    this.props.fetchAllBill(store_code, 1,branch_id, params, params_agency);
  }
  handleShowChatBox = (customerId, customerImg, customerName, status) => {
    var { store_code } = this.props.match.params;

    this.setState({
      showChatBox: status,
      customerId: customerId,
      customerImg: customerImg,
      customerName: customerName,
    });
    this.props.fetchChatId(store_code, customerId);
  };
  onChangeSearch = (e) => {
    this.setState({ searchValue: e.target.value });
  };
  onchangeStatusOrder = (data) => {
    this.setState({ statusOrder: data });
  };
  onchangeStatusPayment = (data) => {
    this.setState({ statusPayment: data });
  };
  searchData = (e) => {
    e.preventDefault();
    var { store_code } = this.props.match.params;
    var { searchValue } = this.state;
    var params = `&search=${searchValue}`;
    this.setState({ statusPayment: "", statusOrder: "", numPage: 20 })
    var params_agency = this.state.agency_by_customer_id != null ? `&agency_by_customer_id=${this.state.agency_by_customer_id}` : null
    const branch_id = localStorage.getItem("branch_id")
    this.props.fetchAllBill(store_code, 1,branch_id, params, params_agency);
  };

  fetchAllData = () => {
    var { store_code } = this.props.match.params;
    var params_agency = this.state.agency_by_customer_id != null ? `&agency_by_customer_id=${this.state.agency_by_customer_id}` : null
    const branch_id = localStorage.getItem("branch_id")
    this.props.fetchAllBill(store_code, 1,branch_id, null, params_agency);
  };

  componentWillReceiveProps(nextProps) {
    if (
      this.state.isLoading != true &&
      typeof nextProps.permission.product_list != "undefined"
    ) {
      var permissions = nextProps.permission;
      var isShow = permissions.order_list;
      var chat_allow = permissions.chat_allow;

      this.setState({ isLoading: true, chat_allow, isShow });
    }
  }

  onchangeDateFromTo = (e) => {
    var from = "";
    var { store_code } = this.props.match.params;

    var to = "";
    try {
      from = moment(e.value[0], "DD-MM-YYYY").format("YYYY-MM-DD");
      to = moment(e.value[1], "DD-MM-YYYY").format("YYYY-MM-DD");
    } catch (error) {
      from = null;
      to = null;
    }
    var params_agency =
      this.state.agency_by_customer_id != null
        ? `&agency_by_customer_id=${this.state.agency_by_customer_id}`
        : null;

    var params = `&time_from=${from}&time_to=${to}`;
    if (from == null || to == null) {
      params = "";
    }
    const branch_id = localStorage.getItem("branch_id")
    this.props.fetchAllBill(store_code, 1,branch_id, params, params_agency);


  }

  render() {
    var { store_code } = this.props.match.params;
    var { bills, chat, customer } = this.props;
    var {
      showChatBox,
      customerId,
      customerImg,
      customerName,
      statusOrder,
      isSearch,
      searchValue,
      statusPayment,
      numPage,
      chat_allow,
      isShow,
    } = this.state;
    if (this.props.auth) {
      return (
        <div id="wrapper">
          <Sidebar store_code={store_code} />
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
                        Đơn hàng{" "}
                        {typeof customer.id != "undefined" &&
                        customer.id == this.state.agency_by_customer_id
                          ? `của Đại lý ${customer.name}`
                          : null}
                      </h4>{" "}
                    </div>

                    <br></br>
                    <div className="card shadow ">
                      <div className="card-header py-3">
                        <div
                          class="row"
                          style={{ "justify-content": "space-between" }}
                        >
                          <form onSubmit={this.searchData}>
                            <div
                              class="input-group mb-6"
                              style={{ padding: "0 20px" }}
                            >
                              <input
                                style={{ maxWidth: "400px", minWidth: "300px" }}
                                type="search"
                                name="txtSearch"
                                value={searchValue}
                                onChange={this.onChangeSearch}
                                class="form-control"
                                placeholder="Tìm mã đơn, tên, SĐT"
                              />
                              <div class="input-group-append">
                                <button class="btn btn-primary" type="submit">
                                  <i class="fa fa-search"></i>
                                </button>
                              </div>
                            </div>
                            <p class="total-item" id="sale_user_name">
                              <span className="num-total_item">
                                {bills.total}&nbsp;
                              </span>
                              <span className="text-total_item" id="user_name">
                                hóa đơn
                              </span>{" "}
                              &nbsp;&nbsp;
                              <DateRangePickerComponent
                                id="daterangepicker"
                                placeholder="Khoảng thời gian..."
                                format="dd-MM-yyyy"
                                onChange={this.onchangeDateFromTo}
                              />
                            </p>
                          </form>
                          <div style={{ display: "flex" }}>
                            <div style={{ display: "flex" }}>
                              <span
                                style={{
                                  margin: "20px 10px auto auto",
                                }}
                              >
                                Hiển thị
                              </span>
                              <select
                                style={{
                                  margin: "auto",
                                  marginTop: "10px",
                                  marginRight: "20px",
                                  width: "70px",
                                }}
                                onChange={this.onChangeNumPage}
                                value={numPage}
                                name="numPage"
                                class="form-control"
                              >
                                <option value="10">10</option>
                                <option value="20" selected>
                                  20
                                </option>
                                <option value="50">50</option>
                              </select>
                            </div>

                            <Pagination
                              searchValue={searchValue}
                              limit={numPage}
                              status_payment={statusPayment}
                              store_code={store_code}
                              bills={bills}
                              status_order={statusOrder}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="card-body">
                        <Table
                          chat_allow={chat_allow}
                          onchangeStatusOrder={this.onchangeStatusOrder}
                          onchangeStatusPayment={this.onchangeStatusPayment}
                          numPage={numPage}
                          statusOrder={statusOrder}
                          statusPayment={statusPayment}
                          handleShowChatBox={this.handleShowChatBox}
                          store_code={store_code}
                          bills={bills}
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
    bills: state.billReducers.bill.allBill,
    auth: state.authReducers.login.authentication,
    chat: state.chatReducers.chat.chatID,
    permission: state.authReducers.permission.data,
    customer: state.customerReducers.customer.customerID,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchAllBill: (id, page,branch_id, params, params_agency) => {
      dispatch(billAction.fetchAllBill(id, page,branch_id, params, params_agency));
    },
    fetchChatId: (store_code, customerId) => {
      dispatch(billAction.fetchChatId(store_code, customerId));
    },

    fetchCustomerId: (store_code, customerId) => {
      dispatch(customerAction.fetchCustomerId(store_code, customerId));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Bill);
