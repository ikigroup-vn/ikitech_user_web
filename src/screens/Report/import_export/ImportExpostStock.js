import React, { Component } from 'react'
import { connect } from 'react-redux'
import Alert from '../../../components/Partials/Alert'
import Footer from '../../../components/Partials/Footer'
import Sidebar from '../../../components/Partials/Sidebar'
import Topbar from '../../../components/Partials/Topbar'
import * as Types from "../../../constants/ActionType";
import * as reportAction from "../../../actions/report";
import * as Env from "../../../ultis/default"
import { format } from '../../../ultis/helpers'
import { MomentInput } from 'react-moment-input'
import moment from "moment";
import { shallowEqual } from '../../../ultis/shallowEqual'
import General from '../General'
import Pagination from './Pagination'

class ImportExportStock extends Component {
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
    this.props.fetchImportExportStock(store_code, branch_id,1,params)
    try {
      document.getElementsByClassName('r-input')[0].placeholder = 'Chọn ngày';
      document.getElementsByClassName('r-input')[1].placeholder = 'Chọn ngày';
    } catch (error) {

    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (shallowEqual(this.state.txtStart, nextState.txtStart) && shallowEqual(this.state.txtEnd, nextState.txtEnd)) {

    }
    return true
  }

  handleFindItem = () => {
    const branch_id = localStorage.getItem("branch_id")
    const params = `date_from=${this.state.txtStart}&date_to=${this.state.txtEnd}&branch_id=${branch_id}`
    const { store_code } = this.props.match.params
    this.props.fetchImportExportStock(store_code, branch_id,1, params)
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
  showDistribute = (listDistribute) => {
    var result = []
    if (typeof listDistribute == "undefined" || listDistribute.length === 0) {
      return result
    }
    if (listDistribute[0].element_distributes) {
      listDistribute[0].element_distributes.map((element, _index) => {
        result.push(
          <tr class="explode" style={{ backgroundColor: "#f8f9fc" }} >
            <td colSpan={12}>
              <div className='show-distribute'>
                <div className='row' style={{ padding: "10px" }}>
                  <div className='col-4' style={{ display: "flex" }}>
                    <label style={{ fontWeight: "bold" }}>Phân loại: </label>
                    <div className='name-distribute' style={{ marginLeft: "20px" }}>{element.name}</div>
                  </div>
                  <div className='col-2' style={{ display: "flex" }}>
                    <label style={{ fontWeight: "bold" }}>Giá nhập: </label>
                    <div className='price-distribute' style={{ marginLeft: "20px" }}>{format(Number(element.import_total_amount))}</div>
                  </div>
                  <div className='col-2' style={{ display: "flex" }}>
                    <label style={{ fontWeight: "bold" }}>Số lượng nhập: </label>
                    <div className='quantity-distribute' style={{ marginLeft: "20px" }}>{element.import_count_stock}</div>
                  </div>
                  <div className='col-2' style={{ display: "flex" }}>
                    <label style={{ fontWeight: "bold" }}>Giá xuất: </label>
                    <div className='quantity-distribute' style={{ marginLeft: "20px" }}>{format(Number(element.export_total_amount))}</div>
                  </div>
                  <div className='col-2' style={{ display: "flex" }}>
                    <label style={{ fontWeight: "bold" }}>Số lượng suất: </label>
                    <div className='quantity-distribute' style={{ marginLeft: "20px" }}>{format(Number(element.export_count_stock))}</div>
                  </div>
                </div>
              </div>
            </td>
          </tr>

        )
      })
    }
    return result
  }
  showData = (listImportExport) => {
    var result = null
    if (listImportExport) {
      result = listImportExport.map((item, index) => {
        return (
          <>
            <tr>
              <td>{index + 1}</td>
              <td><img src={item.images.length > 0 ? item.images[0].image_url : Env.IMG_NOT_FOUND} alt='' width="65px" height="65px"></img></td>
              <td>{item.name}</td>
              <td>{item.main_import_count_stock}</td>
              <td>{format(Number(item.main_import_total_amount))}</td>
              <td>{item.main_export_count_stock}</td>
              <td>{format(Number(item.main_export_total_amount))}</td>
            </tr>
            {this.showDistribute(item.distribute_import_export)}
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
    const { reportImportExport } = this.props
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
                  <div className='card-header py-3' style={{ display: 'flex',justifyContent: "space-between" }}>
                    <div className='stock-title'>
                      <h4 style={{color:"red"}}>Xuất nhập tồn</h4>
                    </div>
                    <div className='wap-header' style={{ display: 'flex' }}>
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
                            <th>Hình ảnh</th>
                            <th>Tên sản phẩm</th>
                            <th>SL nhập kho</th>
                            <th>Giá nhập kho</th>
                            <th>SL suất kho</th>
                            <th>Giá suất kho</th>
                          </tr>
                        </thead>

                        <tbody>{this.showData(reportImportExport.data)}</tbody>
                      </table>
                    </div>
                    <Pagination store_code ={store_code} reportImportExport = {reportImportExport}/>
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
    reportImportExport: state.reportReducers.reportImportExport,
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchImportExportStock: (store_code, branch_id,page, params) => {
      dispatch(reportAction.fetchImportExportStock(store_code, branch_id,page, params))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ImportExportStock)