import * as Types from "../../constants/ActionType";

var initialState = {
  config: {},
  allStep: [],
  allCollaborator : [],
  allRequestPayment : [],
  allHistoryPayment : []
};

export const collaborator = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case Types.FETCH_ALL_COLLABORATOR_CONFIG:
      newState.config = action.data;
      return newState;
    case Types.FETCH_ALL_COLLABORATOR_STEP:
      newState.allStep = action.data;
      return newState;
      case Types.FETCH_ALL_COLLABORATOR:
        newState.allCollaborator = action.data;
        return newState;
      case Types.FETCH_ALL_COLLABORATOR_REQUEST_PAYMENT:
        newState.allRequestPayment = action.data;
        return newState;
        case Types.FETCH_ALL_COLLABORATOR_HISTORY_PAYMENT:
          newState.allHistoryPayment = action.data;
          return newState;
    default:
      return newState;
  }
};
