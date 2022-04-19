import * as Types from "../../constants/ActionType"

var initialState = {
  listPosOrder: [],
  oneCart: [],
  loadingCart: true,
  inforCustomer:""
};

export const pos_reducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case Types.FETCH_LIST_POS_ORDER:
      newState.listPosOrder = action.data;
      newState.loadingCart = false;
      return newState;
    case Types.FETCH_LIST_POS_ORDER_LOADING:
      newState.loadingCart = true;
      return newState;
    case Types.FETCH_LIST_CART_ITEM:
      newState.oneCart = action.data;
      return newState;
      case Types.FETCH_INFO_CUSTOMER:
        newState.inforCustomer = action.data;
        return newState;
    default:
      return newState;
  }
};
