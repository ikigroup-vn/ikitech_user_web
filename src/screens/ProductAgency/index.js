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
import { connect } from "react-redux";
import Loading from "../Loading";
import * as productAction from "../../actions/product";
import * as agencyAction from "../../actions/agency";
import { getQueryParams } from "../../ultis/helpers"

import history from "../../history"




class Product extends Component {

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

    };
  }






  onChangeNumPage = (e) => {
    var { store_code,agency_type_id } = this.props.match.params;
    var { searchValue } = this.state
    var numPage = e.target.value
    this.setState({
      numPage
    })
    var params = `&search=${searchValue}&limit=${numPage}&agency_type_id=${agency_type_id}`

   
    this.props.fetchAllProduct(store_code, 1, params, agency_type_id);
  }
  onChangeSearch = (e) => {
    this.setState({ searchValue: e.target.value });
  };
  componentDidMount() {
    var {  store_code  ,agency_type_id } = this.props.match.params
    var page = getQueryParams("page")
    console.log(page)
    // if(this.props.types.length > 0)
    // {

    // }
    // else
    // {
    //   this.props.fetchAllAgencyType(store_code);

    // }
    if (typeof page != "undefined" && page != null && page != "" && !isNaN(Number(page) )) {
  
      this.props.fetchAllProduct(store_code, page , null, agency_type_id );
    }
    else {
     
      this.props.fetchAllProduct(store_code , null , null, agency_type_id);

    }
  }

  componentDidUpdate() {
    if (this.state.isLoading != true && typeof this.props.permission.product_list != "undefined") {
      var permissions = this.props.permission
      var insert =  true
      var update = true
      var _delete = true
      var _import = true
      var _export = true
      var ecommerce = true

      var isShow =  true


      this.setState({ isLoading: true, insert, update, _delete, _import, _export, isShow , ecommerce })

    }
  }


  searchData = (e) => {
    e.preventDefault()
    var { store_code,agency_type_id } = this.props.match.params;
    var { searchValue } = this.state;
    var params = `&search=${searchValue}`;
    this.setState({ numPage: 20 })
    this.props.fetchAllProduct(store_code, 1, params,agency_type_id);
  };
  fetchAllData = () => {
    var { store_code,agency_type_id } = this.props.match.params;
    this.props.fetchAllProduct(this.props.match.params.store_code,1,agency_type_id);
  };


  fetchAllListProduct = () => {
    var { store_code } = this.props.match.params;
    this.props.fetchAllListProduct(store_code, this.state.searchValue)
  }

  passNumPage = (page) => {

    this.setState({ page: page })
  }


  getNameType = () =>{
    var types = this.props.types
    var {agency_type_id} = this.props.match.params 
    for (const item of types) {
      if(item.id == agency_type_id)
      {
        return item.name
      }
    }
    return ""
  
  }
  goBack = () => {
    var { store_code } = this.props.match.params;

    history.replace(`/agency/${store_code}?tab-index=0`);
};

  render() {
    if (this.props.auth) {
      var { products } = this.props;
      var { store_code , agency_type_id } = this.props.match.params
      var { searchValue, page, numPage } = this.state
      var { insert, update, _delete
        , isShow } = this.state

      return (
        <div id="wrapper">


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
                          Sản phẩm - Đại lý {this.getNameType()}
                        </h4>
                        <button style={{ marginRight: "10px" }} type="button" onClick={this.goBack} class="btn btn-warning  btn-sm"><i class="fas fa-arrow-left"></i>&nbsp;Trở về</button>

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
                                passNumPage={this.passNumPage} store_code={store_code} products={products}   agency_type_id = {agency_type_id}  />


                            </div>
                          </div>
                        </div>


                        <div class="card-body">
                          <Table  agency_type_id = {agency_type_id} insert={insert} _delete={_delete} update={update} page={page} handleDelCallBack={this.handleDelCallBack} handleMultiDelCallBack={this.handleMultiDelCallBack} store_code={store_code} products={products} />
                          <Pagination
                            limit={numPage}
                            searchValue={searchValue}
                            passNumPage={this.passNumPage} 
                            store_code={store_code} 
                            products={products} 
                            agency_type_id = {agency_type_id} />
                        </div>
                      </div>


                    </div>
                    : <NotAccess />}

              </div>

              <Footer />
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


  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {

    fetchAllProduct: (store_code, page, params , agency_type_id) => {
      dispatch(productAction.fetchAllProduct(store_code, page, params , agency_type_id));
    },
    fetchAllListProduct: (store_code, searchValue) => {
      dispatch(productAction.fetchAllListProduct(store_code, searchValue));
    },
    fetchAllAgencyType: (store_code) => {
      dispatch(agencyAction.fetchAllAgencyType(store_code));
  },

  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Product);
