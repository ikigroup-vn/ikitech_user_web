import React, { Component } from "react";
import { connect } from "react-redux";

import * as billAction from "../../actions/bill";
import { getBranchId } from "../../ultis/branchUtils";
import getChannel from "../../ultis/channel";
import { insertParam } from "../../ultis/helpers";

class Pagination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      status: null,
      isStatus: "",
    };
  }

  passPagination = (page) => {
    var {
      store_code,
      status_payment,
      status_order,
      limit,
      searchValue,
      hasPhone,
      phone,
      time_to,
      time_from,
      orderFrom,
    } = this.props;
    const branch_id = getBranchId();
    var params = "";
    if (hasPhone) params = `&branch_id=${branch_id}&phone_number=${phone}`;
    else
      params = `&order_status_code=${status_order}&payment_status_code=${status_payment}&limit=${limit}&branch_id=${branch_id}&order_from_list=${orderFrom}&search=${searchValue}`;
    if (time_to != "" && time_to != null) {
      params = params + `&time_to=${time_to}`;
    }
    if (time_from != "" && time_from != null) {
      params = params + `&time_from=${time_from}`;
    }

    insertParam({ page: page });
    this.props.fetchAllBill(store_code, page, branch_id, params);
  };

  showData = (links) => {
    var result = null;
    var url = null;
    if (typeof links == "undefined") {
      return result;
    }
    if (links.length > 0) {
      result = links.map((data, index) => {
        var active = data.active == true ? "active" : null;
        var label =
          data.label.includes("&laquo; ") || data.label.includes(" &raquo;")
            ? data.label
                .replace("&laquo; Previous", "Trước")
                .replace("Next &raquo;", "Sau")
            : data.label;
        if (data.url == null) {
          return (
            <li class={`page-item ${active} `}>
              <a class="page-link">{label}</a>
            </li>
          );
        } else {
          return (
            <li class={`page-item ${active} `}>
              <a
                onClick={() => this.passPagination(data.url.split("?page=")[1])}
                class="page-link"
              >
                {label}
              </a>
            </li>
          );
        }
      });
    } else {
      return result;
    }
    return result;
  };

  render() {
    return (
      <nav
        aria-label="Page navigation"
        className={`float-pagination ${getChannel()}`}
      >
        <ul class="pagination  tab-pagination pg-blue">
          {this.showData(this.props.bills.links)}
        </ul>
      </nav>
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
export default connect(null, mapDispatchToProps)(Pagination);
