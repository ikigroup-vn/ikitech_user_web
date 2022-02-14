import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { filter_var } from "../../ultis/helpers";
import Stars from "../Partials/Stars";
import { shallowEqual } from "../../ultis/shallowEqual";
class General extends Component {
    constructor(props) {
        super(props);
        this.state = {
            txtPassword: "",
            txtOTP: "",
        };
    }


    shouldComponentUpdate(nextProps, nextState) {
        if (!shallowEqual(nextProps.reviews, this.state.reviews)) {
            return true
        }
        return false
    }


    render() {
        var { reviews, store_code } = this.props
        var {
            total_reviews,
            total_pending_approval,
            total_cancel,
            total_1_stars,
            total_2_stars,
            total_3_stars,
            total_4_stars,
            total_5_stars
        } = reviews

        return (

            <div className="row">
                <div className="col-xl-3 col-md-4 mb-4">
                    <div className="card border-left-warning shadow h-100 py-2">
                        <div className="card-body card-width">
                            <div className="row  align-items-center">
                                <div className="col mr-2">
                                    <div>
                                        Đánh giá
                                    </div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">{ total_reviews}</div>
                                </div>
                                <div className="col-auto">
                                    <i className="fas fa-boxes fa-2x text-gray-300"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-md-4 mb-4">
                    <div className="card border-left-warning shadow h-100 py-2">
                        <div className="card-body card-width">
                            <div className="row  align-items-center">
                                <div className="col mr-2">
                                    <div>
                                        Đang chờ
                                    </div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">{ total_pending_approval}</div>
                                </div>
                                <div className="col-auto">
                                    <i className="fas fa-boxes fa-2x text-gray-300"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-md-4 mb-4">
                    <div className="card border-left-danger shadow h-100 py-2">
                        <div className="card-body card-width">
                            <div className="row  align-items-center">
                                <div className="col mr-2">
                                    <div>
                                        Đã hủy
                                    </div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">{ total_cancel}</div>
                                </div>
                                <div className="col-auto">
                                    <i className="fas fa-times fa-2x text-gray-300"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-md-4 mb-4">
                    <div className="card border-left-primary shadow h-100 py-2">
                        <div className="card-body card-width">
                            <div className="row  align-items-center">
                                <div className="col mr-2">

                                    <div className=" font-weight-bold text-primary text-uppercase mb-1">
                                        <Stars num={5} />
                                    </div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">{total_5_stars}</div>
                                </div>
                                <div className="col-auto">
                                    <i className="fas fa-star fa-2x text-gray-300"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-xl-3 col-md-4 mb-4">
                    <div className="card border-left-success shadow h-100 py-2">
                        <div className="card-body card-width">
                            <div className="row  align-items-center">
                                <div className="col mr-2">
                                    <div >
                                        <Stars num={4} />

                                    </div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">{total_4_stars }</div>
                                </div>
                                <div className="col-auto">
                                    <i className="fas fa-star fa-2x text-gray-300"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-md-4 mb-4">
                    <div className="card border-left-danger shadow h-100 py-2">
                        <div className="card-body card-width">
                            <div className="row  align-items-center">
                                <div className="col mr-2">
                                    <div >
                                        <Stars num={3} />

                                    </div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">{total_3_stars }</div>
                                </div>
                                <div className="col-auto">
                                    <i className="fas fa-star fa-2x text-gray-300"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-md-4 mb-4">
                    <div className="card border-left-secondary shadow h-100 py-2">
                        <div className="card-body card-width">
                            <div className="row  align-items-center">
                                <div className="col mr-2">
                                    <div >
                                        <Stars num={2} />

                                    </div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">{total_2_stars }</div>
                                </div>
                                <div className="col-auto">
                                    <i className="fas fa-star fa-2x text-gray-300"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-md-4 mb-4">
                    <div className="card border-left-info shadow h-100 py-2">
                        <div className="card-body card-width">
                        <div className="row  align-items-center">
                                <div className="col mr-2">
                                    <div >
                                        <Stars num={1} />

                                    </div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">{total_1_stars }</div>
                                </div>
                                <div className="col-auto">
                                    <i className="fas fa-star fa-2x text-gray-300"></i>
                                </div>
                            </div>
                            {/* <div className="row  align-items-center">
                                <div className="col mr-2">
                                    <div>
                                        <Stars num={1} />

                                    </div>
                                    <div className="row  align-items-center">
                                        <div className="col-auto">
                                            <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">{total_1_stars }</div>
                                        </div>

                                    </div>
                                </div>
                                <div className="col-auto">
                                    <i className="fas fa-star fa-2x text-gray-300"></i>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>


            </div>
        );
    }
}

export default General

