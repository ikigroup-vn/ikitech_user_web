import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { format, formatNumber } from '../../ultis/helpers'
import * as inventoryAction from '../../actions/inventory'
import { connect } from 'react-redux';
import HistoryStock from './HistoryStock';
import * as Env from "../../ultis/default"
class ShowData extends Component {
    constructor(props) {
        super(props)
        this.state = {
            show_item: true
        }
    }

    handleEditStockElement = (element, distribute) => {
        this.props.handleCallBackElement({
            element: element, idProduct: this.props.data.id, NameDistribute: distribute
        })
    }
    handleEditSubElement = (subElement, element, distribute) => {
        this.props.handleCallBackSubElement({
            SubElement: subElement.name, NameElement: element, idProduct: this.props.data.id, NameDistribute: distribute
        })
    }
    handleEditStockProduct = (data) => {
        this.props.handleCallBackProduct({ data, time: Date() })
    }
    historyInventorys = (subElement, element, nameDistribute) => {
        const branch_id = localStorage.getItem("branch_id")
        const { store_code } = this.props
        const formData = {
            product_id: this.props.data.id,
            distribute_name: nameDistribute,
            element_distribute_name: element,
            sub_element_distribute_name: subElement.name
        }
        this.props.historyInventorys(store_code, branch_id, formData)
    }
    historyInventory = (element, nameDistribute) => {
        const branch_id = localStorage.getItem("branch_id")
        const { store_code } = this.props
        const formData = {
            product_id: this.props.data.id,
            distribute_name: nameDistribute,
            element_distribute_name: element.name,
            sub_element_distribute_name: ""
        }
        this.props.historyInventorys(store_code, branch_id, formData)
    }
    historyInventoryss = () => {
        const branch_id = localStorage.getItem("branch_id")
        const { store_code } = this.props
        const formData = {
            product_id: this.props.data.id,
            distribute_name: "",
            element_distribute_name: "",
            sub_element_distribute_name: ""
        }
        this.props.historyInventorys(store_code, branch_id, formData)
    }


    showDistribute = (listDistribute) => {
        var result = []
        if (typeof listDistribute == "undefined" || listDistribute.length === 0) {
            return result
        }
        if (listDistribute.element_distributes) {
            listDistribute.element_distributes.map((element, _index) => {
                if (typeof element.sub_element_distributes != "undefined") {
                    if (listDistribute.element_distributes[0].sub_element_distributes.length > 0) {
                        listDistribute.element_distributes[0].sub_element_distributes.map((sub_element, index) => {
                            const cost_of_capital = listDistribute.element_distributes[_index].sub_element_distributes[index]?.cost_of_capital
                            const stock = listDistribute.element_distributes[_index].sub_element_distributes[index]?.stock
                            result.push(
                                <div className='wrap-item' style={{ display: "flex", padding: "10px", justifyContent: "space-between" }}>
                                    <div className='item' style={{ display: "flex", width: '14%' }}>
                                        <img src={element.image_url != null ? element.image_url : Env.IMG_NOT_FOUND} alt='' width="35px" height="35px" style={{ marginLeft: "70px" }} ></img>
                                    </div>
                                    <div className='item' style={{ display: "flex", width: "33%", color: "#749fbc" }}>
                                        <label style={{ paddingLeft: '63px' }}>Phân loại: </label>
                                        <div className='name-distribute' style={{ marginLeft: "20px" }}>{element.name},{sub_element.name}</div>
                                    </div>
                                    <div className='item' style={{ display: "flex", width: "20%" }}>
                                        <div className='price-distribute' style={{ paddingLeft: '154px' }}>{format(Number(cost_of_capital))}</div>
                                    </div>
                                    <div className='item' style={{ display: "flex", width: "20%" }}>
                                        <div className='quantity-distribute' style={{ paddingLeft: '89px' }}>{stock}</div>
                                    </div>
                                    <div className='item' style={{ width: '26%',paddingLeft:"40px" }}>
                                        <a className='editStock' data-toggle="modal" style={{ paddingLeft: "10px", color: "#f68a19" }} data-target="#myModal" onClick={() => this.handleEditSubElement(listDistribute.element_distributes[_index].sub_element_distributes[index], element.name, listDistribute.name)}>Sửa kho</a>
                                        <a className='historyStock' data-toggle="modal" style={{ marginLeft: "10px", color: "#f68a19" }}
                                            data-target="#historyStock"
                                            onClick={() => this.historyInventorys(
                                                listDistribute.element_distributes[_index].sub_element_distributes[index],
                                                element.name,
                                                listDistribute.name)}>Lịch sử kho</a>
                                    </div>
                                </div>
                            )

                        })
                    }
                    else {
                        result.push(
                            <div className='wrap-item' style={{ display: "flex", padding: "10px", justifyContent: "space-between" }}>
                                <div className='item' style={{ display: "flex", width: '14%' }}>
                                    <img src={element.image_url != null ? element.image_url : Env.IMG_NOT_FOUND} alt='' width="35px" height="35px" style={{ marginLeft: "70px" }} ></img>
                                </div>
                                <div className='item' style={{ display: "flex", width: "41%", justifyContent: "start", paddingLeft: "57px", color: "#749fbc" }}>
                                    <label>Phân loại: </label>
                                    <div className='name-distribute' style={{ marginLeft: "20px" }}>{element.name}</div>
                                </div>
                                <div className='item' style={{ display: "flex", width: "17%" }}>
                                    <div className='price-distribute' style={{ marginLeft: "80px" }}>{format(Number(element.cost_of_capital))}</div>
                                </div>
                                <div className='item' style={{ display: "flex", width: "17%" }}>
                                    <div className='quantity-distribute' style={{ marginLeft: "70px" }}>{element.stock}</div>
                                </div>
                                <div className='item' style={{ width: "27%", paddingLeft: "50px" }}>
                                    <a className='editStock' data-toggle="modal" data-target="#myModal" style={{ color: "#f68a19" }} onClick={() => this.handleEditStockElement(element, listDistribute.name)}>Sửa kho</a>
                                    <a className='historyStock' data-toggle="modal" style={{ marginLeft: "10px", color: "#f68a19" }} data-target="#historyStock" onClick={() => this.historyInventory(element, listDistribute.name)}>Lịch sử kho</a>
                                </div>
                            </div>
                        )
                    }
                }
            })
        }
        return result
    }

