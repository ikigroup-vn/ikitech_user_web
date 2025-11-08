import * as Types from "../constants/ActionType";
import history from "../history";
import * as storeApi from "../data/remote/store";
import * as typeStoreApi from "../data/remote/type_store";
import * as uploadApi from "../data/remote/upload";
import * as badgeApi from "../data/remote/badge";
import * as reportApi from "../data/remote/report";

export const fetchAllStore = () => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    storeApi.fetchAllData().then((res) => {
      dispatch({
        type: Types.SHOW_LOADING,
        loading: "hide",
      });
      if (res.data.code !== 401)
        dispatch({
          type: Types.FETCH_ALL_STORE,
          data: res.data.data,
        });
    });
  };
};
export const fetchBranchStore = (store_code) => {
  return (dispatch) => {
    dispatch({
      type: Types.FETCH_BRANCH_STORE_LOADING,
    });

    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    storeApi.fetchBranchStore(store_code).then((res) => {
      dispatch({
        type: Types.FETCH_BRANCH_STORE_NONE,
      });

      dispatch({
        type: Types.SHOW_LOADING,
        loading: "hide",
      });
      if (res.data.code !== 401)
        dispatch({
          type: Types.FETCH_BRANCH_STORE,
          data: res.data.data,
        });
    });
  };
};

/// Thêm sửa xóa Danh sách xe

export const fetchCarlist = (
  store_code,
  page = 1,
  params
) => {
  return (dispatch) => {
    dispatch({
      type: Types.FETCH_CAR_LIST_LOADING,
    });

    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    storeApi.fetchCarlist(store_code, page, params).then((res) => {
      dispatch({
        type: Types.FETCH_CAR_LIST_NONE,
      });

      dispatch({
        type: Types.SHOW_LOADING,
        loading: "hide",
      });
      if (res.data.code !== 401)
        dispatch({
          type: Types.FETCH_CAR_LIST,
          data: res.data.data,
        });
    });
  };
};

