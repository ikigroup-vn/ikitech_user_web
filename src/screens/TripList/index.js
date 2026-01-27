import React, { Component } from "react";
import Alert from "../../components/Partials/Alert";
import Sidebar from "../../components/Partials/Sidebar";
import Topbar from "../../components/Partials/Topbar";
import NotAccess from "../../components/Partials/NotAccess";
import Footer from "../../components/Partials/Footer";
import * as Types from "../../constants/ActionType";
import * as dashboardAction from "../../actions/dashboard";
import { connect } from "react-redux";
import ModalDelete from "../../components/TripList/ModalDelete";
import ModalCreate from "../../components/TripList/ModalCreate";
import ModalViewTrip from "../../components/TripList/ModalView";
import Pagination from "../../components/TripList/Pagination";
import moment from "moment";
import ModalEdit from "../../components/TripList/ModalEdit";
import { getQueryParams } from "../../ultis/helpers";
import styled from "styled-components";

import Flatpickr from "react-flatpickr";

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
class TripList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id_branch: "",
      modal: "",
      openModal: false,
      page: getQueryParams("page") || 1,
      searchValue: getQueryParams("search") || "",
      fromDate: "",
      toDate: "",
      numPage: getQueryParams("limit") || 20,
      statusRequest: null,
    };
  }
  fakeData = {
    trip: {
      id: 1,
      trip_code: "TRIP0001",
      date: "2025-11-09",
      route_name: "Nam Định - Sài Gòn",
      driver_1_name: "Nguyễn Văn A",
      driver_2_name: "Nguyễn Văn B",
      assistant_1_name: "Nguyễn Văn C",
      assistant_2_name: "Nguyễn Văn D",
    },
    customers: [
      {
        id: 11,
        username: "Khách 1",
        phone: "0976686500",
        pickup_point: "Cầu Cồn",
        dropoff_point: "B.X An Sương",
        total_card: 1,
        price: 850000,
        total_price: 850000,
        status: "p",
      },
      {
        id: 12,
        username: "Khách 2",
        phone: "0976563236",
        pickup_point: "Hải Thịnh",
        dropoff_point: "Sài Gòn",
        total_card: 1,
        price: 850000,
        total_price: 850000,
        status: "2",
      },
    ],
    shipments: [
      {
        id: 21,
        name: "Hàng gửi 01",
        phone: "0987654321",
        pickup_point: "Yên Định",
        dropoff_point: "Thanh Hóa",
        quantity: 2,
        price: 200000,
        total_price: 400000,
        status: "p",
      },
    ],
  };

  //excel
  exportToExcel = (id) => {
    var { store_code } = this.props.match.params;
    this.props.fetchTripDetail2(store_code, id);
  };

  //
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
    this.props.fetchTripList(store_code, page, params);
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
  handleCloseTrip = (data) => {
    var { store_code } = this.props.match.params;
    const form = {
      trip_id: data.id,
      status: "2",
    };
    this.props.updateTripStatus(store_code, form);
  };

  showData = (tripList) => {
    var { store_code } = this.props;
    var result = null;
    const parseDate = (dateStr) => {
      if (!dateStr) return null;
      const parts = dateStr.split("/");
      // parts[0] = day, parts[1] = month, parts[2] = year
      return new Date(parts[2], parts[1] - 1, parts[0]);
    };

    if (tripList?.length > 0) {
      var { update, _delete } = this.props;

      result = tripList.map((data, index) => {
        var decentralization =
          typeof data.decentralization != "undefined" &&
          data.decentralization != null
            ? data.decentralization.name
            : "";
        const tripDate = parseDate(data.date);
        const today = new Date();
        tripDate.setHours(0, 0, 0, 0);
        today.setHours(0, 0, 0, 0);

        const isCloseable = today > tripDate;
        const isClosed = data.status == "2";

        return (
          <tr className="hover-product">
            <td>{index + 1}</td>

            <td
              className="primary name_customer_hover"
              data-toggle="modal"
              data-target="#modalView"
              onClick={() => this.handleSetInfor(data)}
            >
              {data.trip_code}
            </td>

            <td>{data.date}</td>
            <td>{data.date_lunar}</td>
            <td>{data.number}</td>
            {data.route_name == "1" ? (
              <td>Nam Định đi Sài Gòn</td>
            ) : (
              <td>Sài Gòn đi Nam Định</td>
            )}

            {data.status == "1" ? <td>Đang chạy</td> : <td>Đóng chuyến</td>}

            <td>
              <button
                className="btn btn-success btn-sm"
                onClick={() => this.exportToExcel(data.id)}
                style={{ marginRight: "10px" }}
              >
                Xuất Excel
              </button>
              <button
                onClick={() => !isClosed && this.handleSetInfor(data)}
                className="btn btn-warning btn-sm"
                data-toggle={!isClosed ? "modal" : ""}
                data-target={!isClosed ? "#modalEdit" : ""}
                disabled={isClosed}
                style={{ opacity: isClosed ? 0.4 : 1 }}
              >
                <i className="fa fa-edit"></i> Sửa
              </button>
              {/* <button
                onClick={() => this.handleSetIdBranch(data.id, data.name)}
                style={{ marginLeft: "10px" }}
                data-toggle="modal"
                data-target="#removeModal"
                class="btn btn-danger btn-sm"
              >
                <i class="fa fa-trash"></i> Xóa
              </button> */}

              <button
                className="btn btn-secondary btn-sm"
                style={{
                  marginLeft: "10px",
                  opacity: isCloseable && !isClosed ? 1 : 0.4, // Sửa ở đây
                }}
                disabled={!isCloseable || isClosed} // Sửa ở đây
                onClick={() => this.handleCloseTrip(data)}
              >
                <i className="fa fa-lock"></i> Đóng chuyến
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
  onChangeSearchDate = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  searchData = (e) => {
    e.preventDefault(); // ✅ ngăn form reload
    const { page, numPage, statusRequest, fromDate, toDate } = this.state;
    const { store_code } = this.props.match.params;

    // Tạo params giữ filter khác + từ ngày đến ngày
    let params = this.getParams(this.state.searchValue, numPage, statusRequest);
    if (fromDate) params += `&fromDate=${fromDate}`;
    if (toDate) params += `&toDate=${toDate}`;

    this.props.fetchTripList(store_code, page, params);
  };
  render() {
    var { store_code } = this.props.match.params;
    var tripList = this.props.tripList ? this.props.tripList : [];
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
                        Danh sách chuyến xe
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
                          Thêm chuyến đi
                        </span>
                      </a>
                    </div>

                    <br></br>
                    <div className="card">
                      <form onSubmit={this.searchData}>
                        <div className="card-header py-3">
                          <div
                            className="input-group mb-3"
                            style={{ marginTop: "10px", maxWidth: "600px" }}
                          >
                            {/* <input
                            type="date"
                            name="fromDate"
                            value={this.state.fromDate}
                            onChange={this.onChangeSearchDate}
                            className="form-control"
                            placeholder="Từ ngày"
                          />
                          <input
                            type="date"
                            name="toDate"
                            value={this.state.toDate}
                            onChange={this.onChangeSearchDate}
                            className="form-control"
                            placeholder="Đến ngày"
                          /> */}
                            <Flatpickr
                              value={
                                this.state.fromDate
                                  ? new Date(this.state.fromDate)
                                  : null
                              }
                              className="form-control"
                              placeholder="Từ ngày"
                              options={{
                                altInput: true,
                                altFormat: "d/m/Y",
                                dateFormat: "Y-m-d", // format lưu vào state
                                allowInput: true,
                                maxDate: this.state.toDate
                                  ? new Date(this.state.toDate)
                                  : null,
                              }}
                              onChange={([date]) =>
                                this.onChangeSearchDate({
                                  target: {
                                    name: "fromDate",
                                    value: moment(date).format("YYYY-MM-DD"),
                                  },
                                })
                              }
                              onClose={([date]) =>
                                this.onChangeSearchDate({
                                  target: {
                                    name: "fromDate",
                                    value: moment(date).format("YYYY-MM-DD"),
                                  },
                                })
                              }
                            />

                            <Flatpickr
                              value={
                                this.state.toDate
                                  ? new Date(this.state.toDate)
                                  : null
                              }
                              className="form-control"
                              placeholder="Đến ngày"
                              options={{
                                altInput: true,
                                altFormat: "d/m/Y",
                                dateFormat: "Y-m-d", // format lưu vào state
                                allowInput: true,
                                minDate: this.state.fromDate
                                  ? new Date(this.state.fromDate)
                                  : null,
                              }}
                              onChange={([date]) =>
                                this.onChangeSearchDate({
                                  target: {
                                    name: "toDate",
                                    value: moment(date).format("YYYY-MM-DD"),
                                  },
                                })
                              }
                              onClose={([date]) =>
                                this.onChangeSearchDate({
                                  target: {
                                    name: "toDate",
                                    value: moment(date).format("YYYY-MM-DD"),
                                  },
                                })
                              }
                            />
                            <div className="input-group-append">
                              <button
                                className="btn btn-primary"
                                type="submit"
                                style={{
                                  borderTopRightRadius: "0.375rem",
                                  borderBottomRightRadius: "0.375rem",
                                }}
                              >
                                <i className="fa fa-search"></i>
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
                                <th>Mã chuyến</th>
                                <th>Ngày chạy</th>
                                <th>Lịch âm</th>
                                <th>Xe chạy</th>
                                <th>Hành chình</th>
                                <th>Trạng thái</th>
                                <th>Hành động</th>
                              </tr>
                            </thead>

                            <tbody>{this.showData(tripList.data)}</tbody>
                          </table>
                        </div>
                        <Pagination
                          statusRequest={statusRequest}
                          searchValue={searchValue}
                          numPage={numPage}
                          getParams={this.getParams}
                          store_code={store_code}
                          tripList={tripList}
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
            <ModalViewTrip modal={modal} store_code={store_code} />
          </div>
        </div>
      </TableStyles>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    branchStore: state.storeReducers.store.branchStore,
    tripList: state.storeReducers.store.tripList,
    permission: state.authReducers.permission.data,
    tripDetail: state.storeReducers.store.tripDetail,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchTripList: (store_code, page, params) => {
      dispatch(dashboardAction.fetchTripList(store_code, page, params));
    },
    fetchTripDetail2: (store_code, id) => {
      dispatch(dashboardAction.fetchTripDetail2(store_code, id));
    },
    updateTripStatus: (store_code, data) => {
      dispatch(dashboardAction.updateTripStatus(store_code, data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TripList);
