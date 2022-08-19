import React, { Component } from "react";
import { connect } from "react-redux";
import * as ScheduleAction from "../../../actions/schedule";
import Datetime from "react-datetime";
import moment from "moment";
import MomentInput from "react-moment-input";
import { isEmail, isEmpty, isPhone } from "../../../ultis/helpers";
import * as AgencyAction from "../../../actions/agency";

import * as Types from "../../../constants/ActionType";
class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      day_of_month: 1,
      day_of_week: 0,
      description: "",
      group_customer: "0",
      group_customer: 0,
      agency_type_id: null,
      status: 0,
      time_of_day: "00:00",
      time_run: moment(),
      time_run_near: "",
      title: "",
      type_schedule: "0",
    };
  }

  componentDidMount() {
    this.props.fetchAllAgencyType(this.props.store_code);
  }

  showAllDayofMonth = () => {
    var numDays = moment().daysInMonth();
    var result = [];
    if (numDays > 0) {
      for (let index = 1; index < numDays + 1; index++) {
        result.push(<option value={index}>{index}</option>);
      }

      return result;
    } else {
      return null;
    }
  };

  onChange = (e) => {
    var { value, name } = e.target;
    if (name == "type_schedule") {
      this.setState({ [name]: value, time_of_day: "00:00" });
    } else {
      this.setState({ [name]: value });
    }
  };

  onSave = (e) => {
    var { store_code } = this.props;
    e.preventDefault();
    console.log(this.state);
    var {
      type_schedule,
      day_of_month,
      day_of_week,
      description,
      group_customer,
      status,
      time_of_day,
      time_run,
      time_run_near,
      title,
      type_schedule,
    } = this.state;
    var { group_customer, agency_type_id } = this.state;
    var agency_type_name =
      this.props.types.filter((v) => v.id === parseInt(agency_type_id))?.[0]
        ?.name || null;
    console.log(this.props.types, agency_type_name);
    var form = {
      group_customer,
      agency_type_id,
      agency_type_name,
      type_schedule,
      day_of_month,
      day_of_week,
      description,
      group_customer,
      status,
      time_of_day,
      time_run: time_run != "" && time_run != null ? moment(time_run, "DD-MM-YYYY HH:mm:ss").format("YYYY-MM-DD HH:mm:ss") : null,
      time_run_near,
      title,
      type_schedule,
    };
    if (
      this.state.title == null ||
      !isEmpty(this.state.title) ||
      !isEmpty(this.state.description)
    ) {
      this.props.showError({
        type: Types.ALERT_UID_STATUS,
        alert: {
          type: "danger",
          title: "Lỗi",
          disable: "show",
          content: "Vui lòng nhập đầy đủ thông tin tiêu đề và mô tả",
        },
      });
      return;
    }
    if (Number(type_schedule) == 0) {
      console.log("dadsasdasdadasd");
      form.time_of_day = null;
      form.day_of_week = null;
      form.day_of_month = null;
      form.time_run_near = null;
    } else if (Number(type_schedule) == 1) {
      form.time_run = null;
      form.day_of_week = null;
      form.day_of_month = null;
      form.time_run_near = null;
    } else if (Number(type_schedule) == 2) {
      form.time_run = null;
      form.day_of_month = null;
      form.time_run_near = null;
    } else {
      form.time_run = null;
      form.day_of_week = null;
      form.time_run_near = null;
    }
 
    this.props.createSchedule(store_code, form);
  };
  goBack = () => {
    var { history } = this.props;
    history.goBack();
  };

  onChangeDate = (e, name) => {
    var time = "";
    switch (name) {
      case "time_run":
        time = moment(e, "DD-MM-YYYY HH:mm:ss").format("YYYY-MM-DD HH:mm:ss");
        break;
      case "time_of_day":
        time = moment(e, "HH:mm:ss").format("HH:mm:ss");
        break;
      default:
        break;
    }

    this.setState({
      [name]: time,
    });
  };
  render() {
    var {
      type_schedule,
      day_of_month,
      day_of_week,
      description,
      group_customer,
      status,
      time_of_day,
      time_run,
      time_run_near,
      title,
      type_schedule,
      group_customer,
      agency_type_id,
    } = this.state;
    var disable_oneDay = type_schedule == "0" ? "show" : "hide";
    var disable_everyDay = type_schedule == "1" ? "show" : "hide";
    var disable_everyWeek = type_schedule == "2" ? "show" : "hide";
    var disable_everyMonth = type_schedule == "3" ? "show" : "hide";
    var { types } = this.props;

    console.log("gio",time_run)
    return (
      <React.Fragment>
        <form role="form" onSubmit={this.onSave} method="post">
          <div class="box-body">
            <div class="form-group">
              <label for="product_name">Tiêu đề</label>
              <input
                type="text"
                class="form-control"
                id="txtTitle"
                value={title}
                name="title"
                placeholder="Nhập tiêu đề"
                autocomplete="off"
                onChange={this.onChange}
              />
            </div>

            <div class="form-group">
              <label for="product_name">Mô tả</label>
              <input
                type="text"
                class="form-control"
                id="description"
                value={description}
                name="description"
                placeholder="Nhập mô tả"
                autocomplete="off"
                onChange={this.onChange}
              />
            </div>

            <div class="form-group">
              <label for="product_name">Gửi tới</label>

              <select
                name="group_customer"
                onChange={this.onChange}
                id="input"
                class="form-control"
              >
                <option value="0">Tất cả</option>
                <option value="1">Khách hàng có ngày sinh nhật</option>
                <option value="2">Đại lý</option>
                <option value="3">Cộng tác viên</option>
              </select>
              {group_customer == 2 && (
                <select
                  onChange={this.onChange}
                  value={agency_type_id}
                  name="agency_type_id"
                  class="form-control"
                  style={{marginTop: "10px"}}
                >
                  <option>--- Chọn cấp đại lý ---</option>
                  {types.map((v) => {
                    return <option value={v.id}>{v.name}</option>;
                  })}
                </select>
              )}
            </div>

            <div class="form-group">
              <label for="product_name">Kiểu thông báo</label>

              <select
                name="type_schedule"
                id="input"
                class="form-control"
                onChange={this.onChange}
              >
                <option value="0">Một lần</option>

                <option value="1">Hàng ngày</option>
                <option value="2">Hàng tuần</option>
                <option value="3">Hàng tháng</option>
              </select>
            </div>

            <div className={disable_oneDay}>
              <div class="form-group">
                <label for="product_name">Thời gian thông báo trong ngày</label>

                <div className="set-top-moment">
                  <MomentInput
                    value={moment(time_run)}
                    format="DD-MM-YYYY HH:mm"
                    options={true}
                    enableInputClick={true}
                    monthSelect={true}
                    readOnly={true}
                    translations={{
                      DATE: "Ngày",
                      TIME: "Giờ",
                      SAVE: "Lưu",
                      HOURS: "Giờ",
                      MINUTES: "Phút",
                    }}
                    onSave={() => {}}
                    onChange={(e) => this.onChangeDate(e, "time_run")}
                  />
                </div>
                {/* <Datetime
                  inputProps={{
                    placeholder: "Chọn ngày (dd:mm:yyyy hh:mm)",
                  }}
                  value={time_run}
                  onChange={(e) => this.onChangeDate(e, "time_run")}
                  dateFormat="DD-MM-YYYY"
                  timeFormat="HH:mm:ss"

                />
                 */}
              </div>
            </div>
            <div className={disable_everyDay}>
              <div class="form-group">
                <label for="product_name">Thời gian thông báo trong ngày</label>
                <div className="set-top-moment">
                  <MomentInput
                    value={moment(time_of_day, "HH:mm")}
                    format="HH:mm"
                    options={false}
                    enableInputClick={true}
                    readOnly={true}
                    tab={1}
                    translations={{
                      SAVE: "Lưu",
                      HOURS: "Giờ",
                      MINUTES: "Phút",
                    }}
                    onSave={() => {}}
                    onChange={(e) => this.onChangeDate(e, "time_of_day")}
                  />
                  {/* <Datetime
                  inputProps={{
                    placeholder: "Chọn thời gian (hh:mm)",
                  }}
                  value={time_of_day}
                  onChange={(e) => this.onChangeDate(e, "time_of_day")}
                  dateFormat={false}
                  timeFormat="HH:mm:ss"
                /> */}
                </div>
              </div>
            </div>

            <div className={disable_everyWeek}>
              <div class="form-group">
                <label for="product_name">Chọn ngày</label>

                <select
                  name="day_of_week"
                  value={day_of_week}
                  onChange={this.onChange}
                  id="input"
                  class="form-control"
                >
                  <option value="0">Thứ 2</option>
                  <option value="1">Thứ 3</option>
                  <option value="2">Thứ 4</option>
                  <option value="3">Thứ 5</option>
                  <option value="4">Thứ 6</option>
                  <option value="5">Thứ 7</option>
                  <option value="6">Chủ Nhật</option>
                </select>
              </div>

              <div class="form-group">
                <label for="product_name">Thời gian thông báo trong ngày</label>
                <div className="set-top-moment">
                  <MomentInput
                    value={moment(time_of_day, "HH:mm")}
                    format="HH:mm"
                    options={false}
                    enableInputClick={true}
                    readOnly={true}
                    tab={1}
                    translations={{
                      SAVE: "Lưu",
                      HOURS: "Giờ",
                      MINUTES: "Phút",
                    }}
                    onSave={() => {}}
                    onChange={(e) => this.onChangeDate(e, "time_of_day")}
                  />
                </div>
              </div>
            </div>
            <div className={disable_everyMonth}>
              <div class="form-group">
                <label for="product_name">Chọn ngày</label>

                <select
                  name="day_of_month"
                  value={day_of_month}
                  onChange={this.onChange}
                  id="input"
                  class="form-control"
                >
                  {this.showAllDayofMonth()}
                </select>
              </div>
              <div class="form-group">
                <label for="product_name">Thời gian thông báo trong ngày</label>
                <div className="set-top-moment">
                  <MomentInput
                    value={moment(time_of_day, "HH:mm")}
                    format="HH:mm"
                    options={false}
                    enableInputClick={true}
                    readOnly={true}
                    tab={1}
                    translations={{
                      SAVE: "Lưu",
                      HOURS: "Giờ",
                      MINUTES: "Phút",
                    }}
                    onSave={() => {}}
                    onChange={(e) => this.onChangeDate(e, "time_of_day")}
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="box-footer">
            <button type="submit" class="btn btn-info   btn-sm">
              <i class="fas fa-plus"></i> Tạo
            </button>
            <button
              type="button"
              style={{ marginLeft: "10px" }}
              onClick={this.goBack}
              class="btn btn-warning   btn-sm"
            >
              <i class="fas fa-arrow-left"></i> Trở về
            </button>
          </div>
        </form>
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    types: state.agencyReducers.agency.allAgencyType,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchAllAgencyType: (store_code) => {
      dispatch(AgencyAction.fetchAllAgencyType(store_code));
    },
    createSchedule: (store_code, data) => {
      dispatch(ScheduleAction.createSchedule(store_code, data));
    },
    showError: (error) => {
      dispatch(error);
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Form);
