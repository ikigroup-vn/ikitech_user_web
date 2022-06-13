import React, { Component } from "react";
import { Link } from "react-router-dom";
import getChannel, { IKIPOS, IKITECH } from "../../ultis/channel";
import history from "../../history";
import { filter_arr, format } from "../../ultis/helpers";
import Pagination from "../../components/RevenueExpenditures/Pagination";
import * as customerAction from "../../actions/customer_sales";
import { connect } from "react-redux";

import DataItem from "./DataItem";

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter_by_status : ""
    }
  }

  showChatBox = (customerId, status) => {
    this.props.handleShowChatBox(customerId, status);
  };
  handleSetInfor = (item) => {
    this.props.handleSetInfor(item)
  }
  changePage = (store_code, customerId, e) => {
    var { paginate } = this.props;
    if (e.target.name == "action")
      return;
    history.push(`/customer/detail/${store_code}/${customerId}?pag=${paginate}`)
  }
  showData = (customer) => {
    var { store_code, paginate,staff } = this.props;
    var result = null;
    if (customer.length > 0) {
      var { chat_allow } = this.props;
      // var is_collaborator  = data.is_collaborator == null ||
      //   data.is_collaborator == "" ||
      //   data.is_collaborator == false
      //   ? "Không"
      //   : "Có"

      //   var is_agency  = data.is_agency == null ||
      //   data.is_agency == "" ||
      //   data.is_agency == false
      //   ? "Không"
      //   : "Có"  

      result = customer.map((data, index) => {
        return <DataItem data={data} handleSetInfor={this.props.handleSetInfor} store_code={store_code} index={index} paginate={paginate} key={data.id} staff={staff} />;
      });
    } else {
      return result;
    }
    return result;
  };
  searchStars = (e) => {
    var { getParams, store_code } = this.props
    var value = e.target.value
    var params = getParams(value ,1)
    this.props.fetchAllCustomerSale(this.props.store_code, 1 , params);
this.props. passFilterStatus(value)
    this.setState({ filter_by_status: value })

  }

  render() {
    var customers =
      typeof this.props.customers.data == "undefined"
        ? []
        : this.props.customers.data;

    var {store_code,staff} = this.props;

    var {filter_by_status} = this.state
    return (
      <div class="table-responsive">
        <table
          class="table table-border "
          id="dataTable"
          width="100%"
          cellspacing="0"
        >
          <thead>
            <tr>
              <th>STT</th>
              <th>Họ tên/SĐT</th>
              <th>
              <select value={filter_by_status} style={{ maxWidth: "150px" }} name="" id="input" className="form-control" onChange={this.searchStars}>
              <option value = "">--Trạng thái--</option>
                        <option value="0">Cần tư vấn</option>
                        <option value="1">Đang tư vấn</option>
                        <option value="2">Thành công</option>
                        <option value="3">Thất bại</option>
              </select>         
              </th> 
                  <th>Tư vấn lần 1</th>
              <th>Tư vấn lần 2</th>
              <th>Tư vấn lần 3</th>

              <th>Nhân viên sale</th>

            </tr>
          </thead>

          <tbody>{this.showData(customers)}</tbody>
        </table>



      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchAllCustomerSale: (id, page, params) => {
      dispatch(customerAction.fetchAllCustomerSale(id, page, params));
    },

  };
};
export default connect(null, mapDispatchToProps)(Table);
