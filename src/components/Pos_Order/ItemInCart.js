import React, { Component } from "react";
import { format } from "../../ultis/helpers";
import { shallowEqual } from "../../ultis/shallowEqual";
import * as OrderAction from "../../actions/add_order";
import { connect } from "react-redux";
import { debounce } from "lodash";
import * as Env from "../../ultis/default";
import * as posAction from '../../actions/post_order'
import ReactDOM from 'react-dom';
import { findImportPrice, findImportPriceSub, findPrice, findTotalStock, stockOfProduct } from '../../ultis/productUltis'

class ItemInCart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentQuantity: 1,
            distribute: "",
            maxQuantityDistribute: "",
            idElement: "",
            distributeName: "",
            distributeValue: "",
            element_distributes: "",
            distributeSelected: -1,
            subElementDistributeSelected: -1,
            elementNameSelected: "",
            subElementNameDistributeSelected: "",

            afterPrice: "",
            priceBeforeDiscount: "",
            afterChoosePrice: "",
            elementObject: "",
            minPriceAfterDiscount: "",
            maxPriceAfterDiscount: "",
            stateDistribute: false,
            messageErr: "",
            quantityInStock: "",
            elementDistributeOj: "",
            totalStocks: 0,

        };
        this.nameElementDistribute = "";
        this.nameSubElementDistribute = "";
        this.wrapperRef = React.createRef()
        this.changeQuantity = debounce(this.handleChangeQuantity, 400);
    }



    handleChangeQuantity = (quantity) => {
        this.props.addQuantity(
            this.props.item.product.id,
            this.props.item.id,
            quantity,
            this.props.item.distributes_selected
        );
    };

    // componentDidMount = () => {

    //     document.addEventListener('mousedown', this.handleClickOutside, true);
    // }

    handleClickOutside = event => {
        try {
            if (this.props.chooseId != null
            ) {
                var checkHasContain = false
                var path = event.path
                console.log(path)
                for (const element of path) {
                    if (element.className == "shopee-arrow-box__content") {
                        checkHasContain = true

                    }
                }

                if (checkHasContain == false) {
                    this.props.showDetail(null)
                }

                console.log(checkHasContain)
            }

        } catch (error) {
            console.log(error)
        }
    }

    // componentWillReceiveProps(nextProps, nextState) {
    //     var { inventoryProduct } = nextProps.item.product
    //     const totalStock = findTotalStock(inventoryProduct)

    //     this.setState({ quantityInStock: totalStock })
    //     if (!shallowEqual(nextProps.item.product.inventoryProduct, this.props.item.product.inventoryProduct)) {

    //         // this.setState({ quantityInStock: nextProps.item.product.inventoryProduct.main_stock })
    //     }

    //     if (nextProps.item.product.minPriceProduct !== this.state.minPriceProduct) {
    //         this.setState({ afterPrice: nextProps.item.product.minPriceProduct })
    //     }
    //     var { minPriceProduct, maxPriceProduct, discountProduct } = nextProps.item.product
    //     if (nextProps.item.product.minPriceProduct !== this.props.item.product.minPriceProduct) {
    //         if (discountProduct !== null) {
    //             var minPrice = minPriceProduct - (minPriceProduct * discountProduct.value / 100)
    //             var maxPrice = maxPriceProduct - (maxPriceProduct * discountProduct.value / 100)
    //             this.setState({ minPriceAfterDiscount: minPrice, maxPriceAfterDiscount: maxPrice })
    //         }

    //     }

    // }




    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
        // var { inventory } = nextProps.item.product
        // const totalStock = findTotalStock(inventory)

        // this.setState({ quantityInStock: totalStock })
        // if (!shallowEqual(nextProps.item?.product.inventory, this.props.item?.product.inventory) || (this.props.resetId != nextProps.resetId && nextProps.chooseId == nextProps.item.id)) {

        //     // this.setState({ quantityInStock: nextProps.item.product.inventoryProduct.main_stock })
        // }

        // if (nextProps.item.product.min_price !== this.state.min_price) {
        //     this.setState({ afterPrice: nextProps.item.product.min_price })
        // }
        // var { min_price, max_price, product_discount } = nextProps.item.product
        // if (nextProps.item.product.min_price !== this.props.item.product.min_price || (this.props.resetId != nextProps.resetId && nextProps.chooseId == nextProps.item.id)) {
        //     if (product_discount) {
        //         var minPrice = min_price - (min_price * product_discount.value / 100)
        //         var maxPrice = max_price - (max_price * product_discount.value / 100)
        //         this.setState({ minPriceAfterDiscount: minPrice, maxPriceAfterDiscount: maxPrice })
        //     }

        // }
        if (!shallowEqual(this.props.item.quantity, nextProps.item.quantity) || (this.props.resetId != nextProps.resetId && nextProps.chooseId == nextProps.item.id)) {
            this.setState({ currentQuantity: nextProps.item.quantity });
        }

        if (!shallowEqual(this.state.currentQuantity, nextProps.item.quantity) || (this.props.resetId != nextProps.resetId && nextProps.chooseId == nextProps.item.id)) {
            this.setState({ currentQuantity: nextProps.item.quantity });
        }
        if (!shallowEqual(
            nextProps.item?.distributes_selected,
            this.props.item?.distributes_selected) || (nextProps.item.product?.id != this.props.item.product?.id) || (this.props.resetId != nextProps.resetId && nextProps.chooseId == nextProps.item.id)) {
            const { item } = nextProps;

            var itemParent =
                item.product &&
                    item.product?.inventory &&
                    item.product?.inventory.distributes !== null &&
                    item.product?.inventory.distributes.length > 0
                    ? item.product?.inventory.distributes[0]
                    : [];

            var subElementNameDistributeSelected = null;

            itemParent.element_distributes &&
                itemParent.element_distributes[0].sub_element_distributes.map(
                    (itemChild, index) => {
                        this.setState({
                            subElementDistributeSelected: index,
                            subElementNameDistributeSelected: itemChild.name,
                        });

                        subElementNameDistributeSelected = itemChild.name

                    })


            itemParent.element_distributes &&
                itemParent.element_distributes.map((itemChild, index) => {
                    if (itemChild.id == item.element_distribute_id) {
                        this.setState({
                            distributeName: itemParent.name,
                            distributeSelected: index,
                            elementNameSelected: itemChild.name,
                        });
                        this.handleNewPriceOrStock(itemChild.name, subElementNameDistributeSelected)

                    }


                })



        }
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside, true);

        this.setState({
            currentQuantity: this.props.item.quantity,
            distribute: this.props.item.product.distributes,
        });
    }

    subQuantity(idCart, id, productId, quantity, distribute) {
        const q = quantity - 1 < 1 ? 1 : quantity - 1;
        this.setState({
            currentQuantity: q,
        });
        this.changeQuantity(q);
    }

    addQuantity(productId, lineItemId, quantity, distribute, quantityInStock) {
        if (
            this.props.item.distributes_selected !== null &&
            this.props.item.distributes_selected.length > 0
        ) {
            const q = quantity + 1;
            this.setState({
                currentQuantity: q,
            });
            this.changeQuantity(q);
        } else {
            const q = quantity + 1;
            this.setState({
                currentQuantity: q,
            });
            this.changeQuantity(q);
        }
    }
    handleOnChange = (e) => {
        const quantity = e.target.value;

        this.changeQuantity(quantity);

        if (
            this.props.item.distributes_selected !== null &&
            this.props.item.distributes_selected.length > 0
        ) {
            const q = quantity;
            this.setState({
                currentQuantity: q,
            });
            return;
        } else {
            const q = quantity;
            this.setState({
                currentQuantity: q,
            });
        }
    };
    handleDelete = (idCart, productId, lineId, distribute) => {
        this.props.handleDelete(idCart, productId, lineId, distribute);
    };


    handleUpdateCallbackProduct = (inventory, id, name, image, price, distributes, maxPrice, minPrice, priceDiscount, quayntity, quantityDistribute, product, productWithCart, currentQuantity, distributes_selected) => {
        this.props.handleUpdateCallbackProduct({
            inventoryProduct: inventory, idProduct: id, nameProduct: name, imageProduct: image,
            priceProduct: price, distributeProduct: distributes,
            minPriceProduct: minPrice, maxPriceProduct: maxPrice, discountProduct: priceDiscount,
            quantityProduct: quayntity,
            quantityProductWithDistribute: quantityDistribute,
            product: product,
            productWithCart: productWithCart,
            currentQuantity,
            distributes_selected
        })
    }

    passData = (id, product, currentQuantity, distributes_selected) => {
        var { products } = this.props
        console.log(id, products);
        for (const data of products) {

            if (data.id == id && data.distributes?.length > 0) {

                this.handleUpdateCallbackProduct(

                    data.inventory,
                    data.id,
                    data.name,
                    data.images,
                    data.price, data.distributes,
                    data.max_price, data.min_price,
                    data.product_discount,
                    data.quantity_in_stock,
                    data.quantity_in_stock_with_distribute,
                    data,
                    product,
                    currentQuantity,
                    distributes_selected



                )
                return;
            }
        }
    }

    handleNewPriceOrStock = (elementDistributeName, subElementDistribute) => {
        var product = this.props.item.product
        var price = findPrice(product, elementDistributeName, subElementDistribute)
        var stock = stockOfProduct(product, elementDistributeName, subElementDistribute)


        if (price != null) {
            this.setState({
                afterChoosePrice: price,
                // priceBeforeDiscount: sub_elements.price,
                afterPrice: price,
                priceBeforeDiscount: price,

                quantityInStock: stock,
                // idElement: id,
                messageErr: ""
            })
        }
    }
    handleClick = (nameDistribute, nameObject, index, id, quatity) => {
        this.setState({
            distributeName: nameObject,
            distributeSelected: index,
            elementNameSelected: nameDistribute,
        });

        this.handleNewPriceOrStock(nameDistribute, this.state.subElementNameDistributeSelected)

    };

    handleClickSubElement = (nameElement, price, index, id) => {
        this.setState({
            subElementDistributeSelected: index,
            subElementNameDistributeSelected: nameElement,
        });
        this.handleNewPriceOrStock(this.state.elementNameSelected, nameElement)

    };


    closeModalClickOutSite = (length) => {
        if (length == 0 || !length) {
            if (this.props.chooseId != null) {
                this.props.showDetail(null)
            }
        }
    }

    updateCart = () => {
        const {
            distributeName,
            currentQuantity,
            subElementNameDistributeSelected,
            elementNameSelected,

        } = this.state;
        var { store_code, branch_id, item } = this.props
        var { list_cart_id } = item
        var data = {
            line_item_id: item.id,
            product_id: item.product.id,
            quantity: currentQuantity,
            distribute_name: distributeName,
            element_distribute_name: elementNameSelected,
            sub_element_distribute_name: subElementNameDistributeSelected
        }
        this.props.updateQuantityLineItem(store_code, branch_id, list_cart_id, data)
        this.props.showDetail(null)
    }

    //   nameProduct: item.product.nameProduct,
    //   product_id: item.product.idProduct,
    //   element_id: idElement,
    //   reality_exist: 0,
    //   nameDistribute: distributeName,
    //   nameElement: elementNameSelected,
    //   nameSubDistribute: subElementNameDistributeSelected,
    //   priceProduct: afterChoosePrice,
    //   stock: quantityInStock,

    // product_id: nextState.listPosItem.product_id,
    // quantity: 1,
    // distribute_name: nextState.listPosItem.nameDistribute,
    // element_distribute_name: nextState.listPosItem.nameElement,
    // sub_element_distribute_name: nextState.listPosItem.nameSubDistribute

    // "line_item_id": 3825,
    // "product_id": 26864,
    // "quantity": 0,
    // "distribute_name": "lao",
    // "element_distribute_name": "dsss",
    // "sub_element_distribute_name": "đo111"
    render() {
        const { item, index } = this.props;
        const { currentQuantity } = this.state;

        const maxQuantity = stockOfProduct(
            item.product,
            item.distributes_selected[0]?.value,
            item.distributes_selected[0]?.sub_element_distributes
        );
        const allowAdd = true;

        var itemParent =
            item.product &&
                item.product?.inventory &&
                item.product?.inventory.distributes !== null &&
                item.product?.inventory.distributes.length > 0
                ? item.product?.inventory.distributes[0]
                : [];
        console.log("itemmm", item, this.state);
        var is_bonus = item.is_bonus
        var allows_choose_distribute = item.allows_choose_distribute

        return (
            <div
                onClick={() => { this.closeModalClickOutSite(item.product.distributes?.length) }}
                class={`card card-item-pos ${is_bonus === true ? "border-item-bonus1" : ""}`}
                style={{ marginBottom: "10px" }}
                key={index}
            >
                <div class="card-body" style={{ padding: "0", position: "relative" }}>
                    <div
                        className="wrap-item"
                        style={{
                            display: "flex",
                            fontSize: "1rem",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <div className="index">{index + 1}</div>

                        <img
                            src={
                                item.product.images.length > 0
                                    ? item.product.images[0].image_url
                                    : Env.IMG_NOT_FOUND_2
                            }
                            className="img-responsive image-product"
                            alt="Image"
                            width="50px"
                            height="50px"
                        />

                        <div
                            className="info-product"
                            style={{
                                width: "30%",
                                fontWeight: "400",
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            <div
                                className="name-product"
                                style={{
                                    overflow: "hidden",
                                    whiteSpace: "nowrap",
                                    textOverflow: "ellipsis",
                                }}
                            >
                                {item.product.name}
                            </div>
                            {item.product.distributes?.length > 0 &&
                                <div
                                    className="wrap-distributes_selected"
                                    style={{ fontSize: "12px", fontStyle: "italic" }}
                                >

                                    <div class="_34KJXV"  >
                                        {/* <div class="_34KJXV" onClick={() => this.passData(item.product.id, item.product, currentQuantity, item.distributes_selected)} > */}
                                        <div class="aUj6f2">
                                            <div class="_1XT_GF" role="button" tabindex="0" >

                                                <div class="Qtk_DO" id={`item_pos_${this.props.key}`} ref={this.ref} onClick={() => { (is_bonus === false || allows_choose_distribute === true ) && this.props.showDetail(item.id) }}>
                                                    Phân loại hàng: {(is_bonus === false || allows_choose_distribute === true ) && <button class="vZLqsj _2zsvOt"></button>}
                                                </div>
                                                {
                                                    this.props.chooseId == item.id &&
                                                    <div className="detail" ref={this.ref} >
                                                        <div class="_3qAzj1 shopee-modal__transition-enter-done">
                                                            <div class="shopee-arrow-box__container">
                                                                <div class="shopee-arrow-box__arrow shopee-arrow-box__arrow--center">
                                                                    <div class="shopee-arrow-box__arrow-outer">
                                                                        <div class="shopee-arrow-box__arrow-inner"></div>
                                                                    </div>
                                                                </div>
                                                                <div class="shopee-arrow-box__content">

                                                                    <div class="_32z-AY">
                                                                        <div class="_39MbPI">
                                                                            <div className='info-voucher' style={{
                                                                                display: "flex", flexDirection: "column", justifyContent: "space-around", "border-bottom": "1px solid #cec6c6",
                                                                                width: "100%", "margin-bottom": "10px"
                                                                            }}>
                                                                                <div>
                                                                                    <div className='value' style={{
                                                                                        fontWeight: "bold",

                                                                                        textOverflow: "ellipsis"
                                                                                    }}>{item.product.nameProduct}</div>


                                                                                    <div className='code' style={{ color: "black" }}><span>Giá sản phẩm: &nbsp;{this.state.afterChoosePrice === '' ? item.product.product_discount === null ?
                                                                                        item.product.min_price == item.product.max_price ?
                                                                                            format(Number(item.product.minPriceProduct))
                                                                                            :
                                                                                            `${format(Number(item.product.min_price))}-${format(Number(item.product.max_price))}`
                                                                                        : this.state.minPriceAfterDiscount === this.state.maxPriceAfterDiscount ? `${format(Number(this.state.minPriceAfterDiscount))}` : `${format(Number(this.state.minPriceAfterDiscount))} - ${format(Number(this.state.maxPriceAfterDiscount))}`
                                                                                        : format(Number(this.state.afterChoosePrice))}</span>
                                                                                    </div>


                                                                                    {/* <div className='before-discout' style={{ display: "flex" }} >
                                                                                        <span style={{ fontSize: "13px", textDecoration: "line-through" }}>{item.product.product_discount ?
                                                                                            this.state.afterChoosePrice === "" ? item.product.min_price === item.product.max_price ? format(Number(this.state.afterPrice)) : `${format(Number(item.product.min_price))} - ${format(Number(item.product.max_price))}` : format(Number(this.state.priceBeforeDiscount)) : ""}</span>
                                                                                        <div className='persen-discount' style={{ fontSize: "13px", marginLeft: "10px" }}>{item.product.product_discount ? `- ${item.product.product_discount.value}%` : ""}</div>
                                                                                    </div> */}

                                                                                    {item.product?.check_inventory && <div className='quantity-product'
                                                                                        style={{ fontSize: "13px", color: "grey" }}>
                                                                                        Tồn kho hiện tại {this.state.quantityInStock} sản phẩm
                                                                                    </div>
                                                                                    }

                                                                                </div>






                                                                            </div>
                                                                            <div class="_3gvvQI">
                                                                                <div class="_3_Bulc">{itemParent.name}</div>
                                                                                {itemParent.element_distributes &&
                                                                                    itemParent.element_distributes.map(
                                                                                        (itemChild, index) => {
                                                                                            var elemet =
                                                                                                index === this.state.distributeSelected ? (
                                                                                                    <button
                                                                                                        onClick={() =>
                                                                                                            this.handleClick(
                                                                                                                itemChild.name,
                                                                                                                itemParent.name,
                                                                                                                index,
                                                                                                                itemChild.id,
                                                                                                                itemChild.stock
                                                                                                            )
                                                                                                        }
                                                                                                        class="product-variation product-variation--selected"
                                                                                                    >
                                                                                                        {itemChild.name}
                                                                                                        <div class="product-variation__tick">

                                                                                                        </div>
                                                                                                    </button>
                                                                                                ) : (
                                                                                                    <button
                                                                                                        onClick={() =>
                                                                                                            this.handleClick(
                                                                                                                itemChild.name,
                                                                                                                itemParent.name,
                                                                                                                index,
                                                                                                                itemChild.id,
                                                                                                                itemChild.stock
                                                                                                            )
                                                                                                        }
                                                                                                        class="product-variation"
                                                                                                    >
                                                                                                        {itemChild.name}
                                                                                                    </button>
                                                                                                );
                                                                                            return elemet;
                                                                                        }
                                                                                    )}
                                                                            </div>
                                                                            <div class="_3gvvQI">
                                                                                <div class="_3_Bulc">
                                                                                    {itemParent.sub_element_distribute_name}
                                                                                </div>
                                                                                {itemParent.element_distributes &&
                                                                                    itemParent.element_distributes[0].sub_element_distributes.map(
                                                                                        (itemChild, index) => {
                                                                                            var elemet =
                                                                                                index ===
                                                                                                    this.state.subElementDistributeSelected ? (
                                                                                                    <button
                                                                                                        onClick={() =>
                                                                                                            this.handleClickSubElement(
                                                                                                                itemChild.name,
                                                                                                                itemChild.price,
                                                                                                                index,
                                                                                                                itemChild.id
                                                                                                            )
                                                                                                        }
                                                                                                        class="product-variation product-variation--selected"
                                                                                                    >
                                                                                                        {itemChild.name}
                                                                                                        <div class="product-variation__tick">

                                                                                                        </div>
                                                                                                    </button>
                                                                                                ) : (
                                                                                                    <button
                                                                                                        onClick={() =>
                                                                                                            this.handleClickSubElement(
                                                                                                                itemChild.name,
                                                                                                                itemChild.price,
                                                                                                                index,
                                                                                                                itemChild.id
                                                                                                            )
                                                                                                        }
                                                                                                        class="product-variation"
                                                                                                    >
                                                                                                        {itemChild.name}
                                                                                                    </button>
                                                                                                );
                                                                                            return elemet;
                                                                                        }
                                                                                    )}

                                                                                {/* <button
                                                class="product-variation"
                                                aria-label="Công Danh-Thăng Tiến"
                                                aria-disabled="false"
                                            >
                                                Công Danh-Thăng Tiến
                                            </button>

                                            <button
                                                class="product-variation product-variation--selected"
                                                aria-label="Thần Tài Giữ Của"
                                                aria-disabled="false"
                                            >
                                                Thần Tài Giữ Của
                                                <div class="product-variation__tick">
                                                    <svg
                                                        enable-background="new 0 0 12 12"
                                                        viewBox="0 0 12 12"
                                                        x="0"
                                                        y="0"
                                                        class="shopee-svg-icon icon-tick-bold"
                                                    >
                                                        <g>
                                                            <path d="m5.2 10.9c-.2 0-.5-.1-.7-.2l-4.2-3.7c-.4-.4-.5-1-.1-1.4s1-.5 1.4-.1l3.4 3 5.1-7c .3-.4 1-.5 1.4-.2s.5 1 .2 1.4l-5.7 7.9c-.2.2-.4.4-.7.4 0-.1 0-.1-.1-.1z"></path>
                                                        </g>
                                                    </svg>
                                                </div>
                                            </button> */}
                                                                            </div>
                                                                            <div class="_18oYnx">
                                                                                <button class="cancel-btn" onClick={() => { this.props.showDetail(null) }}>
                                                                                    Trở Lại
                                                                                </button>
                                                                                <button class="shopee-button-solid shopee-button-solid--primary" onClick={this.updateCart}>
                                                                                    Xác nhận
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                }

                                                <div class="_3dqm1i">{(item.distributes_selected ?? []).map((v, i) => (
                                                    <div>{`${v.name}: ${v.value}`}</div>
                                                ))}
                                                    {item.distributes_selected &&
                                                        item.distributes_selected.length > 0
                                                        ? item.distributes_selected[0] &&
                                                        item.product.distributes[0].sub_element_distribute_name &&
                                                        item.distributes_selected[0].sub_element_distributes && (
                                                            <div>
                                                                {`${item.product.distributes[0].sub_element_distribute_name}: 
                                            ${item.distributes_selected[0].sub_element_distributes}`}
                                                            </div>
                                                        )
                                                        : ""}</div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            }

                        </div>

                        <div className="quantity" style={{ paddingLeft: "0" }}>
                            <div
                                className=""
                                style={{
                                    float: "right",
                                    border: "1px solid #9c9898ba",
                                    borderRadius: "2px",
                                }}
                            >
                                <button
                                    className="btn-sub"
                                    onClick={() => is_bonus === false &&
                                        this.subQuantity(
                                            item.list_cart_id,
                                            item.id,
                                            item.product.id,
                                            currentQuantity,
                                            item.distributes_selected
                                        )
                                    }
                                    style={{ width: "20px", border: "none" }}
                                >
                                    -
                                </button>
                                <input
                                    disabled =  {is_bonus}
                                    className="input-quantity"
                                    onChange={(e) => is_bonus === false && this.handleOnChange(e)}
                                    style={{
                                        width: "40px",
                                        textAlign: "center",
                                        fontWeight: "400",
                                    }}
                                    value={currentQuantity}
                                ></input>
                                <button
                                    disabled={!allowAdd}
                                    className="btn-add"
                                    onClick={() =>
                                        is_bonus === false &&
                                        this.addQuantity(
                                            item.product.id,
                                            item.id,
                                            currentQuantity,
                                            item.distributes_selected,
                                            item.product.quantity_in_stock
                                        )
                                    }
                                    style={{ width: "20px", border: "none" }}
                                >
                                    +
                                </button>
                            </div>
                        </div>
                        <div className="cost" style={{ width: "15%", fontWeight: "400" }}>
                            {format(Number(item.item_price))}
                            {item.before_discount_price != item.item_price && (
                                <div className=" past-price-pos">
                                    {" "}
                                    {format(Number(item.before_discount_price))}
                                </div>
                            )}
                        </div>

                        {
                            is_bonus === true ? <div
                                className="total-price"
                                style={{ width: "13%", fontWeight: "500" }}
                            >
                                {/* {item.bonus_product_name ?? "Thưởng sản pham"} */}
                                Sản phẩm tặng
                            </div> : <div
                                className="total-price"
                                style={{ width: "13%", fontWeight: "500" }}
                            >
                                {format(Number(item.item_price * currentQuantity))}
                            </div>
                        }
                        <div style={{ width: "5%" }}>
                            {is_bonus === true ?
                                <i class="fa fa-gift" style={{
                                    "font-size": "40px",
                                    color: "darkorange",
                                    /* float: right; */
                                    padding: "12px"
                                }}></i> :
                                <i
                                    className="fa fa-trash icon-trash-pos"
                                    onClick={() =>

                                        this.handleDelete(
                                            item.list_cart_id,
                                            item.product.id,
                                            item.id,
                                            item.distributes_selected
                                        )
                                    }
                                ></i>
                            }

                        </div>
                    </div>

                </div>
            </div >
        );
    }
}






const mapDispatchToProps = (dispatch, props) => {
    return {
        showAlertMaxQuantity: () => {
            dispatch(OrderAction.showAlertMaxQuantity());
        },
        updateQuantityLineItem: (store_code, branch_id, idCart, data) => {
            dispatch(posAction.updateQuantityLineItem(store_code, branch_id, idCart, data))
        },
    };
};
export default connect(null, mapDispatchToProps)(ItemInCart);
