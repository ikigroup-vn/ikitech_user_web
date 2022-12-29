import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import InfoProduct from "../../../components/Product/Update/InfoProduct";
import ContentDetail from "../../../components/Product/Update/ContentDetail";
import InfoDiscount from "../../../components/Product/Update/InfoDiscount";
import Video from "../../../components/Product/Update/Video";
import { isEmpty, removeVietnameseTones } from "../../../ultis/helpers";

import * as blogAction from "../../../actions/blog";

import Attribute from "../../../components/Product/Update/Attribute";
import Distribute from "../../../components/Product/Update/Distribute";
import StoreImage from "../../../components/Product/Update/StoreImage";
import * as productAction from "../../../actions/product";
import * as CategoryPAction from "../../../actions/category_product";
import * as Types from "../../../constants/ActionType";
import Alert from "../../../components/Partials/Alert";
import SeoOption from "../../../components/Product/Update/SeoOption";
import getChannel, { IKITECH, IKIPOS } from "../../../ultis/channel";

class ProductEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {},
      total: "",
      disableDistribute: false,
      disableInventory: false,
    };
  }

  checkDistribute = (status, _status) => {
    console.log(status, _status);
    this.setState({ disableDistribute: status, disableInventory: _status });
  };

  componentDidMount() {
    var { store_code, productId } = this.props;
    this.props.fetchProductId(store_code, productId);
    this.props.fetchAllAttributeP(store_code);
    this.props.fetchAllCategoryP(store_code);
    this.props.fetchAllBlog(store_code, 1);
  }

  handleDataFromInfo = (data) => {
    this.setState((prevState, props) => {
      var formdata = { ...prevState.form };
      formdata.name = data.txtName;
      formdata.price = data.txtPrice
        .toString()
        .replace(/,/g, "")
        .replace(/\./g, "");
      formdata.import_price = data.txtImportPrice
        .toString()
        .replace(/,/g, "")
        .replace(/\./g, "");
      formdata.barcode = data.txtBarcode;
      formdata.status = data.txtStatus;
      formdata.quantity_in_stock = data.txtQuantityInStock
        .toString()
        .replace(/,/g, "")
        .replace(/\./g, "");
      formdata.percent_collaborator = data.txtPercentC;
      formdata.sku = data.sku;
      formdata.check_inventory = data.check_inventory;
      formdata.point_for_agency = data.point_for_agency;

      var categories = [];
      var category_children_ids = [];
      if (data.category_parent.length > 0) {
        categories = data.category_parent.map((categoryParent, index) => {
          return categoryParent.id;
        });
      }
      if (data.category_children_ids.length > 0) {
        category_children_ids = data.category_children_ids.map(
          (categoryChild, index) => {
            return categoryChild.id;
          }
        );
      }
      formdata.categories = categories;
      formdata.category_children_ids = category_children_ids;
      return { form: formdata };
    });
  };

  handleDataFromProductImg = (data) => {
    this.setState((prevState, props) => {
      var formdata = { ...prevState.form };
      formdata.images = data.listImgProduct;
      return { form: formdata };
    });
  };

  handleDataFromAvatarImg = (data) => {
    this.setState((prevState, props) => {
      var formdata = { ...prevState.form };
      formdata.index_image_avatar = data.avatar_product;
      return { form: formdata };
    });
  };

  handleDataFromDiscount = (data) => {
    this.setState((prevState, props) => {
      var formdata = { ...prevState.form };
      formdata.list_promotion = data;
      return { form: formdata };
    });
  };

  handleDataFromContent = (data) => {
    this.setState((prevState, props) => {
      var formdata = { ...prevState.form };
      formdata.content_for_collaborator = data.txtContentC;
      formdata.description = data.txtContent;

      return { form: formdata };
    });
  };
  handleDataFromCustomizeSEO = (data) => {
    this.setState((prevState, props) => {
      var formdata = { ...prevState.form };
      formdata.seo_title = data.txtSeoTitle;
      formdata.seo_description = data.txtSeoDescription;

      return { form: formdata };
    });
  };

  handleDataFromAttribute = (data) => {
    this.setState((prevState, props) => {
      var formdata = { ...prevState.form };
      var listAttribute = [];
      var item = {};
      var name = "";
      Object.entries(data).forEach(([key, attribute], index) => {
        Object.entries(attribute).forEach(([_key, attributeItem], _index) => {
          Object.entries(attributeItem).forEach(
            ([__key, _attributeItem], __index) => {
              if (__key === "name") {
                name = _attributeItem;
              } else {
                item = { name, value: _attributeItem };
              }
            }
          );
          listAttribute.push(item);
        });
      });
      formdata.list_attribute = listAttribute;

      return { form: formdata };
    });
  };

  handleDataFromDistribute = (data) => {
    this.setState((prevState, props) => {
      var formdata = { ...prevState.form };
      formdata.list_distribute = data;
      return { form: formdata };
    });
  };

  postProduct = () => {
    var { store_code, productId } = this.props;
    var form = {
      ...this.state.form,
      import_price: Number(this.state.form?.import_price),
      price: Number(this.state.form?.price),
      quantity_in_stock: Number(this.state.form?.quantity_in_stock),
    };
    form.index_image_avatar = 0;
    if (typeof form.list_distribute != "undefined") {
      if (typeof form.list_distribute[0] != "undefined") {
        if (typeof form.list_distribute[0].element_distributes != "undefined") {
          if (form.list_distribute[0].element_distributes.length > 0) {
            form.list_distribute[0].element_distributes.forEach(
              (element, index) => {
                try {
                  const price =
                    element.price != null
                      ? element.price
                          .toString()
                          .replace(/,/g, "")
                          .replace(/\./g, "")
                      : 0;
                  const barcode =
                    element.barcode != null ? element.barcode.toString() : 0;

                  const quantity_in_stock =
                    element.quantity_in_stock != null
                      ? element.quantity_in_stock
                          .toString()
                          .replace(/,/g, "")
                          .replace(/\./g, "")
                      : 0;
                  const import_price =
                    element.import_price != null
                      ? element.import_price
                          .toString()
                          .replace(/,/g, "")
                          .replace(/\./g, "")
                      : 0;
                  form.list_distribute[0].element_distributes[index].price =
                    Number(price);
                  form.list_distribute[0].element_distributes[
                    index
                  ].import_price = Number(import_price);

                  form.list_distribute[0].element_distributes[
                    index
                  ].quantity_in_stock = Number(quantity_in_stock);
                  form.list_distribute[0].element_distributes[index].barcode =
                    barcode;
                  if (typeof element.sub_element_distributes != "undefined") {
                    if (element.sub_element_distributes.length > 0) {
                      element.sub_element_distributes.forEach(
                        (_element, _index) => {
                          try {
                            const price =
                              _element.price != null
                                ? _element.price
                                    .toString()
                                    .replace(/,/g, "")
                                    .replace(/\./g, "")
                                : 0;
                            const barcode =
                              _element.barcode != null
                                ? _element.barcode.toString()
                                : "";
                            const quantity_in_stock =
                              _element.quantity_in_stock != null
                                ? _element.quantity_in_stock
                                    .toString()
                                    .replace(/,/g, "")
                                    .replace(/\./g, "")
                                : 0;
                            const import_price =
                              _element.import_price != null
                                ? _element.import_price
                                    .toString()
                                    .replace(/,/g, "")
                                    .replace(/\./g, "")
                                : 0;
                            form.list_distribute[0].element_distributes[
                              index
                            ].sub_element_distributes[_index].import_price =
                              Number(import_price);
                            form.list_distribute[0].element_distributes[
                              index
                            ].sub_element_distributes[_index].price =
                              Number(price);
                            form.list_distribute[0].element_distributes[
                              index
                            ].sub_element_distributes[
                              _index
                            ].quantity_in_stock = Number(quantity_in_stock);
                            form.list_distribute[0].element_distributes[
                              index
                            ].sub_element_distributes[_index].barcode = barcode;
                          } catch (error) {
                            form.list_distribute[0].element_distributes[
                              index
                            ].sub_element_distributes[_index].price = 0;
                            form.list_distribute[0].element_distributes[
                              index
                            ].sub_element_distributes[
                              _index
                            ].quantity_in_stock = 0;
                            form.list_distribute[0].element_distributes[
                              index
                            ].sub_element_distributes[_index].barcode = "";
                          }
                        }
                      );
                    }
                  }
                } catch (error) {
                  console.log(error);
                  form.list_distribute[0].element_distributes[index].price = 0;
                  form.list_distribute[0].element_distributes[
                    index
                  ].quantity_in_stock = 0;
                  form.list_distribute[0].element_distributes[index].barcode =
                    "";
                }
              }
            );
          }
        }
      }
    }
    var total = this.state.total
      .toString()
      .replace(/,/g, "")
      .replace(/\./g, "");
    if (typeof form.list_distribute != "undefined") {
      form.quantity_in_stock =
        form.list_distribute.length > 0 ? total : form.quantity_in_stock;
    }
    if (form.name == null || !isEmpty(form.name)) {
      this.props.showError({
        type: Types.ALERT_UID_STATUS,
        alert: {
          type: "danger",
          title: "Lỗi",
          disable: "show",
          content: "Vui lòng nhập tên sản phẩm",
        },
      });
      return;
    }

    if (form.barcode === form.sku && isEmpty(form.sku)) {
      this.props.showError({
        type: Types.ALERT_UID_STATUS,
        alert: {
          type: "danger",
          title: "Lỗi",
          disable: "show",
          content: "Barcode không thể trùng với mã SKU",
        },
      });
      return;
    }
    if (this.state.checkDistribute == false) {
      if (form.price == null || !isEmpty(form.price)) {
        this.props.showError({
          type: Types.ALERT_UID_STATUS,
          alert: {
            type: "danger",
            title: "Lỗi",
            disable: "show",
            content: "Vui lòng nhập giá bán lẻ",
          },
        });
        return;
      }
      if (form.import_price == null || !isEmpty(form.import_price)) {
        this.props.showError({
          type: Types.ALERT_UID_STATUS,
          alert: {
            type: "danger",
            title: "Lỗi",
            disable: "show",
            content: "Vui lòng nhập giá nhập",
          },
        });
        return;
      }
    }
    var { page, currentBranch } = this.props;
    var list_distribute = form.list_distribute ?? [];

    //Chuẩn hóa distribute

    // list_distribute[0].element_distributes = list_distribute[0].element_distributes.filter((ele) =>
    //   ele.name != null && ele.name != ""
    // )
    // list_distribute[0].element_distributes = list_distribute[0].element_distributes.map((ele) => {

    //   if (ele.sub_element_distributes != null && ele.sub_element_distributes.length > 0) {
    //     ele.sub_element_distributes = ele.sub_element_distributes.
    //       filter((sub) =>
    //         sub.name != null && sub.name != "")
    //   }
    //   return ele
    // })

    if (list_distribute.length > 0) {
      list_distribute[0].element_distributes =
        list_distribute[0].element_distributes.map((ele) => {
          if (ele.id != null) {
            ele.is_edit = true;
          } else {
            ele.is_edit = false;
          }

          if (ele.id != null && ele.before_name == null) {
            ele.before_name = ele.name;
            ele.is_edit = true;
          }

          return ele;
        });
      list_distribute[0].element_distributes =
        list_distribute[0].element_distributes.map((ele) => {
          if (
            ele != null &&
            ele.sub_element_distributes != null &&
            ele.sub_element_distributes.length > 0
          ) {
            ele.sub_element_distributes = ele.sub_element_distributes.map(
              (sub) => {
                if (sub.id != null) {
                  sub.is_edit = true;
                } else {
                  sub.is_edit = false;
                }

                if (sub.id != null && sub.before_name == null) {
                  sub.before_name = sub.name;
                  sub.is_edit = true;
                }

                return sub;
              }
            );
          }
          return ele;
        });
    }

    /////

    var distributeData = {};
    form.list_distribute = null;
    // this.props.updateProduct(store_code, form, productId, page);

    distributeData = {
      has_distribute: false,
      has_sub: false,
    };

    if (
      list_distribute != null &&
      list_distribute.length > 0 &&
      list_distribute[0].element_distributes != null &&
      list_distribute[0].element_distributes.length > 0 &&
      this.state.disableDistribute == true
    ) {
      distributeData.has_distribute = true;
      distributeData.distribute_name = list_distribute[0].name;
      if (
        list_distribute[0].element_distributes[0] &&
        list_distribute[0].element_distributes[0].sub_element_distributes !=
          null &&
        list_distribute[0].element_distributes[0] &&
        list_distribute[0].element_distributes[0].sub_element_distributes
          .length > 0
      ) {
        distributeData.has_sub = true;
        distributeData.sub_element_distribute_name =
          list_distribute[0].sub_element_distribute_name;
      }
    }

    distributeData.element_distributes =
      list_distribute.length > 0
        ? list_distribute[0].element_distributes
        : distributeData.element_distributes;

    this.props.updateDistribute(
      store_code,
      distributeData,
      productId,
      currentBranch?.id,
      form,
      page
    );
  };
  goBack = (e) => {
    e.preventDefault();
    var { history } = this.props;
    history.goBack();
  };
  onChangeQuantityStock = (total) => {
    this.setState({ total: total });
  };

  checkHasAttribute = (element, arr) => {
    var check = false;
    for (const item of arr) {
      if (item == element) {
        check = true;
      }
    }
    return check;
  };

  afterAttribute = () => {
    var { attributeP, product } = this.props;
    if (product?.attributes?.length > 0) {
      var ListDistributeWithName = product?.attributes.map((data) => {
        return data.name;
      });
      console.log(ListDistributeWithName);
      var newListDistributeWithName = [...ListDistributeWithName];
      for (const item1 of attributeP) {
        if (this.checkHasAttribute(item1, ListDistributeWithName) == false) {
          newListDistributeWithName.push(item1);
        }
      }
      return newListDistributeWithName;
    } else {
      return attributeP;
    }
  };
  handleDataFromProductVideo = (video) => {
    console.log(video);
    this.setState((prevState, props) => {
      var formdata = { ...prevState.form };
      formdata.video_url = video;
      return { form: formdata };
    });
  };

  render() {
    var { store_code } = this.props;
    var {
      category_product,
      attributeP,
      auth,
      product,
      isShowAttr,
      isCreate,
      isRemove,
    } = this.props;
    var { total, disableInventory, disableDistribute } = this.state;
    var afterAttribute = this.afterAttribute();
    console.log(afterAttribute);
    return (
      <div class="container-fluid">
        <Alert type={Types.ALERT_UID_STATUS} alert={this.props.alert} />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h4 className="h4 title_content mb-0 text-gray-800">
            Chỉnh sửa sản phẩm:&nbsp;{product.name}
          </h4>
        </div>
        <br></br>
        <div class="card mb-4">
          <div class="card-header title_content">Nhập thông tin sản phẩm</div>
          <div class="card-body" style={{ padding: "0.8rem" }}>
            <div class="row">
              <div class="col-lg-6">
                <div>
                  <InfoProduct
                    store_code={store_code}
                    checkDistribute={this.checkDistribute}
                    total={total}
                    product={product}
                    handleDataFromInfo={this.handleDataFromInfo}
                    category_product={category_product}
                  />
                </div>
              </div>

              <div
                class="col-lg-6"
                style={{ borderLeft: "0.5px solid #e6dfdf" }}
              >
                <div>
                  <Video
                    store_code={store_code}
                    product={product}
                    handleDataFromProductVideo={this.handleDataFromProductVideo}
                  />
                </div>
                <div>
                  <StoreImage
                    handleDataFromAvatarImg={this.handleDataFromAvatarImg}
                    product={product}
                    handleDataFromProductImg={this.handleDataFromProductImg}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {getChannel() == IKITECH && (
          <div class="card mb-4">
            <div class="card-body" style={{ padding: "0.8rem" }}>
              <div class="row">
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                  <button
                    class="btn btn-primary btn-sm"
                    onClick={this.postProduct}
                  >
                    <i class="fa fa-plus"></i> Lưu thay đổi
                  </button>
                  <a
                    style={{ marginLeft: "10px" }}
                    onClick={this.goBack}
                    class={`btn btn-warning btn-sm color-white `}
                  >
                    <i class="fa fa-arrow-left"></i> Trở về
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
        <div
          class={`card mb-4 ${
            typeof isShowAttr == "undefined" ||
            isShowAttr == false ||
            getChannel() == IKIPOS
              ? "hide"
              : ""
          }`}
        >
          <div class="card-header title_content">Thuộc tính sản phẩm</div>
          <div class="card-body" style={{ padding: "0.8rem" }}>
            <div class="row">
              <div class="col-lg-12">
                <div>
                  <div class="card-body" style={{ padding: "0.8rem" }}>
                    <Attribute
                      isCreate={isCreate}
                      isRemove={isRemove}
                      product={product}
                      handleDataFromAttribute={this.handleDataFromAttribute}
                      store_code={store_code}
                      attributeP={afterAttribute}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          class={`card mb-4 ${
            this.state.disableDistribute == true ? "" : "hide"
          }`}
        >
          <div class="card-header title_content">Phân loại sản phẩm</div>
          <div class="card-body" style={{ padding: "0.8rem" }}>
            <div class="row">
              <div class="col-lg-12">
                <div>
                  <div class="card-body" style={{ padding: "0.8rem" }}>
                    <Distribute
                      disableDistribute={disableDistribute}
                      disableInventory={disableInventory}
                      onChangeQuantityStock={this.onChangeQuantityStock}
                      product={product}
                      handleDataFromDistribute={this.handleDataFromDistribute}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {getChannel() == IKITECH && (
          <div class="card mb-4">
            <div class="card-header title_content">Nội dung chi tiết</div>
            <div class="card-body" style={{ padding: "0.8rem" }}>
              <div class="row">
                <ContentDetail
                  store_code={store_code}
                  product={product}
                  handleDataFromContent={this.handleDataFromContent}
                />
              </div>
            </div>
          </div>
        )}

        {getChannel() == IKITECH && (
          <div class="card mb-4">
            <div class="card-header title_content">Tối ưu SEO</div>
            <div class="card-body" style={{ padding: "0.8rem" }}>
              <div class="row">
                <SeoOption
                  product={product}
                  handleDataFromContent={this.handleDataFromCustomizeSEO}
                />
              </div>
            </div>
          </div>
        )}
        {/* <div class="card mb-4">
          <div class="card-header title_content">Thông tin khuyến mại</div>
          <div class="card-body" style={{ padding: "0.8rem" }}>
            <div class="row">
              <InfoDiscount
                product={product}
                blogs = {this.props.blogs.data || []}
                handleDataFromDiscount={this.handleDataFromDiscount}
              />
            </div>
          </div>
        </div> */}
        <div class="card mb-4">
          <div class="card-body" style={{ padding: "0.8rem" }}>
            <div class="row">
              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <button
                  class="btn btn-primary btn-sm"
                  onClick={this.postProduct}
                >
                  <i class="fa fa-plus"></i> Lưu thay đổi
                </button>
                <a
                  className="color-white"
                  style={{ marginLeft: "10px" }}
                  onClick={this.goBack}
                  class={`btn btn-warning btn-sm color-white `}
                >
                  <i class="fa fa-arrow-left"></i> Trở về
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    attributeP: state.attributePReducers.attribute_product.allAttrbute,
    category_product: state.categoryPReducers.category_product.allCategoryP,
    product: state.productReducers.product.productId,
    alert: state.productReducers.alert.alert_uid,
    blogs: state.blogReducers.blog.allBlog,
    currentBranch: state.branchReducers.branch.currentBranch,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchAllAttributeP: (store_code) => {
      dispatch(productAction.fetchAllAttributeP(store_code));
    },
    fetchAllCategoryP: (store_code) => {
      dispatch(CategoryPAction.fetchAllCategoryP(store_code));
    },
    postProduct: (store_code, product) => {
      dispatch(productAction.postProduct(store_code, product));
    },
    fetchProductId: (store_code, productId) => {
      dispatch(productAction.fetchProductId(store_code, productId));
    },
    updateProduct: (store_code, product, productId, page) => {
      dispatch(
        productAction.updateProduct(store_code, product, productId, page)
      );
    },
    updateDistribute: (
      store_code,
      product,
      productId,
      branchId,
      data,
      page
    ) => {
      dispatch(
        productAction.updateDistribute(
          store_code,
          product,
          productId,
          branchId,
          data,
          page
        )
      );
    },
    fetchAllBlog: (id, page) => {
      dispatch(blogAction.fetchAllBlog(id, page));
    },
    showError: (error) => {
      dispatch(error);
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ProductEdit);
