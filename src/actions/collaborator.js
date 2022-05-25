import * as Types from "../constants/ActionType";
import * as collaboratorApi from "../data/remote/collaborator";
import * as chatApi from "../data/remote/chat";

export const fetchCollaboratorConf = (store_code) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING_LAZY,
      loading: "show"
    })
    collaboratorApi.fetchCollaboratorConf(store_code).then((res) => {
      dispatch({
        type: Types.SHOW_LOADING_LAZY,
        loading: "hide"
      })
      if (res.data.code !== 401)
        dispatch({
          type: Types.FETCH_ALL_COLLABORATOR_CONFIG,
          data: res.data.data,
        });
    });
  };
};


export const fetchAllHistory = (store_code , page=1,params) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING_LAZY,
      loading: "show"
    })
    collaboratorApi.fetchAllHistory(store_code,page,params).then((res) => {
      console.log(res)
      dispatch({
        type: Types.SHOW_LOADING_LAZY,
        loading: "hide"
      })
      if (res.data.code !== 401)
        dispatch({
          type: Types.FETCH_ALL_COLLABORATOR_HISTORY_PAYMENT,
          data: res.data.data,
        });
    });
  };
};

export const updateAllRequestPayment = (store_code) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show"
    })
    collaboratorApi
      .updateAllRequestPayment(store_code)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide"
        })
        collaboratorApi.fetchAllRequestPayment(store_code).then((res) => {
          if (res.data.code !== 401)

            dispatch({
              type: Types.FETCH_ALL_COLLABORATOR_REQUEST_PAYMENT,
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

export const fetchAllTopReport = (store_code, page = 1, params) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING_LAZY,
      loading: "show"
    })
    collaboratorApi.fetchAllTopReport(store_code, page, params).then((res) => {
      console.log(res)
      dispatch({
        type: Types.SHOW_LOADING_LAZY,
        loading: "hide"
      })
      if (res.data.code !== 401)
        dispatch({
          type: Types.FETCH_ALL_COLLABORATOR_TOP_REPORT,
          data: res.data.data,
        });
    });
  };
};



export const updateCollaborator = (store_code, id, data) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show"
    })
    collaboratorApi
      .updateCollaborator(store_code, id, data)
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
        collaboratorApi.fetchAllCollaborator(store_code, 1).then((res) => {
          console.log(res)
          dispatch({
            type: Types.SHOW_LOADING_LAZY,
            loading: "hide"
          })
          if (res.data.code !== 401)
            dispatch({
              type: Types.FETCH_ALL_COLLABORATOR,
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
    collaboratorApi
      .updateRequestPayment(store_code, data)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide"
        })
        collaboratorApi.fetchAllRequestPayment(store_code).then((res) => {
          if (res.data.code !== 401)

            dispatch({
              type: Types.FETCH_ALL_COLLABORATOR_REQUEST_PAYMENT,
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


export const fetchAllRequestPayment = (store_code , params=null) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING_LAZY,
      loading: "show"
    })
    collaboratorApi.fetchAllRequestPayment(store_code,params).then((res) => {
      console.log(res)
      dispatch({
        type: Types.SHOW_LOADING_LAZY,
        loading: "hide"
      })
      if (res.data.code !== 401)
        dispatch({
          type: Types.FETCH_ALL_COLLABORATOR_REQUEST_PAYMENT,
          data: res.data.data,
        });
    });
  };
};

export const fetchAllCollaborator = (store_code, page = 1,params=null) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING_LAZY,
      loading: "show"
    })
    collaboratorApi.fetchAllCollaborator(store_code, page,params).then((res) => {
      console.log(res)
      dispatch({
        type: Types.SHOW_LOADING_LAZY,
        loading: "hide"
      })
      if (res.data.code !== 401)
        dispatch({
          type: Types.FETCH_ALL_COLLABORATOR,
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
    collaboratorApi.fetchAllSteps(store_code).then((res) => {
      console.log(res)
      dispatch({
        type: Types.SHOW_LOADING_LAZY,
        loading: "hide"
      })
      if (res.data.code !== 401)
        dispatch({
          type: Types.FETCH_ALL_COLLABORATOR_STEP,
          data: res.data.data,
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
    collaboratorApi
      .createStep(store_code, data)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide"
        })
        collaboratorApi.fetchAllSteps(store_code).then((res) => {
          if (res.data.code !== 401)

            dispatch({
              type: Types.FETCH_ALL_COLLABORATOR_STEP,
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

export const destroyStep = (store_code, id) => {

  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show"
    })
    collaboratorApi
      .destroyStep(store_code, id)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide"
        })
        collaboratorApi
          .fetchAllSteps(store_code)
          .then((res) => {
            if (res.data.code !== 401)

              dispatch({
                type: Types.FETCH_ALL_COLLABORATOR_STEP,
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


export const updateStep = (store_code, id, data) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show"
    })
    collaboratorApi
      .updateStep(store_code, id, data)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide"
        })
        collaboratorApi.fetchAllSteps(store_code).then((res) => {
          if (res.data.code !== 401)

            dispatch({
              type: Types.FETCH_ALL_COLLABORATOR_STEP,
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
    collaboratorApi
      .updateConfig(store_code, data)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide"
        })
        collaboratorApi.fetchCollaboratorConf(store_code).then((res) => {
          if (res.data.code !== 401)

            dispatch({
              type: Types.FETCH_ALL_COLLABORATOR_CONFIG,
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
