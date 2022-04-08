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
import ModalDelete from './ModalDelete'
import * as branchAction from "../../actions/branch"
import { removeSignNumber } from '../../ultis/helpers'

class Topbar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            searchValue: "",
            selectTap: -1,
            fullScreen: false,
            idCart: "",
            branchId: ""
        }
    }
    componentDidMount() {
        const { store_code } = this.props
        const branch_id = localStorage.getItem("branch_id")
        this.props.listPosOrder(store_code, branch_id)
        this.props.fetchBranchStore(this.props.store_code);
        this.props.fetchUserId();

    }
    componentWillReceiveProps(nextProps) {
        if (!shallowEqual(nextProps.branchStore, this.props.branchStore)) {


            if (nextProps.branchStore != null && nextProps.branchStore.length > 0) {

                var branch_id = localStorage.getItem("branch_id")


                if (branch_id != null) {
                    this.setState({ branchId: branch_id })

                } else {
                    branch_id = nextProps.branchStore[0]?.id
                    localStorage.setItem('branch_id', branch_id);
                    this.setState({ branchId: branch_id })

                }
                const selectedBranch = this.props.branchStore.find(branch => branch.id == branch_id);
                this.props.changeBranch(selectedBranch)
            }

        }


        if (!shallowEqual(this.props.listPos, nextProps.listPos)) {
            if (nextProps.listPos.length > 0) {
                this.props.handleCallbackTab(nextProps.listPos[0]?.id)
            } else {
                if (nextProps.listPos.length == 0) {
                    this.handleCreateTab()
                }
            }
            this.setState({ selectTap: -1 })

        }

        if (this.props.loadingCart == true && nextProps.loadingCart == false) {
            if (nextProps.listPos.length == 0) {
                this.handleCreateTab()
            }
        }


    }

    shouldComponentUpdate(nextProps, nextState) {
        if (!shallowEqual(nextState.branchId, this.state.branchId)) {
            const { store_code } = this.props
            const branch_id = localStorage.getItem("branch_id")
            this.props.listPosOrder(store_code, branch_id)
            this.props.fetchBranchStore(this.props.store_code);
            this.props.fetchUserId();
        }
        return true
    }

    handleDelete = (idCart) => {

        this.setState({ selectTap: -1, idCart: idCart })
    }
    handleCreateTab = () => {


        var nextNum = 1;

        if (this.props.listPos.length > 0) {
            var listNum = [];
            for (const pos of this.props.listPos) {
                var ret = Number((pos['name']).match(/\d+$/));
                ret = removeSignNumber(ret)
                listNum.push(ret);
            }


            console.log(listNum)
            while (listNum.includes(nextNum)) {
                nextNum = nextNum + 1;
            }
        }

        const namePos = `Hóa đơn ${nextNum}`
        const branch_id = localStorage.getItem("branch_id")
        const nameTab = {
            name: namePos
        }
        const { store_code } = this.props
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
            this.setState({ fullScreen: true })
        } else {
            document.exitFullscreen()
            this.setState({ fullScreen: false })
        }

    }

    handleCallbackBrach = (branchId) => {
        this.setState({ branchId: branchId })

        const selectedBranch = this.props.branchStore.find(branch => branch.id == branchId);

        this.props.changeBranch(selectedBranch)


        window.location.reload();
    }


    render() {
        var { listPos, branchStore, user, store_code, currentBranch } = this.props;
        var { idCart } = this.state
        return (
            <div>
                <nav class="navbar navbar-expand navbar-light bg-white topbar static-top header-pos">

                    <ul class="navbar-nav" style={{ alignItems: "center" }} >
                        <li className='nav-item' style={{ color: "white", cursor: "pointer",marginRight:'10px' }} onClick={this.goBackHome}>
                            <i class='fas fa-home fa-2x' style={{ fontSize: "22px" }}></i>
                        </li>
                        <li class="nav-item">
                            <form onSubmit={this.searchData}>
                                <div
                                    class="input-group"
                                >
                                <input
                                    // style={{ maxWidth: "400px", minWidth: "300px", borderRadius: '5px' }}
                                    type="search"
                                    name="txtSearch"
                                    id="serch-product"
                                    onChange={this.onChangeSearch}
                                    class="form-control"
                                    placeholder="Tìm kiếm sản phẩm"
                                />
                                    <div class="input-group-append">
                                        <button
                                            class=""
                                            style={{ width: "34px", border: "none",backgroundColor: "white",borderRadius: "3px"}}
                                            type="submit"
                                        >
                                            <i class="fa fa-search"></i>
                                        </button>
                                    </div>

                                </div>
                            </form>

                            {/* <div className='search-imput' style={{ display: 'flex' }}>
                                <input
                                    style={{ maxWidth: "400px", minWidth: "300px", borderRadius: '5px' }}
                                    type="search"
                                    name="txtSearch"
                                    id="serch-product"
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

                            </div> */}

                        </li>
                        <li class="nav-item">
                            {
                                listPos !== null && listPos.length > 0 ?
                                    <ul class="navbar-nav" style={{ alignItems: "center" }}>
                                        <li className={this.state.selectTap === -1 ? "activess nav-item" : 'nav-item'} style={{ display: "flex", alignItems: "center", margin: "0 7px", backgroundColor: "rgb(174 61 52)", color: "white", padding: "8px 10px", borderRadius: "5px" }} >
                                            <div className='tab-item' onClick={() => this.handleChooseTab1(listPos[0].id)} style={{ cursor: "pointer", marginRight: "5px" }}>{listPos[0].name}</div>
                                            {listPos.length > 1 && <i class='fa fa-window-close'
                                                onClick={() => this.handleDelete(listPos[0].id)}
                                                data-toggle="modal" data-target="#removeModal"
                                            ></i>
                                            }
                                        </li >
                                        {
                                            listPos.slice(1, listPos.length).map((item, index) => {
                                                return (
                                                    <li key={index} className={index === this.state.selectTap ? "activess nav-item" : 'nav-item'} style={{ display: "flex", alignItems: "center", margin: "0 7px", backgroundColor: "rgb(174 61 52)", color: "white", padding: "8px 10px", borderRadius: "5px" }} >
                                                        <div className='tab-item' onClick={() => this.handleChooseTab(item.id, index)} style={{ cursor: "pointer", marginRight: "5px" }}>{item.name}</div>
                                                        <i class='fa fa-window-close' onClick={() => this.handleDelete(item.id)} data-toggle="modal" data-target="#removeModal"></i>
                                                    </li >
                                                )
                                            })
                                        }
                                    </ul>
                                    : ""
                            }
                        </li>


                        <li className='nav-item' style={{ display: 'flex', alignItems: "center", color: "white", fontSize: "15px", padding: "10px", cursor: "pointer" }} onClick={() => this.handleCreateTab()}>
                            <i class='fas fa-plus' ></i>
                        </li>
                    </ul>

                    <ul className="navbar-nav ml-auto" style={{ display: "flex", alignItems: "center" }}>
                        <li className="nav-item dropdown no-arrow" style={{ margin: "0 10px" , fontSize: "17px"}}>
                            {/* <div className='wrap-info' data-toggle="modal" data-target="#modalBranch" style={{ display: "flex", color: "white", cursor: "pointer" }}>
                                <i class="fa fa-map-marker" aria-hidden="true"></i>
                                <span className="mr-2 small" style={{ color: "white", marginLeft: "5px" }}>
                                    {currentBranch?.name ?? "Chưa có chi nhánh"}
                                </span>

                            </div> */}
                            <div className='wrap-info' style={{ display: "flex", color: "white" }}>
                                <i class="fa fa-user-o" aria-hidden="true"></i>
                                <span className="mr-2 small" style={{ color: "white", marginLeft: "5px" }}>
                                    {user.name}
                                </span>
                            </div>

                        </li>

                        <li className='nav-item' id='btn-full' style={{ margin: "0 10px", color: "white", cursor: "pointer" }} onClick={this.fullScreen}>
                            {!this.state.fullScreen ?
                                <i class='fas fa-expand-arrows-alt fa-2x' style={{ fontSize: "22px" }}></i> :
                                <i class='fas fa-compress-arrows-alt' style={{ fontSize: "22px" }}></i>
                            }

                        </li >

                        <li className='nav-item' style={{ margin: "0 10px" }}>
                            <button className='btn' style={{ color: "white", border: "1px solid" }} data-toggle="modal" data-target="#modalKeyboard">Phím tắt</button>
                        </li>
                    </ul>
                </nav>
                <ModalBranch currentBranch={currentBranch} branchStore={branchStore} handleCallbackBrach={this.handleCallbackBrach} />
                <ModalKeyboard />
                <ModalDelete idCart={idCart} store_code={store_code} />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        listPos: state.posReducers.pos_reducer.listPosOrder,
        branchStore: state.storeReducers.store.branchStore,
        user: state.userReducers.user.userID,
        loadingCart: state.posReducers.pos_reducer.loadingCart,
        currentBranch: state.branchReducers.branch.currentBranch
    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        listPosOrder: (store_code, branch_id) => {
            dispatch(posAction.listPosOrder(store_code, branch_id))
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
        changeBranch: (branchData) => {
            dispatch(branchAction.changeBranch(branchData))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Topbar)