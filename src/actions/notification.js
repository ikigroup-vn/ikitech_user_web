import * as Types from "../constants/ActionType";
import history from "../history";
import * as notificationApi from "../data/remote/notification";
import * as badgeApi from "../data/remote/badge"

export const fetchAllNotification = (store_code , page=1) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show"
    })
    notificationApi
      .fetchAllNotification(store_code , page)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide"
        })
        if(res.data.code !== 401)
        {
          dispatch({
            type: Types.FETCH_ALL_NOTIFICATION,
            data : res.data.data
          });
   
          notificationApi.readAllNotification(store_code)
        }

      });
  };
};
export const fetchAllGeneralSetting = (store_code) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show"
    })
    notificationApi
      .fetchAllGeneralSetting(store_code)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide"
        })
        if(res.data.code !== 401)
        {
          dispatch({
            type: Types.FETCH_ALL_GENERAL_SETTING,
            data : res.data.data
          });
   
          notificationApi.readAllNotification(store_code)
        }

      });
  };
};

export const fetchAllBadge = (store_code,branch_id) => {
  return (dispatch) => {
    // dispatch({
    //   type: Types.SHOW_LOADING,
    //   loading : "show"
    // })
    badgeApi.fetchAllBadge(store_code,branch_id).then((res) => {
      // dispatch({
      //   type: Types.SHOW_LOADING,
      //   loading : "hide"
      // })
      
      if(res.data.code !== 401)
      {
      dispatch({
        type: Types.FETCH_ALL_BADGE,
        data: res.data.data,
      });
      dispatch({
        type: Types.FETCH_PERMISSION,
        data : typeof res.data.data != "undefined" && res.data.data.decentralization != null  ? res.data.data.decentralization : {}
      });
    }
    });
  };
};

export const updateGeneralSetting = (store_code,data) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading : "show"
    })
    notificationApi.updateGeneralSetting(store_code,data).then((res) => {
      dispatch({
        type: Types.SHOW_LOADING,
        loading : "hide"
      })
      
      if(res.data.code !== 401)
      {
      dispatch({
        type: Types.FETCH_ALL_GENERAL_SETTING,
        data: res.data.data,
      });
    }
    });
  };
};

