import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as OrderAction from '../../actions/add_order'
import * as Env from "../../ultis/default"
import { filter_arr, format } from '../../ultis/helpers'

class CardProduct extends Component {
    constructor(props) {
        super(props)
        this.state = {
            product_id: "",
            isToggle:false
        }
    }
    handleInfoProduct = (inventory, id, name, image, price, distributes, maxPrice, minPrice, priceDiscount, quayntity, quantityDistribute) => {   
        if (distributes.length > 0) {
            this.setState({ isToggle: true })
            this.props.handleCallbackProduct({
                inventoryProduct: inventory, idProduct: id, nameProduct: name, imageProduct: image,
                priceProduct: price, distributeProduct: distributes,
                minPriceProduct: minPrice, maxPriceProduct: maxPrice, discountProduct: priceDiscount,
                quantityProduct: quayntity,
                quantityProductWithDistribute: quantityDistribute
            })   
        }else{
            this.setState({ isToggle: false })
            this.props.handleCallbackPushProduct({
                nameProduct: name,
                element_id: "",
                product_id: id,
                reality_exist: 0, nameDistribute: "",
                nameElement: "",
                nameSubDistribute: "",
                priceProduct:price,
                stock: quayntity
            })
        }

    }
    showProduct = (products) => {
        var result = null;
        if (products.length > 0) {
            result = products.map((data, index) => {
                return (
                    <div class="col-sm-2" style={{ marginBottom: "10px" }}>
                        <a data-toggle={this.state.isToggle ? "modal" : ""} data-target="#modalDetail" onClick={() => this.handleInfoProduct(data.inventory, data.id, data.name, data.images, data.price, data.distributes, data.max_price, data.min_price, data.product_discount, data.quantity_in_stock, data.quantity_in_stock_with_distribute)}>
                            <div class="card card-product-pos" style={{border:"1px solid rgb(128 128 128 / 30%)",padding:"0"}}>
                                <img src={data.images.length > 0 ? data.images[0].image_url : Env.IMG_NOT_FOUND_2} className="img-responsive" alt="Image" width="100%" height="100px" style={{borderRadius:"2%"}} />
                                <div class="card-body" style={{ padding: ' 0 5px' }}>
                                    <p class="card-title" style={{ margin: '0', overflow: "hidden", whiteSpace: "nowrap", textOverflow: 'ellipsis' }}>{data.name}</p>
                                    <p class="card-text" style={{ fontSize: "12px", bottom: "37px",fontWeight:"bold",color:"rgb(174, 61, 52)",textAlign:"end" }}>{
                                       data.min_price == data.max_price? format(Number(data.min_price)):`${format(Number(data.min_price))}- ${format(Number(data.max_price))}`}</p>
                                </div>
                            </div>
                        </a>
                    </div>
                )
            })
        } else {
            return result;
        }
        return result;
    }
    render() {
        var { products } = this.props
        var listProducts = filter_arr(products.data)
        return (
            <div className='show-product' style={{ overflow: "hidden", overflowY: "auto" }}>
                <div className='row'>
                    {this.showProduct(listProducts)}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        products: state.productReducers.product.allProduct,
    };
};
const mapDispatchToProps = (dispatch, props) => {
    return {
        createOrder: (store_code, data) => {
            dispatch(OrderAction.createOrder(store_code, data))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CardProduct);