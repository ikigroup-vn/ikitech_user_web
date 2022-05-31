import React, { Component } from "react";
import { connect } from "react-redux";
import Pagination from "../../components/Product/Pagination"
import * as Env from "../../ultis/default"
import { format, formatNumber, contactOrNumber } from "../../ultis/helpers";
class ListProduct extends Component {
  constructor(props) {
    super(props);


  }

  handleAddProduct = (id, name, img, price) => {
    window.$('.modal').modal('hide');

    this.props.handleAddProduct({
      id,
      name,
      img,
      price
    })
  }



  showData = (products) => {
    var result = null;
    if (typeof products === "undefined") {
      return result;
    }
    if (products.length > 0) {
      result = products.map((data, index) => {

        var status_name = data.status == 0 ? "Còn hàng" : data.status == 1 ? "Đã ẩn" : data.status == 2 ? "Hết hàng" : null
        var status = data.status == 0 ? "success" : data.status == 1 ? "secondary" : data.status == 2 ? "danger" : null
        var img = ""
        try {
          img = data.images.length == 0 ? Env.IMG_NOT_FOUND : data.images[data.index_image_avatar].image_url

        } catch (error) {
          img = Env.IMG_NOT_FOUND
        }
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
          <tr >
            <td>
              {index + 1}


            </td>

            <td>
              <img
                src={
                  data.images.length > 0
                    ? data.images[0].image_url
                    : Env.IMG_NOT_FOUND
                }
                className="img-responsive"
                alt="Image"
                style={{ width: "100%", height: "59px", background: "#0000000d" }}
              />
            </td>
            <td>{data.sku}</td>

            <td>{data.name}</td>

            <td>
        { product_discount == null &&
          <div className="eea"
          >
            {min_price === max_price ? (
              contactOrNumber(format(
                Number(
                  discount_percent == null
                    ? min_price
                    : min_price - min_price * discount_percent * 0.01
                )
              )
              )) : distributes && distributes.length == 0 ? contactOrNumber(format(
                Number(
                  discount_percent == null
                    ? min_price
                    : min_price - min_price * discount_percent * 0.01
                ))) : (
              <div className="ae"
              >
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
          }

          {product_discount && (
            <div
              className="a"
              style={{
                float: "left",
              }}
            >
              {min_price === max_price ? (
                contactOrNumber(format(Number(min_price)))
              ) : (
                <div className="row e">
                  <div
                    style={{
                      // textDecoration: "line-through",
                    }}
                  >
                    {format(Number(min_price))}
                    {" - "}
                    {format(Number(max_price))}
                  </div>

                  {/* <div className="discount e">&emsp; -{discount_percent}%</div> */}
                </div>
              )}
            </div>
          )}
        </td>

            <td >
              <button
                type="button"
                onClick={() => this.handleAddProduct(data.id, data.name, img, data.price)}

                class="btn btn-primary btn-sm"
              >
                <i class="fa fa-plus"></i> Chọn
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
    var { products, store_code } = this.props
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

              <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>

            </div>
            <div class="table-responsive">
              <table class="table  table-hover table-border" style={{ color: "black" }}>
                <thead>
                  <tr>
                    <th></th>
                    <th style={{ width: "13%" }}>Hình ảnh</th>

                    <th>Mã SKU</th>
                    <th>Tên sản phẩm</th>
                    <th>Giá</th>
                    <th>Hành động</th>

                  </tr>
                </thead>

                <tbody>{this.showData(products.data)}</tbody>
              </table>
            </div>

            <div class="group-pagination_flex col-xs-12 col-sm-12 col-md-12 col-lg-12">

              <Pagination style="float-fix" store_code={store_code} products={products} />
              <button

                type="button"
                class="btn btn-default pagination-btn"
                data-dismiss="modal"
              >
                Đóng
              </button>
            </div>

          </div>
        </div>
      </div>
    );
  }
}



const mapDispatchToProps = (dispatch, props) => {
  return {

  };
};
export default connect(null, mapDispatchToProps)(ListProduct);
