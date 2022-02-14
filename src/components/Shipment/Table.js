import React, { Component } from "react";
import * as shipmentPAction from "../../actions/shipment";
import { connect } from "react-redux";
class Table extends Component {
  constructor(props) {
    super(props);
  }

  passEditFunc = (e, id , token) => {
    this.props.handleUpdateCallBack({id : id , token : token});
    e.preventDefault();
  };

  passDeleteFunc = (e, id) => {
    this.props.handleDelCallBack({title : "Danh mục" , id : id});
    e.preventDefault();
  };

  use = (e , id , token) => {
    this.props.updateShipment(this.props.store_code,id,{
      token : token,
      use : true,
    });
  };

  unUse = (e ,id , token) =>{
    this.props.updateShipment(this.props.store_code,id,{
      token : token,

      use : false,
    });
  }

  showData = (shipments) => {
    var result = null;
    if (shipments.length > 0) {
      var {update} = this.props
      result = shipments.map((data, index) => {
        var use = typeof data.shipper_config == "undefined" || data.shipper_config ==null ? "Trống" : data.shipper_config.use == true ? "Đang hoạt động" : "Đã dừng"
        var status_use = typeof data.shipper_config == "undefined" ||  data.shipper_config ==null  ? "secondary" : data.shipper_config.use == true ? "success" : "danger"
        var disable_unUse = typeof data.shipper_config == "undefined" ||  data.shipper_config ==null  ? "hide" : data.shipper_config.use == true ? "show" : "hide"
        var disable_use = typeof data.shipper_config == "undefined" ||  data.shipper_config ==null  ? "hide" : data.shipper_config.use == true ? "hide" : "show"

        var token = typeof data.shipper_config == "undefined" ||  data.shipper_config ==null  ? "Trống" : data.shipper_config.token

        return (
          <tr>
            <td>{index + 1}</td>
            <td>{data.id}</td>
            <td>{data.name}</td>
            <td>{token}</td>

            <td>
              <h5>
                <span class={`badge badge-${status_use}`}>
                  {" "}
                  {use}
                </span>{" "}
              </h5>
            </td>


            <td>
              <a
                style={{ marginLeft: "10px" }}
                onClick={(e) => this.passEditFunc(e,data.id , token)}
                data-toggle="modal"
                data-target="#updateModal"
                class={`btn btn-warning btn-sm ${update == true ? "show" : "hide"}`}
              >
                <i class="fa fa-edit"></i>Sửa
              </a>
              <a
                style={{ marginLeft: "10px" }}
                onClick={(e) => this.unUse(e,data.id , token)}
                data-toggle="modal"
                data-target="#removeModal"
                class={`btn btn-danger btn-sm ${disable_unUse}`}
              >
                <i class="fa fa-trash"></i> Tạm dừng
              </a>
              <a
                style={{ marginLeft: "10px" }}
                onClick={(e) => this.use(e,data.id , token)}
                data-toggle="modal"
                data-target="#removeModal"
                class={`btn btn-success btn-sm ${disable_use}`}
              >
                <i class="fa fa-trash"></i> Bật
              </a>
            </td>
          </tr>
        );
      });
    } else {
      return result;
    }
    return result;
  };

  render() {
    console.log(this.props.shipment);
    return (
      <div class="table-responsive">
        <table class="table " id="dataTable" width="100%" cellspacing="0">
          <thead>
            <tr>
              <th>STT</th>
              <th>Mã</th>
              <th>Tên </th>
              <th>Token </th>
              <th>Trạng thái </th>

              <th>Hành động</th>
            </tr>
          </thead>

          <tbody>{this.showData(this.props.shipment)}</tbody>
        </table>
      </div>
    );
  }
}



const mapDispatchToProps = (dispatch, props) => {
  return {
    updateShipment: (store_code , id, data) => {
      dispatch(shipmentPAction.updateShipment(store_code , id, data));
    },
  };
};
export default connect(null, mapDispatchToProps)(Table);