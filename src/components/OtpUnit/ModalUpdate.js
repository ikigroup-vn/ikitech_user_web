import React, { Component } from "react";
import * as otpUnitActions from "../../actions/otp_unit";
import { connect } from "react-redux";
import { shallowEqual } from "../../ultis/shallowEqual";
import Upload from "../Upload";
import * as Types from "../../constants/ActionType";

class ModalUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      token: "",
      sender: "",
      content: "",
      image_url: "",
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!shallowEqual(nextProps.modal, this.props.modal)) {
      var otpUnit = nextProps.modal;
      this.setState({
        id: otpUnit.id,
        token: otpUnit.token,
        sender: otpUnit.sender,
        content: otpUnit.content,
        image_url: otpUnit.image_url,
      });
    }
  }

  onChange = (e) => {
    var target = e.target;
    var name = target.name;
    var value = target.value;

    this.setState({
      [name]: value,
    });
  };
  setImage = (image) => {
    this.setState({ image_url: image });
  };

  onSave = (e) => {
    e.preventDefault();

    var otpUnit = this.state;
    if (!otpUnit.content?.includes("{") || !otpUnit.content?.includes("{")) {
      this.props.showError({
        type: Types.ALERT_UID_STATUS,
        alert: {
          type: "danger",
          title: "Lỗi",
          disable: "show",
          content: "{otp} là bắt buộc trong nội dung",
        },
      });
      return;
    }
    this.props.updateOtpUnit(
      this.props.store_code,
      otpUnit.id,
      {
        token: otpUnit.token,
        sender: otpUnit.sender,
        content: otpUnit.content,
        image_url: otpUnit.image_url,
      },
      () => {
        window.$(".modal").modal("hide");
      }
    );
  };
  render() {
    var { token, sender, content, image_url } = this.state;
    return (
      <div
        class="modal fade"
        tabindex="-1"
        role="dialog"
        id="updateOtpUnitModal"
        data-keyboard="false"
        data-backdrop="static"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Chỉnh sửa đơn vị cài đặt</h4>

              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-hidden="true"
              >
                &times;
              </button>
            </div>
            <form
              onSubmit={this.onSave}
              role="form"
              action="#"
              method="post"
              id="updateForm"
            >
              <div class="modal-body">
                {/* <div className="form-group">
                  <label
                    for="txtName"
                    style={{
                      fontWeight: "750",
                    }}
                  >
                    Hình ảnh
                  </label>
                  <div className="gameGuessNumber__imageContent">
                    <Upload
                      setFile={this.setImage}
                      file={image_url}
                      image={image_url}
                    />
                  </div>
                </div> */}
                <div class="form-group">
                  <label for="product_name">Đơn vị gửi </label>
                  <input
                    type="text"
                    class="form-control"
                    id="sender"
                    placeholder="Nhập đơn vị gửi"
                    autoComplete="off"
                    value={sender}
                    onChange={this.onChange}
                    name="sender"
                  />
                </div>
                <div class="form-group">
                  <label for="product_name">Mã token </label>
                  <input
                    type="text"
                    class="form-control"
                    id="token"
                    placeholder="Nhập mã Token nhà vận chuyển"
                    autoComplete="off"
                    value={token}
                    onChange={this.onChange}
                    name="token"
                  />
                </div>
                <div class="form-group">
                  <label for="product_name">
                    Nội dung ( {`{otp}`} là bắt buộc trong nội dung )
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="content"
                    placeholder="VD: Mã xác nhận của bạn là {otp}"
                    autoComplete="off"
                    value={content}
                    onChange={this.onChange}
                    name="content"
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
    updateOtpUnit: (store_code, id, data, onSuccess) => {
      dispatch(otpUnitActions.updateOtpUnit(store_code, id, data, onSuccess));
    },
    showError: (error) => {
      dispatch(error);
    },
  };
};
export default connect(null, mapDispatchToProps)(ModalUpdate);
