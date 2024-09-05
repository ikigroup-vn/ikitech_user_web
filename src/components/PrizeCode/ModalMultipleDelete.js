import React, { Component } from "react";
import { connect } from "react-redux";
import themeData from "../../ultis/theme_data";
import * as prizeCodeApi from "../../data/remote/prize_code";

class Modal extends Component {
  onSave = (e) => {
    e.preventDefault();
    window.$(".modal").modal("hide");
    var { data, store_code } = this.props.multi;
    const {
      page,
      limit,
      searchValue,
      onSetPrizeCode,
      onSetLinks,
      onSetCurrentPage,
    } = this.props;
    var params = `?search=${searchValue}&limit=${limit}&page=${page}`;
    const prizeCodeIds = this.props.selected;
    this.props.showLoading();
    prizeCodeApi
      .deleteMultiProductPrizeCode(store_code, {
        prize_code_ids: prizeCodeIds,
      })
      .then((response) => {
        // const updatedPrizeCodes = this.props.prizeCodes.filter((prizeCode) => {
        //   return !prizeCodeIds.includes(prizeCode.id);
        // });
        // onSetPrizeCode(updatedPrizeCodes);
        prizeCodeApi.fetchAllPrizeCode(store_code, params).then((results) => {
          const data = results.data.data.data;
          const links = results.data.data.links;
          const currentPage = results.data.data.current_page;
          onSetCurrentPage(currentPage);
          onSetPrizeCode(data);
          onSetLinks(links);
          this.props.handleSetSelected([]);
          this.props.hideLoading();
        });
        this.props.showMsg();
        window.$(".modal").modal("hide");
      })
      .catch(() => {
        this.props.showMsg("Cập nhật thất bại");
      })
      .finally(() => {});
  };

  render() {
    var { multi } = this.props;
    return (
      <div
        class="modal fade"
        tabindex="-1"
        role="dialog"
        id="removeMultiModal"
        data-keyboard="false"
        data-backdrop="static"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div
              class="modal-header"
              style={{ backgroundColor: themeData().backgroundColor }}
            >
              <h4 style={{ color: "white" }}>Thông báo</h4>{" "}
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
                Bạn có muốn xóa{" "}
                {multi.data.length === 1
                  ? multi.table
                  : `${multi.data.length} ${multi.table}`}{" "}
                này không?
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
  return {};
};
export default connect(null, mapDispatchToProps)(Modal);
