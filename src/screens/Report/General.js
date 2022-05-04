import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {formatNoD} from "../../ultis/helpers"
class General extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    render() {
        const { store_code , reportInventory , reportImportExport} = this.props
        const {total_value_stock , total_stock} = reportInventory
        const {import_total_amount , exporttotal_amount} = reportImportExport
        return (
            <div className="row">

                <div style = {{marginBottom : "20px"}} className="col-xl-12 col-md-12 mb-12">
                    <a
                        
                    >
                        <div className="card border-left-primary shadow h-100 py-2">
                            <div className="card-body set-padding ">
                                <div className="row no-gutters align-items-center">
                                    <div className="col mr-2">
                                        <div className=" font-weight-bold text-primary text-uppercase mb-1">
                                            Tồn kho cuối kỳ: {formatNoD(total_value_stock)}  -  Số lượng:  {formatNoD(total_stock)} </div>
                                            <span>Số lượng bao gồm các sản phẩm đang giao dịch</span>
                                        <div className="text-gray-800">
                                            Nhập trong kỳ : {formatNoD(import_total_amount)} - Xuất trong kỳ : {formatNoD(exporttotal_amount)} 
                                        </div>
                                        <div className="text-gray-800">
                                          Giá trị tồn kho = Số lượng * Giá vốn (Giá vốn (MAC) là bình quân giá sản phẩm được tính sau mỗi lần nhập hàng)
                                        </div>
                                        
                                    </div>
                                    <div className="col-auto">
                                        <i className="fas fa-file-invoice fa-2x text-gray-300"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </a>

                </div>

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
                                        <i className="fas fa-retweet fa-2x text-gray-300"></i>
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
