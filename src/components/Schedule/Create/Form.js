import React, { Component } from "react";
import { connect } from "react-redux";
import * as ScheduleAction from "../../../actions/schedule";
import Datetime from "react-datetime";
import moment from "moment";
class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      day_of_month: "",
      day_of_week: "",
      description: "",
      group_customer: "0",
      status: 0,
      time_of_day: "",
      time_run: "",
      time_run_near: "",
      title: "",
      type_schedule: "0",
    };
  }




  onChange = (e) => {
    var target = e.target;
    var name = target.name;
    var value = target.value;

    this.setState({
      [name]: value,
    });
  };


  showAllDayofMonth = () => {
    var numDays = moment().daysInMonth()
    var result = []
    if (numDays > 0) {
      for (let index = 1; index < numDays + 1; index++) {
        result.push(<option value={index}>{index}</option>)
      }

      return result
    }
    else {
      return null
    }
  }

  onChange = (e) => {
    var { value, name } = e.target
    this.setState({ [name]: value })

  }

  onSave = (e) => {
    var { store_code } = this.props
    e.preventDefault();
    console.log(this.state)
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
    var form = {
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
    };
    if(Number(type_schedule ) == 0)
    {
      console.log("dadsasdasdadasd")
      form.time_of_day =null
      form.day_of_week =null
      form.day_of_month = null
      form.time_run_near = null
    }
    else if(Number(type_schedule) == 1)
    {
     form.time_run = null
     form.day_of_week = null
     form.day_of_month = null
     form.time_run_near = null
    }
    else if(Number(type_schedule) == 2)
    {
     form.time_run= null
     form.day_of_month = null
     form.time_run_near = null
    }
    else
    {
     form.time_run = null
     form.day_of_week = null
     form.time_run_near =null

    }
    console.log(form)
    this.props.createSchedule(store_code, form);
  };
  goBack = () => {
    var { history } = this.props;
    history.goBack();
  };

  onChangeDate = (e, name) => {
    var time = ""
    switch (name) {
      case "time_run":
        time = moment(e, "DD-MM-YYYY HH:mm:ss").format("YYYY-MM-DD HH:mm:ss");
        break;
      case "time_of_day":
        time = moment(e, "HH:mm:ss").format("HH:mm:ss")
        break;
      default:
        break;
    }

    this.setState({
      [name]: time,
    });
  };
  render() {
    var { type_schedule,
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
    } = this.state
    var disable_oneDay = type_schedule == "0" ? "show" : "hide"
    var disable_everyDay = type_schedule == "1" ? "show" : "hide"
    var disable_everyWeek = type_schedule == "2" ? "show" : "hide"
    var disable_everyMonth = type_schedule == "3" ? "show" : "hide"


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

              <select name="group_customer" onChange={this.onChange} id="input" class="form-control" >
                <option value="0">Tất cả</option>
                <option value="1">Khách hàng có ngày sinh nhật</option>

              </select>

            </div>

            <div class="form-group">
              <label for="product_name">Kiểu thông báo</label>

              <select name="type_schedule" id="input" class="form-control"  onChange={this.onChange}>
                <option value="0">Một lần</option>

                <option value="1">Hàng ngày</option>
                <option value="2">Hàng tuần</option>
                <option value="3">Hàng tháng</option>


              </select>

            </div>

            <div className={disable_oneDay}>
              <div class="form-group" >
                <label for="product_name">Thời gian thông báo trong ngày</label>

                <Datetime
                  inputProps={{
                    placeholder: "Chọn ngày (dd:mm:yyyy hh:mm)",
                  }}
                  value={time_run}
                  onChange={(e) => this.onChangeDate(e, "time_run")}
                  dateFormat="DD-MM-YYYY"
                  timeFormat="HH:mm:ss"

                />

              </div>

            </div>
            <div className={disable_everyDay}>

              <div class="form-group">
                <label for="product_name">Thời gian thông báo trong ngày</label>

                <Datetime
                  inputProps={{
                    placeholder: "Chọn thời gian (hh:mm)",
                  }}
                  value={time_of_day}
                  onChange={(e) => this.onChangeDate(e, "time_of_day")}
                  dateFormat={false}
                  timeFormat="HH:mm:ss"
                />

              </div>
            </div>

            <div className={disable_everyWeek}>

              <div class="form-group">
                <label for="product_name">Chọn ngày</label>


                <select name="day_of_week" onChange={this.onChange} id="input" class="form-control" >
                  <option value="">-- Chọn thứ ---</option>

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

                <Datetime
                  inputProps={{
                    placeholder: "Chọn thời gian (hh:mm)",
                  }}
                  value={time_of_day}
                  onChange={(e) => this.onChangeDate(e, "time_of_day")}
                  dateFormat={false}
                  timeFormat="HH:mm:ss"
                />

              </div>
            </div>
            <div className={disable_everyMonth}>

              <div class="form-group">
                <label for="product_name">Chọn ngày</label>


                <select name="day_of_month" onChange={this.onChange} id="input" class="form-control" >
                  <option value="">-- Chọn ngày ---</option>

                  {this.showAllDayofMonth()}
                </select>


              </div>
              <div class="form-group">
                <label for="product_name">Thời gian thông báo trong ngày</label>

                <Datetime
                  inputProps={{
                    placeholder: "hh:mm",
                  }}
                  value={time_of_day}
                  onChange={(e) => this.onChangeDate(e, "time_of_day")}
                  dateFormat={false}
                  timeFormat="HH:mm:ss"
                />

              </div>

            </div>




          </div>
          <div class="box-footer">
            <button type="submit" class="btn btn-info btn-icon-split btn-sm">
              <span class="icon text-white-50">
                <i class="fas fa-save"></i>
              </span>
              <span class="text">Tạo</span>
            </button>
            <a
              style={{ marginLeft: "10px" }}
              onClick={this.goBack}
              class="btn btn-warning"
              class="btn btn-warning btn-icon-split  btn-sm"
            >
              <span class="icon text-white-50">
                <i class="fas fa-arrow-left"></i>
              </span>
              <span class="text"> Trở về</span>
            </a>
          </div>

        </form>

      </React.Fragment>

    );
  }
}


const mapDispatchToProps = (dispatch, props) => {
  return {


    createSchedule: (store_code, data) => {
      dispatch(ScheduleAction.createSchedule(store_code, data))
    }

  };
};
export default connect(null, mapDispatchToProps)(Form);
