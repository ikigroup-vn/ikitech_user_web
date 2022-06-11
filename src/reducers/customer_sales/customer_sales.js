import * as Types from "../../constants/ActionType";

var initialState = {
  allCustomer: [],
  customerID: {},
  type: [],
  isFromPosAndSave: false,
  customerCreated: {}
};

export const customer_sales = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case Types.FETCH_ALL_CUSTOMER_SALE:
      newState.allCustomer = action.data;
      return newState;
    case Types.FETCH_ID_CUSTOMER_SALE:
      newState.customerID = action.data;
      return newState;
    case Types.CREATED_CUSTOMER_SALE:
      newState.isFromPosAndSave = action.isFromPosAndSave;
      newState.customerCreated = action.data;
      return newState;


    default:
      return newState;
  }
};
