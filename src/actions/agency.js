import * as Types from "../constants/ActionType";
import * as agencyApi from "../data/remote/agency";
import * as chatApi from "../data/remote/chat";
import history from "../history";

export const fetchAgencyConf = (store_code) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING_LAZY,
      loading: "show"
    })
    agencyApi.fetchAgencyConf(store_code).then((res) => {
      dispatch({
        type: Types.SHOW_LOADING_LAZY,
        loading: "hide"
      })
      if (res.data.code !== 401)
        dispatch({
          type: Types.FETCH_ALL_AGENCY_CONFIG,
          data: res.data.data,
        });
    });
  };
};




export const fetchAllAgencyType = (store_code) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING_LAZY,
      loading: "show"
    })
    agencyApi.fetchAllAgencyType(store_code).then((res) => {
      dispatch({
        type: Types.SHOW_LOADING_LAZY,
        loading: "hide"
      })
      if (res.data.code !== 401)
        dispatch({
          type: Types.FETCH_ALL_AGENCY_TYPE,
          data: res.data.data,
        });
    });
  };
};

export const fetchAllHistory = (store_code) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING_LAZY,
      loading: "show"
    })
    agencyApi.fetchAllHistory(store_code).then((res) => {
      console.log(res)
      dispatch({
        type: Types.SHOW_LOADING_LAZY,
        loading: "hide"
      })
      if (res.data.code !== 401)
        dispatch({
          type: Types.FETCH_ALL_AGENCY_HISTORY_PAYMENT,
          data: res.data.data,
        });
    });
  };
};

export const fetchAllTopReport = (store_code, page = 1, params) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING_LAZY,
      loading: "show"
    })
    agencyApi.fetchAllTopReport(store_code, page, params).then((res) => {
      console.log(res)
      dispatch({
        type: Types.SHOW_LOADING_LAZY,
        loading: "hide"
      })
      if (res.data.code !== 401)
        dispatch({
          type: Types.FETCH_ALL_AGENCY_TOP_REPORT,
          data: res.data.data,
        });
    });
  };
};

export const getBonusAgencyConfig = (store_code) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING_LAZY,
      loading: "show"
    })
    agencyApi.getBonusAgencyConfig(store_code).then((res) => {

      dispatch({
        type: Types.SHOW_LOADING_LAZY,
        loading: "hide"
      })
      if (res.data.code !== 401)
        dispatch({
          type: Types.GET_BONUS_AGENCY_CONFIG,
          data: res.data.data,
        });
    });
  };
};

export const updateBonusAgencyConfig = (store_code, data) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING_LAZY,
      loading: "show"
    })
    agencyApi.updateBonusAgencyConfig(store_code, data).then((res) => {
      console.log(res)
      dispatch({
        type: Types.SHOW_LOADING_LAZY,
        loading: "hide"
      })
      if (res.data.code !== 401) {
        dispatch({
          type: Types.UPDATE_BONUS_AGENCY_CONFIG,
          data: res.data.data,
        });
        agencyApi.getBonusAgencyConfig(store_code).then((res) => {

          dispatch({
            type: Types.SHOW_LOADING_LAZY,
            loading: "hide"
          })
          if (res.data.code !== 401)
            dispatch({
              type: Types.GET_BONUS_AGENCY_CONFIG,
              data: res.data.data,
            });
        });
      }


    });
  };
};

export const addBonusSteps = (store_code, data) => {
  return (dispatch) => {

    agencyApi.addBonusSteps(store_code, data).then((res) => {
      console.log(res)
      dispatch({
        type: Types.SHOW_LOADING_LAZY,
        loading: "hide"
      })
      if (res.data.code !== 401) {


        dispatch({
          type: Types.ADD_BONUS_STEP_AGENCY,
          data: res.data.data,
        });
        agencyApi.getBonusAgencyConfig(store_code).then((res) => {

          dispatch({
            type: Types.SHOW_LOADING_LAZY,
            loading: "hide"
          })
          if (res.data.code !== 401)
            dispatch({
              type: Types.GET_BONUS_AGENCY_CONFIG,
              data: res.data.data,
            });
        });

        history.push('/agency/'+store_code+'?tab-index=3');
      }
    }).catch(function (error) {
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

export const updateBonusSteps = (store_code, id, data) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING_LAZY,
      loading: "show"
    })
    agencyApi.updateBonusSteps(store_code, id, data).then((res) => {
      console.log(res)
      dispatch({
        type: Types.SHOW_LOADING_LAZY,
        loading: "hide"
      })
      if (res.data.code === 200) {
        dispatch({
          type: Types.UPDATE_BONUS_STEP_AGENCY,
          data: res.data.data,
        });
        agencyApi.getBonusAgencyConfig(store_code).then((res) => {

          dispatch({
            type: Types.SHOW_LOADING_LAZY,
            loading: "hide"
          })
          if (res.data.code !== 401)
            dispatch({
              type: Types.GET_BONUS_AGENCY_CONFIG,
              data: res.data.data,
            });
        });
        history.push('/agency/'+store_code+'?tab-index=3');
      }
    }).catch(function (error) {
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
    dispatch({
      type: Types.SHOW_LOADING_LAZY,
      loading: "hide"
    })
  };
};


export const deleteBonusSteps = (store_code, id) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING_LAZY,
      loading: "show"
    })
    agencyApi.deleteBonusSteps(store_code, id).then((res) => {
      console.log(res)
      dispatch({
        type: Types.SHOW_LOADING_LAZY,
        loading: "hide"
      })
      if (res.data.code !== 401) {
        dispatch({
          type: Types.DELETE_BONUS_STEP_AGENCY,
          data: res.data.data,
        });
        agencyApi.getBonusAgencyConfig(store_code).then((res) => {

          dispatch({
            type: Types.SHOW_LOADING_LAZY,
            loading: "hide"
          })
          if (res.data.code !== 401)
            dispatch({
              type: Types.GET_BONUS_AGENCY_CONFIG,
              data: res.data.data,
            });
        });

      }

    });
  };
};

