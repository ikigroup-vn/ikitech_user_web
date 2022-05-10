import React, { Component } from "react";
import { format } from "../../ultis/helpers";
import { stockOfProduct } from "../../ultis/productUltis";
import { shallowEqual } from "../../ultis/shallowEqual";
import * as OrderAction from "../../actions/add_order";
import { connect } from "react-redux";
import { debounce } from "lodash";
import * as Env from "../../ultis/default";

class ItemInCart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentQuantity: 1,
            distribute: "",
            maxQuantityDistribute: "",
            chooseId : null
        };
        this.nameElementDistribute = "";
        this.nameSubElementDistribute = "";

        this.changeQuantity = debounce(this.handleChangeQuantity, 400);
    }

    ShowDetail = (id) =>{
        console.log(id)
        this.setState({chooseId : id})
    }

    handleChangeQuantity = (quantity) => {
        this.props.addQuantity(
            this.props.item.product.id,
            this.props.item.id,
            quantity,
            this.props.item.distributes_selected
        );
    };

    componentWillReceiveProps(nextProps) {
        if (!shallowEqual(this.props.item.quantity, nextProps.item.quantity)) {
            this.setState({ currentQuantity: nextProps.item.quantity });
        }

        if (!shallowEqual(this.state.currentQuantity, nextProps.item.quantity)) {
            this.setState({ currentQuantity: nextProps.item.quantity });
        }
    }

    componentDidMount() {
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


    handleUpdateCallbackProduct = (inventory, id, name, image, price, distributes, maxPrice, minPrice, priceDiscount, quayntity, quantityDistribute, product , productWithCart,currentQuantity,distributes_selected) =>{
        this.props.handleUpdateCallbackProduct({
            inventoryProduct: inventory, idProduct: id, nameProduct: name, imageProduct: image,
            priceProduct: price, distributeProduct: distributes,
            minPriceProduct: minPrice, maxPriceProduct: maxPrice, discountProduct: priceDiscount,
            quantityProduct: quayntity,
            quantityProductWithDistribute: quantityDistribute,
            product: product,
            productWithCart : productWithCart,
            currentQuantity,
            distributes_selected
        })
    }

    passData = (id , product,currentQuantity , distributes_selected) =>{
        var {products} = this.props
        console.log(id , products);
        for (const data of products) {

            if(data.id == id && data.distributes?.length > 0){

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
    

    render() {
        const { item, index } = this.props;
        const { currentQuantity } = this.state;

        const maxQuantity = stockOfProduct(
            item.product,
            item.distributes_selected[0]?.value,
            item.distributes_selected[0]?.sub_element_distributes
        );
        const allowAdd = true;

        return (
            <div
                class="card card-item-pos"
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
                                width: "35%",
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
                            <div
                                className="wrap-distributes_selected"
                                style={{ fontSize: "12px", fontStyle: "italic" }}
                            >

                                <div class="_34KJXV" onClick = {()=>this.passData(item.product.id , item.product , currentQuantity , item.distributes_selected)} data-toggle={item.distributes_selected.length  > 0 ? "modal" : ""} data-target="#modalDetailUpdate">
                                    <div class="aUj6f2">
                                        <div class="_1XT_GF" role="button" tabindex="0" >
                                            <div class="Qtk_DO">
                                                Phân loại hàng:<button class="vZLqsj _2zsvOt"></button>
                                            </div>
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
                                                    : "Mặc định"}</div>
                                        </div>
                                   
                                    </div>
                                </div>
                            </div>

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
                                    onClick={() =>
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
                                    className="input-quantity"
                                    onChange={this.handleOnChange}
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

                        <div
                            className="total-price"
                            style={{ width: "13%", fontWeight: "500" }}
                        >
                            {format(Number(item.item_price * currentQuantity))}
                        </div>
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
                    </div>
            
                </div>
            </div>
        );
    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        showAlertMaxQuantity: () => {
            dispatch(OrderAction.showAlertMaxQuantity());
        },
    };
};
export default connect(null, mapDispatchToProps)(ItemInCart);
