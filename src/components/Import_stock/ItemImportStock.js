import React, { Component } from 'react'
import { format } from '../../ultis/helpers'
import { shallowEqual } from '../../ultis/shallowEqual'

class ItemImportStock extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentQuantity: 0,
            distribute: "",
            item: ""

        }
        this.nameElementDistribute = ""
        this.nameSubElementDistribute = ""
    }
    componentWillReceiveProps(nextProps) {
        if (!shallowEqual(this.props.item.quantity, nextProps.item.quantity)) {
            this.setState({ currentQuantity: nextProps.item.quantity, item: nextProps.item })
        }

    }
    shouldComponentUpdate(nextProps, nextState) {
        const elementId = nextProps.item.element_id
        if (!shallowEqual(this.state.currentQuantity, nextState.currentQuantity)) {
            this.props.handleCallbackQuantity({ currentQuantity: nextState.currentQuantity, idElement: elementId })
        }

        if (!shallowEqual(this.state.item, nextState.item)) {
            this.setState({ currentQuantity: nextState.item.reality_exist })
        }
        if (!shallowEqual(this.state.currentQuantity, nextProps.item.reality_exist)) {
            this.setState({ currentQuantity: nextProps.item.reality_exist })
        }
        return true
    }
    componentDidMount = () => {

        this.setState({ item: this.props.item })
    }

    subQuantity() {
        const q = this.state.currentQuantity - 1 < 0 ? 0 : this.state.currentQuantity - 1
        this.setState({
            currentQuantity: q
        })
    }

    addQuantity() {
        const q = this.state.currentQuantity + 1
        this.setState({ currentQuantity: q })
    }
    handleDelete(id) {
        this.props.handleDelete({ idElement: id })
    }
    handleOnChange = (e) => {
        this.setState({ currentQuantity: e.target.value })
    }

    render() {
        const { currentQuantity } = this.state

        const { item, index } = this.props
        return (
            <div className='list-group-item' key={index} style={{ marginBottom: "10px", borderTopWidth: "1px", borderRadius: "7px" }}>
                <div className='row' style={{ position: "relative", width: "100%", margin: "0" }}>
                    <div className='col-8' style={{ padding: "0px" }}>
                        <div className='wrap-name' >
                            <div style={{ display: "flex" }}>
                                <div className='price-order' style={{ color: "gray", marginRight: "5px" }}>Tên:</div>
                                <div className='name-order'>{item.nameProduct}</div>
                            </div>
                            {item.nameElement || item.nameSubDistribute ?
                                <div style={{ display: "flex" }}>
                                    <div className='price-order' style={{ color: "gray", marginRight: "5px" }}>Phân loại:</div>
                                    <div className='name-order'>{item.nameElement ? `${item.nameElement} ` : ""}{item.nameSubDistribute ? item.nameSubDistribute : ""}</div>
                                </div> : ""
                            }

                            <div style={{ display: "flex" }}>
                                <div className='price-order' style={{ color: "gray", marginRight: "5px" }}>Giá tiền:</div>
                                <div className='name-order' style={{ color: "red" }}>{format(Number(item.priceProduct))}</div>
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
                        onClick={() => this.handleDelete(item.element_id)}
                    >
                        <i class="fas fa-close close-status "></i>
                    </a>
                </div>
            </div>
        )
    }
}

export default ItemImportStock;
