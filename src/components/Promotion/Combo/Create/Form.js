import React, { Component } from "react";
import * as Types from "../../../../constants/ActionType";
import { connect } from "react-redux";
import * as comboAction from "../../../../actions/combo";
import Table from "./Table";
import { shallowEqual } from "../../../../ultis/shallowEqual";
import moment from "moment";
import Datetime from "react-datetime";
import ModalListProduct from "./ListProduct";
import CKEditor from "ckeditor4-react";
import ModalUpload from "../ModalUpload";
import * as Env from "../../../../ultis/default";
import MomentInput from "react-moment-input";
import { formatNumber } from "../../../../ultis/helpers";
import { isEmpty } from "../../../../ultis/helpers";
import getChannel, { IKIPOS, IKITECH } from "../../../../ultis/channel";
class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtName: "",
      txtStart: "",
      txtEnd: "",
      txtAmount: "",
      txtContent: "",
      txtDiscoutType: "",
      txtValueDiscount: "",
      listProducts: [],
      image: "", saveListProducts: [],
      displayError: "hide",
    };
  }
  componentDidMount() {
    this.props.initialUpload();
    try {
      document.getElementsByClassName("r-input")[0].placeholder =
        "Chọn ngày và thời gian";
      document.getElementsByClassName("r-input")[1].placeholder =
        "Chọn ngày và thời gian";
    } catch (error) { }
  }

  onSaveProduct = () => {
    this.setState({ saveListProducts: [...this.state.listProducts] })
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.image !== nextProps.image) {
      this.setState({ image: nextProps.image });
    }
  }

  onChangeDecription = (evt) => {
    const data = evt.editor.getData();
    this.setState({ txtContent: data });
  };

  onChange = (e) => {
    var target = e.target;
    var name = target.name;
    var value = target.value;
    const _value = formatNumber(value);
    if (name == "txtAmount" || name == "txtValueDiscount") {
      if (!isNaN(Number(_value))) {
        value = new Intl.NumberFormat().format(_value);
        if (name == "txtValueDiscount" && this.state.txtDiscoutType == "1") {
          if (value.length < 3) {
            if (value == 0) {
              this.setState({ [name]: "" });
            } else {
              this.setState({ [name]: value });
            }
          }
        } else {
          if (value == 0) {
            this.setState({ [name]: "" });
          } else {
            this.setState({ [name]: value });
          }
        }
      }
    } else {
      this.setState({ [name]: value });
    }
  };
  onChangeType = (e) => {
    var target = e.target;
    var name = target.name;
    var value = target.value;
    this.setState({ [name]: value, txtValueDiscount: "" });
  };
  onChangeStart = (e) => {
    var time = moment(e, "DD-MM-YYYY HH:mm").format("DD-MM-YYYY HH:mm");
    var { txtEnd } = this.state;
    if (e != "" && txtEnd != "") {
      if (
        !moment(e, "DD-MM-YYYY HH:mm").isBefore(
          moment(txtEnd, "DD-MM-YYYY HH:mm")
        )
      ) {
        this.setState({ displayError: "show" });
      } else {
        console.log("hidddeee");
        this.setState({ displayError: "hide" });
      }
    }
    this.setState({
      txtStart: time,
    });
  };

  onChangeEnd = (e) => {
    var time = moment(e, "DD-MM-YYYY HH:mm").format("DD-MM-YYYY HH:mm");
    var { txtStart } = this.state;

    if (txtStart != "" && e != "") {
      if (
        !moment(txtStart, "DD-MM-YYYY HH:mm").isBefore(
          moment(e, "DD-MM-YYYY HH:mm")
        )
      ) {
        this.setState({ displayError: "show" });
      } else {
        this.setState({ displayError: "hide" });
      }
    }
    this.setState({
      txtEnd: time,
    });
  };

  onSave = (e) => {
    e.preventDefault();
    if (this.state.displayError == "show") {
      return;
    }
    var state = this.state;

    if (state.txtValueDiscount == null || !isEmpty(state.txtValueDiscount)) {
      this.props.showError({
        type: Types.ALERT_UID_STATUS,
        alert: {
          type: "danger",
          title: "Lỗi",
          disable: "show",
          content: "Vui lòng chọn giá trị giảm giá",
        },
      });
      return;
    }
    var { store_code, comboId } = this.props;

    var listProducts = state.saveListProducts;
    var combo_products = [];
    listProducts.forEach((element, index) => {
      combo_products.push({
        quantity: element.quantity,
        product_id: element.product.id,
      });
    });
    var startTime = moment(state.txtStart, "DD-MM-YYYY HH:mm").format(
      "YYYY-MM-DD HH:mm:ss"
    );
    var endTime = moment(state.txtEnd, "DD-MM-YYYY HH:mm").format(
      "YYYY-MM-DD HH:mm:ss"
    );

    var form = {
      amount:
        state.txtAmount == null
          ? state.txtAmount
          : formatNumber(state.txtAmount),
      value_discount:
        state.txtValueDiscount == null
          ? state.txtValueDiscount
          : formatNumber(state.txtValueDiscount),
      name: state.txtName,
      start_time: startTime == "Invalid date" ? null : startTime,
      end_time: endTime == "Invalid date" ? null : endTime,
      combo_products: combo_products,
      description: state.txtContent,
      image_url: state.image,
      discount_type: state.txtDiscoutType,
      set_limit_amount: true,
    };
    var amount = form.amount;
    if (
      typeof amount == "undefined" ||
      amount == null ||
      (typeof amount != "undefined" && amount.replace(/ /g, "").length == 0)
    )
      form.set_limit_amount = false;
    this.props.createCombo(store_code, form, comboId);
  };

  goBack = (e) => {
    e.preventDefault();
    var { history } = this.props;
    history.goBack();
  };

  handleAddProduct = (product, id, type, onSave) => {
    var products = [...this.state.listProducts];
    console.log(products);

    if (type == "remove") {
      if (products.length > 0) {
        products.forEach((item, index) => {
          if (item.product.id === id) {
            products.splice(index, 1);
          }
        });
      }
    } else {
      var checkExsit = true;
      products.forEach((item, index) => {
        if (item.product.id === product.id) {
          checkExsit = false;
          return;
        }
      });
      if (checkExsit == true) {
        var product = { quantity: 1, product: product };
        products.push(product);
      }
    }
    if (onSave == true)
      this.setState({ listProducts: products, saveListProducts: products })
    else
      this.setState({ listProducts: products })
  };
  
  handleChangeQuantity = (id, quantity, setIncrement = null) => {
    var products = [...this.state.listProducts];
    products.forEach((product, index) => {
      if (product.product.id == id) {
        if (setIncrement == 1) products[index].quantity = product.quantity + 1;
        else if (setIncrement == -1) {
          if (product.quantity == 1) {
          } else products[index].quantity = product.quantity - 1;
        } else products[index].quantity = quantity;
      }
    });
    this.setState({ listProducts: products });
  };

  render() {
    var {
      txtName,
      txtStart,
      txtEnd,
      txtAmount,
      listProducts,
      txtContent,
      txtDiscoutType,
      txtValueDiscount,
      image,
      displayError,
      saveListProducts
    } = this.state;
    var image = image == "" || image == null ? Env.IMG_NOT_FOUND : image;
    var { products, store_code, combos } = this.props;
    var type_discount_default = txtDiscoutType == "0" ? "show" : "hide";
    var type_discount_percent = txtDiscoutType == "1" ? "show" : "hide";

    console.log(this.state);
    return (
      <React.Fragment>
        <form role="form" onSubmit={this.onSave} method="post">
          <div class="row">
            <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
              <div class="box-body">
                {
                  getChannel() == IKITECH && (
                    <React.Fragment>
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
                              data-target="#uploadModalCombo"
                            >
                              <i class="fa fa-plus"></i> Upload ảnh
                            </button>
                          </div>
                        </div>
                      </div>

                    </React.Fragment>
                  )
                }
                <div class="form-group">
                  <label for="product_name">Tên chương trình</label>
                  <input
                    type="text"
                    class="form-control"
                    id="txtName"
                    value={txtName}
                    name="txtName"
                    placeholder="Nhập tên chương trình"
                    autocomplete="off"
                    onChange={this.onChange}
                  />
                </div>
              </div>
            </div>
            <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
              <div class="box-body">
                <div class="form-group">
                  <label for="product_name">Thời gian bắt đầu</label>
                  <MomentInput
                    min={moment()}
                    format="DD-MM-YYYY HH:mm"
                    options={true}
                    enableInputClick={true}
                    monthSelect={true}
                    readOnly={true}
                    translations={{
                      DATE: "Ngày",
                      TIME: "Giờ",
                      SAVE: "Đóng",
                      HOURS: "Giờ",
                      MINUTES: "Phút",
                    }}
                    onSave={() => { }}
                    onChange={this.onChangeStart}
                  />
                </div>

                <div class="form-group">
                  <label for="product_name">Thời gian kết thúc</label>
                  <MomentInput
                    min={moment()}
                    format="DD-MM-YYYY HH:mm"
                    options={true}
                    enableInputClick={true}
                    monthSelect={true}
                    readOnly={true}
                    translations={{
                      DATE: "Ngày",
                      TIME: "Giờ",
                      SAVE: "Đóng",
                      HOURS: "Giờ",
                      MINUTES: "Phút",
                    }}
                    onSave={() => { }}
                    onChange={this.onChangeEnd}
                  />
                </div>
                <div class={`alert alert-danger ${displayError}`} role="alert">
                  Thời gian kết thúc phải sau thời gian bắt đầu
                </div>
                <div class="form-group">
                  <label for="product_name">Giới hạn Combo</label>
                  <input
                    type="text"
                    class="form-control"
                    id="txtAmount"
                    name="txtAmount"
                    value={txtAmount}
                    placeholder="Số lượng mã phiểu có thẻ sử dụng"
                    autocomplete="off"
                    onChange={this.onChange}
                  />
                </div>

                <div class="form-group">
                  <label for="product_name">Loại giảm giá</label>

                  <select
                    value={txtDiscoutType}
                    name="txtDiscoutType"
                    id="input"
                    class="form-control"
                    onChange={this.onChangeType}
                  >
                    <option value="">--Loại giảm giá--</option>
                    <option value="0">Giảm giá cố định</option>
                    <option value="1">Giảm giá theo %</option>
                  </select>
                </div>
                <div class={`form-group ${type_discount_default}`}>
                  <input
                    type="text"
                    class="form-control"
                    id="txtValueDiscount"
                    name="txtValueDiscount"
                    value={txtValueDiscount}
                    placeholder="Nhập giá trị bạn muốn giảm (đ)"
                    autocomplete="off"
                    onChange={this.onChange}
                  />
                </div>

                <div className={`${type_discount_percent}`}>
                  <div class="form-group">
                    <input
                      type="text"
                      class="form-control"
                      id="txtValueDiscount"
                      name="txtValueDiscount"
                      value={txtValueDiscount}
                      placeholder="Nhập giá trị bạn muốn giản (%)"
                      autocomplete="off"
                      onChange={this.onChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
              <div>

                <Table
                  handleChangeQuantity={this.handleChangeQuantity}
                  handleAddProduct={this.handleAddProduct}
                  products={saveListProducts}                ></Table>
              </div>
              {getChannel() == IKITECH &&
                <div class="form-group">
                  <label for="product_name">Ghi chú</label>
                  <CKEditor
                    data={txtContent}
                    onChange={this.onChangeDecription}
                  />
                </div>
              }
            </div>
          </div>
          <div class="row">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
              <div class="box-footer">
                <button
                  type="submit"
                  class="btn btn-info btn-icon-split btn-sm"
                >
                  <span class="icon text-white-50">
                    <i class="fas fa-save"></i>
                  </span>
                  <span class="text">Lưu thay đổi</span>
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
            </div>
          </div>
        </form>

        <ModalUpload />
        <ModalListProduct
          onSaveProduct={this.onSaveProduct}

          combos={combos}
          handleAddProduct={this.handleAddProduct}
          listProducts={listProducts}
          store_code={store_code}
          products={products}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    image: state.UploadReducers.comboImg.combo_img,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    showError: (error) => {
      dispatch(error);
    },
    createCombo: (store_code, form, comboId) => {
      dispatch(comboAction.createCombo(store_code, form, comboId));
    },
    initialUpload: () => {
      dispatch(comboAction.initialUpload());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Form);
