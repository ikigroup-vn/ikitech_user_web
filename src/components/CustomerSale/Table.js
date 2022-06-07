import React, { Component } from "react";
import { Link } from "react-router-dom";
import getChannel, { IKIPOS, IKITECH } from "../../ultis/channel";
import history from "../../history";
import { filter_arr, format } from "../../ultis/helpers";
import Pagination from "../../components/RevenueExpenditures/Pagination";
import DataItem from "./DataItem";

class Table extends Component {
  constructor(props) {
    super(props);
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


  render() {
    var customers =
      typeof this.props.customers.data == "undefined"
        ? []
        : this.props.customers.data;

    var {store_code,staff} = this.props;
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
              <th>Trạng thái</th>
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

export default Table;
