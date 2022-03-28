import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { format, formatNumber } from '../../ultis/helpers'
import * as inventoryAction from '../../actions/inventory'
import { connect } from 'react-redux';
import HistoryStock from './Modal/HistoryStock';

class ShowData extends Component {
    constructor(props) {
        super(props)
        this.state = {
            show_item: false
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
    handleOnClick = () => {
        this.setState({ show_item: !this.state.show_item })
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
                                <div className='row' style={{ padding: "10px" }}>
                                    <div className='col-3' style={{ display: "flex" }}>
                                        <label style={{ fontWeight: "bold" }}>Tên thuộc tính: </label>
                                        <div className='name-distribute' style={{ marginLeft: "20px" }}>{element.name},{sub_element.name}</div>
                                    </div>
                                    <div className='col-3' style={{ display: "flex" }}>
                                        <label style={{ fontWeight: "bold" }}>Giá vốn: </label>
                                        <div className='price-distribute' style={{ marginLeft: "20px" }}>{format(Number(cost_of_capital))}</div>
                                    </div>
                                    <div className='col-3' style={{ display: "flex" }}>
                                        <label style={{ fontWeight: "bold" }}>Tồn kho: </label>
                                        <div className='quantity-distribute' style={{ marginLeft: "20px" }}>{stock}</div>
                                    </div>
                                    <div className='col-3' style={{ textAlign: "center" }}>
                                        <button className='btn btn-primary' data-toggle="modal" data-target="#myModal" onClick={() => this.handleEditSubElement(listDistribute.element_distributes[_index].sub_element_distributes[index], element.name, listDistribute.name)}>Sửa kho</button>
                                        <button className='btn btn-warning' data-toggle="modal" style={{ marginLeft: "10px" }}
                                            data-target="#historyStock"
                                            onClick={() => this.historyInventorys(
                                                listDistribute.element_distributes[_index].sub_element_distributes[index],
                                                element.name,
                                                listDistribute.name)}>Lịch sử kho</button>
                                    </div>
                                </div>
                            )

                        })
                    }
                    else {
                        result.push(
                            <div className='row' style={{ padding: "10px" }}>
                                <div className='col-3' style={{ display: "flex" }}>
                                    <label style={{ fontWeight: "bold" }}>Tên thuộc tính: </label>
                                    <div className='name-distribute' style={{ marginLeft: "20px" }}>{element.name}</div>
                                </div>
                                <div className='col-3' style={{ display: "flex" }}>
                                    <label style={{ fontWeight: "bold" }}>Giá vốn: </label>
                                    <div className='price-distribute' style={{ marginLeft: "20px" }}>{format(Number(element.cost_of_capital))}</div>
                                </div>
                                <div className='col-3' style={{ display: "flex" }}>
                                    <label style={{ fontWeight: "bold" }}>Tồn kho: </label>
                                    <div className='quantity-distribute' style={{ marginLeft: "20px" }}>{element.stock}</div>
                                </div>
                                <div className='col-3' style={{ textAlign: "center" }}>
                                    <button className='btn btn-primary' data-toggle="modal" data-target="#myModal" onClick={() => this.handleEditStockElement(element, listDistribute.name)}>Sửa kho</button>
                                    <button className='btn btn-warning' data-toggle="modal" style={{ marginLeft: "10px" }} data-target="#historyStock" onClick={() => this.historyInventory(element, listDistribute.name)}>Lịch sử kho</button>
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
        const { _delete, update, insert, checked, data, per_page, current_page, index, store_code, page, status, status_name, status_stock, discount, historyInventory } = this.props
        const listDistribute = data.inventory?.distributes !== null && data.inventory?.distributes.length > 0 ? data.inventory?.distributes[0] : []
        const { show_item } = this.state

        return (
            <>
                <tr>
                    <td className={_delete == true ? "show" : "hide"}>
                        {" "}
                        <input
                            style={{
                                height: "initial",
                            }}
                            type="checkbox"
                            checked={checked}
                            onChange={(e) => this.onChangeSelected(e, data.id)}
                        />
                    </td>
                    <td>{per_page * (current_page - 1) + (index + 1)}</td>

                    <td>{data.sku}</td>

                    <td>
                        <Link to={`/product/edit/${store_code}/${data.id}/${page}`}>
                            {data.name}
                        </Link>
                    </td>
                    <td>
                        {data.inventory?.distributes !== null && data.inventory?.distributes.length > 0 ? <button className="btn btn-success btn-sm " onClick={() => this.handleOnClick()} >
                            <i class="fa fa-eye"></i> Xem
                        </button> : ""}

                    </td>

                    <td>{format(Number(data.price))}</td>
                    <td>
                        {" "}
                        <h5>
                            <span class={`badge badge-${status}`}>{status_name}</span>
                        </h5>
                    </td>

                    <td>{format(Number(discount))}</td>
                    <td
                        className={
                            status_stock == -2 || status_stock == -1 ? "show" : "hide"
                        }
                    >
                        {" "}
                        <h5>
                            <span
                                class={`badge badge-${status_stock == -2 ? "danger" : "success"
                                    }`}
                            >
                                {status_stock == -2 ? "Hết hàng" : "Vô hạn"}
                            </span>
                        </h5>
                    </td>
                    <td
                        className={
                            status_stock != -2 && status_stock != -1 ? "show" : "hide"
                        }
                    >
                        {new Intl.NumberFormat().format(status_stock.toString())}
                    </td>

                    <td>{data.view}</td>
                    <td>{data.likes}</td>

                    <td className="btn-voucher">
                        <Link
                            to={`/product/edit/${store_code}/${data.id}/${page}`}
                            class={`btn btn-warning btn-sm ${update == true ? "show" : "hide"
                                }`}
                        >
                            <i class="fa fa-edit"></i> Sửa
                        </Link>
                        <Link
                            to={`/product/create/${store_code}/${data.id}`}
                            class={`btn btn-primary btn-sm ${insert == true ? "show" : "hide"
                                }`}
                        >
                            <i class="fa fa-copy"></i> Sao chép
                        </Link>
                        <button
                            onClick={(e) =>
                                this.props.passDataModal(e, store_code, data.id, data.name)
                            }
                            data-toggle="modal"
                            data-target="#removeModal"
                            class={`btn btn-danger btn-sm ${_delete == true ? "show" : "hide"
                                }`}
                        >
                            <i class="fa fa-trash"></i> Xóa
                        </button>
                    </td>
                </tr>

                <tr class={`explode ${show_item == true ? "show" : "hide"}`} style={{ backgroundColor: "#8080801a" }} >
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