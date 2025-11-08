import React, { Component } from "react";
import Alert from "../../components/Partials/Alert";
import Sidebar from "../../components/Partials/Sidebar";
import Topbar from "../../components/Partials/Topbar";
import NotAccess from "../../components/Partials/NotAccess";
import Footer from "../../components/Partials/Footer";
import * as Types from "../../constants/ActionType";
import * as dashboardAction from "../../actions/dashboard";
import { connect } from "react-redux";
import ModalDelete from "../../components/EmployeeList/ModalDelete";
import ModalCreate from "../../components/EmployeeList/ModalCreate";
import Pagination from "../../components/EmployeeList/Pagination";
import * as placeAction from "../../actions/place";
import ModalEdit from "../../components/EmployeeList/ModalEdit";
import { getQueryParams } from "../../ultis/helpers";

class EmployeeList extends Component {
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
    this.props.fetchEmployeeList(store_code,page,params);


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

  showData = (employeeList) => {
    var { store_code } = this.props;
    var result = null;
    if (employeeList?.length > 0) {
      var { update, _delete } = this.props;

      result = employeeList.map((data, index) => {
        var decentralization =
          typeof data.decentralization != "undefined" &&
          data.decentralization != null
            ? data.decentralization.name
            : "";

        return (
          <tr className="hover-product">
            <td>{index + 1}</td>
        
            <td>{data.username}</td>
            <td>{data.phone}</td>
            {data.rule == "1"?(
              <td>Tài xế</td>
            ):
            (
              <td>Phụ xe</td>
            )
          }

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
  render() {
    var { store_code } = this.props.match.params;
    var employeeList = this.props.employeeList ? this.props.employeeList : [];
    var { id_branch, modal, openModal, isShow,statusRequest,searchValue, page, numPage } = this.state;
    var { wards, district, name } = this.props;
    return (
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
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <h4 class="h4 title_content mb-0 text-gray-800">
                      Danh sách nhân viên
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
                        Thêm nhân viên
                      </span>
                    </a>
                  </div>

                  <br></br>
                  <div className="card">
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
                                <th>Vai trò</th>
                                {/* <th>Hành động</th> */}
                              </tr>
                            </thead>

                            <tbody>{this.showData(employeeList.data)}</tbody>
                          </table>
                        </div>
                        <Pagination
              statusRequest={statusRequest}
              searchValue={searchValue}
              numPage={numPage}
              getParams={this.getParams}
              store_code={store_code}
              employeeList={employeeList}
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
          <ModalEdit
            store_code={store_code}
            modal={modal}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    branchStore: state.storeReducers.store.branchStore,
    employeeList: state.storeReducers.store.employeeList,
    wards: state.placeReducers.wards,
    district: state.placeReducers.district,
    permission: state.authReducers.permission.data,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchEmployeeList: (store_code,page,params) => {
      dispatch(dashboardAction.fetchEmployeeList(store_code,page,params));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeList);
