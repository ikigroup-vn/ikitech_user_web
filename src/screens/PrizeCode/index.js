import { Component } from "react";
import Sidebar from "../../components/Partials/Sidebar";
import Topbar from "../../components/Partials/Topbar";
import Table from "../../components/PrizeCode/Table";
import Pagination from "../../components/PrizeCode/Pagination";
import CreateModal from "../../components/PrizeCode/CreateModal";
import { Link } from "react-router-dom";
import * as prizeCodeApi from "../../data/remote/prize_code";
import SidebarFilterPrizeCode from "../../components/PrizeCode/SidebarFilterPrizeCode";
import * as placeAction from "../../actions/place";
import * as productAction from "../../actions/product";
import { connect } from "react-redux";
import ListProductPrizeModal from "../../components/PrizeCode/ListProductPrizeModal";
import * as discountAction from "../../actions/discount";
import * as CategoryPAction from "../../actions/category_product";
import { getQueryParams } from "../../ultis/helpers";
import QRCode from "qrcode";
import * as Types from "../../constants/ActionType";
import Loading from "../Loading";
import ModalMultipleDelete from "../../components/PrizeCode/ModalMultipleDelete";
import ListProductPrizeMultiModal from "../../components/PrizeCode/ListProductPrizeMultiModal";
import BackgroundModal from "../../components/PrizeCode/BackgroundModal";

