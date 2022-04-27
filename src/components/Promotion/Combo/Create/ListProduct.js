import React, { Component } from "react";
import { connect } from "react-redux";
import Pagination from "../../../Product/Pagination"
import { format } from "../../../../ultis/helpers"
import themeData from "../../../../ultis/theme_data";
import * as productAction from "../../../../actions/product";

class ListProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtName: "",
      page: 1,
      numPage: 20,
    };
  }

  onChange = (e) => {
    var { value, checked } = e.target
    console.log(checked)
    var data = JSON.parse(value);
    if (checked == true)
      this.props.handleAddProduct(data, null, "add")
    else
      this.props.handleAddProduct(null, data.id, "remove")

  }

  passNumPage = (page) => {
    this.setState({ page: page })
  }

  checkExsit = (list, id) => {
    console.log(list)
    if (list.length > 0) {
      for (const element of list) {
        if (element.product.id == id) {
          return true
        }
      }
    }
    return false
  }


  checkDisable = (combos, id) => {
    console.log(combos);
    if (combos.length > 0) {
      for (const element of combos) {
        for (const item of element.products_combo) {
          if (item.product.id == id) {
            return true
          }
        }

      }
    }
    return false
  }
  onSaveProduct = () => {
    this.props.onSaveProduct()
    window.$(".modal").modal("hide");

  }
  showData = (products, list, combos) => {
    var result = null;
    if (typeof products === "undefined") {
      return result;
    }
    if (products.length > 0) {
      result = products.map((data, index) => {

        var status_name = data.status == 0 ? "Còn hàng" : data.status == 1 ? "Đã ẩn" : data.status == 2 ? "Hết hàng" : null
        var status = data.status == 0 ? "success" : data.status == 1 ? "secondary" : data.status == 2 ? "danger" : null
        var checked = this.checkExsit(list, data.id)
        var disaled = this.checkDisable(combos, data.id, list);
        var background_disable = disaled == true ? "#55b8c3" : "white"
        const {
          product_discount,
          min_price,
          max_price,
          _delete,
          update,
          insert,
          per_page,
          current_page,
          store_code,
          page,
          status_stock,
          discount,
          historyInventory,
          distributes
        } = data;
        let discount_percent = null;

        if (product_discount) {
          discount_percent = product_discount.value;
        }
        return (
          <tr className={disaled == true ? "" : "hover-product"} style={{ background: background_disable }}>
            <td>

              <div class="checkbox">
                <label>
                  <input type="checkbox"
                    disabled={disaled}
                    checked={checked}
                    onChange={this.onChange}
                    value={JSON.stringify(data)} />
                </label>
              </div>

            </td>

            <td>{data.sku}</td>

            <td>{data.name}</td>

            <td>     <div>
              {min_price === max_price ? (
                format(
                  Number(
                    discount_percent == null
                      ? min_price
                      : min_price - min_price * discount_percent * 0.01
                  )
                )
              ) : distributes && distributes.length == 0 ? format(
                Number(
                  discount_percent == null
                    ? min_price
                    : min_price - min_price * discount_percent * 0.01
                )) : (
                <div>
                  {format(
                    Number(
                      discount_percent == null
                        ? min_price
                        : min_price - min_price * discount_percent * 0.01
                    )
                  )}
                  {" - "}
                  {format(
                    Number(
                      discount_percent == null
                        ? max_price
                        : max_price - max_price * discount_percent * 0.01
                    )
                  )}
                </div>
              )}
            </div>

              {product_discount && (
                <div
                  style={{
                    float: "left",
                  }}
                >
                  {min_price === max_price ? (
                    format(Number(min_price))
                  ) : (
                    <div className="row">
                      <div
                        style={{
                          textDecoration: "line-through",
                        }}
                      >
                        {format(Number(min_price))}
                        {" - "}
                        {format(Number(max_price))}
                      </div>

                      <div className="discount">&emsp; -{discount_percent}%</div>
                    </div>
                  )}
                </div>
              )}</td>            <td> <h5>
                <span class={`badge badge-${status}`}>
                  {status_name}
                </span>
              </h5></td>




          </tr>
        );
      });
    } else {
      return result;
    }
    return result;
  };
  onChangeSearch = (e) => {
    this.setState({ searchValue: e.target.value });
  };
  passNumPage = (page) => {
    this.setState({ page: page })
  }
  searchData = (e) => {
    e.preventDefault();
    var { store_code } = this.props;
    var { searchValue } = this.state;
    const branch_id = localStorage.getItem("branch_id");
    var params = `&search=${searchValue}`;
    this.props.fetchAllProductV2(store_code, branch_id, 1, params);
  };


  render() {
    var { products, store_code, listProducts, combos } = this.props
    var { searchValue } = this.state
    return (
      <div
        class="modal fade"
        tabindex="-1"
        role="dialog"
        id="showListProduct"
        data-keyboard="false"
        data-backdrop="static"
      >
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content" style={{ maxHeight: "630px" }}>
            <div class="modal-header" style={{ background: "white" }}>

              <div>
                <h4 style={{ color: "black", display: "block" }}>Chọn sản phẩm</h4>

                <i style={{ color: "red" }}> Những sản phẩm được tô đậm là những sản phẩm đang nằm trong các chương trình khuyến mại khác! Vui lòng xóa nếu muốn thêm vào chương trình này</i>

              </div>

              <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>

            </div>
            <form style={{ marginTop: "10px" }} onSubmit={this.searchData}>
              <div
                class="input-group mb-6"
                style={{ padding: "0 20px" }}
              >
                <input
                  style={{ maxWidth: "280px", minWidth: "150px" }}
                  type="search"
                  name="txtSearch"
                  value={searchValue}
                  onChange={this.onChangeSearch}
                  class="form-control"
                  placeholder="Tìm kiếm sản phẩm"
                />
                <div class="input-group-append">
                  <button class="btn btn-primary" type="submit">
                    <i class="fa fa-search"></i>
                  </button>
                </div>
              </div>

            </form>
            <div class="table-responsive">
              <table class="table table-hover table-border">
                <thead>
                  <tr>
                    <th></th>
                    <th>Mã SKU</th>
                    <th>Tên</th>
                    <th>Giá</th>
                    <th>Trạng thái</th>
                  </tr>
                </thead>

                <tbody>{this.showData(products.data, listProducts, combos)}</tbody>
              </table>
            </div>


            <div class="group-pagination_flex col-xs-12 col-sm-12 col-md-12 col-lg-12" style={{ display: "flex", justifyContent: "space-between" }}>

              <Pagination style="float-fix" store_code={store_code} products={products} passNumPage={this.passNumPage} limit={this.state.numPage} />
              <div style={{ marginTop: "10px" }}>
                <button
                  style={{
                    border: "1px solid",
                    marginRight: "10px"
                  }}
                  type="button"
                  class="btn btn-default"
                  data-dismiss="modal"
                >
                  Hủy
                </button>
                <button style={{ backgroundColor: themeData().backgroundColor }} onClick={this.onSaveProduct} class="btn btn-info">
                  Xác nhận
                </button>
              </div>
            </div>


          </div>
        </div>
      </div>
    );
  }
}



const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchAllProductV2: (store_code, branch_id, page, params) => {
      dispatch(
        productAction.fetchAllProductV2(store_code, branch_id, page, params)
      );
    },
  };
};
export default connect(null, mapDispatchToProps)(ListProduct);
