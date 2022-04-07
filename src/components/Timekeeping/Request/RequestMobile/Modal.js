import React, { Component } from "react";
import { connect } from "react-redux";
import * as requestMobileAction from "../../../../actions/request_mobile";
class Modal extends Component {
  onSave = (e) => {
    e.preventDefault();
    window.$(".modal").modal("hide");

    var { id } = this.props.modal;
    var { store_code, branch_id } = this.props;
    // this.props.updateVoucherIsEnd(store_code, {is_end : true}, id)
    this.props.updateStatus(store_code, branch_id, id, {
      status: 1,
    });
  };

  render() {
    var { modal } = this.props;
    window.$(".modalDetail").modal("hide");
    window.$("#modalDetail").removeClass("in");
    window.$(".modal-backdrop").remove();
    window.$("#modalDetail").hide();

    window.$("body").removeClass("modal-open");

    window.$("#modalDetail").hide();
    return (
      <div
        class="modal fade"
        tabindex="-1"
        role="dialog"
        id="isEndModal"
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
                Bạn có muốn phê duyệt yêu cầu của thiết bị: {
                  modal.name
                } (id {modal.id}) ?
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
                  Phê duyệt
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
    updateStatus: (store_code, voucher, id, data) => {
      dispatch(requestMobileAction.updateStatus(store_code, voucher, id, data));
    },
  };
};
export default connect(null, mapDispatchToProps)(Modal);
