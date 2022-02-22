import React, { Component } from 'react'
import { format } from '../../ultis/helpers'
import * as Env from "../../ultis/default"

 class ModalDetail extends Component {
     constructor(props){
         super(props)
         this.state={
             distributeName:"",
             distributeValue:"",
             element_distributes:"",
             distributeSelected: -1,
             subElementDistributeSelected:-1,
             afterPrice:"",
             priceBeforeDiscount:"",
             afterChoosePrice:"",
             elementObject:"",
             minPriceAfterDiscount:"",
             maxPriceAfterDiscount:"",
             stateDistribute:false,
             messageErr:"",
             quantityInStock:""
         }
     }
     handleClick  = (nameDistribute,nameObject,index,id,quatity) =>{
         var {distributes} = this.props.modal.inventoryProduct
         this.setState({distributeSelected:index})
         this.setState({distributeValue:nameDistribute,distributeName:nameObject})
         if(distributes.length > 0) {
            var itemParent = distributes[0];
            if(this.props.modal.discountProduct){
                var indexElement = itemParent.element_distributes.map(e =>e.id).indexOf(id)
                if(indexElement !== -1){
                   var elment = itemParent.element_distributes[indexElement]
                   if(elment)
                    this.setState({
                        elementObject:elment,
                        quantityInStock:quatity,
                        messageErr:""
                    })
                }
            }else{
                var indexElements = itemParent.element_distributes.map(e =>e.id).indexOf(id)
                if(indexElements !== -1){
                   var elments = itemParent.element_distributes[indexElements]
                   if(elments)
                    this.setState({
                        elementObject:elments,
                        quantityInStock:quatity,
                        messageErr:""
                    })
                }
            }

        
         }
        
     }

     handleClickElement = (nameElement,price,index) =>{
         var {sub_element_distributes} = this.state.elementObject
         if(this.props.modal.discountProduct){
            this.setState({subElementDistributeSelected:index,element_distributes:nameElement})
            var indexDistribute = sub_element_distributes.map(e => e.name).indexOf(nameElement)
            var sub_element = sub_element_distributes[indexDistribute]
            this.setState({
                quantityInStock:sub_element.stock,messageErr:""
            })
         }else{
            this.setState({subElementDistributeSelected:index,element_distributes:nameElement})
            var indexDistributes = sub_element_distributes.map(e => e.name).indexOf(nameElement)
            var sub_elements = sub_element_distributes[indexDistributes]
            console.log("sub_elements",sub_elements)
            this.setState({
                quantityInStock:sub_elements.stock,
                messageErr:""
            })
         }

     }
     handleClose =() =>{
         this.setState({
            afterChoosePrice:"",
            distributeSelected:-1,
            subElementDistributeSelected:-1,
            messageErr:"",
         })
     }
     handleCallback = () =>{
        var info = this.props.modal
        const {distributeName,distributeValue,element_distributes,quantityInStock} = this.state
        if(info.distributeProduct.length === 0){
            window.$('.modal').modal('hide');
            this.props.handleCallbackPushProduct({nameProduct:this.props.modal.nameProduct,product_id: this.props.modal.idProduct,nameDistribute:distributeName,nameElement:distributeValue,nameSubDistribute:element_distributes, time:Date(),stock:quantityInStock})
            return
        }

        if(this.state.distributeSelected===-1){
            this.setState({messageErr:`Chưa chọn ${this.props.modal.distributeProduct[0].name}`})
            return
        }
        if(info.distributeProduct[0].element_distributes[0].sub_element_distributes.length ===0){
            window.$('.modal').modal('hide');
            this.props.handleCallbackPushProduct({nameProduct:this.props.modal.nameProduct,product_id: this.props.modal.idProduct,nameDistribute:distributeName,nameElement:distributeValue,nameSubDistribute:element_distributes,time:Date(),stock:quantityInStock})
            this.setState({distributeSelected:-1,messageErr:"",afterChoosePrice:""})
            return
        }
        if(this.state.subElementDistributeSelected===-1){
            this.setState({messageErr:`Chưa chọn ${this.props.modal.distributeProduct[0].sub_element_distribute_name}`})
            return
        }

        
        window.$('.modal').modal('hide');

        this.props.handleCallbackPushProduct({nameProduct:this.props.modal.nameProduct,product_id: this.props.modal.idProduct,nameDistribute:distributeName,nameElement:distributeValue,nameSubDistribute:element_distributes,time:Date(),stock:quantityInStock})
        this.setState({distributeSelected:-1,subElementDistributeSelected:-1,messageErr:"",afterChoosePrice:""})
     }

     componentWillReceiveProps(nextProps, nextState) {
   
        this.setState({quantityInStock:nextProps.modal.quantityProductWithDistribute})
        if(nextProps.modal.priceProduct!== this.state.afterPrice){
            this.setState({afterPrice:nextProps.modal.priceProduct})
        }
        var {minPriceProduct,maxPriceProduct,discountProduct} = nextProps.modal
        if (nextProps.modal.minPriceProduct !== this.props.modal.minPriceProduct) {
            if(discountProduct !== null){
                var minPrice =minPriceProduct - (minPriceProduct * discountProduct.value/100)
                var maxPrice =maxPriceProduct - (maxPriceProduct * discountProduct.value/100)
                this.setState({minPriceAfterDiscount:minPrice,maxPriceAfterDiscount:maxPrice})
            }

        }

    }
    render() {
        var infoProduct = this.props.modal
        
        var itemParent =infoProduct && infoProduct.inventoryProduct && infoProduct.inventoryProduct.distributes !== null && infoProduct.inventoryProduct.distributes.length >0? infoProduct.inventoryProduct.distributes[0] : []
        console.log('itemParent',itemParent)
        return (
            <div class="modal" id="modalDetail">
            <div class="modal-dialog">
                <div class="modal-content">
                <div className='model-header-modal' style={{display:'flex',justifyContent:"space-between", margin:"10px 15px"}}>
                            <p class="" style={{margin:"0px",fontWeight:"bold"}}>Chi tiết sản phẩm</p>
                            <button type="button" class="close" onClick={this.handleClose} data-dismiss="modal">&times;</button>
                        </div>
                <div class="modal-body" style={{position:"relative"}}>
                <button class="btn btn-info"  onClick={this.handleCallback}  style={{backgroundColor:"green",position:"absolute", right:"15px", top:"20px",zIndex:"100"}}>Thêm</button>
                    <div className='model-card row' style={{margin:"5px",width:"80%"}}>
                            <div className='name-voucher col-4' style={{width:"120px",height:"120px",padding:"8px"}}>
                                <div style={{justifyContent:"center",width:"100%",height:"100%",borderRadius:"0.25em",display:"flex",alignItems:"center"}}>
                                    <img src={infoProduct.imageProduct.length>0?infoProduct.imageProduct[0].image_url:Env.IMG_NOT_FOUND} alt='' style={{width:"100%"}}></img>
                                </div>
                            </div>
                            <div className='info-voucher col-8' style={{display:"flex",flexDirection:"column",justifyContent:"space-around"}}>
                                    <div>
                                        <div className='value' style={{fontWeight:"bold"}}>{infoProduct.nameProduct}</div>
                                        <div className='code' style={{color:"red"}}><span>{this.state.afterChoosePrice === '' || this.state.afterChoosePrice===0?infoProduct.discountProduct ===null? format(Number(this.state.afterPrice)) :this.state.minPriceAfterDiscount === this.state.maxPriceAfterDiscount?`${format(Number(this.state.minPriceAfterDiscount))}`:`${format(Number(this.state.minPriceAfterDiscount))} - ${format(Number(this.state.maxPriceAfterDiscount))}`
                                        :format(Number(this.state.afterChoosePrice))}</span></div>
                                        <div className='before-discout' style={{display:"flex"}} >
                                            <span style={{fontSize:"13px",textDecoration:"line-through"}}>{infoProduct.discountProduct !==null? 
                                            this.state.afterChoosePrice ===""?infoProduct.minPriceProduct===infoProduct.maxPriceProduct?format(Number(this.state.afterPrice)):`${format(Number(infoProduct.minPriceProduct))} - ${format(Number(infoProduct.maxPriceProduct))}`:format(Number(this.state.priceBeforeDiscount)):""}</span>
                                            <div className='persen-discount' style={{fontSize:"13px", marginLeft:"10px"}}>{infoProduct.discountProduct !==null? `- ${infoProduct.discountProduct.value}%`:""}</div>
                                        </div>     
                                        <div className='quantity-product' style={{fontWeight:"bold",fontSize:"13px"}}>
                                               {this.state.quantityInStock===-1?"Còn hàng":`Còn lại ${this.state.quantityInStock} sản phẩm`}
                                        </div>                                   
                                    </div>
                                    <div>
                                            
                        
                                            <div className='distribute'>
                                                <div className='wrap-distribute'>
                                                        <div className='' style={{display:"flex"}}>
                                                        <div className='distribute-name'>{itemParent.name}</div>
                                                    </div>
                                                    <div className='group-name'>{itemParent.element_distributes && itemParent.element_distributes.map((itemChild,index) =>(
                                                        <button className={index === this.state.distributeSelected?"active":''} style={{border:"1px solid #e4e4e4",borderRadius:"4px",marginRight:'10px',padding:"5px"}} onClick={() =>this.handleClick(itemChild.name,itemParent.name,index,itemChild.id,itemChild.stock)}>{itemChild.name}</button>
                                                    ))}</div>
                                                </div>
                                           
                                            <div className='distribute-name'>{itemParent.sub_element_distribute_name}</div>
                                            <div className='element_distribute_name'>{itemParent.element_distributes && itemParent.element_distributes[0].sub_element_distributes.map((itemChild,index) =>(
                                                <button className={index === this.state.subElementDistributeSelected?"actives":""} style={{border:"1px solid #e4e4e4",borderRadius:"4px",marginRight:'10px',padding:"5px"}} onClick={() =>this.handleClickElement(itemChild.name,itemChild.price, index)}>{itemChild.name}</button>
                                            ))}</div>
                                            </div>                                           
                            

                                    </div>
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