import React, { Component } from "react";
import { connect } from "react-redux";
import DatePicker from "react-datepicker";
import CardProduct from "../../components/Pos_Order/CardProduct";
import Pagination from '../../components/Pos_Order/Pagination'
import Dropdown from './component/Dropdown'
import * as placeAction from "../../actions/place";
import { shallowEqual } from "../../ultis/shallowEqual";
import * as dashboardAction from "../../actions/customer";
import { getDDMMYYYDate } from "../../ultis/date";
import * as OrderAction from '../../actions/add_order';
import { format } from '../../ultis/helpers'
import Autocomplete from 'react-autocomplete';
import AutoCompleteText from "./AutoCompleteText";
import * as customerAction from "../../actions/customer";
import Select, { OnChangeValue, StylesConfig } from 'react-select';
import { debounce } from 'lodash'

class PanelBottom extends Component {

    constructor(props) {
        super(props)


        this.state = {
            isDisabledButton: false,
            isOpenProvince: false,
            isOpenDistrict: false,
            startDate: new Date(),
            selectedDate: null,
            listWards: [],
            listDistrict: [],
            txtProvince: "",
            txtDistrict: "",
            txtWards: "",
            txtName: "",
            txtEmail: ""
        }

        this.onChangeNum = debounce(this.handleChangeNum, 0)
        this.onSearchCustomer = debounce(this.handleSearchCustomer, 500)

    }


