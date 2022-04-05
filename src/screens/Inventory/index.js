import React, { Component } from 'react'
import { connect } from 'react-redux';
import Alert from '../../components/Partials/Alert'
import Footer from '../../components/Partials/Footer';
import Sidebar from '../../components/Partials/Sidebar'
import Topbar from '../../components/Partials/Topbar'
import * as Types from "../../constants/ActionType";
import * as inventoryAction from "../../actions/inventory"
import { Link } from 'react-router-dom';
import Pagination from '../../components/Inventory/Pagination';
import moment from "moment";


class Inventory extends Component {
    constructor(props) {
        super(props)
        this.state = {
            searchValue: ""
        }
    }
    componentDidMount() {
        const { store_code } = this.props.match.params
        const branch_id = localStorage.getItem('branch_id')
        this.props.fetchAllInventory(store_code, branch_id)
    }
    onChangeSearch = (e) => {
        this.setState({ searchValue: e.target.value });
    };

    searchData = (e) => {
        e.preventDefault()
        const { store_code } = this.props.match.params
        const branch_id = localStorage.getItem('branch_id')
        const value = this.state.searchValue
        const params = `&search=${value}`
        this.props.fetchAllInventory(store_code, branch_id, 1, params)
    }
    showData = (listInventory,store_code) => {
        var result = null
        if (listInventory) {
            result = listInventory.map((item, index) => {
                var time =  moment(item.created_at, "YYYY-MM-DD HH:mm:ss").format(
                    "DD-MM-YYYY"
                  );
                return (
                    <tr className='wrap-content'>
                        <td>{index + 1}</td>
                        <td>{item.code}</td>
                        <td>{time}</td>
                        <td>{item.reality_exist}</td>
                        <td>{item.existing_branch}</td>
                        <td>{item.deviant}</td>
                        <td>
                            {item.status === 0 ? <div style={{color:"green"}}>đã kiểm kho</div> : <div style={{color:"#ff6a00"}}>đã cân bằng</div>}
                        </td>
                        <td>
                            <Link
                                to={`/inventory/detail/${store_code}/${item.id}`}
                                class="btn btn-primary btn-sm"
                            >
                                <i class="fa fa-eye"></i> Xem
                            </Link>
                        </td>
                    </tr>
                )
            })
        } else {
            return result
        }
        return result
    }
    render() {
        const { store_code } = this.props.match.params
        const { sheetsInventory } = this.props
        const { searchValue } = this.state
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
                                <div
                                    style={{ display: "flex", justifyContent: "space-between" }}
                                >
                                    <h4 className='title_content text-primary'>Phiếu kiểm kho</h4>
                                    <Link to={`/inventory/create/${store_code}`} class="btn btn-primary btn-sm" >
                                        <i class="fa fa-plus"></i> Tạo phiếu kiểm kho
                                    </Link>
                                </div>

                                <br></br>
                                <div className='card'>
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
                                                    placeholder="Nhập mã phiếu"
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

                                    </div>
                                    <div className='card-body'>
                                        <div class="table-responsive">
                                            <table class="table  " id="dataTable" width="100%" cellspacing="0">
                                                <thead>
                                                    <tr>
                                                        <th>STT</th>
                                                        <th>Mã phiếu</th>
                                                        <th>Thời gian</th>
                                                        <th>Tồn thực tế</th>
                                                        <th>Tồn chi nhánh</th>
                                                        <th>Chênh lệch</th>
                                                        <th>Trạng thái</th>
                                                        <th>Hành động</th>
                                                    </tr>
                                                </thead>

                                                <tbody>{this.showData(sheetsInventory?.data,store_code)}</tbody>
                                            </table>
                                        </div>
                                        <Pagination store_code ={store_code} sheetsInventory = {sheetsInventory}/>
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
        sheetsInventory: state.inventoryReducers.inventory_reducer.sheetsInventory,
    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchAllInventory: (store_code, branch_id, page, pagram) => {
            dispatch(inventoryAction.fetchAllInventory(store_code, branch_id, page, pagram))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Inventory)