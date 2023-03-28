import * as Types from "../constants/ActionType";
import * as ecommerceApi from "../data/remote/ecommerce";

//Danh sách kết nối sàn
export const fetchListConnectEcommerce = (store_code, params) => {
  return (dispatch) => {
    dispatch({ type: Types.SHOW_LOADING, loading: "show" });
    ecommerceApi
      .fetchListConnectEcommerce(store_code, params)
      .then((res) => {
        dispatch({ type: Types.SHOW_LOADING, loading: "hidden" });
        if (res.data.code === 200) {
          dispatch({
            type: Types.LIST_CONNECT_ECOMMERCE,
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
            content: error?.response?.data?.msg,
          },
        });
      });
  };
};

// Kết nối sàn
export const connectEcommerce = (platform, store_code, funcModal) => {
  return (dispatch) => {
    dispatch({ type: Types.SHOW_LOADING, loading: "show" });
    ecommerceApi
      .connectEcommerce(platform, store_code)
      .then((res) => {
        dispatch({ type: Types.SHOW_LOADING, loading: "hidden" });
        funcModal();
      })
      .catch(function (error) {
        dispatch({
          type: Types.ALERT_UID_STATUS,
          alert: {
            type: "danger",
            title: "Lỗi",
            disable: "show",
            content: error?.response?.data?.msg,
          },
        });
      });
  };
};
