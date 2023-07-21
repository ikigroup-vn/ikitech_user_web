import * as Types from "../../constants/ActionType";
var initialState = {
  allOtpUnit: [],
  otpUnit: {},
};

export const otp_unit = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case Types.FETCH_ALL_OTP_UNIT:
      newState.allOtpUnit = action.data;
      return newState;

    case Types.RESET_ALL_OTP_UNIT:
      newState.allOtpUnit = action.data;
      return newState;
    case Types.FETCH_DETAIL_OTP_UNIT:
      newState.otpUnit = action.data;
      return newState;
    default:
      return newState;
  }
};
