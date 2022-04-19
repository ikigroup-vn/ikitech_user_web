import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { format, formatNoD, formatNumber, removeSignNumber } from '../../ultis/helpers'
import * as productAction from "../../actions/product"
import { connect } from 'react-redux'
import CardProduct from '../../components/Pos_Order/CardProduct'
import * as posAction from '../../actions/post_order'
import ModalDetail from '../../components/Pos_Order/ModalDetail'
import { shallowEqual } from '../../ultis/shallowEqual'
import Topbar from '../../components/Pos_Order/Topbar'
import ListItemInCart from '../../components/Pos_Order/ListItemInCart'
import PertionInfo from '../../components/Pos_Order/PertionInfo'
import * as OrderAction from '../../actions/add_order';
import "./index.css"
import Alert from './Alert'
import * as Types from "../../constants/ActionType";
import Pagination from '../../components/Pos_Order/Pagination'
import ModalUser from '../../components/Pos_Order/ModalUser'
import KeyboardEventHandler from "react-keyboard-event-handler";
import ModalVoucher from '../../components/Pos_Order/ModalVoucher'
import { debounce } from 'lodash'
import { Popover } from 'react-tiny-popover'
import { getBranchId } from '../../ultis/branchUtils'
import * as notificationAction from "../../actions/notification";
import { AsyncPaginate } from "react-select-async-paginate";
import * as customerApi from "../../data/remote/customer";

class PostOrder extends Component {
    constructor(props) {
        super(props)

        this.hasFocus = false
        this.state = {
            isPopoverOpen: false,

            oneCart: {},
            modalUpdateCart: {
                name: "",
                phone_number: "",
                debt: 0,
                id: 0,
            },
            modalCreateUser: "",
            listSuggestion: [],
            txtDiscount: 0,
            code: "",
            note: "",
            page: 1,
            numPage: 12,
            namePos: "",
            listPosItem: [],
            idCart: "",
            checked: false,
            checkeds: false,
            selectPrice: -1,
            exchange: 0,
            payment_method_id: 0,
            priceCustomer: 0,
            customerNote: "",
            totalAfterDiscount: 0,
            totalFinal: 0,
            typeDiscount: 0,
            beforeDiscount: 0,
            haveCheck: false,
            infoProduct: {
                inventoryProduct: "",
                idProduct: "",
                nameProduct: "",
                imageProduct: "",
                priceProduct: "",
                distributeProduct: "",
                minPriceProduct: "",
                maxPriceProduct: "",
                discountProduct: "",
                quantityProduct: "",
                quantityProductWithDistribute: ""
            },
        }

        this.changeSearch = debounce(this.handleSearch, 1000)
        this.changeDiscount = debounce(this.handleDiscount, 1000)
        this.changePaymentMethod = debounce(this.handlePaymentMethod, 200)
    }

    handleChange = (e) => {
        const val = e.target.value

        this.setState({
            customerNote: val
        })

        this.setState({ value: val }, () => {
            this.changeSearch(val)
        })
    }

    handleSearch = (e) => {
        this.setState({
            note: this.state.customerNote
        })
    }
    handleDiscount = (e) => {
        this.setState({

            txtDiscount: formatNumber(this.state.discount)

        })
    }
    handlePaymentMethod = (e) => {

        this.setState({
            payment_method_id: e
        })
    }

