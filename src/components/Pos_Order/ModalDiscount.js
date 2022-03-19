import React, { Component } from 'react'

class ModalDiscount extends Component {
    constructor(props) {
        super(props)
        this.state = {
            code:"",
            txtDiscount:""
        }
    }

    handleDiscount = () =>{
        const {code,txtDiscount} = this.state
        this.props.handleCallbackDiscount({code,txtDiscount})

    }
    onChange = (e) =>{
        this.setState({[e.target.name]:e.target.value})
    }

    render() {

        return (
            <div>
                <div class="modal" id="modalDiscount">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div className='model-header-modal' style={{ display: 'flex', justifyContent: "space-between", margin: "10px 15px" }}>
                                <p class="" style={{ margin: "0px", fontWeight: "bold" }}>Chiết khấu đơn hàng</p>
                                <button type="button" class="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div class="modal-body">
                                <div class="form-group">
                                    <label for="product_name">Loại giảm giá</label>
                                    <select name="" id="input" class="form-control">
                                        <option value="">--Loại giảm giá--</option>
                                        <option value="0">Giảm giá cố định</option>
                                        <option value="1">Giảm giá theo %</option>

                                    </select>

                                </div>
                                <div class="form-group">
                                    <label for="product_name">Giảm giá</label>
                                    <input

                                        type="text"
                                        name="txtDiscount"
                                        value={this.state.txtDiscount}
                                        onChange={this.onChange}
                                        class="form-control"
                                        placeholder="Nhập giá trị giảm giá"
                                    />

                                </div>
                                <div class="form-group">
                                    <label for="product_name">Mã giảm giá</label>
                                    <input

                                        type="text"
                                        name="code"
                                        value={this.state.code}
                                        onChange={this.onChange}
                                        class="form-control"
                                        placeholder="Nhập mã giảm giá hoặc quét mã"
                                    />

                                </div>
                            </div>
                            <div class="modal-footer">
                                <button
                                    type="button"
                                    class="btn btn-default"
                                    data-dismiss="modal"
                                >
                                    Thoát
                                </button>
                                <button class="btn btn-info" onClick={() =>this.handleDiscount()} data-dismiss="modal" >
                                    Áp dụng
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ModalDiscount