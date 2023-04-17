import React, { Component } from "react";
import { connect } from "react-redux";
import Alert from "../../../components/Partials/Alert";
import Footer from "../../../components/Partials/Footer";
import Sidebar from "../../../components/Partials/Sidebar";
import Topbar from "../../../components/Partials/Topbar";
import * as Types from "../../../constants/ActionType";
import * as reportAction from "../../../actions/report";
import { MomentInput } from "react-moment-input";
import moment from "moment";
import { Link } from "react-router-dom";
import General from "../General";
import Pagination from "./Pagination";
import { getBranchId, getBranchIds } from "../../../ultis/branchUtils";
import { formatNoD } from "../../../ultis/helpers";
import { DateRangePickerComponent } from "@syncfusion/ej2-react-calendars";
import history from "../../../history";
import { getQueryParams } from "../../../ultis/helpers";

class InventoryHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtStart: "",
      txtEnd: "",
      time_from: "",
      time_to: "",
      paginate: getQueryParams("page") || 1,
    };
  }
  componentWillMount() {
    const { store_code } = this.props.match.params;
    const { paginate } = this.state;
    var from = getQueryParams("from");
    var to = getQueryParams("to");
    const branch_id = getBranchId();
    const branch_ids = getBranchIds();
    const branchIds = branch_ids ? branch_ids : branch_id;

    var params = `${branch_ids ? "" : `branch_id=${branch_id}`}`;

    if (from && to) {
      params =
        params +
        `&date_from=${moment(from, "DD-MM-YYYY").format(
          "YYYY-MM-DD"
        )}&time_to=${moment(to, "DD-MM-YYYY").format("YYYY-MM-DD")}`;
      this.setState({
        time_from: moment(from, "DD-MM-YYYY").format("YYYY-MM-DD"),
        time_to: moment(to, "DD-MM-YYYY").format("YYYY-MM-DD"),
      });
    } else {
      params =
        params +
        `&date_from=${moment().format("YYYY-MM-DD")}&time_to=${moment().format(
          "YYYY-MM-DD"
        )}`;

      this.setState({
        time_from: moment().format("YYYY-MM-DD"),
        time_to: moment().format("YYYY-MM-DD"),
      });
    }
    this.props.fetchAllInventoryHistory(
      store_code,
      branchIds,
      paginate,
      params
    );
    this.props.fetchImportExportStock(store_code, branchIds, paginate, params);

    try {
      document.getElementsByClassName("r-input")[0].placeholder = "Chọn ngày";
      document.getElementsByClassName("r-input")[1].placeholder = "Chọn ngày";
    } catch (error) {}
  }

  setPaginate = (paginate) => {
    this.setState({
      paginate,
    });
  };
  handleFindItem = () => {
    const branch_id = getBranchId();
    const branch_ids = getBranchIds();
    const branchIds = branch_ids ? branch_ids : branch_id;
    const params = `date_from=${this.state.txtStart}&date_to=${
      this.state.txtEnd
    }${branch_ids ? "" : `&branch_id=${branch_id}`}`;
    const { store_code } = this.props.match.params;
    this.props.fetchAllInventoryHistory(store_code, branchIds, 1, params);
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

  onchangeDateFromTo = (e) => {
    var from = "";
    var to = "";
    try {
      from = moment(e.value[0], "DD-MM-YYYY").format("YYYY-MM-DD");
      to = moment(e.value[1], "DD-MM-YYYY").format("YYYY-MM-DD");
    } catch (error) {
      from = null;
      to = null;
    }

    const branch_id = getBranchId();
    const branch_ids = getBranchIds();
    const branchIds = branch_ids ? branch_ids : branch_id;
    var params = `${branch_ids ? "" : `branch_id=${branch_id}`}`;
    const { store_code } = this.props.match.params;
    if ((from, to)) {
      params = params + `&date_from=${from}&date_to=${to}`;
    }
    history.push(
      `/inventory_histories/${store_code}${
        from && to ? `?from=${from}&to=${to}` : ""
      }`
    );
    this.props.fetchAllInventoryHistory(store_code, branchIds, 1, params);
    this.setState({ time_from: from, time_to: to });
  };

  changePage = (store_code, id, type) => {
    var params = ``;
    const { time_from, time_to, paginate } = this.state;

    if (time_from && time_to) {
      params =
        params +
        `?from=${moment(time_from, "YYYY-MM-DD").format(
          "DD-MM-YYYY"
        )}&to=${moment(time_to, "YYYY-MM-DD").format("DD-MM-YYYY")}`;
    }
    params += paginate ? `&page=${paginate}` : "";
    if (type === Types.TYPE_EDIT_STOCK || type === Types.TYPE_TALLY_SHEET_STOCK)
      history.push(`/inventory/detail/${store_code}/${id}${params}`);
    if (type === Types.TYPE_IMPORT_STOCK)
      history.push(`/import_stocks/detail/${store_code}/${id}${params}`);
  };
  showData = (listReportHistory, store_code) => {
    const { reportHistory } = this.props;
    var result = null;
    if (listReportHistory) {
      result = listReportHistory.map((item, index) => {
        const date = moment(item.created_at, "YYYY-MM-DD HH:mm:ss").format(
          "YYYY-MM-DD"
        );
        return (
          <>
            <tr
              className="hover-product"
              onClick={() =>
                this.changePage(store_code, item.references_id, item.type)
              }
            >
              <td>{(reportHistory.current_page - 1) * 20 + index + 1}</td>
              <td>{item.references_value}</td>
              <td>{item.product?.name}</td>
              <td>{item.stock}</td>
              <td>{formatNoD(item.change)}</td>
              <td>{formatNoD(item.change_money)}</td>

              <td>{item.type_name?.replace(" hàng", "")}</td>
              <td>{date}</td>
              {/* <td>
                {item.type === 0 || item.type === 1 ?
                  <Link
                    to={`/inventory/detail/${store_code}/${item.references_id}`}
                    class="btn btn-primary-no-background btn-sm"
                  >
                    <i class="fa fa-eye"></i> Xem
                  </Link> :
                  <Link
                    to={`/import_stocks/detail/${store_code}/${item.references_id}`}
                    class="btn btn-primary-no-background btn-sm"
                  >
                    <i class="fa fa-eye"></i> Xem
                  </Link>

                }
              </td> */}
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
    var { time_from, time_to } = this.state;
    const { reportHistory } = this.props;
    const { reportInventory, reportImportExport } = this.props;
    const {
      import_total_amount,
      export_total_amount,
      import_count_stock,
      export_count_stock,
    } = reportImportExport;
    var arrDate = null;
    console.log(time_from, time_to);
    if ((time_from, time_to)) {
      arrDate = [
        moment(time_from, "YYYY-MM-DD").format("dd/MM/yyyy"),
        moment(time_to, "YYYY-MM-DD").format("dd/MM/yyyy"),
      ];
    }
    console.log(arrDate);

    return (
      <div id="wrapper">
        <Sidebar store_code={store_code} />
        <div className="col-10 col-10-wrapper">
          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
              <Topbar store_code={store_code} />

              <div className="container-fluid">
                <Alert type={Types.ALERT_UID_STATUS} alert={this.props.alert} />
                <General
                  time_from={time_from}
                  time_to={time_to}
                  reportImportExport={reportImportExport}
                  reportInventory={reportInventory}
                  store_code={store_code}
                />
                <div className="card">
                  <div
                    className="card-header py-3"
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div className="stock-title text-success">
                      <h4>Sổ kho</h4>
                    </div>
                    <div className="label-value">
                      <p className="sale_user_label bold">
                        Giá trị nhập kho:{" "}
                        <span id="total_selected">
                          {formatNoD(import_total_amount?.toFixed(3))} - SL:{" "}
                          {formatNoD(import_count_stock)}{" "}
                        </span>
                      </p>
                      <p className="sale_user_label bold">
                        Giá trị xuất kho:{" "}
                        <span id="total_selected">
                          {formatNoD(export_total_amount?.toFixed(3))} - SL:{" "}
                          {formatNoD(export_count_stock)}
                        </span>
                      </p>
                    </div>
                    <div className="wap-header" style={{ display: "flex" }}>
                      <DateRangePickerComponent
                        value={[
                          new Date(moment(time_from, "YYYY-MM-DD")),
                          new Date(moment(time_to, "YYYY-MM-DD")),
                        ]}
                        id="daterangepicker"
                        placeholder="Khoảng thời gian..."
                        format="dd/MM/yyyy"
                        onChange={this.onchangeDateFromTo}
                      />
                      {/* <div class="form-group" style={{ display: "flex", alignItems: "center" }}>
                        <label for="product_name" style={{ marginRight: "20px" }}>Ngày bắt đầu</label>
                        <MomentInput
                          placeholder="Chọn thời gian"
                          format="DD-MM-YYYY"
                          options={true}
                          enableInputClick={true}
                          monthSelect={true}
                          readOnly={true}
                          translations={
                            { DATE: "Ngày", TIME: "Giờ", SAVE: "Đóng", HOURS: "Giờ", MINUTES: "Phút" }
                          }
                          onSave={() => { }}
                          onChange={this.onChangeStart}
                        />
                      </div> */}
                      {/* <div class="form-group" style={{ display: "flex", alignItems: "center", marginLeft: "20px" }}>
                        <label for="product_name" style={{ marginRight: "20px" }}>Ngày kết thúc</label>
                        <MomentInput
                          placeholder="Chọn thời gian"
                          format="DD-MM-YYYY"
                          options={true}
                          enableInputClick={true}
                          monthSelect={true}
                          readOnly={true}
                          translations={
                            { DATE: "Ngày", TIME: "Giờ", SAVE: "Đóng", HOURS: "Giờ", MINUTES: "Phút" }
                          }
                          onSave={() => { }}
                          onChange={this.onChangeEnd}
                        />
                      </div> */}
                      {/* <button className='btn btn-primary btn-sm' style={{ marginLeft: "20px", marginBottom: "10px" }} onClick={this.handleFindItem}>Tìm kiếm</button> */}
                    </div>
                  </div>
                  <div className="card-body">
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
                            <th>Tên sản phẩm</th>
                            <th>SL tồn kho</th>
                            <th>SL thay đổi </th>
                            <th>Giá vốn thay đổi </th>
                            <th>Trạng thái</th>
                            <th>Thời gian</th>
                            {/* <th>Hành động</th> */}
                          </tr>
                        </thead>

                        <tbody>
                          {this.showData(reportHistory.data, store_code)}
                        </tbody>
                      </table>
                    </div>
                    <Pagination
                      time_from={time_from}
                      time_to={time_to}
                      store_code={store_code}
                      reportHistory={reportHistory}
                      setPaginate={this.setPaginate}
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
  }
}
const mapStateToProps = (state) => {
  return {
    reportHistory: state.reportReducers.reportHistory,
    reportInventory: state.reportReducers.reportInventory,
    reportImportExport: state.reportReducers.reportImportExport,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchAllInventoryHistory: (store_code, branch_id, page, params) => {
      dispatch(
        reportAction.fetchAllInventoryHistory(
          store_code,
          branch_id,
          page,
          params
        )
      );
    },
    fetchImportExportStock: (store_code, branch_id, page, params) => {
      dispatch(
        reportAction.fetchImportExportStock(store_code, branch_id, page, params)
      );
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(InventoryHistory);