    onGetSuggestion = (totalFinal) => {
        var list = []

        var totalFinal = totalFinal.toString().replace(/\./g, ',');


        if (totalFinal != null && totalFinal != "" && totalFinal.length > 0) {
            const lengthNum = totalFinal.length;
            const firstNum = parseInt(totalFinal[0]);

            //num0
            list.push(totalFinal)

            //num1
            if (firstNum > 5 && lengthNum > 1) {
                list.push(Math.pow(10, lengthNum))
            }

            //num2
            if (firstNum < 9 && lengthNum > 1) {
                var firstNewNum = firstNum + 1;
                list.push(firstNewNum * Math.pow(10, lengthNum - 1))
            }
            // //num3
            // if (firstNum < 5 && lengthNum > 1) {
            //     var firstNewNum = firstNum + 1;
            //     var su = 5 * Math.pow(10, lengthNum - 1);
            //     if (!list.includes(su)) {
            //         list.push(5 * Math.pow(10, lengthNum - 1))
            //     }

            // }
            //num4
            // if (lengthNum > 2) {
            //     const secondNum = parseInt(totalFinal[1]);
            //     if (secondNum < 5) {
            //         list.push((firstNum * 10 + 5) * Math.pow(10, lengthNum - 2))
            //     }
            // }

            //num5
            if (lengthNum > 1) {
                const secondNum = parseInt(totalFinal[1]);
                if (secondNum < 9) {
                    list.push((firstNum * 10 + (secondNum + 1)) * Math.pow(10, lengthNum - 2))
                }
            }

            // //num6
            // if (lengthNum > 3) {
            //     const secondNum = parseInt(totalFinal[1]);
            //     const thirtNum = parseInt(totalFinal[2]);
            //     if (thirtNum < 9) {
            //         list.push(((firstNum * 100) + (secondNum * 10) + (thirtNum + 1)) * Math.pow(10, lengthNum - 3))
            //     }
            // }
        }

        var list = list.filter(this.onlyUnique);

        this.setState({
            listSuggestion: list
        })
    }


    onlyUnique = (value, index, self) => {
        return self.indexOf(value) === index;
    }

    componentDidUpdate() {

        if (this.state.isPopoverOpen == true && this.hasFocus == false) {

            var refDiscountInput = ReactDOM.findDOMNode(this.refs.refDiscountInput)
            if (refDiscountInput != null) {
                refDiscountInput.select()
                refDiscountInput.focus()
                this.hasFocus = true
            }
        }
    }

    componentDidMount() {
        window.$(".panel-top").resizable({
            handleSelector: ".splitter-horizontal",
            resizeWidth: false
        });
        const branch_id = getBranchId()

        this.props.fetchAllPertion(this.props.match.params.store_code)
        this.props.fetchAllVoucher(this.props.match.params.store_code)
        this.props.fetchAllBadge(this.props.match.params.store_code, branch_id);

    }

    refreshProductList = () => {
        const branch_id = getBranchId()
        const limit = this.state.numPage
        const params = `&limit=${limit}`
        this.props.fetchAllProductV2(this.props.match.params.store_code, branch_id, params);

    }

    handleCallbackProduct = (modal) => {
        this.setState(
            {
                infoProduct: modal
            })
    }

    setIsPopoverOpen = () => {


        const nextIsPopoverOpen = !this.state.isPopoverOpen

        if (nextIsPopoverOpen == true) {
            this.hasFocus = false
        } else {
            this.hasFocus = true
        }
        this.setState({
            isPopoverOpen: nextIsPopoverOpen
        })

    }

    onChanges = (e) => {
        this.setState({ note: e.target.value })
    }

    handleCallbackPushProduct = (modal) => {
        this.setState({ listPosItem: modal })
    }

    handleCallbackTab = (modal) => {
        this.setState({
            idCart: modal,

        })
    }

    handleCallbackPertion = (modal) => {
        this.setState({ modalUpdateCart: modal })
    }

    handleCallbackUser = (modal) => {
        this.setState({ modalCreateUser: modal })
    }

    handleCallbackVoucherInput = (modal) => {
        this.setState({ code: modal })
    }

