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

export const createCustomer = (store_code,id , funcModal = null) => {

  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading : "show"
    })
    customerApi
      .createCustomer(store_code,id)
      .then((res) => {
        if(res.data.success && funcModal != null)
        {
          console.log("da vao r")
          funcModal()
        }
        dispatch({
          type: Types.SHOW_LOADING,
          loading : "hide"
        })
        dispatch({
          type: Types.ALERT_UID_STATUS,
          tryShow:true,
          alert: {
            tryShow:true,
            type: "success",
            title: "Thành công ",
            disable: "show",
            content: res.data.msg,
          },
        });
        dispatch({
          type: Types.CREATED_CUSTOMER,
          isFromPosAndSave : id.isFromPosAndSave == null ? false : id.isFromPosAndSave,
          data: res.data.data,
        })
        
        if(id.isFromPosAndSave != true) {
          customerApi
          .fetchAllCustomer(store_code)
          .then((res) => {
            if(res.data.code !== 401)

            dispatch({
              type: Types.FETCH_ALL_CUSTOMER,
              data: res.data.data,
            });
          })
          .catch(function (error) {
            dispatch({
              type: Types.SHOW_LOADING,
              loading: "hide"
            })
            dispatch({
              type: Types.ALERT_UID_STATUS,
              alert: {
                type: "danger",
                title: "Lỗi",
                disable: "show",
                content: error.response.data.msg,
              },
            });
          });
        }
       


      })
      .catch(function (error) {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide"
        })
    
        dispatch({
          type: Types.ALERT_UID_STATUS,
          alert: {
            type: "danger",
            title: "Lỗi",
            disable: "show",
            content: error.response.data.msg,
          },
        });
      });
  };
};

export const editCustomer = (store_code,id,data , funcModal = null) => {

  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading : "show"
    })
    customerApi
      .editCustomer(store_code,id,data)
      .then((res) => {
        if(res.data.success && funcModal != null)
        {
          console.log("da vao r")
          funcModal()
        }
        dispatch({
          type: Types.SHOW_LOADING,
          loading : "hide"
        })
        customerApi
          .fetchAllCustomer(store_code)
          .then((res) => {
            if(res.data.code !== 401)

            dispatch({
              type: Types.FETCH_ALL_CUSTOMER,
              data: res.data.data,
            });
            dispatch({
              type: Types.ALERT_UID_STATUS,
              alert: {
                type: "success",
                title: "Thành công ",
                disable: "show",
                content: res.data.msg,
              },
            });
          })
          .catch(function (error) {
            dispatch({
              type: Types.SHOW_LOADING,
              loading: "hide"
            })
            dispatch({
              type: Types.ALERT_UID_STATUS,
              alert: {
                type: "danger",
                title: "Lỗi",
                disable: "show",
                content: error.response.data.msg,
              },
            });
          });
      })
      .catch(function (error) {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide"
        })
    
        dispatch({
          type: Types.ALERT_UID_STATUS,
          alert: {
            type: "danger",
            title: "Lỗi",
            disable: "show",
            content: error.response.data.msg,
          },
        });
      });
  };
};