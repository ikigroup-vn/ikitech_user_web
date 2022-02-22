import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { format, formatNumber } from '../../ultis/helpers'


class ShowData extends Component {
    constructor(props) {
        super(props)
        this.state = {
            show_item: false
        }
    }

    handleEditStockElement = (element,distribute) => {
        this.props.handleCallBackElement({
            element: element, idProduct: this.props.data.id,NameDistribute:distribute
        })
    }
    handleEditSubElement = (subElement,element,distribute) => {
        this.props.handleCallBackSubElement({
            SubElement: subElement, idProduct: this.props.data.id,NameElement: element,NameDistribute:distribute
        })
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
                            const cost_of_capital = listDistribute.element_distributes[_index].sub_element_distributes[index].cost_of_capital
                            const stock = listDistribute.element_distributes[_index].sub_element_distributes[index].stock
                            result.push(
                                <div className='row' style={{ padding: "10px" }}>
                                    <div className='col-3' style={{ display: "flex" }}>
                                        <label style={{fontWeight:"bold"}}>Tên thuộc tính: </label>
                                        <div className='name-distribute' style={{ marginLeft: "20px" }}>{element.name},{sub_element.name}</div>
                                    </div>
                                    <div className='col-3' style={{ display: "flex" }}>
                                        <label style={{fontWeight:"bold"}}>Giá vốn: </label>
                                        <div className='price-distribute' style={{ marginLeft: "20px" }}>{format(Number(cost_of_capital))}</div>
                                    </div>
                                    <div className='col-3' style={{ display: "flex" }}>
                                        <label style={{fontWeight:"bold"}}>Tồn kho: </label>
                                        <div className='quantity-distribute' style={{ marginLeft: "20px" }}>{stock}</div>
                                    </div>
                                    <div className='col-3' style={{textAlign:"center"}}>
                                        <button className='btn btn-primary' data-toggle="modal" data-target="#myModal" onClick={() => this.handleEditSubElement(listDistribute.element_distributes[_index].sub_element_distributes[index],element.name,listDistribute.name)}>Sửa kho</button>
                                    </div>
                                </div>
                            )

                        })
                    }
                    else {   
                            result.push(
                                <div className='row' style={{ padding: "10px" }}>
                                    <div className='col-3' style={{ display: "flex" }}>
                                        <label style={{fontWeight:"bold"}}>Tên thuộc tính: </label>
                                        <div className='name-distribute' style={{ marginLeft: "20px" }}>{element.name}</div>
                                    </div>
                                    <div className='col-3' style={{ display: "flex" }}>
                                        <label style={{fontWeight:"bold"}}>Giá vốn: </label>
                                        <div className='price-distribute' style={{ marginLeft: "20px" }}>{format(Number(element.cost_of_capital))}</div>
                                    </div>
                                    <div className='col-3' style={{ display: "flex" }}>
                                        <label style={{fontWeight:"bold"}}>Tồn kho: </label>
                                        <div className='quantity-distribute' style={{ marginLeft: "20px" }}>{element.stock}</div>
                                    </div>
                                    <div className='col-3' style={{textAlign:"center"}}>
                                        <button className='btn btn-primary' data-toggle="modal" data-target="#myModal" onClick={() => this.handleEditStockElement(element,listDistribute.name)}>Sửa kho</button>
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
        const { _delete, update, insert, checked, data, per_page, current_page, index, store_code, page, status, status_name, status_stock, discount } = this.props
        const listDistribute = data.inventory.distributes !== null && data.inventory.distributes.length > 0 ? data.inventory.distributes[0] : []
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
                        {data.inventory.distributes !== null && data.inventory.distributes.length > 0 ? <button className="btn btn-success btn-sm " onClick={() => this.handleOnClick()} >
                            <i class="fa fa-eye"></i> Xem
                        </button>:""}
 
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
                                this.passDataModal(e, store_code, data.id, data.name)
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

                <tr class={`explode ${show_item == true ? "show" : "hide"}`} style ={{backgroundColor:"#8080801a"}} >
                    <td colSpan={12}>
                        <div className='show-distribute'>
                            {this.showDistribute(listDistribute)}
                        </div>
                    </td>
                </tr>
            </>
        )
    }
}

export default ShowData