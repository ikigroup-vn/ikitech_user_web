import React, { Component } from "react";
import { connect } from "react-redux";
import * as dashboardAction from "../../actions/dashboard";
import { v4 as uuidv4 } from "uuid"; // 👈 Thêm dòng này
import Validator from "../../ultis/validator";
import themeData from "../../ultis/theme_data";
import Select from 'react-select';

class ModalCreateTrip extends Component {
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
      customers: [
        { id: uuidv4(), username: "", phone: "", pickup_point: "", dropoff_point: "", total_card: "", price: "", total_price: 0, status: "pending" },
      ],
      shipments: [
        { id: uuidv4(), name: "", quantity: "", price: "", total_price: 0, status: "pending" },
      ],
      
      errors: {},
      status: false,
    };

    const rules = [
      {
        field: "date",
        method: "isEmpty",
        validWhen: false,
        message: "Ngày chạy không được để trống.",
      },
      {
        field: "car_id",
        method: "isEmpty",
        validWhen: false,
        message: "Phải chọn xe.",
      },
    ];
    this.validator = new Validator(rules);
  }

  onChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  // ================== KHÁCH HÀNG ==================
  onChangeCustomer = (index, e) => {
    const { name, value } = e.target;
    const customers = [...this.state.customers];
    customers[index][name] = value;

    // 👉 Tự tính tổng tiền
    const total_card = parseFloat(customers[index].total_card || 0);
    const price = parseFloat(customers[index].price || 0);
    customers[index].total_price = total_card * price;

    this.setState({ customers });
  };

  addCustomer = () => {
    this.setState({
      customers: [
        ...this.state.customers,
        { id: uuidv4(), username: "", phone: "", pickup_point: "", dropoff_point: "", total_card: "", price: "", total_price: 0, status: "pending" },
      ],
    });
  };

  deleteCustomer = (id) => {
    this.setState({
      customers: this.state.customers.filter((c) => c.id !== id),
    });
  };

  // ================== HÀNG GỬI ==================
  onChangeShipment = (index, e) => {
    const { name, value } = e.target;
    const shipments = [...this.state.shipments];
    shipments[index][name] = value;

    // 👉 Tự tính tổng tiền
    const quantity = parseFloat(shipments[index].quantity || 0);
    const price = parseFloat(shipments[index].price || 0);
    shipments[index].total_price = quantity * price;

    this.setState({ shipments });
  };

  addShipment = () => {
    console.log('employeesss',this.props.employeeList);
    this.setState({
      shipments: [
        ...this.state.shipments,
        { id: uuidv4(), name: "", quantity: "", price: "", total_price: 0, status: "pending" },
      ],
    });
  };

  deleteShipment = (id) => {
    this.setState({
      shipments: this.state.shipments.filter((s) => s.id !== id),
    });
  };
  handleChangeCar = (e) => {
    this.setState({ car_id: e.target.value });
  
  };
  handleOnClick = () => {
    // const errors = this.validator.validate(this.state);
    // this.setState({ errors });
    // if (Object.keys(errors).length > 0) return;

    const formData = {
      date: this.state.date,
      car_id: this.state.car_id,
      route_name: this.state.route_name,
      driver_1: this.state.driver_1,
      driver_2: this.state.driver_2,
      assistant_1: this.state.assistant_1,
      assistant_2: this.state.assistant_2,
      customers: this.state.customers,
      shipments: this.state.shipments,
    };

    console.log("Form gửi lên:", formData);
    // this.props.createTrip(formData, this, () => {
    //   window.$(".modal").modal("hide");
    // });
  };


  componentDidMount() {
   
    var { store_code } = this.props
    this.props.fetchCarList(store_code);


  }

  render() {
    var cars = this.props.carlist ? this.props.carlist : [];
    var employeeList = this.props.employeeList ? this.props.employeeList : [];
    const { errors, customers, shipments,car_id } = this.state;
    return (
      <>
        <div className="modal" id="modalAddress">
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
                <h4 style={{ color: "white", margin: "10px" }}>Tạo chuyến đi mới</h4>
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
                        <input type="date" className="form-control" name="date" value={this.state.date} onChange={this.onChange} />
                        {errors.date && <div className="validation">{errors.date}</div>}
                      </div>
                    </div>
                    <div className="col-4">
                    <div className="form-group">
                      <label>Xe</label>
                      {/* <select
                        class="form-control"
                        value={car_id}
                        onChange={this.handleChangeCar}
                      >
                        <option value="">-- Chọn xe --</option>
                        {cars.map((car) => (
                          <option key={car.id} value={car.id}>
                            {car.number}
                          </option>
                        ))}
                      </select> */}

                      <Select
                        value={cars
                          .map(car => ({ value: car.id, label: car.number }))
                          .find(opt => opt.value === this.state.car_id) || null
                        }
                        onChange={(selected) =>
                          this.setState({ car_id: selected ? selected.value : "" })
                        }
                        options={cars.map(car => ({ value: car.id, label: car.number }))}
                        placeholder="-- Chọn xe --"
                        isClearable
                      />
                    </div>

                    </div>
                    <div className="col-4">
                      <div className="form-group">
                        <label>Tuyến đường</label>
                        <input type="text" className="form-control" name="route_name" value={this.state.route_name} onChange={this.onChange} />
                      </div>
                    </div>
                  </div>

                  {/* ======= NHÂN SỰ ======= */}
                  <div className="row">
                    {[
                      { field: "driver_1", label: "Tài xế 1" },
                      { field: "driver_2", label: "Tài xế 2" },
                      { field: "assistant_1", label: "Phụ xe 1" },
                      { field: "assistant_2", label: "Phụ xe 2" },
                    ].map(({ field, label }, i) => (
                      <div className="col-3" key={i}>
                        <div className="form-group">
                          <label>{label}</label>
                          <Select
                            value={
                              employeeList
                                .map(emp => ({ value: emp.id, label: emp.username }))
                                .find(opt => opt.value === this.state[field]) || null
                            }
                            onChange={(selected) =>
                              this.setState({ [field]: selected ? selected.value : "" })
                            }
                            options={employeeList.map(emp => ({
                              value: emp.id,
                              label: emp.username
                            }))}
                            placeholder="-- Chọn nhân sự --"
                            isClearable
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
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {customers.map((c, idx) => (
                        <tr key={c.id}>
                          <td>{idx + 1}</td>
                          <td><input type="text" name="username" className="form-control form-control-sm" value={c.username} onChange={(e) => this.onChangeCustomer(idx, e)} /></td>
                          <td><input type="text" name="phone" className="form-control form-control-sm" value={c.phone} onChange={(e) => this.onChangeCustomer(idx, e)} /></td>
                          <td><input type="text" name="pickup_point" className="form-control form-control-sm" value={c.pickup_point} onChange={(e) => this.onChangeCustomer(idx, e)} /></td>
                          <td><input type="text" name="dropoff_point" className="form-control form-control-sm" value={c.dropoff_point} onChange={(e) => this.onChangeCustomer(idx, e)} /></td>
                          <td><input type="number" name="total_card" className="form-control form-control-sm" value={c.total_card} onChange={(e) => this.onChangeCustomer(idx, e)} /></td>
                          <td><input type="number" name="price" className="form-control form-control-sm" value={c.price} onChange={(e) => this.onChangeCustomer(idx, e)} /></td>
                          <td><input type="number" className="form-control form-control-sm" value={c.total_price} readOnly /></td>
                          <td>
                            <select name="status" className="form-select form-select-sm" value={c.status} onChange={(e) => this.onChangeCustomer(idx, e)}>
                              <option value="1">Chờ đón</option>
                              <option value="2">Đã lên xe</option>
                              <option value="3">Huy chuyến</option>
                            </select>
                          </td>
                          <td>
                            <button type="button" className="btn btn-danger btn-sm" onClick={() => this.deleteCustomer(c.id)}>Xóa</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <button type="button" className="btn btn-sm btn-success" onClick={this.addCustomer}>
                    + Thêm khách hàng
                  </button>

                  {/* ======= HÀNG GỬI ======= */}
                  <h5 style={{ marginTop: 30 }}>Danh sách hàng gửi</h5>
                  <table className="table table-bordered table-sm align-middle">
                    <thead className="table-light">
                      <tr>
                        <th>#</th>
                        <th>Tên hàng</th>
                        <th>Số lượng</th>
                        <th>Giá</th>
                        <th>Tổng tiền</th>
                        <th>Trạng thái</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {shipments.map((s, idx) => (
                        <tr key={s.id}>
                          <td>{idx + 1}</td>
                          <td><input type="text" name="name" className="form-control form-control-sm" value={s.name} onChange={(e) => this.onChangeShipment(idx, e)} /></td>
                          <td><input type="number" name="quantity" className="form-control form-control-sm" value={s.quantity} onChange={(e) => this.onChangeShipment(idx, e)} /></td>
                          <td><input type="number" name="price" className="form-control form-control-sm" value={s.price} onChange={(e) => this.onChangeShipment(idx, e)} /></td>
                          <td><input type="number" className="form-control form-control-sm" value={s.total_price} readOnly /></td>
                          <td>
                            <select name="status" className="form-select form-select-sm" value={s.status} onChange={(e) => this.onChangeShipment(idx, e)}>
                              <option value="1">Tiền mặt</option>
                              <option value="2">Chuyển khoản</option>
                            </select>
                          </td>
                          <td>
                            <button type="button" className="btn btn-danger btn-sm" onClick={() => this.deleteShipment(s.id)}>Xóa</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <button type="button" className="btn btn-sm btn-success" onClick={this.addShipment}>
                    + Thêm hàng gửi
                  </button>
                </form>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-default" data-dismiss="modal">
                  Đóng
                </button>
                <button type="submit" onClick={this.handleOnClick} className="btn btn-warning">
                  Tạo chuyến đi
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
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ModalCreateTrip);
