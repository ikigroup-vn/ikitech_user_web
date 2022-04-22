import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import Loading from "../../../../screens/Loading";
import * as customerAction from "../../../../actions/customer";
import * as Env from "../../../../ultis/default";
import moment from "moment";
import { getQueryParams } from "../../../../ultis/helpers"
import * as placeAction from "../../../../actions/place";
import { shallowEqual } from '../../../../ultis/shallowEqual';
import history from "../../../../history";
class Customer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      provinceName: "",
      districtName: "",
      wardsName: "",
      txtAddress_detail: "",
      txtCountry: 1,
      txtProvince: "",
      txtDistrict: "",
      txtWards: "",
      isLoaded: false,
      goFirst : true,
      listWards: [],
      listDistrict: [],
      txtName_branch: "",
      txtPhone_branch: "",
      txtEmail_branch: "",
      idCustomer: ""
    }
  }
  onChange = (e) => {
    var target = e.target;
    var name = target.name;
    var value = target.value;

    this.setState({
      [name]: value,
    });
  };

  componentWillMount()
  {
    if (typeof this.props.customer.id != "undefined") {
      
      this.setState({
        txtName_branch: this.props.customer.name,
        txtPhone_branch: this.props.customer.phone_number,
        txtEmail_branch: this.props.customer.email,
        txtProvince: this.props.customer.province,
        txtDistrict: this.props.customer.district,
        txtWards: this.props.customer.wards,
        txtAddress_detail: this.props.customer.address_detail,
        idCustomer: this.props.customer.id,
        goFirst : false
      })
    }

    if (this.state.isLoaded === true) {
      this.setState({
        listWards: this.props.wards,
        listDistrict: this.props.district,
        isLoaded: false
      })
    }

    if (this.props.wards) {
      this.setState({
        listWards: this.props.wards,
        listDistrict: this.props.district
      })
    }

  }


  componentDidMount() {
    var { store_code, customerId } = this.props;
    this.props.fetchCustomerId(store_code, customerId);
    this.props.fetchPlaceProvince()

  }




  onChangeWards = (e) => {
    this.setState({ txtWards: e.target.value, isLoaded: true })
    var indexWards = this.props.wards.map(e => e.id).indexOf(parseInt(e.target.value))
    if (indexWards !== -1) {
      var nameWards = this.props.wards[indexWards].name
      this.setState({ wardsName: nameWards })
    }
  }
  goBack = () => {
    var { store_code } = this.props;
    history.replace(`/customer/${store_code}/?pag=${getQueryParams("pag")}`);
  };
  onChangeProvince = (e) => {
    this.setState({ txtProvince: e.target.value, isLoaded: true })
    this.props.fetchPlaceDistrict(e.target.value);
    var indexProvince = this.props.province.map(e => e.id).indexOf(parseInt(e.target.value))
    if (indexProvince !== -1) {
      var nameProvince = this.props.province[indexProvince].name
      this.setState({ provinceName: nameProvince })
    }
  }
  onChangeDistrict = (e) => {
    this.setState({ txtDistrict: e.target.value })
    this.props.fetchPlaceWards(e.target.value)
    var indexDistrict = this.props.district.map(e => e.id).indexOf(parseInt(e.target.value))
    if (indexDistrict !== -1) {
      var nameDistrict = this.props.district[indexDistrict].name
      this.setState({ districtName: nameDistrict })
    }
  }

  componentWillReceiveProps(nextProps, nextState) {
    if (!shallowEqual(nextProps.customer, this.props.customer)) {
      this.props.fetchPlaceDistrict(nextProps.customer.province);
      this.props.fetchPlaceWards(nextProps.customer.district)
      this.setState({
        txtName_branch: nextProps.customer.name,
        txtPhone_branch: nextProps.customer.phone_number,
        txtEmail_branch: nextProps.customer.email,
        txtProvince: nextProps.customer.province,
        txtDistrict: nextProps.customer.district,
        txtWards: nextProps.customer.wards,
        txtAddress_detail: nextProps.customer.address_detail,
        idCustomer: nextProps.customer.id,
        goFirst : false
      })
    }

    if (nextState.isLoaded === true) {
      this.setState({
        listWards: nextProps.wards,
        listDistrict: nextProps.district,
        isLoaded: false
      })
    }

    if (!shallowEqual(nextProps.wards, this.props.wards) || !shallowEqual(this.props.district, nextProps.district)) {
      this.setState({
        listWards: nextProps.wards,
        listDistrict: nextProps.district
      })
    }


 
  }
  handleOnClick = (e) => {
    e.preventDefault()
    var { txtAddress_detail, txtDistrict, txtProvince, txtWards, txtName_branch, txtPhone_branch, txtEmail_branch, idCustomer } = this.state
    const { store_code } = this.props
    const Formdata = {
      name: txtName_branch,
      phone_number: txtPhone_branch,
      email: txtEmail_branch,
      province: txtProvince,
      district: txtDistrict,
      wards: txtWards,
      address_detail: txtAddress_detail,

    }
    console.log("Formdata", Formdata)
    this.props.editCustomer(store_code, idCustomer, Formdata);


  };
  showProvince = (places) => {
    var result = null;
    if (places.length > 0) {
      result = places.map((data, index) => {

        return (
          <option value={data.id}>{data.name}</option>
        )

      })
    }
    return result

  }
  showWards = (places) => {
    var result = null;
    if (places.length > 0) {
      result = places.map((data, index) => {

        return (
          <option value={data.id}>{data.name}</option>
        )

      })
    }
    return result

  }

  
  goBack = () => {
    var { store_code } = this.props;

 
    history.replace(`/customer/${store_code}/?pag=${getQueryParams("pag")}`);
  };

  showDistrict = (places) => {
    var result = null;
    if (places.length > 0) {
      result = places.map((data, index) => {

        return (
          <option value={data.id}>{data.name}</option>
        )

      })
    }
    return result

  }
  render() {
    var { province } = this.props
    var { txtAddress_detail, txtProvince, txtDistrict, txtWards, listDistrict, listWards } = this.state;
    var { txtName_branch, txtPhone_branch, txtCode_branch, txtPost_branch, txtEmail_branch } = this.state;
    return (
      <form role="form" method="post">
        <div class="box-body">

       
          <div class="form-group">
            <label for="product_name">Tên khách hàng</label>
            <input
              type="text"
              class="form-control"
              id="txtName_branch"
              placeholder="Nhập tên khách hàng"
              autocomplete="off"
              value={txtName_branch || ""}
              onChange={this.onChange}
              name="txtName_branch"
            />
          </div>
          <div class="form-group">
            <label for="product_name">Số điện thoại</label>
            <input
              type="text"
              class="form-control"
              id="txtPhone_branch"
              placeholder="Nhập số điện thoại"
              autocomplete="off"
              value={txtPhone_branch || ""}
              onChange={this.onChange}
              name="txtPhone_branch"
            />
          </div>
          <div class="form-group">
            <label for="product_name">Email</label>
            <input
              type="text"
              class="form-control"
              id="txtEmail_branch"
              placeholder="Nhập email"
              autocomplete="off"
              value={txtEmail_branch || ""}
              onChange={this.onChange}
              name="txtEmail_branch"
            />
          </div>
        </div>
          <div class="form-group">
            <label for="product_name">Địa chỉ chi tiết</label>
            <input
              type="text"
              class="form-control"
              id="txtAddress_detail"
              placeholder="Nhập chi tiết địa chỉ"
              autocomplete="off"
              value={txtAddress_detail || ""}
              onChange={this.onChange}
              name="txtAddress_detail"
            />
          </div>
          <div class="form-group">
            <label for="product_name">Tỉnh/thành phố </label>

            <select
              id="input"
              class="form-control"
              value={txtProvince || ""}
              onChange={this.onChangeProvince}
              name="txtProvince"
            >
              <option value="">-- Chọn tỉnh/thành phố --</option>
              {this.showProvince(province)}
            </select>
          </div>
          <div class="form-group">
            <label for="product_name">Quận/huyện</label>

            <select
              id="input"
              class="form-control"
              value={txtDistrict || ""}
              onChange={this.onChangeDistrict}
              name="txtDistrict"
            >
              <option value="">-- Chọn quận/huyện --</option>
              {this.showDistrict(listDistrict)}
            </select>
          </div>
          <div class="form-group">
            <label for="product_name">Phường/xã</label>

            <select
              id="input"
              class="form-control"
              value={txtWards || ""}
              onChange={this.onChangeWards}
              name="txtWards"
            >
              <option value="">-- Chọn phường/xã --</option>
              {this.showWards(listWards)}

            </select>
          </div>

        <div class="box-footer">
          <button onClick={this.handleOnClick}  class="btn btn-info btn-icon-split btn-sm">
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
    );

  }
}

const mapStateToProps = (state) => {
  return {
    customer: state.customerReducers.customer.customerID,
    auth: state.authReducers.login.authentication,
    state,
    chat: state.chatReducers.chat.chatID,
    permission: state.authReducers.permission.data,
    wards: state.placeReducers.wards,
    province: state.placeReducers.province,
    district: state.placeReducers.district
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchCustomerId: (store_code, customerId) => {
      dispatch(customerAction.fetchCustomerId(store_code, customerId));
    },
    editCustomer: (store_code, id, form, funcModal) => {
      dispatch(customerAction.editCustomer(store_code, id, form, funcModal));
    },
    fetchPlaceDistrict: (id) => {
      dispatch(placeAction.fetchPlaceDistrict(id));
    },
    fetchPlaceWards: (id) => {
      dispatch(placeAction.fetchPlaceWards(id));
    },
    fetchPlaceDistrict_Wards: (id) => {
      dispatch(placeAction.fetchPlaceDistrict_Wards(id));
    },
    fetchPlaceProvince: () => {
      dispatch(placeAction.fetchPlaceProvince());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Customer);
