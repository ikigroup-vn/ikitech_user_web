import React, { Component } from "react";
import Sidebar from "../../components/Partials/Sidebar";
import Topbar from "../../components/Partials/Topbar";
import Footer from "../../components/Partials/Footer";
import $ from "jquery";
import { Link, Redirect } from "react-router-dom";
import General from "../../components/Product/General";
import * as Types from "../../constants/ActionType";
import Alert from "../../components/Partials/Alert";
import Pagination from "../../components/Product/Pagination";
import ModalDelete from "../../components/Product/Delete/Modal"
import ModalMultiDelete from "../../components/Product/Delete/MultiDelete"
import ImportModal from "../../components/Product/Import/index"
import NotAccess from "../../components/Partials/NotAccess";
import { connect } from "react-redux";
import Loading from "../Loading";
import * as productAction from "../../actions/product";
import * as XLSX from 'xlsx';
import { randomString } from "../../ultis/helpers"
import Table from "./Table";
import { shallowEqual } from "../../ultis/shallowEqual";

class ProductInventory extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modal: {
        title: "",
        id: "",
        store_code: "",
        name: ""

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
      listType: "0",
      listProduct:""
    };
  }

  onChangeNumPage = (e) => {
    var { store_code } = this.props.match.params;
    var { searchValue } = this.state
    var numPage = e.target.value
    this.setState({
      numPage
    })
    var params = `&search=${searchValue ?? ""}&limit=${numPage}${this.bonusParam}`
    const branch_id = localStorage.getItem('branch_id');
    this.props.fetchAllProductV2(this.props.match.params.store_code, branch_id, numPage, params);


  }
  onChangeType = (e) => {
    var target = e.target;
    var value = target.value;
    this.setState({listType: value});

  }
  onChangeSearch = (e) => {
    this.setState({ searchValue: e.target.value });
  };
  componentDidMount() {
    var { page } = this.props.match.params
    const branch_id = localStorage.getItem('branch_id');

    if (typeof page != "undefined" && page != null && page != "" && !isNaN(Number(page))) {
      this.props.fetchAllProductV2(this.props.match.params.store_code, branch_id, page);
    }
    else {
      this.props.fetchAllProductV2(this.props.match.params.store_code, branch_id);
    }
  }

  componentDidUpdate() {
    if (this.state.isLoading != true && typeof this.props.permission.product_list != "undefined") {
      var permissions = this.props.permission
      var insert = permissions.product_add
      var update = permissions.product_update
      var _delete = permissions.product_remove_hide
      var _import = permissions.product_import_from_exel
      var _export = permissions.product_export_to_exel
      var ecommerce = permissions.product_ecommerce

      var isShow = permissions.product_list


      this.setState({ isLoading: true, insert, update, _delete, _import, _export, isShow, ecommerce })

    }
  }
  shouldComponentUpdate(nextProps,nextState){
    if(!shallowEqual(nextState.listType,this.state.listType)){
      if(nextState.listType == 1){
        const listData = this.props.products.data.filter(item => item.check_inventory == true);
        this.setState({listProduct:listData})
      }else{
        this.setState({listProduct:this.props.products.data})
      }
    }
    return true
  }

  componentWillReceiveProps(nextProps){
    if(!shallowEqual(nextProps.products,this.props.products)){
      this.setState({listProduct:nextProps.products.data})
    }
  }
  handleDelCallBack = (modal) => {
    this.setState({ modal: modal });
  };
  handleMultiDelCallBack = (multi) => {
    this.setState({ multi: multi });
  };
  searchData = (e) => {
    e.preventDefault()
    var { store_code } = this.props.match.params;
    var { searchValue } = this.state;
    const branch_id = localStorage.getItem('branch_id');
    var params = `&search=${searchValue ?? ""}${this.bonusParam}`;
    this.setState({ numPage: 20 })
    this.props.fetchAllProductV2(store_code, branch_id, 1, params);
  };
  fetchAllData = () => {
    var { store_code } = this.props.match.params;
    const branch_id = localStorage.getItem('branch_id');
    this.props.fetchAllProductV2(store_code, branch_id, 1);
  };
  showDialogImportExcel = () => {
    $('#file-excel-import').trigger('click');
  }

  onChangeExcel = (evt) => {
    var f = evt.target.files[0]
    const reader = new FileReader();
    window.$("#importModal").modal("show")
    this.setState({ allow_skip_same_name: randomString(10) })
    var _this = this
    reader.onload = function (evt) {
      const bstr = evt.target.result;
      const workbook = XLSX.read(bstr, { type: 'binary' });
      workbook.SheetNames.forEach(sheet => {
        let rowObject = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheet]);
        _this.setState({ importData: rowObject })
      });
    };
    document.getElementById('file-excel-import').value = null;
    reader.readAsBinaryString(f)
  }

  fetchAllListProduct = () => {
    var { store_code } = this.props.match.params;
    this.props.fetchAllListProduct(store_code, this.state.searchValue)
  }

  passNumPage = (page) => {
    this.setState({ page: page })
  }


  render() {
    if (this.props.auth) {
      var { products, allProductList } = this.props;
      var {listProduct} = this.state
      var { store_code } = this.props.match.params
      var { searchValue, importData, allow_skip_same_name, page, numPage } = this.state
      var { insert, update, _delete, _import
        , _export, isShow, ecommerce } = this.state

      const bonusParam = "&check_inventory=true"

      return (
        <div id="wrapper">
          <ImportModal store_code={store_code} importData={importData} allow_skip_same_name={allow_skip_same_name} />


          <Sidebar store_code={store_code} />
          <div className="col-10 col-10-wrapper">

            <div id="content-wrapper" className="d-flex flex-column">
              <div id="content">
                <Topbar store_code={store_code} />
                {typeof isShow == "undefined" ? <div style={{ height: "500px" }}></div> :
                  isShow == true ?

                    <div class="container-fluid">
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <h4 className="h4 title_content mb-0 text-gray-800">
                          Kho hàng
                        </h4>

                      </div>
                      <br></br>
                      <Alert
                        type={Types.ALERT_UID_STATUS}
                        alert={this.props.alert}
                      />
                      <div class="card shadow ">


                        <div className="card-header">
                          <div class="row" style={{ "justify-content": "space-between" }}>

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
                                  placeholder="Tìm mã đơn, tên, SĐT"
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
                              <p class="total-item" id="sale_user_name">
                                <span className="num-total_item" >{products.total}&nbsp;</span><span className="text-total_item" id="user_name">sản phẩm</span>
                              </p>
                            </form>
                            <div style={{ display: "flex" }}>
                              <div style={{ display: "flex" }}>
                                <span
                                  style={{
                                    margin: "20px 10px auto auto"
                                  }}
                                >Lọc sản phẩm</span>
                                <select value={this.state.listType}                                   
                                style={{
                                    margin: "auto",
                                    marginTop: "10px",
                                    marginRight: "20px",
                                    width: "180px",
                                  }} name="txtDiscoutType" id="input" class="form-control" onChange={this.onChangeType} >
                
                                  <option value="0" selected>Tất cả sản phẩm</option>
                                  <option value="1">Sản phẩm được theo dõi</option>

                                </select>

                              </div>
                              <div style={{ display: "flex" }}>
                                <span
                                  style={{
                                    margin: "20px 10px auto auto"
                                  }}
                                >Hiển thị</span>
                                <select
                                  style={{
                                    margin: "auto",
                                    marginTop: "10px",
                                    marginRight: "20px",
                                    width: "70px",
                                  }}
                                  onChange={this.onChangeNumPage}

                                  value={numPage}
                                  name="numPage" class="form-control" >
                                  <option value="10">10</option>
                                  <option value="20" selected>20</option>
                                  <option value="50">50</option>
                                </select>
                              </div>


                              <Pagination limit={numPage}
                                searchValue={searchValue}
                                bonusParam={bonusParam}
                                passNumPage={this.passNumPage} store_code={store_code} products={products} />
                            </div>
                          </div>
                        </div>


                        <div class="card-body">
                          <Table insert={insert} _delete={_delete} update={update} page={page} handleDelCallBack={this.handleDelCallBack} handleMultiDelCallBack={this.handleMultiDelCallBack} store_code={store_code} products={products} listProductSelect = {listProduct} />
                          <Pagination
                            bonusParam={bonusParam}
                            limit={numPage}
                            searchValue={searchValue}
                            passNumPage={this.passNumPage} store_code={store_code} products={products} />
                        </div>
                      </div>


                    </div>
                    : <NotAccess />}

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
    fetchAllProductV2: (store_code, branch_id, page, params) => {
      dispatch(productAction.fetchAllProductV2(store_code, branch_id, page, params));
    },
    fetchAllListProduct: (store_code, searchValue) => {
      dispatch(productAction.fetchAllListProduct(store_code, searchValue));
    },

  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ProductInventory);
