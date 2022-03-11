import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class General extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    render() {
        const { store_code } = this.props
        return (
            <div className="row">

                <div className="col-xl-4 col-md-6 mb-4">
                    <Link
                        to={`/report_inventory/${store_code}`}
                    >
                        <div className="card border-left-primary shadow h-100 py-2">
                            <div className="card-body set-padding ">
                                <div className="row no-gutters align-items-center">
                                    <div className="col mr-2">
                                        <div className=" font-weight-bold text-primary text-uppercase mb-1">
                                            Báo cáo tồn kho</div>
                                        <div className="text-gray-800">Tổng hợp giá trị và số lượng sản phẩm tồn kho</div>
                                    </div>
                                    <div className="col-auto">
                                        <i className="fas fa-file-invoice fa-2x text-gray-300"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>

                </div>

                <div className="col-xl-4 col-md-6 mb-4">
                    <Link
                        to={`/inventory_histories/${store_code}`}
                    >
                        <div className="card border-left-success shadow h-100 py-2">
                            <div className="card-body set-padding ">
                                <div className="row no-gutters align-items-center">
                                    <div className="col mr-2">
                                        <div className=" font-weight-bold text-success text-uppercase mb-1">
                                            Sổ kho</div>
                                        <div className="text-gray-800">Quản lý luồng suất kho, nhập kho</div>
                                    </div>
                                    <div className="col-auto">
                                        <i className="fas fa-boxes fa-2x text-gray-300"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
                <div className="col-xl-4 col-md-6 mb-4">
                    <Link
                        to={`/import_export_stock/${store_code}`}
                    >
                        <div className="card border-left-danger shadow h-100 py-2">
                            <div className="card-body set-padding ">
                                <div className="row no-gutters align-items-center">
                                    <div className="col mr-2">
                                        <div className=" font-weight-bold text-danger text-uppercase mb-1">
                                            Xuất nhập tồn</div>
                                        <div className="text-gray-800">Quản lý xuất nhập, tồn kho theo sản phẩm</div>
                                    </div>
                                    <div className="col-auto">
                                        <i className="fas fa-eye-slash fa-2x text-gray-300"></i>
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

export default General
