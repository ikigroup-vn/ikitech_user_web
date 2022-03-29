import * as Types from "../constants/ActionType";
import history from "../history";
import * as customerApi from "../data/remote/customer";
import * as chatApi from "../data/remote/chat";

export const fetchAllCustomer = (
  store_code,
  page,
  params,
  referral_phone_number
) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    customerApi
      .fetchAllCustomer(store_code, page, params, referral_phone_number)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
        if (res.data.code !== 401)
          dispatch({
            type: Types.FETCH_ALL_CUSTOMER,
            data: res.data.data,
          });
      });
  };
};
export const fetchChatId = (store_code, customerId, pag = 1) => {
  return (dispatch) => {
    chatApi
      .fetchChatId(store_code, customerId, pag)
      .then((res) => {
        if (res.data.code !== 401)
          dispatch({
            type: Types.FETCH_ID_CHAT,
            data: res.data.data,
          });
      })
      .catch(function (errors) {
        console.log(errors);
      });
  };
};
export const fetchCustomerId = (store_code, customerId) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    customerApi.fetchCustomerId(store_code, customerId).then((res) => {
      dispatch({
        type: Types.SHOW_LOADING,
        loading: "hide",
      });
      if (res.data.code !== 401)
        dispatch({
          type: Types.FETCH_ID_CUSTOMER,
          data: res.data.data,
        });
    });
  };
};
