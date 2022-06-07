import * as Types from "../constants/ActionType";
import history from "../history";
import * as billApi from "../data/remote/bill";
import * as chatApi from "../data/remote/chat";
import * as uploadApi from "../data/remote/upload";
import { compressed } from "../ultis/helpers";
import { getBranchId } from "../ultis/branchUtils"
import moment from "moment";
export const fetchAllBill = (store_code, page = 1, branch_id, params = null, params_agency = null) => {

  if (branch_id != null) {
    return (dispatch) => {
      dispatch({
        type: Types.SHOW_LOADING_LAZY,
        loading: "show"
      })
      billApi.fetchAllBill(store_code, page, branch_id, params, params_agency).then((res) => {
        dispatch({
          type: Types.SHOW_LOADING_LAZY,
          loading: "hide"
        })
        if (res.data.code !== 401)
          dispatch({
            type: Types.FETCH_ALL_BILL,
            data: res.data.data,
          });


      });
      billApi
        .fetchAllBill(store_code, page, branch_id, params, params_agency)
        .then((res) => {
          dispatch({
            type: Types.SHOW_LOADING_LAZY,
            loading: "hide",
          });
          if (res.data.code !== 401)
            dispatch({
              type: Types.FETCH_ALL_BILL,
              data: res.data.data,
            });
        });
    };
  }

};

export const fetchBillId = (store_code, order_code) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    billApi.fetchBillId(store_code, order_code).then((res) => {
      dispatch({
        type: Types.SHOW_LOADING,
        loading: "hide",
      });
      if (res.data.code !== 401) {
        dispatch({
          type: Types.FETCH_ID_BILL,
          data: res.data.data,
        });

        billApi.fetchBillHistory(store_code, res.data.data.id).then((res) => {
          if (res.data.code !== 401)
            dispatch({
              type: Types.FETCH_BILL_HISTORY,
              data: res.data.data,
            });
        });

        billApi
          .getHistoryDeliveryStatus(store_code, {
            order_code: res.data.data.order_code,
          })
          .then((res) => {
            if (res.data.code === 200)
              dispatch({
                type: Types.FETCH_DELIVERY_HISTORY,
                data: res.data.data,
              });
          });
      }
    });
  };
};


