
export const findImportPrice = (distributes,id) =>{
    if (distributes.length > 0) {
        if (distributes[0].element_distributes.length > 0) {
            if (distributes[0].element_distributes[0].sub_element_distributes.length > 0) {
                var itemParents = distributes[0]
                var indexElements = itemParents.element_distributes.map(e => e.id).indexOf(id)
                if (indexElements !== -1) {
                    var elments = itemParents.element_distributes[indexElements]
                    if (elments)
                    return elments
                }
            } else {
                var itemParent = distributes[0];
                var indexElements = itemParent.element_distributes.map(e => e.id).indexOf(id)
                if (indexElements !== -1) {
                    var elments = itemParent.element_distributes[indexElements]
                    if (elments){
                        return elments
                    }

                }
            }
        }
    }
}

export const findImportPriceSub = (sub_element_distributes,nameElement) =>{
    console.log("sub_element_distributes",sub_element_distributes)
    if (sub_element_distributes) {
        var indexDistributes = sub_element_distributes.map(e => e.name).indexOf(nameElement)
        var sub_elements = sub_element_distributes[indexDistributes]
        return sub_elements
    } 
}
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

export const maxQuantityInPos =(product,distributeName,subDistributeName) =>{
    if(distributeName === null && subDistributeName === null){
        return product.quantity_in_stock
    }
    var distributes = product.inventory.distributes
    if(distributes){
        if(distributes[0].element_distributes.length >0 && distributes[0].element_distributes[0].sub_element_distributes.length >0){
            var indexElement =  distributes[0].element_distributes.map(e =>e.name).indexOf(distributeName)
           var indexSub = distributes[0].element_distributes[indexElement].sub_element_distributes.map(e => e.name).indexOf(subDistributeName)
            console.log("aaaaaa")
           return distributes[0].element_distributes[indexElement].sub_element_distributes[indexSub].stock
        }
        if(distributes[0].element_distributes.length >0 ){
            var indexElements =  distributes[0].element_distributes.map(e =>e.name).indexOf(distributeName)
    
    
           return distributes[0].element_distributes[indexElements].stock
        }

    }
    
    return product.quantity_in_stock
}

export const findMaxImportPrice = (ProductItem) =>{

    console.log("ProductItem",ProductItem)

}
