import React, { Component } from 'react'
import { format, formatNumber } from '../../ultis/helpers'
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
import ModalDiscount from '../../components/Pos_Order/ModalDiscount'
import "./index.css"
import ModalPayment from '../../components/Pos_Order/ModalPayment'
import Alert from '../../components/Partials/Alert'
import * as Types from "../../constants/ActionType";
import Pagination from '../../components/Pos_Order/Pagination'
import ModalUser from '../../components/Pos_Order/ModalUser'
import KeyboardEventHandler from "react-keyboard-event-handler";

class PostOrder extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modalUpdateCart: {
                name: "",
                phone_number: "",
            },
            modalUpdateDiscount: {
                txtDiscount: 0,
                code: ""
            },
            note: "",
            page: 1,
            numPage: 12,
            namePos:"",
            listPosItem: [],
            idCart: "",
            selectPrice:-1,
            payment_method: 0,
            priceCustomer: 0,
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
    }

    componentDidMount() {
        const branch_id = localStorage.getItem('branch_id')
        const limit = this.state.numPage
        const params = `&limit=${limit}`
        this.props.fetchAllProductV2(this.props.match.params.store_code, branch_id, params);
        this.props.fetchAllPertion(this.props.match.params.store_code)
    }
    handleCallbackProduct = (modal) => {
        this.setState(
            {
                infoProduct: modal
            })
    }
    onChanges = (e) => {
        this.setState({ note: e.target.value })
    }
    handleCallbackChoosePayment = (modal) => {
        this.setState({ payment_method: modal })
    }
    handleCallbackPushProduct = (modal) => {
        this.setState({ listPosItem: modal })
    }
    handleCallbackTab = (modal) => {
        console.log("modal", modal)
        this.setState({ idCart: modal })
    }
    handleCallbackPertion = (modal) => {
        this.setState({ modalUpdateCart: modal })
    }
    handleCallbackDiscount = (modal) => {
        this.setState({ modalUpdateDiscount: modal })
    }
    handleCallbackUser = (modal) => {
        this.setState({ modalUpdateCart: modal })
    }

    handChange = (e) => {
        var value_text = e.target.value;
        var value = value_text
        const _value = formatNumber(value);
        if (!isNaN(Number(_value))) {
            value = new Intl.NumberFormat().format(_value);
            value = value.toString().replace(/\./g, ',')
            if (value_text == "") {
                this.setState({ priceCustomer: "" });
            }
            else {
                this.setState({ priceCustomer: value });
            }

        }


    };
    handlePayment = () => {
        const branch_id = localStorage.getItem("branch_id")
        const { store_code } = this.props.match.params
        const data = {
            payment_method: this.state.payment_method,
            amount_money: formatNumber(this.state.priceCustomer)
        }
        this.props.paymentOrderPos(store_code, branch_id, this.state.idCart, data)
        this.setState({
            priceCustomer: 0,
            modalUpdateCart: {
                name: "",
                phone_number: ""
            }
        })
    }

    componentWillReceiveProps(nextProps) {
        if (!shallowEqual(nextProps.listItemCart, this.props.listItemCart)) {
            this.setState({ priceCustomer: nextProps.listItemCart.info_cart.total_final,selectPrice:-1,namePos:nextProps.listItemCart.name })
        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        if (!shallowEqual(nextState.listPosItem, this.state.listPosItem)) {
            const formData = {
                product_id: nextState.listPosItem.product_id,
                quantity: 1,
                distribute_name: nextState.listPosItem.nameDistribute,
                element_distribute_name: nextState.listPosItem.nameElement,
                sub_element_distribute_name: nextState.listPosItem.nameSubDistribute
            }
            var { store_code } = this.props.match.params;
            const branch_id = localStorage.getItem("branch_id")
            const id = nextState.idCart
            this.props.addProductInCart(store_code, branch_id, id, formData)
        }
        if (!shallowEqual(nextState.idCart, this.state.idCart)) {
            const branch_id = localStorage.getItem("branch_id")
            const id = nextState.idCart
            this.props.fetchInfoOneCart(this.props.match.params.store_code, branch_id, id)
            this.setState({
                priceCustomer: 0,
                // modalUpdateDiscount: {
                //     code: ""
                // }
            })
        }
        if (!shallowEqual(nextState.modalUpdateCart, this.state.modalUpdateCart) || !shallowEqual(nextState.modalUpdateDiscount, this.state.modalUpdateDiscount)) {
            console.log("hiiiiii")
            const branch_id = localStorage.getItem("branch_id")
            const { store_code } = this.props.match.params
            const formData = {
                customer_name: nextState.modalUpdateCart.name,
                customer_phone: nextState.modalUpdateCart.phone_number,
                discount: formatNumber(nextState.modalUpdateDiscount.txtDiscount),
                code_voucher: nextState.modalUpdateDiscount.code,
                name: nextState.namePos
            }
            this.props.updateInfoCart(store_code, branch_id, nextState.idCart, formData)
        }
        if (!shallowEqual(nextState.modalUpdateDiscount.code, this.state.modalUpdateDiscount.code)) {
            console.log("haaaaaaaa")
            const branch_id = localStorage.getItem("branch_id")
            const id = nextState.idCart
            const data = {
                code_voucher: nextState.modalUpdateDiscount.code
            }
            this.props.fetchVoucher(this.props.match.params.store_code, branch_id, id, data)

        }

        return true
    }
    handleKeyboard = (key) => {
        switch (key) {
            case "enter":
                this.handlePayment();
                
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
          }
    };
    roundPrice = (rnum, rlength) => {
        var newnumber = Math.ceil(rnum * Math.pow(10, rlength-1)) / Math.pow(10, rlength-1);
        var toTenths = newnumber.toFixed(rlength);
        return toTenths;
    }

    handleActive = (id, price) =>{
        this.setState({selectPrice:id,priceCustomer:price})
    }

    render() {
        var { store_code } = this.props.match.params
        var { listItemCart, listPertion, products } = this.props
        var { code } = this.state.modalUpdateDiscount
        var { numPage,priceCustomer } = this.state
        var number = new Intl.NumberFormat().format(priceCustomer)
        const length = listItemCart.info_cart?.line_items.length
        // var roundNumber  = this.roundPrice(number,3)
        return (
            <React.Fragment>
                <div className='pos-modal'>
                    <KeyboardEventHandler
                        handleKeys={["enter","f6","f2","f4"]}
                        onKeyEvent={(key, e) => this.handleKeyboard(key)}
                    />
                    <Topbar store_code={store_code} handleCallbackTab={this.handleCallbackTab} />
                    <div>
                        <div className="row-post">

                            <div className='col-list-pos' >
                                <div className='col-list-order'>
                                    <div className='' style={{ padding: "8px" }}>
                                        {listItemCart?.info_cart?.line_items.length > 0 ?
                                            <ListItemInCart store_code={store_code} listItemPos={listItemCart} /> :
                                            <div className='product-pos' style={{ textAlign: "center", color: "gray", fontSize: "20px" }}>

                                                <img style={{width:"23%"}} src='https://bizweb.dktcdn.net/100/317/412/themes/705840/assets/srv_2.png?1645429144961' alt=''></img>
                                                <div className='title-list-pos ' style={{ color: "black" }}>
                                                    Đơn hàng của bạn chưa có sản phẩm nào
                                                </div>
                                            </div>
                                        }

                                    </div>

                                </div>

                                <div className='col-list-product' style={{ borderRadius: "0", display: "flex", flexDirection: "column" }}>
                                    <div className='card-pos-body' style={{ overflow: "hidden" }}>

                                        <CardProduct store_code={store_code} handleCallbackProduct={this.handleCallbackProduct} handleCallbackPushProduct ={this.handleCallbackPushProduct} />
                                    </div>
                                    <div className='wrap-pagination'>
                                        <Pagination limit={numPage}
                                            passNumPage={this.passNumPage} store_code={store_code} products={products} />
                                    </div>
                                </div>

                            </div>

                            <div className='row-payman'>
                                <div className='wrap-price'>
                                    <div className='' style={{ padding: "0" }}>
                                        <div class="mb-6" style={{ position: "relative", marginTop: "10px", display: "flex" }}>
                                            <i class='fa fa-search' style={{ position: "absolute", fontSize: "20px", left: "3px", bottom: "10px", cursor: "pointer" }} ></i>
                                            <div style={{ border: 0, borderRadius: 0, borderBottom: "1px solid rgba(128, 128, 128, 0.27)", paddingLeft: "30px" }}
                                                class="form-control" id="form-control" data-toggle="modal" data-target="#modalPertion" >{this.state.modalUpdateCart.name ? this.state.modalUpdateCart.name : "Thêm khách hàng vào đơn"}</div>
                                            <i class='fas fa-plus' style={{ position: "absolute", fontSize: "20px", right: "10px", bottom: "10px", cursor: "pointer" }} data-toggle="modal" data-target="#modalUser" ></i>
                                        </div>
                                    </div>
                                    <div className="">
                                        <div className='price-info' style={{ margin: "10px 0px", fontSize: "17px", marginLeft: "5px" }}>
                                            <div className='row' style={{ padding: "3px 0" }}>
                                                <div className='title-price col-6'>{`Tổng tiền:(${length} sản phẩm)`}</div>
                                                <span className='col-6' style={{ textAlign: "end" }}>{format(Number(listItemCart.info_cart?.total_before_discount))}</span>
                                            </div>
                                            <div className='row' style={{ padding: "3px 0" }}>
                                                <div className='title-price col-6'>VAT</div>
                                                <span className='col-6' style={{ textAlign: "end" }}>{format(Number(0))}</span>
                                            </div>
                                            <div className='row' style={{ padding: "3px 0" }}>
                                                <div className='title-price col-8'>Chiết khấu</div>
                                                <input type="text" name="import_price" id="discount" class=" col-4" value={format(Number(listItemCart.info_cart?.discount))}
                                                    style={{ height: "28px", width: "100px", textAlign: "right", border: 0, borderRadius: 0, borderBottom: "1px solid rgb(128 128 128 / 71%)" }} data-toggle="modal" data-target="#modalDiscount" ></input>
                                            </div>
                                            <div className='row' style={{ padding: "3px 0" }}>
                                                <div className='title-price col-6' >Voucher</div>
                                                <span className='col-6' style={{ textAlign: "end", color: "black", fontSize: "13px" }}>{code ? code : "Không có voucher"}</span>
                                            </div>
                                            <div className='row' style={{ padding: "3px 0" }}>
                                                <div className='title-price col-6' style={{ color: "black", fontWeight: "500" }} >KHÁCH PHẢI TRẢ</div>
                                                <span className='col-6' style={{ textAlign: "end", color: "red", fontSize: "22px" }}>{format(Number(listItemCart.info_cart?.total_final))}</span>
                                            </div>
                                            <div className='row' style={{ padding: "10px 0" }}>
                                                <div className='title-price col-8' style={{ color: "black", fontWeight: "500" }}>Tiền khách đưa</div>
                                                <input type="text" name="import_price" id="import_prices" class=" col-4"  value={this.state.priceCustomer}
                                                    style={{ height: "28px", width: "100px", textAlign: "right", border: 0, borderRadius: 0, borderBottom: "1px solid rgb(128 128 128 / 71%)", fontSize: "22px" }} onChange={this.handChange} ></input>
                                            </div>
                                            {formatNumber(priceCustomer) >1000?                                            <div className='wrap-recomment' style={{ display: "flex", flexDirection: "column",margin:"10px 0" }}>
                                                <div className='clo-1' style={{display:"flex",justifyContent:'space-between',marginBottom:"10px",flexWrap:"wrap"}}>
                                                    <div className={this.state.selectPrice === 1 ? "activesss item-recomment" : 'item-recomment'} onClick={() =>this.handleActive(1,10000)}>10000</div>
                                                    <div className={this.state.selectPrice === 2 ? "activesss item-recomment" : 'item-recomment'} onClick={() =>this.handleActive(2,20000)} >20000</div>
                                                    <div className={this.state.selectPrice === 3 ? "activesss item-recomment" : 'item-recomment'} onClick={() =>this.handleActive(3,50000)} >50000</div>
                                                </div>
                                                <div className='clo-2' style={{display:"flex",justifyContent:'space-between',flexWrap:"wrap"}}>
                                                    <div className={this.state.selectPrice === 4 ? "activesss item-recomment" : 'item-recomment'} onClick={() =>this.handleActive(4,100000)} >100000</div>
                                                    <div className={this.state.selectPrice === 5 ? "activesss item-recomment" : 'item-recomment'} onClick={() =>this.handleActive(5,200000)} >200000</div>
                                                    <div className={this.state.selectPrice === 6 ? "activesss item-recomment" : 'item-recomment'} onClick={() =>this.handleActive(6,500000)} >500000</div>
                                                </div>
                                            </div>:""}


                                            <div className='row' style={{ borderTop: "1px solid #80808045", padding: "10px 0" }} >
                                                <div className='title-price col-6' style={{ color: "black", fontWeight: "500" }}>Tiền thừa trả khách</div>
                                                <span className='col-6' style={{ textAlign: "end", fontSize: "22px" }}>{format(Number(formatNumber(this.state.priceCustomer) - listItemCart.info_cart?.total_final))}</span>
                                            </div>
                                            <div class="form-group" style={{ position: "relative" }} >
                                                <i class='fas fa-pencil-alt' style={{ position: "absolute", top: "11px", left: "6px" }}></i>
                                                <input class="form-control" rows="5" id="comment" placeholder='Thêm ghi chú' style={{ paddingLeft: "30px", border: 0, borderRadius: 0, borderBottom: "2px solid gray" }} value={this.state.note} onChange={this.onChanges}></input>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div className='wrap-buttom' style={{ display: "flex", justifyContent: "space-between", margin: "10px 0" }} >
                                    <span className='pay-methor' style={{ width: "39%", padding: "25px", textAlign: "center", background: "#213fac4a", color: "black", borderRadius: "5px", cursor: "pointer" }} data-toggle="modal" data-target="#modalPayment">Phương thức thanh toán</span>
                                    <button className='btn btn-success' style={{ width: "50%", fontSize: "20px" }} onClick={this.handlePayment}>Thanh toán</button>
                                </div>

                            </div>
                        </div>
                        <ModalDetail modal={this.state.infoProduct} handleCallbackPushProduct={this.handleCallbackPushProduct} />
                        <PertionInfo store_code={store_code} listPertion={listPertion} handleCallbackPertion={this.handleCallbackPertion} />
                        <ModalDiscount handleCallbackDiscount={this.handleCallbackDiscount} />
                        <ModalPayment handleCallbackChoosePayment={this.handleCallbackChoosePayment} />
                        <ModalUser handleCallbackUser={this.handleCallbackUser} />
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
        listItemCart: state.posReducers.pos_reducer.listItemCart,
        listPertion: state.orderReducers.order_product.listPertion,
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
        paymentOrderPos: (store_code, branch_id, id_cart, data) => {
            dispatch(posAction.paymentOrderPos(store_code, branch_id, id_cart, data))
        },
        fetchVoucher: (store_code, branch_id, id_cart, data) => {
            dispatch(posAction.fetchVoucher(store_code, branch_id, id_cart, data))
        }

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostOrder)
