import React, { Component } from "react";
import Sidebar from "../../../components/Partials/Sidebar";
import Topbar from "../../../components/Partials/Topbar";
import Footer from "../../../components/Partials/Footer";
import Alert from "../../../components/Partials/Alert";
import * as Types from "../../../constants/ActionType";

// import Table from "../../../components/Timekeeping/Shift/Table";
// import Pagination from "../../../components/Timekeeping/Shift/Pagination";
// import ModalCreate from "../../../components/Timekeeping/Shift/Create/Modal";

// import * as shiftAction from "../../../actions/shift";
import { Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import NotAccess from "../../../components/Partials/NotAccess";

import Loading from "../../Loading";

import "react-big-calendar/lib/css/react-big-calendar.css";
import {
  Calendar,
  Views,
  DateLocalizer,
  momentLocalizer,
} from "react-big-calendar";
import moment from "moment";
import "moment/locale/vi";
import "./style.css";
const messages = {
  "vi-VN": {
    day: "Ngày",
    week: "Tuần",
    month: "Tháng",
    previous: "<",
    next: ">",
    today: "Hôm nay",
    date: "Ngày",
    time: "Giờ",

    showMore: (total) => `+${total} sự kiện`,
  },
};
let allViews = Object.keys(Views).map((k) => Views[k]);
// moment.tz.setDefault("Asia/Saigon");
moment.locale("vi-VN");
const localizer = momentLocalizer(moment);
// const allViews = Object.keys(Calendar.Views).map((k) => Calendar.Views[k]);
class CalendarShift extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //   numPage: 10,

      date: new Date(),
      events: [
        {
          id: 0,
          title: "All Day Event very long title",

          start: new Date(2015, 3, 0),
          end: new Date(2015, 3, 1),
        },
        {
          id: 1,
          title: "Long Event",
          start: new Date(2015, 3, 7),
          end: new Date(2015, 3, 10),
        },

        {
          id: 2,
          title: "DTS STARTS",
          start: new Date(2016, 2, 13, 0, 0, 0),
          end: new Date(2016, 2, 20, 0, 0, 0),
        },

        {
          id: 3,
          title: "DTS ENDS",
          start: new Date(2016, 10, 6, 0, 0, 0),
          end: new Date(2016, 10, 13, 0, 0, 0),
        },

        {
          id: 4,
          title: "Some Event",
          start: new Date(2015, 3, 9, 0, 0, 0),
          end: new Date(2015, 3, 10, 0, 0, 0),
        },
        {
          id: 5,
          title: "Conference",
          start: new Date(2015, 3, 13, 6, 0, 0),
          end: new Date(2015, 3, 13, 12, 0, 0),
          desc: "Big conference for important people",
        },
        {
          id: 6,
          title: "Meeting",
          start: new Date(2015, 3, 12, 10, 30, 0, 0),
          end: new Date(2015, 3, 12, 12, 30, 0, 0),
          desc: "Pre-meeting meeting, to prepare for the meeting",
        },
        {
          id: 7,
          title: "Lunch",
          start: new Date(2015, 3, 12, 12, 0, 0, 0),
          end: new Date(2015, 3, 12, 13, 0, 0, 0),
          desc: "Power lunch",
        },
        {
          id: 8,
          title: "Meeting",
          start: new Date(2015, 3, 12, 14, 0, 0, 0),
          end: new Date(2015, 3, 12, 15, 0, 0, 0),
        },
        {
          id: 9,
          title: "Happy Hour",
          start: new Date(2015, 3, 12, 17, 0, 0, 0),
          end: new Date(2015, 3, 12, 17, 30, 0, 0),
          desc: "Most important meal of the day",
        },
        {
          id: 10,
          title: "Dinner",
          start: new Date(2015, 3, 12, 20, 0, 0, 0),
          end: new Date(2015, 3, 12, 21, 0, 0, 0),
        },
        {
          id: 11,
          title: "Planning Meeting with Paige",
          start: new Date(2015, 3, 13, 8, 0, 0),
          end: new Date(2015, 3, 13, 10, 30, 0),
        },
        {
          id: 11.1,
          title: "Inconvenient Conference Call",
          start: new Date(2015, 3, 13, 9, 30, 0),
          end: new Date(2015, 3, 13, 12, 0, 0),
        },
        {
          id: 11.2,
          title: "Project Kickoff - Lou's Shoes",
          start: new Date(2015, 3, 13, 11, 30, 0),
          end: new Date(2015, 3, 13, 14, 0, 0),
        },
        {
          id: 11.3,
          title: "Quote Follow-up - Tea by Tina",
          start: new Date(2015, 3, 13, 15, 30, 0),
          end: new Date(2015, 3, 13, 16, 0, 0),
        },
        {
          id: 12,
          title: "Late Night Event",
          start: new Date(2015, 3, 17, 19, 30, 0),
          end: new Date(2015, 3, 18, 2, 0, 0),
        },
        {
          id: 12.5,
          title: "Late Same Night Event",
          start: new Date(2015, 3, 17, 19, 30, 0),
          end: new Date(2015, 3, 17, 23, 30, 0),
        },
        {
          id: 13,
          title: "Multi-day Event",
          start: new Date(2015, 3, 20, 19, 30, 0),
          end: new Date(2015, 3, 22, 2, 0, 0),
        },
        {
          id: 14,
          title: "Today",
          start: new Date(new Date().setHours(new Date().getHours() - 3)),
          end: new Date(new Date().setHours(new Date().getHours() + 3)),
        },

        {
          id: 16,
          title: "Video Record",
          start: new Date(2015, 3, 14, 15, 30, 0),
          end: new Date(2015, 3, 14, 19, 0, 0),
        },
        {
          id: 17,
          title: "Dutch Song Producing",
          start: new Date(2015, 3, 14, 16, 30, 0),
          end: new Date(2015, 3, 14, 20, 0, 0),
        },
        {
          id: 18,
          title: "Itaewon Halloween Meeting",
          start: new Date(2015, 3, 14, 16, 30, 0),
          end: new Date(2015, 3, 14, 17, 30, 0),
        },
        {
          id: 19,
          title: "Online Coding Test",
          start: new Date(2015, 3, 14, 17, 30, 0),
          end: new Date(2015, 3, 14, 20, 30, 0),
        },
        {
          id: 20,
          title: "An overlapped Event",
          start: new Date(2015, 3, 14, 17, 0, 0),
          end: new Date(2015, 3, 14, 18, 30, 0),
        },
        {
          id: 21,
          title: "Phone Interview",
          start: new Date(2015, 3, 14, 17, 0, 0),
          end: new Date(2015, 3, 14, 18, 30, 0),
        },
        {
          id: 22,
          title: "Cooking Class",
          start: new Date(2015, 3, 14, 17, 30, 0),
          end: new Date(2015, 3, 14, 19, 0, 0),
        },
        {
          id: 23,
          title: "Go to the gym",
          start: new Date(2015, 3, 14, 18, 30, 0),
          end: new Date(2015, 3, 14, 20, 0, 0),
        },
      ],
      culture: "vi-VN",
      messages: messages,
      title: "",
    };
  }
  handleSelectSlot = ({ start, end }) => {
    const title = window.prompt("New Event Name");
    if (title) {
      this.setState({
        events: [...this.state.events, { start, end, title }],
      });
    }
  };
  handleSelectEvent = (e) => {
    window.alert(e.title);
  };
  componentDidMount() {
    // var { store_code } = this.props.match.params;
    // const branch_id = localStorage.getItem("branch_id");
    // this.props.fetchAllShift(store_code, branch_id);
  }

  render() {
    var { store_code } = this.props.match.params;
    const branch_id = localStorage.getItem("branch_id");

    // var { shifts } = this.props;

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
                      Sắp xếp lịch làm việc
                    </h4>{" "}
                    {/* <a
                        data-toggle="modal"
                        data-target="#modalCreate"
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
                        <span
                          style={{ color: "white", margin: "0 0.75rem" }}
                          class={`text `}
                        >
                          Thêm ca
                        </span>
                      </a> */}
                  </div>

                  <br></br>
                  <div className="card shadow ">
                    <div class="card-header py-3">
                      <h6 class="m-0 font-weight-bold text-primary">
                        Danh sách lịch làm việc
                      </h6>
                    </div>

                    <div className="card-body">
                      <Calendar
                        dayLayoutAlgorithm="no-overlap"
                        defaultView={Views.WEEK}
                        events={this.state.events}
                        localizer={localizer}
                        messages={messages["vi-VN"]}
                        selectable
                        onSelectEvent={this.handleSelectEvent}
                        onSelectSlot={this.handleSelectSlot}
                        defaultDate={new Date(2015, 3, 12)}
                        scrollToTime={new Date(1970, 1, 1, 6)}
                        showMultiDayTimes
                        step={60}
                        views={{
                          day: true,
                          week: true,
                          month: true,
                        }}
                        startAccessor="start"
                        endAccessor="end"
                        toolbar={true}
                        formats={{
                          timeGutterFormat: "HH:mm",
                        }}

                        // view={this.state.view}
                        // onView={() => {}}
                        // date={this.state.date}
                        // onNavigate={(newDate) => setDate(newDate)}

                        // culture={this.state.culture}
                      />
                      {/* {shifts.data !== undefined && (
                      
                         //   <Table 
                          
                        //     store_code={store_code}
                        //     branch_id={branch_id}
                        //     shifts={shifts}
                        //     numPage={numPage}
                        //   />
                        )} */}
                    </div>
                  </div>
                </div>
              </div>
              {/*         
              {shifts.data !== undefined && (
                <ModalCreate
                  store_code={store_code}
                  branch_id={branch_id}
                  shifts={shifts}
                />
              )} */}
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
    // permission: state.authReducers.permission.data,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    // fetchAllShift: (store_code, branch_id, page, params) => {
    //   dispatch(shiftAction.fetchAllShift(store_code, branch_id, page, params));
    // },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CalendarShift);
