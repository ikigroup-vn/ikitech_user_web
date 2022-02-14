import * as Types from "../../constants/ActionType";

var initialState = {
  allShipment: [],
  shipmentID: [],
  
};

export const shipment = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case Types.FETCH_ALL_SHIPMENT:
      newState.allShipment = action.data;
      return newState;
    case Types.FETCH_ID_SHIPMENT:
      newState.shipmentID = action.data;
      return newState;
    default:
      return newState;
  }
};
