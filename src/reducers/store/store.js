import * as Types from "../../constants/ActionType";

var initialState = {
  allStore: [],
  storeID: { store_code: "", name: "", address: "", id_type_of_store: "" },
  type: [],
};

export const store = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case Types.FETCH_ALL_STORE:
        console.log(action.data)
      newState.allStore = action.data;
      return newState;
    case Types.FETCH_ID_STORE:
      newState.storeID = action.data;
      return newState;
    case Types.FETCH_ALL_TYPESTORE:
      newState.type = action.data;
      return newState;
    default:
      return newState;
  }
};
