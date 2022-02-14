import * as Types from "../../constants/ActionType";

var initialState = {
  allCustomer: [],
  customerID: {  },
  type: [],
};

export const customer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case Types.FETCH_ALL_CUSTOMER:
      newState.allCustomer = action.data;
      return newState;
    case Types.FETCH_ID_CUSTOMER:
      newState.customerID = action.data;
      return newState;
   
    default:
      return newState;
  }
};
