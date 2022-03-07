import React, { Component } from 'react'
import { connect } from 'react-redux';
import Sidebar from '../../components/Partials/Sidebar';
import Topbar from '../../components/Partials/Topbar';
import { shallowEqual } from '../../ultis/shallowEqual';
import * as Types from "../../constants/ActionType";
import Alert from '../../components/Partials/Alert';
import Pagination from '../../components/ProductAgency/Pagination';
import * as productAction from "../../actions/product";
import * as ImportAction from "../../actions/import_stock"
import history from '../../history';
import CardProduct from '../../components/Import_stock/CardProduct';
import ModalDetail from '../../components/Import_stock/ModalDetail';
import ModalSupplier from '../../components/Import_stock/ModalSupplier';
import * as dashboardAction from "../../actions/dashboard";
import ListImportStock from '../../components/Import_stock/ListImportStock';
import { format } from '../../ultis/helpers';
class EditImportStock extends Component {
    constructor(props) {
        super(props)
        this.state = {
            change: false,
            listImportStock: [],
            reality_exist_total: 0,
            existing_branch: 0,
            price_total:0,
            note: "",
            infoSupplier: "",
            tax:"",
            discount:"",
            cost:"",
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


    shouldComponentUpdate(nextProps, nextState) {
        var reality_total = 0
        var total_price = 0
        if (nextState.change !== this.state.change) {
            console.log("thay doi change")
            nextState.listImportStock.forEach((item) => {
                reality_total = parseInt(reality_total) + parseInt(item.reality_exist)
                total_price = parseInt(total_price) + parseInt(item.import_price )* parseInt(item.reality_exist )
            })
            this.setState({ reality_exist_total: reality_total,price_total: total_price })
        }
        return true

    }

    componentWillReceiveProps(nextProps) {
        var total_price = 0
        if(!shallowEqual(nextProps.itemImportStock,this.props.itemImportStock)){
            const {discount,cost,tax,note} = nextProps.itemImportStock
            const newImportStock = this.state.listImportStock
            nextProps.itemImportStock.import_stock_items.forEach(item =>{
                total_price = parseInt(total_price) + parseInt(item.import_price)
                newImportStock.push({
                    element_id:item.id,
                    nameDistribute:item.distribute_name,
                    nameElement:item.element_distribute_name,
                    nameProduct:item.product.name,
                    nameSubDistribute:item.sub_element_distribute_name,
                    product_id:item.product.id,
                    import_price : item.import_price,
                    reality_exist: 1
                    })
            })
            this.setState({listImportStock:newImportStock,price_total: total_price,discount:discount,tax:tax,cost:cost,note:note})  
        }
      }

    handleCallbackProduct = (modal) => {
        this.setState(
            {
                infoProduct: modal
            })
    }
    onChange = (e) =>{
        this.setState({[e.target.name]:e.target.value})
    }
    handleCallbackPushProduct = (modal) => {
        this.setState({ change: !this.state.change })
        const index_element = this.state.listImportStock.map(e => e.element_id).indexOf(modal.element_id)
        if(index_element <0){
            this.setState({ listImportStock: [...this.state.listImportStock, modal] })
        }
    }
    handleCallbackSupplier = (modal) => {
        this.setState({ infoSupplier: modal })
    }
    handleCallbackQuantity = (modal) => {
        var reality_total = 0
        const newInventory = this.state.listImportStock
        const index = newInventory.map(e => e.element_id).indexOf(modal.idElement)
        if (newInventory[index] != null) {
            newInventory[index].reality_exist = modal.currentQuantity
            newInventory.forEach((item) => {
                reality_total = parseInt(reality_total) + parseInt(item.reality_exist)
            })
            this.setState({ listImportStock: newInventory, reality_exist_total: reality_total })
        }
        this.setState({ change: !this.state.change })
    }

    handleCallbackPrice = (modal) => {
        this.setState({ change: !this.state.change })
        const newInventory = this.state.listImportStock
        const index = newInventory.map(e => e.element_id).indexOf(modal.idElement)
        newInventory[index].import_price = modal.import_price
        this.setState({ listImportStock: newInventory})
    }

    handleDelete = (modal) => {
        this.setState({ change: !this.state.change })
        const newInventory = this.state.listImportStock
        const index = this.state.listImportStock.map(e => e.element_id).indexOf(modal.idElement)
        newInventory.splice(index, 1)
        this.setState({ listImportStock: newInventory })
    }


    updateImportStock = () => {
        const { store_code,id } = this.props.match.params
        const { infoSupplier } = this.state
        const branch_id = localStorage.getItem('branch_id')
        const formData = {
            note: this.state.note,
            status: 0,
            supplier_id: infoSupplier.id_supplier,
            tax: this.state.tax,
            cost: this.state.cost,
            discount: this.state.discount,
            import_stock_items:
                this.state.listImportStock.map((item) => {
                    return {
                        product_id: item.product_id,
                        quantity: item.reality_exist,
                        distribute_name: item.nameDistribute,
                        element_distribute_name: item.nameElement,
                        sub_element_distribute_name: item.nameSubDistribute,
                        import_price:item.import_price
                    }
                })
        }
        this.props.updateImportStock(store_code, branch_id, id, formData)
    }
    onChangeSearch = (e) => {
        this.setState({ searchValue: e.target.value });
    };

    onChanges = (e) => {
        this.setState({ note: e.target.value })
    }
    handleOnChange = (e) => {
        var name = e.target.name
        var value = e.target.value
        this.setState({ [name]: value })
    }

    searchData = (e) => {
        e.preventDefault()
        var { store_code } = this.props.match.params;
        var { searchValue } = this.state;
        var params = `&search=${searchValue}`;
        this.setState({ numPage: 20 })
        const branch_id = localStorage.getItem('branch_id')
        this.props.fetchAllProductV2(store_code, branch_id, 1, params);
    };
    passNumPage = (page) => {
        this.setState({ page: page })
    }

    componentDidMount() {
        const { store_code,id } = this.props.match.params
        const branch_id = localStorage.getItem('branch_id')
        this.props.fetchAllProductV2(store_code, branch_id);
        this.props.fetchAllSupplier(store_code);
        this.props.fetchDetailImportStock(store_code, branch_id, id)
    }

    render() {
        var { supplier } = this.props;
        var { store_code } = this.props.match.params
        var { searchValue, numPage, listImportStock, infoSupplier, price_total, reality_exist_total,discount,cost,tax } = this.state
        return (
            <div id="wrapper">
                <Sidebar store_code={store_code} />
                <div className='col-10 col-10-wrapper'>
                    <div id="content-wrapper" className='d-flex flex-column'>
                        <div id='content'>
                            <Topbar store_code={store_code} />
                            <div className='container-fluid'>
                                
                                <div className='row'>
                                    <div className='col-lg-4 col-xl-4 col-md-12 col-sm-12'>
                                        <div className='card shadow mb-4' style={{ height: "100%" }}>
                                            <div className='card-header py-3' style={{ padding: "0", display: "flex" }}>
                                                <button class="btn btn-primary" type="submit" data-toggle="modal" data-target="#supplier"><i class="fas fa-user"></i></button>
                                                <div class="card" style={{ marginLeft: "10px", width: "80%" }}>
                                                    <div class="card-body" style={{ padding: '0px' }}>{infoSupplier ? `${infoSupplier.name}` : 'Chọn nhà cung cấp'}</div>
                                                </div>
                                            </div>

                                            <div className='card-bodys' style={{ width: "0 10px", height: "380px", overflowY: "auto" }}>
                                                <ListImportStock store_code={store_code} listImportStock={listImportStock} handleCallbackQuantity={this.handleCallbackQuantity} handleDelete={this.handleDelete} handleCallbackPrice = {this.handleCallbackPrice}/>
                                            </div>
                                            <div className='voucher-input' style={{ margin: "10px 0px" }}>

                                            </div>
                                            <div class="card">
                                                <div class="card-body" style={{ padding: "0" }}>
                                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                        <div>Tổng số lượng:</div>
                                                        <div>{reality_exist_total}</div>
                                                    </div>
                                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                        <div>Tổng tiền hàng:</div>
                                                        <div>{format(Number(price_total))}</div>
                                                    </div>
                                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                                        <div>Chiết khấu:</div>
                                                        <div style={{ width: "50%" }}>
                                                            <input type="text" class="form-control" id="usr" value={discount} name="discount" onChange={this.onChange} />
                                                        </div>
                                                    </div>
                                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "5px" }}>
                                                        <div>Chi phí nhập hàng:</div>
                                                        <div style={{ width: "50%" }}>
                                                            <input type="text" name ="cost" value={cost} class="form-control" id="usr" onChange={this.onChange} />
                                                        </div>
                                                    </div>
                                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "5px"  }}>
                                                        <div>Thuế:</div>
                                                        <div style={{ width: "50%" }}>
                                                            <input type="text" name ="tax" value={tax} class="form-control" id="usr" onChange={this.onChange} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label for="comment">Thêm ghi chú:</label>
                                                <textarea class="form-control" rows="5" id="comment" style={{ height: "50px" }} value ={this.state.note} onChange={this.onChanges}></textarea>
                                            </div>
                                            <button className='btn btn-danger' style={{ marginTop: "20px" }} onClick={() => this.updateImportStock()}>Lưu</button>
                                        </div>
                                    </div>

