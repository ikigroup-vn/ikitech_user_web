import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as productAction from "../../actions/product"
import * as profileAction from "../../actions/profile"
import * as posAction from '../../actions/post_order'
import { shallowEqual } from '../../ultis/shallowEqual'
import * as dashboardAction from "../../actions/dashboard"
import * as Env from "../../ultis/default"
import history from '../../history'

class Topbar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            searchValue: "",
            selectTap: -1,
            txtBranch: ""
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
            this.props.handleCallbackTab(nextProps.listPos[0]?.id)
        }
    }

    handleDelete = (idCart) => {
        const { store_code } = this.props
        const branch_id = localStorage.getItem("branch_id")
        this.props.deleteOneCart(store_code, branch_id, idCart)
        this.setState({selectTap:-1})
    }
    handleCreateTab = () => {
        const nameTab = {
            name: `Giỏ hàng `
        }
        const { store_code } = this.props
        const branch_id = localStorage.getItem("branch_id")
        this.props.createOneTab(store_code, branch_id, nameTab)
    }
    handleChooseTab = (id, index) => {
        this.setState({ selectTap: index })
        this.props.handleCallbackTab(id)
    }
    handleChooseTab1 = (id) =>{
        this.setState({selectTap:-1})
        this.props.handleCallbackTab(id)
    }
    searchData = (e) => {
        e.preventDefault()
        var { store_code } = this.props;
        var { searchValue } = this.state;
        var params = `&search=${searchValue}`;
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
    showData = (stores) => {
        var result = null;
        var store_code = typeof this.props.store_code != "undefined" ? this.props.store_code : null
        if (stores.length > 0) {
            result = stores.map((data, index) => {
                var selected = data.store_code === store_code ? true : false
                return (
                    <option value={data.id} key={index} selected={selected} >
                        {data.name}
                    </option>

                );
            });
        } else {
            return result;
        }
        return result;
    };
    onChange = (e) => {
        var value = e.target.value;
        localStorage.setItem('branch_id', value);
        this.setState({ txtBranch: value })

    };
    fullScreen = () => {
        document.documentElement.requestFullscreen();
        // document.addEventListener("click", () => {
        //     document.documentElement.requestFullscreen().catch((e) => {
        //         console.log(e)
        //     })
        // })
    }


    render() {
        var { listPos, branchStore, user } = this.props;
        var branchStore = typeof branchStore == "undefined" ? [] : branchStore
        var { txtBranch } = this.state
        return (
            <div>
                <nav class="navbar navbar-expand navbar-light bg-white topbar static-top header-pos">

                    <ul class="navbar-nav" >
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
                                    <li className={this.state.selectTap === -1 ? "actives nav-item" : 'nav-item'} style={{ display: "flex", alignItems: "center", margin: "0 7px", backgroundColor: "#11398a", color: "white", padding: "5px 10px", borderRadius: "5px" }} >
                                        <div className='tab-item' onClick={() => this.handleChooseTab1(listPos[0].id)} style={{ cursor: "pointer", marginRight: "5px" }}>{listPos[0].name}</div>
                                        <i class='fa fa-window-close' onClick={() => this.handleDelete(listPos[0].id)}></i>
                                    </li >
                                    {
                                        listPos.slice(1,listPos.length).map((item, index) => {
                                            return (
                                                <li key={index} className={index === this.state.selectTap ? "actives nav-item" : 'nav-item'} style={{ display: "flex", alignItems: "center", margin: "0 7px", backgroundColor: "#11398a", color: "white", padding: "5px 10px", borderRadius: "5px" }} >
                                                    <div className='tab-item' onClick={() => this.handleChooseTab(item.id,index)} style={{ cursor: "pointer", marginRight: "5px" }}>{item.name}</div>
                                                    <i class='fa fa-window-close' onClick={() => this.handleDelete(item.id)}></i>
                                                </li >
                                            )
                                        })
                                    }
                                </>
                                : ""
                        }
                        {/* {listPos !== null && listPos.length > 0 ? listPos.map((item, index) => {
                            return (
                                <li key={index} className={index === this.state.selectTap || index === 0 ? "actives nav-item" : 'nav-item'} style={{ display: "flex", alignItems: "center", margin: "0 7px", backgroundColor: "#11398a", color: "white", padding: "5px 10px", borderRadius: "5px" }} >
                                    <div className='tab-item' onClick={() => this.handleChooseTab(item.id,index)} style={{ cursor: "pointer", marginRight: "5px" }}>{item.name}</div>
                                    <i class='fa fa-window-close' onClick={() => this.handleDelete(item.id)}></i>
                                </li >
                            )
                        }) : ""
                        } */}
                        <li className='nav-item' style={{ display: 'flex', alignItems: "center", color: "white", fontSize: "20px" }}>
                            <i class='fas fa-plus' onClick={() => this.handleCreateTab()} ></i>
                        </li>
                    </ul>
                    <ul className="navbar-nav ml-auto" style={{ display: "flex", alignItems: "center" }}>
                        <div style={{ margin: 'auto' }} className={`nav-item dropdown no-arrow mx-1 `}>

                            <select id="input" className="form-control border-input" name="store" value={txtBranch} onChange={this.onChange}>
                                <option value="">-- Chọn chi nhánh --</option>
                                {this.showData(branchStore)}
                            </select>

                        </div>
                        <li className="nav-item dropdown no-arrow" style={{ margin: "0 10px" }}>
                            <a
                                className="nav-link dropdown-toggle"
                                href="/#"
                                id="userDropdown"
                                role="button"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                            >
                                <span className="mr-2 small" style={{ color: "white" }}>
                                    {user.name}
                                </span>
                                <img
                                    className="img-profile rounded-circle"
                                    src={user.avatar_image ? user.avatar_image : Env.IMG_NOT_FOUND}
                                    alt="" />
                            </a>
                        </li>
                        <li className='nav-item' id='btn-full' style={{ margin: "0 10px", color: "white", cursor: "pointer" }} onClick={this.fullScreen}>
                            <i class='fas fa-expand-arrows-alt fa-2x'></i>
                        </li >
                        <li className='nav-item' style={{ color: "white", cursor: "pointer" }} onClick={this.goBackHome}>
                            <i class='fas fa-home fa-2x'></i>
                        </li>
                        <li className='nav-item' style={{ margin: "0 10px" }}>
                            <button className='btn btn-primary'>Phím tắt</button>
                        </li>
                    </ul>
                </nav>
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