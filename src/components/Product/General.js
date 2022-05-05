import React, { Component } from "react";
import { Link } from 'react-router-dom'
import history from "../../"
import * as productAction from "../../actions/product";
import { connect } from "react-redux";

class General extends Component {
    constructor(props) {
        super(props);
    }


    getProduct = (is_near_out_of_stock) => {
        var params = null
        if (is_near_out_of_stock) {
            params = params + `&is_near_out_of_stock=true`
            this.props.paramNearStock(true)
        }
        else
        {
            this.props.paramNearStock(false)
        }
        this.props.fetchAllProductV2(this.props.store_code, this.props.branch_id, 1, params
        );
    }


    render() {
        var { products, badges } = this.props

        var total_stoking = typeof products.total_stoking == "undefined" ? 0 : products.total_stoking
        var total_out_of_stock = typeof products.total_out_of_stock == "undefined" ? 0 : products.total_out_of_stock
        // var total_hide = typeof products.total_hide == "undefined" ? 0 : products.total_hide


        return (

            <div className="row" style={{ marginBottom: "20px" }}>

                <div className="col-xl-6 col-md-6 mb-6" onClick={() => this.getProduct()} >
                    <div className="card border-left-primary shadow h-100 py-2">
                        <div className="card-body set-padding ">
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <div className=" font-weight-bold text-primary text-uppercase mb-1">
                                        Tất cả sản phẩm</div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">{total_stoking + total_out_of_stock}</div>
                                </div>
                                <div className="col-auto">
                                    <i className="fas fa-file-invoice fa-2x text-gray-300"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-xl-6 col-md-6 mb-6" onClick={() => this.getProduct(true)} >
                    <div className="card border-left-danger shadow h-100 py-2">
                        <div className="card-body set-padding ">
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <div className=" font-weight-bold text-danger text-uppercase mb-1">
                                        Sắp hết hàng</div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">{this.props.badges?. total_product_or_discount_nearly_out_stock}</div>
                                </div>
                                <div className="col-auto">
                                    <i className="fas fa-eye-slash fa-2x text-gray-300"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>



            </div>
        );
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchAllProductV2: (store_code, branch_id, page, params) => {
            dispatch(productAction.fetchAllProductV2(store_code, branch_id, page, params));
        },

    };
};
export default connect(null, mapDispatchToProps)(General);

