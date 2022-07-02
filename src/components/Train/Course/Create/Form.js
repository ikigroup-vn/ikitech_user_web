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
  audio
} from "suneditor/src/plugins";
import imageGallery from "./../../../imageGallery";
import { getApiImageStore } from "../../../../constants/Config"


class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtTitle: "",
      txtSumary: "",
      txtContent: "",
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
    var { store_code } = this.props;
    e.preventDefault();
    var {
      txtContent,
      txtTitle,
      txtSumary,
    } = this.state;

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


    this.props.createCourse(store_code, {
      description: txtContent,
      title: txtTitle,
      short_description: txtSumary,
    });
  };

  goBack = () => {
    history.goBack();
  };

  render() {
    var {
      txtTitle,
      txtSumary,

    } = this.state;

    var { store_code } = this.props;

    return (
      <React.Fragment>
        <form role="form" onSubmit={this.onSave} method="post">
          <div class="box-body">
            <div class="row">
              <div
                class="col-12"
                style={{ borderRight: "0.5px solid #cac9c9" }}
              >
                <div class="form-group">
                  <label for="product_name">Tên khóa học</label>
                  <input
                    type="text"
                    class="form-control"
                    id="txtTitle"
                    value={txtTitle}
                    placeholder="Nhập tên khóa học"
                    autocomplete="off"
                    onChange={this.onChange}
                    name="txtTitle"
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

                      setOptions={{
                        requestHeaders: {
                          "X-Sample": "sample",
                          "token": userLocalApi.getToken()

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
                          audio],

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
                            "outdent",
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


            </div>



          </div>
          <div class="box-footer">
            <button type="submit" class="btn btn-info   btn-sm">
              <i class="fas fa-save"></i>  Tạo

            </button>
            <button
              type="button"

              style={{ marginLeft: "10px" }}
              onClick={this.goBack}
              class="btn btn-warning   btn-sm"
            >
              <i class="fas fa-arrow-left"></i> Trở về

            </button>
          </div>
        </form>

        <ModalUpload store_code={store_code} />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return { 
    showError: (error) => {
      dispatch(error);
    },

    createCourse: (store_code, data) => {
      dispatch(trainAction.createCourse(store_code, data));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Form);