export const updateAllRequestPayment = (store_code) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show"
    })
    agencyApi
      .updateAllRequestPayment(store_code)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide"
        })
        agencyApi.fetchAllRequestPayment(store_code).then((res) => {
          if (res.data.code !== 401)

            dispatch({
              type: Types.FETCH_ALL_AGENCY_REQUEST_PAYMENT,
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


export const updateAgency = (store_code, id, data) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show"
    })
    agencyApi
      .updateAgency(store_code, id, data)
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
        agencyApi.fetchAllAgency(store_code, 1).then((res) => {
          console.log(res)
          dispatch({
            type: Types.SHOW_LOADING_LAZY,
            loading: "hide"
          })
          if (res.data.code !== 401)
            dispatch({
              type: Types.FETCH_ALL_AGENCY,
              data: res.data.data,
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

export const updateRequestPayment = (store_code, data) => {
  console.log(store_code, data)
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show"
    })
    agencyApi
      .updateRequestPayment(store_code, data)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide"
        })
        agencyApi.fetchAllRequestPayment(store_code).then((res) => {
          if (res.data.code !== 401)

            dispatch({
              type: Types.FETCH_ALL_AGENCY_REQUEST_PAYMENT,
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


export const fetchAllRequestPayment = (store_code) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING_LAZY,
      loading: "show"
    })
    agencyApi.fetchAllRequestPayment(store_code).then((res) => {
      console.log(res)
      dispatch({
        type: Types.SHOW_LOADING_LAZY,
        loading: "hide"
      })
      if (res.data.code !== 401)
        dispatch({
          type: Types.FETCH_ALL_AGENCY_REQUEST_PAYMENT,
          data: res.data.data,
        });
    });
  };
};

export const fetchAllAgency = (store_code, page = 1, params = null) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING_LAZY,
      loading: "show"
    })
    agencyApi.fetchAllAgency(store_code, page,params).then((res) => {
      console.log(res)
      dispatch({
        type: Types.SHOW_LOADING_LAZY,
        loading: "hide"
      })
      if (res.data.code !== 401)
        dispatch({
          type: Types.FETCH_ALL_AGENCY,
          data: res.data.data,
        });
    });
  };
};

export const fetchChatId = (store_code, customerId, pag = 1) => {
  return (dispatch) => {

    chatApi.fetchChatId(store_code, customerId, pag).then((res) => {

      if (res.data.code !== 401)
        dispatch({
          type: Types.FETCH_ID_CHAT,
          data: res.data.data,
        });
    }).catch(function (errors) {
      console.log(errors)
    });
  };
};



export const fetchAllSteps = (store_code) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING_LAZY,
      loading: "show"
    })
    agencyApi.fetchAllSteps(store_code).then((res) => {
      console.log(res)
      dispatch({
        type: Types.SHOW_LOADING_LAZY,
        loading: "hide"
      })
      if (res.data.code !== 401)
        dispatch({
          type: Types.FETCH_ALL_AGENCY_STEP,
          data: res.data.data,
        });
    });
  };
};




export const createAgencyType = (store_code, data) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show"
    })
    agencyApi
      .createAgencyType(store_code, data)
      .then((res) => {
        console.log(res)
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide"
        })
        agencyApi.fetchAllAgencyType(store_code).then((res) => {
          if (res.data.code !== 401)

            dispatch({
              type: Types.FETCH_ALL_AGENCY_TYPE,
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


export const createStep = (store_code, data) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show"
    })
    agencyApi
      .createStep(store_code, data)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide"
        })
        agencyApi.fetchAllSteps(store_code).then((res) => {
          if (res.data.code !== 401)

            dispatch({
              type: Types.FETCH_ALL_AGENCY_STEP,
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


export const destroyType = (store_code, id) => {

  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show"
    })
    agencyApi
      .destroyType(store_code, id)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide"
        })
        agencyApi
          .fetchAllAgencyType(store_code)
          .then((res) => {
            if (res.data.code !== 401)

              dispatch({
                type: Types.FETCH_ALL_AGENCY_TYPE,
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

export const destroyStep = (store_code, id) => {

  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show"
    })
    agencyApi
      .destroyStep(store_code, id)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide"
        })
        agencyApi
          .fetchAllSteps(store_code)
          .then((res) => {
            if (res.data.code !== 401)

              dispatch({
                type: Types.FETCH_ALL_AGENCY_STEP,
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




export const updateAgencyType = (store_code, id, data) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show"
    })
    agencyApi
      .updateAgencyType(store_code, id, data)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide"
        })
        agencyApi.fetchAllAgencyType(store_code).then((res) => {
          if (res.data.code !== 401)

            dispatch({
              type: Types.FETCH_ALL_AGENCY_TYPE,
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
export const updateStep = (store_code, id, data) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show"
    })
    agencyApi
      .updateStep(store_code, id, data)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide"
        })
        agencyApi.fetchAllSteps(store_code).then((res) => {
          if (res.data.code !== 401)

            dispatch({
              type: Types.FETCH_ALL_AGENCY_STEP,
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

export const updateConfig = (store_code, data) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show"
    })
    agencyApi
      .updateConfig(store_code, data)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide"
        })
        agencyApi.fetchAgencyConf(store_code).then((res) => {
          if (res.data.code !== 401)

            dispatch({
              type: Types.FETCH_ALL_AGENCY_CONFIG,
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