class PrizeCode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShow: true,
      prizeCodes: [],
      links: [],
      perPage: 20,
      currentPage: 1,
      total: null,
      showFilter: false,
      searchValue: "",
      listProductPrize: [],
      saveListProductPrize: [],
      rowItem: {},
      isLoading: false,
      numPage: getQueryParams("limit") || 20,
      multi: {
        title: "",
        data: [],
        store_code: "",
      },
      selected: [],
      productId: null,
    };
  }

  componentDidMount() {
    const { store_code } = this.props.match.params;
    const product_id = getQueryParams("product_id");
    let params;
    if (product_id) {
      this.props.fetchProductId(store_code, product_id);
      params = `?product_id=${product_id}`;
      this.setState({ productId: product_id });
    }

    this.props.fetchPlaceProvince();
    this.props.fetchAllProduct(store_code);
    this.props.fetchAllDiscount(store_code);
    this.props.fetchAllCategoryP(store_code);
    this.props.showLoading();
    prizeCodeApi
      .fetchAllPrizeCode(store_code, params)
      .then((res) => {
        const data = res.data.data.data;
        const links = res.data.data.links;
        const currentPage = res.data.data.current_page;
        const perPage = res.data.data.per_page;
        const total = res.data.data.total;
        this.setState({
          prizeCodes: data,
          links: links,
          currentPage,
          perPage,
          total,
        });
      })
      .catch(() => {
        this.props.showError("Đã có lỗi xảy ra");
      })
      .finally(() => {
        this.props.hideLoading();
      });
  }

  handleSetSelected = (ids) => {
    this.setState({ selected: ids });
  };

  removeItemPrize = (id) => {
    this.handleAddProductPrize(null, id, "remove", true);
  };

  handleListProductPrize = (products) => {
    this.setState({
      listProductPrize: products,
    });
  };

  handleSaveListProductPrize = () => {
    this.setState({
      saveListProductPrize: [...this.state.listProductPrize],
      form: {
        ...this.state.form,
        prize_product_id: this.state.listProductPrize[0].id,
      },
    });
  };

  handleAddProductPrize = (product, id, type, onSave = null) => {
    var products = [...this.state.listProductPrize];

    // if (type == "remove") {
    //   if (products.length > 0) {
    //     products.forEach((item, index) => {
    //       if (item.id === id) {
    //         products.splice(index, 1);
    //       }
    //     });
    //   }
    // } else {
    //   var checkExsit = true;
    //   products.forEach((item, index) => {
    //     if (item.id === product.id) {
    //       checkExsit = false;
    //       return;
    //     }
    //   });
    //   if (checkExsit == true) {
    //     products.push(product);
    //   }
    // }
    products = [product];
    if (onSave == true)
      this.setState({
        listProductPrize: products,
        saveListProductPrize: products,
        form: {
          ...this.state.form,
          prize_product_id: products[0].id,
        },
      });
    else this.setState({ listProductPrize: products });
  };

  showListProductPrize = (products) => {
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
                  document.querySelector("#inputCheckAll").checked = false;
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

  handleSeach = (e) => {
    e.preventDefault();
    const { store_code } = this.props.match.params;
    const product_id = getQueryParams("product_id");
    const params = `?search=${this.state.searchValue}&product_id=${
      product_id ?? ""
    }&page=1&limit=${this.state.numPage}`;
    this.props.showLoading();

    prizeCodeApi
      .fetchAllPrizeCode(store_code, params)
      .then((res) => {
        const data = res.data.data.data;
        const links = res.data.data.links;
        const currentPage = res.data.data.current_page;
        const perPage = res.data.data.per_page;
        const total = res.data.data.total;
        this.setState({
          prizeCodes: data,
          links: links,
          currentPage,
          perPage,
          total,
        });
      })
      .catch(() => {})
      .finally(() => {
        this.props.hideLoading();
      });
  };

  onChangeNumPage = (e) => {
    var { store_code } = this.props.match.params;
    var { searchValue, currentPage } = this.state;
    var numPage = e.target.value;
    this.setState({
      numPage,
      currentPage: 1,
    });

    this.props.showLoading();
    const params = `?page=${currentPage}&search=${searchValue}&limit=${numPage}`;
    prizeCodeApi
      .fetchAllPrizeCode(store_code, params)
      .then((res) => {
        const data = res.data.data.data;
        const links = res.data.data.links;
        const currentPage = res.data.data.current_page;
        const perPage = res.data.data.per_page;
        this.setState({ prizeCodes: data, links: links, currentPage, perPage });
      })
      .catch(() => {})
      .finally(() => {
        this.props.hideLoading();
      });
  };

  handleSetPrizeCodes = (prizeCodes) => {
    this.setState({ prizeCodes });
  };

  handleSetLinks = (links) => {
    this.setState({ links });
  };

  handleSetCurrentPage = (page) => {
    this.setState({ currentPage: page });
  };

  handleSetTotal = (total) => {
    this.setState({ total });
  };

  handleMultiDelCallBack = (multi) => {
    this.setState({ multi: multi });
  };

  handleExportExcel = () => {
    const optionsFilter = JSON.parse(
      localStorage.getItem("optionsFilterPrizeCode")
    )
      ? JSON.parse(localStorage.getItem("optionsFilterPrizeCode"))
      : [];

    const newOptionFilter = [];
    optionsFilter.forEach((option) => {
      newOptionFilter.push({
        type_compare: option.type_compare,
        comparison_expression: option.comparison_expression,
        value_compare: option.value_compare.toString().replace(/\./g, ""),
      });
    });
    const params = `?search=${
      this.state.searchValue
    }&limit=10000000&json_list_filter=${encodeURIComponent(
      JSON.stringify(newOptionFilter)
    )}`;
    const { store_code } = this.props.match.params;
    this.props.exportAllPrizeCodes(store_code, params);
  };

  handleGetRowItem = (data) => {
    this.setState({ rowItem: data });
  };

  handleExportQr = () => {
    const qrUrl = `${process.env.PUBLIC_URL}/images/qrcode-hqgano.jpg`;

    const link = document.createElement("a");
    link.href = qrUrl;
    link.download = "qrcode.jpg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  render() {
    const { store_code } = this.props.match.params;
    const { isShow } = this.state;
    const { product } = this.props;
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
                      <h4 className="m-0 title_content font-weight-bold text-primary">
                        Danh sách mã dự thưởng
                      </h4>

                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "16px",
                        }}
                      >
                        <button
                          style={{
                            border: "0px",
                            color: "white",
                            background: "cadetblue",
                            margin: "auto 0px",
                          }}
                          class="btn btn-secondary btn-sm btn-icon-split"
                          data-toggle="modal"
                          data-target="#backgroundModal"
                        >
                          <span class="icon text-white-50">
                            <i class="fas fa-edit"></i>
                          </span>
                          <span style={{ color: "white" }} class="text">
                            Cập nhật backgroud
                          </span>
                        </button>
                        <button
                          style={{ margin: "auto 0px" }}
                          class={`btn btn-primary btn-icon-split btn-sm `}
                          onClick={this.handleExportQr}
                        >
                          <span class="icon text-white-50">
                            <i class="fas fa-download"></i>
                          </span>
                          <span style={{ color: "white" }} class="text">
                            Tải xuống mã QR
                          </span>
                        </button>
                        <button
                          style={{ margin: "auto 0px" }}
                          class={`btn btn-success btn-icon-split btn-sm `}
                          onClick={this.handleExportExcel}
                        >
                          <span class="icon text-white-50">
                            <i class="fas fa-file-export"></i>
                          </span>
                          <span style={{ color: "white" }} class="text">
                            Export Excel
                          </span>
                        </button>
                        <Link
                          class={`btn btn-info btn-icon-split show btn-sm`}
                          to={`/prize_codes/create/${store_code}`}
                        >
                          <span class="icon text-white-50">
                            <i class="fas fa-plus"></i>
                          </span>
                          <span class="text">Thêm Mã</span>
                        </Link>
                      </div>
                    </div>
                    {/* {this.state.productId &&
                      product &&
                      Object.keys(product).length > 0 && (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "16px",
                            justifyContent: "space-between",
                            marginBottom: "16px",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "16px",
                            }}
                          >
                            <img
                              src={product.images?.[0]?.image_url}
                              width={50}
                              height={50}
                            />
                            <h6>{product.name}</h6>
                          </div>
                          <div>
                            <button
                              style={{ margin: "auto 0px" }}
                              class={`btn btn-primary btn-icon-split btn-sm `}
                              onClick={this.handleExportQr}
                            >
                              <span class="icon text-white-50">
                                <i class="fas fa-file-export"></i>
                              </span>
                              <span style={{ color: "white" }} class="text">
                                Tải xuống mã QR
                              </span>
                            </button>
                          </div>
                        </div>
                      )} */}
                    <div
                      style={{
                        minHeight: "600px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          gap: "24px",
                        }}
                      >
                        <form onSubmit={this.handleSeach}>
                          <div class="input-group mb-6">
                            <input
                              style={{ maxWidth: "500px", minWidth: "200px" }}
                              type="search"
                              name="txtSearch"
                              value={this.state.searchValue}
                              onChange={(e) => {
                                this.setState({ searchValue: e.target.value });
                              }}
                              class="form-control"
                              placeholder="Tìm theo SĐT"
                            />
                            <div class="input-group-append">
                              <button class="btn btn-primary" type="submit">
                                <i class="fa fa-search"></i>
                              </button>
                            </div>
                          </div>
                        </form>

                        <div
                          className="btn-filter-search btn-primary"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            padding: "8px 16px",
                            borderRadius: "8px",
                            cursor: "pointer",
                          }}
                          onClick={() =>
                            this.setState({
                              showFilter: !this.state.showFilter,
                            })
                          }
                        >
                          Bộ lọc
                        </div>
                      </div>
                      <p class="total-item" id="sale_user_name">
                        <span className="num-total_item">
                          {this.state.total ?? "_"}&nbsp;
                        </span>
                        <span className="text-total_item" id="user_name">
                          mã dự thưởng
                        </span>
                      </p>

                      <div>
                        <Table
                          prizeCodes={this.state.prizeCodes}
                          currentPage={this.state.currentPage}
                          perPage={this.state.perPage}
                          handleGetRowItem={this.handleGetRowItem}
                          handleMultiDelCallBack={this.handleMultiDelCallBack}
                          handleSetSelected={this.handleSetSelected}
                          store_code={store_code}
                          selected={this.state.selected}
                          resetSelected={this.resetSelected}
                        />
                        <div style={{ display: "flex", justifyContent: "end" }}>
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
                              value={this.state.numPage}
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
                            storeCode={store_code}
                            links={this.state.links}
                            onSetLinks={this.handleSetLinks}
                            onSetPrizeCode={this.handleSetPrizeCodes}
                            onSetCurrentPage={this.handleSetCurrentPage}
                            numPage={this.state.numPage}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
          <SidebarFilterPrizeCode
            showFilterSearch={this.state.showFilter}
            setShowFilterSearch={() => {
              this.setState({ showFilter: !this.state.showFilter });
            }}
            store_code={store_code}
            province={this.props.province}
            onSetLinks={this.handleSetLinks}
            onSetPrizeCode={this.handleSetPrizeCodes}
            onSetCurrentPage={this.handleSetCurrentPage}
            searchValue={this.state.searchValue}
            product={this.props.product}
            showMsg={this.props.showMsg}
            showError={this.props.showError}
            showLoading={this.props.showLoading}
            hideLoading={this.props.hideLoading}
            handleSetTotal={this.handleSetTotal}
          ></SidebarFilterPrizeCode>
        </div>
        {/* <CreateModal /> */}
        {this.props.loading === "show" && <Loading />}

        <ListProductPrizeModal
          onSaveProduct={this.handleSaveListProductPrize}
          discounts={this.props.discounts}
          handleAddProduct={this.handleAddProductPrize}
          listProducts={this.state.listProductPrize}
          store_code={store_code}
          products={this.props.products}
          setListProducts={this.handleListProductPrize}
          rowItem={this.state.rowItem}
          onSetLinks={this.handleSetLinks}
          onSetPrizeCode={this.handleSetPrizeCodes}
          onSetCurrentPage={this.handleSetCurrentPage}
          prizeCodes={this.state.prizeCodes}
          showMsg={this.props.showMsg}
          showError={this.props.showError}
          setLoading={(loading) => {
            this.setState({ isLoading: loading });
          }}
        />
        <ListProductPrizeMultiModal
          onSaveProduct={this.handleSaveListProductPrize}
          discounts={this.props.discounts}
          handleAddProduct={this.handleAddProductPrize}
          listProducts={this.state.listProductPrize}
          store_code={store_code}
          products={this.props.products}
          setListProducts={this.handleListProductPrize}
          rowItem={this.state.rowItem}
          onSetLinks={this.handleSetLinks}
          onSetPrizeCode={this.handleSetPrizeCodes}
          onSetCurrentPage={this.handleSetCurrentPage}
          prizeCodes={this.state.prizeCodes}
          showMsg={this.props.showMsg}
          showError={this.props.showError}
          setLoading={(loading) => {
            this.setState({ isLoading: loading });
          }}
          selected={this.state.selected}
          handleSetSelected={this.handleSetSelected}
          page={this.state.currentPage}
          limit={this.state.numPage}
          searchValue={this.state.searchValue}
        />
        <ModalMultipleDelete
          multi={this.state.multi}
          page={this.state.currentPage}
          limit={this.state.numPage}
          searchValue={this.state.searchValue}
          showMsg={this.props.showMsg}
          showError={this.props.showError}
          showLoading={this.props.showLoading}
          hideLoading={this.props.hideLoading}
          selected={this.state.selected}
          onSetLinks={this.handleSetLinks}
          onSetPrizeCode={this.handleSetPrizeCodes}
          onSetCurrentPage={this.handleSetCurrentPage}
          prizeCodes={this.state.prizeCodes}
          handleSetSelected={this.handleSetSelected}
        />
        <BackgroundModal store_code={store_code} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    province: state.placeReducers.province,
    auth: state.authReducers.login.authentication,
    products: state.productReducers.product.allProduct,
    alert: state.discountReducers.alert.alert_uid,
    discounts: state.discountReducers.discount.allDiscount,
    product: state.productReducers.product.productId,
    badge: state.badgeReducers.allBadge,
    loading: state.loadingReducers.disable,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchPlaceProvince: () => {
      dispatch(placeAction.fetchPlaceProvince());
    },
    exportAllPrizeCodes: (store_code, params) => {
      dispatch(productAction.exportAllPrizeCodes(store_code, params));
    },
    fetchAllProduct: (store_code) => {
      dispatch(productAction.fetchAllProduct(store_code));
    },
    fetchAllDiscount: (store_code) => {
      dispatch(discountAction.fetchAllDiscount(store_code));
    },
    fetchAllCategoryP: (store_code) => {
      dispatch(CategoryPAction.fetchAllCategoryP(store_code));
    },
    fetchProductId: (store_code, id) => {
      dispatch(productAction.fetchProductId(store_code, id));
    },
    showLoading: (res) => {
      dispatch({
        type: Types.SHOW_LOADING,
        loading: "show",
      });
    },
    hideLoading: (res) => {
      dispatch({
        type: Types.SHOW_LOADING,
        loading: "hide",
      });
    },
    showError: (error) => {
      dispatch({
        type: Types.ALERT_UID_STATUS,
        alert: {
          type: "danger",
          title: "Lỗi",
          disable: "show",
          content: error,
        },
      });
    },
    showMsg: (res) => {
      dispatch({
        type: Types.ALERT_UID_STATUS,
        alert: {
          type: "success",
          title: "Thành công ",
          disable: "show",
          content: res?.data?.msg || "Thành công",
        },
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PrizeCode);
