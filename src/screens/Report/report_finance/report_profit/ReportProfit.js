import React, { Component } from 'react'
import { connect } from 'react-redux'
import Alert from '../../../../components/Partials/Alert'
import Footer from '../../../../components/Partials/Footer'
import Sidebar from '../../../../components/Partials/Sidebar'
import Topbar from '../../../../components/Partials/Topbar'
import * as Types from "../../../../constants/ActionType";
import * as reportAction from "../../../../actions/report";
import { MomentInput } from 'react-moment-input'
import moment from "moment";
import ProfitTotal from './ProfitTotal'
import { format } from '../../../../ultis/helpers'
import { getBranchId } from '../../../../ultis/branchUtils'
import history from '../../../../history'
import { DateRangePickerComponent } from "@syncfusion/ej2-react-calendars";

class ReportProfit extends Component {
    constructor(props) {
        super(props)
        this.state = {
            txtStart: "",
            txtEnd: ""
        }
    }
    componentDidMount() {
        const { store_code } = this.props.match.params
        const branch_id = getBranchId() 
        const time = moment().format("YYYY-MM-DD")
        const params = `date_from=${time}&date_to=${time}&branch_id=${branch_id}`
        this.props.fetchReportProfit(store_code, branch_id, params)
        try {
            document.getElementsByClassName('r-input')[0].placeholder = 'Chọn ngày';
            document.getElementsByClassName('r-input')[1].placeholder = 'Chọn ngày';
        } catch (error) {

        }
    }


    handleFindItem = () => {
        const branch_id = getBranchId()
        const params = `date_from=${this.state.txtStart}&date_to=${this.state.txtEnd}&branch_id=${branch_id}`
        const { store_code } = this.props.match.params
        this.props.fetchReportProfit(store_code, branch_id, params)
    }

