import React, { Component } from "react";
import Alert from "../../components/Partials/Alert";
import Sidebar from "../../components/Partials/Sidebar";
import Topbar from "../../components/Partials/Topbar";
import NotAccess from "../../components/Partials/NotAccess";
import Footer from "../../components/Partials/Footer";
import * as Types from "../../constants/ActionType";
import * as dashboardAction from "../../actions/dashboard";
import { connect } from "react-redux";
import ModalDelete from "../../components/CarList/ModalDelete";
import ModalCreate from "../../components/CarList/ModalCreate";
import Pagination from "../../components/CarList/Pagination";
import * as placeAction from "../../actions/place";
import ModalEdit from "../../components/CarList/ModalEdit";
import { getQueryParams } from "../../ultis/helpers";

class CarList extends Component {
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
    this.props.fetchCarList(store_code, page, params);
    this.props.fetchPlaceProvince();
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

  showData = (carlist) => {
    var { store_code } = this.props;
    var result = null;
    if (carlist?.length > 0) {
      var { update, _delete } = this.props;

      result = carlist.map((data, index) => {
        var decentralization =
          typeof data.decentralization != "undefined" &&
          data.decentralization != null
            ? data.decentralization.name
            : "";

        return (
          <tr className="hover-product">
            <td>{index + 1}</td>

            <td>{data.number}</td>
            <td>{data.type}</td>
            <td>{data.seat_count}</td>
            {data.status == "1" ? (
              <td style={{ color: "rgb(17 168 62)" }}>Đang Hoạt động</td>
            ) : (
              <td style={{ color: "red" }}>Ngừng hoạt động</td>
            )}
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
    var carlist = this.props.carlist ? this.props.carlist : [];
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
    var { wards, district, province, name } = this.props;
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
                      Danh sách xe
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
                        Thêm xe
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
                              <th>Biển số</th>
                              <th>Loại xe</th>
                              <th>Số ghế</th>
                              <th>Trạng thái</th>
                              <th>Hành động</th>
                            </tr>
                          </thead>

                          <tbody>{this.showData(carlist.data)}</tbody>
                        </table>
                      </div>
                      <Pagination
                        statusRequest={statusRequest}
                        searchValue={searchValue}
                        numPage={numPage}
                        getParams={this.getParams}
                        store_code={store_code}
                        carlist={carlist}
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
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    branchStore: state.storeReducers.store.branchStore,
    carlist: state.storeReducers.store.carlist,
    wards: state.placeReducers.wards,
    province: state.placeReducers.province,
    district: state.placeReducers.district,
    permission: state.authReducers.permission.data,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchPlaceProvince: () => {
      dispatch(placeAction.fetchPlaceProvince());
    },
    fetchCarList: (store_code, page, params) => {
      dispatch(dashboardAction.fetchCarlist(store_code, page, params));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CarList);
