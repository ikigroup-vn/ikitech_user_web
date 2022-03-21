import React, { Component } from 'react'
import { formatNumber } from '../../ultis/helpers'

class ModalPayment extends Component {
    constructor(props) {
        super(props)
        this.state = {
            method_payment:0
        }
    }
    handleChange = (e) => {
        this.setState({ method_payment: e.target.value })
      }
      handleChoosePayment = () =>{
          this.props.handleCallbackChoosePayment(this.state.method_payment)
      }

    render() {

        return (
            <div>
                <div class="modal" id="modalPayment">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div className='model-header-modal' style={{ display: 'flex', justifyContent: "space-between", margin: "10px 15px" }}>
                                <p class="" style={{ margin: "0px", fontWeight: "bold" }}>Chọn phương thức thanh toán</p>
                                <button type="button" class="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div class="modal-body">
                                <div class="form-group">
                                    <select class="form-control" id="sel1" onChange={this.handleChange}>
                                        <option value="0">Chuyển khoản</option>
                                        <option value="1">Tiền mặt</option>
                                    </select>
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
                                <button class="btn btn-info" onClick={() => this.handleChoosePayment()} data-dismiss="modal" >
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

export default ModalPayment