import React, { Component } from "react";
import { connect } from "react-redux";
import DatePicker from "react-datepicker";
import CardProduct from "../../components/Pos_Order/CardProduct";
import Pagination from '../../components/Pos_Order/Pagination'
import * as placeAction from "../../actions/place";
import { shallowEqual } from "../../ultis/shallowEqual";
import * as dashboardAction from "../../actions/customer";
import { getDDMMYYYDate } from "../../ultis/date";
import * as OrderAction from '../../actions/add_order';
import { format } from '../../ultis/helpers'
import { Autocomplete } from "@yazanaabed/react-autocomplete";


class PanelBottom extends Component {

    constructor(props) {
        super(props)


        this.state = {
            isDisabledButton: false,
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

        if (!shallowEqual(nextProps.oneCart, this.props.oneCart)

            &&
            !shallowEqual(nextProps.oneCart.customer_id, this.props.oneCart.customer_id)
        ) {


            if (nextProps.oneCart.customer_id == null || nextProps.oneCart.customer == null) {
                this.setState({
                    txtProvince: "",
                    txtDistrict: "",
                    txtWards: "",
                    txtName: "",
                    txtEmail: "",
                    txtSex: 0,
                    txtAddressDetail: "",
                    txtPhoneNumber: "",
                    txtEmail: "",
                    isDisabledButton: false,
                    selectedDate: ""
                })
            } else {

                if (nextProps.oneCart.customer != null) {

                    if (nextProps.oneCart.customer.province != null) {
                        this.props.fetchPlaceDistrict(nextProps.oneCart.customer.province);
                    }
                    if (nextProps.oneCart.customer.district != null) {
                        this.props.fetchPlaceDistrict_Wards(nextProps.oneCart.customer.district)
                    }

                    const customer = nextProps.oneCart.customer
                    this.setState(
                        {
                            ...this.state,
                            txtProvince: customer.province,
                            txtDistrict: customer.district,
                            txtWards: customer.wards,
                            txtName: customer.name,
                            txtEmail: customer.email,
                            txtPhoneNumber: customer.phone_number,
                            txtSex: customer.sex,
                            txtAddressDetail: customer.address_detail,
                            txtEmail: customer.email,
                            selectedDate: customer == null || customer.date_of_birth == null ? "" : new Date(customer.date_of_birth),
                            isDisabledButton: customer.is_passersby
                        }
                    )
                }

            }


        }


        if (!shallowEqual(nextProps.customerCreated, this.props.customerCreated) && nextProps.isFromPosAndSave == true) {

            this.props.handleCallbackPertion(
                {
                    customer_phone: nextProps.customerCreated.phone_number,
                    customer_id: nextProps.customerCreated.id,
                    customer_name: nextProps.customerCreated.name
                }
            )

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

    onSaveCustomer = () => {

        var { txtAddressDetail, isDisabledButton, selectedDate, txtSex, txtProvince, txtDistrict, txtWards, listDistrict, listWards, txtEmail, txtEmail, txtPhoneNumber, txtName } = this.state;

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

    buildTabCustomer = () => {

        var { province } = this.props

        var { startDate, isDisabledButton, selectedDate, txtAddressDetail, txtSex, txtProvince, txtDistrict, txtWards, listDistrict, listWards, txtEmail, txtEmail, txtPhoneNumber, txtName } = this.state;


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
           

                        <Autocomplete
          onChange={selection => this.onSelectedItemChanged(selection)}
        >
          {({
              getContainerProps,
              getItemProps,
              getInputProps,
              getMenuProps,
              inputValue,
              isOpen,
              highlightedIndex
            }) => {
            let itemsFiltered = this.filterItemsBySearchInput(inputValue);

            return (
              <div
                {...getContainerProps({ 
                   // className: styles.dropdownContainer 
                })}
              >


                            <input type="text" class="form-control customerInfo"
                                placeholder="Điện thoại (F4)" data-startsuggest="6" id="customerMobile"
                                value={txtPhoneNumber || ""}
                                onChange={this.onChange}
                                name="txtPhoneNumber"
                                disabled={isDisabledButton}
                                autocomplete="new-password" />
                   
{isOpen ? (
                  <ul {...getMenuProps({ 
                    //  className: styles.menuDropdown 
                   })}>
                    {itemsFiltered.map((item, index) => (
                      <li {...getItemProps({ item, index })}>
                        <div
                        //   className={
                        //     //  styles.dropdownItem
                        //     }
                          style={{
                            backgroundColor:
                              highlightedIndex === index ? "#e0f4ea" : ""
                          }}
                        >
                          {index}
                          {item.username}
                        </div>
                      </li>
                    ))}

                    {/* {!itemsFiltered.length ? (
                      <li className={styles.noItemsFound}>
                        <h1 className={styles.notFoundTitle}>Not found.</h1>
                      </li>
                    ) : null} */}
                  </ul>
                ) : null}
              </div>
            );
          }}
        </Autocomplete>


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
                            disabled={isDisabledButton}
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
                            disabled={isDisabledButton}
                            id="customerDistrictLocationId"
                            tabindex="-1" aria-hidden="true" data-select2-id="customerDistrictLocationId">
                            <option value="">- Quận huyện -</option>
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
                            disabled={isDisabledButton}
                            class="form-control select-has-search-box customerInfo select2-hidden-accessible" id="customerWardLocationId" tabindex="-1"
                            aria-hidden="true" data-select2-id="customerWardLocationId">
                            <option value="">- Phường xã -</option>
                            {this.showWards(listWards)}

                        </select>


                    </div>

                </div>
                <div class="col-md-3 col-6">
                    <div class="input-group mb-2">
                        <select
                            disabled={isDisabledButton}
                            value={txtSex || ""}
                            onChange={this.onChangeSex}
                            name="txtSex"
                            class="form-control customerInfo px-1" id="customerGender">
                            <option value="">- Giới tính -</option>
                            <option value="1">Nam</option>
                            <option value="2">Nữ</option>
                            <option value="0">Khác</option>
                        </select>


                        <div className="day-of-birth-pos">
                            <DatePicker
                                showTimeInput

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
                            class="form-control txtAutoHeight customerInfo" placeholder="Địa chỉ" id="customerAddress"></textarea>
                    </div>

                </div>
                <div class="col-md-2 col-6">
                    <button id="btnSaveCustomer"
                        onClick={this.onSaveCustomer}
                        class="btn btn-yes-pos mt-2 mb-md-0 mb-2"> <i class="fa fa-user-o" aria-hidden="true"></i> Lưu thông tin</button>
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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PanelBottom)