    componentDidMount() {
        this.props.fetchPlaceProvince()
        this.props.fetchAllCombo(this.props.store_code)
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

    optionsProvince = (places) => {
        var list = []
        if (places.length > 0) {
            list = places.map((data, index) => {
                return { value: data, label: data.name }
            })
        }
        return list
    }

    optionsWards = (places) => {
        var list = []
        if (places.length > 0) {
            list = places.map((data, index) => {
                return { value: data, label: data.name }
            })
        }
        return list
    }

    optionsDistrict = (places) => {
        var list = []
        if (places.length > 0) {
            list = places.map((data, index) => {
                return { value: data, label: data.name }
            })
        }
        return list

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

    onChangeSex = (e) => {
        this.setState({ txtSex: e.target.value })
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
    onChangeProvince2 = (selectValue) => {

        this.toggleOpenProvince();

        if (selectValue != null && selectValue.value != null) {
            var data = selectValue.value
            this.setState({ txtProvince: data.id, isLoaded: true })
            this.onSelectChangeProvinceById(data.id)

            this.props.fetchPlaceDistrict(data.id);


            this.toggleOpenDistrict();

        }
    }
    onChangeDistrict2 = (selectValue) => {

        this.toggleOpenDistrict();

        if (selectValue != null && selectValue.value != null) {
            var data = selectValue.value
            this.setState({ txtWards: data.id, isLoaded: true })
            this.onSelectChangeDistrictById(data.id)

            this.props.fetchPlaceWards(data.id);


            this.toggleOpenWards();

        }
    }
    onChangeWards2 = (selectValue) => {

        this.toggleOpenWards();

        if (selectValue != null && selectValue.value != null) {
            var data = selectValue.value

            this.setState({ txtWards: data.id, isLoaded: true })
            this.onSelectChangeWardsById(data.id)


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

    componentWillUpdate(nextProps, nextState) {

        this.props.onNewChange(nextState)
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

        if (!shallowEqual(nextProps.oneCart, this.props.oneCart)) {


            if (nextProps.oneCart.province != null) {
                this.props.fetchPlaceDistrict(nextProps.oneCart.province);
            }
            if (nextProps.oneCart.district != null) {
                this.props.fetchPlaceDistrict_Wards(nextProps.oneCart.district)
            }

            const customer = nextProps.oneCart?.customer
            const oneCart = nextProps.oneCart

            this.setState(
                {
                    ...this.state,
                    cartId: oneCart.id,
                }
            )

            if (oneCart.noUpdateUI != true) {

                this.setState(
                    {
                        ...this.state,
                        cartId: oneCart.id,
                        txtProvince: oneCart.province ?? "",
                        txtDistrict: oneCart.district ?? "",
                        txtWards: oneCart.wards ?? "",
                        txtName: oneCart.customer_name ?? "",
                        txtEmail: oneCart.customer_email ?? "",
                        txtPhoneNumber: oneCart.customer_phone ?? "",
                        txtSex: oneCart.customer_sex ?? "",
                        txtAddressDetail: oneCart.address_detail ?? "",
                        selectedDate: oneCart == null || oneCart.customer_date_of_birth == null ? "" : new Date(oneCart.customer_date_of_birth),
                        isDisabledButton: oneCart == null || oneCart.customer == null ? false : oneCart.customer.is_passersby,

                        districtName: oneCart.district_name,
                        wardsName: oneCart.wards_name,
                        provinceName: oneCart.province_name,
                        valueProvince: {
                            label: oneCart.province_name,
                            value: oneCart.province
                        },

                        valueDistrict: {
                            label: oneCart.district_name,
                            value: oneCart.district
                        },

                        valueWards: {
                            label: oneCart.wards_name,
                            value: oneCart.wards
                        },
                    }
                )
            }


            // this.onSelectChangeProvinceById(customer.province)
            // this.onSelectChangeDistrictById(customer.district)
            // this.onSelectChangeWardsById(customer.wards)

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

    handleChangeNum = (p) => {
        this.setState({
            txtPhoneNumber: p,
        });
    }

    onSaveCustomer = () => {

        var { provinceName, isOpenProvince, txtAddressDetail, isDisabledButton, selectedDate, txtSex, txtProvince, txtDistrict, txtWards, listDistrict, listWards, txtEmail, txtEmail, txtPhoneNumber, txtName } = this.state;

        var { store_code } = this.props
        this.props.createCustomer(store_code, {
            name: txtName,
            phone_number: txtPhoneNumber,
            email: txtEmail,
            address_detail: txtAddressDetail,
            province: txtProvince,
            district: txtDistrict,
            wards: txtWards,
            sex: txtSex,
            isFromPosAndSave: true,
            date_of_birth: selectedDate
        })
    }

    setStartDate = (date) => {
        this.setState({
            selectedDate: date
        })
    }

    getListYear = () => {

        var list = [];
        var maxYear = (new Date()).getFullYear()

        for (var i = 1922; i < maxYear; i++) {

            list.push(i)
        }
        return list

    }


    changeYear = (year) => {
        var date = null;
        if (this.state.selectedDate == null || this.state.selectedDate == "") {
            var date = new Date()
            date.setFullYear(year);
        } else {
            var date = this.state.selectedDate
            date.setFullYear(year);
        }

        this.setState({
            selectedDate: date
        })

    }

    changeMonth = (month) => {
        var date = null;
        if (this.state.selectedDate == null || this.state.selectedDate == "") {
            var date = new Date()
            date.setMonth(month);
        } else {
            var date = this.state.selectedDate
            date.setMonth(month);
        }

        this.setState({
            selectedDate: date
        })

    }

    handleSearchCustomer = (va) => {
        var { store_code } = this.props;
        var params = `&search=${va}`;
        this.props.fetchAllCustomer(store_code, 1, params);
    }

    onSeletedCustomer = (cus) => {
        this.setState(
            {
                ...this.state,
                txtProvince: cus.province ?? "",
                txtDistrict: cus.district ?? "",
                txtWards: cus.wards ?? ""
                ,
                txtName: cus.name ?? "",
                txtEmail: cus.email ?? "",
                txtPhoneNumber: cus.phone_number ?? "",

                txtSex: cus.sex ?? "",
                txtAddressDetail: cus.address_detail ?? "",
                selectedDate: cus == null || cus.customer_date_of_birth == null ? "" : new Date(cus.customer_date_of_birth),
                isDisabledButton: cus == null ? false : cus.is_passersby,

                districtName: cus.district_name,
                wardsName: cus.wards_name,
                provinceName: cus.province_name,
                valueProvince: {
                    label: cus.province_name,
                    value: cus.province
                },

                valueDistrict: {
                    label: cus.district_name,
                    value: cus.district
                },

                valueWards: {
                    label: cus.wards_name,
                    value: cus.wards
                },
            }
        )
    }


    toggleOpenProvince = () => {

        this.setState((state) => ({ isOpenProvince: !state.isOpenProvince }));
    };
    toggleOpenDistrict = () => {

        this.setState((state) => ({ isOpenDistrict: !state.isOpenDistrict }));
    };
    toggleOpenWards = () => {
        this.setState((state) => ({ isOpenWards: !state.isOpenWards }));
    };


    onSelectChangeProvinceById = (idProvince, list = null) => {

        var pro = (list ?? this.props.province).find((ele) => ele.id == idProvince)

        if (pro != null) {
            this.setState({
                valueProvince: {
                    label: pro.name,
                    value: pro
                },
                provinceName: pro.name,
                txtProvince: pro.id,
                listWards: [],
                listDistrict: [],
                txtDistrict: "",
                txtWards: "",
                districtName: "",
                wardsName: "",

            });
        }

    };

    onSelectChangeDistrictById = (idDistrict, list = null) => {

        var pro = (list ?? this.props.district).find((ele) => ele.id == idDistrict)

        if (pro != null) {
            this.setState({
                valueDistrict: {
                    label: pro.name,
                    value: pro
                },
                districtName: pro.name,
                txtDistrict: pro.id,
                listWards: [],
                wardsName: "",
                txtWards: "",
            });
        }

    };

    onSelectChangeWardsById = (idWards, list = null) => {

        var pro = (list ?? this.props.wards).find((ele) => ele.id == idWards)


        if (pro != null) {
            this.setState({
                valueWards: {
                    label: pro.name,
                    value: pro
                },
                wardsName: pro.name,
                txtWards: pro.id,
            });
        }

    };



    buildTabCustomer = () => {

        var { province } = this.props

        var { valueProvince, valueDistrict, valueWards, isOpenProvince,
            isOpenDistrict,
            isOpenWards,
            isDisabledButton, provinceName,
            districtName, wardsName,
            selectedDate, txtAddressDetail,
            txtSex, txtProvince, txtDistrict,
            txtWards, listDistrict, listWards,
            txtEmail, txtEmail, txtPhoneNumber, txtName } = this.state;


        // const ExampleCustomTimeInput = ({ date, value, onChange }) => (
        //     <input value={value} type="text" placeholder="Ngày sinh" class="tbDatePicker form-control customerInfo px-1" id="customerBirthday"
        //         autocomplete="new-password" />
        // );

        const ExampleCustomInput = React.forwardRef(({ value, onClick }, ref) => {
            if (this.state.selectedDate == null || this.state.selectedDate == "") { value = "Ngày sinh" } else {
                value = getDDMMYYYDate(this.state.selectedDate)
            }
            return (
                <button disabled={isDisabledButton} className="tbDatePicker form-control customerInfo px-1 day-of-birth-pos" style={{
                    width: "50px !important"
                }} onClick={onClick} ref={ref}>
                    {value}
                </button>
            )
        });

        const years = this.getListYear();
        const months = [
            "Tháng 1",
            "Tháng 2",
            "Tháng 3",
            "Tháng 4",
            "Tháng 5",
            "Tháng 6",
            "Tháng 7",
            "Tháng 8",
            "Tháng 9",
            "Tháng 10",
            "Tháng 11",
            "Tháng 12",
        ];

        const customStylesProvince = {
            control: (provided) => ({
                ...provided,
                minWidth: document.getElementById('customerProvinceId') == null ? 150 : document.getElementById('customerProvinceId').offsetWidth,
                zIndex: 4,
                top: -9
            }),
            // menu: (provided) => ({ 
            //     ...provided,
            //     top:-88
            //  }),

        }

        return <div style={{
            padding: 20
        }}>
            <div class="row">
                <div class="col-md-4 col-6">



                    <AutoCompleteText type="text" class="form-control customerInfo"
                        placeholder="Điện thoại (F4)" data-startsuggest="6" id="customerMobile"
                        value={txtPhoneNumber || ""}
                        onChange={this.onChangeNum}
                        name="txtPhoneNumber"
                        onSearch={this.onSearchCustomer}
                        icon="fa fa-solid fa-phone"
                        items={this.props.customers?.data ?? []}
                        onSelected={this.onSeletedCustomer}
                        disabled={isDisabledButton}
                        autocomplete="new-password" />



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
                            disabled={isDisabledButton}
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
                            disabled={isDisabledButton}
                            type="text" class="form-control customerInfo" id="customerName" placeholder="Email" autocomplete="new-password" />
                    </div>


                </div>
                <div class="col-md-3 col-6">


                    <Dropdown
                        menuPlacement="top"
                        isOpen={isOpenProvince}
                        onClose={this.toggleOpenProvince}
                        target={
                            <div class="input-group mb-2"

                                id="customerProvinceId"

                                onClick={() => {
                                    this.toggleOpenProvince();
                                }}
                            >
                                <div class="input-group-prepend">
                                    <span class="input-group-text px-2" title="Thành phố">
                                        <i class="fa fa-map-marker" aria-hidden="true"></i>
                                    </span>
                                </div>

                                <select
                                    style={{
                                        background: isDisabledButton ? "#eaecf4" : "white"
                                    }}
                                    onClick={() => {
                                        this.toggleOpenProvince();
                                    }}
                                    disabled={true}
                                    value={""}
                                    class="form-control select-has-search-box select2-hidden-accessible"
                                    onChange={this.onChangeProvince2}
                                    name="txtProvince"
                                    tabindex="-1" aria-hidden="true"
                                    data-select2-id="customerCityLocationId">
                                    <option value="" data-select2-id="71">{provinceName == "" || provinceName == null ? "- Tỉnh Thành phố -" : provinceName}</option>
                                    {/* {this.showProvince(province)} */}
                                </select>

                            </div>
                        }
                    ><Select
                            ref={(ref) => {
                                this.refSearchProvince = ref;
                            }}
                            autoFocus
                            menuPlacement="top"
                            backspaceRemovesValue={false}
                            //    components={{ DropdownIndicator, IndicatorSeparator: null }}
                            controlShouldRenderValue={false}
                            hideSelectedOptions={false}
                            isClearable={false}
                            menuIsOpen
                            onChange={this.onChangeProvince2}
                            options={this.optionsProvince(province)}
                            placeholder="Tìm kiếm..."
                            noOptionsMessage={() => 'Không tìm thấy kết quả'}
                            styles={customStylesProvince}
                            tabSelectsValue={false}
                            value={valueProvince}
                        />
                    </Dropdown>


                    <Dropdown
                        menuPlacement="top"
                        isOpen={isOpenDistrict}
                        onClose={this.toggleOpenDistrict}
                        target={
                            <div class="input-group mb-2" onClick={() => {
                                this.toggleOpenDistrict();
                            }}>
                                <div class="input-group-prepend">
                                    <span class="input-group-text px-2" title="Quận huyện">
                                        <i class="fa fa-map-marker" aria-hidden="true"></i>
                                    </span>
                                </div>
                                <select class="form-control select-has-search-box customerInfo select2-hidden-accessible"
                                    style={{
                                        background: isDisabledButton ? "#eaecf4" : "white"
                                    }}
                                    onClick={() => {
                                        this.toggleOpenDistrict();
                                    }}
                                    disabled={true}
                                    value={""}
                                    onChange={this.onChangeDistrict2}
                                    name="txtDistrict"
                                    id="customerDistrictLocationId"
                                    tabindex="-1" aria-hidden="true" data-select2-id="customerDistrictLocationId">
                                    <option value=""> {districtName == null || districtName == "" ? "- Quận huyện -" : districtName}</option>
                                    {/* {this.showDistrict(listDistrict)} */}

                                </select>

                            </div>
                        }
                    ><Select
                            ref={(ref) => {
                                this.refSearchDistrict = ref;
                            }}
                            autoFocus
                            menuPlacement="top"
                            backspaceRemovesValue={false}
                            //    components={{ DropdownIndicator, IndicatorSeparator: null }}
                            controlShouldRenderValue={false}
                            hideSelectedOptions={false}
                            isClearable={false}
                            menuIsOpen
                            onChange={this.onChangeDistrict2}
                            options={this.optionsDistrict(listDistrict)}
                            placeholder="Tìm kiếm..."
                            noOptionsMessage={() => 'Không tìm thấy kết quả'}
                            styles={customStylesProvince}
                            tabSelectsValue={false}
                            value={valueDistrict}
                        />
                    </Dropdown>


                    <Dropdown
                        menuPlacement="top"
                        isOpen={isOpenWards}
                        onClose={this.toggleOpenWards}
                        target={
                            <div class="input-group mb-2" onClick={() => {
                                this.toggleOpenWards();
                            }}>
                                <div class="input-group-prepend">
                                    <span class="input-group-text px-2" title="Phường xã">
                                        <i class="fa fa-map-marker" aria-hidden="true"></i>
                                    </span>
                                </div>
                                <select
                                    style={{
                                        background: isDisabledButton ? "#eaecf4" : "white"
                                    }}
                                    onClick={() => {
                                        this.toggleOpenWards();
                                    }}
                                    disabled={true}
                                    value={""}
                                    onChange={this.onChangeWards2}
                                    name="txtWards"
                                    class="form-control select-has-search-box customerInfo select2-hidden-accessible" id="customerWardLocationId" tabindex="-1"
                                    aria-hidden="true" data-select2-id="customerWardLocationId">
                                    <option value="">{wardsName == null || wardsName == "" ? "- Phường xã -" : wardsName}</option>
                                    {/* {this.showWards(listWards)} */}

                                </select>


                            </div>
                        }
                    ><Select
                            ref={(ref) => {
                                this.refSearchWards = ref;
                            }}
                            autoFocus
                            menuPlacement="top"
                            backspaceRemovesValue={false}
                            //    components={{ DropdownIndicator, IndicatorSeparator: null }}
                            controlShouldRenderValue={false}
                            hideSelectedOptions={false}
                            isClearable={false}
                            menuIsOpen
                            onChange={this.onChangeWards2}
                            options={this.optionsWards(listWards)}
                            placeholder="Tìm kiếm..."
                            noOptionsMessage={() => 'Không tìm thấy kết quả'}
                            styles={customStylesProvince}
                            tabSelectsValue={false}
                            value={valueWards}
                        />
                    </Dropdown>
                </div>

                <div class="col-md-3 col-6">
                    <div class="input-group mb-2">
                        <select
                            disabled={isDisabledButton}
                            value={txtSex || ""}
                            onChange={this.onChangeSex}
                            name="txtSex"
                            class="form-control customerInfo px-1" id="customerGender">
                            <option value="" disabled>- Giới tính -</option>
                            <option value="1">Nam</option>
                            <option value="2">Nữ</option>
                            <option value="0">Khác</option>
                        </select>


                        <div className="day-of-birth-pos">
                            <DatePicker

                                customInput={<ExampleCustomInput />}
                                placeholderText="Ngày sinh"
                                renderCustomHeader={({
                                    date,
                                    changeYear,
                                    changeMonth,
                                    decreaseMonth,
                                    increaseMonth,
                                    prevMonthButtonDisabled,
                                    nextMonthButtonDisabled,
                                }) => (
                                    <div
                                        style={{
                                            margin: 10,
                                            display: "flex",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
                                            {"<"}
                                        </button>
                                        <select
                                            value={(selectedDate == null || this.state.selectedDate == "" ? (new Date()).getFullYear() : selectedDate.getFullYear())}
                                            onChange={({ target: { value } }) => {
                                                changeYear(value)
                                                this.changeYear(value)
                                            }}
                                        >
                                            {years.map((option) => (
                                                <option key={option} value={option}>
                                                    {option}
                                                </option>
                                            ))}
                                        </select>

                                        <select
                                            value={months[(selectedDate == null || this.state.selectedDate == "" ? (new Date()).getMonth() : selectedDate.getMonth())]}
                                            onChange={({ target: { value } }) => {
                                                changeMonth(months.indexOf(value))
                                                this.changeMonth(months.indexOf(value))
                                            }
                                            }
                                        >
                                            {months.map((option) => (
                                                <option key={option} value={option}>
                                                    {option}
                                                </option>
                                            ))}
                                        </select>

                                        <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
                                            {">"}
                                        </button>
                                    </div>
                                )}
                                selected={selectedDate == null || this.state.selectedDate == "" ? null : selectedDate}
                                onChange={(date) => this.setStartDate(date)}
                            />
                        </div>



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
                            disabled={isDisabledButton}
                            value={txtAddressDetail || ""}
                            onChange={this.onChange}
                            name="txtAddressDetail"
                            class="form-control txtAutoHeight customerInfo" placeholder="Địa chỉ chi tiết" id="customerAddress"></textarea>
                    </div>

                </div>
                <div class="col-md-2 col-6">
                    <button id="btnSaveCustomer"
                        onClick={this.onSaveCustomer}
                        class="btn btn-yes-pos"> <i class="fa fa-user-o" aria-hidden="true"></i> Lưu thông tin</button>
                </div>
            </div>
        </div >
    }

    buildTabCombo = () => {
        var { listCombo } = this.props

        return <div style={{
            overflowX: "scroll"
        }}>

            {(listCombo ?? []).map((item, index) => (
                <>
                    <div className='row' key={index} style={{ borderRadios: "0.25em", border: "dashed 2px red", margin: "5px" }}>


                        <div>

                            <div style={{
                                backgroundColor: "#cc3c4c", color: "white", justifyContent: "center", height: "100%", borderRadius: "0.25em",
                                display: "flex", alignItems: "center"
                            }}>{item.name}</div>
                            <div className='value' style={{ fontWeight: "bold" }}>{`Giảm ${item.value_discount}%`}</div>
                            <div className='code'><span>{`Tên combo: ${item.name}`}</span></div>
                            <div className='date-voucher'>{`HSD: ${item.end_time}`}</div>
                            <div className='apply'><span>{`Áp dụng khi mua combo sản phẩm bên dưới`}</span></div>
                        </div>

                        {this.showProductCombo(item)}


                    </div>

                </>
            ))}

        </div>
    }

    showProductCombo = (items) => {

        return (
            <div className='wrap-combo' style={{ display: "flex", flexWrap: "wrap" }}>
                {items.products_combo.map((item, index) => (
                    <div class="col-combo" key={index} style={{ marginBottom: "10px", marginLeft: "10px" }}>
                        <div class="card" style={{ width: "127px" }}>
                            <img src={item.product.images.length > 0 ? item.product.images[0].image_url : ""} className="img-responsive" alt="Image" width="100px" height="100px" />
                            <div class="card-body" style={{ padding: '0' }}>
                                <p class="card-title" style={{ margin: '0', overflow: "hidden", whiteSpace: "nowrap", textOverflow: 'ellipsis' }}>{item.product.name}</p>
                                <p class="card-text" style={{ color: "red" }}>{format(Number(item.product.price))}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    render() {
        var limit, passNumPage, store_code, products = this.props



        return (
            <div className="panel-bottom">

                <ul class="nav nav-tabs" id="myTab" role="tablist">
                    <li class="nav-item">
                        <a class="nav-link " id="tab-javascript" data-toggle="tab"
                            href="#content-javascript"
                            role="tab" aria-controls="content-javascript" aria-selected="true">
                            Danh sách sản phẩm
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link active" id="tab-css" data-toggle="tab"
                            href="#content-css"
                            role="tab" aria-controls="content-css" aria-selected="false">
                            Khách hàng
                        </a>
                    </li>
                    {/* <li class="nav-item">
                        <a class="nav-link " id="tab-bootstrap" data-toggle="tab"
                            href="#content-bootstrap"
                            role="tab" aria-controls="content-bootstrap" aria-selected="false">
                            Combo đang diễn ra
                        </a>
                    </li> */}
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
                    <div class="tab-pane fade show active" id="content-css"
                        role="tabpanel" aria-labelledby="tab-css">
                        {this.buildTabCustomer()}
                    </div>
                    {/* <div class="tab-pane fade" id="content-bootstrap"
                        role="tabpanel" aria-labelledby="tab-bootstrap">
                        {this.buildTabCombo()}
                    </div> */}
                </div>


            </div>
        );
    }
}




const mapStateToProps = (state) => {
    return {
        customers: state.customerReducers.customer.allCustomer,
        wards: state.placeReducers.wards,
        province: state.placeReducers.province,
        district: state.placeReducers.district,
        customerCreated: state.customerReducers.customer.customerCreated,
        isFromPosAndSave: state.customerReducers.customer.isFromPosAndSave,
        oneCart: state.posReducers.pos_reducer.oneCart,
        listCombo: state.orderReducers.order_product.listCombo,
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
        createCustomer: (store_code, form, funcModal) => {
            dispatch(dashboardAction.createCustomer(store_code, form, funcModal));
        },
        fetchAllCombo: (store_code) => {
            dispatch(OrderAction.fetchAllCombo(store_code));
        },
        fetchAllCustomer: (id, page, params) => {
            dispatch(customerAction.fetchAllCustomer(id, page, params));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PanelBottom)