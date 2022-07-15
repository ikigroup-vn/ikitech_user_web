import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as customerAction from "../../actions/customer_sales";
import { shallowEqual } from '../../ultis/shallowEqual';
import moment from "moment";
import Datetime from "react-datetime";
import themeData from "../../ultis/theme_data";

class ModalEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            txtAddress_detail: "",
            isLoaded: false,
            txtName_branch: "",
            txtPhone_branch: "",
            txtEmail_branch: "",
            txtSex:"",
            idCustomer: "",
            txtDateOfBirth:""
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
    goBack = () => {
        var { history } = this.props;
        history.goBack();
    };


    componentWillReceiveProps(nextProps, nextState) {
        if (!shallowEqual(nextProps.modal, this.props.modal)) {
            this.setState({
                txtName_branch: nextProps.modal.name,
                txtPhone_branch: nextProps.modal.phone_number,
                txtEmail_branch: nextProps.modal.email,
                txtAddress_detail: nextProps.modal.address,
                idCustomer: nextProps.modal.id,
                txtSex:nextProps.modal.sex,
                txtDateOfBirth:nextProps.modal.date_of_birth && nextProps.modal.date_of_birth != "0000-00-00 00:00:00" ? moment(nextProps.modal.date_of_birth).format("DD-MM-YYYY") : ""
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

        if(this.props.openModalEdit == true)
        {
            this.setState({
                provinceName: "",
                districtName: "",
                wardsName: "",
                txtAddress_detail: "",
                isLoaded: false,
                txtName_branch:"",
                txtPhone_branch:"",
                txtEmail_branch:""
            })
            this.props.resetModalEdit()
        }
    }
    handleOnClick = () => {
        var { txtAddress_detail,txtSex, txtName_branch, txtPhone_branch, txtEmail_branch, idCustomer,txtDateOfBirth } = this.state
        const { store_code , modal} = this.props
        const Formdata = {
            ...modal,
            name: txtName_branch,
            phone_number: txtPhone_branch,
            email: txtEmail_branch,
            address: txtAddress_detail,
            date_of_birth: moment(txtDateOfBirth, "DD-MM-YYYY").format("YYYY-MM-DD HH:mm:ss"),
            sex: txtSex

        }
        console.log("Formdata", Formdata)
        this.props.editCustomer(store_code, idCustomer, Formdata ,function(){
            window.$(".modal").modal("hide");
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

    onChangeDate = (e) => {
        // var time = moment(e, "DD-MM-YYYY").format("DD-MM-YYYY");
        this.setState({
          txtDateOfBirth: e,
        });
      };
      onChangeGender = (e) => {
        var target = e.target;
        var name = target.name;
        var value = target.value;
    
        this.setState({
          [name]: value,
        });
      }

    render() {
        var { txtAddress_detail} = this.state;
        var { txtName_branch, txtPhone_branch,txtEmail_branch,txtSex,txtDateOfBirth  } = this.state;

        var isMale = txtSex == "1" ? true : false
        var isFemail = txtSex == "2" ? true : false
        var isAnother = txtSex == "0" ? true : false

        return (
            <>
                {this.state.status &&
                    <div class="alert alert-danger alert-dismissible" style={{ position: "fixed", top: "10px" }} >
                        <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
                        <strong>Chưa nhập đủ thông tin địa chỉ</strong>
                    </div>}


                <div class="modal" id="modalEditCustomer">
                    <div class="modal-dialog">
                        <div class="modal-content">
                        <div class="modal-header" style={{ backgroundColor: themeData().backgroundColor }}>

<h4 style={{ color: "white" }}>Chỉnh sửa khách hàng</h4>
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
                                                    // renderInput={(props) => {
                                                    //     return <input {...props} value={txtDateOfBirth} />
                                                    // }}
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

                                <div class="modal-footer">
                                    <button
                                        type="button"
                                        class="btn btn-default"
                                        data-dismiss="modal"
                                    >
                                        Đóng
                                    </button>
                                    <button type="submit" onClick={this.handleOnClick} class="btn btn-warning">
                                        Sửa
                                    </button>
                                </div>
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
        editCustomer: (store_code, id, form , funcModal) => {
            dispatch(customerAction.editCustomerSale(store_code, id, form,funcModal));
        },
    }
}

export default connect(null, mapDispatchToProps)(ModalEdit)