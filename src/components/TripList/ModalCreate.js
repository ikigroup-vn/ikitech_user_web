import React, { Component } from "react";
import { connect } from "react-redux";
import * as dashboardAction from "../../actions/dashboard";
import { v4 as uuidv4 } from "uuid";
import Validator from "../../ultis/validator";
import themeData from "../../ultis/theme_data";
import Select from "react-select";

class ModalCreateTrip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneEditingIndex: null,
      date: "",
      car_id: "",
      route_name: "",
      driver_1: "",
      driver_2: "",
      assistant_1: "",
      assistant_2: "",
      customers: [],
      shipments: [],
      // Thêm state cho phone suggestions
      phoneSuggestions: [],
      showSuggestions: false,
      activeSuggestionIndex: null,
      currentSearchPhone: "", // Lưu số điện thoại đang tìm kiếm
      // Thêm state cho shipment phone suggestions
      shipmentPhoneEditingIndex: null,
      showShipmentSuggestions: false,
      activeShipmentSuggestionIndex: null,
      currentSearchShipmentPhone: "",
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

  formatMoney(value) {
    if (!value) return "";
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  parseMoney(value) {
    return parseFloat(value.toString().replace(/,/g, "")) || 0;
  }

  onChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  componentDidUpdate(prevProps) {
    if (prevProps.customerList !== this.props.customerList) {
      const index = this.state.phoneEditingIndex;
      if (
        index !== null &&
        this.props.customerList.data &&
        this.props.customerList.data.length > 0
      ) {
        // Chỉ hiển thị danh sách gợi ý, không tự động điền
        this.setState({
          showSuggestions: true,
        });
      }
    }
  }

  // Thêm hàm tìm kiếm cho shipment
  searchShipmentCustomerByPhone = (index, phone) => {
    const { store_code } = this.props;

    if (phone.length >= 4) {
      this.setState({
        shipmentPhoneEditingIndex: index,
        showShipmentSuggestions: true,
        activeShipmentSuggestionIndex: index,
        currentSearchShipmentPhone: phone,
      });

      this.props.fetchCustomerList(store_code, 1, { phone: phone });
    } else {
      this.setState({
        showShipmentSuggestions: false,
        activeShipmentSuggestionIndex: null,
      });
    }
  };
  // Hàm tìm kiếm khách hàng theo số điện thoại
  searchCustomerByPhone = (index, phone) => {
    const { store_code } = this.props;

    // Chỉ tìm kiếm khi nhập đủ 4 số
    if (phone.length >= 4) {
      this.setState({
        phoneEditingIndex: index,
        showSuggestions: true,
        activeSuggestionIndex: index,
      });

      // Gọi API tìm kiếm khách hàng
      this.props.fetchCustomerList(store_code, 1, { phone: phone });
    } else {
      this.setState({
        showSuggestions: false,
        phoneSuggestions: [],
        activeSuggestionIndex: null,
      });
    }
  };

  // Đóng dropdown gợi ý
  closeSuggestions = () => {
    this.setState({
      showSuggestions: false,
      activeSuggestionIndex: null,
      phoneEditingIndex: null,
    });
  };
  // Đóng dropdown gợi ý shipment
  closeShipmentSuggestions = () => {
    this.setState({
      showShipmentSuggestions: false,
      activeShipmentSuggestionIndex: null,
      shipmentPhoneEditingIndex: null,
    });
  };

  // Hàm sắp xếp danh sách khách hàng theo độ khớp với số điện thoại
  sortCustomersByMatch = (customers, searchPhone) => {
    if (!searchPhone || !customers || customers.length === 0) return customers;

    return [...customers].sort((a, b) => {
      const phoneA = (a.phone || "").toString();
      const phoneB = (b.phone || "").toString();

      // Kiểm tra số nào khớp từ đầu (ưu tiên cao nhất)
      const aStartsWith = phoneA.startsWith(searchPhone);
      const bStartsWith = phoneB.startsWith(searchPhone);

      if (aStartsWith && !bStartsWith) return -1;
      if (!aStartsWith && bStartsWith) return 1;

      // Nếu cả hai đều khớp từ đầu, ưu tiên số ngắn hơn (chính xác hơn)
      if (aStartsWith && bStartsWith) {
        return phoneA.length - phoneB.length;
      }

      // Kiểm tra số nào chứa chuỗi tìm kiếm
      const aIncludes = phoneA.includes(searchPhone);
      const bIncludes = phoneB.includes(searchPhone);

      if (aIncludes && !bIncludes) return -1;
      if (!aIncludes && bIncludes) return 1;

      // Nếu cả hai đều chứa, ưu tiên vị trí xuất hiện sớm hơn
      if (aIncludes && bIncludes) {
        return phoneA.indexOf(searchPhone) - phoneB.indexOf(searchPhone);
      }

      return 0;
    });
  };

  onChangeCustomer = (index, e) => {
    const { name, value } = e.target;
    const customers = [...this.state.customers];

    // Xử lý khi thay đổi số điện thoại
    if (name === "phone") {
      //  Chỉ cho phép nhập số (0-9)
      const onlyNumbers = value.replace(/[^0-9]/g, "");

      customers[index][name] = onlyNumbers;
      this.setState({ customers, currentSearchPhone: onlyNumbers });

      // Tìm kiếm gợi ý
      this.searchCustomerByPhone(index, onlyNumbers);
      return;
    }

    // Xử lý các trường giá tiền
    if (name === "price" || name === "total_card") {
      let rawValue = value.replace(/,/g, "");

      if (rawValue === "") {
        customers[index][name] = "";
      } else if (!isNaN(rawValue)) {
        customers[index][name] = this.formatMoney(rawValue);
      }

      const total_card = this.parseMoney(customers[index].total_card || 0);
      const price = this.parseMoney(customers[index].price || 0);
      customers[index].total_price = this.formatMoney(total_card * price);
    } else {
      customers[index][name] = value;
    }

    this.setState({ customers });
  };
  selectCustomerFromSuggestion = (index, customer) => {
    const customers = [...this.state.customers];

    customers[index].username = customer.username || "";
    customers[index].phone = customer.phone || "";
    customers[index].pickup_point = customer.pickup_point || "";
    customers[index].dropoff_point = customer.dropoff_point || "";

    this.setState({
      customers,
      showSuggestions: false,
      activeSuggestionIndex: null,
      phoneEditingIndex: null,
      currentSearchPhone: "",
    });
  };
  // Chọn khách hàng từ gợi ý cho shipment
  selectShipmentCustomerFromSuggestion = (index, customer) => {
    const shipments = [...this.state.shipments];

    shipments[index].customer_name = customer.username || "";
    shipments[index].phone = customer.phone || "";
    shipments[index].pickup_point = customer.pickup_point || "";
    shipments[index].dropoff_point = customer.dropoff_point || "";

    this.setState({
      shipments,
      showShipmentSuggestions: false,
      activeShipmentSuggestionIndex: null,
      shipmentPhoneEditingIndex: null,
      currentSearchShipmentPhone: "",
    });
  };

  addCustomer = () => {
    this.setState({
      customers: [
        ...this.state.customers,
        {
          id: uuidv4(),
          username: "",
          phone: "",
          pickup_point: "",
          dropoff_point: "",
          total_card: "",
          price: "",
          total_price: 0,
          status: "1",
        },
      ],
    });
  };

  deleteCustomer = (id) => {
    this.setState({
      customers: this.state.customers.filter((c) => c.id !== id),
    });
  };

  onChangeShipment = (index, e) => {
    const { name, value } = e.target;
    const shipments = [...this.state.shipments];

    // Xử lý khi thay đổi số điện thoại
    if (name === "phone") {
      //  Chỉ cho phép nhập số (0-9)
      const onlyNumbers = value.replace(/[^0-9]/g, "");
      shipments[index][name] = onlyNumbers;
      this.setState({ shipments, currentSearchShipmentPhone: onlyNumbers });
      this.searchShipmentCustomerByPhone(index, onlyNumbers);
      return;
    }

    if (name === "price" || name === "quantity") {
      let rawValue = value.replace(/,/g, "");

      if (rawValue === "") {
        shipments[index][name] = "";
      } else if (!isNaN(rawValue)) {
        shipments[index][name] = this.formatMoney(rawValue);
      }

      const quantity = this.parseMoney(shipments[index].quantity || 0);
      const price = this.parseMoney(shipments[index].price || 0);
      shipments[index].total_price = this.formatMoney(quantity * price);
    } else {
      shipments[index][name] = value;
    }

    this.setState({ shipments });
  };

  addShipment = () => {
    this.setState({
      shipments: [
        ...this.state.shipments,
        {
          id: uuidv4(),
          id_new: true,
          name: "",
          customer_name: "",
          quantity: "",
          price: "",
          total_price: 0,
          status: "P",
          pickup_point: "",
          dropoff_point: "",
          phone: "",
        },
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
    const { store_code } = this.props;
    const customers = this.state.customers.map((c) => ({
      ...c,
      price: this.parseMoney(c.price),
      total_card: this.parseMoney(c.total_card),
      total_price: this.parseMoney(c.total_price),
    }));

    const shipments = this.state.shipments.map((s) => ({
      ...s,
      price: this.parseMoney(s.price),
      quantity: this.parseMoney(s.quantity),
      total_price: this.parseMoney(s.total_price),
    }));

    const Formdata = {
      date: this.state.date,
      car_id: this.state.car_id,
      route_name: this.state.route_name,
      driver_1: this.state.driver_1,
      driver_2: this.state.driver_2,
      assistant_1: this.state.assistant_1,
      assistant_2: this.state.assistant_2,
      customers,
      shipments,
    };

    this.props.createTrip(store_code, Formdata, this, function () {
      window.$(".modal").modal("hide");
    });
  };

  componentDidMount() {
    var { store_code } = this.props;
    this.props.fetchCarList(store_code);
    this.props.fetchEmployeeList(store_code);
    window.$("#modalAddress").on("shown.bs.modal", () => {
      console.log("nghĩa đẹp trai");
      this.setState({
        date: "",
        car_id: "",
        route_name: "",
        driver_1: "",
        driver_2: "",
        assistant_1: "",
        assistant_2: "",
        customers: [],
        shipments: [],
        errors: {},
      });
    });
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
    const customerListData = normalizeData(this.props.customerList);

    // Sắp xếp danh sách khách hàng theo độ khớp
    const sortedCustomerList = this.sortCustomersByMatch(
      customerListData,
      this.state.currentSearchPhone
    );
    // Thêm danh sách gợi ý cho shipment
    const sortedShipmentCustomerList = this.sortCustomersByMatch(
      customerListData,
      this.state.currentSearchShipmentPhone
    );

    const drivers = employeeList?.filter(
      (emp) => emp.rule == "1" && emp.status == "1"
    );
    const assistants = employeeList?.filter(
      (emp) => emp.rule == "2" && emp.status == "1"
    );

    const {
      errors,
      customers,
      shipments,
      car_id,
      showSuggestions,
      activeSuggestionIndex,
      showShipmentSuggestions,
      activeShipmentSuggestionIndex,
    } = this.state;

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
                <h4 style={{ color: "white", margin: "10px" }}>
                  Thêm chuyến đi mới
                </h4>
                <button type="button" className="close" data-dismiss="modal">
                  &times;
                </button>
              </div>

              <div className="modal-body">
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
                          onChange={this.onChange}
                        />
                        {errors.date && (
                          <div className="validation">{errors.date}</div>
                        )}
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="form-group">
                        <label>Xe</label>
                        <Select
                          instanceId="select-car"
                          value={
                            cars_filter
                              ?.map((car) => ({
                                value: car.id,
                                label: car.number,
                              }))
                              .find((opt) => opt.value === this.state.car_id) ||
                            null
                          }
                          onChange={(selected) =>
                            this.setState({
                              car_id: selected ? selected.value : "",
                            })
                          }
                          options={cars_filter?.map((car) => ({
                            value: car.id,
                            label: car.number,
                          }))}
                          placeholder="-- Chọn xe --"
                          isClearable
                        />
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="form-group">
                        <label>Tuyến đường</label>
                        <Select
                          instanceId="select-route"
                          value={
                            [
                              { value: 1, label: "Nam Định đi Sài Gòn" },
                              { value: 2, label: "Sài Gòn đi Nam Định" },
                            ].find(
                              (opt) => opt.value === this.state.route_name
                            ) || null
                          }
                          onChange={(selected) =>
                            this.setState({
                              route_name: selected ? selected.value : "",
                            })
                          }
                          options={[
                            { value: 1, label: "Nam Định đi Sài Gòn" },
                            { value: 2, label: "Sài Gòn đi Nam Định" },
                          ]}
                          placeholder="-- Chọn tuyến đường --"
                          isClearable
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    {[
                      { field: "driver_1", label: "Tài xế 1" },
                      { field: "driver_2", label: "Tài xế 2" },
                    ].map(({ field, label }, i) => (
                      <div className="col-3" key={field}>
                        <div className="form-group">
                          <label>{label}</label>
                          <Select
                            instanceId={`select-${field}`}
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
                            onChange={(selected) =>
                              this.setState({
                                [field]: selected ? selected.value : "",
                              })
                            }
                            options={drivers.map((emp) => ({
                              value: emp.id,
                              label: emp.username,
                            }))}
                            placeholder="-- Chọn tài xế --"
                            isClearable
                          />
                        </div>
                      </div>
                    ))}

                    {[
                      { field: "assistant_1", label: "Phụ xe 1" },
                      { field: "assistant_2", label: "Phụ xe 2" },
                    ].map(({ field, label }, i) => (
                      <div className="col-3" key={field}>
                        <div className="form-group">
                          <label>{label}</label>
                          <Select
                            instanceId={`select-${field}`}
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
                            onChange={(selected) =>
                              this.setState({
                                [field]: selected ? selected.value : "",
                              })
                            }
                            options={assistants.map((emp) => ({
                              value: emp.id,
                              label: emp.username,
                            }))}
                            placeholder="-- Chọn phụ xe --"
                            isClearable
                          />
                        </div>
                      </div>
                    ))}
                  </div>

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
                          <td>
                            <input
                              type="text"
                              name="username"
                              className="form-control form-control-sm"
                              value={c.username}
                              onChange={(e) => this.onChangeCustomer(idx, e)}
                            />
                          </td>
                          <td style={{ position: "relative" }}>
                            <input
                              type="text"
                              name="phone"
                              className="form-control form-control-sm"
                              value={c.phone}
                              onChange={(e) => this.onChangeCustomer(idx, e)}
                              placeholder="Nhập SĐT..."
                              onBlur={() => {
                                // Delay để có thể click vào suggestion trước khi đóng
                                setTimeout(() => this.closeSuggestions(), 200);
                              }}
                            />
                            {/* Dropdown gợi ý - CHỈ HIỂN THỊ để tham khảo */}
                            {showSuggestions &&
                              activeSuggestionIndex === idx &&
                              sortedCustomerList.length > 0 && (
                                <div
                                  style={{
                                    position: "absolute",
                                    top: "100%",
                                    left: 0,
                                    right: 0,
                                    backgroundColor: "white",
                                    border: "1px solid #ddd",
                                    borderRadius: "4px",
                                    maxHeight: "200px",
                                    overflowY: "auto",
                                    zIndex: 1000,
                                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                                  }}
                                >
                                  <div
                                    style={{
                                      padding: "8px 12px",
                                      backgroundColor: "#f8f9fa",
                                      borderBottom: "1px solid #dee2e6",
                                      fontSize: "12px",
                                      fontWeight: "500",
                                      color: "#6c757d",
                                    }}
                                  >
                                    Gợi ý (chỉ để tham khảo):
                                  </div>
                                  {sortedCustomerList.map((customer, i) => {
                                    const phone = (
                                      customer.phone || ""
                                    ).toString();
                                    const searchPhone =
                                      this.state.currentSearchPhone || "";
                                    const isExactMatch =
                                      phone.startsWith(searchPhone);

                                    return (
                                      <div
                                        key={i}
                                        onClick={() =>
                                          this.selectCustomerFromSuggestion(
                                            idx,
                                            customer
                                          )
                                        }
                                        style={{
                                          cursor: "pointer",
                                          padding: "8px 12px",
                                          borderBottom:
                                            i < sortedCustomerList.length - 1
                                              ? "1px solid #eee"
                                              : "none",
                                          backgroundColor: isExactMatch
                                            ? "#e8f5e9"
                                            : "white",
                                        }}
                                      >
                                        <div
                                          style={{
                                            fontWeight: "500",
                                            color: isExactMatch
                                              ? "#2e7d32"
                                              : "#212529",
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "4px",
                                          }}
                                        >
                                          📞 {customer.phone}
                                          {isExactMatch && (
                                            <span
                                              style={{
                                                fontSize: "10px",
                                                color: "#4caf50",
                                              }}
                                            >
                                              ✓ Khớp
                                            </span>
                                          )}
                                        </div>
                                        <div
                                          style={{
                                            fontSize: "12px",
                                            color: "#6c757d",
                                          }}
                                        >
                                          👤{" "}
                                          {customer.username || "Chưa có tên"}
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              )}
                          </td>
                          <td>
                            <input
                              type="text"
                              name="pickup_point"
                              className="form-control form-control-sm"
                              value={c.pickup_point}
                              onChange={(e) => this.onChangeCustomer(idx, e)}
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              name="dropoff_point"
                              className="form-control form-control-sm"
                              value={c.dropoff_point}
                              onChange={(e) => this.onChangeCustomer(idx, e)}
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              name="total_card"
                              className="form-control form-control-sm"
                              value={c.total_card}
                              onChange={(e) => this.onChangeCustomer(idx, e)}
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              name="price"
                              className="form-control form-control-sm"
                              value={c.price}
                              onChange={(e) => this.onChangeCustomer(idx, e)}
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              className="form-control form-control-sm"
                              value={c.total_price}
                              readOnly
                            />
                          </td>
                          <td>
                            <select
                              name="status"
                              className="form-select form-select-sm"
                              value={c.status}
                              onChange={(e) => this.onChangeCustomer(idx, e)}
                            >
                              <option value="1">Chờ đón</option>
                              <option value="2">Đã lên xe</option>
                              <option value="3">Hủy chuyến</option>
                              <option value="4">Tiền mặt</option>
                              <option value="5">Chuyển khoản</option>
                            </select>
                          </td>
                          <td>
                            <button
                              type="button"
                              className="btn btn-danger btn-sm"
                              onClick={() => this.deleteCustomer(c.id)}
                            >
                              Xóa
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <button
                    type="button"
                    className="btn btn-sm btn-success"
                    onClick={this.addCustomer}
                  >
                    + Thêm khách hàng
                  </button>

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
                        <th></th>
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
                              onChange={(e) => this.onChangeShipment(idx, e)}
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              name="customer_name"
                              className="form-control form-control-sm"
                              value={s.customer_name}
                              onChange={(e) => this.onChangeShipment(idx, e)}
                            />
                          </td>
                          <td style={{ position: "relative" }}>
                            <input
                              type="text"
                              name="phone"
                              className="form-control form-control-sm"
                              value={s.phone}
                              onChange={(e) => this.onChangeShipment(idx, e)}
                              placeholder="Nhập SĐT..."
                              onBlur={() => {
                                setTimeout(
                                  () => this.closeShipmentSuggestions(),
                                  200
                                );
                              }}
                            />
                            {/* Dropdown gợi ý cho Shipment */}
                            {showShipmentSuggestions &&
                              activeShipmentSuggestionIndex === idx &&
                              sortedShipmentCustomerList.length > 0 && (
                                <div
                                  style={{
                                    position: "absolute",
                                    top: "100%",
                                    left: 0,
                                    right: 0,
                                    backgroundColor: "white",
                                    border: "1px solid #ddd",
                                    borderRadius: "4px",
                                    maxHeight: "200px",
                                    overflowY: "auto",
                                    zIndex: 1000,
                                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                                  }}
                                >
                                  <div
                                    style={{
                                      padding: "8px 12px",
                                      backgroundColor: "#f8f9fa",
                                      borderBottom: "1px solid #dee2e6",
                                      fontSize: "12px",
                                      fontWeight: "500",
                                      color: "#6c757d",
                                    }}
                                  >
                                    Gợi ý (chỉ để tham khảo):
                                  </div>
                                  {sortedShipmentCustomerList.map(
                                    (customer, i) => {
                                      const phone = (
                                        customer.phone || ""
                                      ).toString();
                                      const searchPhone =
                                        this.state.currentSearchShipmentPhone ||
                                        "";
                                      const isExactMatch =
                                        phone.startsWith(searchPhone);

                                      return (
                                        <div
                                          key={i}
                                          onClick={() =>
                                            this.selectShipmentCustomerFromSuggestion(
                                              idx,
                                              customer
                                            )
                                          }
                                          style={{
                                            cursor: "pointer",
                                            padding: "8px 12px",
                                            borderBottom:
                                              i <
                                              sortedShipmentCustomerList.length -
                                                1
                                                ? "1px solid #eee"
                                                : "none",
                                            backgroundColor: isExactMatch
                                              ? "#e8f5e9"
                                              : "white",
                                          }}
                                        >
                                          <div
                                            style={{
                                              fontWeight: "500",
                                              color: isExactMatch
                                                ? "#2e7d32"
                                                : "#212529",
                                              display: "flex",
                                              alignItems: "center",
                                              gap: "4px",
                                            }}
                                          >
                                            📞 {customer.phone}
                                            {isExactMatch && (
                                              <span
                                                style={{
                                                  fontSize: "10px",
                                                  color: "#4caf50",
                                                }}
                                              >
                                                ✓ Khớp
                                              </span>
                                            )}
                                          </div>
                                          <div
                                            style={{
                                              fontSize: "12px",
                                              color: "#6c757d",
                                            }}
                                          >
                                            👤{" "}
                                            {customer.username || "Chưa có tên"}
                                          </div>
                                        </div>
                                      );
                                    }
                                  )}
                                </div>
                              )}
                          </td>
                          <td>
                            <input
                              type="text"
                              name="pickup_point"
                              className="form-control form-control-sm"
                              value={s.pickup_point}
                              onChange={(e) => this.onChangeShipment(idx, e)}
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              name="dropoff_point"
                              className="form-control form-control-sm"
                              value={s.dropoff_point}
                              onChange={(e) => this.onChangeShipment(idx, e)}
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              name="quantity"
                              className="form-control form-control-sm"
                              value={s.quantity}
                              onChange={(e) => this.onChangeShipment(idx, e)}
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              name="price"
                              className="form-control form-control-sm"
                              value={s.price}
                              onChange={(e) => this.onChangeShipment(idx, e)}
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              className="form-control form-control-sm"
                              value={s.total_price}
                              readOnly
                            />
                          </td>
                          <td>
                            <select
                              name="status"
                              className="form-select form-select-sm"
                              value={s.status}
                              onChange={(e) => this.onChangeShipment(idx, e)}
                            >
                              <option value="P">Tiền mặt</option>
                              <option value="C">Chuyển khoản</option>
                            </select>
                          </td>
                          <td>
                            <button
                              type="button"
                              className="btn btn-danger btn-sm"
                              onClick={() => this.deleteShipment(s.id)}
                            >
                              Xóa
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <button
                    type="button"
                    className="btn btn-sm btn-success"
                    onClick={this.addShipment}
                  >
                    + Thêm hàng gửi
                  </button>
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
                <button
                  type="submit"
                  onClick={this.handleOnClick}
                  className="btn btn-warning"
                >
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
    customerList: state.storeReducers.store.customerList,
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
    createTrip: (id, form, $this, funcModal) => {
      dispatch(dashboardAction.createTrip(id, form, $this, funcModal));
    },
    fetchCustomerList: (store_code, page, params) => {
      dispatch(dashboardAction.fetchCustomerList(store_code, page, params));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ModalCreateTrip);
