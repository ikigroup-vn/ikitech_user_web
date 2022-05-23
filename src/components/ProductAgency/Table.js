import React, { Component } from "react";
import { Link } from "react-router-dom";
import { filter_arr, filter_var, format } from "../../ultis/helpers";
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
    var { store_code, page,agency_type_id } = this.props;
    if (typeof products === "undefined") {
      return result;
    }
    if (products.length > 0) {
      var { _delete, update, insert } = this.props;
      result = products.map((data, index) => {

        return (
          <tr className = "hover-product">
        
            <td>{per_page * (current_page - 1) + (index + 1)}</td>

            <td>{data.sku}</td>

            <td>
              <Link to={`/product/edit/${store_code}/${data.id}/${page}`}>
                {data.name}
              </Link>
            </td>

            <td>{format(Number(data.price))}</td>
    
            <td>{typeof data.agency_price != "undefined" ? format(Number(data.agency_price.main_price)) : null  }</td>

            <td>
              <Link
                to={`/product-agency/edit-price/${store_code}/${data.id}/${agency_type_id}`}
                class={`btn btn-warning btn-sm ${update == true ? "" : "hide"
                  }`}
              >
                <i class="fa fa-edit"></i> Chỉnh sửa giá
              </Link>

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
       
              <th>STT</th>
              <th>Mã SKU</th>

              <th>Tên sản phẩm</th>

              <th>Giá bán lẻ</th>
       
              <th>Giá đại lý</th>

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
