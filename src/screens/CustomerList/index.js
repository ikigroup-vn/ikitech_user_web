import React, { Component } from "react";
import Alert from "../../components/Partials/Alert";
import Sidebar from "../../components/Partials/Sidebar";
import Topbar from "../../components/Partials/Topbar";
import NotAccess from "../../components/Partials/NotAccess";
import Footer from "../../components/Partials/Footer";
import * as Types from "../../constants/ActionType";
import * as dashboardAction from "../../actions/dashboard";
import { connect } from "react-redux";
import ModalDelete from "../../components/CustomerList/ModalDelete";
import ModalCreate from "../../components/CustomerList/ModalCreate";
import ModalView from "../../components/CustomerList/ModalView";
import Pagination from "../../components/CustomerList/Pagination";
import * as placeAction from "../../actions/place";
import ModalEdit from "../../components/CustomerList/ModalEdit";
import { getQueryParams } from "../../ultis/helpers";
import styled from "styled-components";
const TableStyles = styled.div`
  .select-role {
    &:hover {
      text-decoration: underline;
    }
  }
  .name_customer_hover {
    &:hover {
      text-decoration: underline;
    }
  }
`;
class CustomerList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id_branch: "",
      modal: "",
      openModal: false,
      page: getQueryParams("page") || 1,
      searchValue: getQueryParams("search") || "",
      numPage: getQueryParams("limit") || 20,
      statusRequest: null,
    };
  }
  handleSetIdBranch = (id, name) => {
    this.setState({
      id_branch: id,
      name: name,
    });
  };
  handleSetInfor = (item) => {
    this.setState({ modal: item });
  };

  openModal = () => {
    this.setState({ openModal: true });
  };
  resetModal = () => {
    this.setState({ openModal: false });
  };
  componentWillReceiveProps(nextProps) {
    if (
      this.state.isLoading != true &&
      typeof nextProps.permission.branch_list != "undefined"
    ) {
      var permissions = nextProps.permission;

      var isShow = permissions.branch_list;
      this.setState({ isLoading: true, isShow });
    }
  }
  componentDidMount() {
    const { page, searchValue, numPage, statusRequest } = this.state;
    const params = this.getParams(searchValue, numPage, statusRequest);
    var { store_code } = this.props.match.params;
    this.props.fetchCustomerList(store_code, page, params);
  }

  getParams = (searchValue, limit = 20, statusRequest = "") => {
    var params = ``;

    if (searchValue != "" && searchValue != null) {
      params = params + `&search=${searchValue}`;
    }
    params += `&limit=${limit}&status=${statusRequest ?? ""}`;

    return params;
  };
  setPage = (page) => {
    this.setState({ page });
  };

  showData = (customerList) => {
    var { store_code } = this.props;
    var result = null;
    if (customerList?.length > 0) {
      var { update, _delete } = this.props;

      result = customerList.map((data, index) => {
        var decentralization =
          typeof data.decentralization != "undefined" &&
          data.decentralization != null
            ? data.decentralization.name
            : "";

        return (
          <tr className="hover-product">
            <td>{index + 1}</td>
            <td
              className="primary name_customer_hover"
              data-toggle="modal"
              data-target="#modalViewCustomer"
              onClick={() => this.handleSetInfor(data)}
            >
              {data.username}
            </td>

            <td>{data.phone}</td>
            <td>{data.total_tickets_purchased}</td>
            <td>{data.note}</td>

            <td>
              <button
                onClick={() => this.handleSetInfor(data)}
                class="btn btn-warning btn-sm"
                data-toggle="modal"
                data-target="#modalEdit"
              >
                <i class="fa fa-edit"></i> Sửa
              </button>
              <button
                onClick={() => this.handleSetIdBranch(data.id, data.name)}
                style={{ marginLeft: "10px" }}
                data-toggle="modal"
                data-target="#removeModal"
                class="btn btn-danger btn-sm"
              >
                <i class="fa fa-trash"></i> Xóa
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
  onChangeSearch = (e) => {
    this.setState({ searchValue: e.target.value });
  };
  searchData = (e) => {
    e.preventDefault();
    const { page, searchValue, numPage, statusRequest } = this.state;
    var { store_code } = this.props.match.params;
    this.props.fetchCustomerList(store_code, page, `&phone=${searchValue}`);
  };
  render() {
    var { store_code } = this.props.match.params;
    var customerList = this.props.customerList ? this.props.customerList : [];
    var {
      id_branch,
      modal,
      openModal,
      isShow,
      statusRequest,
      searchValue,
      page,
      numPage,
    } = this.state;
    var { wards, district, name } = this.props;
    return (
      <TableStyles>
        <div id="wrapper">
          <Sidebar store_code={store_code} />

          <div className="col-10 col-10-wrapper">
            <div id="content-wrapper" className="d-flex flex-column">
              <div id="content">
                <Topbar store_code={store_code} />
                {typeof isShow == "undefined" ? (
                  <div></div>
                ) : isShow == true ? (
                  <div className="container-fluid">
                    <Alert
                      type={Types.ALERT_UID_STATUS}
                      alert={this.props.alert}
                    />

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <h4 class="h4 title_content mb-0 text-gray-800">
                        Danh sách khách hàng
                      </h4>

                      <a
                        onClick={this.openModal}
                        data-toggle="modal"
                        data-target="#modalAddress"
                        class={`btn btn-info btn-icon-split btn-sm ${
                          true ? "show" : "hide"
                        }`}
                        style={{ marginRight: "1rem" }}
                      >
                        <span
                          class="icon text-white-50"
                          style={{ marginRight: 0 }}
                        >
                          <i class="fas fa-plus"></i>
                        </span>
                        <span style={{ color: "white" }} class={`text `}>
                          Thêm khách hàng
                        </span>
                      </a>
                    </div>

                    <br></br>
                    <div className="card">
                      <form onSubmit={this.searchData}>
                        <div className="card-header py-3">
                          <div
                            class="input-group mb-6"
                            style={{ marginTop: "10px" }}
                          >
                            <input
                              style={{ maxWidth: "400px" }}
                              type="search"
                              name="txtSearch"
                              value={searchValue}
                              onChange={this.onChangeSearch}
                              class="form-control"
                              placeholder="Nhập số điện thoại"
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
                          </div>
                        </div>
                      </form>

                      <div className="card-body">
                        <div class="table-responsive">
                          <table
                            class="table  "
                            id="dataTable"
                            width="100%"
                            cellspacing="0"
                          >
                            <thead>
                              <tr>
                                <th>STT</th>
                                <th>Họ và tên</th>
                                <th>Số điện thoại</th>
                                <th>Tổng số vé</th>
                                <th>Ghi chú</th>
                                <th>Hành động</th>
                              </tr>
                            </thead>

                            <tbody>{this.showData(customerList.data)}</tbody>
                          </table>
                        </div>
                        <Pagination
                          statusRequest={statusRequest}
                          searchValue={searchValue}
                          numPage={numPage}
                          getParams={this.getParams}
                          store_code={store_code}
                          customerList={customerList}
                          setPage={this.setPage}
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
            <ModalDelete
              store_code={store_code}
              id_branch={id_branch}
              brand_name={this.state.name}
            />
            <ModalCreate
              openModal={openModal}
              resetModal={this.resetModal}
              store_code={store_code}
            />
            <ModalEdit store_code={store_code} modal={modal} />
            <ModalView modal={modal} store_code={store_code} />
          </div>
        </div>
      </TableStyles>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    branchStore: state.storeReducers.store.branchStore,
    customerList: state.storeReducers.store.customerList,
    wards: state.placeReducers.wards,
    district: state.placeReducers.district,
    permission: state.authReducers.permission.data,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchCustomerList: (store_code, page, params) => {
      dispatch(dashboardAction.fetchCustomerList(store_code, page, params));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomerList);
