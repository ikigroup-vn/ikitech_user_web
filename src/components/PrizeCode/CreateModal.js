import React, { Component } from "react";
import { connect } from "react-redux";
import themeData from "../../ultis/theme_data";
import Upload from "../Upload";

class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { storeCode } = this.props;
  }

  componentDidUpdate(prevProps, prevState) {}

  onChange = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;

    this.setState({
      [name]: value,
    });
  };

  onSave = () => {};

  render() {
    return (
      <div
        class="modal fade"
        tabindex="-1"
        role="dialog"
        id="createModal"
        data-keyboard="true"
        data-backdrop="static"
      >
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
            <div
              class="modal-header"
              style={{ backgroundColor: themeData().backgroundColor }}
            >
              <h4 class="modal-title">Thêm mã dự thưởng</h4>

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
              id="createForm"
            >
              <div class="modal-body" style={{ maxHeight: "100%" }}>
                <div class="form-group">
                  <label for="content">Nội dung</label>
                  <input
                    type="text"
                    class="form-control"
                    id="content"
                    placeholder="Nhập nội dung"
                    autoComplete="off"
                    value=""
                    onChange={(e) => {
                      this.setState((prevState) => {
                        return {};
                      });
                    }}
                    name="content"
                  />
                </div>
                <div className="" style={{ display: "flex" }}>
                  <div class="form-group">
                    <label for="images">Hình ảnh</label>
                    <div style={{ width: "100%" }}></div>
                  </div>
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

const mapStateToProps = (state) => {
  return {
    auth: state.authReducers.login.authentication,
    alert: state.categoryBReducers.alert.alert_uid,
    permission: state.authReducers.permission.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    showError: (error) => {
      dispatch(error);
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
