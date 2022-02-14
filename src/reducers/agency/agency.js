import * as Types from "../../constants/ActionType";

var initialState = {
  config: {},
  allStep: [],
  allAgency : [],
  allRequestPayment : [],
  allHistoryPayment : [],
  allAgencyType : [],
  topReport : [],
  bonusAgencyConfig:{}
};

export const agency = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case Types.GET_BONUS_AGENCY_CONFIG:
      newState.bonusAgencyConfig = action.data;
      return newState;
    case Types.FETCH_ALL_AGENCY_CONFIG:
      newState.config = action.data;
      return newState;
      case Types.FETCH_ALL_AGENCY_TYPE:
        newState.allAgencyType = action.data;
        return newState;
    case Types.FETCH_ALL_AGENCY_STEP:
      newState.allStep = action.data;
      return newState;
      case Types.FETCH_ALL_AGENCY:
        newState.allAgency = action.data;
        return newState;
      case Types.FETCH_ALL_AGENCY_REQUEST_PAYMENT:
        newState.allRequestPayment = action.data;
        return newState;
        case Types.FETCH_ALL_AGENCY_HISTORY_PAYMENT:
          newState.allHistoryPayment = action.data;
          return newState;
          case Types.FETCH_ALL_AGENCY_TOP_REPORT:
            newState.topReport = action.data;
            return newState;
    default:
      return newState;
  }
};
