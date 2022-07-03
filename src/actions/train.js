import * as Types from "../constants/ActionType";
import history from "../history";
import * as trainApi from "../data/remote/train";
import * as uploadApi from "../data/remote/upload";

export const fetchAllCourse = (store_code , page=1 , params) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading : "show"
    })
    trainApi.fetchAllCourse(store_code , page,params).then((res) => {
      dispatch({
        type: Types.SHOW_LOADING,
        loading : "hide"
      })
        if(res.data.code !== 401)
      dispatch({
        type: Types.FETCH_ALL_TRAIN_COURSE,
        data: res.data.data,
      });
    });
  };
};

export const fetchCourseId = (store_code , CourseId) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading : "show"
    })
    trainApi.fetchCourseId(store_code , CourseId).then((res) => {
      if(res.data.code !== 401)
      dispatch({
        type: Types.SHOW_LOADING,
        loading : "hide"
      })
      dispatch({
        type: Types.FETCH_ID_TRAIN_COURSE,
        data: res.data.data,
      });
    });
  };
};



export const createCourse = (store_code,data) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading : "show"
    })
    trainApi
      .createCourse(store_code,data)
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
            content: error?.response?.data?.msg,
          },
        });
      });
  };
};


export const destroyCourse = (store_code, id) => {
  
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading : "show"
    })
    trainApi
      .destroyCourse(store_code, id)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading : "hide"
        })
        trainApi.fetchAllCourse(store_code)
          .then((res) => {
            if(res.data.code !== 401)

            dispatch({
              type: Types.FETCH_ALL_TRAIN_COURSE,
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

export const updateCourse = (categoryBId, categoryB, store_code) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading : "show"
    })
    trainApi
      .updateCourse(categoryBId, categoryB, store_code)
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
            content: error?.response?.data?.msg,
          },
        });
      });
  };
};



///////////////////Lesson


export const fetchAllLesson = (store_code , courseId, page=1 , params) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading : "show"
    })
    trainApi.fetchAllLesson(store_code , page,params , courseId).then((res) => {
      dispatch({
        type: Types.SHOW_LOADING,
        loading : "hide"
      })
        if(res.data.code !== 401)
      dispatch({
        type: Types.FETCH_ALL_TRAIN_LESSON,
        data: res.data.data,
      });
    });
  };
};

export const fetchLessonId = (store_code , CourseId) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading : "show"
    })
    trainApi.fetchLessonId(store_code , CourseId).then((res) => {
      if(res.data.code !== 401)
      dispatch({
        type: Types.SHOW_LOADING,
        loading : "hide"
      })
      dispatch({
        type: Types.FETCH_ID_TRAIN_LESSON,
        data: res.data.data,
      });
    });
  };
};



