import React, { Component } from "react";
import * as themeAction from "../../../actions/theme";
import { connect } from "react-redux";
import * as helper from "../../../ultis/helpers";
import { shallowEqual } from "../../../ultis/shallowEqual";
import { compressed } from "../../../ultis/helpers";
import { isEmpty } from "../../../ultis/helpers";
import * as blogAction from "../../../actions/blog";
import * as Types from "../../../constants/ActionType";

class ModalUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      link: "",
      id: "",
      image: "",
      fileUpload: null,
      blog: [],
      blogId: "",
      blogTitle: "",
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ blog: nextProps.blogs?.data });
    if (!shallowEqual(nextProps.modal, this.props.modal)) {
      var banner = nextProps.modal;
      console.log(
        "🚀 ~ file: ModalUpdate.js:25 ~ ModalUpdate ~ componentWillReceiveProps ~ banner",
        banner?.post_id
      );

      this.setState({
        title: banner._title,
        link: banner.link_to,
        id: banner.id,
        image: banner.image_url,
        blogId: banner.post_id,
        blogTitle: banner?.post?.title,
      });
    }
  }
  componentDidMount() {
    var _this = this;
    var { store_code } = this.props;
    window.$("#file-banner-update").on("fileloaded", function (event, file) {
      _this.setState({ fileUpload: file });
    });
    window
      .$("#file-banner-update")
      .on("fileremoved", function (event, id, index) {
        _this.setState({ fileUpload: null });
      });

    helper.loadFileInput("file-banner-update");
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
    var { title, image, id, link, blogId } = this.state;
    console.log("blogIdádfsdsdfsdgfd==", blogId);
    window.$(".modal").modal("hide");
    var { store_code, carousel_app_images, theme } = this.props;
    var file = this.state.fileUpload;
    window.$("#file-banner-update").fileinput("clear");

    if (typeof file !== "undefined" && file != "" && file != null) {
      this.props.updateBanner(
        store_code,
        {
          id: id,
          title: title,
          link_to: link,
          file: await compressed(file, 0, 0),
          image: image,
          post_id: blogId,
        },
        carousel_app_images,
        theme
      );
      this.setState({ fileUpload: null });
    } else {
      this.props.updateBanner(
        store_code,
        {
          id: id,
          title: title,
          link_to: link,
          file: "",
          image: image,
          post_id: blogId,
        },
        carousel_app_images,
        theme
      );
    }
  };
  render() {
    var { title, image, link, blog, blogId, blogTitle } = this.state;
    console.log("blogId=======", blogId);
    return (
      <div
        class="modal fade"
        tabindex="-1"
        role="dialog"
        id="updateModal"
        data-keyboard="false"
        data-backdrop="static"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Cập nhật Banner</h4>

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
                  <label>Ảnh: &nbsp; </label>
                  <img src={`${image}`} width="150" height="150" />
                </div>

                <div class="form-group">
                  <label for="product_name">Hình ảnh</label>
                  <div className="file-loading">
                    <input
                      id="file-banner-update"
                      type="file"
                      className="file"
                      data-overwrite-initial="false"
                    />
                  </div>
                </div>
                <div class="form-group">
                  <label for="product_post">Tin tức</label>
                  <select
                    class="form-control"
                    id="blogId"
                    value={blogId ?? ""}
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
                    placeholder="VD: https://ikiglobal.com/san-pham/Day-dong-ho-cho-Apple-Watch-Nike+-38-40mm-2220"
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
    updateBanner: (id, form, banners, theme) => {
      dispatch(themeAction.updateBanner(id, form, banners, theme));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ModalUpdate);
