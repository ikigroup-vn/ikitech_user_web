import React, { Component } from 'react'
import { shallowEqual } from '../../ultis/shallowEqual'

class ItemInventory extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentQuantity: 1,
            distribute: "",
            maxQuantityDistribute: "",
            deviant:0,
            item:[]

        }
        this.nameElementDistribute = ""
        this.nameSubElementDistribute = ""
    }
    componentWillReceiveProps(nextProps) {
        console.log("nextProps", nextProps)
        if (!shallowEqual(this.props.item.quantity, nextProps.item.quantity)) {
            this.setState({ currentQuantity: nextProps.item.quantity })
        }

    }
    shouldComponentUpdate(nextProps,nextState){
        if(!shallowEqual(this.state.currentQuantity,nextState.currentQuantity)){
            this.props.handleCallbackQuantity({currentQuantity:nextState.currentQuantity})
        }
        return true
    }
    componentDidMount =()=>{

        this.setState({item:this.props.item,deviant:this.props.item.stock-1})
    }

    subQuantity() {
        const q = this.state.currentQuantity - 1 < 1 ? 1 : this.state.currentQuantity - 1
        const d = this.props.item.stock - q
        this.setState({
            currentQuantity: q,
            deviant: d
        })
    }

    addQuantity() {
        const q = this.state.currentQuantity +1
        const d = this.props.item.stock - q
        this.setState({currentQuantity:q,deviant:d})
    }
    handleOnChange = (e) => {


    }
    handleDelete = (id, productId) => {
        this.props.handleDelete(id, productId)
    }
    render() {
        const { currentQuantity,deviant,item } = this.state
        return (
            <div className='list-group-item'style={{zIndex:"1"}}>
                <div className='row' style={{position: "relative", width: "100%", margin: "0" }}>
                    <div className='col-8' style={{ padding: "0px" }}>
                        <div className='wrap-name' >
                            <div style={{ display: "flex" }}>
                                <div className='price-order' style={{ color: "gray", marginRight:"5px" }}>Tên:</div>
                                <div className='name-order'>{item.nameProduct}</div>
                            </div>

                            <div style={{ display: "flex" }}>
                                <div className='price-order' style={{ color: "gray", marginRight:"5px" }}>Mã SKU:</div>
                                <div className='code-sku'>6437434</div>
                            </div>
                        </div>
                    </div>
                    <div className='col-4' style={{ paddingLeft: "0" }}>
                        <div className="" style={{ float: "right", border: "1px solid #9c9898ba", borderRadius: "2px" }}>
                            <button className='btn-sub' onClick={() => this.subQuantity()} style={{ width: "20px", border: "none" }}>-</button>
                            <input className='input-quantity' onChange={this.handleOnChange} style={{ width: "40px", textAlign: "center" }} value={currentQuantity}></input>
                            <button className='btn-add' onClick={() => this.addQuantity()} style={{ width: "20px", border: "none" }}>+</button>
                        </div>
                    </div>
                    <a
                        style={{ position: "absolute", right: "-16px", top: "-14px", color: "red" }}
                        onClick={() => this.handleDelete(item.id, item.product.id)}
                    >
                        <i class="fas fa-close close-status "></i>
                    </a>

                </div>
                <div className='wrap-iventory' style={{ display: "flex", justifyContent: "space-between" }}>
                    <div className='exist-branch' style={{ display: "flex", justifyContent: "space-between" }} >
                        <span style={{ color: "gray" }}>Tồn chi nhánh:</span>
                        <div style={{ marginLeft: "5px", fontWeight: "bold" }}>{item.stock}</div>
                    </div>
                    <div className='reality-branch' style={{ display: "flex", justifyContent: "space-between" }}>
                        <span style={{ color: "gray" }} >Chênh lệch:</span>
                        <div style={{ marginLeft: "5px", color: "red" }}>{deviant}</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ItemInventory;
