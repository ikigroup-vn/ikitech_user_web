import * as Types from "../constants/ActionType";
import * as appointmentService from "../data/remote/appointment";

export const getAppointments = (store_code, page = 1, start_date = new Date().toISOString(), end_date = new Date().toISOString()) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show"
    })
    appointmentService.fetchAppointments(store_code, page, start_date, end_date).then((res) => {
      dispatch({
        type: Types.SHOW_LOADING,
        loading: "hide"
      })
      
      if (res.data.code !== 401)
        dispatch({
          type: Types.FETCH_ALL_APPOINTMENTS,
          data: res.data.data,
        });
    });
  };
};