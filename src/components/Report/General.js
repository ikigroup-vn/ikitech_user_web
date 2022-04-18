import React, { Component } from "react";
import { Link } from 'react-router-dom'
import { filter_var } from "../../ultis/helpers"

class General extends Component {
    constructor(props) {
        super(props);
        this.state = {
            txtPassword: "",
            txtOTP: "",
        };
    }



    render() {
        var { store, store_code, collaborators , numDiscount } = this.props
        var total_collaborators = typeof collaborators.data != "undefined" ? collaborators.data.length : 0
        var total_orders = filter_var(store.total_orders)
        var total_products = filter_var(store.total_products)
        var total_posts = filter_var(store.total_posts)
        var total_customers = filter_var(store.total_customers)

        return (

            <div className="row">

                <div className="col-xl-4 col-md-6 mb-4">
                    <div className="card border-left-primary shadow h-100 py-2">
                        <div className="card-body">
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <div className=" font-weight-bold text-primary text-uppercase mb-1">
                                        <Link to={`/order/${store_code}`}>Đơn hàng</Link>
                                    </div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">{total_orders}</div>
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
                        <div className="card-body">
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <div >
                                        <Link className=" font-weight-bold text-success text-uppercase mb-1" to={`/product/index/${store_code}`}>Sản phẩm</Link>
                                    </div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">{total_products}</div>
                                </div>
                                <div className="col-auto">
                                    <i className="fas fa-boxes fa-2x text-gray-300"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-4 col-md-6 mb-4">
                    <div className="card border-left-secondary shadow h-100 py-2">
                        <div className="card-body">
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <div >
                                        <Link className=" font-weight-bold text-secondary text-uppercase mb-1" to={`/posts/${store_code}`}>Bài viết
                                        </Link>
                                    </div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">{total_posts}</div>
                                </div>
                                <div className="col-auto">
                                    <i className="fas fa-newspaper fa-2x text-gray-300"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-xl-4 col-md-6 mb-4">
                    <div className="card border-left-danger shadow h-100 py-2">
                        <div className="card-body">
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <div >
                                        <Link className=" font-weight-bold text-danger text-uppercase mb-1" to={`/collaborator/${store_code}`}>Cộng tác viên
                                        </Link>
                                    </div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">{total_collaborators}</div>
                                </div>
                                <div className="col-auto">
                                    <i className="fas fa-list fa-2x text-gray-300"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-4 col-md-6 mb-4">
                    <div className="card border-left-info shadow h-100 py-2">
                        <div className="card-body">
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <div >
                                        <Link className=" font-weight-bold text-info text-uppercase mb-1" to={`/report/${store_code}`}>Báo cáo
                                        </Link>
                                    </div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">0</div>
                                </div>
                                <div className="col-auto">
                                    <i className="fas fa-fw fa-chart-line fa-2x text-gray-300"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-xl-4 col-md-6 mb-4">
                    <div className="card border-left-warning shadow h-100 py-2">
                        <div className="card-body">
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <div>
                                        <Link className=" font-weight-bold text-warning text-uppercase mb-1" to={`/customer/${store_code}`}>    Khách hàng

                                        </Link>

                                    </div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">{total_customers}</div>
                                </div>
                                <div className="col-auto">
                                    <i className="fas fa-user fa-2x text-gray-300"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className="col-xl-4 col-md-6 mb-4">
                    <div className="card border-left-secondary shadow h-100 py-2">
                        <div className="card-body">
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <div >
                                        <Link className=" font-weight-bold text-secondary text-uppercase mb-1" to={`/discount/${store_code}`}>Khuyến mại
                                        </Link>
                                    </div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">{numDiscount}</div>
                                </div>
                                <div className="col-auto">
                                    <i className="fa fa-percent fa-2x text-gray-300"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}
            </div>
        );
    }
}

export default General

