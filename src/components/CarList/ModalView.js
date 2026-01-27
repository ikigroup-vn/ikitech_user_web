import React, { Component } from "react";
import { connect } from "react-redux";
import * as dashboardAction from "../../actions/dashboard";
import * as placeAction from "../../actions/place";
import { shallowEqual } from "../../ultis/shallowEqual";
import themeData from "../../ultis/theme_data";

class ModalViewCar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtStatus: "",
      txtNumber: "",
      txtType: "",
      txtSeat_count: "",
    };
  }

  componentWillReceiveProps(nextProps, nextState) {
    if (!shallowEqual(nextProps.modal, this.props.modal)) {
      this.setState({
        id: nextProps.modal.id,
        txtNumber: nextProps.modal.number,
        txtType: nextProps.modal.type,
        txtSeat_count: nextProps.modal.seat_count,
        txtStatus: nextProps.modal.status,
      });
    }
  }

  render() {
    var { txtNumber, txtType, txtSeat_count, txtStatus } = this.state;
    return (
      <>
        <style>
          {`
            .car-number-hover:hover {
              text-decoration: underline;
            }
          `}
        </style>

        <div class="modal" id="modalViewCar">
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
                  Xem thông tin xe
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
                          <label for="product_name">Biển số</label>
                          <input
                            type="text"
                            class="form-control"
                            id="txtNumber"
                            placeholder="Nhập tên xe"
                            autoComplete="off"
                            value={txtNumber || ""}
                            name="txtNumber"
                            disabled
                          />
                        </div>
                        <div class="form-group">
                          <label for="product_name">Loại xe</label>
                          <input
                            type="text"
                            class="form-control"
                            id="txtType"
                            placeholder="Nhập loại xe"
                            autoComplete="off"
                            value={txtType || ""}
                            name="txtType"
                            disabled
                          />
                        </div>

                        <div class="form-group">
                          <label for="product_name">Số ghế</label>
                          <input
                            type="number"
                            class="form-control"
                            id="txtSeat_count"
                            placeholder="Nhập số ghế"
                            autoComplete="off"
                            value={txtSeat_count || ""}
                            name="txtSeat_count"
                            disabled
                          />
                        </div>

                        <div class="form-group">
                          <label>Trạng thái hoạt động</label>
                          <select
                            class="form-control"
                            id="txtStatus"
                            name="txtStatus"
                            value={txtStatus || ""}
                            disabled
                          >
                            <option value="">-- Chọn trạng thái --</option>
                            <option value="1">Đang hoạt động</option>
                            <option value="2">Ngừng hoạt động</option>
                          </select>
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

export default connect(null, null)(ModalViewCar);
