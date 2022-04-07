import React, { Component, Fragment } from "react";

import { connect } from "react-redux";

// import * as revenueExpendituresAction from "../../actions/revenue_expenditures";
import { shallowEqual } from "../../../ultis/shallowEqual";

import moment from "moment";
// import ModalDetail from "../../components/RevenueExpenditures/ModalDetail";
import ModalDetail from "./ModalDetail";
class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,

      isLoading: false,
      data: [],
      data2: {},
      dataDetail: {},
      idModalShow: null,
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (
      !shallowEqual(nextProps.calendarShift, this.props.calendarShift) &&
      nextState.isLoading == false
    ) {
      this.setState({
        isLoading: true,
      });
    }
    return true;
  }

  // componentWillReceiveProps(nextProps) {
  //   if (!shallowEqual(this.props.datePrime, nextProps.datePrime)) {
  //     // {from: '2022-04-01', to: '2022-04-01'}

  //   }
  // }
  // componentDidMount() {
  //   console.log({
  //     day: weekday[new Date(this.props.datePrime.from).getDay()],
  //     date: new Date(this.props.datePrime.from).getDate(),
  //   });
  //   this.setState({
  //     arrDate: [
  //       {
  //         day: weekday[new Date(this.props.datePrime.from).getDay()],
  //         date: new Date(this.props.datePrime.from).getDate(),
  //       },
  //     ],
  //   });
  // }
  // componentDidUpdate(prevProps, prevState) {
  //   if (!shallowEqual(prevProps.datePrime, this.props.datePrime)) {
  //     var arr = [];
  //     var dateFrom = new Date(this.props.datePrime.from);
  //     while (dateFrom <= new Date(this.props.datePrime.to)) {
  //       arr.push(new Date(dateFrom));
  //       dateFrom.setDate(dateFrom.getDate() + 1);
  //     }
  //     var newArr = arr.map((e) => {
  //       return {
  //         day: weekday[new Date(e).getDay()],
  //         date: new Date(e).getDate(),
  //       };
  //     });

  //     this.setState({
  //       arrDate: newArr,
  //     });
  //   }
  //   if (!shallowEqual(prevProps.typeDate, this.props.typeDate)) {
  //     var arr = [];
  //     if (this.props.typeDate == "DAY") {
  //       var datePrime = {
  //         from: moment().format("YYYY-MM-DD"),
  //         to: moment().format("YYYY-MM-DD"),
  //       };
  //     }
  //     if (this.props.typeDate == "WEEK") {
  //       var datePrime = {
  //         from: moment().startOf("isoWeek").format("YYYY-MM-DD"),
  //         to: moment().endOf("isoWeek").format("YYYY-MM-DD"),
  //       };
  //     }
  //     if (this.props.typeDate == "MONTH") {
  //       var datePrime = {
  //         from: moment().startOf("month").format("YYYY-MM-DD"),
  //         to: moment().endOf("month").format("YYYY-MM-DD"),
  //       };
  //     }
  //     var dateFrom = new Date(datePrime.from);
  //     while (dateFrom <= new Date(datePrime.to)) {
  //       arr.push(new Date(dateFrom));
  //       dateFrom.setDate(dateFrom.getDate() + 1);
  //     }
  //     var newArr = arr.map((e) => {
  //       return {
  //         day: weekday[new Date(e).getDay()],
  //         date: new Date(e).getDate(),
  //       };
  //     });
  //     console.log(datePrime, newArr);
  //     this.setState({
  //       arrDate: newArr,
  //     });
  //   }
  // }
  componentWillReceiveProps(nextProps) {
    // if (this.props.typeDate !== nextProps.typeDate) {
    //   var arr = [];
    //   var dateFrom = new Date(this.props.datePrime.from);
    //   while (dateFrom <= new Date(this.props.datePrime.to)) {
    //     arr.push(new Date(dateFrom));
    //     dateFrom.setDate(dateFrom.getDate() + 1);
    //   }
    //   var newArr = arr.map((e) => {
    //     return {
    //       day: weekday[new Date(e).getDay()],
    //       date: new Date(e).getDate(),
    //     };
    //   });
    //   this.setState({
    //     arrDate: newArr,
    //   });
    // }
  }

  showData = (listTimeSheet) => {
    var { store_code, branch_id, timeSheet, datePrime } = this.props;
    console.log(listTimeSheet);

    var result = null;
    if (listTimeSheet.length > 0) {
      result = listTimeSheet?.map((data, index) => {
        return (
          <React.Fragment>
            <tr
            // style={{ textAlign: "center", cursor: "pointer" }}
            // data-toggle="modal"
            // data-target="#modalDetail"
            // onClick={() =>
            //   this.setState({
            //     idModalShow: data.staff_id,
            //   })
            // }
            >
              <td>{data.staff.name}</td>
              {this.props.typeDate == "DAY" ||
              (this.props.typeDate == "OPTION" &&
                this.props.datePrime.from === this.props.datePrime.to &&
                data?.keeping_histories.length !== 0) ? (
                <td>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      background: "lightgreen",
                      width: "fit-content",
                      padding: "0.5rem 1rem",
                      borderRadius: "0.5rem",
                      marginBottom: "0.5rem",
                    }}
                  >
                    <div>
                      <span
                        style={{
                          background: "green",
                          padding: "0.02rem 0.5rem",
                          borderRadius: "50%",
                          marginRight: "0.3rem",
                          color: "green",
                        }}
                      ></span>
                      <span style={{ color: "green", fontWeight: "bold" }}>
                        Vào làm:{" "}
                      </span>
                      <span style={{ fontWeight: "bold" }}>
                        {moment(data?.keeping_histories[0]?.time_check).format(
                          "HH:mm:ss"
                        )}
                      </span>
                    </div>
                    <div>
                      {data?.keeping_histories[0]?.remote_timekeeping ? (
                        <span
                          style={{
                            color: "red",
                            fontWeight: "bold",
                            fontSize: "0.7rem",
                          }}
                        >
                          (Từ xa){" "}
                        </span>
                      ) : (
                        <span></span>
                      )}

                      <span style={{ color: "gray" }}>
                        {data?.keeping_histories[0]?.reason
                          ? `Lý do: ${data?.keeping_histories[0]?.reason}`
                          : ""}
                      </span>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      background: "lightgoldenrodyellow",
                      width: "fit-content",
                      padding: "0.5rem 1rem",
                      borderRadius: "0.5rem",
                    }}
                  >
                    <div>
                      <span
                        style={{
                          background: "orange",
                          padding: "0.02rem 0.5rem",
                          borderRadius: "50%",
                          marginRight: "0.3rem",
                          color: "orange",
                        }}
                      ></span>
                      <span style={{ color: "orange", fontWeight: "bold" }}>
                        Tan làm:{" "}
                      </span>
                      <span style={{ fontWeight: "bold" }}>
                        {moment(
                          data?.keeping_histories[
                            data?.keeping_histories.length - 1
                          ]?.time_check
                        ).format("HH:mm:ss")}
                      </span>
                    </div>
                  </div>
                </td>
              ) : (
                <td></td>
              )}

              {data.total_seconds !== 0 ? (
                <td>
                  {moment.utc(data.total_seconds * 1000).hour()} giờ{" "}
                  {moment.utc(data.total_seconds * 1000).minutes()} phút
                </td>
              ) : (
                <td>0 giờ 0 phút</td>
              )}
              {this.props.typeDate == "DAY" ||
              (this.props.typeDate == "OPTION" &&
                this.props.datePrime.from === this.props.datePrime.to) ? (
                <td>
                  <a
                    data-toggle="modal"
                    data-target="#modalDetail"
                    class={`btn btn-info btn-icon-split btn-sm ${
                      true ? "show" : "hide"
                    }`}
                    style={{ marginRight: "1rem" }}
                    onClick={(e) => {
                      this.setState({
                        dataDetail: data,
                      });
                    }}
                  >
                    <span class="icon text-white-50" style={{ marginRight: 0 }}>
                      <i class="fas fa-plus"></i>
                    </span>
                    <span
                      style={{ color: "white", margin: "0 0.75rem" }}
                      class={`text `}
                    >
                      Thêm bớt công
                    </span>
                  </a>
                </td>
              ) : (
                <td></td>
              )}
            </tr>
          </React.Fragment>
        );
      });
    } else {
      return result;
    }
    return result;
  };

  render() {
    var { store_code, branch_id, timeSheet } = this.props;

    // const branch_id = localStorage.getItem("branch_id");
    // var { statusOrder, statusPayment } = this.state;

    var listTimeSheet =
      typeof timeSheet.list_staff_timekeeping == "undefined"
        ? []
        : timeSheet.list_staff_timekeeping;
    // console.log("asdasd" + this.props.statusPayment, statusPayment);
    return (
      <React.Fragment>
        <div class="table-responsive " style={{ minHeight: 300 }}>
          <table
            class="table table-border table-hover"
            id="dataTable"
            width="100%"
            cellspacing="0"
          >
            <tbody>
              <tr>
                <td>Nhân viên</td>
                {console.log("133131", this.props.datePrime)}
                {this.props.typeDate == "DAY" ||
                (this.props.typeDate == "OPTION" &&
                  this.props.datePrime.from === this.props.datePrime.to) ? (
                  <td>Vào/Tan ca</td>
                ) : (
                  <td></td>
                )}
                <td>Số giờ làm</td>
                {this.props.typeDate == "DAY" ||
                (this.props.typeDate == "OPTION" &&
                  this.props.datePrime.from === this.props.datePrime.to) ? (
                  <td>Hành động</td>
                ) : (
                  <td></td>
                )}
              </tr>

              {this.showData(listTimeSheet)}
            </tbody>
          </table>
          <ModalDetail
            store_code={store_code}
            branch_id={branch_id}
            time_sheet_id={this.state.idModalShow}
            dataDetail={this.state.dataDetail}
            timeSheet={this.props.timeSheet}
            datePrime={this.props.datePrime}
            typeDate={this.props.typeDate}
          />
        </div>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {};
};
export default connect(null, mapDispatchToProps)(Table);
