import React, { Component } from 'react'
import { format } from '../../ultis/helpers'
import * as Env from "../../ultis/default"

class ItemDetail extends Component {
    render() {
        const { listItem } = this.props
        return (
            <div className='item_detail' style={{borderBottom:"1px solid #8080808c"}}>
                <div className='' style={{ display: "flex", padding: "10px" }}>
                    <img src={listItem.product.images.length > 0 ? listItem.product.images[0].image_url : Env.IMG_NOT_FOUND } alt='' width="40px" height="63px" style={{width:"16%"}}></img>
                    <div className='wrap-name' style={{ marginLeft: "10px", width:"77%"}} >
                        <div style={{ display: "flex" }}>
                            <div className='price-order' style={{ color: "gray", marginRight: "5px" }}>Tên:</div>
                            <div className='name-order'>{listItem.product.name}</div>
                        </div>
                        {listItem.element_distribute_name || listItem.sub_element_distribute_name?
                                            <div style={{ display: "flex" }}>
                                            <div className='price-order' style={{ color: "gray", marginRight: "5px" }}>Phân loại:</div>
                                            <div className='name-order'>{listItem.element_distribute_name?`${listItem.element_distribute_name} `:""}{listItem.sub_element_distribute_name?`${listItem.sub_element_distribute_name}`:""}</div>
                                        </div>:""    
                    }

                        <div className='wrap-iventory' style={{ display: "flex", justifyContent: "space-between" }}>
                            <div style={{ marginLeft: "5px", fontWeight: "bold", color:"red" }}>{format(Number(listItem.import_price))}</div>
                            <div style={{ marginLeft: "5px", color: "red" }}>{format(Number(listItem.import_price * listItem.quantity))}</div>
                        </div>
                    </div>
                </div>


            </div>
        )
    }
}
export default ItemDetail
