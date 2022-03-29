import React, { Component } from "react";
import { Link } from "react-router-dom";
class Table extends Component {
  constructor(props) {
    super(props);
  }

  showChatBox = (customerId, status) => {
    this.props.handleShowChatBox(customerId, status);
  };

  showData = (customer) => {
    var { store_code } = this.props;
    var result = null;
    if (customer.length > 0) {
      var { chat_allow } = this.props;

      result = customer.map((data, index) => {
        return (
          <tr>
            <td>{index + 1}</td>

            <td>{data.name}</td>
            <td>{data.points || 0}</td>

            <td>
              {data.is_collaborator == null ||
              data.is_collaborator == "" ||
              data.is_collaborator == false
                ? "Không"
                : "Có"}
            </td>
            <td>{data.phone_number}</td>

            <td>{data.email == null ? "Chưa cập nhật" : data.email}</td>

            <td className="btn-voucher">
              <Link
                to={`/customer/detail/${store_code}/${data.id}`}
                class="btn btn-success btn-sm"
              >
                <i class="fa fa-eye"></i> Xem
              </Link>

              <button
                onClick={() => this.showChatBox(data.id, "show")}
                class={`btn btn-primary btn-sm ${
                  chat_allow == true ? "show" : "hide"
                }`}
              >
                <i class="fa fa-comment-alt"></i> Chat
              </button>
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
    var customers =
      typeof this.props.customers.data == "undefined"
        ? []
        : this.props.customers.data;
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
              <th>Họ tên</th>
              <th>Điểm</th>
              <th>Cộng tác viên</th>
              <th>Số điện thoại</th>
              <th>Gmail</th>
              <th>Hành động</th>
            </tr>
          </thead>

          <tbody>{this.showData(customers)}</tbody>
        </table>
      </div>
    );
  }
}

export default Table;