    handChange = (e) => {


        var name = e.target.name
        var value_text = e.target.value;
        var value = value_text
        const _value = formatNumber(value);
        var totalPrice = this.props.oneCart.info_cart?.total_before_discount
        var num1 = totalPrice * value / 100
        if (!isNaN(Number(_value))) {
            value = new Intl.NumberFormat().format(_value);
            value = value.toString().replace(/\./g, ',')

            var num = 0;
            if (value_text == "") {
                num = 0;
            }
            else {
                num = value;
            }

            if (name == "discount") {
                if (this.state.typeDiscount == 1) {
                    if (value.length < 3) {
                        this.setState({
                            beforeDiscount: value,
                            totalFinal: this.state.totalAfterDiscount - removeSignNumber(num1),
                            priceCustomer: this.state.totalAfterDiscount - removeSignNumber(num1)
                        }, () => {
                            this.changeDiscount(num1)
                        })
                    }
                } else {
                    this.setState({
                        discount: num,
                        totalFinal: this.state.totalAfterDiscount - removeSignNumber(num),
                        priceCustomer: this.state.totalAfterDiscount - removeSignNumber(num),
                    }, () => {
                        this.changeDiscount(num)
                    })
                }


            } else {

                this.setState({ priceCustomer: num });
            }

        }
    }

    handlePayment = () => {
        const branch_id = getBranchId()
        const { store_code } = this.props.match.params
        const data = {
            payment_method_id: this.state.payment_method_id,
            amount_money: formatNumber(this.state.priceCustomer)
        }
        this.props.paymentOrderPos(store_code, branch_id, this.state.idCart, data)
        this.setState({
            priceCustomer: 0,
            listPosItem: [],
            modalUpdateCart: {
                name: "",
                phone_number: "",
                debt: 0,
                id: 0,
            }
        })
    }


    componentWillReceiveProps(nextProps) {

        if (!shallowEqual(nextProps.oneCart, this.props.oneCart)) {

            this.setState({
                oneCart: nextProps.oneCart,
                priceCustomer: nextProps.oneCart.info_cart.total_final,
                totalFinal: nextProps.oneCart.info_cart.total_final,
                totalAfterDiscount: nextProps.oneCart.info_cart.total_after_discount,
                selectPrice: -1,
                namePos: nextProps.oneCart.name,
                customerNote: nextProps.oneCart.customer_note ?? "",
                payment_method_id: nextProps.oneCart.payment_method_id ?? 0,
                discount: nextProps.oneCart.discount,
                checkeds: nextProps.oneCart.info_cart.is_use_points !== null ? nextProps.oneCart.info_cart.is_use_points : false
            })



        }
        if (!shallowEqual(nextProps.inforCustomer, this.props.inforCustomer)) {
            this.setState({
                modalUpdateCart: {
                    name: nextProps.inforCustomer.name,
                    phone_number: nextProps.inforCustomer.phone_number,
                    debt: nextProps.inforCustomer.debt,
                    id: nextProps.inforCustomer.id,
                },
            })
        }

    }

