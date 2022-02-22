import * as Type from "../constants/ActionType"
import * as inventory from "../data/remote/inventory"

export const fetchAllInventory = (store_code,branch_id,page,params) =>{
    return (dispatch) =>{
        dispatch({
            type: Type.SHOW_LOADING,
            loading: "show"
        })
        console.log("params",params)
        inventory.fetchAllInventory(store_code,branch_id,page,params)
        .then(res =>{
            dispatch({
                type: Type.SHOW_LOADING,
                loading:"hide"
            })
            if(res.data.code !== 401){
                dispatch({
                    type: Type.FETCH_ALL_SHEETS_INVENTORY,
                    data: res.data.data
                })
            }
        })
    }
    
}
export const createInventorys = (store_code,branch_id,data) => {
    return (dispatch) => {
      dispatch({
        type: Type.SHOW_LOADING,
        loading : "show"
      })
      inventory
        .createInventorys(store_code,branch_id,data)
        .then((res) => {
          console.log("res",res)
          dispatch({
            type: Type.SHOW_LOADING,
            loading : "hide"
          })
          inventory.fetchAllInventory(store_code,branch_id).then((res) => {
            if(res.data.code === 200)
  
            dispatch({
              type: Type.FETCH_ALL_SHEETS_INVENTORY,
              data: res.data.data,
            });
            dispatch({
              type: Type.ALERT_UID_STATUS,
              alert: {
                type: "success",
                title: "Thành công ",
                disable: "show",
                content: res.data.msg,
              },
            });
          });
        })
        .catch(function (error) {
          dispatch({
            type: Type.ALERT_UID_STATUS,
            alert: {
              type: "danger",
              title: "Lỗi",
              disable: "show",
              content: error.response.data.msg,
            },
          });
        })
        .catch(function (error) {
          dispatch({
            type: Type.SHOW_LOADING,
            loading : "hide"
          })
          dispatch({
            type: Type.ALERT_UID_STATUS,
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