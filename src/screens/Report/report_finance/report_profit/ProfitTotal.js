import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { format } from '../../../../ultis/helpers'

class ProfitTotal extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    render() {
        const { reportProfit } = this.props
        return (
            <div className="row">

                <div className="col-xl-4 col-md-6 mb-4">
                        <div className="card border-left-primary shadow h-100 py-2">
                            <div className="card-body set-padding ">
                                <div className="row no-gutters align-items-center">
                                    <div className="col mr-2">
                                        <div className=" font-weight-bold text-primary text-uppercase mb-1">
                                            Doanh thu bán hàng</div>
                                            <div className="h5 mb-0 font-weight-bold text-gray-800">{format(Number(reportProfit.sales_revenue))}</div>
                                    </div>
                                    <div className="col-auto">
                                        <i className="fas fa-file-invoice fa-2x text-gray-300"></i>
                                    </div>
                                </div>
                            </div>
                        </div>

                </div>

                <div className="col-xl-4 col-md-6 mb-4">
                        <div className="card border-left-success shadow h-100 py-2">
                            <div className="card-body set-padding ">
                                <div className="row no-gutters align-items-center">
                                    <div className="col mr-2">
                                        <div className=" font-weight-bold text-success text-uppercase mb-1">
                                            Chi phí bán hàng</div>
                                            <div className="h5 mb-0 font-weight-bold text-gray-800">{format(Number(reportProfit.profit))}</div>
                                    </div>
                                    <div className="col-auto">
                                        <i className="fas fa-boxes fa-2x text-gray-300"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>
                <div className="col-xl-4 col-md-6 mb-4">
                        <div className="card border-left-danger shadow h-100 py-2">
                            <div className="card-body set-padding ">
                                <div className="row no-gutters align-items-center">
                                    <div className="col mr-2">
                                        <div className=" font-weight-bold text-danger text-uppercase mb-1">
                                            Lợi nhuận khác</div>
                                            <div className="h5 mb-0 font-weight-bold text-gray-800">{format(Number(reportProfit.other_income))}</div>
                                    </div>
                                    <div className="col-auto">
                                        <i className="fas fa-eye-slash fa-2x text-gray-300"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>

            </div>
        )
    }
}

export default ProfitTotal
