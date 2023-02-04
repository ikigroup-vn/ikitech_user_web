import * as Types from "../../constants/ActionType";

var initialState = {
  listGameSpinWheels: {},
  deletedSuccessfully: false,
};

export const spin_wheel = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case Types.LIST_GAME_SPIN_WHEELS:
      newState.listGameSpinWheels = action.data;
      return newState;
    case Types.DELETE_GAME_SPIN_WHEELS:
      newState.deletedSuccessfully = action.data;
      return newState;
    default:
      return newState;
  }
};
