import * as Types from "../constants/ActionType";
import * as gamificationApi from "../data/remote/gamification";

export const fetchListGameSpinWheels = (store_code, params) => {
  return (dispatch) => {
    dispatch({ type: Types.SHOW_LOADING, loading: "show" });
    gamificationApi
      .fetchListGameSpinWheels(store_code, params)
      .then((res) => {
        dispatch({ type: Types.SHOW_LOADING, loading: "hidden" });
        if (res.data.code === 200) {
          dispatch({
            type: Types.LIST_GAME_SPIN_WHEELS,
            data: res.data.data,
          });
        }
      })
      .catch(function (error) {
        dispatch({
          type: Types.ALERT_UID_STATUS,
          alert: {
            type: "danger",
            title: "Lỗi",
            disable: "show",
            content: error?.response?.data?.message,
          },
        });
      });
  };
};

export const deleteGameSpinWheels = (store_code, id) => {
  return (dispatch) => {
    dispatch({ type: Types.SHOW_LOADING, loading: "show" });
    gamificationApi
      .deleteGameSpinWheels(store_code, id)
      .then((res) => {
        dispatch({ type: Types.SHOW_LOADING, loading: "hidden" });
        if (res.data.code === 200) {
          dispatch({
            type: Types.DELETE_GAME_SPIN_WHEELS,
            data: res.data.success,
          });
        }
      })
      .catch(function (error) {
        dispatch({
          type: Types.ALERT_UID_STATUS,
          alert: {
            type: "danger",
            title: "Lỗi",
            disable: "show",
            content: error?.response?.data?.message,
          },
        });
      });
  };
};
