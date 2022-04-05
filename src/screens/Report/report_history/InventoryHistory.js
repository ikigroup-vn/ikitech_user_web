import React, { Component } from 'react'
import { connect } from 'react-redux'
import Alert from '../../../components/Partials/Alert'
import Footer from '../../../components/Partials/Footer'
import Sidebar from '../../../components/Partials/Sidebar'
import Topbar from '../../../components/Partials/Topbar'
import * as Types from "../../../constants/ActionType";
import * as reportAction from "../../../actions/report";
import { MomentInput } from 'react-moment-input'
import moment from "moment";
import { Link } from 'react-router-dom'
import General from '../General'
import Pagination from './Pagination'

class InventoryHistory extends Component {
  constructor(props) {
    super(props)
    this.state = {
      txtStart: "",
      txtEnd: ""
    }
  }
  componentDidMount() {
    const { store_code } = this.props.match.params
    const branch_id = localStorage.getItem("branch_id")
    const params = `branch_id=${branch_id}`
    this.props.fetchAllInventoryHistory(store_code, branch_id,1,params)
    try {
      document.getElementsByClassName('r-input')[0].placeholder = 'Chọn ngày';
      document.getElementsByClassName('r-input')[1].placeholder = 'Chọn ngày';
    } catch (error) {

    }
  }


  handleFindItem = () => {
    const branch_id = localStorage.getItem("branch_id")
    const params = `date_from=${this.state.txtStart}&date_to=${this.state.txtEnd}&branch_id=${branch_id}`
    const { store_code } = this.props.match.params
    this.props.fetchAllInventoryHistory(store_code, branch_id,1, params)
  }

  onChangeStart = (e) => {
    var time = moment(e, "DD-MM-YYYY").format("YYYY-MM-DD")
    this.setState({
      txtStart: time,
    });
  };
  onChangeEnd = (e) => {
    var time = moment(e, "DD-MM-YYYY").format("YYYY-MM-DD")
    this.setState({
      txtEnd: time,
    });
  };
  showData = (listReportHistory, store_code) => {
    var result = null
    if (listReportHistory) {
      result = listReportHistory.map((item, index) => {
        const date = moment(item.created_at, "YYYY-MM-DD HH:mm:ss").format("YYYY-MM-DD")
        return (
          <>
            <tr>
              <td>{index + 1}</td>
              <td>{item.references_value}</td>
              <td>{item.product?.name}</td>
              <td>{item.stock}</td>
              <td>{item.change}</td>
              <td>{item.type_name}</td>
              <td>{date}</td>
              <td>
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
              </td>
            </tr>
          </>
        )
      })
    } else {
      return result
    }
    return result
  }

  render() {
    var { store_code } = this.props.match.params
    const { reportHistory } = this.props
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
                <General store_code={store_code} />
                <div className='card'>
                  <div className='card-header py-3' style={{ display: 'flex', justifyContent: "space-between" }}>
                    <div className='stock-title text-success'>
                      <h4>Sổ kho</h4>
                    </div>
                    <div className='wap-header' style={{display:'flex'}}>
                      <div class="form-group" style={{ display: "flex", alignItems: "center" }}>
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
                      </div>
                      <div class="form-group" style={{ display: "flex", alignItems: "center", marginLeft: "20px" }}>
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
                      </div>
                      <button className='btn btn-primary btn-sm' style={{ marginLeft: "20px", marginBottom: "10px" }} onClick={this.handleFindItem}>Tìm kiếm</button>

                    </div>

                  </div>
                  <div className='card-body'>
                    <div class="table-responsive">
                      <table class="table  " id="dataTable" width="100%" cellspacing="0">
                        <thead>
                          <tr>
                            <th>STT</th>
                            <th>Mã phiếu</th>
                            <th>Tên sản phẩm</th>
                            <th>SL tồn kho</th>
                            <th>SL thay đổi </th>
                            <th>Trạng thái</th>
                            <th>Thời gian</th>
                            <th>Hành động</th>
                          </tr>
                        </thead>

                        <tbody>{this.showData(reportHistory.data, store_code)}</tbody>
                      </table>
                    </div>
                    <Pagination store_code = {store_code} reportHistory = {reportHistory} />
                  </div>
                </div>
              </div>

            </div>

            <Footer />
          </div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    reportHistory: state.reportReducers.reportHistory,
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
      fetchAllInventoryHistory: (store_code, branch_id,page, params) => {
        dispatch(reportAction.fetchAllInventoryHistory(store_code, branch_id,page, params))
      }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(InventoryHistory)