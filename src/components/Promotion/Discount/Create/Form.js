import React, { Component } from "react";
import { connect } from "react-redux";
import * as discountAction from "../../../../actions/discount";
import Table from "./Table";
import moment from "moment";
import Datetime from "react-datetime";
import ModalListProduct from "./ListProduct";
import CKEditor from "ckeditor4-react";
import ModalUpload from "../ModalUpload";
import * as Env from "../../../../ultis/default"
import MomentInput from 'react-moment-input';
import {formatNumber} from "../../../../ultis/helpers"
import {isEmpty} from "../../../../ultis/helpers"
import * as Types from "../../../../constants/ActionType";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtName: "",
      txtStart: "",
      txtEnd: "",
      txtValue: "",
      txtAmount: "",
      listProducts: [],
      txtContent: "",
      image: "",
      displayError : "hide"
    };
  }
  componentDidMount() {
    this.props.initialUpload()
    try {
      document.getElementsByClassName('r-input')[0].placeholder = 'Chọn ngày và thời gian';
      document.getElementsByClassName('r-input')[1].placeholder = 'Chọn ngày và thời gian';
    } catch (error) {
      
    }

  }

  componentWillReceiveProps(nextProps) {
    if (this.props.image !== nextProps.image) {
      this.setState({ image: nextProps.image })
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
    if (name == "txtValue" || name == "txtAmount") {
      if (!isNaN(Number(_value))) {
        value = new Intl.NumberFormat().format(_value);
        if (name == "txtValue") {
          if (value.length < 3) {
            if (value == 0) {
              this.setState({ [name]: "" });
            }
            else {
              this.setState({ [name]: value });

            }
          }
        }
        else {
          if (value == 0) {
            this.setState({ [name]: "" });
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
  }
  onChangeStart = (e) => {
    var time = moment(e, "DD-MM-YYYY HH:mm").format("DD-MM-YYYY HH:mm");
    var { txtEnd } = this.state
    if (e != "" && txtEnd != "") {

      if(!moment(e, 'DD-MM-YYYY HH:mm').isBefore(moment(txtEnd, 'DD-MM-YYYY HH:mm'))){

        this.setState({displayError : "show"})
      }
      else
      {
        console.log("hidddeee")
        this.setState({displayError : "hide"})

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

      if(!moment(txtStart, 'DD-MM-YYYY HH:mm').isBefore(moment(e, 'DD-MM-YYYY HH:mm'))){

        this.setState({displayError : "show"})
      }
      else
      {
        this.setState({displayError : "hide"})

      }
    }
    this.setState({
      txtEnd: time,
    });
  };
  onSave = (e) => {
    console.log("dadassss")

    e.preventDefault();
    if(this.state.displayError == "show")
    {
      return
    }
    var state = this.state;
    if(state.txtValue == null || !isEmpty( state.txtValue))
    {
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
    var { store_code } = this.props
    var listProducts = state.listProducts
    var product_ids = ""
    listProducts.forEach((element, index) => {
      if (listProducts.length == index + 1)
        product_ids = product_ids + element.id
      else
        product_ids = product_ids + element.id + ","

    });
    var startTime = moment(state.txtStart, "DD-MM-YYYY HH:mm").format("YYYY-MM-DD HH:mm:ss");
    var endTime = moment(state.txtEnd, "DD-MM-YYYY HH:mm").format("YYYY-MM-DD HH:mm:ss");
    var form = {
      name: state.txtName,
      start_time: startTime == "Invalid date" ? null : startTime,
      end_time: endTime== "Invalid date" ? null : endTime,
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
    console.log(form)
    this.props.createDiscount(store_code, form)
  };
  goBack = (e) => {
    e.preventDefault();
    var { history } = this.props;
    history.goBack();
  };

  handleAddProduct = (product, id, type) => {
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
    this.setState({ listProducts: products })
  };
  render() {
    var { txtName, txtStart, txtEnd, txtValue, txtAmount, listProducts, txtContent, image , displayError } = this.state;
    var image = image == "" || image == null ? Env.IMG_NOT_FOUND : image;
    var { products, store_code, discounts } = this.props;
    return (
      <React.Fragment>
        <form role="form" onSubmit={this.onSave} method="post">

          <div class="box-body">
            <div class="form-group">
              <label>Ảnh: &nbsp; </label>
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
                name="txtName"
              />
            </div>
            <div class="form-group">
              <label for="product_name">Ngày bắt đầu</label>
              <MomentInput
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
              />

            </div>

            <div class="form-group">
              <label for="product_name">Ngày kết thúc</label>
              <MomentInput

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
              />


            </div>
            <div class={`alert alert-danger ${displayError}`} role="alert">
              Thời gian kết thúc phải sau thời gian bắt đầu
            </div>
            <div class="form-group">
              <label for="product_name">Giảm giá</label>
              <input
                type="text"
                class="form-control"
                id="txtValue"
                name="txtValue"
                value={txtValue}
                placeholder="nhập giảm giá"
                autocomplete="off"
                onChange={this.onChange}
              />
            </div>

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


            <Table handleAddProduct={this.handleAddProduct} products={listProducts}></Table>
            <div class="form-group">
              <label for="product_name">Mô tả</label>
              <CKEditor
                data={txtContent}
                onChange={this.onChangeDecription}
              />
            </div>
          </div>
          <div class="box-footer">
            <button type="submit" class="btn btn-info btn-icon-split btn-sm">
              <span class="icon text-white-50">
                <i class="fas fa-save"></i>
              </span>
              <span class="text">Tạo</span>
            </button>
            <a
              style={{ marginLeft: "10px" }}
              onClick={this.goBack}
              class="btn btn-warning"
              class="btn btn-warning btn-icon-split  btn-sm"
            >
              <span class="icon text-white-50">
                <i class="fas fa-arrow-left"></i>
              </span>
              <span class="text"> Trở về</span>
            </a>
          </div>

        </form>
        <ModalUpload />
        <ModalListProduct
          discounts={discounts}
          handleAddProduct={this.handleAddProduct}
          listProducts={listProducts}
          store_code={store_code}
          products={products} />
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
    createDiscount: (store_code, discount) => {
      dispatch(discountAction.createDiscount(store_code, discount));
    },
    initialUpload: () => {
      dispatch(discountAction.initialUpload())
    }

  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Form);
