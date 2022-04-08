import React, { Component } from "react";
import Sidebar from "../../../components/Partials/Sidebar";
import Topbar from "../../../components/Partials/Topbar";
import Footer from "../../../components/Partials/Footer";
import Table from "../../../components/Timekeeping/TimeSheet/Table";

import Alert from "../../../components/Partials/Alert";
import * as Types from "../../../constants/ActionType";

import * as timeSheetAction from "../../../actions/time_sheet";
import { Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import NotAccess from "../../../components/Partials/NotAccess";

import Loading from "../../Loading";
import { shallowEqual } from "../../../ultis/shallowEqual";

import moment from "moment";
import * as helper from "../../../ultis/helpers";
import ModalPostDate from "../../../components/Timekeeping/TimeSheet/ModalPostDates";
// import ModalPut from "../../../components/Timekeeping/CalendarShift/PutALot/Modal";

import { DateRangePickerComponent } from "@syncfusion/ej2-react-calendars";
class TimeSheet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      typeSelect: "Ngày",
      datePrime: "",
      typeDate: "DAY",
      reset: "",
    };
  }

  componentDidMount() {
    var { store_code } = this.props.match.params;
    const branch_id = localStorage.getItem("branch_id");
    this.setState({
      datePrime: {
        from: moment().format("YYYY-MM-DD"),
        to: moment().format("YYYY-MM-DD"),
      },
    });
    const time = moment().format("YYYY-MM-DD");

    var params = `date_from=${time}&date_to=${time}`;

    this.props.fetchAllTimeSheet(store_code, branch_id, params);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.datePrime !== nextState.datePrime) {
      const param = `date_from=${nextState.datePrime.from}&date_to=${nextState.datePrime.to}`;

      var { store_code } = this.props.match.params;
      const branch_id = localStorage.getItem("branch_id");
      this.props.fetchAllTimeSheet(store_code, branch_id, param);
    }
    return true;
  }
  handleGetDatePost = (date, typeSelect) => {
    this.setState({
      datePrime: {
        from: date.datePrime.from,
        to: date.datePrime.to,
      },

      typeSelect: typeSelect,
    });
  };
  onchangeDate = (value) => {
    var resetId = helper.randomString(10);
    var typeSelect =
      value == "DAY"
        ? "Ngày"
        : value == "WEEK"
        ? "Tuần"
        : value == "MONTH"
        ? "Tháng"
        : "Tùy chọn";
    this.setState({ typeDate: value, reset: resetId, typeSelect: typeSelect });
  };
  onChange = (e) => {
    var target = e.target;
    var name = target.name;
    var value = target.value;

    this.setState({
      [name]: value,
    });
  };

  render() {
    var { store_code } = this.props.match.params;
    const branch_id = localStorage.getItem("branch_id");
    var { timeSheet } = this.props;
    var {
      isShow,
      typeSelect,
      typeDate,
      reset,

      datePrime,
    } = this.state;
    if (this.props.auth) {
      return (
        <div id="wrapper">
          <Sidebar store_code={store_code} />
          <div className="col-10 col-10-wrapper">
            <div id="content-wrapper" className="d-flex flex-column">
              <div id="content">
                <Topbar store_code={store_code} />

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
                    <h4 className="h4 title_content mb-0 text-gray-800">
                      Bảng công
                    </h4>{" "}
                  </div>

                  <br></br>
                  <div className="card shadow ">
                    <div class="card-header py-3">
                      <div
                        class="row"
                        style={{
                          "justify-content": "space-between",
                          alignItems: "center",
                        }}
                      >
                        {/* <div className={this.state.showDateTime}>
                          <DateRangePickerComponent
                            id="daterangepicker"
                            placeholder="Chọn từ ngày... đến ngày..."
                            format="dd-MM-yyyy"
                            onChange={this.onchangeDateFromTo}
                          />
                        </div> */}
                        <div class="dropdown">
                          <button
                            style={{
                              background: "white",
                              border: "0px",
                              color: "#4141bb",
                            }}
                            class="btn btn-secondary dropdown-toggle"
                            type="button"
                            id="dropdownMenuButton"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            {typeSelect}
                          </button>
                          <div
                            class="dropdown-menu"
                            aria-labelledby="dropdownMenuButton"
                          >
                            <p
                              // data-toggle="modal"
                              // data-target="#postDateModal"
                              onClick={() => this.onchangeDate("DAY")}
                              class="dropdown-item"
                              style={{ cursor: "pointer" }}
                            >
                              Ngày
                            </p>
                            <p
                              // data-toggle="modal"
                              // data-target="#postDateModal"
                              onClick={() => this.onchangeDate("WEEK")}
                              class="dropdown-item"
                              style={{ cursor: "pointer" }}
                            >
                              Tuần{" "}
                            </p>
                            <p
                              // data-toggle="modal"
                              // data-target="#postDateModal"
                              onClick={() => this.onchangeDate("MONTH")}
                              class="dropdown-item"
                              style={{ cursor: "pointer" }}
                            >
                              Tháng
                            </p>
                            <p
                              onClick={() => this.onchangeDate("OPTION")}
                              class="dropdown-item"
                              style={{ cursor: "pointer" }}
                            >
                              Tùy chỉnh
                            </p>
                          </div>
                        </div>
                        <ModalPostDate
                          reset={reset}
                          handleGetDatePost={this.handleGetDatePost}
                          store_code={store_code}
                          typeDate={typeDate}
                        />
                      </div>
                    </div>

                    <div className="card-body">
                      <Table
                        store_code={store_code}
                        branch_id={branch_id}
                        timeSheet={timeSheet}
                        datePrime={datePrime}
                        typeDate={typeDate}
                      />
                    </div>
                  </div>
                </div>
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
    // shifts: state.shiftReducers.shift.allShift,
    alert: state.comboReducers.alert.alert_success,
    permission: state.authReducers.permission.data,
    timeSheet: state.timeSheetReducers.timeSheet.allTimeSheet,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchAllTimeSheet: (store_code, branch_id, params) => {
      dispatch(
        timeSheetAction.fetchAllTimeSheet(store_code, branch_id, params)
      );
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TimeSheet);
