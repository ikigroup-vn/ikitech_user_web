import * as Types from "../../constants/ActionType";

var initialState = {
  allRevenueExpenditures: [],
  revenueExpendituresDetail: {},
};

export const revenueExpenditures = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case Types.FETCH_ALL_REVENUE_EXPENDITURES:
      newState.allRevenueExpenditures = action.data;
      return newState;
    case Types.FETCH_REVENUE_EXPENDITURES_BY_ID:
      newState.revenueExpendituresDetail = action.data;
      return newState;
    default:
      return newState;
  }
};
