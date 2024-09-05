import { Component } from "react";
import Sidebar from "../../components/Partials/Sidebar";
import Topbar from "../../components/Partials/Topbar";
import CreateModal from "../../components/PrizeCode/CreateModal";

import ListProductModal from "../../components/PrizeCode/ListProductModal";
import { connect } from "react-redux";
import * as productAction from "../../actions/product";
import * as discountAction from "../../actions/discount";
import * as CategoryPAction from "../../actions/category_product";
import { contactOrNumber, format } from "../../ultis/helpers";
import * as Env from "../../ultis/default";
import * as prizeCodeApi from "../../data/remote/prize_code";

class CreatePrizeCode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShow: true,
      listProduct: [],
      saveListProduct: [],
      listProductPrize: [],
      saveListProductPrize: [],
      form: {
        quantity: 0,
        product_id: null,
        prize_product_id: null,
      },
    };
  }

  componentDidMount() {
    const { store_code } = this.props.match.params;
    this.props.fetchAllProduct(store_code);
    this.props.fetchAllDiscount(store_code);
    this.props.fetchAllCategoryP(store_code);
  }

  checkExsit = (list, id) => {
    if (list.length > 0) {
      for (const element of list) {
        if (element.id == id) {
          return true;
        }
      }
    }
    return false;
  };

  checkDisable = (discounts, id) => {
    if (discounts.length > 0) {
      for (const element of discounts) {
        if (discounts.products?.length > 0) {
          for (const item of element.products) {
            if (item.id == id) {
              return true;
            }
          }
        }
      }
    }
    return false;
  };

  removeItem = (id) => {
    this.handleAddProduct(this.state.listProduct, id, "remove", true);
  };

  handleListProduct = (products) => {
    this.setState({
      listProduct: products,
    });
  };

  handleSaveListProduct = () => {
    this.setState({
      saveListProduct: [...this.state.listProduct],
      form: {
        ...this.state.form,
        product_id: this.state.listProduct[0].id,
      },
    });
  };

  handleAddProduct = (product, id, type, onSave = null) => {
    var products = [...this.state.listProduct];
    products = [product];
    console.log("product", product);
    console.log("id", id);
    console.log("type", type);
    console.log("onSave", onSave);
    if (type == "remove") {
      if (products.length > 0) {
        products.forEach((item, index) => {
          if (item.id === id) {
            products.splice(index, 1);
          }
        });
      }
    }

    if (onSave == true && type !== "remove")
      this.setState({
        listProduct: products,
        saveListProduct: products,
        form: {
          ...this.state.form,
          product_id: products[0].id,
        },
      });
    else this.setState({ listProduct: products, saveListProduct: [] });
  };

  showListProduct = (products) => {
    var result = null;
    if (typeof products === "undefined") {
      return result;
    }
    if (products.length > 0) {
      result = products.map((data, index) => {
        return (
          <tr>
            <td>{index + 1}</td>

            <td>{data.sku}</td>

            <td>{data.name}</td>
            <td>
              <button
                type="button"
                class="btn btn-danger btn-sm"
                onClick={() => {
                  // document.querySelector("#inputCheckAll").checked = false;
                  this.removeItem(data.id);
                }}
              >
                <i
                  class="fa fa-trash"
                  style={{
                    margin: 0,
                  }}
                ></i>
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

  onSave = (e) => {
    e.preventDefault();
    const { form } = this.state;
    const { store_code } = this.props.match.params;

    prizeCodeApi
      .createPrizeCode(store_code, form)
      .then((res) => {
        this.props.history.goBack();
      })
      .catch(() => {});
  };

  render() {
    const { store_code } = this.props.match.params;
    const { isShow } = this.state;

    return (
      <div id="wrapper">
        <Sidebar store_code={store_code} />
        <div className="col-10 col-10-wrapper">
          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
              <Topbar store_code={store_code} />
              {typeof isShow === "undefined" ? (
                <div style={{ height: "500px" }}></div>
              ) : isShow === true ? (
                <div class="container-fluid">
                  <div className="card">
                    <div
                      className="card-header py-3"
                      style={{
                        display: "flex",
                        gap: "16px",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: "16px",
                      }}
                    >
                      <h6 className="m-0 title_content font-weight-bold text-primary">
                        Tạo mã dự thưởng
                      </h6>
                    </div>
                    <div>
                      <form role="form" onSubmit={this.onSave} method="post">
                        <div class="box-body">
                          <div class="form-group">
                            <label for="product_name">Số lượng mã</label>
                            <input
                              type="text"
                              class="form-control"
                              id="quantity"
                              value={this.state.form.quantity}
                              placeholder="Nhập số lượng mã"
                              autoComplete="off"
                              onChange={(e) => {
                                this.setState({
                                  form: {
                                    ...this.state.form,
                                    quantity: Number(e.target.value),
                                  },
                                });
                              }}
                              name="quantity"
                            />
                          </div>

                          <div class="form-group">
                            <label for="product_name">
                              Sản phẩm được áp dụng
                            </label>

                            <button
                              type="button"
                              class="btn btn-primary-no-background btn-sm"
                              style={{ marginLeft: "10px" }}
                              data-toggle="modal"
                              data-target="#listProductModal"
                            >
                              <i class="fas fa-plus"></i>
                              <span class="text">&nbsp;Chọn sản phẩm</span>
                            </button>
                          </div>

                          <div class="form-group">
                            <label for="product_name">
                              Danh sách sản phẩm:
                            </label>

                            <div class="col-xs-9 col-sm-9 col-md-9 col-lg-9">
                              <div class="table-responsive">
                                <table class="table table-border table-hover">
                                  <thead>
                                    <tr>
                                      <th>STT</th>
                                      <th>Mã SKU</th>
                                      <th>Tên sản phẩm</th>
                                      <th>Hành động</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {this.showListProduct(
                                      this.state.saveListProduct
                                    )}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div class="box-footer">
                          <button type="submit" class="btn btn-info   btn-sm">
                            <i class="fas fa-plus"></i> Tạo
                          </button>
                          <button
                            style={{ marginLeft: "10px" }}
                            onClick={(e) => {
                              e.preventDefault();
                              this.props.history.goBack();
                            }}
                            class="btn btn-warning btn-sm"
                          >
                            <i class="fas fa-arrow-left"></i> Trở về
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
        <ListProductModal
          onSaveProduct={this.handleSaveListProduct}
          discounts={this.props.discounts}
          handleAddProduct={this.handleAddProduct}
          listProducts={this.state.listProduct}
          store_code={store_code}
          products={this.props.products}
          setListProducts={this.handleListProduct}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.authReducers.login.authentication,
    products: state.productReducers.product.allProduct,
    alert: state.discountReducers.alert.alert_uid,
    discounts: state.discountReducers.discount.allDiscount,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchAllProduct: (store_code) => {
      dispatch(productAction.fetchAllProduct(store_code));
    },
    fetchAllDiscount: (store_code) => {
      dispatch(discountAction.fetchAllDiscount(store_code));
    },
    fetchAllCategoryP: (store_code) => {
      dispatch(CategoryPAction.fetchAllCategoryP(store_code));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreatePrizeCode);
