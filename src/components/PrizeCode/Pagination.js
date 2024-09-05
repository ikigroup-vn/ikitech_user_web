import React, { Component } from "react";
import { connect } from "react-redux";
import * as prizeCodeApi from "../../data/remote/prize_code";
import getChannel from "../../ultis/channel";
import { getQueryParams } from "../../ultis/helpers";
import * as Types from "../../constants/ActionType";

class Pagination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
    };
  }

  passPagination = (page) => {
    const {
      storeCode,
      limit,
      searchValue = "",
      onSetPrizeCode,
      onSetLinks,
      onSetCurrentPage,
      numPage,
    } = this.props;
    const product_id = getQueryParams("product_id");

    const params = `?page=${page || 1}&limit=${
      numPage || 20
    }&search=${searchValue}&product_id=${product_id ?? ""}`;
    this.props.showLoading();
    prizeCodeApi
      .fetchAllPrizeCode(storeCode, params)
      .then((results) => {
        const data = results.data.data.data;
        const links = results.data.data.links;
        const currentPage = results.data.data.current_page;
        onSetCurrentPage(currentPage);
        onSetPrizeCode(data);
        onSetLinks(links);
      })
      .catch((err) => {
        console.log("error", err);
      })
      .finally(() => {
        this.props.hideLoading();
      });
  };

  showData = (links) => {
    let result = null;
    let url = null;
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
    var links = this.props.links || [];
    return (
      <nav
        aria-label="Page navigation"
        className={`float-pagination ${getChannel()}`}
      >
        <ul class="pagination tab-pagination pg-blue">
          {this.showData(links)}
        </ul>
      </nav>
    );
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    showLoading: (res) => {
      dispatch({
        type: Types.SHOW_LOADING,
        loading: "show",
      });
    },
    hideLoading: (res) => {
      dispatch({
        type: Types.SHOW_LOADING,
        loading: "hide",
      });
    },
  };
};
export default connect(null, mapDispatchToProps)(Pagination);
