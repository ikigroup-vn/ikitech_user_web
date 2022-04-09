import React, { Component } from "react";
import { connect } from "react-redux";
import * as StoreAAction from "../../../actions/store_address";
import * as placeAction from "../../../actions/place";
import {shallowEqual} from "../../../ultis/shallowEqual"

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtName: "",
      txtPhone:"",
      txtAddress_detail: "",
      txtCountry: 1,
      txtProvince: "",
      txtDistrict: "",
      txtWards: "",
      txtEmail: "",
      txtPickup: "",
      txtReturn: "",
      isLoaded : false,
      listWards : [],
      listDistrict : [],
    };
  }
  onChangeCheck = (e) => {

    var target = e.target;
    var name = target.name;
    var value = target.value;
    if (!e.target.checked)
      this.setState({ [name]: "0" })
    else
      this.setState({ [name]: "1" })

  }
  onChange = (e) => {
    var target = e.target;
    var name = target.name;
    var value = target.value;

    this.setState({
      [name]: value,
    });
  };
  goBack = () => {
    var { history } = this.props;
    history.goBack();
  };
  onChangeProvince = (e) =>{
    console.log(e.target.value)
    this.setState({txtProvince : e.target.value , isLoaded : true})
    this.props.fetchPlaceDistrict_Wards(e.target.value);

  }
  onChangeDistrict = (e) =>{
    this.setState({txtDistrict : e.target.value})
    this.props.fetchPlaceWards(e.target.value);
  }
  componentWillReceiveProps(nextProps,nextState)
  {

    if(nextState.isLoaded == true)
    {
      this.setState({
        listWards : nextProps.wards,
        listDistrict : nextProps.district,
        isLoaded : false
      })
    }

    if(!shallowEqual(nextProps.wards , this.props.wards) || !shallowEqual(this.props.district ,nextProps.district))
    {
      this.setState({
        listWards : nextProps.wards,
        listDistrict : nextProps.district
      })
    }
    if(!shallowEqual(nextProps.wards , this.props.wards))
    {
      this.setState({txtWards : nextProps.wards[0].id})
    }
  }
  onSave = (e) => {
    var { store_code } = this.props

    var is_default_pickup = this.state.txtPickup == "0" ||  this.state.txtPickup == "" ? false : true
    var is_default_return = this.state.txtReturn == "0" || this.state.txtPickup == ""? false : true
      console.log(this.state)
    e.preventDefault();
    this.props.createStoreA(store_code, {
      name: this.state.txtName,
      address_detail: this.state.txtAddress_detail,
      country: this.state.txtCountry,
      province: this.state.txtProvince,
      district: this.state.txtDistrict,
      wards: this.state.txtWards,
      email: this.state.txtEmail,
      phone: this.state.txtPhone,
      is_default_pickup: is_default_pickup,
      is_default_return: is_default_return

    });
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
    var {  province } = this.props
    var { txtName, txtAddress_detail, txtProvince, txtDistrict, txtWards, txtEmail, txtPickup, txtReturn ,listDistrict,listWards,txtPhone } = this.state;

    var checkPickup = txtPickup == "0" || txtPickup == "" ? false : true
    var checkReturn = txtReturn == "0" || txtReturn == "" ? false : true
    return (
      <React.Fragment>
        <form role="form" onSubmit={this.onSave} method="post">
          <div class="box-body">
            <div class="form-group">
              <label for="product_name">Họ tên</label>
              <input
                type="text"
                class="form-control"
                id="txtName"
                placeholder="Nhập họ tên"
                autocomplete="off"
                value={txtName || ""}
                onChange={this.onChange}
                name="txtName"
              />
            </div>
            <div class="form-group">
              <label for="product_name">Email</label>
              <input
                type="text"
                class="form-control"
                id="txtEmail"
                placeholder="Nhập Email"
                autocomplete="off"
                value={txtEmail || ""}
                onChange={this.onChange}
                name="txtEmail"
              />
            </div>
            <div className="form-group">
              <label for="product_name">Phone</label>
              <input
              type="text"
              className="form-control"
              id = "txtPhone"
              placeholder="Nhập số điện thoại"
              autocomplete="off"
              value={txtPhone || ""}
              onChange={this.onChange}
              name="txtPhone"
              />
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
            {/* <div class="form-group">
              <label for="product_name">Quốc gia</label>

              <select
                id="input"
                class="form-control"
                value={txtCountry}
                onChange={this.onChange}
                name="txtCountry"
              >
                <option value="">-- Chọn quốc gia --</option>
                <option value="1">Việt Nam</option>
              </select>
            </div> */}
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
                {this.showDistrict(listDistrict)}
              </select>
            </div>
            <div class="form-group">
              <label for="product_name">Phường/xã</label>

              <select
                id="input"
                class="form-control"
                value={txtWards || ""}
                onChange={this.onChange}
                name="txtWards"
              >
                {this.showWards(listWards)}

              </select>
            </div>

            <div class="form-group form-check">
              <input type="checkbox" class="form-check-input" checked={checkPickup} id="exampleCheck1" name="txtPickup" onChange={this.onChangeCheck} value={txtPickup} />
              <label class="form-check-label" for="exampleCheck1" >Đặt làm địa chỉ giao hàng</label>
            </div>

            <div class="form-group form-check">
              <input checked={checkReturn} value={txtReturn} onChange={this.onChangeCheck} name="txtReturn" type="checkbox" class="form-check-input" id="exampleCheck1" />
              <label class="form-check-label" for="exampleCheck1">Đặt làm địa chỉ nhận hàng</label>
            </div>
          </div>

          <div class="box-footer">
            <button class="btn btn-info btn-icon-split btn-sm">
              <span class="icon text-white-50">
                <i class="fas fa-save"></i>
              </span>
              <span class="text">Tạo</span>
            </button>
            <a
              style={{ marginLeft: "10px" }}
              onClick={this.goBack}
              class="btn btn-warning"
              class="btn btn-warning btn-icon-split btn-sm"
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


const mapDispatchToProps = (dispatch, props) => {
  return {
    createStoreA: (id, form) => {
      dispatch(StoreAAction.createStoreA(id, form));
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
  };
};
export default connect(null, mapDispatchToProps)(Form);
