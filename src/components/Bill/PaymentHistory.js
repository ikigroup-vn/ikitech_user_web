import React, { Component } from "react";
import { filter_var, filter_arr, format } from "../../ultis/helpers";
import getNamePaymentMethod from "../../ultis/payment_method";
import { formatNoD } from "../../ultis/helpers";

class PaymentHistory extends Component {
  constructor(props) {
    super(props);
  }


  showHistory = (historys) => {
    var result = null;
    if (historys.length > 0) {
      result = historys.map((history, index) => {


        return (
          <tr>
            <td>{index + 1}</td>

            <td>
              { formatNoD(history.money) }
            </td>
            <td>
              {getNamePaymentMethod(history.payment_method_id)}
            </td>

            <td>
              {history.updated_at}
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

    var { historyPay } = this.props
    return (
      <div class="tab-pane " id="chicken" role="tabpanel" aria-labelledby="chicken-tab">

        <div class="table-responsive">
          <table class="table table-hover table-bordered  table-border">
            <thead>
              <tr>
                <th>STT</th>

                <th>Số tiền</th>
                <th>Phương thức thanh toán</th>
                <th>Thời gian</th>

              </tr>
            </thead>
            <tbody>
              {this.showHistory(historyPay)}
            </tbody>
          </table>
        </div>

      </div>
    );
  }
}

export default PaymentHistory;