export const createLesson = (store_code,courseId,data , _this, resetModal) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading : "show"
    })
    trainApi
      .createLesson(store_code,data)
      .then((res) => {
        if(_this && resetModal){
          resetModal();
          _this.setState({
            txtTitle: "",
      txtSumary: "",
      txtContent: "",
      link_video_youtube : "",
          })
        }
        dispatch({
          type: Types.SHOW_LOADING,
          loading : "hide"
        })
        trainApi.fetchAllLesson(store_code , 1 ,null , courseId).then((res) => {
          dispatch({
            type: Types.SHOW_LOADING,
            loading : "hide"
          })
            if(res.data.code !== 401)
          dispatch({
            type: Types.FETCH_ALL_TRAIN_LESSON,
            data: res.data.data,
          });
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




export const createChapter = (store_code,data , _this, resetModal) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading : "show"
    })
    trainApi
      .createChapter(store_code,data)
      .then((res) => {
        if(_this && resetModal){
          resetModal();
          _this.setState({
            txtTitle: "",
            txtSumary: "",
          })
        }
        dispatch({
          type: Types.SHOW_LOADING,
          loading : "hide"
        })
        trainApi.fetchAllLesson(store_code , 1 ,null , data.train_course_id).then((res) => {
          dispatch({
            type: Types.SHOW_LOADING,
            loading : "hide"
          })
            if(res.data.code !== 401)
          dispatch({
            type: Types.FETCH_ALL_TRAIN_LESSON,
            data: res.data.data,
          });
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

export const sortChapter = (store_code,data,train_course_id) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading : "show"
    })
    trainApi
      .sortChapter(store_code,data)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading : "hide"
        })
        trainApi.fetchAllLesson(store_code , 1 ,null , train_course_id).then((res) => {
          dispatch({
            type: Types.SHOW_LOADING,
            loading : "hide"
          })
            if(res.data.code !== 401)
          dispatch({
            type: Types.FETCH_ALL_TRAIN_LESSON,
            data: res.data.data,
          });
        });
        dispatch({
          type: Types.ALERT_UID_STATUS,
          alert: {
            type: "success",
            title: "Sắp xếp thành công ",
            disable: "show",
            content: "Sắp xếp thành công",
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


export const sortLesson = (store_code,data,train_course_id) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading : "show"
    })
    trainApi
      .sortLesson(store_code,data)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading : "hide"
        })
        trainApi.fetchAllLesson(store_code , 1 ,null , train_course_id).then((res) => {
          dispatch({
            type: Types.SHOW_LOADING,
            loading : "hide"
          })
            if(res.data.code !== 401)
          dispatch({
            type: Types.FETCH_ALL_TRAIN_LESSON,
            data: res.data.data,
          });
        });
        dispatch({
          type: Types.ALERT_UID_STATUS,
          alert: {
            type: "success",
            title: "Sắp xếp thành công ",
            disable: "show",
            content: "Sắp xếp thành công",
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

export const destroyLesson = (store_code, id  ,  train_course_id) => {
  
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading : "show"
    })
    trainApi
      .destroyLesson(store_code, id)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading : "hide"
        })

        trainApi.fetchAllLesson(store_code , 1 ,null , train_course_id).then((res) => {
          dispatch({
            type: Types.SHOW_LOADING,
            loading : "hide"
          })
            if(res.data.code !== 401)
          dispatch({
            type: Types.FETCH_ALL_TRAIN_LESSON,
            data: res.data.data,
          });
          
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
            content: error?.response?.data?.msg,
          },
        });
      });
  };
};


export const destroyChapter = (store_code, id , train_course_id) => {
  
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading : "show"
    })
    trainApi
      .destroyChapter(store_code, id)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading : "hide"
        })

        trainApi.fetchAllLesson(store_code , 1 ,null , train_course_id).then((res) => {
          dispatch({
            type: Types.SHOW_LOADING,
            loading : "hide"
          })
            if(res.data.code !== 401)
          dispatch({
            type: Types.FETCH_ALL_TRAIN_LESSON,
            data: res.data.data,
          });
          
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
            content: error?.response?.data?.msg,
          },
        });
      });
  };
};

export const updateLesson = (categoryBId, categoryB, store_code,train_course_id, _this,resetModal) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading : "show"
    })
    trainApi
      .updateLesson(categoryBId, categoryB, store_code)
      .then((res) => {
        if(resetModal){
          resetModal();
      
        }
        dispatch({
          type: Types.SHOW_LOADING,
          loading : "hide"
        })
        trainApi.fetchAllLesson(store_code , 1 ,null , train_course_id).then((res) => {
      
          if(res.data.code !== 401)
        dispatch({
          type: Types.FETCH_ALL_TRAIN_LESSON,
          data: res.data.data,
        });
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
            content: error?.response?.data?.msg,
          },
        });
      });
  };
};


export const updateChapter = (id, data, store_code,_this,resetModal) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading : "show"
    })
    trainApi
      .updateChapter(id, data, store_code)
      .then((res) => {
          if(resetModal){
            resetModal();
        
          }
        dispatch({
          type: Types.SHOW_LOADING,
          loading : "hide"
        })
        trainApi.fetchAllLesson(store_code , 1 ,null , data.train_course_id).then((res) => {
      
            if(res.data.code !== 401)
          dispatch({
            type: Types.FETCH_ALL_TRAIN_LESSON,
            data: res.data.data,
          });
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
            content: error?.response?.data?.msg,
          },
        });
      });
  };
};