    onChangeStart = (e) => {
        var time = moment(e, "DD-MM-YYYY").format("YYYY-MM-DD")
        this.setState({
            txtStart: time,
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
      
        const branch_id = getBranchId()
        var params = `branch_id=${branch_id}`
        const { store_code } = this.props.match.params
        if (from, to) { 
           params = `&date_from=${from}&date_to=${to}`
        }   
    
        this.props.fetchReportProfit(store_code, branch_id, params)
    
      }
    onChangeEnd = (e) => {
        var time = moment(e, "DD-MM-YYYY").format("YYYY-MM-DD")
        this.setState({
            txtEnd: time,
        });
    };
    goBack = () => {
            history.goBack();
    };
    render() {
        var { store_code } = this.props.match.params
        const reportProfit = this.props.reportProfit
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
                                <div className='stock-title text-success' style = {{display:"flex" , justifyContent : "space-between"}}>
                                    <h4>Báo cáo lãi lỗ</h4>
                                    <button style={{ marginBottom: "10px" }} type="button" onClick={this.goBack} class="btn btn-warning  btn-sm"><i class="fas fa-arrow-left"></i>&nbsp;Quay lại</button>

                                </div>
                               
                                <ProfitTotal reportProfit ={reportProfit} />
                                <div className='card'>
                                    <div className='card-header py-3'>
                                        <div className='wap-header' style={{ display: 'flex' }}>
                                        <DateRangePickerComponent
                                        
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
                                            </div> */}
                                            {/* <button className='btn btn-primary btn-sm' style={{ marginLeft: "20px", marginBottom: "10px" }} onClick={this.handleFindItem}>Tìm kiếm</button> */}

                                        </div>

                                    </div>
                                    <div className='card-body info-report'>
                                        <div className='row'>
                                            <div className='col-6'>
                                                <div class="form-group" style={{ fontSize: "15px", borderRight:"1px solid" }}>
                                                    <div class="info-badge  badge-report" style={{width:"95%"}} >
                                                        <p class="title" style={{ display: "flex", justifyContent: "space-between" , fontWeight : "500"}}>
                                                            <p > Doanh thu bán hàng (1): </p>
                                                            <span id="user_tel">
                                                                <span className="total-final">{format(Number(reportProfit.sales_revenue))}</span>
                                                            </span>
                                                        </p>
                                                        <p class="" style={{ display: "flex", justifyContent: "space-between" }}>
                                                            <p> Tiền hàng bán ra: </p>
                                                            <span id="user_tel">
                                                                <span className="total-final">{format(Number(reportProfit.money_sales))}</span>
                                                            </span>
                                                        </p>
                                                        <p class="" style={{ display: "flex", justifyContent: "space-between" }}>
                                                            <p> Tiền hàng trả lại: </p>
                                                            <span id="user_tel">
                                                                <span className="total-final">{format(Number(reportProfit.money_back))}</span>
                                                            </span>
                                                        </p>
                                                        <p class="" style={{ display: "flex", justifyContent: "space-between" }}>
                                                            <p> Thuế VAT: </p>
                                                            <span id="user_tel">
                                                                <span className="total-final">{format(Number(reportProfit.tax_vat))}</span>
                                                            </span>
                                                        </p>
                                                        <p class="" style={{ display: "flex", justifyContent: "space-between" }}>
                                                            <p> Phí giao hàng thu của khách: </p>
                                                            <span id="user_tel">
                                                                <span className="total-final">{format(Number(reportProfit.customer_delivery_fee))}</span>
                                                            </span>
                                                        </p>
                                                        <p class="" style={{ display: "flex", justifyContent: "space-between" }}>
                                                            <p> Chiết khấu: </p>
                                                            <span id="user_tel">
                                                                <span className="total-final">{format(Number(reportProfit.discount))}</span>
                                                            </span>
                                                        </p>
                                                  
                                               
                                                        <p class="" style={{ display: "flex", justifyContent: "space-between" }}>
                                                            <p> Giảm giá sản phẩm: </p>
                                                            <span id="user_tel">
                                                                <span className="total-final">{format(Number(reportProfit.product_discount))}</span>
                                                            </span>
                                                        </p>
                                                        <p class="" style={{ display: "flex", justifyContent: "space-between" }}>
                                                            <p> Giảm giá Combo: </p>
                                                            <span id="user_tel">
                                                                <span className="total-final">{format(Number(reportProfit.combo))}</span>
                                                            </span>
                                                        </p>
                                                        <p class="" style={{ display: "flex", justifyContent: "space-between" }}>
                                                            <p> Giảm giá Voucher: </p>
                                                            <span id="user_tel">
                                                                <span className="total-final">{format(Number(reportProfit.voucher))}</span>
                                                            </span>
                                                        </p>
                                                        <p class="" style={{ display: "flex", justifyContent: "space-between" }}>
                                                            <p> Chiết khấu đơn hàng: </p>
                                                            <span id="user_tel">
                                                                <span className="total-final">{format(Number(reportProfit.discount))}</span>
                                                            </span>
                                                        </p>
                                                    </div>

                                                </div></div>
                                            <div className='col-6'>
                                                <div class="form-group" style={{ fontSize: "15px" }}>
                                                    <div class="info-badge  badge-report" >
                                                    <p class="title" style={{ display: "flex", justifyContent: "space-between" , fontWeight : "500" }}>
                                                            <p> Chi phí bán hàng (2): </p>
                                                            <span id="user_tel">
                                                                <span className="total-final">{format(Number(reportProfit.cost_of_sales))}</span>
                                                            </span>
                                                        </p>
                                                        <p class="" style={{ display: "flex", justifyContent: "space-between" }}>
                                                            <p> Giá vốn hàng hóa: </p>
                                                            <span id="user_tel">
                                                                <span className="total-final">{format(Number(reportProfit.selling_expenses))}</span>
                                                            </span>
                                                        </p>
                                                        <p class="" style={{ display: "flex", justifyContent: "space-between" }}>
                                                            <p> Thanh toán bằng điểm: </p>
                                                            <span id="user_tel">
                                                                <span className="total-final">{format(Number(reportProfit.pay_with_points))}</span>
                                                            </span>
                                                        </p>
                                                        <p class="" style={{ display: "flex", justifyContent: "space-between" }}>
                                                            <p> Phí giao hàng trả đối tác: </p>
                                                            <span id="user_tel">
                                                                <span className="total-final">{format(Number(reportProfit.partner_delivery_fee))}</span>
                                                            </span>
                                                        </p>
                                                        <p class="title" style={{ display: "flex", justifyContent: "space-between" , fontWeight : "500"}}>
                                                            <p > Thu nhập khác (3): </p>
                                                            <span id="user_tel">
                                                                <span className="total-final">{format(Number(reportProfit.other_costs))}</span>
                                                            </span>
                                                        </p>
                                                        <p class="" style={{ display: "flex", justifyContent: "space-between" }}>
                                                            <p> Phiếu thu tự tạo: </p>
                                                            <span id="user_tel">
                                                                <span className="total-final">{format(Number(reportProfit.revenue_auto_create))}</span>
                                                            </span>
                                                        </p>
                                                        <p class="" style={{ display: "flex", justifyContent: "space-between" }}>
                                                            <p> Phí khách hàng trả: </p>
                                                            <span id="user_tel">
                                                                <span className="total-final">{format(Number(reportProfit.customer_return))}</span>
                                                            </span>
                                                        </p>
                                                        <p class="title" style={{ display: "flex", justifyContent: "space-between" , fontWeight : "500"}}>
                                                            <p> Chi phí khác (4): </p>
                                                            <span id="user_tel">
                                                                <span className="total-final">{format(Number(reportProfit.other_costs))}</span>
                                                            </span>
                                                        </p>
                                                 
                                                        <p class="title" style={{ display: "flex", justifyContent: "space-between", fontWeight : "500"}}>
                                                            <p> Lợi nhuận (1-2+3-4): </p>
                                                            <span id="user_tel">
                                                                <span className="total-final">{format(Number(reportProfit.profit))}</span>
                                                            </span>
                                                        </p>

                                                    </div>

                                                </div></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    <Footer />
                </div>
            </div>

        )
    }
}
const mapStateToProps = (state) => {
    return {
        reportProfit: state.reportReducers.reportProfit,
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchReportProfit: (store_code, branch_id, params) => {
            dispatch(reportAction.fetchReportProfit(store_code, branch_id, params))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ReportProfit)