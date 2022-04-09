
export const HAS_SUB = "HAS_SUB"
export const HAS_ELE = "HAS_ELE"
export const NO_ELE_SUB = "NO_ELE_SUB"


export const findImportPrice = (distributes, id) => {
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
                    if (elments) {
                        return elments
                    }

                }
            }
        }
    }
}

export const findImportPriceSub = (sub_element_distributes, nameElement) => {
    console.log("sub_element_distributes", sub_element_distributes)
    if (sub_element_distributes) {
        var indexDistributes = sub_element_distributes.map(e => e.name).indexOf(nameElement)
        var sub_elements = sub_element_distributes[indexDistributes]
        return sub_elements
    }
}
export const maxQuantityProduct = (product, distributeName, subDistributeName) => {
    if (distributeName === null && subDistributeName === null) {
        return product.quantity_in_stock
    }
    var distributes = product.distributes
    if (distributes) {
        if (distributes[0].element_distributes.length > 0 && distributes[0].element_distributes[0].sub_element_distributes.length > 0) {
            var indexElement = distributes[0].element_distributes.map(e => e.name).indexOf(distributeName)
            var indexSub = distributes[0].element_distributes[indexElement].sub_element_distributes.map(e => e.name).indexOf(subDistributeName)

            return distributes[0].element_distributes[indexElement].sub_element_distributes[indexSub].quantity_in_stock
        }
        if (distributes[0].element_distributes.length > 0) {
            var indexElements = distributes[0].element_distributes.map(e => e.name).indexOf(distributeName)


            return distributes[0].element_distributes[indexElements].quantity_in_stock
        }

    }

    return product.quantity_in_stock
}

export const maxQuantityInPos = (product, distributeName, subDistributeName) => {
    if (distributeName === null && subDistributeName === null) {
        return product.quantity_in_stock
    }
    var distributes = product.inventory.distributes
    if (distributes) {
        if (distributes[0].element_distributes.length > 0 && distributes[0].element_distributes[0].sub_element_distributes.length > 0) {
            var indexElement = distributes[0].element_distributes.map(e => e.name).indexOf(distributeName)
            var indexSub = distributes[0].element_distributes[indexElement].sub_element_distributes.map(e => e.name).indexOf(subDistributeName)
            console.log("aaaaaa")
            return distributes[0].element_distributes[indexElement].sub_element_distributes[indexSub].stock
        }
        if (distributes[0].element_distributes.length > 0) {
            var indexElements = distributes[0].element_distributes.map(e => e.name).indexOf(distributeName)


            return distributes[0].element_distributes[indexElements].stock
        }

    }

    return product.quantity_in_stock
}


export const getTypeProductDistribute = (product) => {


    if (product.distributes != null && product.distributes.length > 0) {
        const distributes = product.distributes[0];

        if (distributes != null && distributes.element_distributes != null && distributes.element_distributes.length > 0) {
            const element_distributes = distributes.element_distributes
            if (element_distributes[0].sub_element_distributes != null && element_distributes[0].sub_element_distributes.length > 0) {
                return HAS_SUB
                
            }
            // for (var ele in element_distributes) {
            //     console.log("element_distributes",ele)
            //     if (ele.sub_element_distributes != null && ele.sub_element_distributes.length > 0) {
            //         console.log("element_distributes")
            //         if (ele.sub_element_distributes != null && ele.sub_element_distributes.length > 0) {
            //             const sub_element_distributes = ele.sub_element_distributes
            //             for (var sub in sub_element_distributes) {
            //                 return HAS_SUB
            //             }
            //         }
            //     }
            // }
            return HAS_ELE
        }

        return NO_ELE_SUB

    }
}


