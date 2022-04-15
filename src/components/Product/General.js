import React, { Component } from "react";
import {Link} from 'react-router-dom'

class General extends Component {
  constructor(props) {
    super(props);
  }

 

  render() {
    var {products} = this.props
    var total_stoking = typeof products.total_stoking == "undefined" ? 0 : products.total_stoking
    var total_out_of_stock = typeof products.total_out_of_stock == "undefined" ? 0 : products.total_out_of_stock
    // var total_hide = typeof products.total_hide == "undefined" ? 0 : products.total_hide

    
    return (

        <div className="row">

        <div className="col-xl-6 col-md-6 mb-6">
            <div className="card border-left-primary shadow h-100 py-2">
                <div className="card-body set-padding ">
                    <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
                            <div className=" font-weight-bold text-primary text-uppercase mb-1">
                               Còn hàng</div>
                            <div className="h5 mb-0 font-weight-bold text-gray-800">{total_stoking}</div>
                        </div>
                        <div className="col-auto">
                            <i className="fas fa-file-invoice fa-2x text-gray-300"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="col-xl-6 col-md-6 mb-6">
            <div className="card border-left-success shadow h-100 py-2">
                <div className="card-body set-padding ">
                    <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
                            <div className=" font-weight-bold text-success text-uppercase mb-1">
                                Hết hàng</div>
                            <div className="h5 mb-0 font-weight-bold text-gray-800">{total_out_of_stock}</div>
                        </div>
                        <div className="col-auto">
                            <i className="fas fa-boxes fa-2x text-gray-300"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <br/>
        {/* <div className="col-xl-6 col-md-6 mb-6">
            <div className="card border-left-danger shadow h-100 py-2">
                <div className="card-body set-padding ">
                    <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
                            <div className=" font-weight-bold text-danger text-uppercase mb-1">
                                Đã ẩn</div>
                            <div className="h5 mb-0 font-weight-bold text-gray-800">{total_hide}</div>
                        </div>
                        <div className="col-auto">
                            <i className="fas fa-eye-slash fa-2x text-gray-300"></i>
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

