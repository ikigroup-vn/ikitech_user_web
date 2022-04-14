import React, { Component } from 'react'
import { format } from '../../ultis/helpers'
import * as Env from "../../ultis/default"
import { shallowEqual } from '../../ultis/shallowEqual'
import { findImportPrice, findImportPriceSub, findPrice, findTotalStock, stockOfProduct } from '../../ultis/productUltis'

class ModalDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
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
        }
    }
    componentDidMount() {

    }


    handleNewPriceOrStock = (elementDistributeName, subElementDistribute) => {
        var product = this.props.modal.product
        var price = findPrice(product, elementDistributeName, subElementDistribute)
        var stock = stockOfProduct(product, elementDistributeName, subElementDistribute)


        if (price != null) {
            this.setState({
                afterChoosePrice: price,
                // priceBeforeDiscount: sub_elements.price,
                quantityInStock: stock,
                // idElement: id,
                messageErr: ""
            })
        }
    }

    handleClick = (nameDistribute, nameObject, index, id, quatity) => {

        this.setState({
            distributeSelected: index,
            elementNameSelected: nameDistribute,
        })

        this.handleNewPriceOrStock(nameDistribute, this.state.subElementNameDistributeSelected)
    }

    handleClickSubElement = (nameElement, price, index, id) => {


        this.setState({
            subElementDistributeSelected: index,
            subElementNameDistributeSelected: nameElement
        })

        this.handleNewPriceOrStock(this.state.elementNameSelected, nameElement)

        // var { sub_element_distributes } = this.state.elementObject
        // var sub_element_distribute = this.state.elementDistributeOj.sub_element_distributes
        // var subImport = findImportPriceSub(sub_element_distribute, nameElement)
        // console.log("subImport", subImport)
        // if (this.props.modal.discountProduct) {
        //     var { value } = this.props.modal.discountProduct
        //     this.setState({ subElementDistributeSelected: index, element_distributes: nameElement })
        //     var indexDistribute = sub_element_distributes.map(e => e.name).indexOf(nameElement)
        //     var sub_element = sub_element_distributes[indexDistribute]
        //     this.setState({
        //         afterChoosePrice: sub_element.price - (sub_element.price * value / 100),
        //         priceBeforeDiscount: sub_element.price,
        //         quantityInStock: sub_element.stock, messageErr: "",
        //         idElement: id,
        //     })
        // } else {
        //     if (sub_element_distributes) {
        //         this.setState({ subElementDistributeSelected: index, element_distributes: nameElement })
        //         var indexDistributes = sub_element_distributes.map(e => e.name).indexOf(nameElement)
        //         var sub_elements = sub_element_distributes[indexDistributes]
        //         this.setState({
        //             afterChoosePrice: subImport?.price ?? 0,
        //             priceBeforeDiscount: sub_elements.price,
        //             quantityInStock: sub_elements.stock,
        //             idElement: id,
        //             messageErr: ""
        //         })
        //     } else {
        //         this.setState({ afterChoosePrice: subImport.price, subElementDistributeSelected: index, idElement: id, element_distributes: nameElement })
        //     }

        // }

    }
    handleClose = () => {
        this.setState({
            afterChoosePrice: "",
            distributeSelected: -1,
            subElementDistributeSelected: -1,
            messageErr: "",
            quantityInStock: 0
        })
    }
    handleCallback = () => {
        var info = this.props.modal
        const { distributeName,
            distributeValue,
            element_distributes,
            subElementNameDistributeSelected,
            elementNameSelected,
            quantityInStock,
            idElement,
            afterChoosePrice,
            afterPrice } = this.state
        console.log("info", info)
        if (info.distributeProduct.length === 0) {
            window.$('.modal').modal('hide');

            this.props.handleCallbackPushProduct({
                nameProduct: this.props.modal.nameProduct,
                element_id: this.props.modal.idProduct,
                product_id: this.props.modal.idProduct,
                reality_exist: 0, nameDistribute: subElementNameDistributeSelected,
                nameElement: elementNameSelected,
                nameSubDistribute: element_distributes,
                priceProduct: afterPrice,
                stock: this.props.modal.inventoryProduct.main_stock
            })
            return
        }

        if (this.state.distributeSelected === -1) {
            this.setState({ messageErr: `Chưa chọn ${this.props.modal.distributeProduct[0].name}` })
            return
        }
        if (info.distributeProduct[0].element_distributes[0].sub_element_distributes.length === 0) {
            window.$('.modal').modal('hide');
            this.props.handleCallbackPushProduct({
                nameProduct: this.props.modal.nameProduct,
                product_id: this.props.modal.idProduct,
                element_id: idElement,
                reality_exist: 0, nameDistribute: distributeName,
                nameElement: distributeValue,
                nameSubDistribute: element_distributes,
                priceProduct: afterChoosePrice,
                stock: quantityInStock
            })
            this.setState({ distributeSelected: -1, messageErr: "", afterChoosePrice: "", element_distributes: "", distributeValue: "" })
            return
        }
        if (this.state.subElementDistributeSelected === -1) {
            this.setState({ messageErr: `Chưa chọn ${this.props.modal.distributeProduct[0].sub_element_distribute_name}` })
            return
        }

        window.$('.modal').modal('hide');

        this.props.handleCallbackPushProduct({
            nameProduct: this.props.modal.nameProduct,
            product_id: this.props.modal.idProduct,
            element_id: idElement,
            reality_exist: 0,
            nameDistribute: distributeName,
            nameElement: distributeValue,
            nameSubDistribute: element_distributes,
            priceProduct: afterChoosePrice,
            stock: quantityInStock
        })
        this.setState({
            distributeSelected: -1,
            subElementDistributeSelected: -1,
            messageErr: "",
            afterChoosePrice: "", element_distributes: "", distributeValue: ""
        })
    }
    componentWillReceiveProps(nextProps, nextState) {
        var { inventoryProduct } = nextProps.modal
        const totalStock = findTotalStock(inventoryProduct)
        console.log("totalStock", totalStock)
        this.setState({ quantityInStock: totalStock })
        if (!shallowEqual(nextProps.modal.inventoryProduct, this.props.modal.inventoryProduct)) {

            // this.setState({ quantityInStock: nextProps.modal.inventoryProduct.main_stock })
        }

        if (nextProps.modal.priceProduct !== this.state.afterPrice) {
            this.setState({ afterPrice: nextProps.modal.priceProduct })
        }
        var { minPriceProduct, maxPriceProduct, discountProduct } = nextProps.modal
        if (nextProps.modal.minPriceProduct !== this.props.modal.minPriceProduct) {
            if (discountProduct !== null) {
                var minPrice = minPriceProduct - (minPriceProduct * discountProduct.value / 100)
                var maxPrice = maxPriceProduct - (maxPriceProduct * discountProduct.value / 100)
                this.setState({ minPriceAfterDiscount: minPrice, maxPriceAfterDiscount: maxPrice })
            }

        }

    }
    render() {
        var { allow_semi_negative } = this.props

        var product = this.props.modal.product
        var allowBuy = product?.check_inventory == false || allow_semi_negative == true || this.state.quantityInStock > 0

        var inforProduct = this.props.modal

        var itemParent = inforProduct && inforProduct.inventoryProduct && inforProduct.inventoryProduct.distributes !== null && inforProduct.inventoryProduct.distributes.length > 0 ? inforProduct.inventoryProduct.distributes[0] : []
        return (
            <div class="modal" id="modalDetail">
                <div class="modal-dialog">
                    <div class="modal-content" >
                        <div className='model-header-modal' style={{ display: 'flex', justifyContent: "space-between", margin: "10px 15px" }}>
                            <p class="" style={{ margin: "0px", fontWeight: "bold" }}>Chi tiết sản phẩm</p>
                            <button type="button" class="close" onClick={this.handleClose} data-dismiss="modal">&times;</button>
                        </div>
                        <div class="modal-body" style={{ position: "relative", marginBottom: "20px" }}>
                            <button class="btn btn-info" onClick={allowBuy ? this.handleCallback : null} style={{
                                backgroundColor: allowBuy ? "green" : "grey",
                                position: "absolute",
                                right: "15px",
                                top: "20px",
                                zIndex: "10000"
                            }}>Thêm</button>
                            <div className='model-card row' style={{ margin: "5px", width: "80%" }}>
                                <div className='name-voucher col-4' style={{ width: "120px", height: "120px", padding: "8px" }}>
                                    <div style={{ justifyContent: "center", width: "100%", height: "100%", borderRadius: "0.25em", display: "flex", alignItems: "center" }}>
                                        <img src={inforProduct.imageProduct.length > 0 ? inforProduct.imageProduct[0].image_url : Env.IMG_NOT_FOUND} alt='' style={{ width: "100%" }}></img>
                                    </div>
                                </div>
                                <div className='info-voucher col-8' style={{ display: "flex", flexDirection: "column", justifyContent: "space-around" }}>
                                    <div>
                                        <div className='value' style={{ fontWeight: "bold", width: "220px", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>{inforProduct.nameProduct}</div>
                                        <div className='code' style={{ color: "red" }}><span>{this.state.afterChoosePrice === '' ? inforProduct.discountProduct === null ?
                                            this.props.modal.minPriceProduct == this.props.modal.maxPriceProduct ? format(Number(this.props.modal.minPriceProduct)) : `${format(Number(this.props.modal.minPriceProduct))}-${format(Number(this.props.modal.maxPriceProduct))}` : this.state.minPriceAfterDiscount === this.state.maxPriceAfterDiscount ? `${format(Number(this.state.minPriceAfterDiscount))}` : `${format(Number(this.state.minPriceAfterDiscount))} - ${format(Number(this.state.maxPriceAfterDiscount))}`
                                            : format(Number(this.state.afterChoosePrice))}</span></div>
                                        <div className='before-discout' style={{ display: "flex" }} >
                                            <span style={{ fontSize: "13px", textDecoration: "line-through" }}>{inforProduct.discountProduct !== null ?
                                                this.state.afterChoosePrice === "" ? inforProduct.minPriceProduct === inforProduct.maxPriceProduct ? format(Number(this.state.afterPrice)) : `${format(Number(inforProduct.minPriceProduct))} - ${format(Number(inforProduct.maxPriceProduct))}` : format(Number(this.state.priceBeforeDiscount)) : ""}</span>
                                            <div className='persen-discount' style={{ fontSize: "13px", marginLeft: "10px" }}>{inforProduct.discountProduct !== null ? `- ${inforProduct.discountProduct.value}%` : ""}</div>
                                        </div>

                                        {product?.check_inventory && <div className='quantity-product' style={{ fontWeight: "bold", fontSize: "13px" }}>
                                            Còn lại {this.state.quantityInStock} sản phẩm
                                        </div>
                                        }

                                    </div>
                                    <div>

                                        <div className='distribute'>
                                            {this.state.messageErr && (
                                                <div className='show-err' style={{ color: "red" }}>{this.state.messageErr}</div>
                                            )}
                                            <div className='wrap-distribute'>
                                                <div className='' style={{ display: "flex" }}>
                                                    <div className='distribute-name'>{itemParent.name}</div>
                                                </div>
                                                <div className='group-name'>{itemParent.element_distributes && itemParent.element_distributes.map((itemChild, index) => {
                                                    return <button className={index === this.state.distributeSelected ? "active" : ''} style={{ border: "1px solid #e4e4e4", borderRadius: "4px", marginRight: '10px', padding: "5px" }} onClick={() => this.handleClick(itemChild.name, itemParent.name, index, itemChild.id, itemChild.stock)}>{itemChild.name}</button>
                                                })}</div>
                                            </div>

                                            <div className='distribute-name'>{itemParent.sub_element_distribute_name}</div>
                                            <div className='element_distribute_name'>{itemParent.element_distributes && itemParent.element_distributes[0].sub_element_distributes.map((itemChild, index) => (
                                                <button className={index === this.state.subElementDistributeSelected ? "actives" : ""} style={{ border: "1px solid #e4e4e4", borderRadius: "4px", marginRight: '10px', padding: "5px" }} onClick={() => this.handleClickSubElement(itemChild.name, itemChild.price, index, itemChild.id)}>{itemChild.name}</button>
                                            ))}</div>
                                        </div>

                                    </div>

                                    {
                                        !allowBuy && <div style={{ paddingTop: 20, color: "red" }}>
                                            <i>{"Sản phẩm không cho phép bán âm"}</i>
                                        </div>

                                    }



                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        )
    }
}
export default ModalDetail;