export const createCar = (store_code, id, $this, funcModal = null) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    storeApi
      .createCar(store_code, id)
      .then((res) => {
        if (res.data.success && funcModal != null) {
          console.log("da vao r");
          funcModal();
        }
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
        storeApi
          .fetchCarlist(store_code)
          .then((res) => {
            if (res.data.code !== 401)
              dispatch({
                type: Types.FETCH_CAR_LIST,
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
      })
      .catch(function (error) {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });

        if (
          $this &&
          error.response &&
          error.response.data.msg_code == "DUPLICATE_NUMBER"
        ) {
          $this.setState({
            error_name: { text: error.response.data.msg, status: true },
          });
        } else {
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
      });
  };
};

export const updateCar = (
  store_code,
  data,
  id,
  $this,
  funcModal = null
) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    storeApi
      .updateCar(store_code, data, id)
      .then((res) => {
        if (res.data.success && funcModal != null) {
          console.log("da vao r");
          funcModal();
        }
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
        storeApi
          .fetchCarlist(store_code)
          .then((res) => {
            if (res.data.code !== 401)
              dispatch({
                type: Types.FETCH_CAR_LIST,
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
      })
      .catch(function (error) {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
        if (
          $this &&
          error.response &&
          error.response.data.msg_code == "DUPLICATE_NUMBER"
        ) {
          $this.setState({
            error_name: { text: error.response.data.msg, status: true },
          });
        } else {
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
      });
  };
};

export const deleteCar = (store_code, id) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    storeApi
      .deleteCar(store_code, id)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
        storeApi
          .fetchCarlist(store_code)
          .then((res) => {
            if (res.data.code !== 401)
              dispatch({
                type: Types.FETCH_CAR_LIST,
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
      })
      .catch(function (error) {
        dispatch({
          type: Types.SHOW_LOADING,
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

////



/// Thêm sửa xóa Danh sách nhân viên

export const fetchEmployeeList = (
  store_code,
  page = 1,
  params = null
) => {
  return (dispatch) => {
    dispatch({
      type: Types.FETCH_EMPLOYEE_LIST_LOADING,
    });

    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    storeApi.fetchEmployeeList(store_code, page, params).then((res) => {
      dispatch({
        type: Types.FETCH_EMPLOYEE_LIST_NONE,
      });

      dispatch({
        type: Types.SHOW_LOADING,
        loading: "hide",
      });
      if (res.data.code !== 401)
        dispatch({
          type: Types.FETCH_EMPLOYEE_LIST,
          data: res.data.data,
        });
    });
  };
};

export const createEmployee = (store_code, id, $this, funcModal = null) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    storeApi
      .createEmployee(store_code, id)
      .then((res) => {
        if (res.data.success && funcModal != null) {
          console.log("da vao r");
          funcModal();
        }
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
        storeApi
          .fetchEmployeeList(store_code)
          .then((res) => {
            if (res.data.code !== 401)
              dispatch({
                type: Types.FETCH_EMPLOYEE_LIST,
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
      })
      .catch(function (error) {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });

        if (
          $this &&
          error.response &&
          error.response.data.msg_code == "DUPLICATE_PHONE"
        ) {
          $this.setState({
            error_name: { text: error.response.data.msg, status: true },
          });
        } else {
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
      });
  };
};

export const updateEmployee = (
  store_code,
  data,
  id,
  $this,
  funcModal = null
) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    storeApi
      .updateEmployee(store_code, data, id)
      .then((res) => {
        if (res.data.success && funcModal != null) {
          console.log("da vao r");
          funcModal();
        }
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
        storeApi
          .fetchEmployeeList(store_code)
          .then((res) => {
            if (res.data.code !== 401)
              dispatch({
                type: Types.FETCH_EMPLOYEE_LIST,
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
      })
      .catch(function (error) {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
        if (
          $this &&
          error.response &&
          error.response.data.msg_code == "DUPLICATE_PHONE"
        ) {
          $this.setState({
            error_name: { text: error.response.data.msg, status: true },
          });
        } else {
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
      });
  };
};

export const deleteEmployee = (store_code, id) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    storeApi
      .deleteEmployee(store_code, id)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
        storeApi
          .fetchEmployeeList(store_code)
          .then((res) => {
            if (res.data.code !== 401)
              dispatch({
                type: Types.FETCH_EMPLOYEE_LIST,
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
      })
      .catch(function (error) {
        dispatch({
          type: Types.SHOW_LOADING,
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

////

/// Thêm sửa xóa Danh sách chuyến đi

export const fetchTripList = (
  store_code,
  page = 1,
  params = null
) => {
  return (dispatch) => {
    dispatch({
      type: Types.FETCH_TRIP_LIST_LOADING,
    });

    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    storeApi.fetchTripList(store_code, page, params).then((res) => {
      dispatch({
        type: Types.FETCH_TRIP_LIST_NONE,
      });

      dispatch({
        type: Types.SHOW_LOADING,
        loading: "hide",
      });
      if (res.data.code !== 401)
        dispatch({
          type: Types.FETCH_TRIP_LIST,
          data: res.data.data,
        });
    });
  };
};

export const createTrip = (store_code, id, $this, funcModal = null) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    storeApi
      .createTrip(store_code, id)
      .then((res) => {
        if (res.data.success && funcModal != null) {
          console.log("da vao r");
          funcModal();
        }
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
        storeApi
          .fetchTripList(store_code)
          .then((res) => {
            if (res.data.code !== 401)
              dispatch({
                type: Types.FETCH_TRIP_LIST,
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
      })
      .catch(function (error) {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });

        if (
          $this &&
          error.response &&
          error.response.data.msg_code == "DUPLICATE_PHONE"
        ) {
          $this.setState({
            error_name: { text: error.response.data.msg, status: true },
          });
        } else {
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
      });
  };
};
///
export const fetchAllSupplier = (store_code, page, params) => {
  console.log("store_code", store_code);
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    storeApi.fetchAllSupplier(store_code, page, params).then((res) => {
      dispatch({
        type: Types.SHOW_LOADING,
        loading: "hide",
      });
      if (res.data.code !== 401)
        dispatch({
          type: Types.FETCH_ALL_SUPPLIER,
          data: res.data.data,
        });
    });
  };
};

export const deleteBranchStore = (store_code, id) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    storeApi
      .deleteBranchStore(store_code, id)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
        storeApi
          .fetchBranchStore(store_code)
          .then((res) => {
            if (res.data.code !== 401)
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
      })
      .catch(function (error) {
        dispatch({
          type: Types.SHOW_LOADING,
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
export const deleteSupplier = (store_code, id, page, params) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    storeApi
      .deleteSupplier(store_code, id)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
        storeApi
          .fetchAllSupplier(store_code, page, params)
          .then((res) => {
            if (res.data.code !== 401)
              dispatch({
                type: Types.FETCH_ALL_SUPPLIER,
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
      })
      .catch(function (error) {
        dispatch({
          type: Types.SHOW_LOADING,
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
export const updateBranchStore = (
  store_code,
  data,
  id,
  $this,
  funcModal = null
) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    storeApi
      .updateBranchStore(store_code, data, id)
      .then((res) => {
        if (res.data.success && funcModal != null) {
          console.log("da vao r");
          funcModal();
        }
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
        storeApi
          .fetchBranchStore(store_code)
          .then((res) => {
            if (res.data.code !== 401)
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
      })
      .catch(function (error) {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
        if (
          $this &&
          error.response &&
          error.response.data.msg_code == "NAME_ALREADY_EXISTS"
        ) {
          $this.setState({
            error_name: { text: error.response.data.msg, status: true },
          });
        } else {
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
      });
  };
};
export const createBranchStore = (store_code, id, $this, funcModal = null) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    storeApi
      .createBranchStore(store_code, id)
      .then((res) => {
        if (res.data.success && funcModal != null) {
          console.log("da vao r");
          funcModal();
        }
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
        storeApi
          .fetchBranchStore(store_code)
          .then((res) => {
            if (res.data.code !== 401)
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
      })
      .catch(function (error) {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });

        if (
          $this &&
          error.response &&
          error.response.data.msg_code == "NAME_ALREADY_EXISTS"
        ) {
          $this.setState({
            error_name: { text: error.response.data.msg, status: true },
          });
        } else {
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
      });
  };
};

export const createSupplier = (store_code, id, funcModal = null) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    storeApi
      .createSupplier(store_code, id)
      .then((res) => {
        if (res.data.success && funcModal != null) {
          console.log("da vao r");
          funcModal();
        }
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
        storeApi
          .fetchAllSupplier(store_code)
          .then((res) => {
            if (res.data.code !== 401)
              dispatch({
                type: Types.FETCH_ALL_SUPPLIER,
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
      })
      .catch(function (error) {
        dispatch({
          type: Types.SHOW_LOADING,
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

export const fetchSupplierId = (store_code, supplierId) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    storeApi.fetchSupplierId(store_code, supplierId).then((res) => {
      dispatch({
        type: Types.SHOW_LOADING,
        loading: "hide",
      });
      if (res.data.code !== 401)
        dispatch({
          type: Types.FETCH_ID_SUPPLIER,
          data: res.data.data,
        });
    });
  };
};

export const editSupplier = (store_code, id, data, funcModal) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    storeApi
      .editSupplier(store_code, id, data)
      .then((res) => {
        if (res.data.success && funcModal != null) {
          console.log("da vao r");
          funcModal();
        }
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
        storeApi
          .fetchAllSupplier(store_code)
          .then((res) => {
            if (res.data.code !== 401)
              dispatch({
                type: Types.FETCH_ALL_SUPPLIER,
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
      })
      .catch(function (error) {
        dispatch({
          type: Types.SHOW_LOADING,
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

export const fetchTopTenProduct = (store_code, branch_id, params) => {
  console.log("branch_id", branch_id);
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    reportApi.fetchTopTenProduct(store_code, branch_id, params).then((res) => {
      dispatch({
        type: Types.SHOW_LOADING,
        loading: "hide",
      });
      if (res.data.code !== 401)
        dispatch({
          type: Types.FETCH_TOPTEN_REPORT,
          data: res.data.data,
        });
    });
  };
};

export const fetchOverview = (store_code, branch_id, params) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    reportApi.fetchOverview(store_code, branch_id, params).then((res) => {
      dispatch({
        type: Types.SHOW_LOADING,
        loading: "hide",
      });
      if (res.data.code !== 401)
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
      loading: "show",
    });
    storeApi.fetchDataId(id).then((res) => {
      dispatch({
        type: Types.SHOW_LOADING,
        loading: "hide",
      });
      if (res.data.code !== 401)
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
      loading: "show",
    });
    storeApi
      .createStore(data)
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
        history.goBack();
      })
      .catch(function (error) {
        dispatch({
          type: Types.SHOW_LOADING,
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

export const updateStore = (data, id, funcModal) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    storeApi
      .updateStore(data, id)
      .then((res) => {
        console.log(res);
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
        history.goBack();
      })
      .catch(function (error) {
        dispatch({
          type: Types.SHOW_LOADING,
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
export const fetchAllTypeStore = () => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    typeStoreApi.fetchAllData().then((res) => {
      dispatch({
        type: Types.SHOW_LOADING,
        loading: "hide",
      });
      if (res.data.code !== 401)
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
      loading: "show",
    });
    storeApi
      .destroyStore(id)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
        storeApi
          .fetchAllData()
          .then((res) => {
            if (res.data.code !== 401)
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
      })
      .catch(function (error) {
        dispatch({
          type: Types.SHOW_LOADING,
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

export const uploadImgStore = (file) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    uploadApi
      .upload(file)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
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

export const fetchAllBadge = (store_code, branch_id) => {
  if (branch_id == null) return;
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    badgeApi.fetchAllBadge(store_code, branch_id).then((res) => {
      dispatch({
        type: Types.SHOW_LOADING,
        loading: "hide",
      });
      if (res.data.code !== 401)
        dispatch({
          type: Types.FETCH_ALL_BADGE,
          data: res.data.data,
        });
    });
  };
};
