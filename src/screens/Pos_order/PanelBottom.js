import React, { Component } from "react";
import { connect } from "react-redux";
import * as Types from "../../constants/ActionType"

import CardProduct from "../../components/Pos_Order/CardProduct";
import Pagination from '../../components/Pos_Order/Pagination'
import * as placeAction from "../../actions/place";
import { shallowEqual } from "../../ultis/shallowEqual";

class PanelBottom extends Component {

    constructor(props) {
        super(props)


        this.state = {
            selectedDate: '2015-07-20',
            listWards: [],
            listDistrict: [],
            txtProvince: "",
            txtDistrict: "",
            txtWards: "",
        }

    }
    componentDidMount() {
        this.props.fetchPlaceProvince()
    }
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

    onChangeWards = (e) => {
        this.setState({ txtWards: e.target.value, isLoaded: true })
        var indexWards = this.props.wards.map(e => e.id).indexOf(parseInt(e.target.value))
        if (indexWards !== -1) {
            var nameWards = this.props.wards[indexWards].name
            this.setState({ wardsName: nameWards })
        }
    }

    onChangeProvince = (e) => {
        if (this.state.txtProvince != e.target.value) {
            this.setState({ txtProvince: e.target.value, isLoaded: true })
            this.props.fetchPlaceDistrict(e.target.value);
            var indexProvince = this.props.province.map(e => e.id).indexOf(parseInt(e.target.value))
            if (indexProvince !== -1) {
                var nameProvince = this.props.province[indexProvince].name
                this.setState({
                    provinceName: nameProvince,
                    listWards: [],
                    txtDistrict: ""
                })
            }

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
        if (!shallowEqual(this.props.district, nextProps.district)) {
            this.setState({
                listDistrict: nextProps.district
            })
        }

        if (!shallowEqual(nextProps.wards, this.props.wards)) {
            this.setState({
                listWards: nextProps.wards,
            })
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

    buildTabCustomer = () => {

        var { province } = this.props

        var { txtAddressDetail, txtProvince, txtDistrict, txtWards, listDistrict, listWards, txtEmail, txtEmail, txtPhoneNumber, txtName } = this.state;

        return <div style={{
            padding: 20
        }}>
            <div class="row">
                <div class="col-md-4 col-6">
                    <div class="input-group mb-2">
                        <div class="input-group-prepend">
                            <span class="input-group-text px-2" title="Điện thoại (F4)">
                                <i class="fa fa-solid fa-phone"></i>
                            </span>
                        </div>
                        <input type="text" class="form-control customerInfo"
                            placeholder="Điện thoại (F4)" data-startsuggest="6" id="customerMobile"
                            value={txtPhoneNumber || ""}
                            onChange={this.onChange}
                            name="txtPhoneNumber"
                            autocomplete="new-password" />
                        <div class="bootstrap-autocomplete dropdown-menu"

                            style={{
                                top: 37.5312,
                                left: 37,
                                width: 160.688
                            }}

                        ><a class="dropdown-item active"

                            style={{
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                            }}

                        >hjkhjk&nbsp;<b>0868917689</b>)</a></div>
                    </div>
                    <div class="input-group mb-2">
                        <div class="input-group-prepend">
                            <span class="input-group-text px-2" title="Họ tên">
                                <i class="fa fa-user-o" aria-hidden="true"></i>
                            </span>
                        </div>
                        <input
                            value={txtName || ""}
                            onChange={this.onChange}
                            name="txtName"
                            type="text" class="form-control customerInfo" id="customerName" placeholder="Tên khách" autocomplete="new-password" />
                    </div>

                    <div class="input-group mb-2">
                        <div class="input-group-prepend">
                            <span class="input-group-text px-2" title="Email">
                                <i class="fa fa-envelope-o" aria-hidden="true"></i>
                            </span>
                        </div>
                        <input

                            value={txtEmail || ""}
                            onChange={this.onChange}
                            name="txtEmail"
                            type="text" class="form-control customerInfo" id="customerName" placeholder="Email" autocomplete="new-password" />
                    </div>


                </div>
                <div class="col-md-3 col-6">
                    <div class="input-group mb-2">
                        <div class="input-group-prepend">
                            <span class="input-group-text px-2" title="Thành phố">
                                <i class="fa fa-map-marker" aria-hidden="true"></i>
                            </span>
                        </div>

                        <select class="form-control select-has-search-box select2-hidden-accessible"
                            id="customerCityLocationId"
                            value={txtProvince || ""}
                            onChange={this.onChangeProvince}
                            name="txtProvince"
                            tabindex="-1" aria-hidden="true"
                            data-select2-id="customerCityLocationId">
                            <option value="" data-select2-id="71">- Thành phố -</option>
                            {this.showProvince(province)}
                        </select>


                    </div>
                    <div class="input-group mb-2">
                        <div class="input-group-prepend">
                            <span class="input-group-text px-2" title="Quận huyện">
                                <i class="fa fa-map-marker" aria-hidden="true"></i>
                            </span>
                        </div>
                        <select class="form-control select-has-search-box customerInfo select2-hidden-accessible"
                            value={txtDistrict || ""}
                            onChange={this.onChangeDistrict}
                            name="txtDistrict"
                            id="customerDistrictLocationId"
                            tabindex="-1" aria-hidden="true" data-select2-id="customerDistrictLocationId">
                            <option value="">- Quận huyện -</option><option value="370">Quận Hải Châu</option>
                            {this.showDistrict(listDistrict)}

                        </select>

                    </div>
                    <div class="input-group mb-2">
                        <div class="input-group-prepend">
                            <span class="input-group-text px-2" title="Phường xã">
                                <i class="fa fa-map-marker" aria-hidden="true"></i>
                            </span>
                        </div>
                        <select
                            value={txtWards || ""}
                            onChange={this.onChangeWards}
                            name="txtWards"
                            class="form-control select-has-search-box customerInfo select2-hidden-accessible" id="customerWardLocationId" tabindex="-1"
                            aria-hidden="true" data-select2-id="customerWardLocationId">
                            <option value="">- Phường xã -</option><option value="7908">Phường Tam Thuận</option>
                            {this.showWards(listWards)}

                        </select>


                    </div>

                </div>
                <div class="col-md-3 col-6">
                    <div class="input-group mb-2">
                        <select class="form-control customerInfo px-1" id="customerGender">
                            <option value="">- Giới tính -</option>
                            <option value="1">Nam</option>
                            <option value="2">Nữ</option>
                            <option value="3">Khác</option>
                        </select>



                        <input data-minyear="1920" type="text" placeholder="Ngày sinh" class="tbDatePicker form-control customerInfo px-1" id="customerBirthday"
                            autocomplete="new-password" />
                    </div>
                    {/* <div class="input-group mb-2">
                        <input type="text" class="form-control customerInfo p-1" title="Email" placeholder="Email" id="customerEmail" autocomplete="new-password" />
                        <input type="text" class="form-control customerInfo p-1" title="Facebook" placeholder="Facebook" id="customerFacebookLink" autocomplete="new-password" />
                    </div> */}

                    <div class="input-group mb-2">
                        <div class="input-group-prepend">
                            <span class="input-group-text px-2" title="Địa chỉ">
                                <i class="fa fa-home"></i>
                            </span>
                        </div>
                        <textarea rows="3"
                            value={txtAddressDetail || ""}
                            onChange={this.onChange}
                            name="txtAddressDetail"
                            class="form-control txtAutoHeight customerInfo" placeholder="Địa chỉ" id="customerAddress"></textarea>
                    </div>

                </div>
                <div class="col-md-2 col-6">

                    <button id="btnSaveCustomer" class="btn btn-yes-pos mt-2 mb-md-0 mb-2"> <i class="fa fa-user-o" aria-hidden="true"></i> Lưu thông tin</button>
                </div>
            </div>
        </div>
    }

    render() {
        var limit, passNumPage, store_code, products = this.props



        return (
            <div className="panel-bottom">



                <ul class="nav nav-tabs" id="myTab" role="tablist">
                    <li class="nav-item">
                        <a class="nav-link" id="tab-javascript" data-toggle="tab"
                            href="#content-javascript"
                            role="tab" aria-controls="content-javascript" aria-selected="false">
                            Danh sách sản phẩm
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" id="tab-css" data-toggle="tab"
                            href="#content-css"
                            role="tab" aria-controls="content-css" aria-selected="false">
                            Khách hàng
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link active " id="tab-bootstrap" data-toggle="tab"
                            href="#content-bootstrap"
                            role="tab" aria-controls="content-bootstrap" aria-selected="true">
                            Combo đang diễn ra
                        </a>
                    </li>
                </ul>

                <div class="tab-content" id="myTabContent">
                    <div class="tab-pane fade" id="content-javascript"
                        role="tabpanel" aria-labelledby="tab-javascript">


                        <div className='col-list-product' style={{ borderRadius: "0", display: "flex", flexDirection: "column" }}>
                            <div className='card-pos-body' style={{ overflow: "hidden" }}>

                                <CardProduct
                                    store_code={store_code}
                                    handleCallbackProduct={this.props.handleCallbackProduct}
                                    handleCallbackPushProduct={this.props.handleCallbackPushProduct}
                                />
                            </div>
                            <div className='wrap-pagination'>
                                <Pagination limit={limit}
                                    passNumPage={passNumPage} store_code={store_code} products={products} />
                            </div>
                        </div>

                    </div>
                    <div class="tab-pane fade" id="content-css"
                        role="tabpanel" aria-labelledby="tab-css">
                        {this.buildTabCustomer()}
                    </div>
                    <div class="tab-pane fade show active" id="content-bootstrap"
                        role="tabpanel" aria-labelledby="tab-bootstrap">
                        Bootstrap is a free front-end framework for faster and easier web development...
                    </div>
                </div>


            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        wards: state.placeReducers.wards,
        province: state.placeReducers.province,
        district: state.placeReducers.district
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PanelBottom)