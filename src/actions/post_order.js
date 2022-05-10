import * as Types from "../constants/ActionType";
import * as PosApi from "../data/remote/pos_order"
export const listPosOrder = (store_code, branch_id) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show"
    })
    dispatch({
      type: Types.FETCH_LIST_POS_ORDER_LOADING,
    })
    PosApi.listPosOrder(store_code, branch_id).then((res) => {
      dispatch({
        type: Types.SHOW_LOADING,
        loading: "hide"
      })
      console.log("res", res)
      if (res.data.code !== 401)
        dispatch({
          type: Types.FETCH_LIST_POS_ORDER,
          data: res.data.data,
        });
    });
  }


}


export const addComboInCart = (store_code, branch_id, id_cart, data) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show"
    })
    PosApi
      .addComboInCart(store_code, branch_id, id_cart, data)
      .then((res) => {
        dispatch({
          type: Types.FETCH_LIST_CART_ITEM,
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
          type: Types.ALERT_UID_STATUS,
          alert: {
            type: "danger",
            title: "Lỗi",
            disable: "show",
            content: error?.response?.data?.msg,
          },
        });



      })
  };
};
export const addProductInCart = (store_code, branch_id, id_cart, data) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show"
    })
    PosApi
      .addProductInCart(store_code, branch_id, id_cart, data)
      .then((res) => {
        dispatch({
          type: Types.FETCH_LIST_CART_ITEM,
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
          type: Types.ALERT_UID_STATUS,
          alert: {
            type: "danger",
            title: "Lỗi",
            disable: "show",
            content: error?.response?.data?.msg,
          },
        });



      })
  };
};
export const deleteOneCart = (store_code, branch_id, id_cart) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show"
    })
    PosApi
      .deleteOneCart(store_code, branch_id, id_cart)
      .then((res) => {
        console.log("res", res)
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide"
        })
        PosApi.listPosOrder(store_code, branch_id).then((res) => {
          if (res.data.code === 200)

            dispatch({
              type: Types.FETCH_LIST_POS_ORDER,
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
        });
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
            content: error?.response?.data?.msg,
          },
        });
      });
  };
};

export const createOneTab = (store_code, branch_id, data) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show"
    })
    PosApi
      .createOneTab(store_code, branch_id, data)
      .then((res) => {
        console.log("res", res)
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide"
        })
        PosApi.listPosOrder(store_code, branch_id).then((res) => {
          if (res.data.code === 200)

            dispatch({
              type: Types.FETCH_LIST_POS_ORDER,
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
        });
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
            content: error?.response?.data?.msg,
          },
        });
      });
  };
};

export const fetchInfoOneCart = (store_code, branch_id, id) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show"
    })
    PosApi.fetchInfoOneCart(store_code, branch_id, id).then((res) => {
      dispatch({
        type: Types.SHOW_LOADING,
        loading: "hide"
      })
      console.log("res", res)
      if (res.data.code !== 401)
        dispatch({
          type: Types.FETCH_LIST_CART_ITEM,
          data: res.data.data,
        });
    });
  }


}
export const updateQuantityLineItem = (store_code, branch_id, id_cart, data) => {

  return (dispatch) => {
    dispatch({
      type: Types.LOADING_CHANGE_QUANTITY_LINE_ITEM,
    })
    PosApi
      .updateQuantityLineItem(store_code, branch_id, id_cart, data)
      .then((res) => {


        dispatch({
          type: Types.NONE_CHANGE_QUANTITY_LINE_ITEM,
        })
        dispatch({
          type: Types.FETCH_LIST_CART_ITEM,
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
        PosApi.fetchInfoOneCart(store_code, branch_id, id_cart).then((res) => {
          if (res.data.code == 200)
            dispatch({
              type: Types.FETCH_LIST_CART_ITEM,
              data: res.data.data,
            });
        });


        dispatch({
          type: Types.NONE_CHANGE_QUANTITY_LINE_ITEM,
        })
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

export const subQuantityProduct = (store_code, branch_id, id_cart, data) => {
  console.log("id_cart", id_cart)
  return (dispatch) => {
    dispatch({
      type: Types.LOADING_CHANGE_QUANTITY_LINE_ITEM,
    })
    PosApi
      .subQuantityProduct(store_code, branch_id, id_cart, data)
      .then((res) => {
        dispatch({
          type: Types.NONE_CHANGE_QUANTITY_LINE_ITEM,
        })
        dispatch({
          type: Types.FETCH_LIST_CART_ITEM,
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
          type: Types.NONE_CHANGE_QUANTITY_LINE_ITEM,
        })
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

export const destroyOneProduct = (store_code, branch_id, id_cart, data) => {
  console.log("id_cart", id_cart)
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show"
    })
    PosApi
      .destroyOneProduct(store_code, branch_id, id_cart, data)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide"
        })
        dispatch({
          type: Types.FETCH_LIST_CART_ITEM,
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

export const updateInfoCart = (store_code, branch_id, id, data) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show"
    })
    PosApi.updateInfoCart(store_code, branch_id, id, data)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide"
        })

        dispatch({
          type: Types.FETCH_LIST_CART_ITEM,
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

export const updateInfoCarts = (store_code, branch_id, id, data) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show"
    })
    PosApi.updateInfoCarts(store_code, branch_id, id, data)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide"
        })

        var data2 = res.data.data
        data2.noUpdateUI = data.noUpdateUI

        dispatch({
          type: Types.FETCH_LIST_CART_ITEM,
          data: data2,
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
export const paymentOrderPos = (store_code, branch_id, id, data) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show"
    })
    dispatch({
      type: Types.POS_ORDER_PAYMENT_LOADING,
      loadingOrder: true
    })
    PosApi.paymentOrderPos(store_code, branch_id, id, data)
      .then((res) => {
        dispatch({
          type: Types.POS_ORDER_PAYMENT_SUCCESS,
          data: {
            orderAfterPayment: res.data.data,
            loadingOrder: false,
            allowAutoPrint: data.allowAutoPrint
          }
        })

        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide"
        })
        PosApi.listPosOrder(store_code, branch_id).then((res) => {
          if (res.data.code === 200)

            dispatch({
              type: Types.FETCH_LIST_POS_ORDER,
              data: res.data.data,
            });

        })
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
export const fetchVoucher = (store_code, branch_id, id, data) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show"
    })
    PosApi.fetchVoucher(store_code, branch_id, id, data)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide"
        })
        dispatch({
          type: Types.FETCH_LIST_CART_ITEM,
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


