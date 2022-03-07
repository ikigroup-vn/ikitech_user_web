export const maxQuantityProduct =(product,distributeName,subDistributeName) =>{
    if(distributeName === null && subDistributeName === null){
        return product.quantity_in_stock
    }
    var distributes = product.distributes
    if(distributes){
        if(distributes[0].element_distributes.length >0 && distributes[0].element_distributes[0].sub_element_distributes.length >0){
            var indexElement =  distributes[0].element_distributes.map(e =>e.name).indexOf(distributeName)
           var indexSub = distributes[0].element_distributes[indexElement].sub_element_distributes.map(e => e.name).indexOf(subDistributeName)
            console.log("aaaaaa")
           return distributes[0].element_distributes[indexElement].sub_element_distributes[indexSub].quantity_in_stock
        }
        if(distributes[0].element_distributes.length >0 ){
            var indexElements =  distributes[0].element_distributes.map(e =>e.name).indexOf(distributeName)
    
    
           return distributes[0].element_distributes[indexElements].quantity_in_stock
        }

    }
    
    return product.quantity_in_stock
}
