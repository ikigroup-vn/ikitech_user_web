import React, { Component } from "react";
import * as themeAction from "../../../actions/theme";
import * as blogAction from "../../../actions/blog";
import { connect } from "react-redux";
import * as helper from "../../../ultis/helpers";
import { compressed } from "../../../ultis/helpers";
import { isEmpty } from "../../../ultis/helpers";
import * as Types from "../../../constants/ActionType";
import { shallowEqual } from "../../../ultis/shallowEqual";
class ModalCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      link: "",
      fileUpload: null,
      blog: [],
      blogId: "",
    };
  }

  componentWillReceiveProps(nextProps) {
    console.log("heeeeeeeeeeeeeeeee", nextProps.blogs?.data);
    this.setState({ blog: nextProps.blogs?.data });
    // if (!shallowEqual(nextProps._blog, this.props._blog)) {
    //   var { type_action } = this.state;
    //   console.log("heeeeeeeeeeeeeeeee", nextProps.blogs);
    //   this.setState({ blog: nextProps.blogs });
    // }
  }

  componentDidMount() {
    var { store_code } = this.props;
    var _this = this;

    window.$("#file-banner").on("fileloaded", function (event, file) {
      _this.setState({ fileUpload: file });
    });
    window.$("#file-banner").on("fileremoved", function (event, id, index) {
      _this.setState({ fileUpload: null });
    });
    helper.loadFileInput("file-banner");
    this.props.fetchAllBlog(store_code);
  }
  onChange = (e) => {
    var target = e.target;
    var name = target.name;
    var value = target.value;

    this.setState({
      [name]: value,
    });
  };
  onSave = async (e) => {
    e.preventDefault();

    var { title, link, blogId } = this.state;
    console.log("blogId.id====", blogId);
    var { store_code, carousel_app_images, theme } = this.props;
    var file = this.state.fileUpload;

    if (typeof file !== "undefined" && file != "" && file != null) {
      window.$(".modal").modal("hide");

      window.$("#file-banner").fileinput("clear");

      this.props.createBanner(
        store_code,
        {
          title: title,
          link_to: link,
          file: await compressed(file, 0, 0),
          post_id: blogId,
        },
        carousel_app_images,
        theme
      );
      this.setState({ fileUpload: null, title: "" });
    } else {
      this.props.showError({
        type: Types.ALERT_UID_STATUS,
        alert: {
          type: "danger",
          title: "Lỗi",
          disable: "show",
          content: "Vui lòng chọn ảnh banner",
        },
      });

      // this.props.createBanner(store_code, { title: title, file: "" }, carousel_app_images,theme);
    }
  };

  render() {
    var { title, link, blog, blogId } = this.state;
    console.log("blogsssss===", blog);
    return (
      <div
        class="modal fade"
        tabindex="-1"
        role="dialog"
        id="createModal"
        data-keyboard="false"
        data-backdrop="static"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Thêm Banner</h4>

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
              id="removeForm"
            >
              <div class="modal-body">
                <div class="form-group">
                  <label for="product_name">Tên tiêu đề</label>
                  <input
                    type="text"
                    class="form-control"
                    id="title"
                    placeholder="Nhập tiêu đề"
                    autoComplete="off"
                    value={title}
                    onChange={this.onChange}
                    name="title"
                  />
                </div>
                <div class="form-group">
                  <label for="product_name">Hình ảnh</label>
                  <div className="file-loading">
                    <input
                      id="file-banner"
                      type="file"
                      className="file"
                      data-overwrite-initial="false"
                      data-min-file-count="2"
                    />
                  </div>
                </div>

                <div class="form-group">
                  <label for="product_post">Tin tức</label>
                  <select
                    class="form-control"
                    id="blogId"
                    value={blogId}
                    onChange={this.onChange}
                    name="blogId"
                  >
                    <option value="" disabled>
                      Chọn tin tức
                    </option>
                    {blog?.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.title}
                      </option>
                    ))}
                  </select>
                </div>
                <div class="form-group">
                  <label for="product_link">URL trang đích</label>
                  <input
                    id="product_link"
                    type="text"
                    className="form-control"
                    placeholder="VD: https://sy.ikiglobal.com/san-pham/Day-dong-ho-cho-Apple-Watch-Nike+-38-40mm-2220"
                    autoComplete="off"
                    value={link}
                    onChange={this.onChange}
                    name="link"
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
                  Tạo
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
    blogs: state.blogReducers.blog.allBlog,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchAllBlog: (id) => {
      dispatch(blogAction.fetchAllBlog(id));
    },
    showError: (error) => {
      dispatch(error);
    },
    createBanner: (id, form, banners, theme) => {
      dispatch(themeAction.createBanner(id, form, banners, theme));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ModalCreate);
