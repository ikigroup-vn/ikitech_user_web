import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as dashboardAction from "../../actions/customer_sales";
import * as placeAction from "../../actions/place";
import { shallowEqual } from '../../ultis/shallowEqual';
import Validator from '../../ultis/validator';
import { isEmail, isEmpty } from "../../ultis/helpers"
import themeData from "../../ultis/theme_data";
import Datetime from "react-datetime";
import * as Types from "../../constants/ActionType";
import moment from "moment";

class ModalCreate extends Component {
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
            listWards: [],
            listDistrict: [],
            txtName_branch: "",
            txtPhone_branch: "",
            txtSex: "",
            txtDateOfBirth : null,
            txtEmail_branch: "",
            errors: {},
            error_email: { status: false, text: "" },


        }
        const rules = [
            {
                field: 'txtName_branch',
                method: 'isEmpty',
                validWhen: false,
                message: 'Tên không được để trống.',
            },

            {
                field: 'txtPhone_branch',
                method: 'isLength',
                args: [{ min: 10, max: 12 }],
                validWhen: true,
                message: 'Số điện thoại không hợp lệ.',
            },
        ];
        this.validator = new Validator(rules);
    }
    listErrors = () => {
        return {
            error_email: { status: false, text: "" },

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
    onChangeWards = (e) => {
        this.setState({ txtWards: e.target.value, isLoaded: true })
        var indexWards = this.props.wards.map(e => e.id).indexOf(parseInt(e.target.value))
        if (indexWards !== -1) {
            var nameWards = this.props.wards[indexWards].name
            this.setState({ wardsName: nameWards })
        }
    }
    goBack = () => {
        var { history } = this.props;
        history.goBack();
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
        if (this.props.openModal == true) {
            this.setState({
                provinceName: "",
                districtName: "",
                wardsName: "",
                txtAddress_detail: "",
                txtCountry: 1,
                txtProvince: "",
                txtDistrict: "",
                txtWards: "",
                isLoaded: false,
                listWards: [],
                listDistrict: [],
                txtName_branch: "",
                txtPhone_branch: "",
                txtEmail_branch: "",

            })
            this.props.resetModal()

        }

    }
    onChangeGender = (e) => {
        var target = e.target;
        var name = target.name;
        var value = target.value;
    
        this.setState({
          [name]: value,
        });
      }
    
    handleOnClick = () => {
        const errors = this.validator.validate(this.state)
        var { txtEmail_branch } = this.state
        if(isEmpty(this.state.txtDateOfBirth) && moment(this.state.txtDateOfBirth, "DD-MM-YYYY").format("YYYY-MM-DD HH:mm:ss") == "Invalid date")
        {
          this.props.showErrors(
                {
                  type: Types.ALERT_UID_STATUS,
                  alert: {
                    type: "danger",
                    title: "Lỗi ",
                    disable: "show",
                    content: "Ngày sinh không đúng định dạng (DD-MM-YYYY)",
                  },
                }
              )
              return;
        }
        this.setState({
            errors: errors,
        });
        var error = false

        if (!isEmail(txtEmail_branch) && isEmpty(txtEmail_branch)) {
            error = true
            this.setState({ error_email: { text: "Email không đúng định dạng", status: true } })
        }
        else {
            this.setState({ error_email: { text: "", status: false } })

        }

        if (Object.keys(errors).length === 0 && (!isEmpty(this.state.txtEmail_branch) || (isEmail(this.state.txtEmail_branch) && isEmpty(this.state.txtEmail_branch)))) {
            var { txtAddress_detail, txtDistrict, txtProvince, txtWards, txtName_branch, txtPhone_branch, txtEmail_branch,txtDateOfBirth,txtSex } = this.state
            const { store_code } = this.props
            const Formdata = {
                name: txtName_branch,
                phone_number: txtPhone_branch,
                email: txtEmail_branch,
                address: txtAddress_detail,
                date_of_birth: moment(txtDateOfBirth, "DD-MM-YYYY").format("YYYY-MM-DD HH:mm:ss"),
                sex: txtSex
            }

            this.props.createCustomer(store_code, Formdata, function () {
                window.$(".modal").modal("hide");
            } , this, function(_this){
                _this.setState({
                    provinceName: "",
                    districtName: "",
                    wardsName: "",
                    txtAddress_detail: "",
                    txtCountry: 1,
                    txtProvince: "",
                    txtDistrict: "",
                    txtWards: "",
                    isLoaded: false,
                    listWards: [],
                    listDistrict: [],
                    txtName_branch: "",
                    txtPhone_branch: "",
                    txtEmail_branch: "",
                    txtDateOfBirth : ""
    
                })
            });
        }

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
    onChangeDate = (e) => {
        var time = moment(e, "DD-MM-YYYY").format("DD-MM-YYYY");
        this.setState({
          txtDateOfBirth: time,
        });
      };
    render() {
        var { province } = this.props
        var { txtAddress_detail, txtProvince, txtDistrict, txtWards, listDistrict, listWards, errors, error_email,txtSex ,txtDateOfBirth} = this.state;
        var { txtName_branch, txtPhone_branch, txtEmail_branch } = this.state;
        var isMale = txtSex == "1" ? true : false
        var isFemail = txtSex == "2" ? true : false
        var isAnother = txtSex == "0" ? true : false
    
        console.log(isEmail(txtEmail_branch), isEmpty())

        console.log(txtDateOfBirth)
        return (
            <>
                {this.state.status &&
                    <div class="alert alert-danger alert-dismissible" style={{ position: "fixed", top: "10px" }} >
                        <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
                        <strong>Chưa nhập đủ thông tin địa chỉ</strong>
                    </div>}


                <div class="modal" id="modalCreateCustomer">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div className='model-header-modal' style={{ display: 'flex', justifyContent: "space-between", backgroundColor: themeData().backgroundColor }}>
                                <h4 style={{ color: "white", margin: "10px" }}>Thêm khách hàng tư vấn</h4>
                                <button type="button" class="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div class="modal-body">
                                <React.Fragment>
                                    <form role="form" >
                                        <div className='row'>
                                            <div className='col-12 box-body-left'>

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
                                                    {errors.txtName_branch && <div className="validation" style={{ display: 'block' }}>{errors.txtName_branch}</div>}

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
                                                    {errors.txtPhone_branch && <div className="validation" style={{ display: 'block' }}>{errors.txtPhone_branch}</div>}
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
                                                    {error_email.status && <div className="validation" style={{ display: 'block' }}>{error_email.text}</div>}

                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="fname">Ngày sinh</label>
                                                    <Datetime
                                                        inputProps={{
                                                            placeholder: "Chưa cập nhật",
                                                        }}
                                                        // initialValue={txtDateOfBirth}
                                                        value = {txtDateOfBirth}
                                                        onChange={this.onChangeDate}
                                                        dateFormat="DD-MM-YYYY"
                                                        timeFormat={false}
                                                        renderInput={(props) => {
                                                            return <input {...props} value={txtDateOfBirth} />
                                                        }}
                                                    />
                                                </div>
                                                <div className="form-group gender">
                                                    <label htmlFor="gender">Giới tính</label>
                                                    <div className="radio" onChange={this.onChangeGender}>
                                                        <label>
                                                            <input type="radio" name="txtSex" checked={isMale} className="male" id="male" value="1" />
                                                            Nam
                                                        </label>
                                                        <label>
                                                            <input type="radio" name="txtSex" checked={isFemail} className="male" id="female" value="2" />
                                                            Nữ
                                                        </label>
                                                        <label>
                                                            <input type="radio" name="txtSex" checked={isAnother} className="male" id="another" value="0" />
                                                            Khác
                                                        </label>
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

                                            </div>
                                            
                                        </div>


                                    </form>
                                </React.Fragment>
                            </div>

                            <div class="modal-footer">
                                <button
                                    type="button"
                                    class="btn btn-default"
                                    data-dismiss="modal"
                                >
                                    Đóng
                                </button>
                                <button type="submit" style={{ backgroundColor: themeData().backgroundColor }} onClick={this.handleOnClick} class="btn btn-info">
                                    Tạo
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </>
        )
    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        createCustomer: (id, form, funcModal , _this , resetModal) => {
            dispatch(dashboardAction.createCustomerSale(id, form, funcModal  , _this , resetModal));
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
        showErrors : (alert) =>{
            dispatch(alert);
        }
    }
}

export default connect(null, mapDispatchToProps)(ModalCreate)