import React, { Component } from 'react'
import { format } from '../../ultis/helpers'
import { maxQuantityInPos } from '../../ultis/productUltis'
import { shallowEqual } from '../../ultis/shallowEqual'
import * as Types from "../../constants/ActionType";
import * as OrderAction from '../../actions/add_order';
import { connect } from 'react-redux';
class ItemInCart extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentQuantity: 1,
            distribute:"",
            maxQuantityDistribute:""

        }
        this.nameElementDistribute = ""
        this.nameSubElementDistribute =""
    }
    componentWillReceiveProps(nextProps) {
        console.log("nextProps", nextProps)
        if (!shallowEqual(this.props.item.quantity, nextProps.item.quantity)) {
            this.setState({ currentQuantity: nextProps.item.quantity })
        }
    }

    componentDidMount() {
        this.setState({ 
            currentQuantity: this.props.item.quantity,
            distribute: this.props.item.product.distributes,
        })
        if(this.props.item.distributes_selected){
            // this.nameElementDistribute = this.props.item.distributes_selected[0].value
            // this.nameSubElementDistribute =this.props.item.distributes_selected[0].sub_element_distributes

        }

    }

    subQuantity(idCart,id, productId, quantity, distribute) {
        const q = quantity - 1 < 1 ? 1 : quantity - 1
        this.setState({
            currentQuantity: q
        })
        this.props.subQuantity(idCart,id, productId, q, distribute)
    }

    addQuantity(idCart, productId,lineItemId, quantity, distribute,quantityInStock) {
        
        if(this.props.item.distributes_selected !== null&&this.props.item.distributes_selected.length >0){
            
            this.nameElementDistribute = this.props.item.distributes_selected[0].value 
            this.nameSubElementDistribute =this.props.item.distributes_selected[0].sub_element_distributes
            var maxQuantity = maxQuantityInPos(this.props.item.product,this.nameElementDistribute,this.nameSubElementDistribute)
            if(quantity < maxQuantity ){
            
                const q = quantity + 1
                this.setState({
                    currentQuantity: q 
                })
                this.props.addQuantity(idCart, productId,lineItemId, q, distribute) 
                return
            }
            if(quantity >=maxQuantity){
                this.props.showAlertMaxQuantity()
                return
            }
        }else{
            if(quantityInStock ===-1){
                const q = quantity + 1
                this.setState({
                    currentQuantity: q 
                })
                this.props.addQuantity(idCart, productId,lineItemId, q, distribute) 
                return
            }
            
            if(quantity < quantityInStock){
                const q = quantity + 1
                this.setState({
                    currentQuantity: q 
                })
                this.props.addQuantity(idCart, productId,lineItemId, q, distribute) 
                return
            }
            if(quantity >=quantityInStock){
                this.props.showAlertMaxQuantity()
                return
            }
        }
        


    }
    handleOnChange = (e) => {
        const quantity = e.target.value
        const quantityInStock = this.props.item.product.quantity_in_stock
        if(this.props.item.distributes_selected){
            this.nameElementDistribute = this.props.item.distributes_selected[0].value 
            this.nameSubElementDistribute =this.props.item.distributes_selected[0].sub_element_distributes
            var maxQuantity = maxQuantityInPos(this.props.item.product,this.nameElementDistribute,this.nameSubElementDistribute)
            if(quantity < maxQuantity){
            
                const q = quantity
                this.setState({
                    currentQuantity: q 
                })
                this.props.addQuantity(this.props.item.id, this.props.item.product.id, q, this.props.item.distributes_selected) 
                return
            }
            if(quantity >maxQuantity){
                this.setState({
                    currentQuantity: maxQuantity
                })
                this.props.addQuantity(this.props.item.id, this.props.item.product.id, maxQuantity, this.props.item.distributes_selected)
                this.props.showAlertMaxQuantity()
                return
            }
        }else{
            if(quantityInStock ===-1){
                console.log("helllo 1")
                const q = quantity
                this.setState({
                    currentQuantity: q 
                })
                this.props.addQuantity(this.props.item.id, this.props.item.product.id, q, this.props.item.distributes_selected) 
                return
            }
            if(quantity < quantityInStock){
                console.log("helllo 2")
                const q = quantity
                this.setState({
                    currentQuantity: q 
                })
                this.props.addQuantity(this.props.item.id, this.props.item.product.id, q, this.props.item.distributes_selected) 
                return
            }
            if(quantity >quantityInStock){
                this.setState({
                    currentQuantity: quantityInStock
                })
                this.props.addQuantity(this.props.item.id, this.props.item.product.id, quantityInStock, this.props.item.distributes_selected)
                this.props.showAlertMaxQuantity()
                return
            }
        }

    }
    handleDelete = (idCart, productId,lineId,distribute) => {
        this.props.handleDelete(idCart, productId,lineId,distribute)
    }
    render() {
        const { item,index } = this.props
        const { currentQuantity } = this.state
        return (
            <div class="card" style={{marginBottom:"10px"}} key ={index}>
            <div class="card-body" style={{padding:"0"}}>
                <div className='wrap-item' style={{ display: "flex", fontWeight: "bold", justifyContent: 'space-between',alignItems:"center" }}>
                    <div className='index'>{index}</div>
                    <div className='name-product'>{item.product.name}</div>
                    <div className='col-6' style={{ paddingLeft: "0" }}>
                        <div className="" style={{ float: "right", border: "1px solid #9c9898ba", borderRadius: "2px" }}>
                            <button className='btn-sub' onClick={() => this.subQuantity(item.list_cart_id,item.id, item.product.id, currentQuantity, item.distributes_selected)} style={{ width: "20px", border: "none" }}>-</button>
                            <input className='input-quantity' onChange={this.handleOnChange} style={{ width: "40px", textAlign: "center" }} value={currentQuantity}></input>
                            <button className='btn-add' onClick={() => this.addQuantity(item.list_cart_id, item.product.id,item.id, currentQuantity, item.distributes_selected,item.product.quantity_in_stock)} style={{ width: "20px", border: "none" }}>+</button>
                        </div>
                    </div>
                    <div className='cost'>{format(Number(item.item_price))}</div>
                    <div className='total-price'>{ format(Number(item.item_price * currentQuantity))}</div>
                    <i className='fa fa-trash' onClick={() => this.handleDelete(item.list_cart_id, item.product.id,item.id, item.distributes_selected)}></i>
                </div>
            </div>
        </div>
        )
    }
}
const mapDispatchToProps =(dispatch,props) =>{
    return {
        showAlertMaxQuantity: () =>{
            dispatch(OrderAction.showAlertMaxQuantity())
        }
    }
}
export default connect(null,mapDispatchToProps) (ItemInCart);
