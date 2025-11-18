import React, { Component } from "react";
import { connect } from "react-redux";
import * as dashboardAction from "../../actions/dashboard";
import * as placeAction from "../../actions/place";
import { shallowEqual } from "../../ultis/shallowEqual";
import themeData from "../../ultis/theme_data";

class ModalViewCustomer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtNote: "",
      txtUserName: "",
      txtPhone: "",
    };
  }

  componentWillReceiveProps(nextProps, nextState) {
    if (!shallowEqual(nextProps.modal, this.props.modal)) {
      this.setState({
        id: nextProps.modal.id,
        txtUserName: nextProps.modal.username,
        txtPhone: nextProps.modal.phone,
        txtNote: nextProps.modal.note,
      });
    }
  }

  render() {
    var { txtUserName, txtPhone, txtNote } = this.state;
    return (
      <>
        <style>
          {`
            .customer-name-hover:hover {
              text-decoration: underline;
            }
          `}
        </style>

        <div class="modal" id="modalViewCustomer">
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div
                className="model-header-modal"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  backgroundColor: themeData().backgroundColor,
                }}
              >
                <h4 style={{ color: "white", margin: "10px" }}>
                  Xem thông tin khách hàng
                </h4>
                <button type="button" class="close" data-dismiss="modal">
                  &times;
                </button>
              </div>
              <div class="modal-body">
                <React.Fragment>
                  <form role="form">
                    <div className="row">
                      <div className="col-6 box-body-left">
                        <div class="form-group">
                          <label for="product_name">Họ và tên</label>
                          <input
                            type="text"
                            class="form-control"
                            id="txtUserName"
                            placeholder="Nhập họ tên khách hàng"
                            autoComplete="off"
                            value={txtUserName || ""}
                            name="txtUserName"
                            disabled
                          />
                        </div>
                        <div class="form-group">
                          <label for="product_name">Số điện thoại</label>
                          <input
                            type="text"
                            class="form-control"
                            id="txtPhone"
                            placeholder="Nhập số điện thoại"
                            autoComplete="off"
                            value={txtPhone || ""}
                            name="txtPhone"
                            disabled
                          />
                        </div>
                        <div class="form-group">
                          <label for="product_name">Ghi chú</label>
                          <textarea
                            class="form-control"
                            id="txtNote"
                            placeholder="Nhập ghi chú"
                            autoComplete="off"
                            value={txtNote || ""}
                            name="txtNote"
                            rows="3"
                            disabled
                          />
                        </div>
                      </div>
                    </div>
                  </form>
                </React.Fragment>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-default"
                  data-dismiss="modal"
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default connect(null, null)(ModalViewCustomer);
