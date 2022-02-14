import React, { Component } from 'react';
import { HorizontalBar } from 'react-chartjs-2';
import { shallowEqual } from "../../ultis/shallowEqual";
import { format } from "../../ultis/helpers";
import moment from "moment";
import * as helper from "../../ultis/helpers"
import * as dashboardAction from "../../actions/dashboard";
import { connect } from "react-redux";
import { DateRangePickerComponent } from '@syncfusion/ej2-react-calendars';



class Chart extends Component {

  constructor() {
    super();
    this.state = {
      chartData: {},
      nameTypeChart: "THÁNG NÀY",
      showDateTime: "hide",
      typeTop: "THEO-DOANH-THU"
    };
  }

  getChartData() {
    this.setState({
      chartData: {
        labels: [],
        datasets: [
          {
            label: "Doanh thu",
            data: [],
            backgroundColor: "#17a2b8",
          },
        ],
      },
    });
  }



  shouldComponentUpdate(nextProps, nextState) {
    if (!shallowEqual(this.props.topten, nextProps.topten) ||
      this.state.typeTop != nextState.typeTop) {
      console.log(this.state.typeTop, nextState.typeTop)
      var chartDataProps = { ...nextProps.topten };
      var chartDataState = { ...nextState.chartData };
      var labels = [];
      var dataSets = [];
      var typeTop = nextState.typeTop
      var action = "total_price"
      var label = "Doanh thu"
      if (typeTop == "THEO-DOANH-THU") {
        action = "total_price"
        label = "Doanh thu"
      }
      if (typeTop == "THEO-SO-LUONG") {
        action = "total_items"
        label = "Số lượng"

      }
      if (typeTop == "THEO-SO-DON") {
        action = "number_of_orders"
        label = "Số đơn"

      }
      if (typeTop == "THEO-LUOT-XEM") {
        action = "view"
        label = "Lượt xem"

      }

      chartDataProps[action].forEach(item => {
        dataSets.push(item[action]);
        labels.push(item.product.name)
      });
      chartDataState.datasets[0].data = dataSets
      chartDataState.labels = labels
      chartDataState.datasets[0].label = label
      this.setState({ chartData: chartDataState });
    }
    return true
  }

  componentDidMount() {
    this.getChartData();

  }

  onchangeTypeTop = (e) => {
    this.setState({
      typeTop: e.target.value
    })
  }
  onchangeDate = (e) => {
    console.log(e);
    var { value } = e.target;

    var date = ""
    switch (value) {
      case "HOM-NAY":
        this.setState({ nameTypeChart: "HÔM NAY" })
        date = helper.getDateForChartHour()
        break;
      case "TUAN-NAY":
        this.setState({ nameTypeChart: "TUẦN NÀY" })

        date = helper.getDateForChartDay()
        break;
      case "THANG-NAY":
        this.setState({ nameTypeChart: "THÁNG NÀY" })

        date = helper.getDateForChartMonth()
        break;
      case "NAM-NAY":
        this.setState({ nameTypeChart: "NĂM NÀY" })
        date = helper.getDateForChartYear()
        break;
      case "TUY-CHINH":
        this.setState({ nameTypeChart: "", showDateTime: "show" })
        return;
      default:
        break;
    }
    if (this.state.showDateTime == "hide") { }
    else
      this.setState({ showDateTime: "hide" })

    var { store_code } = this.props
    if (value != "TUY-CHINH")
      this.props.fetchTopTenProduct(store_code, `?date_from=${date.from}&date_to=${date.to}`)

  }
  onchangeDateFromTo = (e) => {
    var from = "";
    var to = "";
    try {
      from = moment(e.value[0], "DD-MM-YYYY").format("YYYY-MM-DD")
      to = moment(e.value[1], "DD-MM-YYYY").format("YYYY-MM-DD")
    } catch (error) {
      var date = helper.getDateForChartMonth()
      var { from, to } = date
    }
    var { store_code } = this.props
    this.props.fetchTopTenProduct(store_code, `?date_from=${from}&date_to=${to}`)


  }
  render() {
    var { nameTypeChart, showDateTime, typeTop } = this.state
    return (

      <div className="chart">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <h5 style={{ display: "flex" }}>
            TOP 10 HÀNG HÓA BÁN CHẠY  {nameTypeChart}
            <div style={{ paddingLeft: "20px" }}>

              <select style={{
                border: "0px",
                color: "rgb(23, 162, 184)",
                outline: "0px",
                padding: "initial",
                height: "initial"
              }} name="" id="input" class="form-control" required="required" onChange={this.onchangeTypeTop}>
                <option value="THEO-DOANH-THU">THEO DOANH THU</option>
                <option value="THEO-SO-LUONG">THEO SỐ LƯỢNG</option>
                <option value="THEO-SO-DON">THEO SỐ ĐƠN</option>
                <option value="THEO-LUOT-XEM">THEO LƯỢT XEM</option>

              </select>

            </div>
          </h5>

          <div className={showDateTime}>

            <DateRangePickerComponent
              id="daterangepicker"
              placeholder='Chọn từ ngày... đến ngày...'

              format="dd-MM-yyyy"
              onChange={this.onchangeDateFromTo}
            />
          </div>
          <select
            onChange={this.onchangeDate}
            style={{ maxWidth: "170px" }}
            name=""
            id="input"
            class="form-control"
            required="required"
          >
            <option value="THANG-NAY">Tháng này</option>
            <option value="HOM-NAY">Hôm nay</option>
            <option value="TUAN-NAY">Tuần này</option>
            <option value="NAM-NAY">Năm này</option>
            <option value="TUY-CHINH">Tùy chỉnh</option>


          </select>
        </div>
        <br></br>
        <HorizontalBar
          data={this.state.chartData}

          options={

            {
              scales: {
                xAxes: [{
                  ticks: {
                    beginAtZero: true,

                    callback: function (value, index, values) {
                      if (typeTop == "THEO-DOANH-THU")
                        return format(value)

                      return value
                    }
                  }
                }]
              },
              legend: {
                position: "bottom",
              },
            }}
        />
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchTopTenProduct: (store_code, params) => {
      dispatch(dashboardAction.fetchTopTenProduct(store_code, params));
    },

  };
};
export default connect(null, mapDispatchToProps)(Chart);