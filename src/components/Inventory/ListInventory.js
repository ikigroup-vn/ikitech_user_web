import React, { Component } from 'react'
import ItemInventory from './ItemInventory'



 class ListInventorySheet extends Component {
     constructor(props){
         super(props)
         this.state ={

         }
     }

     handleCallbackQuantity =(modal) =>{
         this.props.handleCallbackQuantity(modal)
     }

    render() {
        var {listInventory} = this.props
        
        return (
            <div className='list-group' style={{marginTop:"10px"}}>
                {listInventory.map((item,index) =>{
                    return(
                        <ItemInventory item = {item} handleCallbackQuantity ={this.handleCallbackQuantity} />
                    )
                })}
            </div>
        )
    }
}

export default ListInventorySheet;