    shouldComponentUpdate(nextProps, nextState) {
        if (!shallowEqual(nextState.modalCreateUser, this.state.modalCreateUser)) {
            var { store_code } = this.props.match.params;

            this.props.handleCreateUsers(store_code, nextState.modalCreateUser)
        }
        if (!shallowEqual(nextState.listPosItem, this.state.listPosItem) && nextState.listPosItem.product_id != null) {
            const formData = {
                product_id: nextState.listPosItem.product_id,
                quantity: 1,
                distribute_name: nextState.listPosItem.nameDistribute,
                element_distribute_name: nextState.listPosItem.nameElement,
                sub_element_distribute_name: nextState.listPosItem.nameSubDistribute
            }
            var { store_code } = this.props.match.params;
            const branch_id = getBranchId()
            const id = nextState.idCart
            this.props.addProductInCart(store_code, branch_id, id, formData)
        }
        if (!shallowEqual(nextState.priceCustomer, this.state.priceCustomer)) {

            this.setState({
                exchange: removeSignNumber(nextState.priceCustomer) - removeSignNumber(nextState.totalFinal)
            })
        }
        if (!shallowEqual(nextState.idCart, this.state.idCart)) {

            const branch_id = getBranchId()
            const id = nextState.idCart
            this.props.fetchInfoOneCart(this.props.match.params.store_code, branch_id, id)
            this.setState({
                priceCustomer: 0,
                exchange: 0,
                totalFinal: 0,
            })

            this.refreshProductList();
        }

        if (!shallowEqual(nextState.totalFinal, this.state.totalFinal)) {
            this.onGetSuggestion(nextState.totalFinal);
        }


        if (!shallowEqual(nextState.txtDiscount, this.state.txtDiscount) ||
            !shallowEqual(nextState.note, this.state.note) ||
            !shallowEqual(nextState.payment_method_id, this.state.payment_method_id)

        ) {
            const branch_id = getBranchId()
            const { store_code } = this.props.match.params
            const formData = {
                discount: formatNumber(nextState.txtDiscount),
                code_voucher: nextState.code,
                name: nextState.namePos,
                customer_note: nextState.note,
                payment_method_id: nextState.payment_method_id,
                customer_id: nextState.modalUpdateCart.id,
            }
            this.props.updateInfoCart(store_code, branch_id, nextState.idCart, formData)
        }

        if (!shallowEqual(nextState.modalUpdateCart, this.state.modalUpdateCart)) {
            const branch_id = getBranchId()
            const { store_code } = this.props.match.params
            const formData = {
                customer_name: nextState.modalUpdateCart.customer_name,
                customer_phone: nextState.modalUpdateCart.customer_phone,
                name: nextState.namePos,
                customer_id: nextState.modalUpdateCart.customer_id,

            }
            this.props.updateInfoCarts(store_code, branch_id, nextState.idCart, formData)
        }

        if (!shallowEqual(nextState.checkeds, this.state.checkeds) && nextState.haveCheck == true) {
            const branch_id = getBranchId()
            const { store_code } = this.props.match.params
            const formData = {
                name: nextState.namePos,
                customer_id: nextState.modalUpdateCart.id,
                is_use_points: nextState.checkeds,
            }
            this.props.updateInfoCarts(store_code, branch_id, nextState.idCart, formData)
        }


        if (!shallowEqual(nextState.code, this.state.code)) {
            const branch_id = getBranchId()
            const id = nextState.idCart
            const data = {
                code_voucher: nextState.code
            }
            this.props.fetchVoucher(this.props.match.params.store_code, branch_id, id, data)

        }

        return true
    }

    handleOptionChange = (changeEvent) => {
        var payment_method_id = parseInt(changeEvent.target.value);
        this.changePaymentMethod(payment_method_id)
    }

    handleKeyboard = (key) => {

        switch (key) {
            case "f1":
                this.handlePayment();

                break;
            case "f5":
                document.getElementById("serch-product").click();
                break;
            case "f6":
                document.getElementById("import_prices").click();
                break;
            case "f2":
                document.getElementById("form-control").click();
                break;
            case "f4":
                document.getElementById("discount").click();
                break;
            default:
                return;
        }
    };
    roundPrice = (rnum, rlength) => {
        var newnumber = Math.ceil(rnum * Math.pow(10, rlength - 1)) / Math.pow(10, rlength - 1);
        var toTenths = newnumber.toFixed(rlength);
        return toTenths;
    }

    handleActive = (price) => {
        this.setState({ priceCustomer: price })
    }

    handChangeCheckbox = (e) => {
        this.setState({ checkeds: !this.state.checkeds, haveCheck: true })
    }

    ChangeTypeDiscount = (type) => {
        this.setState({ typeDiscount: type, discount: "" })
    }

    handleDelete = () => {
        this.setState({
            listPosItem: []
        })
    }

    handleDeletePersion = () => {
        const branch_id = getBranchId()
        const { store_code } = this.props.match.params
        const formData = {
            customer_name: "",
            customer_phone: "",
            name: this.state.namePos,
            customer_id: "",
        }
        this.props.updateInfoCarts(store_code, branch_id, this.state.idCart, formData)
    }

    handleClearVoucher = () => {
        this.setState({ code: "" })
    }

    onChangeSelect4 = (selectValue) => {


        var customer = selectValue?.customer
        if (selectValue != null && customer != null) {
            this.handleCallbackPertion(
                {
                    customer_phone: customer.phone_number,
                    customer_id: customer.id,
                    customer_name: customer.name
                }
            )
        }

        // this.setState({ select_customer_id: selectValue });


    };

