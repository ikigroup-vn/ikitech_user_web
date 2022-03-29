import React, { Component } from "react";
import Select from "react-select";
import { shallowEqual } from "../../../ultis/shallowEqual";
import { formatNumber } from "../../../ultis/helpers"
import getChannel, { IKITECH } from "../../../ultis/channel";
class InfoProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtName: "",
      txtPrice: "",
      txtBarcode: "",
      txtStatus: "",
      txtCategory: [],
      listCategory: [],
      txtQuantityInStock: "",
      txtPercentC: "",
      disabledPrice: false,
      sku: ""
    };
  }

  onChange = (e) => {
    var target = e.target;
    var name = target.name;
    var value_text = target.value;
    var value = value_text
    const _value = formatNumber(value);


    if (name == "txtPrice" || name == "txtPercentC" || name == "txtQuantityInStock") {
      if (!isNaN(Number(_value))) {
        value = new Intl.NumberFormat().format(_value);
        value = value.toString().replace(/\./g, ',')
        if (name == "txtPercentC") {
          if (value.length < 3) {
            if (value_text == "") {
              this.setState({ [name]: "" });
            }
            else {
              this.setState({ [name]: value });

            }
          }
        }
        else {
          if (value_text == "") {
            this.setState({ [name]: "" });
          }
          else {
            this.setState({ [name]: value });

          }
        }
      }
    }
    else {

      this.setState({ [name]: value });

    }
  };
  onChangeSelect = (selectValue) => {
    this.setState({ txtCategory: selectValue });
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.total != this.props.total && typeof nextProps.total != "undefined") {
      var value = nextProps.total
      console.log(value)
      const _value = formatNumber(value);

      if (!isNaN(Number(_value))) {
        value = new Intl.NumberFormat().format(_value);
        this.setState({ txtQuantityInStock: value })
      }
    }
    if (
      !shallowEqual(nextProps.category_product, this.props.category_product)
    ) {
      var option = [];
      var categories = [...nextProps.category_product];
      if (categories.length > 0) {
        option = categories.map((category, index) => {
          return { value: category.id, label: category.name };
        });
        this.setState({ listCategory: option });
      }
    }
    if (!shallowEqual(nextProps.product, this.props.product)) {
      var { product } = { ...nextProps };
      var categories = [];
      if (product.categories.length > 0) {
        categories = product.categories.map((category, index) => {
          return { value: category.id, label: category.name };
        });
      }
      const price = formatNumber(product.price);

      var _price = new Intl.NumberFormat().format(price);

      const quantity_stock = product.quantity_in_stock < 0 ? "" : formatNumber(product.quantity_in_stock);

      var _quantity_stock = quantity_stock == "" ? "" : new Intl.NumberFormat().format(quantity_stock);

      this.setState({
        txtName: product.name,
        txtPrice: _price,
        disabledPrice: _price == 0 ? true : false,
        txtPercentC: product.percent_collaborator,
        txtBarcode: product.barcode,
        txtStatus: product.status,
        txtCategory: categories,
        txtQuantityInStock: _quantity_stock,
        sku: product.sku
      });

    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (
      !shallowEqual(nextState, this.state)
    ) {
      this.props.handleDataFromInfo(nextState);
    }

    return true;
  }

  onChangePrice = (e) => {
    var { checked } = e.target
    if (checked == true) {
      this.setState({ txtPrice: 0, disabledPrice: checked })
    }
    else {
      this.setState({ txtPrice: "", disabledPrice: checked })

    }
  }
  render() {
    var {
      listCategory,
      txtName,
      txtStatus,
      txtPrice,
      txtCategory,
      txtQuantityInStock
      , txtPercentC,
      txtBarcode,
      disabledPrice,
      sku
    } = this.state;
    var txtQuantityInStock = txtQuantityInStock == -1 ? "" : txtQuantityInStock
    return (
      <div class="card-body" style={{ padding: "0.8rem" }}>


        <div class="form-group">
          <label for="product_name">Tên sản phẩm</label>
          <input
            type="text"
            class="form-control input-sm"
            id="txtName"
            placeholder="Nhập tên sản phẩm"
            autocomplete="off"
            value={txtName}
            onChange={this.onChange}
            name="txtName"
          />
        </div>
        <div class="form-group">
          <label for="product_name">Mã SKU</label>
          <input
            type="text"
            class="form-control input-sm"
            id="sku"
            placeholder="Nhập sku"
            autocomplete="off"
            value={sku}
            onChange={this.onChange}
            name="sku"
          />
        </div>
        <div class="form-group">
          <label for="product_name">Mã SKU</label>
          <input
            type="text"
            class="form-control input-sm"
            id="txtBarcode"
            placeholder="Nhập barcode"
            autocomplete="off"
            value={txtBarcode}
            onChange={this.onChange}
            name="txtBarcode"
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Giá</label>
          <div class="form-group" style={{ display: "flex" }}>
            <input
              disabled={disabledPrice}
              style={{ maxWidth: "420px" }}
              type="text"
              class="form-control"
              id="txtEmail"
              placeholder="Nhập giá"
              autocomplete="off"
              value={txtPrice}
              onChange={this.onChange}
              name="txtPrice"
            />
            <div class="form-check" style={{ margin: "auto 0" }}>
              <label class="form-check-label" for="gridCheck">
                Liên hệ
              </label>
              <input style={{ marginLeft: "10px" }} class="form-check-input" checked={disabledPrice} type="checkbox" onChange={this.onChangePrice} />

            </div>
          </div>

        </div>
        <div class="form-group">
          <label for="product_name">Số lượng trong kho</label>
          <i style={{
            display: "block",
            marginBottom: "5px"
          }}>Bỏ trống khi bán không quan tâm đến số lượng</i>
          <input
            type="text"
            class="form-control"
            id="txtAddress_detail"
            placeholder="Nhập số lương"
            autocomplete="off"
            value={txtQuantityInStock}
            onChange={this.onChange}
            name="txtQuantityInStock"
          />
        </div>

        {
          getChannel() == IKITECH &&
          <div class="form-group">
            <label for="product_name">Phần trăm hoa hồng CTV</label>
            <i style={{
              display: "block",
              marginBottom: "5px"
            }}>Bỏ trống khi sản phẩm không có hoa hồng</i>
            <input
              type="text"
              class="form-control"
              id="txtEmail"
              placeholder="Nhập %"
              autocomplete="off"
              value={txtPercentC}
              onChange={this.onChange}
              name="txtPercentC"
            />
          </div>
        }
        {
          getChannel() == IKITECH &&
          <div class="form-group">
            <label for="product_name">Trạng thái</label>

            <select
              id="input"
              class="form-control"
              value={txtStatus}
              onChange={this.onChange}
              name="txtStatus"
            >
              <option value="0">Hiển thị</option>
              <option value="-1">Tạm ẩn</option>
            </select>
          </div>
        }
        <div class="form-group">
          <label for="product_name">Danh mục</label>

          <Select
            value={txtCategory}
            isMulti
            isClearable
            isSearchable
            options={listCategory}
            name="txtCategory"
            onChange={this.onChangeSelect}
          />
        </div>

      </div>
    );
  }
}

export default InfoProduct;