                                    <div className='col-lg-8 col-xl-8 col-md-12 col-sm-12'>
                                        <div className='card shadow mb-4' style={{ height: "100%" }}>
                                            <div className='card-header py-3' style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                                <form onSubmit={this.searchData}>
                                                    <div
                                                        class="input-group mb-6"
                                                        style={{ marginTop: "10px" }}
                                                    >
                                                        <input
                                                            style={{ maxWidth: "400px" }}
                                                            type="search"
                                                            name="txtSearch"
                                                            value={searchValue}
                                                            onChange={this.onChangeSearch}
                                                            class="form-control"
                                                            placeholder="Tìm mã đơn, tên, SĐT"
                                                        />
                                                        <div class="input-group-append">
                                                            <button
                                                                class="btn btn-primary"
                                                                type="submit"

                                                            >
                                                                <i class="fa fa-search"></i>
                                                            </button>
                                                        </div>

                                                    </div>
                                                </form>
                                                <ModalDetail modal={this.state.infoProduct} handleCallbackPushProduct={this.handleCallbackPushProduct} />
                                                <ModalSupplier supplier={supplier} handleCallbackSupplier={this.handleCallbackSupplier} />
                                            </div>
                                            <div className='card-body'>
                                                <CardProduct store_code={store_code} handleCallbackProduct={this.handleCallbackProduct} />
                                            </div>

                                            {/* <Pagination limit={numPage}
                                                    searchValue={searchValue}
                                                    passNumPage={this.passNumPage} store_code={store_code} products={products} /> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Alert
                    type={Types.ALERT_UID_STATUS}
                    alert={this.props.alert}
                />
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        products: state.productReducers.product.allProduct,
        sheetsInventory: state.inventoryReducers.inventory_reducer.sheetsInventory,
        supplier: state.storeReducers.store.supplier,
        itemImportStock: state.importStockReducers.import_reducer.detailImportStock,
    };
};
const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchAllProductV2: (store_code, branch_id, page, params) => {
            dispatch(productAction.fetchAllProductV2(store_code, branch_id, page, params));

        },
        updateImportStock: (store_code, branch_id,id, data) => {
            dispatch(ImportAction.updateImportStock(store_code, branch_id,id, data))
        },
        fetchAllSupplier: (store_code) => {
            dispatch(dashboardAction.fetchAllSupplier(store_code))
        },
        fetchDetailImportStock: (store_code, branch_id, id) => {
            dispatch(ImportAction.fetchDetailImportStock(store_code, branch_id, id))
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(EditImportStock);