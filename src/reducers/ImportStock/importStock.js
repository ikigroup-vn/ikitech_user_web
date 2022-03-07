import * as Types from '../../constants/ActionType'

const initState = {
  listImportStock: [],
  detailImportStock: "",
}

export const import_reducer = (state = initState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case Types.FETCH_ALL_IMPORT_STOCK:
      newState.listImportStock = action.data;
      return newState;
    case Types.FETCH_DETAIL_IMPORT_STOCK:
      newState.detailImportStock = action.data;
      return newState;
    default:
      return newState;
  }
}