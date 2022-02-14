import React, { Component } from "react";
import { Link } from "react-router-dom";

class Table extends Component {
  constructor(props) {
    super(props);
  }
  handleDelCallBack = (event, store_code, id , name) => {
    this.props.handleDelCallBack({ table: "Chương trình", id: id, store_code: store_code , name});
    event.preventDefault();
  }

  handleIsEndCallback = (event, store_code, id) => {
    this.props.handleIsEndCallback({ id: id, store_code: store_code });
    event.preventDefault();
  }
  showData = (combos, per_page, current_page) => {
    var combos  = this.props.is_end == 0 ? combos : combos.data
    var result = null;
    var { store_code } = this.props.params;
    if (typeof combos === "undefined") {
      return result;
    }
    if (combos.length > 0) {
      var {update , _delete} = this.props

      result = combos.map((data, index) => {
        var set_limit_amount =
          data.set_limit_amount == true ? data.amount : "Không giới hạn";
        var status_limit_amount = data.set_limit_amount == true ? "" : "danger";

        var type_discount = data.discount_type == 0 ? "Cố định" : "Theo %"
        var showCurrentPage = typeof per_page != "undefined" && per_page != null ? true : false
        var disableIsEnd = this.props.is_end == 0 ? "show" : "hide"


        return (
          <tr>
            <td class={showCurrentPage ? "hide" : "show"}>{index + 1}</td>

            <td class={showCurrentPage ? "show" : "hide"}>{(per_page * (current_page - 1)) + (index + 1)}</td>
            <td>{data.id}</td>
            <td>{data.name}</td>
            <td>{data.start_time}</td>
            <td>{data.end_time}</td>
            <td>{type_discount}</td>
            <td>{data.value_discount == null ? null : new Intl.NumberFormat().format(data.value_discount.toString())} </td>

            <td>
           

                {!isNaN(Number(set_limit_amount)) ? new Intl.NumberFormat().format(set_limit_amount.toString()) : set_limit_amount }

                  {set_limit_amount}
            </td>


            <td className="btn-voucher">
              <Link
                to={`/combo/edit/${store_code}/${data.id}`}
                class={`btn btn-warning btn-sm ${update == true ? "show" : "hide"}`}
              >
                <i class="fa fa-eye"></i> Sửa
              </Link>
              <button
                onClick={(e) => this.handleDelCallBack(e, store_code, data.id , data.name)}
                data-toggle="modal"
                data-target="#removeModal"
                class={`btn btn-danger btn-sm ${_delete == true ? "show" : "hide"}`}
              >
                <i class="fa fa-trash"></i> Xóa
              </button>
              <button
                onClick={(e) => this.handleIsEndCallback(e, store_code, data.id)}
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
    var { combos, is_end } = this.props;
    var per_page = combos.per_page
    var current_page = combos.current_page
    return (
      <div class="table-responsive">
        <table class="table table-border" id="dataTable" width="100%" cellspacing="0">
          <thead>
            <tr>
              <th>STT</th>
              <th>Mã</th>
              <th>Tên</th>

              <th>Ngày bắt đầu</th>
              <th>Ngày kết thúc</th>
              <th>Loại giảm giá</th>
              <th>Giá trị</th>
              <th>Giới hạn Combo</th>


              <th>Hành động</th>
            </tr>
          </thead>

          <tbody>{this.showData(combos, per_page, current_page)}</tbody>
        </table>
      </div>
    );
  }
}

export default Table;
