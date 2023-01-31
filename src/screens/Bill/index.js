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
import { getBranchId } from "../../ultis/branchUtils";
import history from "../../history";
import { getQueryParams, insertParam } from "../../ultis/helpers";

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
      runAsync: "",
      orderFrom: "",
      numPage: 20,
      agency_by_customer_id:
        queryString.parse(window.location.search).agency_by_customer_id || null,
      collaborator_by_customer_id:
        queryString.parse(window.location.search).collaborator_by_customer_id ||
        null,
      time_from: "",
      time_to: "",
      loadingShipment: "",
      paginate: 1,
    };
  }
  closeChatBox = (status) => {
    this.setState({
      showChatBox: status,
    });
  };

  setPaginate = (page) => {
    this.setState({
      paginate: page,
    });
  };
  onChangeNumPage = (e) => {
    var { store_code } = this.props.match.params;
    var {
      statusOrder,
      statusPayment,
      searchValue,
      orderFrom,
      time_from,
      time_to,
      collaborator_by_customer_id,
    } = this.state;
    var numPage = e.target.value;
    this.setState({
      numPage,
    });
    var params_agency =
      this.state.agency_by_customer_id != null
        ? `&agency_by_customer_id=${this.state.agency_by_customer_id}`
        : null;

    var params = "";
    params =
      params +
      this.getParams(
        time_from,
        time_to,
        searchValue,
        statusOrder,
        statusPayment,
        numPage,
        orderFrom,
        collaborator_by_customer_id
      );
    insertParam({
      limit: numPage,
      page: 1,
    });
    // var params = `&search=${searchValue}&order_status_code=${statusOrder}&payment_status_code=${statusPayment}&limit=${numPage}`
    const branch_id = localStorage.getItem("branch_id");
    this.props.fetchAllBill(store_code, 1, branch_id, params, params_agency);
  };
  goBack = () => {
    var { store_code } = this.props.match.params;
    var { collaborator_by_customer_id, agency_by_customer_id } = this.state;
    const search = getQueryParams("search");
    const page = getQueryParams("page") || 1;
    const params = `&page=${page}${search ? `&search=${search}` : ""}`;
    if (agency_by_customer_id != null)
      history.replace(`/agency/${store_code}?tab-index=1${params}`);
    else {
      history.replace(`/collaborator/${store_code}?tab-index=1${params}`);
    }
  };
  componentDidMount() {
    var { store_code, status_code } = this.props.match.params;
    var orderFrom = getQueryParams("order_from_list");
    var limit = getQueryParams("limit");
    var search = getQueryParams("search");
    var from = getQueryParams("from");
    var to = getQueryParams("to");
    var statusOrder = getQueryParams("order_status_code");
    var statusPayment = getQueryParams("payment_status_code");
    var { collaborator_by_customer_id } = this.state;

    if (
      this.props.customer.id !== this.state.agency_by_customer_id &&
      this.state.agency_by_customer_id != null
    ) {
      this.props.fetchCustomerId(store_code, this.state.agency_by_customer_id);
    }

    if (
      this.props.customer.id !== this.state.collaborator_by_customer_id &&
      this.state.collaborator_by_customer_id != null
    ) {
      this.props.fetchCustomerId(
        store_code,
        this.state.collaborator_by_customer_id
      );
    }

    var params_agency =
      this.state.agency_by_customer_id != null
        ? `&agency_by_customer_id=${this.state.agency_by_customer_id}`
        : null;
    var status = status_code;
    var params =
      typeof status_code == "undefined"
        ? ""
        : status_code != "PAID"
        ? `&field_by=order_status_code&field_by_value=${status_code}`
        : `&field_by=payment_status_code&field_by_value=${status_code}`;
    if (from && to) {
      // from = moment(from, "DD-MM-YYYY").format("YYYY-MM-DD");
      // to = moment(to, "DD-MM-YYYY").format("YYYY-MM-DD");
      this.setState({ time_from: from, time_to: to });
    }
    if (search) {
      this.setState({
        searchValue: search,
      });
    }
    if (limit) {
      this.setState({
        numPage: limit,
      });
    }
    if (orderFrom) {
      this.setState({
        orderFrom: orderFrom,
      });
    }
    if (statusOrder) {
      this.setState({
        statusOrder: statusOrder,
      });
    }
    if (statusPayment) {
      this.setState({
        statusPayment: statusPayment,
      });
    }
    params =
      params +
      this.getParams(
        from,
        to,
        search,
        statusOrder,
        statusPayment,
        limit,
        orderFrom,
        collaborator_by_customer_id
      );

    console.log(params);
    var status_order = status == "PAID" ? null : status;
    var status_payment = status == "PAID" ? status : null;
    if (status_order != null) this.setState({ statusOrder: status_order });
    if (statusOrder) this.setState({ statusOrder: statusOrder });
    if (statusPayment) this.setState({ statusPayment: statusPayment });

    if (status_payment != null)
      this.setState({ statusPayment: status_payment });
    const branch_id = getBranchId();

    var page = getQueryParams("page") ?? 1;
    this.props.fetchAllBill(store_code, page, branch_id, params, params_agency);
    this.setState({ loadingShipment: helper.randomString(10) });
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
  onchangeOrderFrom = (data) => {
    this.setState({ orderFrom: data });
  };
  searchData = (e) => {
    e.preventDefault();
    var { store_code } = this.props.match.params;
    var {
      searchValue,
      numPage,
      time_from,
      time_to,
      statusOrder,
      statusPayment,
      orderFrom,
      collaborator_by_customer_id,
    } = this.state;
    var params = "";
    params = this.getParams(
      time_from,
      time_to,
      searchValue,
      statusOrder,
      statusPayment,
      numPage,
      orderFrom,
      collaborator_by_customer_id
    );
    history.push(`/order/${store_code}?page=1${params ? `${params}` : ""}`);

    // this.setState({ statusPayment: "", statusOrder: "", numPage: 20 });
    var params_agency =
      this.state.agency_by_customer_id != null
        ? `&agency_by_customer_id=${this.state.agency_by_customer_id}`
        : null;
    const branch_id = localStorage.getItem("branch_id");
    this.props.fetchAllBill(store_code, 1, branch_id, params, params_agency);
  };

  fetchAllData = () => {
    var { store_code } = this.props.match.params;
    var params_agency =
      this.state.agency_by_customer_id != null
        ? `&agency_by_customer_id=${this.state.agency_by_customer_id}`
        : null;
    const branch_id = localStorage.getItem("branch_id");
    this.props.fetchAllBill(store_code, 1, branch_id, null, params_agency);
  };

  getParamDate = () => {
    const queryParams = new URLSearchParams(window.location.search);
    const time_from = queryParams.get("time_from");
    const time_to = queryParams.get("time_to");
    var params = `&time_from=${time_from}&time_to=${time_to}`;
    return params;
  };

  componentWillReceiveProps(nextProps, nextState) {
    // if (this.state.paramDate != this.getParamDate() && this.state.paramDate.from != null) {
    //   this.setState({
    //     paramDate: this.getParamDate()
    //   })

    //   var { store_code } = this.props.match.params;
    //   const branch_id = getBranchId()
    //   var params_agency =
    //   this.state.agency_by_customer_id != null
    //     ? `&agency_by_customer_id=${this.state.agency_by_customer_id}`
    //     : null;
    //   this.props.fetchAllBill(store_code, 1, branch_id, this.getParamDate(), params_agency);
    // }

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

  getParams = (
    from,
    to,
    searchValue,
    statusOrder,
    statusPayment,
    numPage,
    orderFrom,
    collaborator_by_customer_id
  ) => {
    var params = ``;
    if (to != "" && to != null) {
      params = params + `&time_to=${to}`;
    }
    if (from != "" && from != null) {
      params = params + `&time_from=${from}`;
    }
    if (searchValue != "" && searchValue != null) {
      params = params + `&search=${searchValue}`;
    }
    if (statusOrder != "" && statusOrder != null) {
      params = params + `&order_status_code=${statusOrder}`;
    }
    if (statusPayment != "" && statusPayment != null) {
      params = params + `&payment_status_code=${statusPayment}`;
    }
    if (numPage != "" && numPage != null) {
      params = params + `&limit=${numPage}`;
    }
    if (orderFrom != "" && orderFrom != null) {
      params = params + `&order_from_list=${orderFrom}`;
    }
    if (
      collaborator_by_customer_id != "" &&
      collaborator_by_customer_id != null
    ) {
      params =
        params + `&collaborator_by_customer_id=${collaborator_by_customer_id}`;
    }
    return params;
  };

  exportAllListOrder = () => {
    var { store_code } = this.props.match.params;

    var {
      time_from,
      time_to,
      searchValue,
      statusOrder,
      statusPayment,
      numPage,
      orderFrom,
      collaborator_by_customer_id,
    } = this.state;

    var params = this.getParams(
      time_from,
      time_to,
      searchValue,
      statusOrder,
      statusPayment,
      numPage,
      orderFrom,
      collaborator_by_customer_id
    );

    const branch_id = getBranchId();
    var params_agency =
      this.state.agency_by_customer_id != null
        ? `&agency_by_customer_id=${this.state.agency_by_customer_id}`
        : null;
    this.props.exportAllListOrder(
      store_code,
      1,
      branch_id,
      params,
      params_agency
    );
  };

  onchangeDateFromTo = (e) => {
    console.log("xxxxxx");
    var from = "";
    var { store_code } = this.props.match.params;
    var {
      searchValue,
      statusOrder,
      statusPayment,
      numPage,
      orderFrom,
      collaborator_by_customer_id,
    } = this.state;
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

    var params = this.getParams(
      from,
      to,
      searchValue,
      statusOrder,
      statusPayment,
      numPage,
      orderFrom,
      collaborator_by_customer_id
    );

    const branch_id = getBranchId();
    console.log("abcxyz: ", from, to, params);

    if (
      e != null &&
      e.value != null &&
      e.value[0] != null &&
      e.value[1] != null
    ) {
      // var from2 = moment(e.value[0], "YYYY-MM-DD").format("DD-MM-YYYY");
      // var to2 = moment(e.value[1], "YYYY-MM-DD").format("DD-MM-YYYY");

      insertParam({
        from: from,
        to: to,
        page: 1,
      });
    } else {
      insertParam({
        from: "",
        to: "",
      });
    }

    this.props.fetchAllBill(store_code, 1, branch_id, params, params_agency);
    this.setState({ time_from: from, time_to: to });
  };

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
      statusOrder,
      numPage,
      chat_allow,
      isShow,
      time_from,
      time_to,
      orderFrom,
      runAsync,
      collaborator_by_customer_id,
    } = this.state;
    console.log(time_from, time_to);
    var listBill = typeof bills.data == "undefined" ? [] : bills.data;

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
                        {typeof customer.id != "undefined" &&
                        customer.id == this.state.collaborator_by_customer_id
                          ? `của CTV ${customer.name}`
                          : null}
                      </h4>{" "}
                      {getQueryParams("tab-index") && (
                        <button
                          style={{ marginRight: "10px" }}
                          type="button"
                          onClick={this.goBack}
                          class="btn btn-warning  btn-sm"
                        >
                          <i class="fas fa-arrow-left"></i>&nbsp;Trở về
                        </button>
                      )}
                    </div>

                    <br></br>
                    <div className="card shadow ">
                      <div className="card-header py-3">
                        <div
                          class="row"
                          // style={{ "justify-content": "space-between" }}
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
                          </form>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <p class="total-item" id="sale_user_name">
                            <span className="num-total_item">
                              {bills.total}&nbsp;
                            </span>
                            <span className="text-total_item" id="user_name">
                              hóa đơn
                            </span>{" "}
                            &nbsp;&nbsp;
                            <DateRangePickerComponent
                              value={[
                                new Date(moment(time_from, "YYYY-MM-DD")),
                                new Date(moment(time_to, "YYYY-MM-DD")),
                              ]}
                              id="daterangepicker"
                              placeholder="Khoảng thời gian..."
                              format="dd/MM/yyyy"
                              onChange={this.onchangeDateFromTo}
                            />
                            {/* <DateRangePickerComponent
                                id="daterangepicker"
                                placeholder="Khoảng thời gian..."
                                format="dd/MM/yyyy"
                                onChange={this.onchangeDateFromTo}
                              /> */}
                          </p>

                          <div>
                            <button
                              style={{ margin: "auto 0px", marginRight: 15 }}
                              onClick={this.exportAllListOrder}
                              class={`btn btn-success btn-icon-split btn-sm `}
                            >
                              <span class="icon text-white-50">
                                <i class="fas fa-file-export"></i>
                              </span>
                              <span style={{ color: "white" }} class="text">
                                Export Excel
                              </span>
                            </button>

                            <button
                              // onClick={(e) => this.handleMultiDelCallBack(e, selected)}
                              // data-toggle="modal"
                              // data-target="#removeMultiModal"
                              style={{
                                margin: "auto 0px",
                              }}
                              class={`btn btn-primary btn-sm`}
                              title="Đồng bộ trạng thái đơn hàng với đơn vị vận chuyển"
                              onClick={() => {
                                this.setState({
                                  runAsync: helper.randomString(10),
                                });
                              }}
                            >
                              <i class="fa fa-sync"></i> Đồng bộ trạng thái giao
                              hàng
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="card-body">
                        <Table
                          isLoading={this.state.loadingShipment}
                          runAsync={runAsync}
                          onchangeOrderFrom={this.onchangeOrderFrom}
                          getParams={this.getParams}
                          time_from={time_from}
                          time_to={time_to}
                          orderFrom={orderFrom}
                          searchValue={searchValue}
                          chat_allow={chat_allow}
                          onchangeStatusOrder={this.onchangeStatusOrder}
                          onchangeStatusPayment={this.onchangeStatusPayment}
                          numPage={numPage}
                          statusOrder={statusOrder}
                          statusPayment={statusPayment}
                          collaborator_by_customer_id={
                            collaborator_by_customer_id
                          }
                          handleShowChatBox={this.handleShowChatBox}
                          store_code={store_code}
                          bills={bills}
                        />
                        <div style={{ display: "flex", justifyContent: "end" }}>
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
                            time_from={time_from}
                            time_to={time_to}
                            orderFrom={orderFrom}
                            searchValue={searchValue}
                            limit={numPage}
                            status_payment={statusPayment}
                            store_code={store_code}
                            bills={bills}
                            status_order={statusOrder}
                            setPaginate={this.setPaginate}
                          />
                        </div>
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
    fetchAllBill: (id, page, branch_id, params, params_agency) => {
      dispatch(
        billAction.fetchAllBill(id, page, branch_id, params, params_agency)
      );
    },
    fetchChatId: (store_code, customerId) => {
      dispatch(billAction.fetchChatId(store_code, customerId));
    },

    fetchCustomerId: (store_code, customerId) => {
      dispatch(customerAction.fetchCustomerId(store_code, customerId));
    },
    exportAllListOrder: (id, page, branch_id, params, params_agency) => {
      dispatch(
        billAction.exportAllListOrder(
          id,
          page,
          branch_id,
          params,
          params_agency
        )
      );
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Bill);
