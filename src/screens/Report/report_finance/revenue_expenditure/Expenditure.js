import React, { Component } from "react";
import { connect } from "react-redux";
import Alert from "../../../../components/Partials/Alert";
import Footer from "../../../../components/Partials/Footer";
import Sidebar from "../../../../components/Partials/Sidebar";
import Topbar from "../../../../components/Partials/Topbar";
import * as Types from "../../../../constants/ActionType";
import * as reportAction from "../../../../actions/report";
import { MomentInput } from "react-moment-input";
import moment from "moment";
import { format } from "../../../../ultis/helpers";
import Pagination from "./Pagination";

class Expenditure extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtStart: "",
      txtEnd: "",
    };
  }
  componentDidMount() {
    const { store_code } = this.props.match.params;
    const branch_id = localStorage.getItem("branch_id");
    const time = moment().format("YYYY-MM-DD");
    const params = `date_from=${time}&date_to=${time}`;
    this.props.fetchReportExpenditure(store_code, branch_id, 1, params);
    try {
      document.getElementsByClassName("r-input")[0].placeholder = "Chọn ngày";
      document.getElementsByClassName("r-input")[1].placeholder = "Chọn ngày";
    } catch (error) {}
  }

  handleFindItem = () => {
    const params = `date_from=${this.state.txtStart}&date_to=${this.state.txtEnd}`;
    const { store_code } = this.props.match.params;
    const branch_id = localStorage.getItem("branch_id");
    this.props.fetchReportExpenditure(store_code, branch_id, 1, params);
  };

  onChangeStart = (e) => {
    var time = moment(e, "DD-MM-YYYY").format("YYYY-MM-DD");
    this.setState({
      txtStart: time,
    });
  };
  onChangeEnd = (e) => {
    var time = moment(e, "DD-MM-YYYY").format("YYYY-MM-DD");
    this.setState({
      txtEnd: time,
    });
  };
  showData = (reportExpenditure) => {
    var result = null;
    if (reportExpenditure) {
      result = reportExpenditure.map((item, index) => {
        return (
          <>
            <tr>
              <td>{index + 1}</td>
              <td>{item.code}</td>
              <td>{item.user?.name}</td>
              <td>{format(Number(item.current_money))}</td>
              <td>{format(Number(item.change_money))}</td>
              <td>{item.type_action_name}</td>
              <td>
                {moment(item.created_at, "YYYY-MM-DD").format("DD-MM-YYYY")}
              </td>
            </tr>
          </>
        );
      });
    } else {
      return result;
    }
    return result;
  };

  render() {
    var { store_code } = this.props.match.params;
    const reportExpenditure = this.props.reportExpenditure;
    const { txtStart, txtEnd } = this.state;
    return (
      <div id="wrapper">
        <Sidebar store_code={store_code} />
        <div className="col-10 col-10-wrapper">
          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
              <Topbar store_code={store_code} />

              <div className="container-fluid">
                <Alert type={Types.ALERT_UID_STATUS} alert={this.props.alert} />
                <div className="card">
                  <div
                    className="card-header py-3"
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div className="stock-title text-primary">
                      <h4 style={{ display: "flex" }}>
                        Sổ quỹ
                        <div style={{ paddingLeft: "20px" }}>
                          <i class="fas fa-arrow-circle-right"></i>
                          <span
                            style={{
                              color: "#17a2b8",
                              paddingLeft: "10px",
                            }}
                          >
                            {format(Number(reportExpenditure.reserve))}
                          </span>
                        </div>
                      </h4>
                    </div>
                    <div className="wap-header" style={{ display: "flex" }}>
                      <div
                        class="form-group"
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <label
                          for="product_name"
                          style={{ marginRight: "20px" }}
                        >
                          Ngày bắt đầu
                        </label>
                        <MomentInput
                          placeholder="Chọn thời gian"
                          format="DD-MM-YYYY"
                          options={true}
                          enableInputClick={true}
                          monthSelect={true}
                          readOnly={true}
                          translations={{
                            DATE: "Ngày",
                            TIME: "Giờ",
                            SAVE: "Đóng",
                            HOURS: "Giờ",
                            MINUTES: "Phút",
                          }}
                          onSave={() => {}}
                          onChange={this.onChangeStart}
                        />
                      </div>
                      <div
                        class="form-group"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginLeft: "20px",
                        }}
                      >
                        <label
                          for="product_name"
                          style={{ marginRight: "20px" }}
                        >
                          Ngày kết thúc
                        </label>
                        <MomentInput
                          placeholder="Chọn thời gian"
                          format="DD-MM-YYYY"
                          options={true}
                          enableInputClick={true}
                          monthSelect={true}
                          readOnly={true}
                          translations={{
                            DATE: "Ngày",
                            TIME: "Giờ",
                            SAVE: "Đóng",
                            HOURS: "Giờ",
                            MINUTES: "Phút",
                          }}
                          onSave={() => {}}
                          onChange={this.onChangeEnd}
                        />
                      </div>
                      <button
                        className="btn btn-primary btn-sm"
                        style={{ marginLeft: "20px", marginBottom: "10px" }}
                        onClick={this.handleFindItem}
                      >
                        Tìm kiếm
                      </button>
                    </div>
                  </div>
                  <div className="card-body" style={{ minHeight: "500px" }}>
                    <div class="table-responsive">
                      <table
                        class="table  "
                        id="dataTable"
                        width="100%"
                        cellspacing="0"
                      >
                        <thead>
                          <tr>
                            <th>STT</th>
                            <th>Mã phiếu</th>
                            <th>Người tạo</th>
                            <th>Số tiền</th>
                            <th>Thay đổi</th>
                            <th style={{ width: "20%" }}>Loại phiếu</th>
                            <th>Ngày tạo</th>
                          </tr>
                        </thead>

                        <tbody>{this.showData(reportExpenditure.data)}</tbody>
                      </table>
                    </div>
                    <Pagination
                      store_code={store_code}
                      reportExpenditure={reportExpenditure}
                      txtStart={txtStart}
                      txtEnd={txtEnd}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Footer />
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    reportExpenditure: state.reportReducers.reportExpenditure,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchReportExpenditure: (store_code, branch_id, page, params) => {
      dispatch(
        reportAction.fetchReportExpenditure(store_code, branch_id, page, params)
      );
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Expenditure);
