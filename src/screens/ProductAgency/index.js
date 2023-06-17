import React, { Component } from "react";
import Sidebar from "../../components/Partials/Sidebar";
import Topbar from "../../components/Partials/Topbar";
import Footer from "../../components/Partials/Footer";
import { Redirect } from "react-router-dom";
import Table from "../../components/ProductAgency/Table";
import * as Types from "../../constants/ActionType";
import Alert from "../../components/Partials/Alert";
import Pagination from "../../components/ProductAgency/Pagination";
import NotAccess from "../../components/Partials/NotAccess";
import { connect, shallowEqual } from "react-redux";
import Loading from "../Loading";
import * as productAction from "../../actions/product";
import * as CategoryPAction from "../../actions/category_product";
import * as agencyAction from "../../actions/agency";
import { getQueryParams } from "../../ultis/helpers";

import history from "../../history";
import ModalUpdatePercentDiscount from "./ModalUpdatePercentDiscount";
import ModalUpdatePercentDiscountAll from "./ModalUpdatePercentDiscountAll";
import ModalUpdateCommission from "./ModalUpdateCommission";
import ModalUpdateCommissionAll from "./ModalUpdateCommissionAll";
import { getBranchId, getBranchIds } from "../../ultis/branchUtils";

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: {
        title: "",
        id: "",
        store_code: "",
        name: "",
      },
      multi: {
        title: "",
        data: [],
        store_code: "",
      },
      importData: [],
      allow_skip_same_name: false,
      searchValue: new URL(document.location).searchParams.get("search") || "",
      page: new URL(document.location).searchParams.get("page") || 1,
      numPage: new URL(document.location).searchParams.get("limit") || 20,
      categorySelected: getQueryParams("category_ids")?.split(",") || [],
      categoryChildSelected:
        getQueryParams("category_children_ids")?.split(",") || [],
      arrayCheckBox: [],
    };
  }

  onChangeNumPage = (e) => {
    var { store_code, agency_type_id } = this.props.match.params;
    var { searchValue, categorySelected, categoryChildSelected } = this.state;
    var numPage = e.target.value;
    this.setState({
      numPage,
      page: 1,
    });
    var params = this.getParams(
      searchValue,
      numPage,
      categorySelected,
      categoryChildSelected
    );
    history.push(
      `/product-agency/index/${store_code}/${agency_type_id}?page=1${params}`
    );
    this.props.fetchAllProduct(store_code, 1, params, agency_type_id);
  };
  onChangeSearch = (e) => {
    this.setState({ searchValue: e.target.value });
  };
  shouldComponentUpdate(nextProps, nextState) {
    var { store_code, agency_type_id } = this.props.match.params;
    var { searchValue, numPage, categorySelected, categoryChildSelected } =
      this.state;
    const {
      updatedPercentDiscountSuccessfully,
      updatedCommissionSuccessfully,
      resetPercentDiscountSuccessfully,
      resetCommissionSuccessfully,
    } = this.props;
    if (this.state.page != nextState.page || numPage != nextState.numPage) {
      var params = this.getParams(
        searchValue,
        nextState.numPage,
        categorySelected,
        categoryChildSelected
      );
      this.props.fetchAllProduct(
        store_code,
        nextState.page,
        params,
        agency_type_id
      );
    }
    if (
      !shallowEqual(
        updatedPercentDiscountSuccessfully,
        nextProps.updatedPercentDiscountSuccessfully
      ) &&
      nextProps.updatedPercentDiscountSuccessfully
    ) {
      window.$(".modal").modal("hide");
      resetPercentDiscountSuccessfully();
      const paramsPercentDiscount = this.getParams(
        searchValue,
        numPage,
        categorySelected,
        categoryChildSelected
      );
      this.props.fetchAllProduct(
        store_code,
        nextState.page,
        paramsPercentDiscount,
        agency_type_id
      );
      this.setArrayCheckBox([]);
    }
    if (
      !shallowEqual(
        updatedCommissionSuccessfully,
        nextProps.updatedCommissionSuccessfully
      ) &&
      nextProps.updatedCommissionSuccessfully
    ) {
      window.$(".modal").modal("hide");
      resetCommissionSuccessfully();
      const paramsCommission = this.getParams(
        searchValue,
        numPage,
        categorySelected,
        categoryChildSelected
      );
      this.props.fetchAllProduct(
        store_code,
        nextState.page,
        paramsCommission,
        agency_type_id
      );
      this.setArrayCheckBox([]);
    }
    if (
      !shallowEqual(this.props.category_product, nextProps.category_product)
    ) {
      var option = [];
      var categories = [...nextProps.category_product];
      if (categories.length > 0) {
        option = categories.map((category, index) => {
          return {
            id: category.id,
            label: category.name,
            categories_child: category.category_children?.map(
              (categoryChild) => ({
                id: categoryChild.id,
                label: categoryChild.name,
              })
            ),
          };
        });
        const categoryIds = getQueryParams("category_ids")?.split(",") || [];
        const categoryChildIds =
          getQueryParams("category_children_ids")?.split(",") || [];
        var categorySelected = [];
        if (categoryIds?.length > 0) {
          categorySelected = option.filter((item) =>
            categoryIds.includes(item?.id?.toString())
          );
          this.setState({
            categorySelected: categorySelected,
          });
        }
        const newCategoryChildSelected = [];
        if (categoryChildIds?.length > 0) {
          option.forEach((category) => {
            if (category.categories_child?.length > 0) {
              category.categories_child.forEach((item) => {
                if (categoryChildIds.includes(item?.id?.toString())) {
                  newCategoryChildSelected.push(item);
                }
              });
            }
          });
          this.setState({
            categoryChildSelected: newCategoryChildSelected,
          });
        }

        this.setState({
          listCategory: option,
        });

        const { store_code } = this.props.match.params;

        var is_near_out_of_stock = getQueryParams("is_near_out_of_stock");
        var paramsFilter = this.getParams(
          this.state.searchValue,
          this.state.numPage,
          categorySelected,
          newCategoryChildSelected
        );
        if (is_near_out_of_stock) {
          paramsFilter = paramsFilter + `&is_near_out_of_stock=true`;
        }

        this.props.fetchAllProduct(
          store_code,
          this.state.page,
          paramsFilter,
          agency_type_id
        );
      }
    }

    return true;
  }
  setArrayCheckBox = (arrayCheckBox) => {
    this.setState({
      arrayCheckBox,
    });
  };
  componentDidMount() {
    var { store_code, agency_type_id } = this.props.match.params;
    var { searchValue, numPage } = this.state;
    var page = getQueryParams("page");
    var params = `&limit=${numPage}&search=${searchValue}`;
    this.props.fetchAllCategoryP(store_code);
    if (
      typeof page != "undefined" &&
      page != null &&
      page != "" &&
      !isNaN(Number(page))
    ) {
      this.props.fetchAllProduct(store_code, page, params, agency_type_id);
    } else {
      this.props.fetchAllProduct(store_code, null, params, agency_type_id);
    }
  }

  componentDidUpdate() {
    if (
      this.state.isLoading != true &&
      typeof this.props.permission.product_list != "undefined"
    ) {
      var permissions = this.props.permission;
      var insert = true;
      var update = true;
      var _delete = true;
      var _import = true;
      var _export = true;
      var ecommerce = true;

      var isShow = true;

      this.setState({
        isLoading: true,
        insert,
        update,
        _delete,
        _import,
        _export,
        isShow,
        ecommerce,
      });
    }
  }

  searchData = (e) => {
    e.preventDefault();
    var { store_code, agency_type_id } = this.props.match.params;
    var { searchValue, numPage, categorySelected, categoryChildSelected } =
      this.state;
    var params = this.getParams(
      searchValue,
      numPage,
      categorySelected,
      categoryChildSelected
    );
    history.push(
      `/product-agency/index/${store_code}/${agency_type_id}?page=1${params}`
    );
    this.props.fetchAllProduct(store_code, 1, params, agency_type_id);
  };
  fetchAllData = () => {
    var { store_code, agency_type_id } = this.props.match.params;
    this.props.fetchAllProduct(
      this.props.match.params.store_code,
      1,
      agency_type_id
    );
  };

  fetchAllListProduct = () => {
    var { store_code } = this.props.match.params;
    this.props.fetchAllListProduct(store_code, this.state.searchValue);
  };

  passNumPage = (page) => {
    this.setState({ page: page });
  };

  getNameType = () => {
    var types = this.props.types;
    var { agency_type_id } = this.props.match.params;
    for (const item of types) {
      if (item.id == agency_type_id) {
        return item.name;
      }
    }
    return "";
  };
  goBack = () => {
    var { store_code } = this.props.match.params;

    history.replace(`/agency/${store_code}?tab-index=0`);
  };

  getNameSelected() {
    const { categorySelected, categoryChildSelected } = this.state;
    var name = "";
    if (categorySelected.length > 0 || categoryChildSelected.length > 0) {
      const newCategoryCombine = [
        ...categorySelected,
        ...categoryChildSelected,
      ];
      name += newCategoryCombine.reduce(
        (prevCategory, currentCategory, index) => {
          return (
            prevCategory +
            `${
              index === newCategoryCombine.length - 1
                ? currentCategory?.label
                : `${currentCategory?.label}, `
            }`
          );
        },
        ""
      );
    }

    return name;
  }
  handleCheckedCategory = (idCategory) => {
    const { categorySelected } = this.state;
    if (categorySelected?.length > 0) {
      const checked = categorySelected
        .map((category) => category?.id)
        .includes(idCategory);
      return checked;
    }
    return false;
  };

  handleChangeCategory = (category) => {
    const { categorySelected, numPage, categoryChildSelected } = this.state;
    const { store_code, agency_type_id } = this.props.match.params;
    var newCategorySelected = [];
    const isExisted = categorySelected.map((c) => c?.id).includes(category?.id);
    if (isExisted) {
      newCategorySelected = categorySelected.filter(
        (c) => c?.id !== category.id
      );
    } else {
      newCategorySelected = [...categorySelected, category];
    }

    this.setState({
      categorySelected: newCategorySelected,
      page: 1,
      searchValue: "",
    });
    const params = this.getParams(
      "",
      numPage,
      newCategorySelected,
      categoryChildSelected
    );
    history.push(
      `/product-agency/index/${store_code}/${agency_type_id}?page=1${params}`
    );
    this.props.fetchAllProduct(store_code, 1, params, agency_type_id);
  };

  handleCheckedCategoryChild = (idCategory) => {
    const { categoryChildSelected } = this.state;
    if (categoryChildSelected?.length > 0) {
      const checked = categoryChildSelected
        .map((category) => category?.id)
        .includes(idCategory);
      return checked;
    }
    return false;
  };

  handleChangeCategoryChild = (category) => {
    const { categoryChildSelected, numPage, categorySelected } = this.state;
    const { store_code, agency_type_id } = this.props.match.params;
    var newCategoryChildSelected = [];
    const isExisted = categoryChildSelected
      .map((c) => c?.id)
      .includes(category?.id);
    if (isExisted) {
      newCategoryChildSelected = categoryChildSelected.filter(
        (c) => c?.id !== category.id
      );
    } else {
      newCategoryChildSelected = [...categoryChildSelected, category];
    }

    this.setState({
      categoryChildSelected: newCategoryChildSelected,
      page: 1,
      searchValue: "",
    });
    const params = this.getParams(
      "",
      numPage,
      categorySelected,
      newCategoryChildSelected
    );
    history.push(
      `/product-agency/index/${store_code}/${agency_type_id}?page=1${params}`
    );
    this.props.fetchAllProduct(store_code, 1, params, agency_type_id);
  };
  getParams = (search, limit, categories, categories_child) => {
    var params = ``;
    if (search != "" && search != null) {
      params = params + `&search=${search}`;
    }
    if (limit != "" && limit != null) {
      params = params + `&limit=${limit}`;
    }
    if (categories !== "" && categories !== null && categories?.length > 0) {
      const newCategorySelected = categories.reduce(
        (prevCategory, currentCategory, index) => {
          return (
            prevCategory +
            `${
              index === categories.length - 1
                ? currentCategory?.id
                : `${currentCategory?.id},`
            }`
          );
        },
        "&category_ids="
      );

      params += newCategorySelected;
    }
    if (
      categories_child !== "" &&
      categories_child !== null &&
      categories_child?.length > 0
    ) {
      const newCategoryChildSelected = categories_child.reduce(
        (prevCategory, currentCategory, index) => {
          return (
            prevCategory +
            `${
              index === categories_child.length - 1
                ? currentCategory?.id
                : `${currentCategory?.id},`
            }`
          );
        },
        "&category_children_ids="
      );

      params += newCategoryChildSelected;
    }

    return params;
  };

  render() {
    if (this.props.auth) {
      var { products } = this.props;
      var { store_code, agency_type_id } = this.props.match.params;
      var { searchValue, page, numPage, arrayCheckBox } = this.state;
      var {
        insert,
        update,
        _delete,
        isShow,
        listCategory,
        categorySelected,
        categoryChildSelected,
      } = this.state;

      return (
        <div id="wrapper">
          <Sidebar store_code={store_code} />
          <div className="col-10 col-10-wrapper">
            <div id="content-wrapper" className="d-flex flex-column">
              <div id="content">
                <Topbar store_code={store_code} />
                {typeof isShow == "undefined" ? (
                  <div style={{ height: "500px" }}></div>
                ) : isShow == true ? (
                  <div class="container-fluid">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <h4 className="h4 title_content mb-0 text-gray-800">
                        Sản phẩm - Đại lý {this.getNameType()}
                      </h4>
                      <button
                        style={{ marginRight: "10px" }}
                        type="button"
                        onClick={this.goBack}
                        class="btn btn-warning  btn-sm"
                      >
                        <i class="fas fa-arrow-left"></i>&nbsp;Trở về
                      </button>
                    </div>
                    <br></br>
                    <Alert
                      type={Types.ALERT_UID_STATUS}
                      alert={this.props.alert}
                    />

                    <div class="card shadow ">
                      <div className="card-header">
                        <div class="flex" style={{ flexDirection: "column" }}>
                          <div>
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                columnGap: "20px",
                              }}
                            >
                              <form onSubmit={this.searchData}>
                                <div
                                  class="input-group mb-6"
                                  style={{ padding: "0 20px" }}
                                >
                                  <input
                                    style={{
                                      maxWidth: "400px",
                                      minWidth: "300px",
                                    }}
                                    type="search"
                                    name="txtSearch"
                                    value={searchValue}
                                    onChange={this.onChangeSearch}
                                    class="form-control"
                                    placeholder="Tìm kiếm sản phẩm..."
                                  />
                                  <div class="input-group-append">
                                    <button
                                      class="btn btn-primary"
                                      type="submit"
                                    >
                                      <i class="fa fa-search"></i>
                                    </button>
                                  </div>
                                </div>
                              </form>
                              <div className="categories__content">
                                <div
                                  id="accordion"
                                  style={{
                                    width: "300px",
                                    position: "relative",
                                  }}
                                >
                                  <div
                                    className="wrap_category input-group"
                                    style={{ display: "flex" }}
                                    data-toggle="collapse"
                                    data-target="#collapseCategory"
                                    aria-expanded="false"
                                    aria-controls="collapseCategory"
                                  >
                                    <input
                                      readOnly
                                      type="text"
                                      class="form-control"
                                      placeholder="--Chọn danh mục--"
                                      style={{
                                        whiteSpace: "nowrap",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        paddingRight: "55px",
                                        position: "relative",
                                        backgroundColor: "transparent",
                                      }}
                                      value={this.getNameSelected()}
                                    ></input>
                                    <button
                                      class="btn  btn-accordion-collapse collapsed input-group-text"
                                      id="headingOne"
                                      style={{
                                        borderTopLeftRadius: "0",
                                        borderBottomLeftRadius: "0",
                                      }}
                                    >
                                      <i
                                        className={
                                          this.state.icon
                                            ? "fa fa-caret-down"
                                            : "fa fa-caret-down"
                                        }
                                      ></i>
                                    </button>
                                  </div>
                                  <div
                                    id="collapseCategory"
                                    className="collapse"
                                    ariaLabelledby="headingOne"
                                    dataParent="#accordion"
                                    style={{
                                      position: "absolute",
                                      width: "100%",
                                      left: "0",
                                      top: "100%",
                                      zIndex: "10",
                                      background: "#fff",
                                      boxShadow: "1px 2px 6px rgba(0,0,0,0.1)",
                                    }}
                                  >
                                    <ul
                                      style={{
                                        listStyle: "none",
                                        margin: "5px 0",
                                        height: "235px",
                                        overflowY: "auto",
                                      }}
                                      class="list-group"
                                    >
                                      {listCategory?.length > 0 ? (
                                        listCategory.map((category, index) => (
                                          <li class="">
                                            <div
                                              style={{
                                                cursor: "pointer",
                                                paddingTop: "5px",
                                                paddingLeft: "5px",
                                                display: "flex",
                                                alignItems: "center",
                                              }}
                                            >
                                              <input
                                                type="checkbox"
                                                id={category.label}
                                                style={{
                                                  marginRight: "10px",
                                                  width: "30px",
                                                  height: "15px",
                                                  flexShrink: "0",
                                                }}
                                                checked={this.handleCheckedCategory(
                                                  category.id
                                                )}
                                                onChange={() =>
                                                  this.handleChangeCategory(
                                                    category
                                                  )
                                                }
                                              />
                                              <label
                                                htmlFor={category.label}
                                                style={{
                                                  whiteSpace: "nowrap",
                                                  overflow: "hidden",
                                                  textOverflow: "ellipsis",
                                                  marginBottom: "0",
                                                }}
                                                title={category.label}
                                              >
                                                {category.label}
                                              </label>
                                            </div>
                                            {category.categories_child?.length >
                                              0 && (
                                              <ul
                                                className="list-group-child"
                                                style={{
                                                  marginLeft: "20px",
                                                }}
                                              >
                                                {category.categories_child.map(
                                                  (categoryChild) => (
                                                    <div
                                                      style={{
                                                        cursor: "pointer",
                                                        paddingTop: "5px",
                                                        paddingLeft: "5px",
                                                        display: "flex",
                                                        alignItems: "center",
                                                      }}
                                                    >
                                                      <input
                                                        type="checkbox"
                                                        id={categoryChild.label}
                                                        style={{
                                                          marginRight: "10px",
                                                          width: "30px",
                                                          height: "15px",
                                                          flexShrink: "0",
                                                        }}
                                                        checked={this.handleCheckedCategoryChild(
                                                          categoryChild.id
                                                        )}
                                                        onChange={() =>
                                                          this.handleChangeCategoryChild(
                                                            categoryChild
                                                          )
                                                        }
                                                      />
                                                      <label
                                                        htmlFor={
                                                          categoryChild.label
                                                        }
                                                        style={{
                                                          whiteSpace: "nowrap",
                                                          overflow: "hidden",
                                                          textOverflow:
                                                            "ellipsis",
                                                          marginBottom: "0",
                                                        }}
                                                        title={
                                                          categoryChild.label
                                                        }
                                                      >
                                                        {categoryChild.label}
                                                      </label>
                                                    </div>
                                                  )
                                                )}
                                              </ul>
                                            )}
                                          </li>
                                        ))
                                      ) : (
                                        <div
                                          style={{
                                            marginTop: "20px",
                                            textAlign: "center",
                                          }}
                                        >
                                          Không có kết quả !
                                        </div>
                                      )}
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <p class="total-item" id="sale_user_name">
                              <span className="num-total_item">
                                {products.total}&nbsp;
                              </span>
                              <span className="text-total_item" id="user_name">
                                sản phẩm
                              </span>
                            </p>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              marginLeft: "20px",
                              marginTop: "10px",
                              columnGap: "20px",
                            }}
                          >
                            {arrayCheckBox.length > 0 && (
                              <>
                                <div
                                  className="btn btn-success"
                                  data-toggle="modal"
                                  data-target="#updateCommission"
                                >
                                  Sửa hoa hồng được chọn
                                </div>
                                <div
                                  className="btn btn-primary"
                                  data-toggle="modal"
                                  data-target="#updatePercentDiscount"
                                >
                                  Sửa chiết khấu được chọn
                                </div>
                              </>
                            )}
                            <div
                              className="btn btn-success"
                              data-toggle="modal"
                              data-target="#updateCommissionAll"
                            >
                              Sửa hoa hồng cho tất cả
                            </div>
                            <div
                              className="btn btn-primary"
                              data-toggle="modal"
                              data-target="#updatePercentDiscountAll"
                            >
                              Sửa chiết khấu cho tất cả
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="card-body">
                        <Table
                          agency_type_id={agency_type_id}
                          insert={insert}
                          _delete={_delete}
                          update={update}
                          page={page}
                          numPage={numPage}
                          searchValue={searchValue}
                          handleDelCallBack={this.handleDelCallBack}
                          handleMultiDelCallBack={this.handleMultiDelCallBack}
                          store_code={store_code}
                          products={products}
                          setArrayCheckBox={this.setArrayCheckBox}
                          arrayCheckBox={arrayCheckBox}
                        />
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "flex-end",
                          }}
                        >
                          <div style={{ display: "flex" }}>
                            <span
                              style={{
                                margin: "20px 10px auto auto",
                              }}
                            >
                              Hiển thị
                            </span>
                            <select
                              style={{
                                margin: "auto",
                                marginTop: "10px",
                                marginRight: "20px",
                                width: "70px",
                              }}
                              onChange={this.onChangeNumPage}
                              value={numPage}
                              name="numPage"
                              class="form-control"
                            >
                              <option value="10">10</option>
                              <option value="20" selected>
                                20
                              </option>
                              <option value="50">50</option>
                            </select>
                          </div>
                          <Pagination
                            limit={numPage}
                            searchValue={searchValue}
                            categorySelected={categorySelected}
                            categoryChildSelected={categoryChildSelected}
                            getParams={this.getParams}
                            passNumPage={this.passNumPage}
                            store_code={store_code}
                            products={products}
                            agency_type_id={agency_type_id}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <NotAccess />
                )}
              </div>

              <Footer />

              <ModalUpdateCommission
                store_code={store_code}
                agency_type_id={agency_type_id}
                arrayCheckBox={arrayCheckBox}
              />
              <ModalUpdateCommissionAll
                store_code={store_code}
                agency_type_id={agency_type_id}
              />
              <ModalUpdatePercentDiscount
                store_code={store_code}
                agency_type_id={agency_type_id}
                arrayCheckBox={arrayCheckBox}
              />
              <ModalUpdatePercentDiscountAll
                store_code={store_code}
                agency_type_id={agency_type_id}
              />
            </div>
          </div>
        </div>
      );
    } else if (this.props.auth === false) {
      return <Redirect to="/login" />;
    } else {
      return <Loading />;
    }
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.authReducers.login.authentication,
    products: state.productReducers.product.allProduct,
    alert: state.productReducers.alert.alert_success,
    allProductList: state.productReducers.product.allProductList,
    permission: state.authReducers.permission.data,
    types: state.agencyReducers.agency.allAgencyType,
    updatedPercentDiscountSuccessfully:
      state.agencyReducers.agency.updatedPercentDiscountSuccessfully,
    updatedCommissionSuccessfully:
      state.agencyReducers.agency.updatedCommissionSuccessfully,
    category_product: state.categoryPReducers.category_product.allCategoryP,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchAllProduct: (store_code, page, params, agency_type_id) => {
      dispatch(
        productAction.fetchAllProduct(store_code, page, params, agency_type_id)
      );
    },
    fetchAllListProduct: (store_code, searchValue) => {
      dispatch(productAction.fetchAllListProduct(store_code, searchValue));
    },
    fetchAllCategoryP: (store_code) => {
      dispatch(CategoryPAction.fetchAllCategoryP(store_code));
    },
    fetchAllAgencyType: (store_code) => {
      dispatch(agencyAction.fetchAllAgencyType(store_code));
    },
    resetPercentDiscountSuccessfully: () => {
      dispatch({
        type: Types.UPDATE_PERCENT_DISCOUNT_AGENCY,
        data: false,
      });
    },
    resetCommissionSuccessfully: () => {
      dispatch({
        type: Types.UPDATE_COMMISSION_AGENCY,
        data: false,
      });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Product);
