
import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { filter_arr, format } from "../../ultis/helpers";
import { connect } from "react-redux";
import Pagination from "../../components/Bill/Pagination";
import getChannel, { IKIPOS, IKITECH } from "../../ultis/channel";
import * as billAction from "../../actions/bill";
import { shallowEqual } from "../../ultis/shallowEqual";
import { getBranchId } from "../../ultis/branchUtils";
import * as OrderFrom from "../../ultis/order_from";
import ListComponentToPrint from "../../screens/Bill/ListComponentPrint"
import ReactToPrint from 'react-to-print';

import history from "../../history";

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statusOrder: "",
      statusPayment: "",
      orderFrom: "",
      isLoading: false,
      selected: [],

    }
  }

  showChatBox = (customerId, customerImg, customerName, status) => {
    this.props.handleShowChatBox(customerId, customerImg, customerName, status)
  }



  componentWillMount() {
    if (this.props.statusOrder != "" || this.props.statusPayment != "") {
      this.setState({ statusOrder: this.props.statusOrder, statusPayment: this.props.statusPayment })
    }
  }


  onchangeStatusOrder = (e) => {
    var { value } = e.target;
    this.setState({ statusOrder: value })
    var { statusPayment, statusOrder , orderFrom } = this.state
    var { store_code, time_from, time_to, numPage, searchValue } = this.props
    const branch_id = getBranchId()
    var params = this.props.getParams(time_from, time_to, searchValue, value, statusPayment, numPage , orderFrom);
    this.props.onchangeStatusOrder(value)

    this.props.fetchAllBill(store_code, 1, branch_id, params);
  }
  onchangeStatusPayment = (e) => {
    var { value } = e.target;
    this.setState({ statusPayment: value })
    var { statusPayment, statusOrder  , orderFrom} = this.state
    var { store_code, time_from, time_to, numPage, searchValue } = this.props
    const branch_id = getBranchId()

    var params = this.props.getParams(time_from, time_to, searchValue, statusOrder, value, numPage , orderFrom);
    this.props.onchangeStatusPayment(value)
    this.props.fetchAllBill(store_code, 1, branch_id, params);
  }


  onchangeOrderFrom = (e) => {
    var { value } = e.target;
    this.setState({ orderFrom: value })
    var { statusPayment, statusOrder, orderFrom } = this.state
    var { store_code, time_from, time_to, numPage, searchValue } = this.props
    const branch_id = getBranchId()

    var params = this.props.getParams(time_from, time_to, searchValue, statusOrder, statusPayment, numPage, value);
    this.props.onchangeOrderFrom(value)
    this.props.fetchAllBill(store_code, 1, branch_id, params);

  }

  shouldComponentUpdate(nextProps, nextState) {

    if (
      (this.props.statusOrder != nextProps.statusOrder
        || this.props.statusPayment != nextProps.statusPayment
        || nextState.statusPayment != nextProps.statusPayment
        || nextState.statusOrder != nextProps.statusOrder

        || !shallowEqual(nextProps.bills, this.props.bills)) && nextState.isLoading == false) {
      this.setState({ statusOrder: nextProps.statusOrder, statusPayment: nextProps.statusPayment, isLoading: true })
    }
    return true
  }
  componentWillReceiveProps(nextProps) {

    if (
      (this.props.statusOrder != nextProps.statusOrder
        || this.props.statusPayment != nextProps.statusPayment
        || this.state.statusPayment != nextProps.statusPayment
        || this.state.statusOrder != nextProps.statusOrder) && this.state.isLoading == true)


      this.setState({ statusOrder: nextProps.statusOrder, statusPayment: nextProps.statusPayment })

  }
  countItem = (list) => {

    var result = ""
    var length = 0
    if (list.length > 0) {
      result = list.map((data, index) => {
        length = data.quantity + length
      })
    }
    return length
  }

  colorWithPaymentColor = (payment_status_code) => {


    if (payment_status_code == "WAITING_FOR_PROGRESSING") {
      return "warning"
    }
    if (payment_status_code == "UNPAID") {
      return "danger"
    }
    if (payment_status_code == "PARTIALLY_PAID") {
      return "warning"
    }
    if (payment_status_code == "REFUNDS") {
      return "dark"
    }

    return "success"
  }

  colorWithOrderStatusColor = (order_status_code) => {
    if (order_status_code == "WAITING_FOR_PROGRESSING" ||
      order_status_code == "PACKING" ||
      order_status_code == "SHIPPING" ||
      order_status_code == "WAIT_FOR_PAYMENT"
    ) {
      return "warning"
    }
    if (order_status_code == "DELIVERY_ERROR" ||
      order_status_code == "DELIVERY_ERROR" ||
      order_status_code == "CUSTOMER_CANCELLED" ||
      order_status_code == "USER_CANCELLED" ||
      order_status_code == "OUT_OF_STOCK"
    ) {
      return "danger"
    }
    if (order_status_code == "REFUNDS" ||
      order_status_code == "CUSTOMER_RETURNING" ||
      order_status_code == "CUSTOMER_HAS_RETURNS"
    ) {
      return "dark"
    }

    return "success"
  }
  onChangeSelected = (e, data) => {
    var { checked } = e.target;
    var selected = [...this.state.selected];
    if (checked == true) {
      selected.push(data);
    } else {
      for (const [index, item] of selected.entries()) {
        if (item.id == data.id) {
          selected.splice(index, 1);
        }
      }
    }
    this.setState({ selected });
  };
  changePage = (e, store_code, order_code) => {
    if (e.target.name !== "checked") {
      var { statusOrder, statusPayment } = this.state
      var params = "?param=true"
      if (statusOrder)
        params = params + `&order_status_code=${statusOrder}`
      if (statusPayment)
        params = params + `&payment_status_code=${statusPayment}`

      history.push(`/order/detail/${store_code}/${order_code}${params}`)
    }
  }

  checkSelected = (id) => {
    var selected = [...this.state.selected];
    if (selected.length > 0) {
      for (const item of selected) {
        if (item.id == id) {
          return true;
        }
      }
      return false;
    } else {
      return false;
    }
  };

  showData = (bill, per_page, current_page) => {
    var { store_code } = this.props
    var result = null;
    if (bill.length > 0) {
      var { chat_allow } = this.props
      result = bill.map((data, index) => {
        var checked = this.checkSelected(data.id);

        var _order_status_name = this.colorWithOrderStatusColor(data.order_status_code)
        var _payment_status_code = this.colorWithPaymentColor(data.payment_status_code)

        var countItem = this.countItem(data.line_items_at_time)
        console.log(data.customer)
        var is_collaborator = data.collaborator_by_customer_id != null ? "check" : "close"
        var order_from = data.order_from == OrderFrom.ORDER_FROM_APP ? "App"
          : data.order_from == OrderFrom.ORDER_FROM_POS_DELIVERY ? "POS giao vận"
            : data.order_from == OrderFrom.ORDER_FROM_POS_IN_STORE ? "POS tại quầy"
              : data.order_from == OrderFrom.ORDER_FROM_POS_SHIPPER ? "POS vận chuyển"
                : data.order_from == OrderFrom.ORDER_FROM_WEB ? "Web"
                  : "Pos tại quầy"

        return (
          <tr className="hover-product" onClick={(e) => this.changePage(e, store_code, data.order_code)}>
            <td >
              {" "}
              <input
                name="checked"
                style={{
                  height: "initial",
                }}
                type="checkbox"
                checked={checked}
                onChange={(e) => this.onChangeSelected(e, data)}
              />
            </td>
            <td>{(per_page * (current_page - 1)) + (index + 1)}</td>
            <td>
              {data.order_code}

            </td>

            <td>
              {data.customer != null ? data.customer.name : null}

            </td>
            {/* {
              getChannel() == IKITECH &&
              <td className="status_check"><i class={`fas fa-${is_collaborator} ${is_collaborator + "-status"} `}></i></td>
            } */}

            <td>{format(data.total_final)}</td>
            {
              getChannel() == IKITECH &&
              <td >{order_from}</td>
            }
            <td>{data.created_at}</td>

            <td >
              <span style={{ fontWeight: "500" }} className={_payment_status_code}>
                {data.payment_status_name}
              </span>
            </td>
            {getChannel() == IKITECH &&
              <td >
                <span style={{ fontWeight: "500" }} className={_order_status_name}>
                  {data.order_status_name}
                </span>
              </td>
            }




            {getChannel() == IKITECH && <td className="">
              {/* <Link
                to={`/order/detail/${store_code}/${data.order_code}`}
                class="btn btn-primary-no-background btn-sm"
              >
                <i class="fa fa-eye"></i> Xem
              </Link> */}

              {/* {
                getChannel() == IKITECH && <button

                  onClick={() => this.showChatBox(data.customer != null ? data.customer.id : null, data.customer != null ? data.customer.avatar_image : null, data.customer != null ? data.customer.name : null, "show")}
                  type="button"
                  class={`btn btn-primary btn-sm ${chat_allow == true ? "show" : "hide"}`}

                >
                  <i class="fa fa-comment-alt"></i> Chat
                </button>
              } */}

            </td>
            }
          </tr>
        );
      });
    } else {
      return result;
    }
    return result;
  };


  optionsPaymentStatus = (statusPayment) => {

    return <select value={statusPayment || ""} name=""
      id="input" class="form-control" r
      equired="required"
      onChange={this.onchangeStatusPayment}>
                                <option disabled>--Trạng thái thanh toán--</option>

      <option value="">Tất cả</option>
      <option value="UNPAID">Chưa thanh toán</option>
      {
          <React.Fragment>
            {/* <option value="WAITING_FOR_PROGRESSING">Chờ xử lý</option> */}
            {/* <option value="CUSTOMER_CANCELLED">Đã hủy</option> */}
            <option value="PARTIALLY_PAID">Đã thanh toán một phần</option>

          </React.Fragment>
        
      }

      <option value="PAID">Đã thanh toán</option>
      <option value="REFUNDS">Đã hoàn tiền</option>
    </select>

  }

  optionsOrderFrom = (orderFrom) => {

    return <select value={orderFrom || ""} name=""
      id="input" class="form-control"
      onChange={this.onchangeOrderFrom}>
                        <option disabled>Nguồn</option>

      <option value="">Tất cả</option>
      <option value={OrderFrom.ORDER_FROM_POS_IN_STORE}>Pos tại quầy</option>
      <option value={OrderFrom.ORDER_FROM_POS_DELIVERY}>Pos giao vận</option>
      <option value={OrderFrom.ORDER_FROM_WEB}>Web</option>
      <option value={OrderFrom.ORDER_FROM_APP}>App</option>
    </select>

  }

  optionOrderStatus = (statusOrder) => {

    if (getChannel() == IKITECH) {
      return <select value={statusOrder || ""} name="" id="input" class="form-control" required="required" onChange={this.onchangeStatusOrder}>
                <option disabled>--Trạng thái đơn hàng--</option>

        <option value="">Tất cả</option>

        <option value="WAITING_FOR_PROGRESSING">Chờ xử lý</option>
        <option value="PACKING">Đang chuẩn bị hàng</option>
        <option value="OUT_OF_STOCK">Hết hàng</option>
        <option value="USER_CANCELLED">Shop hủy</option>
        <option value="CUSTOMER_CANCELLED">Khách đã hủy</option>
        <option value="SHIPPING">Đang giao hàng</option>
        <option value="DELIVERY_ERROR">Lỗi giao hàng</option>
        <option value="COMPLETED">Đã hoàn thành</option>
        <option value="CUSTOMER_RETURNING">Chờ trả hàng</option>
        <option value="CUSTOMER_HAS_RETURNS">Đã trả hàng</option>

      </select>
    }

    if (getChannel() == IKIPOS) {
      return <select value={statusOrder || ""} name="" id="input" class="form-control" required="required" onChange={this.onchangeStatusOrder}>
        <option value="">Tất cả</option>
        <option value="USER_CANCELLED">Shop hủy</option>
        <option value="CUSTOMER_CANCELLED">Khách đã hủy</option>
        <option value="COMPLETED">Đã hoàn thành</option>
        <option value="CUSTOMER_HAS_RETURNS">Đã trả hàng</option>
      </select>
    }

  }
  onChangeSelectAll = (e) => {
    var checked = e.target.checked;
    var { bills } = this.props;
    var _selected = [...this.state.selected];

    var listBills = filter_arr(bills.data);

    if (listBills.length > 0) {
      if (checked == false) {
        this.setState({ selected: [] });
      } else {
        _selected = [];
        listBills.forEach((bill) => {
          _selected.push(bill);
        });
        this.setState({ selected: _selected });
      }
    }
  };
  render() {

    var { store_code, bills, numPage , badges   , currentBranch , stores} = this.props
    var { statusOrder, statusPayment, orderFrom, selected } = this.state
    var per_page = bills.per_page
    var current_page = bills.current_page
    var listBill = typeof bills.data == "undefined" ? [] : bills.data
    var _selected =
      selected.length > 0 && selected.length == bills.data?.length
        ? true
        : false;
    var multiPrint = selected.length > 0 ? "show" : "hide";
    console.log(stores);
    return (
      <React.Fragment>
        <div class="table-responsive">
          <ReactToPrint
            trigger={() => {

              return       <button
              // onClick={(e) => this.handleMultiDelCallBack(e, selected)}
              // data-toggle="modal"
              // data-target="#removeMultiModal"
              style={{ marginLeft: "10px" }}
              class={`btn btn-danger btn-sm ${multiPrint}`}
            >
              <i class="fa fa-print"></i> In {selected.length} đơn hàng
            </button>
            }}
            content={() => this.componentRef}
          />
          <div className="print-source " style={{ display: "none" }} >

            {
              getChannel() == IKITECH && selected.length > 0 && currentBranch != null && stores.length > 0 &&
              <ListComponentToPrint
                badges={badges}
                bills={selected}
                store_code={store_code}
                stores={stores}
                ref={el => (this.componentRef = el)}
                currentBranch={this.props.currentBranch}
              />
            }
  
          </div>


          <table class="table table-border " id="dataTable" width="100%" cellspacing="0">
            <thead>
              <tr>
                <th >
                  <input
                    type="checkbox"
                    checked={_selected}
                    onChange={this.onChangeSelectAll}
                  />
                </th>
                <th>STT</th>
                <th>Mã đơn</th>
                <th>Tên khách hàng</th>

                {/* {getChannel() == IKITECH &&
                  <th>Cộng tác viên</th>
                } */}
                <th>Tổng tiền</th>
                {getChannel() == IKITECH &&
                  <th>

                    {this.optionsOrderFrom(orderFrom)}
                  </th>

                }
                <th>Thời gian tạo đơn</th>

                <th>

                  {this.optionsPaymentStatus(statusPayment)}

                </th>
                {getChannel() == IKITECH && <th>
                  {this.optionOrderStatus(statusOrder)}

                </th>}


                {/* {getChannel() == IKITECH && <th>Hành động</th>} */}


              </tr>
            </thead>

            <tbody>{this.showData(listBill, per_page, current_page)}</tbody>
          </table>

        </div>
        {/* <Pagination
          limit={numPage}
          status_payment={statusPayment}
          store_code={store_code}
          bills={bills}
          status_order={statusOrder}
        /> */}
      </React.Fragment>
    );
  }
}



const mapStateToProps = (state) => {
  return {

      stores: state.storeReducers.store.allStore,
      badges: state.badgeReducers.allBadge,
      currentBranch: state.branchReducers.branch.currentBranch,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchAllBill: (id, page, branch_id, params) => {
      dispatch(billAction.fetchAllBill(id, page, branch_id, params));
    },

  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Table);


