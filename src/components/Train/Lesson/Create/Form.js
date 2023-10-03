import React, { Component } from "react";
import * as Types from "../../../../constants/ActionType";
import { connect } from "react-redux";
import * as trainAction from "../../../../actions/train";
import { shallowEqual } from "../../../../ultis/shallowEqual";
import ModalUpload from "../ModalUpload";
import Select from "react-select";
import * as Env from "../../../../ultis/default";
import { isEmpty } from "../../../../ultis/helpers";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import { handleImageUploadBefore } from "../../../../ultis/sun_editor";
import getChannel, { IKITECH } from "../../../../ultis/channel";
import SeoOption from "./SeoOption";
import history from "../../../../history";
import * as userLocalApi from "../../../../data/local/user";
import themeData from "../../../../ultis/theme_data";

import {
  image as imagePlugin,
  font,
  fontSize,
  formatBlock,
  paragraphStyle,
  blockquote,
  fontColor,
  textStyle,
  list,
  lineHeight,
  table as tablePlugin,
  link as linkPlugin,
  video,
  audio,
} from "suneditor/src/plugins";
import imageGallery from "../../../imageGallery";
import { getApiImageStore } from "../../../../constants/Config";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtTitle: "",
      txtSumary: "",
      txtContent: "",
      link_video_youtube: "",
    };
  }

  onChange = (e) => {
    var target = e.target;
    var name = target.name;
    var value = target.value;

    this.setState({
      [name]: value,
    });
  };

  handleEditorChange = (editorState) => {
    this.setState({
      txtContent: editorState,
    });
  };

  onSave = (e) => {
    var { store_code, chapterId, courseId } = this.props;
    e.preventDefault();
    var { txtContent, txtTitle, txtSumary, link_video_youtube } = this.state;

    if (txtTitle == null || !isEmpty(txtTitle)) {
      this.props.showError({
        type: Types.ALERT_UID_STATUS,
        alert: {
          type: "danger",
          title: "Lỗi",
          disable: "show",
          content: "Tiêu đề không được để trống",
        },
      });
      return;
    }

    this.props.createLesson(
      store_code,
      courseId,
      {
        description: txtContent,
        link_video_youtube: link_video_youtube,
        title: txtTitle,
        short_description: txtSumary,
        train_chapter_id: chapterId,
      },
      this,
      function () {
        window.$(".modal").modal("hide");
      }
    );
  };

  goBack = () => {
    history.goBack();
  };

  render() {
    var { txtTitle, txtSumary, link_video_youtube, txtContent } = this.state;

    var { store_code } = this.props;

    return (
      <React.Fragment>
        <div
          class="modal fade"
          tabindex="-1"
          role="dialog"
          id="createLessonModal"
          data-keyboard="false"
          data-backdrop="static"
        >
          <div class="modal-dialog modal-xl" role="document">
            <div class="modal-content">
              <div
                class="modal-header"
                style={{ backgroundColor: themeData().backgroundColor }}
              >
                <h4 class="modal-title">Thêm bài học</h4>

                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-hidden="true"
                  onClick={this.handleClear}
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
                <div class="modal-body" style={{ padding: " 0 10px" }}>
                  <div class="form-group">
                    <label for="product_name">Tên bài học</label>
                    <input
                      type="text"
                      class="form-control"
                      id="txtTitle"
                      value={txtTitle}
                      placeholder="Nhập tên bài học"
                      autoComplete="off"
                      onChange={this.onChange}
                      name="txtTitle"
                    />
                  </div>

                  <div class="form-group">
                    <label for="product_name">Link video bài học</label>
                    <input
                      type="text"
                      class="form-control"
                      id="txtTitle"
                      value={link_video_youtube}
                      placeholder="Nhập link..."
                      autoComplete="off"
                      onChange={this.onChange}
                      name="link_video_youtube"
                    />
                  </div>

                  <div class="form-group">
                    <label for="product_name">Mô tả ngắn</label>

                    <textarea
                      name="txtSumary"
                      onChange={this.onChange}
                      value={txtSumary}
                      id="input"
                      class="form-control"
                      rows="3"
                    ></textarea>
                  </div>

                  <div class="form-group">
                    <label for="product_name">Nội dung</label>
                    <div className="editor">
                      <SunEditor
                        onImageUploadBefore={handleImageUploadBefore}
                        showToolbar={true}
                        onChange={this.handleEditorChange}
                        setDefaultStyle="height: auto"
                        setContents={txtContent}
                        setOptions={{
                          requestHeaders: {
                            "X-Sample": "sample",
                            token: userLocalApi.getToken(),
                          },
                          imageGalleryLoadURL: getApiImageStore(store_code),

                          plugins: [
                            imagePlugin,
                            imageGallery,
                            font,
                            fontSize,
                            formatBlock,
                            paragraphStyle,
                            blockquote,
                            fontColor,
                            textStyle,
                            list,
                            lineHeight,
                            tablePlugin,
                            linkPlugin,
                            video,
                            audio,
                          ],

                          buttonList: [
                            [
                              "undo",
                              "redo",
                              "font",
                              "fontSize",
                              "formatBlock",
                              "paragraphStyle",
                              "blockquote",
                              "bold",
                              "underline",
                              "italic",
                              "fontColor",
                              "textStyle",
                              // "outdent",
                              "align",
                              "horizontalRule",
                              "list",
                              "lineHeight",
                              "table",
                              "link",
                              "image",
                              "video",
                              "audio",
                              "imageGallery",
                              "fullScreen",
                              "preview",
                            ],
                          ],
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-default"
                    data-dismiss="modal"
                    onClick={this.handleClear}
                  >
                    Đóng
                  </button>
                  <button type="submit" class="btn btn-warning">
                    Tạo
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    showError: (error) => {
      dispatch(error);
    },

    createLesson: (store_code, courseId, data, _this, resetModal) => {
      dispatch(
        trainAction.createLesson(store_code, courseId, data, _this, resetModal)
      );
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Form);
