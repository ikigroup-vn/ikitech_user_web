import React, { Component } from "react";
import { Link } from 'react-router-dom'
import { filter_var } from "../../ultis/helpers"
import * as notificationAction from "../../actions/notification";
import { connect } from "react-redux";
import getChannel, { IKITECH } from "../../ultis/channel";
import { format } from "../../ultis/helpers";

class General extends Component {
    constructor(props) {
        super(props);
        this.state = {
            txtPassword: "",
            txtOTP: "",
        };
    }


    fetchNotification = () => {
        window.$('.notification-toggle').dropdown('toggle');

        this.props.fetchAllNotification(this.props.store_code);

    }

    render() {
        var { store, store_code, collaborators, numDiscount, badges } = this.props
        var total_collaborators = typeof collaborators.data != "undefined" ? collaborators.data.length : 0
        var total_orders = filter_var(store.total_orders)
        var total_products = filter_var(store.total_products)
        var total_posts = filter_var(store.total_posts)
        var total_customers = filter_var(store.total_customers)
        var total_unreadNoti = filter_var(badges.notification_unread)

        return (

            <div className="row">

                <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card border-left-success shadow h-100 py-2">
                        <div className="card-body set-padding">
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <div >
                                        <Link className=" font-weight-bold text-success text-uppercase mb-1" to={`/order/${store_code}`}>Doanh thu ngày</Link>
                                    </div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">{format(badges.total_final_in_day)}</div>
                                </div>
                                <div className="col-auto">
                                    <i className="fas fa-boxes fa-2x text-gray-300"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card border-left-primary shadow h-100 py-2">
                        <div className="card-body set-padding">
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <div className=" font-weight-bold text-primary text-uppercase mb-1">
                                        <Link to={`/order/${store_code}`}>Hóa đơn</Link>
                                    </div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">{badges.total_orders_in_day}</div>
                                </div>
                                <div className="col-auto">
                                    <i className="fas fa-file-invoice fa-2x text-gray-300"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>



                {
                    getChannel() == IKITECH &&
                    <div className="col-xl-3 col-md-6 mb-4">
                        <div className="card border-left-secondary shadow h-100 py-2">
                            <div className="card-body set-padding">
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
                }

                {getChannel() == IKITECH &&
                    <div className="col-xl-3 col-md-6 mb-4">
                        <div className="card border-left-danger shadow h-100 py-2">
                            <div className="card-body set-padding">
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

                }
                {getChannel() == IKITECH && <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card border-left-info shadow h-100 py-2">
                        <div className="card-body set-padding">
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
                }

                <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card border-left-warning shadow h-100 py-2">
                        <div className="card-body set-padding">
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <div>
                                        <Link className=" font-weight-bold text-warning text-uppercase mb-1" to={`/order/${store_code}`}>    Đơn hoàn trả

                                        </Link>

                                    </div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">{badges.orders_refunds}</div>
                                </div>
                                <div className="col-auto">
                                    <i className="fas fa-user fa-2x text-gray-300"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card border-left-secondary shadow h-100 py-2">
                        <div className="card-body set-padding">
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <div >
                                        <Link className=" font-weight-bold text-secondary text-uppercase mb-1" to={`/pos/${store_code}`}>Đơn lưu tạm
                                        </Link>
                                    </div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">{badges.temporary_order}</div>
                                </div>
                                <div className="col-auto">
                                    <i className="fas fa-sales fa-2x text-gray-300"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {

                    getChannel() == IKITECH &&
                    <div className="col-xl-3 col-md-6 mb-4" >
                        <div className="card border-left-primary shadow h-100 py-2">
                            <div className="card-body set-padding">
                                <div className="row no-gutters align-items-center">
                                    <div className="col mr-2">
                                        <div className=" font-weight-bold text-primary text-uppercase mb-1">
                                            <a onClick={this.fetchNotification}>Thông báo</a>
                                        </div>
                                        <div className="h5 mb-0 font-weight-bold text-gray-800">{total_unreadNoti}</div>
                                    </div>
                                    <div className="col-auto">
                                        <i className="fas fa-file-invoice fa-2x text-gray-300"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchAllNotification: (store_code, page) => {
            dispatch(notificationAction.fetchAllNotification(store_code, page));
        },

    };
};
export default connect(null, mapDispatchToProps)(General);
