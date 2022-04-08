import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as dashboardAction from "../../actions/dashboard";
import * as placeAction from "../../actions/place";
import { shallowEqual } from '../../ultis/shallowEqual';

class ModalEdit extends Component {
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
            txtCode_branch: "",
            txtPost_branch: "",
            txtEmail_branch: ""
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

    handleChangeCheckBox = (event) => {
        this.setState({
          [event.target.id]: event.target.checked
        });
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
        if (!shallowEqual(nextProps.modal, this.props.modal)) {
            this.props.fetchPlaceDistrict(nextProps.modal.province);
            this.props.fetchPlaceWards(nextProps.modal.district)

            this.setState({
                id: nextProps.modal.id,
                txtName_branch: nextProps.modal.name,
                txtPhone_branch: nextProps.modal.phone,
                txtEmail_branch: nextProps.modal.email,
                txtCode_branch: nextProps.modal.branch_code,
                txtProvince: nextProps.modal.province,
                txtDistrict: nextProps.modal.district,
                txtWards: nextProps.modal.wards,
                txtAddress_detail: nextProps.modal.address_detail,
                txtPost_branch: nextProps.modal.postcode,
                is_default: nextProps.modal.is_default,
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
    handleOnClick = () => {
        var { txtAddress_detail, txtDistrict, txtProvince, txtWards, txtName_branch, txtPhone_branch, txtCode_branch, txtPost_branch, txtEmail_branch } = this.state
        const { store_code } = this.props
        const Formdata = {
            name: txtName_branch,
            phone: txtPhone_branch,
            email: txtEmail_branch,
            branch_code: txtCode_branch,
            province: txtProvince,
            district: txtDistrict,
            wards: txtWards,
            address_detail: txtAddress_detail,
            postcode: txtPost_branch,
            is_default: true
        }
        this.props.updateBranchStore(store_code, Formdata, this.state.id);
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
        })

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
        var { province } = this.props
        var { txtAddress_detail, txtProvince, txtDistrict, txtWards, listDistrict, listWards } = this.state;
        var { txtName_branch, txtPhone_branch, txtCode_branch, txtPost_branch, txtEmail_branch } = this.state;
        return (
            <>
                {this.state.status &&
                    <div class="alert alert-danger alert-dismissible" style={{ position: "fixed", top: "10px" }} >
                        <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
                        <strong>Chưa nhập đủ thông tin địa chỉ</strong>
                    </div>}


                <div class="modal" id="modalEdit">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                            <div className='model-header-modal' style={{ display: 'flex', justifyContent: "space-between", margin: "10px 15px" }}>
                                <p class="" style={{ margin: "0px", fontWeight: "bold" }}>Chỉnh sửa chi nhánh</p>
                                <button type="button" class="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div class="modal-body">
                                <React.Fragment>
                                    <form role="form" >
                                        <div className='row'>
                                            <div className='col-6 box-body-left'>
                                                <div class="form-group">
                                                    <label for="product_name">Tên chi nhánh</label>
                                                    <input
                                                        type="text"
                                                        class="form-control"
                                                        id="txtName_branch"
                                                        placeholder="Nhập tên chi nhánh"
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
                                                <div class="form-group">
                                                    <label for="product_name">Mã chi nhánh</label>
                                                    <input
                                                        type="text"
                                                        class="form-control"
                                                        id="txtCode_branch"
                                                        placeholder="Nhập mã chi nhánh"
                                                        autocomplete="off"
                                                        value={txtCode_branch || ""}
                                                        onChange={this.onChange}
                                                        name="txtCode_branch"
                                                    />
                                                </div>
                                                <div class="form-group">
                                                    <label for="product_name">Mã bưu điện</label>
                                                    <input
                                                        type="text"
                                                        class="form-control"
                                                        id="txtPost_branch"
                                                        placeholder="Nhập mã bưu điện"
                                                        autocomplete="off"
                                                        value={txtPost_branch || ""}
                                                        onChange={this.onChange}
                                                        name="txtPost_branch"
                                                    />
                                                </div>

                                            </div>
                                            <div class="col-6 box-body-right">
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
                                                        <option value="">-- Chọn tỉnh --</option>
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
                                                        <option value="">-- Chọn quận --</option>
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
                                                        <option value="">-- Chọn phường --</option>
                                                        {this.showWards(listWards)}

                                                    </select>
                                                </div>
                                                <div class="form-group">
                                                    <label class="form-check-label" style={{ marginLeft: "20px", marginTop: "30px" }}>
                                                        <input type="checkbox" class="form-check-input"
                                                            name="is_default"
                                                            id="is_default"
                                                            checked={this.state.is_default}
                                                            onChange={this.handleChangeCheckBox} value="" />Chi nhánh mặc định
                                                    </label>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="box-footer">
                                            <a class="btn btn-info btn-icon-split btn-sm" onClick={this.handleOnClick} data-dismiss="modal">
                                                <span class="icon text-white-50">
                                                    <i class="fas fa-save"></i>
                                                </span>
                                                <span class="text">Sửa</span>
                                            </a>
                                        </div>
                                    </form>
                                </React.Fragment>
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
        createBranchStore: (id, form) => {
            dispatch(dashboardAction.createBranchStore(id, form));
        },
        updateBranchStore: (store_code, form, id) => {
            dispatch(dashboardAction.updateBranchStore(store_code, form, id));
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
    }
}

export default connect(null, mapDispatchToProps)(ModalEdit)