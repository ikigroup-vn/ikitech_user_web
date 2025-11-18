import React, { Component } from "react";
import { connect } from "react-redux";
import * as dashboardAction from "../../actions/dashboard";
import themeData from "../../ultis/theme_data";
import Select from "react-select";

class ModalViewTrip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: "",
      car_id: "",
      route_name: "",
      driver_1: "",
      driver_2: "",
      assistant_1: "",
      assistant_2: "",
      customers: [],
      shipments: [],
      trip_code: "",
    };
  }

  formatMoney(value) {
    if (!value) return "";
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  componentDidUpdate(prevProps) {
    const { modal, store_code, tripDetail } = this.props;

    // Khi modal thay đổi (mở modal view chuyến khác)
    if (modal !== prevProps.modal && modal.id) {
      this.props.fetchTripDetail(store_code, modal.id);
    }

    // Khi tripDetail được load xong
    if (tripDetail !== prevProps.tripDetail && tripDetail) {
      const t = tripDetail;

      // Format lại các giá trị tiền
      const formattedCustomers = (t.customers || []).map((c) => ({
        ...c,
        price: this.formatMoney(c.price),
        total_card: this.formatMoney(c.total_card),
        total_price: this.formatMoney(c.total_price),
      }));

      const formattedShipments = (t.shipments || []).map((s) => ({
        ...s,
        price: this.formatMoney(s.price),
        quantity: this.formatMoney(s.quantity),
        total_price: this.formatMoney(s.total_price),
      }));

      this.setState({
        id: t.trip.id,
        trip_code: t.trip.trip_code,
        date: t.trip.date || "",
        car_id: t.trip.car_id || "",
        route_name: t.trip.route_name || "",
        driver_1: t.trip.driver_1 || "",
        driver_2: t.trip.driver_2 || "",
        assistant_1: t.trip.assistant_1 || "",
        assistant_2: t.trip.assistant_2 || "",
        customers: formattedCustomers,
        shipments: formattedShipments,
      });
    }
  }

  componentDidMount() {
    var { store_code } = this.props;
    this.props.fetchCarList(store_code);
    this.props.fetchEmployeeList(store_code);
  }

  render() {
    const normalizeData = (data) => {
      if (!data) return [];
      if (Array.isArray(data)) return data;
      if (data.data && Array.isArray(data.data)) return data.data;
      return [];
    };

    const cars = normalizeData(this.props.carlist);
    const cars_filter = cars?.filter((emp) => emp.status == "1");

    const employeeList = normalizeData(this.props.employeeList);

    const drivers = employeeList?.filter(
      (emp) => emp.rule == "1" && emp.status == "1"
    );
    const assistants = employeeList?.filter(
      (emp) => emp.rule == "2" && emp.status == "1"
    );

    const { customers, shipments, trip_code } = this.state;

    return (
      <>
        <div className="modal" id="modalView">
          <div className="modal-dialog modal-xl">
            <div className="modal-content">
              <div
                className="model-header-modal"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  backgroundColor: themeData().backgroundColor,
                }}
              >
                <h4 style={{ color: "white", margin: "10px" }}>
                  Xem chi tiết chuyến đi {trip_code}
                </h4>
                <button type="button" className="close" data-dismiss="modal">
                  &times;
                </button>
              </div>

              <div className="modal-body">
                {/* ======= THÔNG TIN CHUYẾN ======= */}
                <form>
                  <div className="row">
                    <div className="col-4">
                      <div className="form-group">
                        <label>Ngày chạy</label>
                        <input
                          type="date"
                          className="form-control"
                          name="date"
                          value={this.state.date}
                          disabled
                        />
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="form-group">
                        <label>Xe</label>
                        <Select
                          instanceId="select-car-view"
                          value={
                            cars_filter
                              ?.map((car) => ({
                                value: car.id,
                                label: car.number,
                              }))
                              .find((opt) => opt.value === this.state.car_id) ||
                            null
                          }
                          options={cars_filter?.map((car) => ({
                            value: car.id,
                            label: car.number,
                          }))}
                          placeholder="-- Chọn xe --"
                          isDisabled
                        />
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="form-group">
                        <label>Tuyến đường</label>
                        <Select
                          instanceId="select-route-view"
                          value={
                            [
                              { value: "1", label: "Nam Định đi Sài Gòn" },
                              { value: "2", label: "Sài Gòn đi Nam Định" },
                            ].find(
                              (opt) => opt.value === this.state.route_name
                            ) || null
                          }
                          options={[
                            { value: "1", label: "Nam Định đi Sài Gòn" },
                            { value: "2", label: "Sài Gòn đi Nam Định" },
                          ]}
                          placeholder="-- Chọn tuyến đường --"
                          isDisabled
                        />
                      </div>
                    </div>
                  </div>

                  {/* ======= NHÂN SỰ ======= */}
                  <div className="row">
                    {/* --- Tài xế --- */}
                    {[
                      { field: "driver_1", label: "Tài xế 1" },
                      { field: "driver_2", label: "Tài xế 2" },
                    ].map(({ field, label }, i) => (
                      <div className="col-3" key={field}>
                        <div className="form-group">
                          <label>{label}</label>
                          <Select
                            instanceId={`select-${field}-view`}
                            value={
                              drivers
                                .map((emp) => ({
                                  value: emp.id,
                                  label: emp.username,
                                }))
                                .find(
                                  (opt) => opt.value === this.state[field]
                                ) || null
                            }
                            options={drivers.map((emp) => ({
                              value: emp.id,
                              label: emp.username,
                            }))}
                            placeholder="-- Chọn tài xế --"
                            isDisabled
                          />
                        </div>
                      </div>
                    ))}

                    {/* --- Phụ xe --- */}
                    {[
                      { field: "assistant_1", label: "Phụ xe 1" },
                      { field: "assistant_2", label: "Phụ xe 2" },
                    ].map(({ field, label }, i) => (
                      <div className="col-3" key={field}>
                        <div className="form-group">
                          <label>{label}</label>
                          <Select
                            instanceId={`select-${field}-view`}
                            value={
                              assistants
                                .map((emp) => ({
                                  value: emp.id,
                                  label: emp.username,
                                }))
                                .find(
                                  (opt) => opt.value === this.state[field]
                                ) || null
                            }
                            options={assistants.map((emp) => ({
                              value: emp.id,
                              label: emp.username,
                            }))}
                            placeholder="-- Chọn phụ xe --"
                            isDisabled
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* ======= KHÁCH HÀNG ======= */}
                  <h5 style={{ marginTop: 30 }}>Danh sách khách hàng</h5>
                  <table className="table table-bordered table-sm align-middle">
                    <thead className="table-light">
                      <tr>
                        <th>#</th>
                        <th>Tên KH</th>
                        <th>SĐT</th>
                        <th>Điểm đón</th>
                        <th>Điểm trả</th>
                        <th>Số vé</th>
                        <th>Giá vé</th>
                        <th>Tổng tiền</th>
                        <th>Trạng thái</th>
                      </tr>
                    </thead>
                    <tbody>
                      {customers.map((c, idx) => (
                        <tr key={c.id}>
                          <td>{idx + 1}</td>
                          <td>
                            <input
                              type="text"
                              name="username"
                              className="form-control form-control-sm"
                              value={c.username}
                              disabled
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              name="phone"
                              className="form-control form-control-sm"
                              value={c.phone}
                              disabled
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              name="pickup_point"
                              className="form-control form-control-sm"
                              value={c.pickup_point}
                              disabled
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              name="dropoff_point"
                              className="form-control form-control-sm"
                              value={c.dropoff_point}
                              disabled
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              name="total_card"
                              className="form-control form-control-sm"
                              value={c.total_card}
                              disabled
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              name="price"
                              className="form-control form-control-sm"
                              value={c.price}
                              disabled
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              className="form-control form-control-sm"
                              value={c.total_price}
                              disabled
                            />
                          </td>
                          <td>
                            <select
                              name="status"
                              className="form-select form-select-sm"
                              value={c.status}
                              disabled
                            >
                              <option value="1">Chờ đón</option>
                              <option value="2">Đã lên xe</option>
                              <option value="3">Hủy chuyến</option>
                              <option value="4">Tiền mặt</option>
                              <option value="5">Chuyển khoản</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {/* ======= HÀNG GỬI ======= */}
                  <h5 style={{ marginTop: 30 }}>Danh sách hàng gửi</h5>
                  <table className="table table-bordered table-sm align-middle">
                    <thead className="table-light">
                      <tr>
                        <th>#</th>
                        <th>Tên hàng</th>
                        <th>Tên KH</th>
                        <th>SĐT</th>
                        <th>Điểm đón</th>
                        <th>Điểm trả</th>
                        <th>Số lượng</th>
                        <th>Giá</th>
                        <th>Tổng tiền</th>
                        <th>Trạng thái</th>
                      </tr>
                    </thead>
                    <tbody>
                      {shipments.map((s, idx) => (
                        <tr key={s.id}>
                          <td>{idx + 1}</td>
                          <td>
                            <input
                              type="text"
                              name="name"
                              className="form-control form-control-sm"
                              value={s.name}
                              disabled
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              name="customer_name"
                              className="form-control form-control-sm"
                              value={s.customer_name || ""}
                              disabled
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              name="phone"
                              className="form-control form-control-sm"
                              value={s.phone}
                              disabled
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              name="pickup_point"
                              className="form-control form-control-sm"
                              value={s.pickup_point}
                              disabled
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              name="dropoff_point"
                              className="form-control form-control-sm"
                              value={s.dropoff_point}
                              disabled
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              name="quantity"
                              className="form-control form-control-sm"
                              value={s.quantity}
                              disabled
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              name="price"
                              className="form-control form-control-sm"
                              value={s.price}
                              disabled
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              className="form-control form-control-sm"
                              value={s.total_price}
                              disabled
                            />
                          </td>
                          <td>
                            <select
                              name="status"
                              className="form-select form-select-sm"
                              value={s.status}
                              disabled
                            >
                              <option value="P">Tiền mặt</option>
                              <option value="C">Chuyển khoản</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </form>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-default"
                  data-dismiss="modal"
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    carlist: state.storeReducers.store.carlist,
    employeeList: state.storeReducers.store.employeeList,
    tripDetail: state.storeReducers.store.tripDetail,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchCarList: (store_code) => {
      dispatch(dashboardAction.fetchCarlist(store_code));
    },
    fetchEmployeeList: (store_code) => {
      dispatch(dashboardAction.fetchEmployeeList(store_code));
    },
    fetchTripDetail: (store_code, id) => {
      dispatch(dashboardAction.fetchTripDetail(store_code, id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalViewTrip);
