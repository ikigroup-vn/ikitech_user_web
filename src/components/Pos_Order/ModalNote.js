import React, { Component } from 'react'

class ModalNote extends Component {
    constructor(props){
        super(props)
        this.state ={
            note:""
        }
    }
    onChange = (e) =>{
        this.setState({note:e.target.value})
    }

    handleAddNote = () =>{
        this.props.handleCallbackNote({note:this.state.note})
    }
    render() {
        return (
            <div>
                <div class="modal" id="modalNote">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div className='model-header-modal' style={{ display: 'flex', justifyContent: "space-between", margin: "10px 15px" }}>
                                <p class="" style={{ margin: "0px", fontWeight: "bold" }}>Thêm ghi chú</p>
                                <button type="button" class="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div class="modal-body">
                                <div class="form-group">
                                    <label for="comment">Ghi chú</label>
                                    <textarea class="form-control" rows="5" id="comment" onChange={this.onChange}></textarea>
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
                                <button class="btn btn-info" onClick={() => this.handleAddNote()} data-dismiss="modal" >
                                    Lưu
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ModalNote