export const findMaxImportPrice = (product) => {
    var max = 0
    max = product.import_price

    if (getTypeProductDistribute(product) == NO_ELE_SUB) {
        return max
    }
    if (getTypeProductDistribute(product) == HAS_ELE) {
        if (product.distributes != null && product.distributes.length > 0) {
            const distributes = product.distributes[0];


            if (distributes != null && distributes.element_distributes != null && distributes.element_distributes.length > 0) {
                const element_distributes = distributes.element_distributes
                max = element_distributes[0].import_price

                element_distributes.forEach(ele => {
                    if (ele.import_price > max) {
                        max = ele.import_price
                    }
                });
            }
        }
        return max
    }
    if (getTypeProductDistribute(product) == HAS_SUB) {
        if (product.distributes != null && product.distributes.length > 0) {
            const distributes = product.distributes[0];

            max = distributes.element_distributes[0].sub_element_distributes[0].import_price

            if (distributes != null && distributes.element_distributes != null && distributes.element_distributes.length > 0) {
                const element_distributes = distributes.element_distributes

                for (var ele in element_distributes) {

                    if (ele.sub_element_distributes != null && ele.sub_element_distributes.length > 0) {
                        const sub_element_distributes = ele.sub_element_distributes
                        sub_element_distributes.forEach(sub => {
                            if (sub.import_price > max) {
                                max = sub.import_price
                            }
                        });
                    }
                }
            }
        }

        return max
    }



    return max

}

export const findMinImportPrice = (product) => {
    var min = 0
    min = product.import_price

    if (getTypeProductDistribute(product) == NO_ELE_SUB) {
        return min
    }
    if (getTypeProductDistribute(product) == HAS_ELE) {



        if (product.distributes != null && product.distributes.length > 0) {
            const distributes = product.distributes[0];


            if (distributes != null && distributes.element_distributes != null && distributes.element_distributes.length > 0) {
                const element_distributes = distributes.element_distributes
                min = element_distributes[0].import_price

                element_distributes.forEach(ele => {
                    if (ele.import_price < min) {
                        min = ele.import_price
                    }
                });


            }
        }
        return min
    }
    if (getTypeProductDistribute(product) == HAS_SUB) {
        if (product.distributes != null && product.distributes.length > 0) {
            const distributes = product.distributes[0];

            min = distributes.element_distributes[0].sub_element_distributes[0].import_price

            if (distributes != null && distributes.element_distributes != null && distributes.element_distributes.length > 0) {
                const element_distributes = distributes.element_distributes

                element_distributes.forEach(ele => {

                    if (ele.sub_element_distributes != null && ele.sub_element_distributes.length > 0) {
                        const sub_element_distributes = ele.sub_element_distributes

                        sub_element_distributes.forEach(sub => {

                            if (sub.import_price < min) {
                                min = sub.import_price
                            }

                        });


                    }
                });
            }
        }

        return min
    }



    return min

}

export const findTotalStock = (product) => {

    if (getTypeProductDistribute(product) == HAS_ELE) {
        var stock = 0

        if (product.distributes != null && product.distributes.length > 0) {
            const distributes = product.distributes[0];

            if (distributes != null && distributes.element_distributes != null && distributes.element_distributes.length > 0) {
                const element_distributes = distributes.element_distributes
                console.log("element_distributes", element_distributes)
                element_distributes.forEach(ele => {
                    stock += ele.stock
                });


            }
        }
        console.log("co ele")
        return stock
    }
    if (getTypeProductDistribute(product) == HAS_SUB) {
        console.log("co sub")
        var stocks = 0
        if (product.distributes != null && product.distributes.length > 0) {
            const distributes = product.distributes[0];

            if (distributes != null && distributes.element_distributes != null && distributes.element_distributes.length > 0) {
                const element_distributes = distributes.element_distributes

                element_distributes.forEach(ele => {

                    if (ele.sub_element_distributes != null && ele.sub_element_distributes.length > 0) {
                        const sub_element_distributes = ele.sub_element_distributes

                        sub_element_distributes.forEach(sub => {
                            stocks += sub.stock
                        });


                    }
                });
            }
        }

        return stocks
    }

    return stock

}

