import React, { Component } from "react";
import * as CollaboratorAction from "../../../actions/collaborator";
import * as productAction from "../../../actions/product";
import { connect } from "react-redux";
import { shallowEqual } from "../../../ultis/shallowEqual";
import themeData from "../../../ultis/theme_data";
import { formatNumber } from "../../../ultis/helpers";
import Distribute from "../Update/Distribute";
import { forEach } from "lodash";

class UpdatePriceCtvModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtNewPrice: "",
      id: "",
      product: {},
      distribute: {},
      isFocused: false,
      percent_collaborator: 0,
      unit: "%",
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!shallowEqual(nextProps.modal, this.props.modal)) {
      var product = nextProps.modal;

      this.setState({
        id: product.id,
        product: product,
        percent_collaborator: product.percent_collaborator,
        distribute:
          product.distributes.length > 0 ? product.distributes[0] : {},
        txtNewPrice:
          product.price == null
            ? null
            : new Intl.NumberFormat().format(product.price.toString()),
      });
    }
  }

  handleFocus = () => {
    this.setState({ isFocused: true });
  };

  handleBlur = () => {
    this.setState({ isFocused: false });
  };
  //   handleChange = (event) => {
  //     this.setState({ percent_collaborator: event.target.value });
  //   };
  handleChange = (event) => {
    const inputValue = event.target.value;

    // Kiểm tra nếu chỉ nhập số
    if (/^\d*$/.test(inputValue)) {
      const numericValue = Number(inputValue);

      if (this.state.unit === "%") {
        // Giới hạn giá trị khi đơn vị là %
        if (numericValue <= 100) {
          this.setState({ percent_collaborator: inputValue });
        }
      } else if (this.state.unit === "VNĐ") {
        // Không giới hạn giá trị khi đơn vị là VNĐ
        this.setState({ percent_collaborator: inputValue });
      }
    }
  };

  handleUnitChange = (e) => {
    this.setState({ unit: e.target.value });
  };
  handleSubmit = () => {
    var { store_code } = this.props;
    var { product, percent_collaborator, unit } = this.state;
    const form = { percent_collaborator: percent_collaborator };
    const form2 = { money_amount_collaborator: percent_collaborator };
    if (unit == "%") {
      this.props.updateProduct2(store_code, form, product?.id, null);
      setTimeout(() => {
        this.props.fetchAllProduct(store_code);
      }, 1000);
    } else {
      this.props.updateProduct2(store_code, form2, product?.id, null);
      setTimeout(() => {
        this.props.fetchAllProduct(store_code);
      }, 1000);
    }
  };

  render() {
    var { txtNewPrice, product } = this.state;

    return (
      <div
        class="modal fade"
        tabindex="-1"
        role="dialog"
        id="updateModalNewPriceCtv"
        data-keyboard="false"
        data-backdrop="static"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div
              class="modal-header"
              style={{ backgroundColor: themeData().backgroundColor }}
            >
              <h4 style={{ color: "white" }}>Chỉnh nhanh hoa hồng CTV</h4>

              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-hidden="true"
              >
                &times;
              </button>
            </div>

            {/* <div style={{ textAlign: "center", margin: "20px" }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  border: `2px solid ${
                    this.state.isFocused ? "#bdbdbd" : "#bdbdbd"
                  }`,
                  borderRadius: "10px",
                  paddingRight: "10px",
                  transition: "border-color 0.3s ease, box-shadow 0.3s ease",
                  boxShadow: this.state.isFocused
                    ? "0px 0px 10px rgba(72, 239, 128, 0.5)"
                    : "none",
                }}
              >
                <input
                  type="text"
                  placeholder="Nhập gì đó..."
                  style={{
                    padding: "10px",
                    fontSize: "16px",
                    border: "none",
                    outline: "none",
                    width: "200px",
                    borderRadius: 10,
                  }}
                  value={this.state.percent_collaborator}
                  onFocus={this.handleFocus}
                  onBlur={this.handleBlur}
                  onChange={this.handleChange}
                />
                <span style={{ fontSize: "16px", fontWeight: "bold" }}>%</span>
              </div>
            </div> */}
            <div style={{ textAlign: "center", margin: "20px" }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  border: `2px solid ${
                    this.state.isFocused ? "#bdbdbd" : "#bdbdbd"
                  }`,
                  borderRadius: "10px",
                  paddingRight: "10px",
                  transition: "border-color 0.3s ease, box-shadow 0.3s ease",
                  boxShadow: this.state.isFocused
                    ? "0px 0px 10px rgba(72, 239, 128, 0.5)"
                    : "none",
                }}
              >
                <input
                  type="text"
                  placeholder="Nhập gì đó..."
                  style={{
                    padding: "10px",
                    fontSize: "16px",
                    border: "none",
                    outline: "none",
                    width: "200px",
                    borderRadius: 10,
                  }}
                  value={this.state.percent_collaborator}
                  onFocus={this.handleFocus}
                  onBlur={this.handleBlur}
                  onChange={this.handleChange}
                />
                <select
                  style={{
                    fontSize: "16px",
                    fontWeight: "bold",
                    border: "none",
                    background: "none",
                    outline: "none",
                    cursor: "pointer",
                  }}
                  value={this.state.unit}
                  onChange={this.handleUnitChange}
                >
                  <option value="%">%</option>
                  <option value="VNĐ">VNĐ</option>
                </select>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-default"
                data-dismiss="modal"
              >
                Đóng
              </button>
              <button
                onClick={() => this.handleSubmit()}
                data-dismiss="modal"
                aria-hidden="true"
                class="btn btn-warning"
              >
                Lưu
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
    updateStep: (store_code, id, data) => {
      dispatch(CollaboratorAction.updateStep(store_code, id, data));
    },
    updateDistributeWithoutBranch: (store_code, id, data) => {
      dispatch(
        productAction.updateDistributeWithoutBranch(store_code, id, data)
      );
    },
    updateProduct2: (store_code, product, productId, page) => {
      dispatch(
        productAction.updateProduct2(store_code, product, productId, page)
      );
    },
    fetchAllProduct: (store_code, page, params, agency_type_id) => {
      dispatch(
        productAction.fetchAllProduct(store_code, page, params, agency_type_id)
      );
    },
  };
};
export default connect(null, mapDispatchToProps)(UpdatePriceCtvModal);
