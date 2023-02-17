import * as Types from "../constants/ActionType";
import * as saleApi from "../data/remote/sale";

export const fetchStaffConfig = (store_code) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING_LAZY,
      loading: "show",
    });
    saleApi
      .fetchStaffConfig(store_code)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING_LAZY,
          loading: "hide",
        });
        if (res.data.code === 200) {
          dispatch({
            type: Types.FETCH_ALL_SALE_CONFIG,
            data: res.data.data,
          });
        }
      })
      .catch(function (error) {
        dispatch({
          type: Types.SHOW_LOADING_LAZY,
          loading: "hide",
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

export const fetchAllSteps = (store_code) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING_LAZY,
      loading: "show",
    });
    saleApi
      .fetchAllSteps(store_code)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING_LAZY,
          loading: "hide",
        });
        if (res.data.code === 200) {
          dispatch({
            type: Types.FETCH_ALL_SALE_STEP,
            data: res.data.data,
          });
        }
      })
      .catch(function (error) {
        dispatch({
          type: Types.SHOW_LOADING_LAZY,
          loading: "hide",
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
export const addStep = (store_code, data) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING_LAZY,
      loading: "show",
    });
    saleApi
      .addStep(store_code, data)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING_LAZY,
          loading: "hide",
        });
        if (res.data.code === 200) {
          dispatch({
            type: Types.ADD_SALE_STEP,
            data: res.data.success,
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
          dispatch(fetchAllSteps(store_code));
        }
      })
      .catch(function (error) {
        dispatch({
          type: Types.SHOW_LOADING_LAZY,
          loading: "hide",
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
export const updateStep = (store_code, idStep, data) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING_LAZY,
      loading: "show",
    });
    saleApi
      .updateStep(store_code, idStep, data)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING_LAZY,
          loading: "hide",
        });
        if (res.data.code === 200) {
          dispatch({
            type: Types.UPDATE_SALE_STEP,
            data: res.data.success,
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
          dispatch(fetchAllSteps(store_code));
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
        dispatch({
          type: Types.SHOW_LOADING_LAZY,
          loading: "hide",
        });
      });
  };
};
export const removeStep = (store_code, idStep) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING_LAZY,
      loading: "show",
    });
    saleApi
      .removeStep(store_code, idStep)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING_LAZY,
          loading: "hide",
        });
        if (res.data.code === 200) {
          dispatch({
            type: Types.REMOVE_SALE_STEP,
            data: res.data.success,
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
          dispatch(fetchAllSteps(store_code));
        }
      })
      .catch(function (error) {
        dispatch({
          type: Types.SHOW_LOADING_LAZY,
          loading: "hide",
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
export const updateConfig = (store_code, data) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING_LAZY,
      loading: "show",
    });
    saleApi
      .updateConfig(store_code, data)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING_LAZY,
          loading: "hide",
        });
        if (res.data.code === 200) {
          dispatch({
            type: Types.UPDATE_SALE_CONFIG,
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
        }
      })
      .catch(function (error) {
        dispatch({
          type: Types.SHOW_LOADING_LAZY,
          loading: "hide",
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
export const addCustomerToSale = (store_code, data) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING_LAZY,
      loading: "show",
    });
    saleApi
      .addCustomerToSale(store_code, data)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING_LAZY,
          loading: "hide",
        });
        if (res.data.code === 200) {
          dispatch({
            type: Types.ADD_CUSTOMER_TO_SALE,
            data: res.data.success,
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
        }
      })
      .catch(function (error) {
        dispatch({
          type: Types.SHOW_LOADING_LAZY,
          loading: "hide",
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
export const fetchStatisticalSaleForUser = (store_code, id) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING_LAZY,
      loading: "show",
    });
    saleApi
      .fetchStatisticalSaleForUser(store_code, id)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING_LAZY,
          loading: "hide",
        });
        if (res.data.code === 200) {
          dispatch({
            type: Types.STATISTICAL_SALE_USER,
            data: res.data.data,
          });
        }
      })
      .catch(function (error) {
        dispatch({
          type: Types.SHOW_LOADING_LAZY,
          loading: "hide",
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

//Sale Management
export const fetchStatisticalSale = (store_code) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING_LAZY,
      loading: "show",
    });
    saleApi
      .fetchStatisticalSale(store_code)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING_LAZY,
          loading: "hide",
        });
        if (res.data.code === 200) {
          dispatch({
            type: Types.STATISTICAL_SALE,
            data: res.data.data,
          });
        }
      })
      .catch(function (error) {
        dispatch({
          type: Types.SHOW_LOADING_LAZY,
          loading: "hide",
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
export const fetchListCustomerOfSale = (store_code, page, queryString) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING_LAZY,
      loading: "show",
    });
    saleApi
      .fetchListCustomerOfSale(store_code, page, queryString)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING_LAZY,
          loading: "hide",
        });
        if (res.data.code === 200) {
          dispatch({
            type: Types.FETCH_ALL_CUSTOMER_OF_SALE,
            data: res.data.data,
          });
        }
      })
      .catch(function (error) {
        dispatch({
          type: Types.SHOW_LOADING_LAZY,
          loading: "hide",
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
export const fetchDetailCustomerOfSale = (store_code, id) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING_LAZY,
      loading: "show",
    });
    saleApi
      .fetchDetailCustomerOfSale(store_code, id)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING_LAZY,
          loading: "hide",
        });
        if (res.data.code === 200) {
          dispatch({
            type: Types.FETCH_DETAIL_OF_CUSTOMER,
            data: res.data.data,
          });
        }
      })
      .catch(function (error) {
        dispatch({
          type: Types.SHOW_LOADING_LAZY,
          loading: "hide",
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
export const addCustomerOfSale = (store_code, data, funcModal) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING_LAZY,
      loading: "show",
    });
    saleApi
      .addCustomerOfSale(store_code, data)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING_LAZY,
          loading: "hide",
        });
        if (res.data.code === 200) {
          dispatch({
            type: Types.ADD_CUSTOMER_OF_SALE,
            data: res.data.success,
          });
          funcModal();
          dispatch({
            type: Types.ALERT_UID_STATUS,
            alert: {
              type: "success",
              title: "Thành công ",
              disable: "show",
              content: res.data.msg,
            },
          });
        }
      })
      .catch(function (error) {
        dispatch({
          type: Types.SHOW_LOADING_LAZY,
          loading: "hide",
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
export const updateCustomerOfSale = (store_code, data, id) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING_LAZY,
      loading: "show",
    });
    saleApi
      .updateCustomerOfSale(store_code, data, id)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING_LAZY,
          loading: "hide",
        });
        if (res.data.code === 200) {
          dispatch({
            type: Types.UPDATE_CUSTOMER_OF_SALE,
            data: res.data.success,
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
        }
      })
      .catch(function (error) {
        dispatch({
          type: Types.SHOW_LOADING_LAZY,
          loading: "hide",
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
export const deletedCustomerOfSale = (store_code, id) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING_LAZY,
      loading: "show",
    });
    saleApi
      .deletedCustomerOfSale(store_code, id)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING_LAZY,
          loading: "hide",
        });
        if (res.data.code === 200) {
          dispatch({
            type: Types.REMOVE_CUSTOMER_OF_SALE,
            data: res.data.success,
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
        }
      })
      .catch(function (error) {
        dispatch({
          type: Types.SHOW_LOADING_LAZY,
          loading: "hide",
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
