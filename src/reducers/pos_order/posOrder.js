import * as Types from "../../constants/ActionType"

var initialState = {
  listPosOrder: [],
  listItemCart: [],
};

export const pos_reducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case Types.FETCH_LIST_POS_ORDER:
      newState.listPosOrder = action.data;
      return newState;

    case Types.FETCH_LIST_CART_ITEM:
      newState.listItemCart = action.data;
      return newState;
    default:
      return newState;
  }
};