export const getCalculate = (store_code, data, branch_id = getBranchId()) => {
  return (dispatch) => {

    billApi
      .getCalculate(store_code, data, branch_id = getBranchId())
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING_LAZY,
          loading: "hide",
        });
        console.log(res)
        if (res.data.code !== 401)
          dispatch({
            type: Types.GET_CALCULATE,
            data: res.data.data,
          });
        else
          dispatch({
            type: Types.GET_CALCULATE,
            data: {},
          });

      }).catch(function (error) {
        dispatch({
          type: Types.GET_CALCULATE,
          data: {},
        });
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



export const fetchBillHistory = (store_code, billId) => {
  if (
    billId == undefined ||
    billId == null ||
    billId == "undefined" ||
    billId == 0
  ) {
    return;
  }

  return (dispatch) => {
    billApi.fetchBillHistory(store_code, billId).then((res) => {
      if (res.data.code !== 401)
        dispatch({
          type: Types.FETCH_BILL_HISTORY,
          data: res.data.data,
        });
    });
  };
};

export const fetchHistoryPay = (store_code, order_code) => {
  if (
    order_code == undefined ||
    order_code == null ||
    order_code == "undefined" ||
    order_code == 0
  ) {
    return;
  }

  return (dispatch) => {
    billApi.fetchHistoryPay(store_code, order_code).then((res) => {
      if (res.data.code === 200)
        dispatch({
          type: Types.FETCH_ALL_HISTORY_PAY,
          data: res.data.data,
        });
    });
  };
};

export const updateStatusOrder = (data, store_code, billId, order_code) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    billApi
      .updateStatusOrder(store_code, data)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
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
        billApi.fetchBillId(store_code, order_code).then((res) => {
          if (res.data.code !== 401)
            dispatch({
              type: Types.FETCH_ID_BILL,
              data: res.data.data,
            });
        });
        if (
          billId == undefined ||
          billId == null ||
          billId == "undefined" ||
          billId == 0
        ) {
          return;
        } else {
          billApi.fetchBillHistory(store_code, billId).then((res) => {
            if (res.data.code !== 401)
              dispatch({
                type: Types.FETCH_BILL_HISTORY,
                data: res.data.data,
              });
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
export const updateStatusPayment = (data, store_code, billId, order_code) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    billApi
      .updateStatusPayment(store_code, data)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
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
        billApi.fetchBillId(store_code, order_code).then((res) => {
          if (res.data.code !== 401)
            dispatch({
              type: Types.FETCH_ID_BILL,
              data: res.data.data,
            });
        });
        billApi.fetchBillHistory(store_code, billId).then((res) => {
          if (res.data.code !== 401)
            dispatch({
              type: Types.FETCH_BILL_HISTORY,
              data: res.data.data,
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
      });
  };
};

export const sendOrderToDelivery = (data, store_code, billId, order_code, order_status_code) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    billApi
      .sendOrderToDelivery(store_code, {
        order_code: order_code,
      })
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
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
        billApi
          .updateStatusOrder(store_code, {
            order_code: order_code,
            order_status_code: order_status_code
          })
          .then((res) => {


            billApi.fetchBillId(store_code, order_code).then((res) => {
              if (res.data.code !== 401)
                dispatch({
                  type: Types.FETCH_ID_BILL,
                  data: res.data.data,
                });
            });
            if (
              billId == undefined ||
              billId == null ||
              billId == "undefined" ||
              billId == 0
            ) {
              return;
            } else {
              billApi.fetchBillHistory(store_code, billId).then((res) => {
                if (res.data.code !== 401)
                  dispatch({
                    type: Types.FETCH_BILL_HISTORY,
                    data: res.data.data,
                  });
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

        billApi.getHistoryDeliveryStatus(store_code, data).then((res) => {
          if (res.data.code === 200)
            dispatch({
              type: Types.FETCH_DELIVERY_HISTORY,
              data: res.data.data,
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
      });
  };
};

export const updateOrder = (data, store_code, order_code) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    billApi
      .updateOrder(data, store_code, order_code)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
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
        billApi.fetchBillId(store_code, order_code).then((res) => {
          if (res.data.code !== 401)
            dispatch({
              type: Types.FETCH_ID_BILL,
              data: res.data.data,
            });
        });
      })
      .catch(function (error) {
        billApi.fetchBillId(store_code, order_code).then((res) => {
          if (res.data.code === 200)
            dispatch({
              type: Types.FETCH_ID_BILL,
              data: res.data.data,
            });
        });

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

export const getHistoryDeliveryStatus = (data, store_code) => {
  return (dispatch) => {
    billApi
      .getHistoryDeliveryStatus(store_code, data)
      .then((res) => {
        if (res.data.code === 200)
          dispatch({
            type: Types.FETCH_DELIVERY_HISTORY,
            data: res.data.data,
          });
      })
      .catch(function (errors) {
        console.log(errors);
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
export const sendMessage = (store_code, customerId, message) => {
  console.log(store_code, customerId, message);
  return (dispatch) => {
    chatApi
      .postMessage(store_code, customerId, { content: message })
      .then((res) => {
        console.log(res);
        if (res.data.code !== 401) {
          if (res.data.code == 400) {
            dispatch({
              type: Types.ALERT_UID_STATUS,
              alert: {
                type: "danger",
                title: "Lỗi",
                disable: "show",
                content: res.data.msg,
              },
            });
          } else {
            dispatch({
              type: Types.FETCH_ID_CHAT_USER,
              data: {
                customer_id: customerId,
                content: message,
                link_images: null,
                is_user: true,
                created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
              },
            });
          }
        }
      })
      .catch(function (error) {
        dispatch({
          type: Types.FETCH_ID_CHAT_USER,
          data: {},
        });
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

function getSizeImg(file, url) {
  return new Promise((resolve, reject) => {
    window.URL = window.URL || window.webkitURL;
    var width = 0,
      height = 0,
      size = 0;
    if (file) {
      var img = new Image();
      img.src = window.URL.createObjectURL(file);
      img.onload = function () {
        var _width = img.naturalWidth,
          _height = img.naturalHeight;
        window.URL.revokeObjectURL(img.src);
        console.log(_width, _height);
        height = _height;
        width = _width;
        size = file.size;
        resolve({
          link_images: url,

          height: height,
          width: width,
          size: size,
        });
      };
    }
  });
}

export const uploadImgChat = function (store_code, customerId, files) {
  return async (dispatch) => {
    var images = [];
    for (let i = 0; i < files.length; i++) {
      const fd = new FormData();
      var _file = await compressed(files[i]);
      fd.append(`image`, _file);
      try {
        var res = await uploadApi.upload(fd);

        if (res.data.code == 400) {
          {
            dispatch({
              type: Types.ALERT_UID_STATUS,
              alert: {
                type: "danger",
                title: "Lỗi",
                disable: "show",
                content: res.data.msg,
              },
            });
          }
        } else {
          images.push(await getSizeImg(_file, res.data.data));
        }
        if (i == files.length - 1) {
          var link_images = JSON.stringify(images);
          chatApi
            .postMessage(store_code, customerId, { link_images: link_images })
            .then((res) => {
              console.log(link_images);
              if (res.data.code !== 401)
                if (res.data.code == 400) {
                  dispatch({
                    type: Types.ALERT_UID_STATUS,
                    alert: {
                      type: "danger",
                      title: "Lỗi",
                      disable: "show",
                      content: res.data.msg,
                    },
                  });
                } else {
                  dispatch({
                    type: Types.FETCH_ID_CHAT_USER,
                    data: {
                      customer_id: customerId,
                      content: null,
                      link_images: link_images,
                      is_user: true,
                      created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
                    },
                  });
                }
            })
            .catch(() => {
              dispatch({
                type: Types.ALERT_UID_STATUS,
                alert: {
                  type: "danger",
                  title: "Lỗi",
                  disable: "show",
                  content: res.data.msg,
                },
              });
            });
        }
      } catch (error) {
        dispatch({
          type: Types.ALERT_UID_STATUS,
          alert: {
            type: "danger",
            title: "Lỗi",
            disable: "show",
            content: error?.response?.data?.msg,
          },
        });
      }
    }
  };
};


export const postRefund = (data, store_code, branch = getBranchId()) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show"
    })
    billApi
      .postRefund(data, store_code, branch)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide"
        })
        dispatch({
          type: Types.ALERT_UID_STATUS,
          alert: {
            type: "success",
            title: "Thành công ",
            disable: "show",
            content: res.data.msg,
          },
        });
        history.goBack();
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



export const postCashRefund = (order_code, data, store_code, branch = getBranchId()) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show"
    })
    billApi
      .postCashRefund(order_code, data, store_code, branch)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide"
        })
        dispatch({
          type: Types.ALERT_UID_STATUS,
          alert: {
            type: "success",
            title: "Thành công ",
            disable: "show",
            content: res.data.msg,
          },
        });
        // history.goBack();
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