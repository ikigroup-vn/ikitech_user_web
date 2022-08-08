import React, { Component } from "react";
import Sidebar from "../../components/Partials/Sidebar";
import Topbar from "../../components/Partials/Topbar";
import Footer from "../../components/Partials/Footer";
import $ from "jquery";
import { Link, Redirect } from "react-router-dom";
import Table from "../../components/Product/Table";
import General from "../../components/Product/General";
import * as Types from "../../constants/ActionType";
import Alert from "../../components/Partials/Alert";
import Pagination from "../../components/Product/Pagination";
import ModalDelete from "../../components/Product/Delete/Modal";
import ModalMultiDelete from "../../components/Product/Delete/MultiDelete";
import ImportModal from "../../components/Product/Import/index";
import NotAccess from "../../components/Partials/NotAccess";
import Tiki from "../../components/Product/Ecomerce/Tiki";
import { connect } from "react-redux";
import Loading from "../Loading";
import * as productAction from "../../actions/product";
import * as XLSX from "xlsx";
import { randomString } from "../../ultis/helpers";
import Shopee from "../../components/Product/Ecomerce/Shopee";
import Sendo from "../../components/Product/Ecomerce/Sendo";
import getChannel, { IKITECH, IKIPOS } from "../../ultis/channel";
import { getQueryParams } from "../../ultis/helpers"
import ModalCol from "../../components/Product/ModalCollaration"
import ModalConfirm from "../../components/Product/ComfirmCol"

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
      searchValue: "",
      importData: [],
      allow_skip_same_name: false,
      page: 1,
      numPage: 20,
    };
  }

  onChangeNumPage = (e) => {
    var { store_code } = this.props.match.params;
    var { searchValue } = this.state;
    var numPage = e.target.value;
    this.setState({
      numPage,
    });
    var params = `&search=${searchValue}&limit=${numPage}`;

    this.props.fetchAllProduct(store_code, 1, params);
  };
  onChangeSearch = (e) => {
    this.setState({ searchValue: e.target.value });
  };
  componentDidMount() {
    var { page } = this.props.match.params;
    const branch_id = localStorage.getItem("branch_id");
    var is_near_out_of_stock = getQueryParams("is_near_out_of_stock")
    var params = null
    if (is_near_out_of_stock) {
      params = params + `&is_near_out_of_stock=true`
    }
    if (
      typeof page != "undefined" &&
      page != null &&
      page != "" &&
      !isNaN(Number(page))
    ) {
      this.props.fetchAllProductV2(
        this.props.match.params.store_code,
        branch_id,
        page,
        params
      );
    } else {
      this.props.fetchAllProductV2(
        this.props.match.params.store_code,
        branch_id,
        1,
        params
      );
    }
  }

  componentDidUpdate() {
    if (
      this.state.isLoading != true &&
      typeof this.props.permission.product_list != "undefined"
    ) {
      var permissions = this.props.permission;
      var insert = permissions.product_list;
      var update = permissions.product_list;
      var _delete = permissions.product_list;
      var _import = permissions.product_list;
      var _export = permissions.product_list;
      var ecommerce = permissions.product_list;

      var isShow = permissions.product_list;
      var barcode_print = permissions.barcode_print

      this.setState({
        isLoading: true,
        insert,
        update,
        _delete,
        _import,
        _export,
        isShow,
        ecommerce,
        barcode_print
      });
    }
  }

  handleDelCallBack = (modal) => {
    this.setState({ modal: modal });
  };
  handleMultiDelCallBack = (multi) => {
    this.setState({ multi: multi });
  };
  searchData = (e) => {
    e.preventDefault();
    var { store_code } = this.props.match.params;
    var { searchValue } = this.state;
    const branch_id = localStorage.getItem("branch_id");
    var params = `&search=${searchValue}`;
    this.setState({ numPage: 20 });
    this.props.fetchAllProductV2(store_code, branch_id, 1, params);
  };
  fetchAllData = () => {
    this.props.fetchAllProduct(this.props.match.params.store_code);
  };
  showDialogImportExcel = () => {
    $("#file-excel-import").trigger("click");
  };

  onChangeExcel = (evt) => {
    var f = evt.target.files[0];
    const reader = new FileReader();
    window.$("#importModal").modal("show");
    this.setState({ allow_skip_same_name: randomString(10) });
    var _this = this;
    reader.onload = function (evt) {
      const bstr = evt.target.result;
      const workbook = XLSX.read(bstr, { type: "binary" });
      workbook.SheetNames.forEach((sheet) => {
        let rowObject = XLSX.utils.sheet_to_row_object_array(
          workbook.Sheets[sheet]
        );
        _this.setState({ importData: rowObject });
      });
    };
    document.getElementById("file-excel-import").value = null;
    reader.readAsBinaryString(f);
  };

  fetchAllListProduct = () => {
    var { store_code } = this.props.match.params;
    this.props.fetchAllListProduct(store_code, this.state.searchValue);
  };

  passNumPage = (page) => {
    this.setState({ page: page });
  };

  render() {
    if (this.props.auth) {
      var { products, allProductList } = this.props;
      var { store_code } = this.props.match.params;
      var { searchValue, importData, allow_skip_same_name, page, numPage } =
        this.state;
      var { insert, update, _delete, _import, _export, isShow, ecommerce,barcode_print } =
        this.state;

      return (
        <div id="wrapper">
          <ImportModal
            store_code={store_code}
            importData={importData}
            allow_skip_same_name={allow_skip_same_name}
          />
                   {/* <ModalConfirm
           
          />
          
          <ModalCol></ModalCol> */}
          <Tiki store_code={store_code} />
          <Shopee store_code={store_code} />
          <Sendo store_code={store_code} />

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
                        Sản phẩm
                      </h4>

                      <div style={{ display: "flex" }}>
                        {
                          getChannel() == IKITECH && (
                            <div
                              class={`dropdown ${ecommerce == true ? "show" : "hide"
                                }`}
                              style={{
                                marginRight: "10px",
                              }}
                            >
                              <button
                                style={{
                                  border: "0px",
                                  color: "white",
                                  background: "cadetblue",
                                }}
                                class="btn btn-secondary dropdown-toggle"
                                type="button"
                                id="dropdownMenuButton"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                Thương mại điện tử
                              </button>
                              <div
                                class="dropdown-menu"
                                style={{ width: "100%" }}
                                aria-labelledby="dropdownMenuButton"
                              >
                                <a
                                  data-toggle="modal"
                                  data-target="#showTiki"
                                  class="dropdown-item"
                                >
                                  <img
                                    style={{
                                      maxWidth: "25px",
                                      marginRight: "10px",
                                    }}
                                    src="https://chondeal247.com/wp-content/uploads/2020/11/icon-tiki.png"
                                    class="img-responsive"
                                    alt="Image"
                                  />
                                  <span>TIKI</span>
                                </a>
                                <a
                                  data-toggle="modal"
                                  data-target="#showSendo"
                                  class="dropdown-item"
                                >
                                  <img
                                    style={{
                                      maxWidth: "27px",
                                      marginRight: "10px",
                                    }}
                                    src="https://bloggiamgia.vn/wp-content/uploads/2020/06/logo-sendo.png"
                                    class="img-responsive"
                                    alt="Image"
                                  />
                                  <span>SENDO</span>{" "}
                                </a>
                                <a
                                  data-toggle="modal"
                                  data-target="#showShopee"
                                  class="dropdown-item"
                                >
                                  <img
                                    style={{
                                      maxWidth: "30px",
                                      marginRight: "10px",
                                    }}
                                    src="https://images.pngnice.com/download/2007/Shopee-Logo-PNG-File.png"
                                    class="img-responsive"
                                    alt="Image"
                                  />
                                  <span>SHOPEE</span>{" "}
                                </a>
                              </div>
                            </div> 
                          )
                        }
                        <Link
                          to={`/product/print_barcode/${store_code}`}
                          style={{ marginRight: "10px" }}
                          class={`btn btn-info btn-icon-split btn-sm ${barcode_print == true ? "show" : "hide"
                          
                            }`}
                        >
                          <span class="icon text-white-50">
                            <i class="fas fa-barcode"></i>
                          </span>
                          <span class="text">In mã vạch</span>
                        </Link>
                        {/* <a
                            data-toggle="modal"
                            data-target="#colConfig"
                          style={{ marginRight: "10px" }}
                          class={`btn btn-danger btn-icon-split btn-sm  ${_export == true ? "show" : "hide"
                            }`}
                        >
                          <span class="icon text-white-50">
                            <i class="fas fa-file-export"></i>
                          </span>
                          <span style={{ color: "white" }} class="text">
                            Cài đặt hoa hồng
                          </span>
                        </a> */}
                        <a
                          style={{ marginRight: "10px" }}
                          onClick={this.fetchAllListProduct}
                          class={`btn btn-danger btn-icon-split btn-sm  ${_export == true ? "show" : "hide"
                            }`}
                        >
                          <span class="icon text-white-50">
                            <i class="fas fa-file-export"></i>
                          </span>
                          <span style={{ color: "white" }} class="text">
                            Export Excel
                          </span>
                        </a>
                        <a
                          style={{ marginRight: "10px" }}
                          onClick={this.showDialogImportExcel}
                          class={`btn btn-primary btn-icon-split btn-sm  ${_import == true ? "show" : "hide"
                            }`}
                        >
                          <span class="icon text-white-50">
                            <i class="fas fa-file-import"></i>
                          </span>
                          <span style={{ color: "white" }} class="text">
                            Import Excel
                          </span>
                        </a>
                        <input
                          id="file-excel-import"
                          type="file"
                          name="name"
                          style={{ display: "none" }}
                          onChange={this.onChangeExcel}
                        />
                        <Link
                          to={`/product/create/${store_code}`}
                          class={`btn btn-info btn-icon-split btn-sm ${insert == true ? "show" : "hide"
                            }`}
                        >
                          <span class="icon text-white-50">
                            <i class="fas fa-plus"></i>
                          </span>
                          <span class="text">Thêm sản phẩm</span>
                        </Link>
                      </div>
                    </div>
                    <br></br>
                    {/* {getChannel() == IKITECH && <General products={products} />
                    } */}
                    <Alert
                      type={Types.ALERT_UID_STATUS}
                      alert={this.props.alert}
                    />

                    <div class="card shadow ">
                      <div className="card-header">
                        <div
                          class="row"
                          style={{ "justify-content": "space-between" , marginRight : "15px" , marginLeft : "15px" }}
                        >
                          <form onSubmit={this.searchData}>
                            <div
                              class="input-group mb-6"
                              style={{ padding: "0 20px" }}
                            >
                              <input
                                style={{ maxWidth: "400px", minWidth: "300px" }}
                                type="search"
                                name="txtSearch"
                                value={searchValue}
                                onChange={this.onChangeSearch}
                                class="form-control"
                                placeholder="Tìm kiếm sản phẩm"
                              />
                              <div class="input-group-append">
                                <button class="btn btn-primary" type="submit">
                                  <i class="fa fa-search"></i>
                                </button>
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
                          </form>
                          <div style={{ display: "flex" }}>
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
                              passNumPage={this.passNumPage}
                              store_code={store_code}
                              products={products}
                            />
                          </div>
                        </div>
                      </div>

                      <div class="card-body">
                        <Table
                          insert={insert}
                          _delete={_delete}
                          update={update}
                          page={page}
                          handleDelCallBack={this.handleDelCallBack}
                          handleMultiDelCallBack={this.handleMultiDelCallBack}
                          store_code={store_code}
                          products={products}
                        />
                        <Pagination
                          limit={numPage}
                          searchValue={searchValue}
                          passNumPage={this.passNumPage}
                          store_code={store_code}
                          products={products}
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <NotAccess />
                )}
              </div>

              <Footer />
            </div>
            <ModalDelete modal={this.state.modal} />
            <ModalMultiDelete multi={this.state.multi} />
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
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchAllProduct: (store_code, page, params) => {
      dispatch(productAction.fetchAllProduct(store_code, page, params));
    },
    fetchAllProductV2: (store_code, branch_id, page, params) => {
      dispatch(
        productAction.fetchAllProductV2(store_code, branch_id, page, params)
      );
    },
    fetchAllListProduct: (store_code, searchValue) => {
      dispatch(productAction.fetchAllListProduct(store_code, searchValue));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Product);
