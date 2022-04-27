import React, { Component } from "react";
import { Link } from "react-router-dom";
import history from "../../../history"

class Table extends Component {
  constructor(props) {
    super(props);
  }
  handleDelCallBack = (event, store_code, id, name , is_end) => {
    this.props.handleDelCallBack({ table: "Chương trình", id: id, store_code: store_code, name ,is_end });
    event.preventDefault();
  }

  handleIsEndCallback = (event, store_code, id) => {
    this.props.handleIsEndCallback({ id: id, store_code: store_code });
    event.preventDefault();
  }
  showListProduct = (products) => {
    console.log(products);
    var result = null
    if (products.length > 0) {
      result = products.map((data, index) => {

        return (
          <h6  style={{ display: "inline-block" , marginRight : "7px"}}><span
          style={{ display: "inline-block", maxWidth: "240px" ,  whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis" }}
  
          class="badge badge-success">{data.name}</span></h6>
        )
      })

    }
    return result
  }

  changePage = (e,store_code, supplierId) => {

    if(e.target.name !== "toggle")
    history.push(`/voucher/edit/${store_code}/${supplierId}`)
}
  showData = (vouchers, per_page, current_page) => {
    var vouchers = this.props.is_end == 0 ? vouchers : vouchers.data

    var result = null;
    var { store_code } = this.props.params;
    if (typeof vouchers === "undefined") {
      return result;
    }
    if (vouchers.length > 0) {
      var { update, _delete } = this.props

      result = vouchers.map((data, index) => {
        var set_limit_amount =
          data.set_limit_amount == true ? data.amount : "Không giới hạn";
        var status_limit_amount = data.set_limit_amount == true ? "" : "danger";

        var type_voucher = data.voucher_type == 0 ? "Toàn shop" : "Theo sản phảm"
        var type_discount = data.discount_type == 0 ? "Cố định" : "Theo %"
        var is_show_voucher = data.is_show_voucher == true ? "Hiển thị" : "Đang ẩn"
        var status_show_voucher = data.is_show_voucher == true ? "success" : "secondary"
        var showCurrentPage = typeof per_page != "undefined" && per_page != null ? true : false

        var disableIsEnd = this.props.is_end == 0 ? "show" : "hide"

        return (
          <tr className = "hover-product" onClick={(e) => this.changePage(e,store_code, data.id)}>
            <td class={showCurrentPage ? "hide" : "show"}>{index + 1}</td>

            <td class={showCurrentPage ? "show" : "hide"}>{(per_page * (current_page - 1)) + (index + 1)}</td>

            <td>{data.name}</td>
            <td>{type_voucher}</td>
    
            <td>{data.start_time}</td>

            <td>{data.end_time}</td>


         
            <td>
              {data.value_limit_total && new Intl.NumberFormat().format(data.value_limit_total)}

              {/* {!isNaN(Number(set_limit_amount)) ? new Intl.NumberFormat().format(set_limit_amount.toString()) + "%" : set_limit_amount} */}

            </td >  
      
            <td className="group-btn-table">
              {this.props.is_end == 0 && <Link
                to={`/voucher/edit/${store_code}/${data.id}`}
                class={`btn btn-warning btn-sm ${update == true ? "show" : "hide"}`}
              >
                <i class="fa fa-edit"></i> Sửa
              </Link>}

              <button
                onClick={(e) => this.handleDelCallBack(e, store_code, data.id, data.name , this.props.is_end)}
                data-toggle="modal"
                name= "toggle"

                data-target="#removeModal"
                class={`btn btn-danger btn-sm ${_delete == true ? "show" : "hide"}`}
              >
                <i class="fa fa-trash"></i> Xóa
              </button>
              <button
                onClick={(e) => this.handleIsEndCallback(e, store_code, data.id)}
                data-toggle="modal"
                name= "toggle"

                data-target="#isEndModal"
                class={`btn btn-primary btn-sm ${disableIsEnd} ${_delete == true ? "show" : "hide"}`}
              >
                <i class="fa fa-clock-o"></i> Kết thúc
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
    var { vouchers } = this.props;
    var per_page = vouchers.per_page
    var current_page = vouchers.current_page
    return (
      <div class="table-responsive">
        <table class="table table-border" id="dataTable" width="100%" cellspacing="0">
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên</th>
              <th>Loại voucher</th>

              <th>Ngày bắt đầu</th>
              <th>Ngày kết thúc</th>
              <th>Đơn đạt tối thiểu</th>
         

              <th>Hành động</th>
            </tr>
          </thead>

          <tbody>{this.showData(vouchers, per_page, current_page)}</tbody>
        </table>
      </div>
    );
  }
}

export default Table;
