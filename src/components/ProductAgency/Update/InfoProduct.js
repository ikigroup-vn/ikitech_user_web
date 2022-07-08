import React, { Component } from "react";
import Select from "react-select";
import { shallowEqual } from "../../../ultis/shallowEqual";
import { formatNumber, formatNoD } from "../../../ultis/helpers"
import { product } from "../../../reducers/product/product";
class InfoProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtName: "",
      txtPrice: "",

      disabledPrice: false,

    };
  }

  onChange = (e) => {
    var target = e.target;
    var name = target.name;
    var value_text = target.value;
    var value = value_text
    const _value = formatNumber(value);


    if (!isNaN(Number(_value))) {
      value = formatNoD(_value);


      if (value_text == "") {
        this.setState({ [name]: "" });
      }
      else {
        this.setState({ [name]: value });

      }

    }


  };


  componentWillReceiveProps(nextProps) {


    if (!shallowEqual(nextProps.product, this.props.product)) {
      var { product } = { ...nextProps };
      const price = formatNumber(product.main_price);

      var _price = new Intl.NumberFormat().format(price);

      this.setState({
        txtName: product.name,
        txtPrice: _price,
        disabledPrice: _price == 0 ? true : false,

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

      txtName,
      disabledPrice,
      txtPrice,
    } = this.state;
    var { product } = this.props
    console.log(product)
    return (
      <div class="card-body" style={{ padding: "0.8rem" }}>


        {/* <div class="form-group">
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
            disabled
          />
        </div> */}

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {product.distributes?.length > 0 &&
            <div className="form-group">
              <label htmlFor="name">Giá đại lý</label>
              <div class="form-group" style={{ display: "flex" }}>
                <input
                  disabled
                  style={{ maxWidth: "420px" }}
                  type="text"
                  class="form-control"
                  id="txtEmail"
                  placeholder="Nhập giá"
                  autocomplete="off"
                  value={0}
                  name="txtPrice"
                />
                {/* <div class="form-check" style={{ margin: "auto 0" }}>
              <label class="form-check-label" for="gridCheck">
                Liên hệ
              </label>
              <input style={{ marginLeft: "10px" }} class="form-check-input" checked={disabledPrice} type="checkbox" onChange={this.onChangePrice} />

            </div> */}
              </div>

            </div>
          }
          {
            product.distributes?.length <= 0 &&
            <React.Fragment>
              <div className="form-group">
                <label htmlFor="name">Giá đại lý</label>
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
                  {/* <div class="form-check" style={{ margin: "auto 0" }}>
              <label class="form-check-label" for="gridCheck">
                Liên hệ
              </label>
              <input style={{ marginLeft: "10px" }} class="form-check-input" checked={disabledPrice} type="checkbox" onChange={this.onChangePrice} />

            </div> */}
                </div>

              </div>
              <div className="form-group">
                <label htmlFor="name">Giá bán lẻ</label>
                <div class="form-group" style={{ display: "flex" }}>
                  <input
                    disabled
                    style={{ maxWidth: "420px" }}
                    type="text"
                    class="form-control"
                    id="txtEmail"
                    placeholder="Nhập giá"
                    autocomplete="off"
                    value={formatNoD(product.main_price) ?? 0}
                  />
                  {/* <div class="form-check" style={{ margin: "auto 0" }}>
              <label class="form-check-label" for="gridCheck">
                Liên hệ
              </label>
              <input style={{ marginLeft: "10px" }} class="form-check-input" checked={disabledPrice} type="checkbox" onChange={this.onChangePrice} />

            </div> */}
                </div>

              </div>
            </React.Fragment>

          }


        </div>


      </div>
    );
  }
}

export default InfoProduct;
