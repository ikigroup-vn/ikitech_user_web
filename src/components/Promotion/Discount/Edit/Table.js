import React, { Component } from "react";
import { connect } from "react-redux";
import { InputNumber, Checkbox } from 'antd';

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      isCheckAll: false,
      selectedProduct: [],
    };
  }

  removeItem = (id) => {
    this.props.handleAddProduct(null, id, "remove", true);
  };

  handleChangePercent = (e, productId) => {
    if (this.state.selectedProduct.includes(productId)) {
      return this.props.handleChangeMultiProductPercent(this.state.selectedProduct, e);
    }
    return this.props.handleChangePercentProduct(productId, e)
  }

  onSelectProduct = (e, product_id) => {
    if (e.target.checked) {
      return this.setState(function (state) {
        return {
          selectedProduct: [...state.selectedProduct, product_id]
        }
      })
    }

    return this.setState(function (state) {
      return {
        selectedProduct: [...state.selectedProduct.filter(e => e != product_id)]
      }
    })
    
  }
  onSelectAll = (e) => {
    if (e.target.checked) {
      return this.setState({selectedProduct: [...this.props.products.map(e => e.id)]})
    }
    return this.setState({ selectedProduct: [] })
  }
  showData = (products) => {
    var result = null;
    if (typeof products === "undefined") {
      return result;
    }
    if (products.length > 0) {
      result = products.map((data, index) => {
        return (
          <tr>
            <td>
              <Checkbox onChange={(e) => this.onSelectProduct(e, data.id)} checked={this.state.selectedProduct.includes(data.id)} />
            </td>
            <td>{index + 1}</td>

            <td>{data.sku}</td>

            <td>{data.name}</td>

            <td>
              <InputNumber
                addonAfter="%"
                value={data.discount_value || 1}
                // defaultValue={data.discount_value || 1}
                onChange={(e) => this.handleChangePercent(e, data.id)} key={data.id}
                min={1}
                max={99}/>
            </td>
            <td>
              <button
                type="button"
                class="btn btn-danger btn-sm"
                onClick={() => {
                  document.querySelector("#inputCheckAll").checked = false;
                  this.removeItem(data.id);
                }}
              >
                <i class="fa fa-trash"></i>
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
    var { products, setDefaultListProducts } = this.props;
    return (
      <React.Fragment>
        <div class="form-group">
          <label for="product_name">Sản phẩm được áp dụng</label>

          <button
            type="button"
            class="btn btn-primary-no-background btn-sm"
            style={{ marginLeft: "10px" }}
            data-toggle="modal"
            data-target="#showListProduct"
            onClick={() => setDefaultListProducts()}
          >
            <i class="fas fa-plus"></i>
            <span class="text">&nbsp;Chọn sản phẩm</span>
          </button>
        </div>
        <div class="form-group" >
          <label for="product_name">Danh sách sản phẩm : </label>

          <div class="col-xs-9 col-sm-9 col-md-9 col-lg-9">
            <div class="table-responsive">
              <table class="table table-border table-hover">
                <thead>
                  <tr>
                    <th><Checkbox checked={ this.state.selectedProduct.length}  onChange={(e) => this.onSelectAll(e)}/></th>
                    <th>STT</th>
                    <th>Mã SKU</th>
                    <th>Tên sản phẩm</th>
                    <th>Giảm giá (%)</th>
                    <th>Hành động</th>
                  </tr>
                </thead>
                <tbody>{this.showData(products)}</tbody>
              </table>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {};
};
export default connect(null, mapDispatchToProps)(Table);
