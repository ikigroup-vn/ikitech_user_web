import React, { Component } from "react";
import Sidebar from "../../../../components/Partials/Sidebar";
import Topbar from "../../../../components/Partials/Topbar";
import Footer from "../../../../components/Partials/Footer";
import { Link, Redirect } from "react-router-dom";
import Table from "../../../../components/Ecommerce/Order/Tiki/Table";
import * as Types from "../../../../constants/ActionType";
import Alert from "../../../../components/Partials/Alert";
import NotAccess from "../../../../components/Partials/NotAccess";
import { connect, shallowEqual } from "react-redux";
import Loading from "../../../Loading";
import * as ecommerceAction from "../../../../actions/ecommerce";
import Select from "react-select";
import { getQueryParams } from "../../../../ultis/helpers";
import styled from "styled-components";
import history from "../../../../history";
import FilterOrder from "../../../../components/Ecommerce/Order/Tiki/FilterOrder";
// import ModalSyncProduct from "../../../../components/Ecommerce/Product/Tiki/ModalSyncProduct";

const OrderTikiStyles = styled.div`
  .card-header {
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
  }
`;

class OrderTiki extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: getQueryParams("search") || "",
      page: getQueryParams("page") || 1,
      numPage: getQueryParams("limit") || 20,
      listStore: [],
      listStoreSelected: [],
      listStatusSelected: [],
    };
  }

  componentDidMount() {
    const { store_code } = this.props.match.params;
    this.props.fetchListConnectEcommerce(store_code, "", (res) => {
      if (res?.length > 0) {
        const listShopsTiki = res.filter((res) => res.platform === "TIKI");
        const listShops = listShopsTiki.map((shop) => ({
          value: shop.shop_id,
          label: shop.shop_name,
        }));
        this.setState({
          listStoreSelected: listShops,
        });
        const params = this.getParams(listShops);
        this.props.fetchListOrderEcommerce(store_code, params);
      }
    });
  }

  shouldComponentUpdate(nextProps) {
    const { listConnectEcommerce } = this.props;
    if (!shallowEqual(listConnectEcommerce, nextProps.listConnectEcommerce)) {
      const newListConnectEcommerce = nextProps.listConnectEcommerce.filter(
        (ecommerce) =>
          ecommerce.platform === this.isCheckedEcommerce()?.toUpperCase()
      );
      const newListStore = newListConnectEcommerce.reduce(
        (prevEcommerce, currentEcommerce) => {
          return [
            ...prevEcommerce,
            {
              value: currentEcommerce.shop_id,
              label: currentEcommerce.shop_name,
            },
          ];
        },
        []
      );
      this.setState({
        listStore: newListStore,
      });
    }

    return true;
  }

  componentDidUpdate() {
    if (
      this.state.isLoading != true &&
      typeof this.props.permission.product_list != "undefined"
    ) {
      var permissions = this.props.permission;

      var isShow = permissions.product_list;

      this.setState({
        isLoading: true,
        isShow,
      });
    }
  }
  onChangeStore = (listStoreSelected) => {
    const { fetchListOrderEcommerce } = this.props;
    const { store_code } = this.props.match.params;
    this.setState({
      listStoreSelected: listStoreSelected,
    });

    // const params = this.getParams(listStoreSelected);
    // fetchListOrderEcommerce(store_code, params);
  };

  getParams = (listStore) => {
    var params = "";
    if (listStore?.length > 0) {
      params += listStore.reduce((prevList, currentList, index) => {
        return (
          prevList +
          `${
            index === listStore.length - 1
              ? currentList?.value
              : `${currentList?.value},`
          }`
        );
      }, "shop_ids=");
    }

    return params;
  };
  isCheckedEcommerce = () => {
    const pathName = window.location.pathname;
    const tiki = "tiki";
    const lazada = "lazada";
    const tiktok = "tiktok";
    const shopee = "shopee";
    return pathName?.includes(tiki)
      ? tiki
      : pathName?.includes(lazada)
      ? lazada
      : pathName?.includes(tiktok)
      ? tiktok
      : pathName?.includes(shopee)
      ? shopee
      : "";
  };

  render() {
    if (this.props.auth) {
      var { listOrders, fetchListOrderEcommerce } = this.props;
      var { store_code } = this.props.match.params;
      var {
        isShow,
        numPage,
        listStore,
        listStoreSelected,
        listStatusSelected,
      } = this.state;

      return (
        <OrderTikiStyles id="wrapper">
          <Sidebar store_code={store_code} listStore={listStore} />
          {/* <ModalSyncProduct store_code={store_code} listStore={listStore} /> */}
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
                        Đơn hàng{" "}
                        {this.isCheckedEcommerce() === "tiki"
                          ? "Tiki"
                          : this.isCheckedEcommerce() === "lazada"
                          ? "Lazada"
                          : this.isCheckedEcommerce() === "tiktok"
                          ? "Tiktok"
                          : this.isCheckedEcommerce() === "shopee"
                          ? "Shopee"
                          : ""}
                      </h4>
                    </div>
                    <br></br>

                    <Alert
                      type={Types.ALERT_UID_STATUS}
                      alert={this.props.alert}
                    />

                    <div class="card shadow ">
                      <FilterOrder
                        isCheckedEcommerce={this.isCheckedEcommerce}
                        listStore={listStore}
                        listStoreSelected={listStoreSelected}
                        listStatusSelected={listStatusSelected}
                        onChangeStore={this.onChangeStore}
                      ></FilterOrder>

                      <div
                        class="card-body"
                        style={{
                          overflow: "auto",
                        }}
                      >
                        <Table
                          store_code={store_code}
                          products={listOrders}
                          listStoreSelected={listStoreSelected}
                          fetchListOrderEcommerce={() =>
                            fetchListOrderEcommerce(
                              store_code,
                              this.getParams(listStoreSelected)
                            )
                          }
                        />
                        <div style={{ display: "flex", justifyContent: "end" }}>
                          {/* <div style={{ display: "flex" }}>
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
                          </div> */}

                          {/* <Pagination
                            limit={numPage}
                            searchValue={searchValue}
                            passNumPage={this.passNumPage}
                            store_code={store_code}
                            products={products}
                            pageProduct={true}
                            getParams={this.getParams}
                            categorySelected={this.state.categorySelected}
                          /> */}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <NotAccess />
                )}
              </div>

              <Footer />
            </div>
          </div>
        </OrderTikiStyles>
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
    alert: state.productReducers.alert.alert_success,
    permission: state.authReducers.permission.data,
    listOrders: state.ecommerceReducers.order.listOrders,
    listConnectEcommerce: state.ecommerceReducers.connect.listConnectEcommerce,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchListConnectEcommerce: (store_code, params, funcModal) => {
      dispatch(
        ecommerceAction.fetchListConnectEcommerce(store_code, params, funcModal)
      );
    },
    fetchListOrderEcommerce: (store_code, params) => {
      dispatch(ecommerceAction.fetchListOrderEcommerce(store_code, params));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(OrderTiki);
