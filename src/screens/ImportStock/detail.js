import React, { Component } from 'react'
import { connect } from 'react-redux'
import Alert from '../../components/Partials/Alert'
import Footer from '../../components/Partials/Footer'
import Sidebar from '../../components/Partials/Sidebar'
import Topbar from '../../components/Partials/Topbar'
import * as Types from '../../constants/ActionType'
import * as inventoryAction from '../../actions/inventory'
import moment from 'moment'
import { Link } from 'react-router-dom'
import * as ImportAction from "../../actions/import_stock"
import './detail.css'
import ItemDetail from '../../components/Import_stock/ItemDetail'
import ModalPayment from '../../components/Import_stock/ModalPayment'
import ModalDelete from '../../components/Import_stock/ModalDelete'
import ModalEnd from '../../components/Import_stock/ModalEnd'
import { format } from '../../ultis/helpers'
import ItemDetailRefund from "../../components/Import_stock/ItemDetailRefund"
class DetailImportStock extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isActive1: false,
            isActive2: false,
            isActive3: false,
            statusFinal: "",
            total_price: 0,
            check: false,
            list_refund : []
        }
    }
    componentDidMount() {
        const { store_code, id } = this.props.match.params
        const branch_id = localStorage.getItem("branch_id")
        this.props.fetchDetailImportStock(store_code, branch_id, id)
    }
    handleBalance = (id) => {
        const { store_code } = this.props.match.params
        const branch_id = localStorage.getItem("branch_id")
        this.props.handleBalanceInventory(store_code, branch_id, id)
    }
    handleChangeStatus = (number) => {
        const { store_code, id } = this.props.match.params
        const branch_id = localStorage.getItem("branch_id")
        const data = { status: number }
        this.props.changeStatus(store_code, branch_id, id, data)
    }
    componentWillReceiveProps(nextProps, nextState) {
        if (nextProps.itemImportStock !== this.props.itemImportStock) {

            nextProps.itemImportStock.change_status_history.forEach(item => {
                if (item.status === 1) {
                    this.setState({ isActive1: true })
                }
                if (item.status === 2) {
                    this.setState({ isActive2: true })
                }

                if (item.status === 3) {
                    this.setState({ isActive3: true, statusFinal: 3 })
                }
                if (item.status === 4) {
                    this.setState({ isActive: true, statusFinal: 4 })
                }
                if (item.status === 5) {
                    this.setState({ isActive3: true, statusFinal: 5 })
                }
                if (item.status === 6) {
                    this.setState({ isActive3: true, statusFinal: 6 })
                }
            })
            var total_prices = 0
            nextProps.itemImportStock.import_stock_items.forEach(item => {
                total_prices = total_prices + item.quantity * item.import_price
            })
            this.setState({ total_price: total_prices })
        }

    }
    changeStatus = (status) => {
        this.setState({ check: status });
    }
    getRefund = (list_refund) =>{
        this.setState({list_refund})
    }
    checked = (list) =>{
        var count = 0
        list.forEach(element => {
            if(element.check == true)
            count = count + 1
        });
        return count
    }
    render() {
        const { store_code, id } = this.props.match.params
        const { itemImportStock } = this.props
        const { statusFinal , check ,list_refund } = this.state
        const import_stock_items = this.props.itemImportStock.import_stock_items ? this.props.itemImportStock.import_stock_items : []
        const date = moment(itemImportStock.updated_at, "YYYY-MM-DD HH:mm:ss").format("YYYY-MM-DD")
        const total = this.state.total_price - itemImportStock.discount + itemImportStock.cost
        console.log(this.checked(list_refund))
        return (
            <div id="wrapper">
                <Sidebar store_code={store_code} />
                <div className="col-10 col-10-wrapper">

                    <div id="content-wrapper" className="d-flex flex-column">
                        <div id="content">
                            <Topbar store_code={store_code} />

                            <div className="container-fluid">
                                <Alert
                                    type={Types.ALERT_UID_STATUS}
                                    alert={this.props.alert}
                                />
                                {itemImportStock.status === 0 || itemImportStock.status === 1 ? <div style={{ display: "flex", justifyContent: "end", marginBottom: "10px" }}>
                                    <Link style={{ marginRight: "10px" }} type="button" to={`/import_stock/edit/${store_code}/${id}`} class="btn btn-primary  btn-sm"><i class="fa fa-edit"></i>&nbsp;Sửa đơn nhập</Link>
                                </div> : ""}

                                <div class="card card-import">
                                    <div class="row d-flex justify-content-center">
                                        <div class="col-12">
                                            <ul id="progressbar" class="text-center">
                                                <li class="active step0"></li>
                                                <li class={this.state.isActive1 ? "active step0" : "step0"}></li>
                                                <li class={this.state.isActive2 ? "active step0" : "step0"}></li>
                                                <li class={this.state.isActive3 ? "active step0" : statusFinal === 4 || statusFinal === 5 || statusFinal === 6 ? "activeDelete step0" : "step0"}></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="row justify-content-between top">
                                        <div class="row d-flex icon-content"> <img class="icon" src="https://i.imgur.com/9nnc9Et.png" />
                                            <div class="d-flex flex-column">
                                                <p class="font-weight-bold" style={{ margin: "0" }}>Đặt hàng</p>
                                                <div className='time-history'>{itemImportStock?.change_status_history?.length > 0 ? itemImportStock.change_status_history[0].time_handle : ""}</div>
                                            </div>
                                        </div>
                                        {this.state.isActive1 ?
                                            <div class="row d-flex icon-content"> <img class="icon" src="https://i.imgur.com/u1AzR7w.png" />
                                                <div class="d-flex flex-column">
                                                    <p class="font-weight-bold" style={{ margin: "0" }}>Duyệt</p>
                                                    <div className='time-history'>{itemImportStock.change_status_history[1].time_handle}</div>
                                                </div>
                                            </div> :
                                            <div class="row d-flex icon-content"> <img class="icon" src="https://i.imgur.com/u1AzR7w.png" />
                                                <div class="d-flex flex-column">
                                                    <p class="font-weight-bold" style={{ margin: "0" }}>Duyệt</p>
                                                </div>
                                            </div>}
                                        {this.state.isActive2 ?
                                            <div class="row d-flex icon-content"> <img class="icon" src="https://manmo3h.com/app/webroot/upload/admin/images/icon/icon7.png" />
                                                <div class="d-flex flex-column">
                                                    <p class="font-weight-bold" style={{ margin: "0" }}>Nhập kho</p>
                                                    <div className='time-history'>{itemImportStock.change_status_history[2].time_handle}</div>
                                                </div>
                                            </div> :
                                            <div class="row d-flex icon-content"> <img class="icon" src="https://manmo3h.com/app/webroot/upload/admin/images/icon/icon7.png" />
                                                <div class="d-flex flex-column">
                                                    <p class="font-weight-bold" style={{ margin: "0" }}>Nhập kho</p>
                                                </div>
                                            </div>}

                                        {statusFinal === 4 ? <div class="row d-flex icon-content"> <img class="icon" src="https://png.pngtree.com/png-vector/20190927/ourlarge/pngtree-cancel-cart-product-icon-png-image_1736147.jpg" />
                                            <div class="d-flex flex-column">
                                                <p class="font-weight-bold" style={{ margin: "0" }}>Đã hủy</p>
                                                <div className='time-history'>{itemImportStock.change_status_history[itemImportStock?.change_status_history?.length - 1].time_handle}</div>
                                            </div>
                                        </div> :
                                            statusFinal === 5 ? <div class="row d-flex icon-content"> <img class="icon" src="https://png.pngtree.com/png-vector/20190927/ourlarge/pngtree-cancel-cart-product-icon-png-image_1736147.jpg" />
                                                <div class="d-flex flex-column">
                                                    <p class="font-weight-bold" style={{ margin: "0" }}>Kết thúc</p>
                                                    <div className='time-history'>{itemImportStock.change_status_history[itemImportStock?.change_status_history?.length - 1].time_handle}</div>
                                                </div>
                                            </div> :
                                                statusFinal === 6 ? <div class="row d-flex icon-content"> <img class="icon" src="https://i.imgur.com/TkPm63y.png" />
                                                    <div class="d-flex flex-column">
                                                        <p class="font-weight-bold" style={{ margin: "0" }}>Trả hàng</p>
                                                        <div className='time-history'>{itemImportStock.change_status_history[itemImportStock?.change_status_history?.length - 1].time_handle}</div>
                                                    </div>
                                                </div> : this.state.isActive3 ?
                                                    <div class="row d-flex icon-content"> <img class="icon" src="https://i.imgur.com/TkPm63y.png" />
                                                        <div class="d-flex flex-column">
                                                            <p class="font-weight-bold" style={{ margin: "0" }}>Hoàn thành</p>
                                                            <div className='time-history'>{itemImportStock.change_status_history[itemImportStock?.change_status_history?.length - 1].time_handle}</div>
                                                        </div>
                                                    </div> :
                                                    <div class="row d-flex icon-content"> <img class="icon" src="https://i.imgur.com/TkPm63y.png" />
                                                        <div class="d-flex flex-column">
                                                            <p class="font-weight-bold" style={{ margin: "0" }}>Hoàn thành</p>
                                                        </div>
                                                    </div>
                                        }

                                    </div>
                                </div>

                                <br></br>
                                <div className='row'>
                                    <div className='col-6'>
                                        <div className='card'>
                                            <div className='card-header py-3' style={{ justifyContent: "space-between", alignItems: "center" }}>
<span>
Thông tin đơn hàng #{itemImportStock.code}

</span>
                                                {
                        itemImportStock.import_stock_code_refund != null && (
                            <span style={{ color: "red", display: "block" }}>
                                Đã hoàn tiền từ đơn: <span id="cart_code">#{itemImportStock.import_stock_code_refund }</span>

                            </span>
                        )
                    }
                                            </div>
                                            <div className='card-body' >
                                                <div style={{ marginBottom: "10px", borderRadius: "5px" }}>
                                                    {
                                                        import_stock_items.map((item,index) => (
                                                            <ItemDetail getRefund = {this.getRefund} id={id} store_code={store_code} index = {index} listItems = {import_stock_items} status = {itemImportStock.status} check = {check} listItem={item} />
                                                        ))
                                                    }
                                                </div>
                                                <div class="">
                                                    <div class="card-body" style={{ padding: "0" }}>
                                                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                            <div>Tiền hàng</div>
                                                            <div>{format(Number(this.state.total_price))}</div>
                                                        </div>
                                                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                            <div>Chiết khấu</div>
                                                            <div>{format(Number(itemImportStock.discount))}</div>
                                                        </div>
                                                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                            <div>Chi phí nhập hàng</div>
                                                            <div>{format(Number(itemImportStock.cost))}</div>
                                                        </div>
                                                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                            <div>Tổng tiền</div>
                                                            <div>{format(Number(itemImportStock.total_final))}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {itemImportStock.note ? <div>
                                                    <label style={{ fontWeight: "bold", marginTop: "5px" }}>Ghi chú</label>
                                                    <div class="card">
                                                        <div class="card-body" style={{ padding: "0" }}>{itemImportStock.note}</div>
                                                    </div>
                                                </div> : ""}

                                                {itemImportStock.status === 0 ? <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                                    <button class="btn btn-danger" style={{ marginTop: "20px" }} onClick={() => this.handleChangeStatus(1)} >Duyệt</button>
                                                    <a className="cancel" style={{ marginTop: "20px" }} data-toggle="modal" data-target="#removeModal" >Hủy đơn nhập</a>
                                                </div> :
                                                    itemImportStock.status === 1 ? <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                                        <button class="btn btn-danger" style={{ marginTop: "20px" }} onClick={() => this.handleChangeStatus(2)}>Nhập kho</button>
                                                        <a className="cancel" style={{ marginTop: "20px" }} data-toggle="modal" data-target="#removeModal" >Hủy đơn nhập</a>
                                                    </div>
                                                        :
                                                        itemImportStock.status === 2 ? <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                                            <button class="btn btn-danger" style={{ marginTop: "20px" }} data-toggle="modal" data-target="#payment" >Hoàn thành</button>
                                                            <button className="cancel btn btn-success" style={{ marginTop: "20px" }}  onClick={() => { this.changeStatus(true) }} >Hoàn trả nhà cung cấp</button>
                                                            <button className="cancel btn btn-secondary" style={{ marginTop: "20px" }} data-toggle="modal" data-target="#endModal" >Kết thúc đơn nhập</button>
                                                        </div> : ""

                                                }
                                                <ModalDelete store_code={store_code} id={id} />
                                                <ModalEnd store_code={store_code} id={id} />
                                                <ModalPayment store_code={store_code} id={id} price={itemImportStock.total_final} remaining_amount ={itemImportStock.remaining_amount}/>
                                            </div>

                                        </div>
                                    </div>
                                    <div className='col-6'>
                                        <div className='card'>
                                            <div className='card-header py-3' style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                                Thông tin phiếu kiểm
                                            </div>
                                            <div className='card-body'>
                                                <div class="">
                                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                        <div>Tạo ngày:</div>
                                                        <div>{date}</div>
                                                    </div>
                                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                        <div>Tạo bởi:</div>
                                                        <div>{itemImportStock.user?.name}</div>
                                                    </div>
                                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                        <div>Chi nhánh:</div>
                                                        <div>{itemImportStock.branch?.name}</div>
                                                    </div>
                                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                        <div>Trạng thái:</div>
                                                        {itemImportStock.payment_status === 0 ? <div style={{color:"red"}}>Chưa thanh toán</div> : <div style={{color:"green"}}>Đã thanh toán</div>}
                                                    </div>
                                                </div>
                                           
                                            
                                                {
                                               check == true && this.checked(this.state.list_refund) > 0 && <ItemDetailRefund id={id} store_code={store_code} listItems = {import_stock_items} list_refund = {this.state.list_refund}  discount = {itemImportStock.discount}></ItemDetailRefund>
                                           } 
                                           
                                           
                                            </div>
                                        

                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <Footer />
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        itemImportStock: state.importStockReducers.import_reducer.detailImportStock,
    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        handleBalanceInventory: (store_code, branch_id, id) => {
            dispatch(inventoryAction.handleBalanceInventory(store_code, branch_id, id))
        },
        fetchDetailImportStock: (store_code, branch_id, id) => {
            dispatch(ImportAction.fetchDetailImportStock(store_code, branch_id, id))
        },
        changeStatus: (store_code, branch_id, id, data) => {
            dispatch(ImportAction.changeStatus(store_code, branch_id, id, data))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailImportStock)
