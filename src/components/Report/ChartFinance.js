import React, { Component } from "react";
import { Bar } from "react-chartjs-2";
import moment from "moment";
import * as helper from "../../ultis/helpers";
import ModalPostDate from "./ModalPostDates";
import { connect } from "react-redux";
import * as reportAction from "../../actions/report";

class ChartFinance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartDataPrime: { labels: [], datasets: [{backgroundColor : "blue"}] },
      datePrime: "",
      dateCompare: "",
      typeDate: "",
      reset: "",
      typeSelect: "Hôm nay",
    };
  }
  componentDidMount() {
    this.setState({
      datePrime: {
        from: moment().format("DD-MM-YYYY"),
        to: moment().format("DD-MM-YYYY"),
      },
      dateCompare: {
        from: moment().subtract(1, "days").format("DD-MM-YYYY"),
        to: moment().subtract(1, "days").format("DD-MM-YYYY"),
      },
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.datePrime !== nextState.datePrime) {
      const branch_id = localStorage.getItem("branch_id");

      const params1 = `date_from=${nextState.datePrime.from}&date_to=${nextState.datePrime.to}&branch_id=${branch_id}`;
      const params2 = `date_from=${nextState.dateCompare.from}&date_to=${nextState.dateCompare.to}&branch_id=${branch_id}`;
      const { store_code } = this.props;

      this.props.fetchReportProfit(store_code, branch_id, params1);
      this.props.fetchReportProfitCompare(store_code, branch_id, params2);
    }
    return true;
  }
  componentWillReceiveProps(nextProps) {
    if (
      this.props.reportProfit !== nextProps.reportProfit ||
      this.props.compareProfit !== nextProps.compareProfit
    ) {
      var chartDataState_prime = { ...this.state.chartDataPrime };
      const { datePrime, dateCompare } = this.state;
      const showDateChoose = `${moment(datePrime.from, "YYYY-MM-DD").format(
        "DD/MM/YY"
      )} - ${moment(datePrime.to, "YYYY-MM-DD").format("DD/MM/YY")}`;
      const showDateCopare = `${moment(dateCompare.from, "YYYY-MM-DD").format(
        "DD/MM/YY"
      )} - ${moment(dateCompare.to, "YYYY-MM-DD").format("DD/MM/YY")}`;
      const showDataCopare = nextProps.reportProfit.profit;
      const showDataChoose = nextProps.compareProfit.profit;
      chartDataState_prime.labels = [showDateCopare, showDateChoose];

      chartDataState_prime.datasets[0].data = [showDataChoose, showDataCopare];
      chartDataState_prime.datasets[0].backgroundColor = "blue";
      chartDataState_prime.datasets[0].label = "Lợi nhuận";

      this.setState({ chartDataPrime: chartDataState_prime });
      this.props.handleCallbackProfit(nextProps.reportProfit.profit);
    }
  }
  handleGetDatePost = (date, typeSelect) => {
    this.setState({
      datePrime: {
        from: date.datePrime.from,
        to: date.datePrime.to,
      },
      dateCompare: {
        from: date.dateCompare?.from ?? null,
        to: date.dateCompare?.to ?? null,
      },
      isCompare: date.dateCompare?.from != null ? date.isCompare : false,
      typeSelect: typeSelect,
    });
  };
  onchangeDate = (value) => {
    var resetId = helper.randomString(10);

    this.setState({ typeDate: value, reset: resetId });
  };

  showData = () => {
    const { chartDataPrime } = this.state;
    return chartDataPrime;
  };
  render() {
    const { store_code } = this.props;
    const { typeDate, reset, typeSelect } = this.state;
    return (
      <div className="chart">
        <ModalPostDate
          reset={reset}
          handleGetDatePost={this.handleGetDatePost}
          store_code={store_code}
          typeDate={typeDate}
        />

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h5 style={{ display: "flex" }}>
            LỢI NHUẬN
            <div style={{ paddingLeft: "20px" }}>
              <i class="fas fa-arrow-circle-right"></i>
              <span
                style={{
                  color: "#17a2b8",
                  paddingLeft: "10px",
                }}
              >
                {helper.format(Number(this.props.reportProfit.profit))}
              </span>
            </div>
          </h5>
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
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <p
                data-toggle="modal"
                data-target="#postDateModal"
                onClick={() => this.onchangeDate("DAY")}
                class="dropdown-item"
                style={{ cursor: "pointer" }}
              >
                Ngày
              </p>
              <p
                data-toggle="modal"
                data-target="#postDateModal"
                onClick={() => this.onchangeDate("WEEK")}
                class="dropdown-item"
                style={{ cursor: "pointer" }}
              >
                Tuần{" "}
              </p>
              <p
                data-toggle="modal"
                data-target="#postDateModal"
                onClick={() => this.onchangeDate("MONTH")}
                class="dropdown-item"
                style={{ cursor: "pointer" }}
              >
                Tháng
              </p>
              <p
                data-toggle="modal"
                data-target="#postDateModal"
                onClick={() => this.onchangeDate("YEAR")}
                class="dropdown-item"
                style={{ cursor: "pointer" }}
              >
                Năm
              </p>
              <p
                data-toggle="modal"
                data-target="#postDateModal"
                onClick={() => this.onchangeDate("OPTION")}
                class="dropdown-item"
                style={{ cursor: "pointer" }}
              >
                Tùy chỉnh
              </p>
            </div>
          </div>
        </div>
        <Bar
          data={this.showData}
          options={{
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                  },
                },
              ],
              xAxes: [
                {
                  maxBarThickness: 100,
                },
              ],
            },
          }}
        />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    reportProfit: state.reportReducers.reportProfit,
    compareProfit: state.reportReducers.compareProfit,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchReportProfit: (store_code, branch_id, params) => {
      dispatch(reportAction.fetchReportProfit(store_code, branch_id, params));
    },
    fetchReportProfitCompare: (store_code, branch_id, params) => {
      dispatch(
        reportAction.fetchReportProfitCompare(store_code, branch_id, params)
      );
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ChartFinance);
