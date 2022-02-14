import React, { Component } from "react";
import { connect } from "react-redux";
class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],

    };
  }

  onChange = (e, id) => {
    this.props.handleChangeQuantity(id ,e.target.value)
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.quantity !== this.props.quantity) {
      this.setState({ txtQuantity: nextProps.quantity })
    }
  }


  removeItem = (id) => {
    this.props.handleAddProduct(null, id, "remove")
  }

  decrement = (id) => {
    this.props.handleChangeQuantity(id ,null , -1)

  }
  increment = (id) => {

    this.props.handleChangeQuantity(id, null ,1)

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
            <td>{index + 1}</td>

            <td>{data.product.id}</td>

            <td>{data.product.name}</td>
            <td className="quantity" style = {{display:"flex"}}>
              <span onClick={() => { this.decrement(data.product.id) }} class="input-quantity input-number-decrement">–</span>
              <input class="input-number" name="txtQuantity" value={data.quantity} type="text" onChange={(e) => this.onChange(e, data.product.id)} />
              <span onClick={() => this.increment(data.product.id)} class="input-quantity input-number-increment">+</span>
            </td>

            <td>
              <button type="button" class="btn btn-danger btn-sm" onClick={() => this.removeItem(data.product.id)}>

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
    var { products } = this.props;
    console.log(products);
    return (
      <React.Fragment>
        <div class="form-group">
          <label for="product_name">Sản phẩm : </label>

          <button
            type="button"
            style={{ marginLeft: "10px" }}
            data-toggle="modal"
            data-target="#showListProduct"
          >
            <span class="icon text-white-50">
              <i class="fas fa-plus" style={{ color: "black" }}></i>
            </span>
            <span class="text">Chọn sản phẩm</span>
          </button>
        </div>
        <div class="form-group">
          <label for="product_name">Danh sách sản phẩm : </label>

          <div class="col-xs-9 col-sm-9 col-md-9 col-lg-9">
            <div class="table-responsive">
              <table class="table table-border table-hover">
                <thead className="thead-quantity">
                  <tr>
                    <th>STT</th>
                    <th>Mã sản phẩm</th>
                    <th>Tên sản phẩm</th>
                    <th>Số lượng</th>

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
