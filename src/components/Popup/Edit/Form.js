import React, { Component } from "react";
import { connect } from "react-redux";
import * as helper from "../../../ultis/helpers";
import * as productAction from "../../../actions/product";
import ListProduct from "../TableProduct";
import ListCProduct from "../TableC_Product";
import ListCBlog from "../TableC_Blog";
import * as popupAction from "../../../actions/popup";
import ModalUpload from "../ModalUpload";
import ListBlog from "../TableBlog";
import * as blogAction from "../../../actions/blog";
import * as categoryBAction from "../../../actions/category_blog";
import * as CategoryPAction from "../../../actions/category_product";
import * as Env from "../../../ultis/default";
import { format } from "../../../ultis/helpers";
import { shallowEqual } from "../../../ultis/shallowEqual";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type_action: "",
      product: "",
      category: "",
      blog: "",
      categoryBlog: "",
      show_once: false,
      image: null,
      link_url: "",
    };
  }
  componentWillReceiveProps(nextProps) {
    console.log(nextProps.popup, this.props.popup)

    if (!shallowEqual(nextProps.popup, this.props.popup)) {
      var link_url = "";
      nextProps.popup.forEach((item) => {
        console.log(item)
        if (item.id == Number(nextProps.popupId)) {
          if (item.type_action == "LINK") {
            link_url = item.value_action;
          }
          this.setState({
            show_once: item.show_once,
            type_action: item.type_action,
            image: item.link_image,
            link_url: link_url,
          });
        }
      });
    }

    if (
      !shallowEqual(
        nextProps._category_product,
        this.props._category_product
      ) ||
      !shallowEqual(nextProps._category_blog, this.props._category_blog) ||
      !shallowEqual(nextProps._product, this.props._product) ||
      !shallowEqual(nextProps._blog, this.props._blog)
    ) {
      var { type_action } = this.state;
      console.log(type_action , "heeeeeeeeeeeeeeeee")

      if (type_action != "") {
        switch (type_action) {
          case "PRODUCT":
            this.setState({ product: nextProps._product });
            break;
          case "POST":
            this.setState({ blog: nextProps._blog });
            break;
          case "CATEGORY_PRODUCT":
            this.setState({ category: nextProps._category_product });
            break;
          case "CATEGORY_POST":
            this.setState({ categoryBlog: nextProps._category_blog });
            break;
          default:
            break;
        }
      }
    }

    if (this.props.image !== nextProps.image) {
      this.setState({ image: nextProps.image });
    }
  }

  onChangeCheck = (e) => {
    var { checked } = e.target;
    this.setState({ show_once: checked });
  };

  componentDidMount() {
    helper.loadFileInput("file-store");
    this.props.initialUpload();
  }


  onChange = (e) => {
    var target = e.target;
    var name = target.name;
    var value = target.value;

    this.setState({
      [name]: value,
    });
  };

  onSave = (e) => {
    e.preventDefault();
    var { store_code , popupId } = this.props;
    var {
      show_once,
      type_action,
      image,
      link_url,
      product,
      category,
      blog,
      categoryBlog,
    } = this.state;
    var name = helper.randomString(8);
    var value_action = "";
    if (type_action == "LINK") value_action = link_url;
    else if (type_action == "PRODUCT") value_action = product.id;
    else if (type_action == "CATEGORY_PRODUCT") value_action = category.id;
    else if (type_action == "POST") value_action = blog.id;
    else if (type_action == "CATEGORY_POST") value_action = categoryBlog.id;
    else {
    }
    
    this.props.updatePopup(popupId, {
      name: name,
      link_image: image,
      show_once: show_once,
      type_action: type_action,
      value_action: value_action,
    } , store_code);
  };

  fetchAllProduct = () => {
    this.props.fetchAllProduct(this.props.store_code);
  };
  fetchAllBlog = () => {
    this.props.fetchAllBlog(this.props.store_code);
  };
  fetchAllCProduct = () => {
    this.props.fetchAllCategoryP(this.props.store_code);
  };
  fetchAllCBlog = () => {
    this.props.fetchAllCategoryB(this.props.store_code);
  };
  handleAddProduct = (product) => {
    this.setState({
      product,
    });
  };

  handleAddCProduct = (category) => {
    this.setState({
      category,
    });
  };
  handleAddCBlog = (categoryBlog) => {
    this.setState({
      categoryBlog,
    });
  };
  handleAddBlog = (blog) => {
    this.setState({
      blog,
    });
  };
  goBack = () => {
    var { history } = this.props;
    history.goBack();
  };
  render() {
    var { store_code, products, category_product, blogs, category_blog } =
      this.props;
    var {
      type_action,
      product,
      category,
      blog,
      categoryBlog,
      image,
      link_url,
    } = this.state;
    var disable_link = type_action == "LINK" ? "show" : "hide";
    var disable_post = type_action == "POST" ? "show" : "hide";
    var disable_category_post =
      type_action == "CATEGORY_POST" ? "show" : "hide";
    var disable_product = type_action == "PRODUCT" ? "show" : "hide";
    var disable_category_product =
      type_action == "CATEGORY_PRODUCT" ? "show" : "hide";
    var showProduct = product != "" ? "show" : "hide";
    var showCProduct = category != "" ? "show" : "hide";
    var showBlog = blog != "" ? "show" : "hide";
    var showCblog = categoryBlog != "" ? "show" : "hide";
    var image = image || Env.IMG_NOT_FOUND;
    console.log(this.state)
    return (
      <React.Fragment>
        <ListProduct
          handleAddProduct={this.handleAddProduct}
          store_code={store_code}
          products={products}
        />
        <ListCProduct
          handleAddCProduct={this.handleAddCProduct}
          store_code={store_code}
          categories={category_product}
        />
        <ListCBlog
          handleAddCBlog={this.handleAddCBlog}
          store_code={store_code}
          category_blog={category_blog}
        />
        <ListBlog
          handleAddBlog={this.handleAddBlog}
          store_code={store_code}
          blogs={blogs}
        />
        <ModalUpload />
        <form role="form" onSubmit={this.onSave} method="post">
          <div>
            <div class="form-group">
              <label>Ảnh: &nbsp; </label>
              <img src={`${image}`} width="150" height="150" />
            </div>
            <div class="form-group">
              <div class="kv-avatar">
                <div>
                  <button
                    type="button"
                    class="btn btn-primary btn-sm"
                    data-toggle="modal"
                    data-target="#uploadModalPopup"
                  >
                    <i class="fa fa-plus"></i> Upload ảnh
                  </button>
                </div>
              </div>
            </div>

            <div class="form-group">
              <label for="product_name">Chọn loại chuyển hướng</label>

              <select
                name="type_action"
                id="input"
                class="form-control"
                onChange={this.onChange}
                value = {type_action}
              >
                <option value="LINK">Website</option>
                <option value="PRODUCT">Sản phẩm</option>
                <option value="CATEGORY_PRODUCT">Danh mục sản phẩm</option>
                <option value="POST">Bài viết</option>
                <option value="CATEGORY_POST">Danh mục bài viết</option>
              </select>
            </div>
            <div class={`form-group ${disable_link}`}>
              <label htmlFor="name">Chọn Tên Miền</label>

              <input
                value={link_url}
                type="text"
                class="form-control"
                name="link_url"
                onChange={this.onChange}
                placeholder="Nhập đỉa chỉ web ( http:// )"
              />
            </div>

            <div class={`form-group ${disable_product}`}>
              <label>Chọn Sản phẩm</label>
              <div class="input-group">
                <input
                  data-toggle="modal"
                  data-target="#showListProduct"
                  onClick={this.fetchAllProduct}
                  style={{ background: "white" }}
                  type="text"
                  name="product_name"
                  placeholder="Chọn sản phẩm..."
                  class="form-control"
                  value={product.name}
                />
                <span class="input-group-btn">
                  <button
                    onClick={this.fetchAllProduct}
                    data-toggle="modal"
                    data-target="#showListProduct"
                    type="button"
                    class="btn btn-success"
                    id="add_product"
                  >
                    <i class="fa fa-plus"></i> Thêm sản phẩm
                  </button>
                </span>
              </div>
              <br></br>
              <div class={`media ${showProduct}`} id="product_preview">
                <img width="100px" height="120px" src={product.img} alt="" />
                <div class="media-body" style={{ marginLeft: "10px" }}>
                  <h5 style={{ fontSize: "18px" }} class="mt-0 h3">
                    {product.name}{" "}
                  </h5>
                  <p>{format(Number(product.price))}</p>
                </div>
              </div>
            </div>
            <div class={`form-group ${disable_category_product}`}>
              <label>Chọn Danh mục sản phẩm</label>
              <div class="input-group">
                <input
                  onClick={this.fetchAllCProduct}
                  value={category.name}
                  data-toggle="modal"
                  data-target="#showListCProduct"
                  type="text"
                  name="product_name"
                  class="form-control"
                  placeholder="Chọn danh mục..."
                />
                <span class="input-group-btn">
                  <button
                    onClick={this.fetchAllCProduct}
                    data-toggle="modal"
                    data-target="#showListCProduct"
                    type="button"
                    class="btn btn-success"
                    id="add_product"
                  >
                    <i class="fa fa-plus"></i> Thêm danh mục
                  </button>
                </span>
              </div>
              <br></br>
              <div class={`media ${showCProduct}`} id="product_preview">
                <img width="100px" height="120px" src={category.img} alt="" />
                <div class="media-body" style={{ marginLeft: "10px" }}>
                  <h5 style={{ fontSize: "18px" }} class="mt-0 h3">
                    {category.name}{" "}
                  </h5>
                </div>
              </div>
            </div>
            <div class={`form-group ${disable_post}`}>
              <label>Chọn Bài viết</label>
              <div class="input-group">
                <input
                  onClick={this.fetchAllBlog}
                  value={blog.name}
                  data-toggle="modal"
                  data-target="#showListBlog"
                  type="text"
                  name="product_name"
                  class="form-control"
                  placeholder="Chọn bài viết..."
                />
                <span class="input-group-btn">
                  <button
                    onClick={this.fetchAllBlog}
                    data-toggle="modal"
                    data-target="#showListBlog"
                    type="button"
                    class="btn btn-success"
                    id="add_product"
                  >
                    <i class="fa fa-plus"></i> Thêm bài viết
                  </button>
                </span>
              </div>
              <br></br>
              <div class={`media ${showBlog}`} id="product_preview">
                <img width="100px" height="120px" src={blog.img} alt="" />
                <div class="media-body" style={{ marginLeft: "10px" }}>
                  <h5 style={{ fontSize: "18px" }} class="mt-0 h3">
                    {blog.name}{" "}
                  </h5>
                </div>
              </div>
            </div>

            <div class={`form-group ${disable_category_post}`}>
              <label>Chọn Danh mục bài viết</label>
              <div class="input-group">
                <input
                  onClick={this.fetchAllCBlog}
                  value={categoryBlog.name}
                  data-toggle="modal"
                  data-target="#showListCBlog"
                  type="text"
                  name="product_name"
                  class="form-control"
                  placeholder="Chọn danh mục..."
                />
                <span class="input-group-btn">
                  <button
                    onClick={this.fetchAllCBlog}
                    data-toggle="modal"
                    data-target="#showListCBlog"
                    type="button"
                    class="btn btn-success"
                    id="add_product"
                  >
                    <i class="fa fa-plus"></i> Thêm danh mục
                  </button>
                </span>
              </div>
              <br></br>
              <div class={`media ${showCblog}`} id="product_preview">
                <img
                  width="100px"
                  height="120px"
                  src={categoryBlog.img}
                  alt=""
                />
                <div class="media-body" style={{ marginLeft: "10px" }}>
                  <h5 style={{ fontSize: "18px" }} class="mt-0 h3">
                    {categoryBlog.name}{" "}
                  </h5>
                </div>
              </div>
            </div>

            <div class="form-group">
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="gridCheck"
                  onChange={this.onChangeCheck}
                />
                <label class="form-check-label" for="gridCheck">
                  Hiển thị chỉ 1 lần
                </label>
              </div>
            </div>
          </div>
          <div class="box-footer">
            <button type="submit" class="btn btn-info btn-icon-split btn-sm">
              <span class="icon text-white-50">
                <i class="fas fa-save"></i>
              </span>
              <span class="text">Lưu</span>
            </button>
            <a
              style={{ marginLeft: "10px" }}
              onClick={this.goBack}
              class="btn btn-warning btn-icon-split  btn-sm"
            >
              <span class="icon text-white-50">
                <i class="fas fa-arrow-left"></i>
              </span>
              <span class="text"> Trở về</span>
            </a>
          </div>
        </form>
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    category_blog: state.categoryBReducers.categoryBlog.allCategoryB,
    products: state.productReducers.product.allProduct,
    category_product: state.categoryPReducers.category_product.allCategoryP,
    blogs: state.blogReducers.blog.allBlog,
    image: state.UploadReducers.popupImg.popup_img,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    createPopup: (store_code, data) => {
      dispatch(popupAction.createPopup(store_code, data));
    },
    initialUpload: (fd) => {
      dispatch(popupAction.initialUpload(fd));
    },
    updatePopup: (store_code, data , popupId) => {
      dispatch(popupAction.updatePopup(store_code, data, popupId));
    },
    
    fetchAllCategoryB: (id) => {
      dispatch(categoryBAction.fetchAllCategoryB(id));
    },
    fetchAllBlog: (id) => {
      dispatch(blogAction.fetchAllBlog(id));
    },
    fetchAllProduct: (store_code) => {
      dispatch(productAction.fetchAllProduct(store_code));
    },
    fetchAllCategoryP: (store_code) => {
      dispatch(CategoryPAction.fetchAllCategoryP(store_code));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Form);