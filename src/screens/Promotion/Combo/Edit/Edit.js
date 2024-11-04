import React, { Component } from "react";

import Form from "../../../../components/Promotion/Combo/Edit/Form";
import * as Types from "../../../../constants/ActionType";

import Alert from "../../../../components/Partials/Alert";

import { connect } from "react-redux";
import styled from "styled-components";
import * as comboAction from "../../../../actions/combo";
import * as productAction from "../../../../actions/product";
import * as CategoryPAction from "../../../../actions/category_product";
import Table from "../../../../components/Promotion/Combo/Edit/Table";
import Table2 from "../../../../components/Promotion/Combo/Edit/Table2";
import ModalListProduct from "../../../../components/Promotion/Combo/Create/ListProduct3";
import { getQueryParams } from "../../../../ultis/helpers";
import history from "../../../../history";

const data = {
  1: [
    { group: 1, product_name: "sản phẩm 1" },
    { group: 1, product_name: "sản phẩm 2" },
  ],
  2: [
    { group: 2, product_name: "sản phẩm 3" },
    { group: 2, product_name: "sản phẩm 4" },
  ],
};
const SectionStyles = styled.section`
  ul#myTab {
    &::-webkit-scrollbar {
      height: 5px;
    }
    .group__nav-link {
      display: flex;
      column-gap: 8px;
      align-items: center;
      svg {
        color: #919191;
        width: 16px;
        height: 16px;
      }
    }
  }
`;
class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabSelected: 0,
      productss: [],
      comboss: [],
      defaultListProducts: [],
      listProducts: [],
      allCombo: [],
      saveListProducts: [],
      groupId: null,
      // indexgroupRemove: null,
      // ladder_reward: false,
    };
  }

  componentDidMount() {
    var { store_code, comboId, combo } = this.props;
    this.props.fetchComboId(store_code, comboId);
    this.props.fetchAllProduct(store_code);
    this.props.fetchAllCombo(store_code);
    this.props.fetchAllCategoryP(store_code);
  }
  handleRefresh = () => {
    const { store_code, comboId } = this.props;
    this.props.fetchComboId(store_code, comboId);
    this.props.fetchAllProduct(store_code);
    this.props.fetchAllCombo(store_code);
    this.props.fetchAllCategoryP(store_code);
    this.setState({ saveListProducts: [] });
  };
  componentDidUpdate(prevProps) {
    if (prevProps.combos !== this.props.combos) {
      console.log("Tất cả sản combo", this.props.combos);
      this.setState({ allCombo: this.props.combos });
    }
    if (prevProps.combo !== this.props.combo) {
      // console.log(
      //   "this.props.combo.products_combo===",
      //   Object.keys(this.props.combo.products_combo)[0]
      // );
      this.setState({
        groupId: Object.keys(this.props.combo.products_combo)[0],
      });
      this.setState({
        productss: Object.values(this.props.combo.products_combo)[0],
      });
      this.setState({
        comboss: this.props.combo.products_combo,
        listProducts: Object.values(this.props.combo.products_combo)[0],
        saveListProducts: Object.values(this.props.combo.products_combo)[0],
      });
    }
  }

  handleSelectedGroup = (e, group, index) => {
    this.setState({ tabSelected: index });
    this.setState({ productss: this.props.combo.products_combo[group] });
    this.setState({ listProducts: this.props.combo.products_combo[group] });
    this.setState({ saveListProducts: this.props.combo.products_combo[group] });
    console.log("saveListProducts====", this.state.listProducts);
    this.setState({
      groupId: group,
    });
  };

  setListProducts = (listProducts) => {
    this.setState({ listProducts });
  };
  setDefaultListProducts = () => {
    this.setState({ defaultListProducts: this.state.listProducts });
  };
  onSaveProduct = () => {
    this.setState({ saveListProducts: [...this.state.listProducts] });
  };

  handleAddProduct = (product, id, type, onSave) => {
    var products = [...this.state.listProducts];
    // console.log("products=====", products);

    if (type == "remove") {
      if (products.length > 0) {
        products.forEach((item, index) => {
          if (item.product.id === id) {
            products.splice(index, 1);
          }
        });
      }
    } else {
      var checkExsit = true;
      products.forEach((item, index) => {
        if (item.product.id === product.id) {
          checkExsit = false;
          return;
        }
      });
      if (checkExsit == true) {
        var product = { quantity: 1, product: product };
        products.push(product);
      }
    }
    if (onSave == true)
      this.setState({ listProducts: products, saveListProducts: products });
    else this.setState({ listProducts: products });
  };
  handleRemoveBonusProductItem = (group) => {
    var { store_code, comboId, combo } = this.props;
    this.props.destroyComboGroup(store_code, comboId, group);
    setTimeout(() => {
      this.handleRefresh();
    }, 1500);
  };
  handleChangeQuantity = (id, quantity, setIncrement = null) => {
    var products = [...this.state.listProducts];
    products.forEach((product, index) => {
      if (product.product.id == id) {
        if (setIncrement == 1) products[index].quantity = product.quantity + 1;
        else if (setIncrement == -1) {
          if (product.quantity == 1) {
          } else products[index].quantity = product.quantity - 1;
        } else products[index].quantity = quantity;
      }
    });
    this.setState({ listProducts: products, saveListProducts: products });
  };

  goBack = (e) => {
    var { store_code } = this.props;

    e.preventDefault();
    var type = getQueryParams("type");
    var page = getQueryParams("page");
    var search = getQueryParams("search");
    if (type) {
      if (Number(type) === 1) {
        history.replace(
          `/combo/${store_code}?type=${type}${page ? `&page=${page}` : ""}`
        );
      } else {
        history.replace(
          `/combo/${store_code}?type=${type}${
            search ? `&search=${search}` : ""
          }`
        );
      }
    } else {
      history.goBack();
    }
  };

  updateDetailCombo = () => {
    var { store_code, comboId, combo } = this.props;
    var { groupId, saveListProducts } = this.state;

    const transformedData = saveListProducts.map((item) => ({
      quantity: item.quantity,

      id: item.product.id,
    }));
    const data = {
      products: transformedData,
    };

    this.props.updateDetailCombo(store_code, comboId, groupId, data);
  };

  addDetailCombo = () => {
    var { store_code, comboId, combo } = this.props;
    var { groupId, saveListProducts } = this.state;

    const transformedData = saveListProducts.map((item) => ({
      quantity: item.quantity,

      id: item.product.id,
    }));
    const data = {
      products: transformedData,
    };

    this.props.addDetailCombo(store_code, comboId, data);
    setTimeout(() => {
      this.handleRefresh();
    }, 2000);
  };

  handleCreateGroup = () => {
    // const { resetBonusProductItem } = this.props;
    this.setState({
      tabSelected: -1,
      groupId: -1,
      saveListProducts: [],
      listProducts: [],
    });

    // resetBonusProductItem();
  };

  render() {
    var { combo, products, history, combos } = this.props;
    var { store_code, comboId } = this.props;
    var {
      tabSelected,
      productss,
      comboss,
      listProducts,
      saveListProducts,
      groupId,
    } = this.state;
    return (
      <div class="container-fluid">
        <Alert type={Types.ALERT_UID_STATUS} alert={this.props.alert} />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h4 className="h4 title_content mb-0 text-gray-800">
            Chỉnh sửa chương trình
          </h4>
        </div>
        <br></br>
        <div class="card shadow mb-4">
          <div class="card-body">
            <section class="content">
              <div class="row">
                <div class="col-md-12 col-xs-12">
                  <div id="messages"></div>

                  <div class="box">
                    <Form
                      store_code={store_code}
                      history={history}
                      comboId={comboId}
                      products={products}
                      combo={combo}
                      combos={combos}
                    />
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
        <div class="card shadow mb-4">
          <div class="card-body">
            <SectionStyles class="content">
              <div
                style={{
                  marginBottom: "20px",
                }}
              >
                <ul
                  class="nav nav-tabs"
                  id="myTab"
                  role="tablist"
                  style={{
                    flexWrap: "nowrap",
                    display: "-webkit-box",
                    overflowY: "hidden",
                    paddingBottom: "10px",
                    borderBottom: "none",
                  }}
                >
                  {Object.keys(comboss).length > 0
                    ? Object.keys(comboss).map((group, index) => (
                        <li
                          class="nav-item"
                          key={group}
                          onClick={(e) =>
                            this.handleSelectedGroup(e, group, index)
                          }
                          style={{
                            borderBottom:
                              index === tabSelected
                                ? "1px solid transparent"
                                : "1px solid #dddfeb",
                          }}
                        >
                          <a
                            class={`group__nav-link nav-link ${
                              index === tabSelected ? "active" : ""
                            }`}
                            id={`${group}-tab`}
                            dataToggle="tab"
                            // href={`#${group}`}
                            role="tab"
                            ariaControls={group}
                            ariaSelected="true"
                            style={{
                              color: index === tabSelected ? "" : "#5e72e4",
                            }}
                          >
                            <span>Nhóm {index + 1}</span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              data-toggle="modal"
                              data-target="#removeBonusProductItemModal"
                              className="removeBonusProductItemModal"
                              onClick={() =>
                                this.handleRemoveBonusProductItem(group)
                              }
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                          </a>
                        </li>
                      ))
                    : null}
                  <li
                    class="nav-item"
                    onClick={() => this.handleCreateGroup()}
                    style={{
                      // borderBottom:
                      //   tabSelected === -1 ||
                      //   bonusProduct.group_products?.length === 0
                      //     ? "1px solid transparent"
                      //     : "1px solid #dddfeb",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <a
                      class={`nav-link ${tabSelected === -1 ? "active" : ""}`}
                      id={`create-tab`}
                      dataToggle="tab"
                      role="tab"
                      aria-controls="create"
                      aria-selected="true"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        color: tabSelected === -1 ? "" : "#5e72e4",
                      }}
                    >
                      <span>Thêm nhóm</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        style={{
                          width: "18px",
                          height: "18px",
                          paddingLeft: "4px",
                        }}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 6v12m6-6H6"
                        />
                      </svg>
                    </a>
                  </li>
                </ul>
              </div>
              <div class="row">
                <div class="col-md-12 col-xs-12">
                  <div id="messages"></div>
                  <div class="box">
                    <Table2
                      handleChangeQuantity={this.handleChangeQuantity}
                      // handleAddProduct={this.handleAddProduct}
                      products={saveListProducts}
                      setDefaultListProducts={this.setDefaultListProducts}
                    ></Table2>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                  {groupId == -1 ? (
                    <div class="box-footer">
                      <button
                        onClick={this.addDetailCombo}
                        class="btn btn-info   btn-sm"
                      >
                        <i class="fas fa-save"></i> Thêm nhóm
                      </button>
                    </div>
                  ) : (
                    <div class="box-footer">
                      <button
                        onClick={this.updateDetailCombo}
                        class="btn btn-info   btn-sm"
                      >
                        <i class="fas fa-save"></i> Lưu nhóm
                      </button>

                      <button
                        type="button"
                        style={{ marginLeft: "10px" }}
                        onClick={this.goBack}
                        class="btn btn-warning   btn-sm"
                      >
                        <i class="fas fa-arrow-left"></i> Trở về
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </SectionStyles>
          </div>
        </div>
        <ModalListProduct
          onSaveProduct={this.onSaveProduct}
          discount={combo}
          discounts={combos}
          handleAddProduct={this.handleAddProduct}
          listProducts={saveListProducts}
          store_code={store_code}
          products={products}
          setListProducts={this.setListProducts}
          discountId={comboId}
          defaultListProducts={this.state.defaultListProducts}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.authReducers.login.authentication,
    combo: state.comboReducers.combo.comboId,
    products: state.productReducers.product.allProduct,
    combos: state.comboReducers.combo.allCombo,
    alert: state.comboReducers.alert.alert_uid,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchComboId: (store_code, comboId) => {
      dispatch(comboAction.fetchComboId(store_code, comboId));
    },
    updateDetailCombo: (store_code, combo_id, group, data) => {
      dispatch(
        comboAction.updateDetailCombo(store_code, combo_id, group, data)
      );
    },
    addDetailCombo: (store_code, combo_id, data) => {
      dispatch(comboAction.addDetailCombo(store_code, combo_id, data));
    },
    fetchAllProduct: (store_code) => {
      dispatch(productAction.fetchAllProduct(store_code));
    },
    fetchAllCombo: (store_code) => {
      dispatch(comboAction.fetchAllCombo(store_code));
    },
    fetchAllCategoryP: (store_code) => {
      dispatch(CategoryPAction.fetchAllCategoryP(store_code));
    },
    destroyComboGroup: (store_code, combo_id, group) => {
      dispatch(comboAction.destroyComboGroup(store_code, combo_id, group));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Edit);
