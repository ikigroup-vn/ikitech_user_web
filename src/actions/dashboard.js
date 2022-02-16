import * as Types from "../constants/ActionType";
import history from "../history";
import * as storeApi from "../data/remote/store";
import * as typeStoreApi from "../data/remote/type_store";
import * as uploadApi from "../data/remote/upload"
import * as badgeApi from "../data/remote/badge"
import * as reportApi from "../data/remote/report"


export const fetchAllStore = () => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading : "show"
    })
    storeApi.fetchAllData().then((res) => {
      dispatch({
        type: Types.SHOW_LOADING,
        loading : "hide"
      })
      if(res.data.code !== 401)
      dispatch({
        type: Types.FETCH_ALL_STORE,
        data: res.data.data,
      });
    });
  };
};
export const fetchBranchStore = (store_code) => {
  console.log("store_code",store_code)
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading : "show"
    })
    storeApi.fetchBranchStore(store_code).then((res) => {
      dispatch({
        type: Types.SHOW_LOADING,
        loading : "hide"
      })
      if(res.data.code !== 401)
      dispatch({
        type: Types.FETCH_BRANCH_STORE,
        data: res.data.data,
      });
    });
  };
};

export const deleteBranchStore = (store_code,id) => {

  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading : "show"
    })
    storeApi
      .deleteBranchStore(store_code,id)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading : "hide"
        })
        storeApi
          .fetchBranchStore(store_code)
          .then((res) => {
            if(res.data.code !== 401)

            dispatch({
              type: Types.FETCH_BRANCH_STORE,
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
export const createBranchStore = (store_code,id) => {

  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading : "show"
    })
    storeApi
      .createBranchStore(store_code,id)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading : "hide"
        })
        storeApi
          .fetchBranchStore(store_code)
          .then((res) => {
            if(res.data.code !== 401)

            dispatch({
              type: Types.FETCH_BRANCH_STORE,
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


export const fetchTopTenProduct = (store_code , params = null) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading : "show"
    })
    reportApi.fetchTopTenProduct(store_code , params).then((res) => {
      dispatch({
        type: Types.SHOW_LOADING,
        loading : "hide"
      })
      if(res.data.code !== 401)
      dispatch({
        type: Types.FETCH_TOPTEN_REPORT,
        data: res.data.data,
      });
    });
  };
};

export const fetchOverview = (store_code , params = null) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading : "show"
    })
    reportApi.fetchOverview(store_code , params).then((res) => {
      dispatch({
        type: Types.SHOW_LOADING,
        loading : "hide"
      })
      if(res.data.code !== 401)
      dispatch({
        type: Types.FETCH_OVERVIEW_REPORT,
        data: res.data.data,
      });
    });
  };
};



export const fetchDataId = (id) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading : "show"
    })
    storeApi.fetchDataId(id).then((res) => {
      dispatch({
        type: Types.SHOW_LOADING,
        loading : "hide"
      })
      if(res.data.code !== 401)
      dispatch({
        type: Types.FETCH_ID_STORE,
        data: res.data.data,
      });
    });
  };
};
export const createStore = (data) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading : "show"
    })
    storeApi
      .createStore(data)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading : "hide"
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
            content: error.response.data.msg,
          },
        });
      });
  };
};

export const updateStore = (data, id) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading : "show"
    })
    storeApi
      .updateStore(data, id)
      .then((res) => {
        console.log(res)
        dispatch({
          type: Types.SHOW_LOADING,
          loading : "hide"
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
          loading : "hide"
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
export const fetchAllTypeStore = () => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading : "show"
    })
    typeStoreApi.fetchAllData().then((res) => {
      dispatch({
        type: Types.SHOW_LOADING,
        loading : "hide"
      })
      if(res.data.code !== 401)
      dispatch({
        type: Types.FETCH_ALL_TYPESTORE,
        data: res.data.data,
      });
    });
  };
};
export const destroyStore = (id) => {

  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading : "show"
    })
    storeApi
      .destroyStore(id)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading : "hide"
        })
        storeApi
          .fetchAllData()
          .then((res) => {
            if(res.data.code !== 401)

            dispatch({
              type: Types.FETCH_ALL_STORE,
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

export const uploadImgStore = (file) => {

  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading : "show"
    })
    uploadApi
      .upload(file)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading : "hide"
        })
        dispatch({
          type: Types.UPLOAD_STORE_IMG,
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
  };
};

export const fetchAllBadge = (store_code) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading : "show"
    })
    badgeApi.fetchAllBadge(store_code).then((res) => {
      dispatch({
        type: Types.SHOW_LOADING,
        loading : "hide"
      })
      if(res.data.code !== 401)
      dispatch({
        type: Types.FETCH_ALL_BADGE,
        data: res.data.data,
      });
    });
  };
};
