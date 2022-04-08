import React, { Component } from 'react'

class ModalUser extends Component {
    constructor(props){
        super(props)
        this.state ={
            txtName:"",
            txtPhone:"",
            txtEmail:""
        }
    }
    onChange = e =>{
        this.setState({[e.target.name]:e.target.value})
    }
    handleAddUser = () =>{
        this.props.handleCallbackUser({name:this.state.txtName,phone_number:this.state.txtPhone,email:this.state.txtEmail})
        this.setState({txtName:"",txtPhone:"",txtEmail:""})
    }
    handleClear = () =>{
        this.setState({txtName:"",txtPhone:"",txtEmail:""})
    }
    render() {
        return (
            <div>
                <div class="modal" id="modalUser">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div className='model-header-modal' style={{ display: 'flex', justifyContent: "space-between", margin: "10px 15px" }}>
                                <p class="" style={{ margin: "0px", fontWeight: "bold" }}>Thêm khách hàng</p>
                                <button type="button" class="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div class="modal-body">
                                <div class="form-group">
                                    <label for="product_name">Tên</label>
                                    <input type="text" class="form-control" name="txtName" placeholder="Nhập tên" value={this.state.txtName} autocomplete="off" onChange={this.onChange}  />  
                                </div>
                                <div class="form-group">
                                    <label for="product_name">Số điện thoại</label>
                                    <input type="text" class="form-control" name="txtPhone" placeholder="Nhập số điện thoại" value={this.state.txtPhone} autocomplete="off" onChange={this.onChange}  />  
                                </div>
                                <div class="form-group">
                                    <label for="product_name">Email</label>
                                    <input type="text" class="form-control" name="txtEmail" placeholder="Nhập email" value={this.state.txtEmail} autocomplete="off" onChange={this.onChange}  />  
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button
                                    type="button"
                                    class="btn btn-default"
                                    data-dismiss="modal"
                                    onClick={this.handleClear}
                                >
                                    Thoát
                                </button>
                                <button class="btn btn-info" onClick={() => this.handleAddUser()} data-dismiss="modal" >
                                    Thêm
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ModalUser
