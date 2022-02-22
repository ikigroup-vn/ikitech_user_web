import * as Types from "../../constants/ActionType"
const initState = {
    sheetsInventory:[]
}

export const inventory_reducer =(state = initState,action) =>{
    let newState = { ...state };
    switch (action.type) {
        case Types.FETCH_ALL_SHEETS_INVENTORY:
          newState.sheetsInventory = action.data;
          return newState;
        default:
          return newState;
      }
}