
import React, {Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { format } from "../../ultis/helpers"
import { connect } from "react-redux";
import Pagination from "../../components/Bill/Pagination";
import getChannel, { IKIPOS, IKITECH } from "../../ultis/channel";
import * as billAction from "../../actions/bill";
import { shallowEqual } from "../../ultis/shallowEqual";
import { getBranchId } from "../../ultis/branchUtils";
import history from "../../history";

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statusOrder: "",
      statusPayment: "",
      isLoading: false,
    }
  }

  showChatBox = (customerId, customerImg, customerName, status) => {
    this.props.handleShowChatBox(customerId, customerImg, customerName, status)
  }

  onchangeStatusOrder = (e) => {
    var { value } = e.target;
    this.setState({ statusOrder: value })
    var { statusPayment } = this.state
    var { store_code } = this.props
    const branch_id = getBranchId()
    var params = `&order_status_code=${value}&payment_status_code=${statusPayment}`
    this.props.onchangeStatusOrder(value)

    this.props.fetchAllBill(store_code, 1, branch_id, params);
  }
  onchangeStatusPayment = (e) => {
    var { value } = e.target;
    this.setState({ statusPayment: value })
    var { statusOrder } = this.state
    var { store_code } = this.props
    const branch_id = getBranchId()
    var params = `&order_status_code=${statusOrder}&payment_status_code=${value}`
    this.props.onchangeStatusPayment(value)
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

  changePage = (store_code , order_code) => {
history.push(`/order/detail/${store_code}/${order_code}`)
  }

  showData = (bill, per_page, current_page) => {
    var { store_code } = this.props
    var result = null;
    if (bill.length > 0) {
      var { chat_allow } = this.props
      result = bill.map((data, index) => {

        var _order_status_name = this.colorWithOrderStatusColor(data.order_status_code)
        var _payment_status_code = this.colorWithPaymentColor(data.payment_status_code)

        var countItem = this.countItem(data.line_items_at_time)
        console.log(data.customer)
        var is_collaborator = data.collaborator_by_customer_id != null ? "check" : "close"

        return (
          <tr className="hover-order" onClick={() => this.changePage(store_code , data.order_code)}>
          
            <td>{(per_page * (current_page - 1)) + (index + 1)}</td>
            <td>
              {data.order_code}

            </td>

            <td>
              {data.customer != null ? data.customer.name : null}

            </td>
            {
              getChannel() == IKITECH &&
              <td className="status_check"><i class={`fas fa-${is_collaborator} ${is_collaborator + "-status"} `}></i></td>
            }

            <td style ={{textAlign : "center"}}>{countItem}</td>
            <td>{format(data.total_final)}</td>
            <td>{data.created_at}</td>

            <td style={{ maxWidth: "20px" }}> <h5>
              <span class={`badge badge-${_payment_status_code}`}>
                {data.payment_status_name}
              </span>
            </h5></td>
            {getChannel() == IKITECH &&
              <td style={{ maxWidth: "20px" }}> <h5>
                <span class={`badge badge-${_order_status_name}`}>
                  {data.order_status_name}
                </span>
              </h5></td>
            }




{getChannel() == IKITECH &&     <td className="btn-voucher">
              {/* <Link
                to={`/order/detail/${store_code}/${data.order_code}`}
                class="btn btn-primary-no-background btn-sm"
              >
                <i class="fa fa-eye"></i> Xem
              </Link> */}

              {
                getChannel() == IKITECH && <button

                  onClick={() => this.showChatBox(data.customer != null ? data.customer.id : null, data.customer != null ? data.customer.avatar_image : null, data.customer != null ? data.customer.name : null, "show")}
                  type="button"
                  class={`btn btn-primary btn-sm ${chat_allow == true ? "show" : "hide"}`}

                >
                  <i class="fa fa-comment-alt"></i> Chat
                </button>
              }

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
      <option value="">Tất cả</option>
      <option value="UNPAID">Chưa thanh toán</option>
    {
      getChannel() == IKITECH && (
        <React.Fragment>
        <option value="WAITING_FOR_PROGRESSING">Chờ xử lý</option>
        <option value="CUSTOMER_CANCELLED">Đã hủy</option>
        </React.Fragment>
      )
    }

      <option value="PAID">Đã thanh toán</option>
      <option value="PARTIALLY_PAID">Đã thanh toán một phần</option>
      <option value="REFUNDS">Đã hoàn tiền</option>
    </select>

  }

  optionOrderStatus = (statusOrder) => {

    if (getChannel() == IKITECH) {
      return <select value={statusOrder || ""} name="" id="input" class="form-control" required="required" onChange={this.onchangeStatusOrder}>
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

  render() {

    var { store_code, bills, numPage } = this.props
    var { statusOrder, statusPayment } = this.state
    var per_page = bills.per_page
    var current_page = bills.current_page
    var listBill = typeof bills.data == "undefined" ? [] : bills.data

    return (
      <React.Fragment>
        <div class="table-responsive">
          <table class="table table-border " id="dataTable" width="100%" cellspacing="0">
            <thead>
              <tr>
                <th>STT</th>
                <th>Mã</th>
                <th>Tên khách hàng</th>

                {getChannel() == IKITECH &&
                  <th>Cộng tác viên</th>
                }
                <th style ={{textAlign : "center"}}>Số sản phẩm</th>
                <th>Tổng tiền</th>
                <th>Thời gian tạo đơn</th>

                <th>

                  {this.optionsPaymentStatus(statusPayment)}

                </th>
                {getChannel() == IKITECH && <th>
                  {this.optionOrderStatus(statusOrder)}

                </th>}


                {getChannel() == IKITECH && <th>Hành động</th>}


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

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchAllBill: (id, page, branch_id, params) => {
      dispatch(billAction.fetchAllBill(id, page, branch_id, params));
    },

  };
};
export default connect(null, mapDispatchToProps)(Table);


