import * as Types from "../../constants/ActionType"

var initialState = {
  listPosOrder: [],
  listItemCart: [],
  loadingCart: true
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
      newState.listItemCart = action.data;
      return newState;
    default:
      return newState;
  }
};
