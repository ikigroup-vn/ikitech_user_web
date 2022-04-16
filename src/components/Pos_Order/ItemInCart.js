import React, { Component } from 'react'
import { format } from '../../ultis/helpers'
import { stockOfProduct } from '../../ultis/productUltis'
import { shallowEqual } from '../../ultis/shallowEqual'
import * as OrderAction from '../../actions/add_order';
import { connect } from 'react-redux';
import { debounce } from 'lodash'

class ItemInCart extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentQuantity: 1,
            distribute: "",
            maxQuantityDistribute: ""

        }
        this.nameElementDistribute = ""
        this.nameSubElementDistribute = ""

        this.changeQuantity = debounce(this.handleChangeQuantity, 400)
    }

    handleChangeQuantity = (quantity) => {
        this.props.addQuantity(this.props.item.product.id, this.props.item.id, quantity, this.props.item.distributes_selected)
    }


    componentWillReceiveProps(nextProps) {
        if (!shallowEqual(this.props.item.quantity, nextProps.item.quantity)) {
            this.setState({ currentQuantity: nextProps.item.quantity })
        }

        if (!shallowEqual(this.state.currentQuantity, nextProps.item.quantity)) {
            this.setState({ currentQuantity: nextProps.item.quantity })
        }
    }

    componentDidMount() {
        this.setState({
            currentQuantity: this.props.item.quantity,
            distribute: this.props.item.product.distributes,
        })

    }

    subQuantity(idCart, id, productId, quantity, distribute) {
        const q = quantity - 1 < 1 ? 1 : quantity - 1
        this.setState({
            currentQuantity: q
        })
        this.changeQuantity(q)
    }

    addQuantity(productId, lineItemId, quantity, distribute, quantityInStock) {

        if (this.props.item.distributes_selected !== null && this.props.item.distributes_selected.length > 0) {
            const q = quantity + 1
            this.setState({
                currentQuantity: q
            })
            this.changeQuantity(q)
        } else {
            const q = quantity + 1
            this.setState({
                currentQuantity: q
            })
            this.changeQuantity(q)
        }



    }
    handleOnChange = (e) => {
        const quantity = e.target.value

        this.changeQuantity(quantity)

        if (this.props.item.distributes_selected !== null && this.props.item.distributes_selected.length > 0) {
            const q = quantity
            this.setState({
                currentQuantity: q
            })
            return
        } else {
            const q = quantity
            this.setState({
                currentQuantity: q
            })
        }

    }
    handleDelete = (idCart, productId, lineId, distribute) => {
        this.props.handleDelete(idCart, productId, lineId, distribute)
    }
    render() {
        const { item, index } = this.props
        const { currentQuantity } = this.state

        const maxQuantity = stockOfProduct(item.product, item.distributes_selected[0]?.value, item.distributes_selected[0]?.sub_element_distributes)
        const allowAdd = true

        return (
            <div class="card card-item-pos" style={{ marginBottom: "10px" }} key={index}>
                <div class="card-body" style={{ padding: "0", position: "relative" }}>
                    <div className='wrap-item' style={{ display: "flex", fontSize: "1rem", justifyContent: 'space-between', alignItems: "center" }}>
                        <div className='index'>{index + 1}</div>
                        <div className='info-product' style={{ width: "40%", fontWeight: "400", display: "flex", flexDirection: "column" }}>
                            <div className='name-product' style={{ overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>{item.product.name}</div>
                            <div className='wrap-distributes_selected' style={{ fontSize: "12px", fontStyle: "italic" }}>
                                {(item.distributes_selected ?? []).map((v, i) => (
                                    <div>{`${v.name}: ${v.value}`}</div>
                                ))}
                                {item.distributes_selected &&
                                    item.distributes_selected.length > 0 ?
                                    item.distributes_selected[0] &&
                                    item.product.distributes[0].sub_element_distribute_name &&
                                    item.distributes_selected[0].sub_element_distributes && (
                                        <div>
                                            {`${item.product.distributes[0].sub_element_distribute_name}: 
                                            ${item.distributes_selected[0].sub_element_distributes}`}
                                        </div>
                                    ) : "Mặc định"}

                            </div>
                        </div>

                        <div className='quantity' style={{ paddingLeft: "0" }}>
                            <div className="" style={{ float: "right", border: "1px solid #9c9898ba", borderRadius: "2px" }}>
                                <button className='btn-sub' onClick={() => this.subQuantity(item.list_cart_id, item.id, item.product.id, currentQuantity, item.distributes_selected)} style={{ width: "20px", border: "none" }}>-</button>
                                <input className='input-quantity' onChange={this.handleOnChange} style={{ width: "40px", textAlign: "center", fontWeight: "400" }} value={currentQuantity}></input>
                                <button disabled={!allowAdd} className='btn-add' onClick={() => this.addQuantity(item.product.id, item.id, currentQuantity, item.distributes_selected, item.product.quantity_in_stock)} style={{ width: "20px", border: "none" }}>+</button>
                            </div>
                        </div>
                        <div className='cost' style={{ width: "10%", fontWeight: "400" }}>{format(Number(item.item_price))}</div>
                        <div className='total-price' style={{ width: "13%", fontWeight: "500" }}>{format(Number(item.item_price * currentQuantity))}</div>

                    </div>
                    <i className='fa fa-trash' style={{ position: "absolute", right: "0", top: "15px" }} onClick={() => this.handleDelete(item.list_cart_id, item.product.id, item.id, item.distributes_selected)}></i>
                </div>
            </div>
        )
    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        showAlertMaxQuantity: () => {
            dispatch(OrderAction.showAlertMaxQuantity())
        }
    }
}
export default connect(null, mapDispatchToProps)(ItemInCart);
