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


class PostOrder extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modalUpdateCart:{
                name:"",
                phone_number:"",
            },
            modalUpdateDiscount:{
                txtDiscount:0,
                code:""
            },
            note:"",
            listPosItem:[],
            idCart:"",
            payment_method:0,
            priceCustomer:0,
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
        this.props.fetchAllProductV2(this.props.match.params.store_code, branch_id);
        this.props.fetchAllPertion(this.props.match.params.store_code)
    }
    handleCallbackProduct = (modal) => {
        this.setState(
            {
                infoProduct: modal
            })
    }
    onChanges = (e) =>{
        this.setState({note:e.target.value})
    }
    handleCallbackChoosePayment = (modal) =>{
        this.setState({payment_method:modal})
    }
    handleCallbackPushProduct = (modal) => {
        this.setState({listPosItem:modal})
    }
    handleCallbackTab = (modal) =>{
        console.log("modal",modal)
        this.setState({idCart:modal})
    }
    handleCallbackPertion = (modal) =>{
        this.setState({modalUpdateCart:modal})
    }
    handleCallbackDiscount = (modal) =>{
        this.setState({modalUpdateDiscount:modal})
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
    handlePayment = () =>{
        const branch_id = localStorage.getItem("branch_id")
        const {store_code} = this.props.match.params
        const data = {
            payment_method: this.state.payment_method,
            amount_money: formatNumber(this.state.priceCustomer)
        }
        this.props.paymentOrderPos(store_code,branch_id,this.state.idCart,data)
        this.setState({priceCustomer:0,
            modalUpdateCart:{
                name:"",
                phone_number:""
            }
        })
    }


    shouldComponentUpdate(nextProps, nextState) {
        if (!shallowEqual(nextState.listPosItem, this.state.listPosItem)) {
            const formData = {
                product_id: nextState.listPosItem.product_id,
                quantity:1,
                distribute_name:nextState.listPosItem.nameDistribute,
                element_distribute_name: nextState.listPosItem.nameElement,
                sub_element_distribute_name:nextState.listPosItem.nameSubDistribute
            }
            var { store_code } = this.props.match.params;
            const branch_id = localStorage.getItem("branch_id")
            const id = nextState.idCart
            this.props.addProductInCart(store_code,branch_id,id,formData)
        }
        if(!shallowEqual(nextState.idCart,this.state.idCart)){
            const branch_id = localStorage.getItem("branch_id")
            const id = nextState.idCart
            this.props.fetchInfoOneCart(this.props.match.params.store_code,branch_id,id)
            this.setState({
                priceCustomer:0,
                modalUpdateDiscount:{
                    code:""
                }
            })
        }
        if(!shallowEqual(nextState.modalUpdateCart,this.state.modalUpdateCart) || !shallowEqual(nextState.modalUpdateDiscount,this.state.modalUpdateDiscount) ){
            const branch_id = localStorage.getItem("branch_id")
            const {store_code} = this.props.match.params
            const formData = {
                customer_name:nextState.modalUpdateCart.name,
                customer_phone:nextState.modalUpdateCart.phone_number,
                discount: formatNumber(nextState.modalUpdateDiscount.txtDiscount) ,
                code_voucher:nextState.modalUpdateDiscount.code,
                name:"Giỏ hàng"
            }
            this.props.updateInfoCart(store_code,branch_id,nextState.idCart,formData)
        }
        if(!shallowEqual(nextState.modalUpdateDiscount.code,this.state.modalUpdateDiscount.code)){
            const branch_id = localStorage.getItem("branch_id")
            const id = nextState.idCart
            const data = {
                code_voucher: nextState.modalUpdateDiscount.code
            }
            this.props.fetchVoucher(this.props.match.params.store_code,branch_id,id,data)

        }

        return true
      }

    render() {
        var { store_code } = this.props.match.params
        var {listItemCart,listPertion} = this.props
        var {code} = this.state.modalUpdateDiscount
        return (
            <React.Fragment>
                <div>
                    <Topbar store_code = {store_code} handleCallbackTab = {this.handleCallbackTab}/>
                    <div>
                        <div className="row-post">

                            <div className='col-list-pos' >
                                <div className='col-list-order'>
                                    <div className='' style={{padding:"8px"}}>
                                        {listItemCart?.info_cart?.line_items.length > 0? 
                                        <ListItemInCart store_code = {store_code} listItemPos = {listItemCart} />:
                                        <div className='product-pos' style={{textAlign:"center",color:"gray",margin:"30px 0",fontSize:"20px"}}>
                                            <i className='fas fa-fw fa-boxes fa-5x '></i>
                                            <div className='title-list-pos'>
                                                Đơn hàng của bạn chưa có sản phẩm nào
                                            </div>
                                        </div>
                                        }
                                        
                                    </div>

                                </div>
                                
                                <div className='col-list-product' style={{borderRadius: "0" }}>

                                    <div className='card-pos-body' style={{ overflow: "hidden" }}>
                                        <CardProduct store_code={store_code} handleCallbackProduct={this.handleCallbackProduct} />
                                    </div>                                                                                                                         
                                </div>

                            </div>

                            <div className='row-payman'>
                                <div className=''>
                                    <div className='' style={{ padding: "0" }}>
                                    <div class="mb-6" style={{marginTop:"10px",display:"flex"}}>
                                                <input style={{marginRight:"10px"}} type="text" name="name" value={this.state.modalUpdateCart.name} onChange={this.handleOnChange} class="form-control" placeholder="Tên"/> 
                                                <input style={{marginRight:"10px"}} type="text" name="phone_number" value={this.state.modalUpdateCart.phone_number} onChange={this.handleOnChange} class="form-control" placeholder="Số điện thoại"/>                                        
                                                <div class="input-group-append">
                                                    <button class="btn btn-primary" type="submit" data-toggle="modal" data-target="#modalPertion" ><i class="fas fa-user"></i></button>
                                                </div>
                                            </div>
                                    </div>
                                    <div className="">
                                        <div className='price-info' style={{ margin: "10px 0px", fontSize: "17px" }}>
                                            <div className='row' style={{padding:"10px 0"}}>
                                                <div className='title-price col-6'>Tổng tiền</div>
                                                <span className='col-6' style={{ textAlign: "end" }}>{format(Number(listItemCart.info_cart?.total_before_discount))}</span>
                                            </div>
                                            <div className='row' style={{padding:"10px 0"}}>
                                                <div className='title-price col-6'>VAT</div>
                                                <span className='col-6' style={{ textAlign: "end" }}>{format(Number(0))}</span>
                                            </div>
                                            <div className='row' style={{padding:"10px 0"}}>
                                                <div className='title-price col-8'>Chiết khấu</div>
                                                <input type="text" name="import_price" class=" col-4" id="usr" value={format(Number(listItemCart.info_cart?.discount))} 
                                                style={{height: "28px", width: "100px",textAlign:"right", border:0,borderRadius:0,borderBottom:"2px solid gray"}}  data-toggle="modal" data-target="#modalDiscount" ></input>
                                            </div>
                                            <div className='row' style={{padding:"10px 0"}}>
                                                <div className='title-price col-6' >Voucher</div>
                                                <span className='col-6' style={{ textAlign: "end",color:"black",fontSize:"13px" }}>{code ? code: "Không có voucher"}</span>
                                            </div>
                                            <div className='row' style={{padding:"10px 0"}}>
                                                <div className='title-price col-6' >Khách phải trả</div>
                                                <span className='col-6' style={{ textAlign: "end",color:"red" }}>{format(Number(listItemCart.info_cart?.total_final))}</span>
                                            </div>
                                            <div className='row' style={{marginBottom:"60px",padding:"10px 0"}}>
                                                <div className='title-price col-8'>Tiền khách đưa</div>
                                                <input type="text" name="import_price" class=" col-4" id="usr" value={this.state.priceCustomer}
                                                style={{height: "28px", width: "100px",textAlign:"right", border:0,borderRadius:0,borderBottom:"2px solid gray"}} onChange ={this.handChange} ></input>
                                            </div>
                                            <div className='row' style={{borderTop: "1px solid #80808045",padding:"10px 0"}} >
                                                <div className='title-price col-6'>Tiền thừa trả khách</div>
                                                <span className='col-6' style={{ textAlign: "end" }}>{format(Number(formatNumber(this.state.priceCustomer) - listItemCart.info_cart?.total_final))}</span>
                                            </div>
                                            <div class="form-group" >
                                                <label for="comment">Thêm ghi chú:</label>
                                                <textarea class="form-control" rows="5" id="comment" style={{ height: "50px" }} value={this.state.note} onChange={this.onChanges}></textarea>
                                            </div>
                                            <div className='wrap-buttom'style={{display:"flex",justifyContent:"space-between",marginTop:"20px"}} >
                                                <span className='pay-methor' style={{width:"39%",padding:"5px",textAlign:"center",background:"#213fac4a", color:"black", borderRadius:"5px",cursor:"pointer"}} data-toggle="modal" data-target="#modalPayment">Phương thức thanh toán</span>
                                                <button className='btn btn-success' style={{width:"50%",fontSize: "20px" }} onClick={this.handlePayment}>Thanh toán</button>
                                            </div>
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <ModalDetail modal={this.state.infoProduct} handleCallbackPushProduct={this.handleCallbackPushProduct} />
                        <PertionInfo store_code ={store_code} listPertion={listPertion} handleCallbackPertion = {this.handleCallbackPertion}/>
                        <ModalDiscount handleCallbackDiscount = {this.handleCallbackDiscount}/>
                        <ModalPayment handleCallbackChoosePayment = {this.handleCallbackChoosePayment}/>

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

        addProductInCart:(store_code,branch_id,id_cart,data) =>{
            dispatch(posAction.addProductInCart(store_code,branch_id,id_cart,data))
        },

        fetchInfoOneCart:(store_code, branch_id,id) =>{
            dispatch(posAction.fetchInfoOneCart(store_code,branch_id,id))
        },
        fetchAllPertion: (store_code) =>{
            dispatch(OrderAction.fetchAllPertion(store_code))
        },

        updateInfoCart:(store_code,branch_id,id_cart,data) =>{
            dispatch(posAction.updateInfoCart(store_code,branch_id,id_cart,data))
        },
        paymentOrderPos:(store_code,branch_id,id_cart,data) =>{
            dispatch(posAction.paymentOrderPos(store_code,branch_id,id_cart,data))
        },
        fetchVoucher:(store_code,branch_id,id_cart,data) =>{
            dispatch(posAction.fetchVoucher(store_code,branch_id,id_cart,data))
        }

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostOrder)
