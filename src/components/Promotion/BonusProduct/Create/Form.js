import React, { Component } from "react";
import * as Types from "../../../../constants/ActionType";
import { connect } from "react-redux";
import * as bonusProductAction from "../../../../actions/bonus_product";
import Table from "./Table";
import TableBonus from "./TableBonus";

import { shallowEqual } from "../../../../ultis/shallowEqual";
import moment from "moment";
import Datetime from "react-datetime";
import ModalListProduct from "./ListProduct";
import ModalListProductBonus from "./ListProductBonus";

import CKEditor from "ckeditor4-react";
import ModalUpload from "../ModalUpload";
import * as Env from "../../../../ultis/default";
import MomentInput from "react-moment-input";
import { formatNumber } from "../../../../ultis/helpers";
import { isEmpty } from "../../../../ultis/helpers";
import getChannel, { IKIPOS, IKITECH } from "../../../../ultis/channel";
import history from "../../../../history";
class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtName: "",
      txtStart: "",
      txtEnd: "",
      txtAmount: "",
      txtContent: "",
      txtDiscoutType: 0,
      txtValueDiscount: "",
      listProducts: [],
      saveListProducts: [],
      listProductsBonus: [],
      saveListProductsBonus: [],
      image: "",
      displayError: "hide",
      multiply_by_number: false,
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

  onSaveProduct = (isBonus) => {
    if (isBonus)
      this.setState({ saveListProductsBonus: [...this.state.listProductsBonus] })
    else
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

  checkStatus = (start_time) => {
    var now = moment().valueOf()
    var start_time = moment(start_time, "YYYY-MM-DD HH:mm:ss").valueOf()
    if (now < start_time) {
      return "0";
    }
    else {
      return "2"
    }

  }

  onSave = (e) => {
    e.preventDefault();
    console.log(this.state.saveListProducts, this.state.saveListProductsBonus)
    if (this.state.displayError == "show") {
      return;
    }
    var state = this.state;


    var { store_code } = this.props;

    var listProducts = state.saveListProducts;
    var listProductsBonus = state.saveListProductsBonus;

    var select_products = [];
    listProducts.forEach((element, index) => {
      var data = { ...element };
      if (data.distribute_name == null)
        delete data.distribute_name
      if (data.element_distribute_name == null)
        delete data.element_distribute_name
      if (data.sub_element_distribute_name == null)
        delete data.sub_element_distribute_name
      delete data.sku
      delete data.name
      delete data.product
      data.product_id = data.id
      delete data.id

      select_products.push(data);
    });

    var bonus_products = [];
    listProductsBonus.forEach((element, index) => {
      var data = { ...element };
      if (data.distribute_name == null)
        delete data.distribute_name
      if (data.element_distribute_name == null)
        delete data.element_distribute_name
      if (data.sub_element_distribute_name == null)
        delete data.sub_element_distribute_name
      delete data.sku
      delete data.name
      delete data.product
      data.product_id = data.id
      delete data.id

      bonus_products.push(data);
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

      name: state.txtName,
      start_time: startTime == "Invalid date" ? null : startTime,
      end_time: endTime == "Invalid date" ? null : endTime,
      bonus_products,
      select_products,
      description: state.txtContent,
      image_url: state.image,
      set_limit_amount: true,
      multiply_by_number : state.multiply_by_number
    };
    var amount = form.amount;
    if (typeof amount == "undefined"
      || amount == null  || !isEmpty(amount)
   )
      form.set_limit_amount = false
    console.log(form);
    this.props.createBonusProduct(store_code, form ,  this.checkStatus(startTime));
  };

  goBack = (e) => {
    // e.preventDefault();
    history.goBack();
  };

  compareTwoProduct(item1, item2) {
    var product1 = { ...item1 }
    var product2 = { ...item2 }

    delete product1.quantity;
    delete product1.product;
    delete product2.quantity;
    delete product2.product;

    console.log(product1, product2)
    if (shallowEqual(product1, product2)) {
      return true
    }
    return false

  }

  handleAddProduct = (product, id, type, onSave, isBonus) => {
    if (isBonus)
      var products = [...this.state.listProductsBonus];
    else
      var products = [...this.state.listProducts];
    console.log(products,product,id,isBonus)
    if (product?.length > 0) {
      if (type == "remove") {
        if (products.length > 0) {
          products = products.filter((value) => {
            return value.product.id !== product[0].id
          })
          // products.forEach((item, index) => {
          //   if (item.product.id === product[0].id) {
          //   // if (this.compareTwoProduct(item, product)) {
          //     products.splice(index, 1);
          //   }
          // });
        }
      } else {
        var checkExsit = true;
        product.forEach((item, index) => {
          var check = false
          var _index = 0

          products.forEach((item1, index1) => {
            // if (this.compareTwoProduct(item, item1)) {
              if (item.id == item1.id){

              check = true;
              _index = index1

            }

          });
          if (check == false) {
           
            var product = { quantity: 1, product: item, allows_all_distribute : item.allows_all_distribute,allows_choose_distribute : item.allows_choose_distribute, id: item.id, sku: item.sku, name: item.name, distribute_name: item.distribute_name, element_distribute_name: item.element_distribute_name, sub_element_distribute_name: item.sub_element_distribute_name };
            if(isBonus == false || typeof isBonus == "undefined")
          delete item.allows_choose_distribute
          else
          delete item.allows_all_distribute

            products.push(product);
          }
          else
          {
            var product = { quantity: 1, product: item, allows_all_distribute : item.allows_all_distribute, allows_choose_distribute : item.allows_choose_distribute,id: item.id, sku: item.sku, name: item.name, distribute_name: item.distribute_name, element_distribute_name: item.element_distribute_name, sub_element_distribute_name: item.sub_element_distribute_name };
            if(isBonus == false || typeof isBonus == "undefined")
          delete item.allows_choose_distribute
          else
          delete item.allows_all_distribute
            products[_index] = product;
          }
        });

      }
    }
    else {
      if (type == "remove") {
        if (products.length > 0) {
          products = products.filter((item) => {
            return !this.compareTwoProduct(item, product)
          })
          // products.forEach((item, index) => {
          //   // if (item.product.id === id) {
          //   if (this.compareTwoProduct(item, product)) {
          //     products.splice(index, 1);
          //   }
          // });
        }
      } else {
        var checkExsit = true;
        var _index = 0

        products.forEach((item, index) => {

          if (item.id == product.id){

            checkExsit = false;
            _index = index

          }
        });
        if (checkExsit == true) {
          var product = { quantity: 1, product: product, allows_all_distribute : product.allows_all_distribute,allows_choose_distribute : product.allows_choose_distribute, id: product.id, sku: product.sku, name: product.name, distribute_name: product.distribute_name, element_distribute_name: product.element_distribute_name, sub_element_distribute_name: product.sub_element_distribute_name };
          if(isBonus == false || typeof isBonus == "undefined")
          delete product.allows_choose_distribute
          else
          delete product.allows_all_distribute
          products.push(product);
        }
        else
        {
          var product = { quantity: 1, product: product, allows_all_distribute : product.allows_all_distribute, allows_choose_distribute : product.allows_choose_distribute, id: product.id, sku: product.sku, name: product.name, distribute_name: product.distribute_name, element_distribute_name: product.element_distribute_name, sub_element_distribute_name: product.sub_element_distribute_name };          products[_index] = product;
          if(isBonus == false || typeof isBonus == "undefined")
          delete product.allows_choose_distribute
          else
          delete product.allows_all_distribute
          products[_index] = product;

        }
      }
    }
    if (onSave == true) {
      if (isBonus)
        this.setState({ listProductsBonus: products, saveListProductsBonus: products })
      else
      
        this.setState({ listProducts: products, saveListProducts: products })
    }

    else {
      if (isBonus)
        this.setState({ listProductsBonus: products })

      else
        this.setState({ listProducts: products })
    }
  };

  handleChangeQuantity = (data, quantity, setIncrement = null, set = true, isBonus) => {
    if (isBonus)
      var products = [...this.state.listProductsBonus];
    else
      var products = [...this.state.listProducts];
    products.forEach((product, index) => {
      // if (product.product.id == id) {
      if (this.compareTwoProduct(product, data)) {
        if (setIncrement == 1) products[index].quantity = product.quantity + 1;
        else if (setIncrement == -1) {
          if (product.quantity == 1) {
          } else products[index].quantity = product.quantity - 1;
        } else products[index].quantity = quantity;
      }
    });
    if (isBonus)
      this.setState({ listProductsBonus: products, saveListProductsBonus: products })
    else
      this.setState({ listProducts: products, saveListProducts: products })
  };

  render() {
    var {
      txtName,
      txtStart,
      txtEnd,
      txtAmount,
      listProducts,
      listProductsBonus,
      multiply_by_number,
      txtContent,
      txtDiscoutType,
      txtValueDiscount,
      image,
      displayError,
      saveListProducts,

      saveListProductsBonus
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
                {/* {
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
                } */}
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
              </div>
            </div>
            <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
              <div class="box-body">

                <div class="form-group">
                  <label for="product_name">Giới hạn số lần thưởng</label>
                  <input
                    type="text"
                    class="form-control"
                    id="txtAmount"
                    name="txtAmount"
                    value={txtAmount}
                    placeholder="Số lượng mã phiểu có thể sử dụng"
                    autocomplete="off"
                    onChange={this.onChange}
                  />
                </div>

                <div class="form-group">
                  <div class="form-check">
                    <input type="checkbox"
                      checked={multiply_by_number}
                      onChange={()=>this.setState({ multiply_by_number: !multiply_by_number })}
                      class="form-check-input" id="gridCheck" />
                    {/* <input class="form-check-input" name="is_set_order_max_point" type="checkbox" id="gridCheck" /> */}
                    <label class="form-check-label" for="gridCheck">
                      Hàng tặng nhân theo số lượng mua                 </label>
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
              {/* {getChannel() == IKITECH &&
                <div class="form-group">
                  <label for="product_name">Ghi chú</label>
                  <CKEditor
                    data={txtContent}
                    onChange={this.onChangeDecription}
                  />
                </div>
              } */}
            </div>
          </div>
          <div class="row">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
              <div>

                <TableBonus
                  handleChangeQuantity={this.handleChangeQuantity}
                  handleAddProduct={this.handleAddProduct}
                  products={saveListProductsBonus}                ></TableBonus>
              </div>
              {/* {getChannel() == IKITECH &&
                <div class="form-group">
                  <label for="product_name">Ghi chú</label>
                  <CKEditor
                    data={txtContent}
                    onChange={this.onChangeDecription}
                  />
                </div>
              } */}
            </div>
          </div>
          <div class="row">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
              <div class="box-footer">
                <button type="submit" class="btn btn-info   btn-sm">
                  <i class="fas fa-plus"></i>  Tạo

                </button>
                <button
                                type = "button"

                  style={{ marginLeft: "10px" }}
                  onClick={this.goBack}
                  class="btn btn-warning   btn-sm"
                >
                  <i class="fas fa-arrow-left"></i> Trở về

                </button>
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
        <ModalListProductBonus
          onSaveProduct={this.onSaveProduct}

          combos={combos}
          handleAddProduct={this.handleAddProduct}
          listProducts={listProductsBonus}
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
    createBonusProduct: (store_code, form ,status) => {
      dispatch(bonusProductAction.createBonusProduct(store_code, form,status));
    },
    initialUpload: () => {
      dispatch(bonusProductAction.initialUpload());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Form);
