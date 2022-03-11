import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { format } from '../../../ultis/helpers'
import * as reportAction from "../../../actions/report";

class General extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    componentDidMount(){
        const { store_code } = this.props
        const branch_id = localStorage.getItem("branch_id")
        this.props.fetchAllSupplierDebt(store_code, branch_id)
        this.props.fetchAllCustomerDebt(store_code, branch_id)
    }
    render() {
        const { store_code, profitToltal,supplierDebt,custommerDebt } = this.props
        return (
            <div className="row">

                <div className="col-xl-3 col-md-6 mb-4">
                    <Link
                        to={`/report_profit/${store_code}`}
                    >
                        <div className="card border-left-primary shadow h-100 py-2">
                            <div className="card-body set-padding ">
                                <div className="row no-gutters align-items-center">
                                    <div className="col mr-2">
                                        <div className=" font-weight-bold text-primary text-uppercase mb-1">
                                            Báo cáo lãi lỗ</div>
                                        <div className="h5 mb-0 font-weight-bold text-gray-800">{format(Number(profitToltal))}</div>
                                        <div className="text-gray-800">Hiển thị doanh thu,chi phí và lãi lỗ của cửa hàng trong kỳ</div>
                                        
                                    </div>
                                    <div className="col-auto">
                                        <i className="fas fa-file-invoice fa-2x text-gray-300"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>

                </div>

                <div className="col-xl-3 col-md-6 mb-4">
                    <Link
                        to={``}
                    >
                        <div className="card border-left-success shadow h-100 py-2">
                            <div className="card-body set-padding ">
                                <div className="row no-gutters align-items-center">
                                    <div className="col mr-2">
                                        <div className=" font-weight-bold text-success text-uppercase mb-1">
                                            Sổ quỹ</div>
                                        <div className="h5 mb-0 font-weight-bold text-gray-800">{format(Number(0))}</div>
                                        <div className="text-gray-800">Quản lý luồng ra, vào cửa hàng</div>
                                        
                                    </div>
                                    <div className="col-auto">
                                        <i className="fas fa-boxes fa-2x text-gray-300"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
                <div className="col-xl-3 col-md-6 mb-4">
                    <Link
                        to={`/customer_debt/${store_code}`}
                    >
                        <div className="card border-left-danger shadow h-100 py-2">
                            <div className="card-body set-padding ">
                                <div className="row no-gutters align-items-center">
                                    <div className="col mr-2">
                                        <div className=" font-weight-bold text-danger text-uppercase mb-1">
                                            Công nợ phải thu</div>
                                        <div className="h5 mb-0 font-weight-bold text-gray-800">{format(Number(custommerDebt.debt))}</div>
                                        <div className="text-gray-800">Tổng công nợ phải thu của khách hàng</div>                                
                                    </div>
                                    <div className="col-auto">
                                        <i className="fas fa-eye-slash fa-2x text-gray-300"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>

                </div>

                <div className="col-xl-3 col-md-6 mb-4">
                    <Link
                        to={`/supplier_debt/${store_code}`}
                    >
                        <div className="card border-left-danger shadow h-100 py-2">
                            <div className="card-body set-padding ">
                                <div className="row no-gutters align-items-center">
                                    <div className="col mr-2">
                                        <div className=" font-weight-bold text-warning text-uppercase mb-1">
                                            Công nợ phải trả</div>
                                        <div className="h5 mb-0 font-weight-bold text-gray-800">{format(Number(supplierDebt.debt))}</div>
                                        <div className="text-gray-800">Tổng công nợ phải trả nhà cung cấp</div>
                                
                                    </div>
                                    <div className="col-auto">
                                        <i className="	fas fa-balance-scale fa-2x text-gray-300"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>

                </div>

            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        supplierDebt: state.reportReducers.supplierDebt,
        custommerDebt: state.reportReducers.custommerDebt,
    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchAllSupplierDebt: (store_code, branch_id, params) => {
            dispatch(reportAction.fetchAllSupplierDebt(store_code, branch_id, params))
        },
        fetchAllCustomerDebt: (store_code, branch_id, params) => {
            dispatch(reportAction.fetchAllCustomerDebt(store_code, branch_id, params))
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(General)
