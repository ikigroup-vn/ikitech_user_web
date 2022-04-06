import React, { Component } from "react";
import { connect } from "react-redux";
import * as shiftAction from "../../../../actions/shift";

class Modal extends Component {
  onSave = (e) => {
    e.preventDefault();

    var { id, store_code, branch_id } = this.props.modal;
    console.log(this.props.limit, this.props);
    var params = `&limit=${this.props.limit}`;
    this.props.destroyShift(store_code, branch_id, id, params);
  };

  render() {
    var { modal } = this.props;
    window.$(".modalEdit").modal("hide");
    return (
      <div
        class="modal fade"
        tabindex="-1"
        role="dialog"
        id="removeModal"
        data-keyboard="false"
        data-backdrop="static"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header" style={{ background: "#47d3b0" }}>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <form
              onSubmit={this.onSave}
              role="form"
              action="#"
              method="post"
              id="removeForm"
            >
              <div class="modal-body">
                <input type="hidden" name="remove_id_store" />
                <div class="alert-remove"></div>
                <h3>Thông báo!</h3>
                Bạn có chắc muốn xóa {modal.table} này không?
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-default"
                  data-dismiss="modal"
                >
                  Đóng
                </button>
                <button type="submit" class="btn btn-info">
                  Xóa
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
    destroyShift: (store_code, branch_id, id, params) => {
      dispatch(shiftAction.destroyShift(store_code, branch_id, id, params));
    },
  };
};
export default connect(null, mapDispatchToProps)(Modal);
