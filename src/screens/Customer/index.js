import React, { Component } from "react";
import Sidebar from "../../components/Partials/Sidebar";
import Topbar from "../../components/Partials/Topbar";
import Footer from "../../components/Partials/Footer";
import Pagination from "../../components/Customer/Pagination";
import Table from "../../components/Customer/Table";
import { Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import Loading from "../Loading";
import * as customerAction from "../../actions/customer";
import Chat from "../../components/Chat";
import * as Env from "../../ultis/default";
import NotAccess from "../../components/Partials/NotAccess";
import {
  formatNumberV2,
  getQueryParams,
  setQueryParamInUrl,
} from "../../ultis/helpers";
import ModalCreate from "../../components/Customer/ModalCreate";
import getChannel, { IKIPOS, IKITECH } from "../../ultis/channel";
import * as placeAction from "../../actions/place";
import ModalEdit from "../../components/Customer/ModalEdit";
import SidebarFilterCustomer from "../../components/Customer/SidebarFilterCustomer";
import * as AgencyAction from "../../actions/agency";
import styled from "styled-components";
import { options } from "../../ultis/groupCustomer/options";
import * as Types from "../../constants/ActionType";
import { genders } from "../../ultis/groupCustomer/genders";

const CustomerStyles = styled.div`
  .filter-search-customer {
    position: relative;
    padding: 0.375rem 0.75rem;
    border-radius: 0.35rem;
    border: 1px solid #d1d3e2;
    border-right-color: transparent;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    display: flex;
    align-items: center;
    column-gap: 5px;
    font-size: 15px;
    &:hover .filter-search-customer-dropdown {
      opacity: 1;
      visibility: visible;
    }
    span:last-of-type {
      margin-left: 5px;
      i {
        margin-top: -5px;
      }
    }
    .filter-search-customer-count {
      font-size: 14px;
    }
    .filter-search-customer-dropdown {
      position: absolute;
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s;
      top: calc(100% + 10px);
      left: 0;
      width: max-content;
      border-radius: 6px;
      box-shadow: 0 0 6px 2px rgba(0, 0, 0, 0.1);
      color: #2d3436;
      background-color: white;
      padding: 0.375rem 0.75rem;
      font-size: 14px;
      width: 450px;
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      &::before {
        content: "";
        position: absolute;
        z-index: 20;
        top: -7px;
        left: 10%;
        width: 16px;
        background-color: white;
        transform: rotate(45deg);
        height: 16px;
        border-radius: 2px;
        border: 1px solid transparent;
        border-left-color: rgb(218, 218, 225);
        border-top-color: rgb(218, 218, 225);
      }
      p {
        display: block;
        width: 100%;
        margin-bottom: 10px;
      }
      .filter-search-customer-dropdown-btnFilter {
        margin: 10px 0;
        display: block;
        width: 100%;
        button {
          padding: 0.375rem 0.75rem;
          border-radius: 0.35rem;
        }
      }
      .filter-search-customer-dropdown-item {
        display: inline-block;
        padding: 6px 12px;
        border: 1px solid #d1d3e2;
        overflow: hidden;
        border-radius: 6px;
        .filter-search-customer-dropdown-item-btnDelete {
          cursor: pointer;
        }
      }
    }
  }
  .btn-filter-search {
    color: white;
    margin-left: 20px;
    padding: 0.375rem 0.75rem;
    border-radius: 0.35rem;
    cursor: pointer;
  }
`;
class Customer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showChatBox: "hide",
      searchValue: "",
      paginate: 1,
      openModal: false,
      openModalEdit: false,
      id_customer: "",
      modal: "",
      showFilterSearch: false,
    };
  }
  openModal = () => {
    this.setState({ openModal: true });
  };
  resetModal = () => {
    this.setState({ openModal: false });
  };
  resetModalEdit = () => {
    this.setState({ openModalEdit: false });
  };

  handleShowChatBox = (customerId, status) => {
    this.setState({
      showChatBox: status,
      customerId: customerId,
    });
    var { store_code } = this.props.match.params;
    this.props.fetchCustomerId(store_code, customerId);
    this.props.fetchChatId(store_code, customerId);
  };

  onChangeSearch = (e) => {
    this.setState({ searchValue: e.target.value });
  };
  searchData = (e) => {
    e.preventDefault();
    const { store_code } = this.props.match.params;
    const { searchValue } = this.state;
    const jsonListFilter = localStorage.getItem("optionsFilter");
    var params = `&search=${searchValue}&json_list_filter=${jsonListFilter}`;
    this.props.fetchAllCustomer(store_code, 1, params);
  };
  componentWillReceiveProps(nextProps) {
    if (
      this.state.isLoading != true &&
      typeof nextProps.permission.customer_list != "undefined"
    ) {
      var permissions = nextProps.permission;
      var chat_allow = permissions.chat_allow;

      var isShow = permissions.customer_list;
      this.setState({ isLoading: true, isShow, chat_allow });
    }
  }

  componentDidMount() {
    setQueryParamInUrl("pag", pag);
    var pag = getQueryParams("pag") || 1;

    this.props.fetchAllCustomer(this.props.match.params.store_code, pag);
    this.props.fetchPlaceProvince();
    this.props.fetchAllAgencyType(this.props.match.params.store_code);
  }

  setShowFilterSearch = (isShowed) => {
    this.setState({
      showFilterSearch: isShowed,
    });
  };

  handleShowFilterSearch = (e) => {
    const sidebarFilter = document.querySelector(".sidebar-filter");
    const btnFilterSearch = document.querySelector(".btn-filter-search");
    if (
      sidebarFilter.contains(e.target) ||
      btnFilterSearch.contains(e.target)
    ) {
      return;
    }
    this.setShowFilterSearch(false);
  };
  handleSetIdCustomer = (id) => {
    this.setState({
      id_supplier: id,
    });
  };

  handleSetInfor = (item) => {
    this.setState({ modal: item });
  };

  closeChatBox = (status) => {
    this.setState({
      showChatBox: status,
    });
  };
  getPaginate = (num) => {
    this.setState({ paginate: num });
  };
  handleShowTypeCondition = () => {
    const newOptions = [];
    const optionFilteredCustomer =
      JSON.parse(localStorage.getItem("optionsFilter")) || [];
    options.forEach((option) => {
      optionFilteredCustomer.forEach((optionFiter) => {
        if (option.id === Number(optionFiter.type_compare)) {
          newOptions.push({
            id: option.id,
            type_compare: option.title,
            comparison_expression: optionFiter.comparison_expression,
            value_compare: this.handleFilterValueCompare(
              Number(optionFiter.type_compare),
              optionFiter.value_compare
            ),
          });
          return;
        }
        return;
      });
    });
    return newOptions.map((option) => (
      <div key={option.id} className="filter-search-customer-dropdown-item">
        {option.type_compare} {option.comparison_expression}{" "}
        {option.value_compare}{" "}
        <span
          className="filter-search-customer-dropdown-item-btnDelete"
          onClick={() => this.handleDeleteOptionFilterById(option.id)}
        >
          <i className="fa fa-times"></i>
        </span>
      </div>
    ));
  };
  handleFilterValueCompare = (type, value) => {
    var genderFilter = [];
    var province = [];
    var typeAgencySelected = [];

    if (type === Types.TYPE_COMPARE_SEX) {
      genderFilter = genders.filter(
        (gender) => Number(gender.value) === Number(value)
      );
    }
    if (type === Types.TYPE_COMPARE_PROVINCE) {
      province = this.props.province.filter(
        (province) => province.id === Number(value)
      );
    }
    if (type === Types.TYPE_COMPARE_AGENCY) {
      if (Number(value) === 0) {
        typeAgencySelected = [{ name: "Tất cả" }];
      } else {
        typeAgencySelected = this.props.types.filter((typeAgency) => {
          return typeAgency.id === Number(value);
        });
      }
    }
    const valueConvert =
      type === Types.TYPE_COMPARE_TOTAL_FINAL_COMPLETED ||
      type === Types.TYPE_COMPARE_TOTAL_FINAL_WITH_REFUND ||
      type === Types.TYPE_COMPARE_POINT
        ? `${value}đ`
        : type === Types.TYPE_COMPARE_COUNT_ORDER
        ? `${value}`
        : type === Types.TYPE_COMPARE_SEX
        ? `${genderFilter[0].type}`
        : type === Types.TYPE_COMPARE_PROVINCE
        ? province[0]?.name
        : type === Types.TYPE_COMPARE_CTV
        ? "Tất cả"
        : type === Types.TYPE_COMPARE_AGENCY
        ? typeAgencySelected[0].name
        : value;
    return valueConvert;
  };
  handleDeleteOptionFilterById = (idOptionType) => {
    var { store_code } = this.props.match.params;
    var { searchValue } = this.state;
    const newOptionConditionFormat = [];

    const optionFilteredCustomer =
      JSON.parse(localStorage.getItem("optionsFilter")) || [];
    const newOptionCondition = optionFilteredCustomer.filter(
      (option) => Number(option.type_compare) !== Number(idOptionType)
    );

    newOptionCondition.forEach((option) => {
      newOptionConditionFormat.push({
        type_compare: option.type_compare,
        comparison_expression: option.comparison_expression,
        value_compare: option.value_compare.toString().replace(/\./g, ""),
      });
    });
    this.setState({
      optionsFilter: newOptionCondition,
    });
    var params = `&search=${searchValue}&json_list_filter=${JSON.stringify(
      newOptionConditionFormat
    )}`;
    this.props.fetchAllCustomer(store_code, 1, params);
    localStorage.setItem("optionsFilter", JSON.stringify(newOptionCondition));
  };
  render() {
    var { customer, chat, customers } = this.props;
    var customerImg =
      typeof customer.avatar_image == "undefined" ||
      customer.avatar_image == null
        ? Env.IMG_NOT_FOUND
        : customer.avatar_image;
    var customerId =
      typeof customer.id == "undefined" || customer.id == null
        ? null
        : customer.id;
    var customerName =
      typeof customer.name == "undefined" || customer.name == null
        ? "Trống"
        : customer.name;

    var { store_code } = this.props.match.params;
    var {
      showChatBox,
      isShow,
      chat_allow,
      searchValue,
      paginate,
      openModal,
      modal,
      openModalEdit,
      showFilterSearch,
    } = this.state;
    const { wards, district, province, types } = this.props;

    if (this.props.auth) {
      return (
        <CustomerStyles id="wrapper">
          <Sidebar store_code={store_code} />
          <ModalCreate
            resetModal={this.resetModal}
            openModal={openModal}
            store_code={store_code}
            wards={wards}
            district={district}
            province={province}
          />
          <ModalEdit
            openModalEdit={openModalEdit}
            resetModal={this.resetModalEdit}
            store_code={store_code}
            wards={wards}
            district={district}
            province={province}
            modal={modal}
          />
          <div className="col-10 col-10-wrapper">
            <div id="content-wrapper" className="d-flex flex-column">
              <div id="content">
                <Topbar store_code={store_code} />
                {typeof isShow == "undefined" ? (
                  <div style={{ height: "500px" }}></div>
                ) : isShow == true ? (
                  <div className="container-fluid">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <h4 className="h4 title_content mb-0 text-gray-800">
                        Danh sách khách hàng
                      </h4>{" "}
                      <a
                        data-toggle="modal"
                        data-target="#modalCreateCustomer"
                        class="btn btn-info btn-icon-split btn-sm"
                        style={{ height: "fit-content", width: "fit-content" }}
                      >
                        <span class="icon text-white-50">
                          <i class="fas fa-plus"></i>
                        </span>
                        <span
                          style={{
                            color: "white",
                          }}
                          class={`text `}
                        >
                          Thêm khách hàng
                        </span>
                      </a>
                    </div>

                    <br></br>
                    <div className="card shadow mb-4">
                      <div className="card-header py-3">
                        <form onSubmit={this.searchData}>
                          <div
                            class="input-group mb-6"
                            style={{ marginTop: "10px" }}
                          >
                            <div class="input-group-append filter-search-customer">
                              {JSON.parse(localStorage.getItem("optionsFilter"))
                                ?.length > 0 && (
                                <span className="filter-search-customer-count">
                                  {`(${
                                    JSON.parse(
                                      localStorage.getItem("optionsFilter")
                                    ).length
                                  })`}
                                </span>
                              )}
                              <span>Lọc khách hàng</span>
                              <span>
                                <i class="fa fa-sort-down"></i>
                              </span>
                              <div className="filter-search-customer-dropdown">
                                <p>Hiển thị khách hàng theo:</p>
                                {this.handleShowTypeCondition()}
                                <div className="filter-search-customer-dropdown-btnFilter">
                                  <div
                                    className="btn-primary btn"
                                    onClick={() =>
                                      this.setShowFilterSearch(
                                        !this.state.showFilterSearch
                                      )
                                    }
                                  >
                                    Bộ lọc
                                  </div>
                                </div>
                              </div>
                            </div>
                            <input
                              style={{ maxWidth: "400px" }}
                              type="search"
                              name="txtSearch"
                              value={searchValue}
                              onChange={this.onChangeSearch}
                              class="form-control"
                              placeholder="Tìm khách hàng"
                            />
                            <div class="input-group-append">
                              <button
                                class="btn btn-primary"
                                type="submit"
                                style={{
                                  borderTopRightRadius: "0.375rem",
                                  borderBottomRightRadius: "0.375rem",
                                }}
                              >
                                <i class="fa fa-search"></i>
                              </button>
                            </div>
                            <div
                              className="btn-filter-search btn-primary"
                              onClick={() =>
                                this.setShowFilterSearch(
                                  !this.state.showFilterSearch
                                )
                              }
                            >
                              Bộ lọc
                            </div>
                          </div>
                        </form>
                      </div>
                      <div className="card-body">
                        <Table
                          handleSetInfor={this.handleSetInfor}
                          paginate={paginate}
                          chat_allow={chat_allow}
                          showChatBox={showChatBox}
                          handleShowChatBox={this.handleShowChatBox}
                          store_code={store_code}
                          handleDelCallBack={this.handleDelCallBack}
                          customers={customers}
                        />

                        <Pagination
                          getPaginate={this.getPaginate}
                          store_code={store_code}
                          customers={customers}
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
            {/* <Chat customerImg = {customerImg} customerId = {customerId} chat = {chat} store_code = {store_code}/> */}

            <Chat
              customerName={customerName}
              customerImg={customerImg}
              customerId={customerId}
              chat={chat}
              store_code={store_code}
              closeChatBox={this.closeChatBox}
              showChatBox={showChatBox}
            ></Chat>
          </div>
          <SidebarFilterCustomer
            showFilterSearch={showFilterSearch}
            setShowFilterSearch={this.setShowFilterSearch}
            types={types}
            province={province}
            searchValue={searchValue}
            store_code={store_code}
            fetchAllCustomer={this.props.fetchAllCustomer}
          ></SidebarFilterCustomer>
        </CustomerStyles>
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
    customers: state.customerReducers.customer.allCustomer,
    auth: state.authReducers.login.authentication,
    customer: state.customerReducers.customer.customerID,
    chat: state.chatReducers.chat.chatID,
    permission: state.authReducers.permission.data,
    wards: state.placeReducers.wards,
    province: state.placeReducers.province,
    district: state.placeReducers.district,
    types: state.agencyReducers.agency.allAgencyType,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchAllCustomer: (id, page, params) => {
      dispatch(customerAction.fetchAllCustomer(id, page, params));
    },
    fetchCustomerId: (store_code, customerId) => {
      dispatch(customerAction.fetchCustomerId(store_code, customerId));
    },
    fetchChatId: (store_code, customerId) => {
      dispatch(customerAction.fetchChatId(store_code, customerId));
    },
    fetchPlaceProvince: () => {
      dispatch(placeAction.fetchPlaceProvince());
    },
    fetchAllAgencyType: (store_code) => {
      dispatch(AgencyAction.fetchAllAgencyType(store_code));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Customer);
