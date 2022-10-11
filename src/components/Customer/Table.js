import React, { Component } from "react";
import { Link } from "react-router-dom";
import getChannel, { IKIPOS, IKITECH } from "../../ultis/channel";
import history from "../../history";
import { filter_arr, format } from "../../ultis/helpers";
import Pagination from "../../components/RevenueExpenditures/Pagination";

class Table extends Component {
  constructor(props) {
    super(props);
  }

  showChatBox = (customerId, status) => {
    this.props.handleShowChatBox(customerId, status);
  };
  handleSetInfor = (item) => {
    this.props.handleSetInfor(item);
  };
  changePage = (store_code, customerId, e) => {
    var { paginate } = this.props;
    if (e.target.name == "action") return;
    history.push(
      `/customer/detail/${store_code}/${customerId}?pag=${paginate}`
    );
  };
  showData = (customer) => {
    var { store_code, paginate } = this.props;
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
        return (
          <tr
            className="hover-product"
            onClick={(e) => this.changePage(store_code, data.id, e)}
          >
            <td>{index + 1}</td>

            <td>{data.name}</td>
            <td>{data.phone_number}</td>

            <td>{data.email == null ? "Chưa cập nhật" : data.email}</td>
            <td>
              {data.points ? new Intl.NumberFormat().format(data.points) : 0}
            </td>

            <td>{data.debt ? new Intl.NumberFormat().format(data.debt) : 0}</td>
            {getChannel() == IKITECH && (
              <td
                className={
                  data.is_collaborator === true
                    ? "success"
                    : data.is_agency === true
                    ? "primary"
                    : ""
                }
              >
                {data.is_collaborator === true
                  ? "Cộng tác viên"
                  : data.is_agency === true
                  ? "Đại lý"
                  : "Không"}
              </td>
            )}
            {/* {getChannel() == IKITECH && <td className= {data.is_agency === true ?  "success" : "danger"}>

              {data.is_agency === true ?  "Có" : "Không"}
            </td>} */}

            {getChannel() == IKIPOS && (
              <td className="">
                {/* {getChannel() == IKITECH && <Link
                to={`/customer/detail/${store_code}/${data.id}?pag=${paginate}`}
                class="btn btn-success btn-sm"
              >
                <i class="fa fa-eye"></i> Xem
              </Link>} */}

                {/* <button
                style={{ marginLeft: "10px" }}
                name = "action"
                onClick={() => this.showChatBox(data.id, "show")}
                class={`btn btn-primary btn-sm ${chat_allow == true ? "show" : "hide"
                  }`}
              >
                <i class="fa fa-comment-alt"></i> Chat
              </button>  */}
                {getChannel() == IKIPOS && (
                  <Link
                    to={`/customer/detail/${store_code}/${data.id}?pag=${paginate}`}
                    style={{ marginLeft: "10px" }}
                    class={`btn btn-warning btn-sm`}
                  >
                    <i class="fa fa-edit"></i> Sửa
                  </Link>
                )}
              </td>
            )}
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

    var store_code = this.props;
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

              <th>Số điện thoại</th>
              <th>Gmail</th>
              <th>Xu</th>
              <th>Số nợ hiện tại</th>

              {getChannel() == IKITECH && <th>Vai trò</th>}

              {/* {getChannel() == IKIPOS &&   <th>Hành động</th>} */}
            </tr>
          </thead>
          <tbody>{this.showData(customers)}</tbody>
        </table>
      </div>
    );
  }
}

export default Table;
