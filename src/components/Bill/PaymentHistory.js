import React, { Component } from "react";
import { filter_var, filter_arr, format } from "../../ultis/helpers";
import getNamePaymentMethod from "../../ultis/payment_method";
import { formatNoD } from "../../ultis/helpers";
import {Link} from "react-router-dom"
class PaymentHistory extends Component {
  constructor(props) {
    super(props);
  }


  showHistory = (bills) => {
    var result = null;
    var {store_code} = this.props
    if (bills.length > 0) {
      result = bills.map((bill, index) => {


        return (
          <tr>
            <td><a href={`/order/detail/${store_code}/${bill.order_code}`} >{bill.order_code}</a></td>

            <td>
              { formatNoD(bill.total_final) }
            </td>
            <td>
            {bill.payment_status_name}
            </td>

            <td>
              {bill.updated_at}
            </td>

          </tr>
        );
      });
    } else {
      return result;
    }
    return result;
  };

  render() {

    var { historyPay , bills } = this.props
    console.log(bills)
    return (
      <div class="tab-pane " id="chicken" role="tabpanel" aria-labelledby="chicken-tab">

        <div class="table-responsive">
          <table class="table table-hover table-bordered  table-border">
            <thead>
              <tr>
                <th>Mã đơn hàng</th>

                <th>Số tiền</th>
                <th>Trạng thái</th>
                <th>Thời gian</th>

              </tr>
            </thead>
            <tbody>
              {this.showHistory(bills)}
            </tbody>
          </table>
        </div>

      </div>
    );
  }
}

export default PaymentHistory;
