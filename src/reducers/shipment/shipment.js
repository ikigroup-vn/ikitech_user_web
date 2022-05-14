import * as Types from "../../constants/ActionType";
import shallowEqual from "../../ultis/shallowEqual"
var initialState = {
  allShipment: [],
  shipmentID: [],
  calculate : []
  
};


function getData(state , shipment)
{
  var newItem = [...state]
  var newShipmen = [...shipment]
  console.log(newItem,newShipmen)

  for (const element of newShipmen) {
    console.log(element.partner_id )

    for (const [index,item] of state.entries()) {
      if((element.partner_id == item.partner_id) && (element.ship_type == item.ship_type))
      {
        newItem[index] = element;
        break;
      }
    }
    newItem.push(element)
  }
  console.log(newItem)
  return newItem
}

export const shipment = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case Types.FETCH_ALL_SHIPMENT:
      newState.allShipment = action.data;
      return newState;
      case Types.FETCH_ALL_CALCULATE_SHIPMENT:
     
        newState.calculate = getData(newState.calculate,action.data) || newState.calculate  ;
        return newState;
      case Types.RESET_ALL_SHIPMENT:
        newState.allShipment = action.data;
        return newState;
    case Types.FETCH_ID_SHIPMENT:
      newState.shipmentID = action.data;
      return newState;
    default:
      return newState;
  }
};
