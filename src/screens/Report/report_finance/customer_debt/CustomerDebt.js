import React, { Component } from 'react'
import { connect } from 'react-redux'
import Alert from '../../../../components/Partials/Alert'
import Footer from '../../../../components/Partials/Footer'
import Sidebar from '../../../../components/Partials/Sidebar'
import Topbar from '../../../../components/Partials/Topbar'
import * as Types from "../../../../constants/ActionType"
import * as reportAction from "../../../../actions/report";
import { MomentInput } from 'react-moment-input'
import moment from 'moment'
import { format } from '../../../../ultis/helpers'

class CustomerDebt extends Component {
    constructor(props) {
        super(props)
        this.state = {
            txtStart: ""
        }
    }
    componentDidMount() {
        const { store_code } = this.props.match.params
        const branch_id = localStorage.getItem("branch_id")
        this.props.fetchAllCustomerDebt(store_code, branch_id)
        try {
            document.getElementsByClassName('r-input')[0].placeholder = 'Hôm nay';
        } catch (error) {

        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        if (this.state.txtStart !== nextState.txtStart) {
            const params = `date=${nextState.txtStart}`
            const { store_code } = this.props.match.params
            const branch_id = localStorage.getItem("branch_id")
            this.props.fetchAllCustomerDebt(store_code, branch_id, params)

        }
        return true
    }
    onChangeStart = (e) => {
        var time = moment(e, "DD-MM-YYYY").format("YYYY-MM-DD")
        console.log("time", time)
        this.setState({
            txtStart: time,
        });
    };
    showData = (listCustomerDebt) => {
        var result = null
        if (listCustomerDebt) {
          result = listCustomerDebt.map((item, index) => {
            return (
              <>
                <tr>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.phone_number}</td>
                  <td>{item.email}</td>
                  <td>{format(Number(item.debt))}</td>
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
        const { store_code } = this.props.match.params
        const {custommerDebt} = this.props
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

                                <div className='card'>
                                    <div className='card-header py-3' style={{ display: "flex", justifyContent: "space-between" }} >
                                        <div className='stock-title text-primary'>
                                            <h4 style={{display:"flex"}}>Công nợ phải thu khách hàng
                                            <div style={{ paddingLeft: "20px" }}>
                                                    <i class="fas fa-arrow-circle-right"></i>
                                                    <span
                                                        style={{
                                                            color: "#17a2b8",
                                                            paddingLeft: "10px",
                                                        }}
                                                    >
                                                        {format(Number(custommerDebt.debt))}
                                                    </span>
                                                </div>
                                            </h4>
                                        </div>
                                        <div class="form-group" style={{ display: "flex", alignItems: "center", marginRight: "100px" }}>
                                            <label for="product_name" style={{ marginRight: "20px" }}>Thời gian</label>
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

                                    </div>
                                    <div className='card-body' style={{height:"500px"}}>
                                        <div class="table-responsive">
                                            <table class="table  " id="dataTable" width="100%" cellspacing="0">
                                                <thead>
                                                    <tr>
                                                        <th>STT</th>
                                                        <th>Tên khách hàng</th>
                                                        <th>Số điện thoại</th>
                                                        <th>Email</th>
                                                        <th>Tiền nợ</th>
                                                    </tr>
                                                </thead>

                                                <tbody>{this.showData(custommerDebt.data)}</tbody>
                                            </table>
                                        </div>

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
        custommerDebt: state.reportReducers.custommerDebt,
    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchAllCustomerDebt: (store_code, branch_id, params) => {
            dispatch(reportAction.fetchAllCustomerDebt(store_code, branch_id, params))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CustomerDebt)