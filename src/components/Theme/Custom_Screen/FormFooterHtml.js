import React, { Component } from "react";

import * as themeAction from "../../../actions/theme";
import { connect } from "react-redux";

import { shallowEqual } from "../../../ultis/shallowEqual";

import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import { handleImageUploadBefore } from "../../../ultis/sun_editor";
class FormFooterHtml extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtContent: sessionStorage.getItem("editor")
        ? sessionStorage.getItem("editor")
        : "",
    };
  }

  //   componentWillReceiveProps(nextProps) {
  //     if (
  //       !shallowEqual(nextProps.theme, this.props.theme) ||
  //       nextProps.tabId != this.props.tabId
  //     ) {
  //       var theme = nextProps.theme;

  //       this.setState({
  //         txtContent: theme.html_footer,
  //       });
  //     }
  //   }
  handleEditorChange = (editorState) => {
    this.setState(
      {
        txtContent: editorState,
      },
      () => {
        sessionStorage.setItem("editor", editorState);
      }
    );
  };

  onSave = (e) => {
    e.preventDefault();
    var { txtContent } = this.state;
    var { store_code } = this.props;
    var form = { ...this.props.theme };

    form.footer_type = null;
    form.is_use_footer_html = true;
    form.html_footer = txtContent;
    this.props.updateTheme(store_code, form);
  };

  render() {
    var { txtContent } = this.state;

    return (
      <React.Fragment>
        <form role="form" method="post">
          <div class="box-body">
            <div class="form-group">
              <SunEditor
                onImageUploadBefore={handleImageUploadBefore}
                setContents={txtContent}
                showToolbar={true}
                onChange={this.handleEditorChange}
                setDefaultStyle="height: 235px"
                setOptions={{
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
                      "strike",
                      "subscript",
                      "superscript",
                      "fontColor",
                      "hiliteColor",
                      "textStyle",
                      "removeFormat",
                      "outdent",
                      "indent",
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
                      "showBlocks",
                      "codeView",
                      "preview",
                      "print",
                      "save",
                      "template",
                    ],
                  ],
                }}
              />
            </div>
          </div>
          <div class="box-footer">
          <button
                        type="button"

                  class="btn btn-primary btn-sm"
                  onClick={this.onSave}
                  >
                  <i class="fa fa-save"></i> Lưu
                </button>
            {/* <button
              type="submit"
              class="btn btn-info btn-icon-split btn-sm"
              onClick={this.onSave}
            >
              <span class="icon text-white-50">
                <i class="fas fa-save"></i>
              </span>
              <span class="text">Lưu</span>
            </button> */}
          </div>
        </form>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    updateTheme: (store_code, theme) => {
      dispatch(themeAction.updateTheme(store_code, theme));
    },
  };
};
export default connect(null, mapDispatchToProps)(FormFooterHtml);
