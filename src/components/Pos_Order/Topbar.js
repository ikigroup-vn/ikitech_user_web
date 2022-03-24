import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as productAction from "../../actions/product"
import * as profileAction from "../../actions/profile"
import * as posAction from '../../actions/post_order'
import { shallowEqual } from '../../ultis/shallowEqual'
import * as dashboardAction from "../../actions/dashboard"
import history from '../../history'
import ModalBranch from './ModalBranch'
import ModalKeyboard from './ModalKeyboard'

class Topbar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            searchValue: "",
            selectTap: -1,
            txtBranch: "",
            fullScreen: false
        }
    }
    componentDidMount() {
        const { store_code } = this.props
        const branch_id = localStorage.getItem("branch_id")
        this.props.listPosOrder(store_code, branch_id)
        this.props.fetchBranchStore(this.props.store_code);
        this.props.fetchUserId();
        this.setState({ txtBranch: branch_id })
    }
    componentWillReceiveProps(nextProps) {
        if (!shallowEqual(this.props.listPos, nextProps.listPos)) {
            if (nextProps.listPos.length > 0) {
                this.props.handleCallbackTab(nextProps.listPos[0]?.id)
            } else {
                this.handleCreateTab()
            }
            this.setState({selectTap:-1})

        }
    }

    handleDelete = (idCart) => {
        const { store_code } = this.props
        const branch_id = localStorage.getItem("branch_id")
        this.props.deleteOneCart(store_code, branch_id, idCart)
        this.setState({ selectTap: -1 })
    }
    handleCreateTab = () => {
        const length = this.props.listPos.length 
        console.log("length",length)
        const nameTab = {
            name: `Đơn hàng ${length}`
        }
        const { store_code } = this.props
        const branch_id = localStorage.getItem("branch_id")
        this.props.createOneTab(store_code, branch_id, nameTab)
    }
    handleChooseTab = (id, index) => {
        this.setState({ selectTap: index })
        this.props.handleCallbackTab(id)
    }
    handleChooseTab1 = (id) => {
        this.setState({ selectTap: -1 })
        this.props.handleCallbackTab(id)
    }
    searchData = (e) => {
        e.preventDefault()
        var { store_code } = this.props;
        var { searchValue } = this.state;
        const limit = 12
        var params = `&search=${searchValue}&limit=${limit}`;
        this.setState({ numPage: 20 })
        const branch_id = localStorage.getItem('branch_id')
        this.props.fetchAllProductV2(store_code, branch_id, 1, params);
    };
    goBackHome = () => {
        history.push("/");
    }

    onChangeSearch = (e) => {
        this.setState({ searchValue: e.target.value });
    };

    fullScreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
            this.setState({fullScreen:true})
        } else {
            document.exitFullscreen()
            this.setState({fullScreen:false})
        }

    }


    render() {
        var { listPos, branchStore, user } = this.props;

        return (
            <div>
                <nav class="navbar navbar-expand navbar-light bg-white topbar static-top header-pos">

                    <ul class="navbar-nav" style={{ alignItems: "center" }} >
                        <li class="nav-item">
                            <div className='search-imput' style={{ display: 'flex' }}>
                                <input
                                    style={{ maxWidth: "400px", minWidth: "300px", borderRadius: '5px' }}
                                    type="search"
                                    name="txtSearch"

                                    onChange={this.onChangeSearch}
                                    class="form-control"
                                    placeholder="Tìm kiếm sản phẩm"
                                />
                                <div class="input-group-append" style={{ position: "absolute", left: "273px" }}>
                                    <button
                                        class="btn"
                                        type="submit"
                                        onClick={this.searchData}
                                    >
                                        <i class="fa fa-search"></i>
                                    </button>
                                </div>

                            </div>

                        </li>
                        {

                            listPos !== null && listPos.length > 0 ?
                                <>
                                    <li className={this.state.selectTap === -1 ? "activess nav-item" : 'nav-item'} style={{ display: "flex", alignItems: "center", margin: "0 7px", backgroundColor: "rgb(174 61 52)", color: "white", padding: "8px 10px", borderRadius: "5px" }} >
                                        <div className='tab-item' onClick={() => this.handleChooseTab1(listPos[0].id)} style={{ cursor: "pointer", marginRight: "5px" }}>{listPos[0].name}</div>
                                        <i class='fa fa-window-close' onClick={() => this.handleDelete(listPos[0].id)}></i>
                                    </li >
                                    {
                                        listPos.slice(1, listPos.length).map((item, index) => {
                                            return (
                                                <li key={index} className={index === this.state.selectTap ? "activess nav-item" : 'nav-item'} style={{ display: "flex", alignItems: "center", margin: "0 7px", backgroundColor: "rgb(174 61 52)", color: "white", padding: "8px 10px", borderRadius: "5px" }} >
                                                    <div className='tab-item' onClick={() => this.handleChooseTab(item.id, index)} style={{ cursor: "pointer", marginRight: "5px" }}>{item.name}</div>
                                                    <i class='fa fa-window-close' onClick={() => this.handleDelete(item.id)}></i>
                                                </li >
                                            )
                                        })
                                    }
                                </>
                                : ""
                        }

                        <li className='nav-item' style={{ display: 'flex', alignItems: "center", color: "white", fontSize: "20px", padding: "10px", cursor: "pointer" }} onClick={() => this.handleCreateTab()}>
                            <i class='fas fa-plus' ></i>
                        </li>
                    </ul>

                    <ul className="navbar-nav ml-auto" style={{ display: "flex", alignItems: "center" }}>
                        <li className="nav-item dropdown no-arrow" style={{ margin: "0 10px" }}>
                            <div className='wrap-info' data-toggle="modal" data-target="#modalBranch" style={{ display: "flex", color: "white", cursor: "pointer" }}>
                                <i class="fa fa-map-marker" aria-hidden="true"></i>
                                <span className="mr-2 small" style={{ color: "white", marginLeft: "5px" }}>
                                    Chi nhánh mặc định
                                </span>

                            </div>
                            <div className='wrap-info' style={{ display: "flex", color: "white" }}>
                                <i class="fa fa-user-o" aria-hidden="true"></i>
                                <span className="mr-2 small" style={{ color: "white", marginLeft: "5px" }}>
                                    {user.name}
                                </span>
                            </div>

                        </li>

                        <li className='nav-item' id='btn-full' style={{ margin: "0 10px", color: "white", cursor: "pointer" }} onClick={this.fullScreen}>
                            {!this.state.fullScreen  ?
                                <i class='fas fa-expand-arrows-alt fa-2x' style={{ fontSize: "22px" }}></i> :
                                <i class='fas fa-compress-arrows-alt' style={{ fontSize: "22px" }}></i>
                            }

                        </li >
                        <li className='nav-item' style={{ color: "white", cursor: "pointer" }} onClick={this.goBackHome}>
                            <i class='fas fa-home fa-2x' style={{ fontSize: "22px" }}></i>
                        </li>
                        <li className='nav-item' style={{ margin: "0 10px" }}>
                            <button className='btn' style={{ color: "white", border: "1px solid" }} data-toggle="modal" data-target="#modalKeyboard">Phím tắt</button>
                        </li>
                    </ul>
                </nav>
                <ModalBranch branchStore={branchStore} />
                <ModalKeyboard />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        listPos: state.posReducers.pos_reducer.listPosOrder,
        branchStore: state.storeReducers.store.branchStore,
        user: state.userReducers.user.userID,
    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        listPosOrder: (store_code, branch_id) => {
            dispatch(posAction.listPosOrder(store_code, branch_id))
        },
        deleteOneCart: (store_code, branch_id, id) => {
            dispatch(posAction.deleteOneCart(store_code, branch_id, id))
        },
        createOneTab: (store_code, branch_id, data) => {
            dispatch(posAction.createOneTab(store_code, branch_id, data))
        },
        fetchAllProductV2: (store_code, branch_id, page, params) => {
            dispatch(productAction.fetchAllProductV2(store_code, branch_id, page, params));

        },
        fetchBranchStore: (store_code) => {
            dispatch(dashboardAction.fetchBranchStore(store_code))
        },
        fetchUserId: () => {
            dispatch(profileAction.fetchUserId());
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Topbar)