    render() {
        const { product_discount, data, per_page, current_page, index, store_code, page, historyInventory } = this.props
        const listDistribute = data.inventory?.distributes !== null && data.inventory?.distributes.length > 0 ? data.inventory?.distributes[0] : []

        let discount_percent = null;

        if (product_discount) {
            discount_percent = product_discount.value;
        }

        return (
            <>
                <tr style={{ background: "#e3e6f04d" }}>
                    <td>{per_page * (current_page - 1) + (index + 1)}</td>
                    <td>
                        <img src={data.images.length > 0 ? data.images[0].image_url : Env.IMG_NOT_FOUND} alt='' width="40px" height="63px" style={{ width: "73%" }}></img>
                    </td>
                    <td>
                        <Link to={`/product/edit/${store_code}/${data.id}/${page}`}>
                            {data.name}
                        </Link>
                    </td>
                    {data.inventory.distributes.length === 1 ?
                        <>
                            <td></td>
                            <td></td>
                            <td></td>
                        </> :
                        <>
                            <td>
                                {format(Number(data.inventory.main_cost_of_capital))}

                            </td>
                            <td>
                                {data.inventory.main_stock}

                            </td>
                            <td>
                                <a className='editStock' data-toggle="modal" data-target="#myModal" style={{ color: "#f68a19" }} onClick={() => this.handleEditStockProduct(data)}>Sửa kho</a>
                                <a className='historyStock' data-toggle="modal" style={{ marginLeft: "10px", color: "#f68a19" }} data-target="#historyStock" onClick={() => this.historyInventoryss()}>Lịch sử kho</a>

                            </td>
                        </>
                    }




                </tr>

                <tr class={`explode ${data.inventory?.distributes.length > 0 ? "show" : "hide"}`} >
                    <td colSpan={12}>
                        <div className='show-distribute'>
                            {this.showDistribute(listDistribute)}
                        </div>
                    </td>
                </tr>
                <HistoryStock historyInventory={historyInventory} />
            </>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        historyInventory: state.inventoryReducers.inventory_reducer.historyInventory,
    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        historyInventorys: (store_code, branch_id, data) => {
            dispatch(inventoryAction.historyInventorys(store_code, branch_id, data))
        },
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ShowData)