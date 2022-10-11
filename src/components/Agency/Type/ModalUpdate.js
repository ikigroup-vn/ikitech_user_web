import React, { Component } from "react";
import * as agencyAction from "../../../actions/agency";
import { shallowEqual } from "../../../ultis/shallowEqual";
import { connect } from "react-redux";
import themeData from "../../../ultis/theme_data";

class ModalUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtName: "",
      id: "",
    };
  }

  onChange = (e) => {
    var target = e.target;
    var name = target.name;
    var value = target.value;
    this.setState({ [name]: value });
  };
  componentWillReceiveProps(nextProps) {
    if (!shallowEqual(nextProps.modal, this.props.modal)) {
      var type = nextProps.modal;
      this.setState({
        txtName: type.name,
        id: type.id,
      });
    }
  }

  onSave = (e) => {
    e.preventDefault();
    window.$(".modal").modal("hide");
    var { txtName, id } = this.state;
    this.props.updateAgencyType(this.props.store_code, id, {
      name: txtName,
    });
    this.setState({
      txtName: "",
    });
  };
  render() {
    var { txtName } = this.state;
    return (
      <div
        class="modal fade"
        tabindex="-1"
        role="dialog"
        id="updateType"
        data-keyboard="false"
        data-backdrop="static"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div
              class="modal-header"
              style={{ backgroundColor: themeData().backgroundColor }}
            >
              <h4 style={{ color: "white" }}>Chỉnh sửa cấp</h4>

              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-hidden="true"
              >
                &times;
              </button>
            </div>
            <form onSubmit={this.onSave} role="form" action="#" method="post">
              <div class="modal-body">
                <div class="form-group">
                  <label for="product_name">Tên cấp đại lý</label>
                  <input
                    required
                    type="text"
                    class="form-control"
                    placeholder="Nhập..."
                    autoComplete="off"
                    value={txtName}
                    onChange={this.onChange}
                    name="txtName"
                  />
                </div>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-default"
                  data-dismiss="modal"
                >
                  Đóng
                </button>
                <button type="submit" class="btn btn-warning">
                  Lưu
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    updateAgencyType: (store_code, id, form) => {
      dispatch(agencyAction.updateAgencyType(store_code, id, form));
    },
  };
};
export default connect(null, mapDispatchToProps)(ModalUpdate);
