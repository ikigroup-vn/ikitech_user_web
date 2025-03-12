import * as Types from "../../constants/ActionType";

var initialState = {
  appointments: [],
};

export const Appointment = (state = initialState, action) => {
  switch (action.type) {
    case Types.FETCH_ALL_APPOINTMENTS:
      return {
        ...state,
        appointments: action.data,
      };
    default:
      return state;
  }
};
