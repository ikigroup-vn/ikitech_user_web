import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import * as agencyAction from "../../../actions/agency";
import ModalRemove from "./ModalRemove"
import ModalUpdate from "./ModalUpdate"

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: {
        name: "",
        id: ""
      },
      modalUpdate: {
        name: "",
        id: ""
      }
    };
  }

  handleRemove = (id, name) => {
    this.setState({ modal: { name: name, id: id } })
  }

  handleUpdate = (id, name) => {
    this.setState({ modalUpdate: { name: name, id: id } })
  }

  showData = (types) => {
    var { store_code } = this.props;
    var result = null;
    if (types.length > 0) {
      result = types.map((data, index) => {

        return (
          <React.Fragment>
            <tr className ="hover-product">
              <td>{index + 1}</td>
              <td>{data.name}</td>
              <td>
                <button
                  onClick={() => this.handleUpdate(data.id, data.name)}

                  data-toggle="modal"
                  data-target="#updateType"
                  class={`btn btn-warning btn-sm `}
                >
                  <i class="fa fa-edit"></i> Sửa
                </button>
                <button
                  onClick={() => this.handleRemove(data.id, data.name)}
                  style={{ marginLeft: "10px" }}
                  data-toggle="modal"
                  data-target="#removeType"
                  class={`btn btn-danger btn-sm`}
                >
                  <i class="fa fa-trash"></i> Xóa
                </button>
                <Link
                  to = {`/product-agency/index/${store_code}/${data.id}?tab-index=0`}
                  style={{ marginLeft: "10px" }}


                  data-toggle="modal"
                  data-target="#updateType"
                  class={`btn btn-success btn-sm `}
                >
                  <i class="fa fa-edit"></i> Cấu hình sản phẩm
                </Link>
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
    var types =
      typeof this.props.types == "undefined"
        ? []
        : this.props.types;

    var { modal, modalUpdate } = this.state
    return (
      <div class="table-responsive">
        <ModalRemove modal={modal} store_code={this.props.store_code} />
        <ModalUpdate modal={modalUpdate} store_code={this.props.store_code} />

        <table class="table table-border">
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên cấp đại lý</th>


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