import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as productAction from "../../actions/product"
import * as profileAction from "../../actions/profile"
import * as posAction from '../../actions/post_order'
import { shallowEqual } from '../../ultis/shallowEqual'
import * as dashboardAction from "../../actions/dashboard"
import * as branchAction from "../../actions/branch"
import { removeSignNumber } from '../../ultis/helpers'
import { getBranchId, setBranchId } from '../../ultis/branchUtils'
import * as productApi from "../../data/remote/product";
import ModalBranch from './ModalBranch'
import ModalKeyboard from './ModalKeyboard'
import ModalDelete from './ModalDelete'
import { filter_arr, format } from '../../ultis/helpers'
import { findTotalStockPos } from '../../ultis/productUltis'
import * as Env from "../../ultis/default"

import { AsyncPaginate } from "react-select-async-paginate";
import CardProduct from './CardProduct'




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

                var branch_id = getBranchId()

                if (branch_id != null) {
                    this.setState({ branchId: branch_id })

                } else {
                    branch_id = nextProps.branchStore[0]?.id
                    setBranchId(branch_id)

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
        window.location.href = "/";
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


    loadProducts = async (search, loadedOptions, { page }) => {



        var { store_code } = this.props;
        var branch_id = getBranchId();

        const params = `&search=${search}`;
        const res = await productApi
            .fetchAllProductV2(store_code, branch_id, page, params);


        if (res.status != 200) {
            return {
                options: [],
                hasMore: false,
            }
        }

        return {
            options: res.data.data.data.map((i) => {
                return {
                    value: i.id,
                    label: `${i.name}`,
                    product: i
                };
            }),

            hasMore: res.data.data.data.length == 20,
            additional: {
                page: page + 1,
            },
        };
    };

    handleInfoProduct = (inventory, id, name, image, price, distributes, maxPrice, minPrice, priceDiscount, quayntity, quantityDistribute, product) => {

        if (distributes.length > 0) {
            window.$("#modalDetail").modal("show");
            this.setState({ isToggle: true })
            this.props.handleCallbackProduct({
                inventoryProduct: inventory, idProduct: id, nameProduct: name, imageProduct: image,
                priceProduct: price, distributeProduct: distributes,
                minPriceProduct: minPrice, maxPriceProduct: maxPrice, discountProduct: priceDiscount,
                quantityProduct: quayntity,
                quantityProductWithDistribute: quantityDistribute,
                product: product
            })
        } else {
            this.setState({ isToggle: false })
            this.props.handleCallbackPushProduct({
                nameProduct: name,
                element_id: "",
                product_id: id,
                reality_exist: 0, nameDistribute: "",
                nameElement: "",
                nameSubDistribute: "",
                priceProduct: price,
                stock: quayntity,
                product: product
            })
        }

    }
    onChangeProduct = (selectValue) => {


        if (selectValue != null && selectValue.product != null) {
            var data = selectValue?.product
            this.handleInfoProduct(
                data.inventory,
                data.id,
                data.name,
                data.images,
                data.price, data.distributes,
                data.max_price, data.min_price,
                data.product_discount,
                data.quantity_in_stock,
                data.quantity_in_stock_with_distribute,
                data
            )
        }


    };

    render() {
        var { listPos, branchStore, user, store_code, currentBranch } = this.props;
        var { idCart, selected_product_id } = this.state

        const formatOptionLabel = ({ value, label, product }) => {

            return <CardProduct isItemSearch={true} product={product} />
        };



        return (
            <div className='controller-top'>
                <nav class="navbar navbar-expand navbar-light bg-white topbar static-top header-pos">

                    <div class="navbar-nav" style={{
                        alignItems: "center",
                        width: "100%"
                    }}

                    >

                        <div className='group-controller-first'>

                            <div className='first-list-top-cart'>
                                <li className='nav-item' style={{ color: "white", cursor: "pointer", marginRight: '10px' }} onClick={this.goBackHome}>
                                    <i class='fas fa-home fa-2x' style={{ fontSize: "22px" }}></i>
                                </li>
                                <li class="nav-item"
                                    style={{ flex: 1 }}
                                >

                                    <AsyncPaginate
                                        placeholder="(F3) Tìm kiếm sản phẩm"
                                         value={null}
                                        loadOptions={this.loadProducts}
                                        formatOptionLabel={formatOptionLabel}
                                        name="recipientReferences1"
                                        onChange={this.onChangeProduct}
                                        additional={{
                                            page: 1,
                                        }}
                                        styles={{
                                            width: "100%"
                                        }}
                                        debounceTimeout={500}
                                        isClearable
                                        isSearchable
                                    />


                                </li>


                            </div>
                            <div className='cart-list-banner'>
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
                            </div>
                        </div>

                        <div className='end-list-top-cart'>


                            <li className='nav-item' style={{
                                display: 'flex', alignItems: "center",
                                color: "white", fontSize: "15px",
                                padding: "10px",
                                paddingLeft: "25px",
                                cursor: "pointer"
                            }} onClick={() => this.handleCreateTab()}>
                                <i class='fas fa-plus' ></i>
                            </li>

                            <ul className="navbar-nav ml-auto" style={{ display: "flex", alignItems: "center" }}>
                                <li className="nav-item dropdown no-arrow" style={{ margin: "0 10px", fontSize: "17px" }}>
                                    <div className='wrap-info' data-toggle="modal" data-target="#modalBranch" style={{ display: "flex", color: "white", cursor: "pointer" }}>
                                        <i class="fa fa-map-marker" aria-hidden="true"></i>
                                        <span className="mr-2 small" style={{
                                            color: "white", marginLeft: "5px",
                                            textOverflow: "ellipsis",
                                            whiteSpace: "nowrap",
                                            overflow: "hidden",
                                        }}>
                                            {currentBranch?.name ?? "Chưa có chi nhánh"}
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
                                    {!this.state.fullScreen ?
                                        <i class='fas fa-expand-arrows-alt fa-2x' style={{ fontSize: "22px" }}></i> :
                                        <i class='fas fa-compress-arrows-alt' style={{ fontSize: "22px" }}></i>
                                    }

                                </li >

                                <li className='nav-item' style={{ margin: "0 10px" }}>
                                    <button className='btn' style={{ color: "white", border: "1px solid" }} data-toggle="modal" data-target="#modalKeyboard">Phím tắt</button>
                                </li>
                            </ul>
                        </div>
                    </div>


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