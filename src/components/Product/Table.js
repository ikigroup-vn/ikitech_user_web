import React, { Component } from "react";
import { Link } from "react-router-dom";
import { filter_arr, format } from "../../ultis/helpers";
import { shallowEqual } from "../../ultis/shallowEqual";
class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: [],
    };
  }

  passDataModal = (event, store_code, id, name) => {
    this.props.handleDelCallBack({
      table: "Sản phẩm",
      id: id,
      store_code: store_code,
      name: name,
    });
    event.preventDefault();
  };

  checkSelected = (id) => {
    var selected = [...this.state.selected];
    if (selected.length > 0) {
      for (const item of selected) {
        if (item == id) {
          return true;
        }
      }
      return false;
    } else {
      return false;
    }
  };
  componentWillReceiveProps(nextProps) {
    if (!shallowEqual(nextProps.products.data, this.props.products.data)) {
      this.setState({ selected: [] });
    }
  }
  onChangeSelected = (e, id) => {
    var { checked } = e.target;
    var selected = [...this.state.selected];
    if (checked == true) {
      selected.push(id);
    } else {
      for (const [index, item] of selected.entries()) {
        if (item == id) {
          selected.splice(index, 1);
        }
      }
    }
    this.setState({ selected });
  };
  handleMultiDelCallBack = (e, data) => {
    var { store_code } = this.props;
    this.props.handleMultiDelCallBack({
      table: "Sản phẩm",
      data: data,
      store_code: store_code,
    });
    e.preventDefault();
  };
  showData = (products, per_page, current_page) => {
    var result = null;
    var { store_code, page } = this.props;
    if (typeof products === "undefined") {
      return result;
    }
    if (products.length > 0) {
      var { _delete, update, insert } = this.props;
      result = products.map((data, index) => {
        var status_name = data.status == 0 ? "Hiển thị" : "Đã ẩn";
        var status_stock =
          data.quantity_in_stock_with_distribute == 0
            ? -2
            : data.quantity_in_stock_with_distribute == -1
              ? -1
              : data.quantity_in_stock_with_distribute;

        if (status_stock == null) {
          status_stock = -1;
        }


        var status =
          data.status == 0
            ? "success"
            : data.status == -1
              ? "secondary"
              : data.status == 2
                ? "danger"
                : null;
        var discount =
          typeof data.product_discount == "undefined" ||
            data.product_discount == null
            ? 0
            : data.product_discount.discount_price;
        var checked = this.checkSelected(data.id);
        console.log(checked)
        return (
          <tr>
            <td className={_delete == true ? "show" : "hide"}>
              {" "}
              <input
                style={{
                  height: "initial",
                }}
                type="checkbox"
                checked={checked}
                onChange={(e) => this.onChangeSelected(e, data.id)}
              />
            </td>
            <td>{per_page * (current_page - 1) + (index + 1)}</td>

            <td>{data.sku}</td>

            <td>
              <Link to={`/product/edit/${store_code}/${data.id}/${page}`}>
                {data.name}
              </Link>
            </td>
            {/* <td>{data.barcode}</td> */}

            <td>{format(Number(data.price))}</td>
            <td>
              {" "}
              <h5>
                <span class={`badge badge-${status}`}>{status_name}</span>
              </h5>
            </td>

            <td>{format(Number(discount))}</td>
            <td
              className={
                status_stock == -2 || status_stock == -1 ? "show" : "hide"
              }
            >
              {" "}
              <h5>
                <span
                  class={`badge badge-${status_stock == -2 ? "danger" : "success"
                    }`}
                >
                  {status_stock == -2 ? "Hết hàng" : "Vô hạn"}
                </span>
              </h5>
            </td>
            <td
              className={
                status_stock != -2 && status_stock != -1 ? "show" : "hide"
              }
            >
              {new Intl.NumberFormat().format(status_stock.toString())}
            </td>

            <td>{data.view}</td>
            <td>{data.likes}</td>

            <td className="btn-voucher">
              <Link
                to={`/product/edit/${store_code}/${data.id}/${page}`}
                class={`btn btn-warning btn-sm ${update == true ? "show" : "hide"
                  }`}
              >
                <i class="fa fa-edit"></i> Sửa
              </Link>
              <Link
                to={`/product/create/${store_code}/${data.id}`}
                class={`btn btn-primary btn-sm ${insert == true ? "show" : "hide"
                  }`}
              >
                <i class="fa fa-copy"></i> Sao chép
              </Link>
              <button
                onClick={(e) =>
                  this.passDataModal(e, store_code, data.id, data.name)
                }
                data-toggle="modal"
                data-target="#removeModal"
                class={`btn btn-danger btn-sm ${_delete == true ? "show" : "hide"
                  }`}
              >
                <i class="fa fa-trash"></i> Xóa
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
  onChangeSelectAll = (e) => {
    var checked = e.target.checked;
    var { products } = this.props;
    var _selected = [...this.state.selected];

    var listProduct = filter_arr(products.data);

    if (listProduct.length > 0) {
      if (checked == false) {
        this.setState({ selected: [] });
      } else {
        _selected = [];
        listProduct.forEach((product) => {
          _selected.push(product.id);
        });
        this.setState({ selected: _selected });
      }
    }
  };
  render() {
    var { products, store_code } = this.props;
    var { selected } = this.state;
    var per_page = products.per_page;
    var current_page = products.current_page;

    var listProduct = filter_arr(products.data);
    var _selected =
      selected.length > 0 && selected.length == listProduct.length
        ? true
        : false;
    var multiDelete = selected.length > 0 ? "show" : "hide";
    var { _delete, update, insert } = this.props;
    console.log(products)
    return (
      <div>
        <button
          onClick={(e) => this.handleMultiDelCallBack(e, selected)}
          data-toggle="modal"
          data-target="#removeMultiModal"
          style={{ marginLeft: "10px" }}
          class={`btn btn-danger btn-sm ${multiDelete}`}
        >
          <i class="fa fa-trash"></i> Xóa {selected.length} sản phẩm
        </button>
        <table
          class="table table-border "
          id="dataTable"
          width="100%"
          cellspacing="0"
        >
          <thead>
            <tr>
              <th
                className={_delete == true ? "show" : "hide"}              >
                <input
                  type="checkbox"
                  checked={_selected}
                  onChange={this.onChangeSelectAll}
                />
              </th>
              <th>STT</th>
              <th>Mã</th>

              <th>Tên</th>
              {/* <th>Mã vạch</th> */}

              <th>Giá</th>
              <th>Trạng thái </th>

              <th>Giảm giá</th>

              <th>Số lượng tồn kho</th>

              <th>Lượt xem</th>
              <th>Lượt thích</th>

              <th>Hành động</th>
            </tr>
          </thead>

          <tbody>{this.showData(listProduct, per_page, current_page)}</tbody>
        </table>
      </div>
    );
  }
}

export default Table;
