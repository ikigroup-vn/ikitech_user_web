import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import * as agencyAction from "../../../actions/agency";
import ModalRemove from "./ModalRemove";
import ModalUpdate from "./ModalUpdate";

import ModalUpdateCommission from "./Commission/ModalUpdateCommission";
import { formatNumberV2 } from "../../../ultis/helpers";

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: {
        name: "",
        id: "",
      },
      modalUpdate: {
        name: "",
        id: "",
      },
    };
  }

  handleRemove = (id, name) => {
    this.setState({ modal: { name: name, id: id } });
  };

  handleUpdate = (id, name) => {
    this.setState({ modalUpdate: { name: name, id: id } });
  };

  handleUpdateCommission = (ob) => {
    this.setState({ modalUpdateCommission: ob });
  };

  showData = (types) => {
    var { store_code, isAutoSetLevelAgency } = this.props;
    var result = null;
    if (types.length > 0) {
      result = types.map((data, index) => {
        return (
          <React.Fragment>
            <tr className="hover-product">
              <td>{index + 1}</td>
              <td>{data.name}</td>
              {isAutoSetLevelAgency && (
                <>
                  <td>
                    {data.auto_set_value_import
                      ? `${formatNumberV2(data.auto_set_value_import)} ₫`
                      : "0 ₫"}
                  </td>
                  <td>
                    {data.auto_set_value_import
                      ? `${formatNumberV2(data.auto_set_value_share)} ₫`
                      : "0 ₫"}
                  </td>
                </>
              )}

              <td>
                <Link
                  to={`/product-agency/index/${store_code}/${data.id}?tab-index=0`}
                  style={{ marginRight: "10px" }}
                  data-toggle="modal"
                  data-target="#updateType"
                  class={`btn btn-success btn-sm `}
                >
                  <i class="fa fa-edit"></i> Cấu hình sản phẩm
                </Link>
                <button
                  onClick={() => this.handleUpdate(data.id, data.name)}
                  data-toggle="modal"
                  data-target="#updateType"
                  class={`btn btn-outline-warning btn-sm `}
                >
                  <i class="fa fa-edit"></i> Sửa
                </button>

                <button
                  onClick={() => this.handleRemove(data.id, data.name)}
                  style={{ marginLeft: "10px" }}
                  data-toggle="modal"
                  data-target="#removeType"
                  class={`btn btn-outline-danger btn-sm`}
                >
                  <i class="fa fa-trash"></i> Xóa
                </button>
              </td>
            </tr>
          </React.Fragment>
        );
      });
    } else {
      return result;
    }
    return result;
  };

  render() {
    var types = typeof this.props.types == "undefined" ? [] : this.props.types;

    var { modal, modalUpdate, modalUpdateCommission } = this.state;
    const { isAutoSetLevelAgency } = this.props;
    return (
      <div class="table-responsive">
        <ModalRemove modal={modal} store_code={this.props.store_code} />
        <ModalUpdate modal={modalUpdate} store_code={this.props.store_code} />
        <ModalUpdateCommission
          modal={modalUpdateCommission}
          store_code={this.props.store_code}
        />

        <table class="table table-border">
          <thead>
            <tr>
              <th>Cấp bậc</th>
              <th>Tên cấp đại lý</th>
              {isAutoSetLevelAgency && (
                <>
                  <th>Doanh số nhập hàng</th>
                  <th>Doanh số hoa hồng</th>
                </>
              )}
              <th>Hành động</th>
            </tr>
          </thead>

          <tbody>{this.showData(types)}</tbody>
        </table>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    updateAgency: (store_code, id, data) => {
      dispatch(agencyAction.updateAgency(store_code, id, data));
    },
  };
};
export default connect(null, mapDispatchToProps)(Table);
