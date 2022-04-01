import React, { Component } from 'react'
import { format } from '../../ultis/helpers'
class ModalVoucher extends Component {
    constructor(props){
        super(props);
        this.state ={
            discountType:"",
            code:""
        }
    }
    handleOnclicks(code){
        this.props.handleCallbackVoucherInput(code)
    }
    componentDidMount(){
        var discountType = this.props.listVoucher.discount_type
        discountType==0 ? this.setState({discountType:"đ"}) : this.setState({discountType:"%"})
    }

    onChange = (e) => {
        var target = e.target;
        var name = target.name;
        var value = e.target.value;
        this.setState({ [name]: value });
      };
    
    handleChooseVoucher = () =>{
        this.props.handleCallbackVoucherInput(this.state.code)
    }
    render() {
        var {listVoucher} = this.props
       
        return (
            <div>
                <div class="modal" id="modalVoucher">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div className='model-header-modal' style={{display:'flex',justifyContent:"space-between", margin:"10px 15px"}}>
                            <p class="" style={{margin:"0px",fontWeight:"bold"}}>Mã giảm giá</p>
                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                        </div>
                    <div class="modal-body">
                    <div class="form-group" style={{padding:"5px",display:"flex",justifyContent:"space-between"}}>
                                    <input
                                        style={{width: "79%"}}
                                        type="text"
                                        name="code"
                                        value={this.state.code}
                                        onChange={this.onChange}
                                        class="form-control"
                                        placeholder="Nhập mã giảm giá hoặc quét mã"
                                    />
                            <button class="btn btn-info" onClick={() =>this.handleChooseVoucher()} data-dismiss="modal" style={{backgroundColor:"green"}}>Áp dụng</button>
                                </div>
                        {listVoucher.map((item,index) =>(
                            <div className='model-card row' key={index} style={{borderRadios:"0.25em",border:"dashed 2px red",position:"relative",margin:"5px"}}>
                            <button class="btn btn-info" onClick={() =>this.handleOnclicks(item.code)} data-dismiss="modal" style={{backgroundColor:"green",position:"absolute", right:"3px", top:"3px",zIndex:"100"}}>Áp dụng</button>
                            <div className='name-voucher col-3' style={{width:"120px",height:"120px",padding:"8px"}}>
                                <div style={{backgroundColor:"#cc3c4c",color:"white",justifyContent:"center",width:"100%",height:"100%",borderRadius:"0.25em",display:"flex",alignItems:"center"}}>New voucher</div>
                            </div>
                            <div className='info-voucher col-9' style={{display:"flex",flexDirection:"column",justifyContent:"space-around"}}>
                                    <div>
                                        <div className='value' style={{fontWeight:"bold"}}>{`Giảm ${item.discount_type===0? format(Number(item.value_discount)):item.value_discount+"%"}`}</div>
                                        <div className='code'><span>{`Mã: ${item.code}`}</span></div>
                                        <div className='apply'><span>{`Cho đơn hàng từ ${format(Number(item.value_limit_total))}`}</span></div>
                                    </div>
                                    <div>
                                        <div className='date-voucher'>{item.end_time}</div>
                                    </div>
                            </div>
                            </div>                          
                        ))}
                    </div>
                    </div>
                </div>
                </div>
                </div>       
        )
    }
}
export default ModalVoucher;