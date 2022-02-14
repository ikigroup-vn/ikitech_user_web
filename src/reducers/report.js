
import * as Types from "../constants/ActionType";

var initialState = {
    topten: [],
    overview: [],
    alert_fetch_report : {
      disable: "hide",
    }

};

export const reportReducers = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case Types.FETCH_TOPTEN_REPORT:
      newState.topten = action.data;
      return newState;
      case Types.FETCH_OVERVIEW_REPORT:
        newState.overview = action.data;
        return newState;
        case Types.ALERT_UID_STATUS:
          newState.alert_fetch_report = action.data;
          return newState
    default:
      return newState;
  }
};

