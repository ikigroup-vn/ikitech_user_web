import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as Env from "../../ultis/default"
class ListStore extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    passDataModal = (event, store_code) => {
        this.props.handleDelCallBack({ table: "Cửa hàng", id: store_code });
        event.preventDefault();
    }

    render() {
        const listStore = this.props.data
        return (
            <div className='list-group'>
                {listStore.map((item, index) => {
                    const logo_url = item.logo_url == null ? Env.IMG_NOT_FOUND : item.logo_url
                    return (
                        <div class="card list-group-item list-group-item-action list-group-item-light" style={{border:"1px solid #8e8a8a", margin: "10px 0" }}>
                            <Link to={`/dashboard/${item.store_code}`}>
                            <div class="card-body" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0px" }}>
                                <div className='wrap-list' style={{ display: "flex", alignItems: "center" }}>
                                    <div className='img-list'>
                                        
                                            
                                        
                                        <img src={`${logo_url}`} width="80px" height="80px" class="img-responsive" alt="Image" />
                                    </div>
                                    <div style={{ marginLeft: "20px" }}>
                                        <div className='name-store' style={{ fontWeight: "bold" }}>{item.name}</div>
                                        <div className='address-store' style={{ color: "gray" }}>{item.store_code+".mydoapp.vn"}</div>
                                    </div>
                                </div>
                                <div className='wrap-btn'>
                                    <Link
                                        to={`/store/edit/${item.store_code}`}
                                        class="btn btn-warning btn-sm"
                                    >
                                        <i class="fa fa-edit"></i> Sửa
                                    </Link>
                                    <button
                                        onClick={(e) => this.passDataModal(e, item.store_code)}
                                        style={{ marginLeft: "10px" }}
                                        data-toggle="modal"
                                        data-target="#removeModal"
                                        class="btn btn-danger btn-sm"
                                    >
                                        <i class="fa fa-trash"></i> Xóa
                                    </button>
                                </div>
                            </div>
                            </Link>
                        </div>
                    )
                })}

            </div>
        )
    }
}
export default ListStore
