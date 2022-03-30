import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as Env from "../../../ultis/default"

class Table extends Component {
  constructor(props) {
    super(props);
  }
  handleDelCallBack = (event, store_code, id , name) => {
    this.props.handleDelCallBack({ table: "Chương trình", id: id, store_code: store_code ,name });
    event.preventDefault();
  }

  handleIsEndCallback = (event, store_code, id) => {
    this.props.handleIsEndCallback({ id: id, store_code: store_code });
    event.preventDefault();
  }
  showData = (discounts, per_page, current_page) => {
    var discounts  = this.props.is_end == 0 ? discounts : discounts.data
    var result = null;
    var { store_code } = this.props.params;
    if (typeof discounts === "undefined") {
      return result;
    }
    if (discounts.length > 0) {

      var {update , _delete} = this.props

      result = discounts.map((data, index) => {
        var set_limit_amount =
          data.set_limit_amount == true ? data.amount : "Không giới hạn";
        var status_limit_amount = data.set_limit_amount == true ? "" : "danger";
        var image_url =
          data.image_url == null || data.image_url == "" ? Env.IMG_NOT_FOUND : data.image_url
        var showCurrentPage = typeof per_page != "undefined" && per_page != null ? true : false
        var disableIsEnd = this.props.is_end ? "hide" : "show"
        return (
          <tr>
            <td class = {showCurrentPage ? "hide" : "show"}>{index + 1}</td>

            <td class = {showCurrentPage ? "show" : "hide"}>{(per_page * (current_page - 1)) + (index + 1)}</td>

            <td>{data.id}</td>

            <td>{data.name}</td>

            <td>

              <img src={image_url} className="img-responsive" alt="Image" width="100px" height="100px" />


            </td>

            <td>{data.start_time}</td>

            <td>{data.end_time}</td>

            <td>{data.value}</td>
            <td>{data.used}</td>
            <td>
             
                  {!isNaN(Number(set_limit_amount)) ? new Intl.NumberFormat().format(set_limit_amount.toString()) : set_limit_amount }
           
            </td>

            <td>
              <Link
                to={`/discount/edit/${store_code}/${data.id}`}
                class={`btn btn-warning btn-sm ${update == true ? "show" : "hide"}`}
              >
                <i class="fa fa-eye"></i> Sửa
              </Link>
              <button
                onClick={(e) => this.handleDelCallBack(e, store_code, data.id , data.name)}
                style={{ marginLeft: "10px" }}
                data-toggle="modal"
                data-target="#removeModal"
                class={`btn btn-danger btn-sm ${_delete == true ? "show" : "hide"}`}
              >
                <i class="fa fa-trash"></i> Xóa
              </button>
              <button
                onClick={(e) => this.handleIsEndCallback(e, store_code, data.id,data.name)}
                style={{ marginLeft: "10px" }}
                data-toggle="modal"
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
    var { discounts, is_end } = this.props;
    var per_page = discounts.per_page
    var current_page = discounts.current_page
    return (
      <div class="table-responsive">
        <table class="table table-border" id="dataTable" width="100%" cellspacing="0">
          <thead>
            <tr>
              <th>STT</th>
              <th>Mã</th>
              <th>Tên</th>
              <th>Hình ảnh</th>

              <th>Ngày bắt đầu</th>
              <th>Ngày kết thúc</th>
              <th>Giảm giá</th>
              <th>SL đơn đã áp dụng</th>
              <th>Giới hạn</th>
            
              <th>Hành động</th>
            </tr>
          </thead>

          <tbody>{this.showData(discounts, per_page, current_page)}</tbody>
        </table>
      </div>
    );
  }
}

export default Table;
