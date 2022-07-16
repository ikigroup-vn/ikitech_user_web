import React, { Component } from "react";
import * as Types from "../../../../constants/ActionType";
import { connect } from "react-redux";
import * as discountAction from "../../../../actions/discount";
import Table from "./Table";
import { shallowEqual } from "../../../../ultis/shallowEqual";
import moment from "moment";
import Datetime from "react-datetime";
import ModalListProduct from "../Create/ListProduct";
import CKEditor from "ckeditor4-react";
import ModalUpload from "../ModalUpload"
import * as Env from "../../../../ultis/default"
import MomentInput from 'react-moment-input';
import { formatNumber } from "../../../../ultis/helpers"
import { isEmpty } from "../../../../ultis/helpers"
import ConfimUpdateUsed from "./ConfimUpdateUsed";
import getChannel, { IKIPOS, IKITECH } from "../../../../ultis/channel";
import { getQueryParams } from "../../../../ultis/helpers"
import history from "../../../../history"
class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtName: "",
      txtStart: "",
      txtEnd: "",
      txtValue: "",
      txtAmount: "",
      lastAmount: 0,
      listProducts: [],
      txtContent: "",
      image: "",
      displayError: "hide",
      saveListProducts: [],

      isLoading: false,
      loadCript: false,
      form: {}
    };
  }

  componentDidUpdate(prevProps, prevState) {

    try {
      document.getElementsByClassName('r-input')[0].placeholder = 'Chọn ngày và thời gian';
      document.getElementsByClassName('r-input')[1].placeholder = 'Chọn ngày và thời gian';
    } catch (error) {

    }

  }
  componentWillReceiveProps(nextProps) {
    if (!shallowEqual(nextProps.discount, this.props.discount)) {
      var { discount } = nextProps;
      var startTime = discount.start_time == null || discount.start_time == "" ? "" : moment(discount.start_time).format("DD-MM-YYYY HH:mm");
      var endTime = discount.end_time == null || discount.end_time == "" ? "" : moment(discount.end_time).format("DD-MM-YYYY HH:mm");

      this.setState({
        txtName: discount.name,
        txtStart: startTime,
        txtEnd: endTime,
        txtValue: discount.value == null ? null : new Intl.NumberFormat().format(discount.value.toString()),
        txtAmount: discount.amount == null ? null : new Intl.NumberFormat().format(discount.amount.toString()),
        lastAmount: discount.amount == null ? null : new Intl.NumberFormat().format(discount.amount.toString()),
        listProducts: discount.products,
        saveListProducts: discount.products,

        txtContent: discount.description,
        image: discount.image_url,
        isLoading: true,
        loadCript: true
      });
    }
    if (this.props.image !== nextProps.image) {
      this.setState({ image: nextProps.image })
    }
  }
  onChange = (e) => {
    var target = e.target;
    var name = target.name;
    var value = target.value;

    const _value = formatNumber(value);
    if (name == "txtValue" || name == "txtAmount") {
      if (!isNaN(Number(_value))) {
        value = new Intl.NumberFormat().format(_value);
        if (name == "txtValue") {
          if (value.length < 3) {
            if (value == 0) {
              this.setState({ [name]: 0 });
            }
            else {
              this.setState({ [name]: value });

            }
          }
        }
        else {
          if (value == 0) {
            this.setState({ [name]: 0 });
          }
          else {
            this.setState({ [name]: value });

          }
        }
      }
    }
    else {
      this.setState({ [name]: value });

    };
  };
  onChangeStart = (e) => {
    var time = moment(e, "DD-MM-YYYY HH:mm").format("DD-MM-YYYY HH:mm");
    var { txtEnd } = this.state
    if (e != "" && txtEnd != "") {

      if (!moment(e, 'DD-MM-YYYY HH:mm').isBefore(moment(txtEnd, 'DD-MM-YYYY HH:mm'))) {

        this.setState({ displayError: "show" })
      }
      else {
        console.log("hidddeee")
        this.setState({ displayError: "hide" })

      }
    }
    this.setState({
      txtStart: time,
    });
  };

  onChangeEnd = (e) => {
    var time = moment(e, "DD-MM-YYYY HH:mm").format("DD-MM-YYYY HH:mm");
    var { txtStart } = this.state

    if (txtStart != "" && e != "") {

      if (!moment(txtStart, 'DD-MM-YYYY HH:mm').isBefore(moment(e, 'DD-MM-YYYY HH:mm'))) {

        this.setState({ displayError: "show" })
      }
      else {
        this.setState({ displayError: "hide" })

      }
    }
    this.setState({
      txtEnd: time,
    });
  };

  onChangeDecription = (evt) => {
    const data = evt.editor.getData();
    this.setState({ txtContent: data });
  };

  onOkUpdate = () => {

    var { store_code, discountId } = this.props
    this.props.updateDiscount(store_code, this.state.form, discountId)
  }
  onSave = (e) => {
    e.preventDefault();
    if (this.state.displayError == "show") {
      return
    }
    var state = this.state;
    if (state.txtValue == null || !isEmpty(state.txtValue)) {
      this.props.showError({

        type: Types.ALERT_UID_STATUS,
        alert: {
          type: "danger",
          title: "Lỗi",
          disable: "show",
          content: "Vui lòng chọn giá trị giảm giá",
        },
      }
      )
      return;
    }
    var { store_code, discountId } = this.props
    var listProducts = state.saveListProducts
    var product_ids = ""
    listProducts.forEach((element, index) => {
      if (listProducts.length == index + 1)
        product_ids = product_ids + element.id
      else
        product_ids = product_ids + element.id + ","

    });
    var startTime = moment(state.txtStart, "DD-MM-YYYY HH:mm:ss").format("YYYY-MM-DD HH:mm:ss");
    var endTime = moment(state.txtEnd, "DD-MM-YYYY HH:mm:ss").format("YYYY-MM-DD HH:mm:ss");
    var form = {
      name: state.txtName,
      start_time: startTime == "Invalid date" ? null : startTime,
      end_time: endTime == "Invalid date" ? null : endTime,
      value: state.txtValue == null ? state.txtValue : formatNumber(state.txtValue),
      amount: state.txtAmount == null ? state.txtAmount : formatNumber(state.txtAmount),
      product_ids: product_ids,
      description: state.txtContent,
      image_url: state.image
    }
    if (form.product_ids == "") {
      delete form.product_ids
    }
    form.set_limit_amount = form.amount == null || form.amount == "" ? false : true


    if (this.state.lastAmount != this.state.txtAmount && this.state.lastAmount != 0
      && this.state.txtAmount != 0
    ) {
      this.setState({
        form: form
      })
      window.$("#confimUpdateUsedModal").modal("show")
    } else {
      this.props.updateDiscount(store_code, form, discountId)
    }



  };
  goBack = (e) => {
    var { store_code } = this.props

    var type = getQueryParams("type")
    if (type) {
      history.replace(`/discount/${store_code}?type=${type}`)
    }
    else {
      history.goBack()
    }
  };

  handleAddProduct = (product, id, type, onSave = null) => {
    console.log(product);
    var products = [...this.state.listProducts];

    if (type == "remove") {
      if (products.length > 0) {
        products.forEach((item, index) => {
          if (item.id === id) {
            products.splice(index, 1);
          }
        });
      }
    } else {
      var checkExsit = true
      products.forEach((item, index) => {
        if (item.id === product.id) {
          checkExsit = false;
          return;
        }
      });
      if (checkExsit == true) {
        products.push(product)
      }
    }
    if (onSave == true)
      this.setState({ listProducts: products, saveListProducts: products })
    else
      this.setState({ listProducts: products })
  };


  onSaveProduct = () => {
    this.setState({ saveListProducts: [...this.state.listProducts] })
  }
  render() {
    var { txtName, txtStart, txtEnd, txtValue, txtAmount, listProducts, image, txtContent, displayError, isLoading, saveListProducts } = this.state;
    var image = image == "" || image == null ? Env.IMG_NOT_FOUND : image;

    var { products, store_code, discounts, discount } = this.props;
    var now = moment().valueOf()
    var end_time = moment(discount.end_time, "YYYY-MM-DD HH:mm:ss").valueOf()
    var canOnsave = now < end_time
    return (
      <React.Fragment>

        <form role="form" onSubmit={() => canOnsave == true && this.onSave} method="post">
          <div class="box-body">
            {/* {
              getChannel() == IKITECH && (
                <React.Fragment>
                  <div class="form-group">
                    <label>Preview Ảnh: &nbsp; </label>
                    <img src={`${image}`} width="150" height="150" />
                  </div>
                  <div class="form-group">

                    <div class="kv-avatar">
                      <div >
                        <button
                          type="button"
                          class="btn btn-primary btn-sm"
                          data-toggle="modal"
                          data-target="#uploadModalDiscount"
                        >
                          <i class="fa fa-plus"></i> Upload ảnh
                        </button>
                      </div>
                    </div>

                  </div>

                </React.Fragment>
              )} */}

            <div class="form-group">
              <label for="product_name">Tên chương trình</label>
              <input
                type="text"
                class="form-control"
                id="txtName"
                value={txtName}
                name="txtName"
                placeholder="Nhập tên cửa hàng"
                autocomplete="off"
                onChange={this.onChange}
              />
            </div>
            <div class="form-group">
              <label for="product_name">Ngày bắt đầu</label>
              {isLoading == true
                ?
                (<MomentInput
                  defaultValue={txtStart == "" || txtStart == null ? "" : moment(txtStart, "DD-MM-YYYY HH:mm")}
                  min={moment()}
                  format="DD-MM-YYYY HH:mm"
                  options={true}
                  enableInputClick={true}
                  monthSelect={true}
                  readOnly={true}
                  translations={
                    { DATE: "Ngày", TIME: "Giờ", SAVE: "Đóng", HOURS: "Giờ", MINUTES: "Phút" }
                  }
                  onSave={() => { }}
                  onChange={this.onChangeStart}
                />) : null}



            </div>

            <div class="form-group">
              <label for="product_name">Ngày kết thúc</label>
              {isLoading == true
                ?
                (<MomentInput

                  defaultValue={txtEnd == "" || txtEnd == null ? "" : moment(txtEnd, "DD-MM-YYYY HH:mm")}

                  min={moment()}
                  format="DD-MM-YYYY HH:mm"
                  options={true}
                  enableInputClick={true}
                  monthSelect={true}
                  readOnly={true}

                  translations={
                    { DATE: "Ngày", TIME: "Giờ", SAVE: "Đóng", HOURS: "Giờ", MINUTES: "Phút" }
                  }
                  onSave={() => { }}
                  onChange={this.onChangeEnd}
                />)
                : null
              }

            </div>
            <div class={`alert alert-danger ${displayError}`} role="alert">
              Thời gian kết thúc phải sau thời gian bắt đầu
            </div>
            <div class="form-group">
              <label for="product_name">Giảm giá (%)</label>
              <div class="input-group">

                <input type="text"
                  class="form-control"
                  id="txtValue"
                  name="txtValue"
                  value={txtValue}
                  placeholder="nhập giảm giá"
                  autocomplete="off"
                  onChange={this.onChange} />
                <div class="input-group-append">
                  <span class="input-group-text" id="basic-addon2">%</span>
                </div>
              </div>

            </div>
            {/* {
              getChannel() == IKITECH &&
              <div class="form-group">
                <label for="product_name">Giới hạn đặt hàng</label>
                <input
                  value={txtAmount}
                  type="text"
                  class="form-control"
                  id="txtAmount"
                  name="txtAmount"
                  placeholder="nhập số lượng (Mặc định : Không giới hạn)"
                  autocomplete="off"
                  onChange={this.onChange}
                />
              </div>
            } */}


            <Table products={saveListProducts} handleAddProduct={this.handleAddProduct} ></Table>
            {/* {
              getChannel() == IKITECH &&
              <div class="form-group">
                <label for="product_name">Mô tả</label>
                <CKEditor
                  data={txtContent}
                  onChange={this.onChangeDecription}
                />
              </div>
            } */}
          </div>
          <div class="box-footer">
            {canOnsave == true && <button type="submit" class="btn btn-info   btn-sm">
              <i class="fas fa-save"></i>  Lưu

            </button>}

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
        <ModalUpload />

        <ConfimUpdateUsed onOk={this.onOkUpdate} />
        <ModalListProduct onSaveProduct={this.onSaveProduct}
          discounts={discounts} discount={discount} handleAddProduct={this.handleAddProduct} listProducts={listProducts} store_code={store_code} products={products} />
      </React.Fragment>

    );
  }
}
const mapStateToProps = (state) => {
  return {
    image: state.UploadReducers.discountImg.discount_img,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    showError: (error) => {
      dispatch(error)
    },
    updateDiscount: (store_code, discount, id) => {
      dispatch(discountAction.updateDiscount(store_code, discount, id));
    },

  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Form);