    loadCustomers = async (search, loadedOptions, { page }) => {

        var { store_code } = this.props.match.params
        const params = `&search=${search}`;
        const res = await customerApi
            .fetchAllCustomer(store_code, page, params);

        if (res.status != 200) {
            return {
                options: [],
                hasMore: false,
            }
        }

        return {
            options: res.data.data.data.map((i) => {
                return { value: i.id, label: `${i.name}  (${i.phone_number})`, customer: i };
            }),

            hasMore: res.data.data.data.length == 20,
            additional: {
                page: page + 1,
            },
        };
    };


    render() {
        var { store_code } = this.props.match.params
        var { listPertion, products, listVoucher, badges } = this.props
        var { allow_semi_negative } = badges
        var { numPage, exchange, priceCustomer, oneCart, totalFinal, listSuggestion, totalAfterDiscount, select_customer_id } = this.state
        const length = oneCart.info_cart?.line_items.length


        return (
            <React.Fragment>
                <div className='pos-modal'>
                    <KeyboardEventHandler
                        handleKeys={["f1", "f6", "f2", "f4", "f5"]}
                        onKeyEvent={(key, e) => this.handleKeyboard(key)}
                    />
                    <Topbar store_code={store_code} handleCallbackTab={this.handleCallbackTab} />
                    <div>
                        <div className="row-post">

                            <div className='col-list-pos' >
                                {oneCart?.info_cart?.line_items.length > 0 &&
                                    <div className='wap-list'>
                                        <div style={{ marginLeft: "10px" }}>STT</div>
                                        <div style={{ width: "40%" }}>Tên sản phẩm</div>
                                        <div>Số lượng</div>
                                        <div style={{ width: "11%" }}>Đơn giá</div>
                                        <div style={{ width: "13%" }}>Thành tiền</div>
                                    </div>
                                }

                                <div className="panel-container-vertical">

                                    <div className="panel-top">
                                        <div className='col-list-order'>
                                            <div className='' style={{ padding: "8px" }}>
                                                {oneCart?.info_cart?.line_items.length > 0 ?
                                                    <ListItemInCart store_code={store_code} listItemPos={oneCart} idCart={this.state.idCart} handleDelete={this.handleDelete} /> :
                                                    <div className='product-pos' style={{ textAlign: "center", color: "gray", fontSize: "20px", marginTop: "70px" }}>

                                                        <img style={{ width: "14%" }} src="../../images/empty_cart.png" alt=''></img>
                                                        <div className='title-list-pos ' style={{ color: "black" }}>
                                                            Đơn hàng của bạn chưa có sản phẩm nào
                                                        </div>
                                                    </div>
                                                }

                                            </div>

                                        </div>
                                    </div>

                                    <div className="splitter-horizontal">
                                    </div>

                                    <div className="panel-bottom">
                                        <div className='col-list-product' style={{ borderRadius: "0", display: "flex", flexDirection: "column" }}>
                                            <div className='card-pos-body' style={{ overflow: "hidden" }}>

                                                <CardProduct store_code={store_code} handleCallbackProduct={this.handleCallbackProduct} handleCallbackPushProduct={this.handleCallbackPushProduct} />
                                            </div>
                                            <div className='wrap-pagination'>
                                                <Pagination limit={numPage}
                                                    passNumPage={this.passNumPage} store_code={store_code} products={products} />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div className='row-payman'>
                                <div className='wrap-price'>
                                    <div className='' style={{ padding: "0" }}>



                                        <div style={{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center"
                                        }}>
                                            <i class='fa fa-user-o' data-toggle="modal" data-target="#modalPertion" style={{

                                                fontSize: "20px", left: "3px", bottom: "10px", cursor: "pointer",
                                                margin: 10
                                            }} ></i>


                                            <div style={{
                                                flex: 1
                                            }}>


                                                {this.props.oneCart.customer?.name ?


                                                    <div style={{
                                                        display: "flex"
                                                    }}>


                                                        <div
                                                            class="form-control customer-pos-select" >

                                                            {this.props.oneCart.customer?.name ?
                                                                `${this.props.oneCart.customer.name} 
                                            (Công nợ: ${format(Number(this.props.oneCart.customer.debt))} )
                                            ` :
                                                                "Chọn khách hàng"} *

                                                        </div>

                                                        <i class="fa fa-times-circle" style={{ paddingTop: "10px", color: "red" }}
                                                            onClick={this.handleDeletePersion}></i>
                                                    </div>

                                                    :
                                                    <div style={{
                                                        display: "flex",
                                                        justifyContent: "center",
                                                        alignItems: "center"
                                                    }}>
                                                        <div style={{
                                                            flex: 1
                                                        }}>


                                                            <AsyncPaginate
                                                                placeholder="Tìm khách hàng"
                                                                value={select_customer_id}
                                                                loadOptions={this.loadCustomers}
                                                                name="recipientReferences1"
                                                                onChange={this.onChangeSelect4}
                                                                additional={{
                                                                    page: 1,
                                                                }}
                                                                debounceTimeout={500}
                                                                isClearable
                                                                isSearchable
                                                            />

                                                        </div>



                                                        <i class='fa fa-plus-square-o'
                                                            style={{
                                                                margin: 10,
                                                                fontSize: "30px",

                                                                cursor: "pointer"
                                                            }} data-toggle="modal" data-target="#modalUser" ></i>

                                                    </div>

                                                }

                                            </div>

                                        </div>

                                    </div>
                                    <div className="wrap-detail">
                                        <div className='price-info' style={{ margin: "10px 0px", fontSize: "17px", marginLeft: "5px" }}>
                                            <div className='row item-info'>
                                                <div className='title-price col-6'>{`Tổng tiền:(${length} sản phẩm)`}</div>
                                                <span className='col-6' style={{ textAlign: "end" }}>{format(Number(oneCart.info_cart?.total_before_discount))}</span>
                                            </div>
                                            <div className='row' style={{ padding: "3px 0", justifyContent: "space-between" }}>
                                                {this.props.oneCart.customer?.name ?
                                                    <>
                                                        <div className='title-price col-6'>{`Dùng ${oneCart.info_cart?.total_points_can_use} xu [${format(Number(oneCart.info_cart?.bonus_points_amount_can_use))}]`}</div>
                                                        <form action="/action_page.php">
                                                            <div class="custom-control custom-switch">
                                                                <input type="checkbox" class="custom-control-input" id="switch1" name="example" checked={this.state.checkeds} onChange={this.handChangeCheckbox} />
                                                                <label class="custom-control-label" for="switch1"></label>
                                                            </div>
                                                        </form></>
                                                    : ""
                                                }

                                            </div>

                                            <div className='row item-info'>
                                                <div className='title-price col-6' >Voucher</div>
                                                <div className='col-6' style={{ textAlign: "end" }}>
                                                    <a className='modal-choose ' style={{ color: "rgb(232 117 26)" }} data-toggle="modal" data-target="#modalVoucher" >
                                                        <span className='' style={{ fontSize: "13px" }}>{oneCart.code_voucher ? oneCart.code_voucher : "Chọn hoặc nhập mã"}</span>

                                                    </a>
                                                    {oneCart.code_voucher ? <i class="fa fa-times" style={{ marginLeft: "10px" }} onClick={this.handleClearVoucher} ></i> : ""}
                                                </div>
                                            </div>




                                            <Popover
                                                positions={['top']}
                                                onClickOutside={() => this.setIsPopoverOpen(false)}
                                                isOpen={this.state.isPopoverOpen}
                                                content={<div className='model-discount'>
                                                    <div className='row'>

                                                        <div className='txt-discount'>
                                                            Chiết khấu
                                                        </div>

                                                        <input
                                                            ref='refDiscountInput'
                                                            onChange={this.handChange}
                                                            type="text"
                                                            name="discount" id="discount"
                                                            class=" col-4 input-discount text-input-pos"
                                                            value={this.state.typeDiscount == 0 ? this.state.discount : this.state.beforeDiscount}
                                                        ></input>

                                                        <div className={this.state.typeDiscount == 0 ? "type-discount-price activesss" : "type-discount-price"}
                                                            onClick={() => this.ChangeTypeDiscount(0)}
                                                        >
                                                            VND
                                                        </div>
                                                        <div className={this.state.typeDiscount == 1 ? "type-discount-price activesss" : "type-discount-price"} onClick={() => this.ChangeTypeDiscount(1)}>
                                                            %
                                                        </div>
                                                    </div>

                                                </div>
                                                }

                                            >

                                                <div className='row item-info'>
                                                    <div onClick={() => this.setIsPopoverOpen(!this.state.isPopoverOpen)} className='title-price col-8'>Chiết khấu</div>
                                                    <button onClick={() => this.setIsPopoverOpen(!this.state.isPopoverOpen)}
                                                        type="text"
                                                        name="discount" id="discount"
                                                        class="col-4 button-discount-pos"
                                                        value={this.state.typeDiscount == 0 ? this.state.discount : this.state.beforeDiscount}
                                                    // data-toggle="modal" data-target="#modalDiscount" 
                                                    >{this.state.typeDiscount == 0 ? this.state.discount : `${this.state.beforeDiscount}%`}</button>
                                                </div>

                                            </Popover>

                                            <div className='row item-info'>
                                                <div className='title-price col-6' style={{ color: "black", fontWeight: "500" }} >KHÁCH PHẢI TRẢ</div>
                                                <span className='col-6' style={{ textAlign: "end", color: "red", fontSize: "22px" }}>{formatNoD((totalFinal))}</span>
                                            </div>





                                            <div className='row' style={{ padding: "10px 0" }}>
                                                <div className='title-price col-8' style={{ color: "black", fontWeight: "500" }}>Tiền khách đưa</div>
                                                <input type="text" name="import_price" id="import_prices" class="col-4 text-input-pos" value={formatNoD(removeSignNumber(this.state.priceCustomer))}
                                                    onChange={this.handChange} ></input>
                                            </div>

                                            <div className='row' style={{ display: "flex", flexDirection: "row", margin: "10px 0" }}>
                                                {listSuggestion.map((suggesionPrice) => <div>
                                                    <div
                                                        style={{
                                                            margin: 3
                                                        }}
                                                        className={this.state.priceCustomer === suggesionPrice ?
                                                            "activesss item-recomment" : 'item-recomment'}
                                                        onClick={() => this.handleActive(suggesionPrice)}>{formatNoD(suggesionPrice)}</div>
                                                </div>
                                                )}
                                            </div>


                                            <div className='row' style={{ borderTop: "1px solid #80808045", padding: "10px 0" }} >
                                                <div className='title-price col-6' style={{ color: "black", fontWeight: "500" }}>Tiền thừa trả khách</div>
                                                <span className='col-6' style={{ textAlign: "end", fontSize: "22px" }}>{formatNoD(exchange)}</span>
                                            </div>
                                            <div class="form-group" style={{ position: "relative" }} >
                                                <i class='fas fa-pencil-alt' style={{ position: "absolute", top: "11px", left: "6px" }}></i>
                                                <input class="form-control" rows="5" id="comment" placeholder='Thêm ghi chú'
                                                    style={{ paddingLeft: "30px", border: 0, borderRadius: 0, borderBottom: "2px solid gray" }}
                                                    value={this.state.customerNote}
                                                    onChange={this.handleChange}

                                                ></input>
                                            </div>

                                        </div>
                                    </div>
                                </div>


                                <div className='row justify-content-around'>
                                    <div class="form-check">
                                        <input class="form-check-input" onChange={this.handleOptionChange}
                                            type="radio" value={0} id="flexRadioDefault1" checked={this.state.payment_method_id == 0} />
                                        <label class="form-check-label" for="flexRadioDefault1">
                                            Tiền mặt
                                        </label>
                                    </div>

                                    <div class="form-check">
                                        <input class="form-check-input" onChange={this.handleOptionChange}
                                            type="radio" value={1} id="flexRadioDefault2" checked={this.state.payment_method_id == 1} />
                                        <label class="form-check-label" for="flexRadioDefault2">
                                            Thẻ
                                        </label>
                                    </div>

                                    <div class="form-check">
                                        <input class="form-check-input" onChange={this.handleOptionChange}
                                            type="radio" value={3} id="flexRadioDefault3" checked={this.state.payment_method_id == 3} />
                                        <label class="form-check-label" for="flexRadioDefault3">
                                            Chuyển khoản
                                        </label>
                                    </div>
                                </div>

                                <div className='wrap-buttom' style={{ display: "flex", justifyContent: "space-between", margin: "10px 0" }} >
                                    <button className='btn btn-pay'

                                        style={{
                                            width: "100%",
                                            padding: "25px",
                                            textAlign: "center",
                                            borderRadius: "5px",
                                            cursor: "pointer",
                                        }}
                                        onClick={this.handlePayment}>Thanh toán</button>
                                </div>

                            </div>


                        </div>
                        <ModalDetail allow_semi_negative={allow_semi_negative} modal={this.state.infoProduct} handleCallbackPushProduct={this.handleCallbackPushProduct} />
                        {/* <PertionInfo store_code={store_code} listPertion={listPertion} handleCallbackPertion={this.handleCallbackPertion} /> */}
                        <ModalUser handleCallbackUser={this.handleCallbackUser} />
                        <ModalVoucher listVoucher={listVoucher} handleCallbackVoucherInput={this.handleCallbackVoucherInput} />
                    </div>
                    <Alert
                        type={Types.ALERT_UID_STATUS}
                        alert={this.props.alert}
                    />

                </div>
            </React.Fragment >
        )
    }
}
const mapStateToProps = (state) => {
    return {
        products: state.productReducers.product.allProduct,
        oneCart: state.posReducers.pos_reducer.oneCart,
        listPertion: state.orderReducers.order_product.listPertion,
        listVoucher: state.orderReducers.order_product.listVoucher,
        inforCustomer: state.posReducers.pos_reducer.inforCustomer,
        badges: state.badgeReducers.allBadge,
        customers: state.customerReducers.customer.allCustomer,
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchAllProductV2: (store_code, branch_id, page, params) => {
            dispatch(productAction.fetchAllProductV2(store_code, branch_id, page, params));

        },

        addProductInCart: (store_code, branch_id, id_cart, data) => {
            dispatch(posAction.addProductInCart(store_code, branch_id, id_cart, data))
        },

        fetchInfoOneCart: (store_code, branch_id, id) => {
            dispatch(posAction.fetchInfoOneCart(store_code, branch_id, id))
        },
        fetchAllPertion: (store_code) => {
            dispatch(OrderAction.fetchAllPertion(store_code))
        },

        updateInfoCart: (store_code, branch_id, id_cart, data) => {
            dispatch(posAction.updateInfoCart(store_code, branch_id, id_cart, data))
        },
        updateInfoCarts: (store_code, branch_id, id_cart, data) => {
            dispatch(posAction.updateInfoCarts(store_code, branch_id, id_cart, data))
        },
        paymentOrderPos: (store_code, branch_id, id_cart, data) => {
            dispatch(posAction.paymentOrderPos(store_code, branch_id, id_cart, data))
        },
        fetchVoucher: (store_code, branch_id, id_cart, data) => {
            dispatch(posAction.fetchVoucher(store_code, branch_id, id_cart, data))
        },
        fetchAllVoucher: (store_code) => {
            dispatch(OrderAction.fetchAllVoucher(store_code))
        },
        handleCreateUsers: (store_code, data) => {
            dispatch(posAction.handleCreateUsers(store_code, data))
        },
        fetchAllBadge: (store_code, branch_id) => {
            dispatch(notificationAction.fetchAllBadge(store_code, branch_id));
        },


    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostOrder)
