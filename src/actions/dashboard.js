import * as Types from "../constants/ActionType";
import history from "../history";
import * as storeApi from "../data/remote/store";
import * as typeStoreApi from "../data/remote/type_store";
import * as uploadApi from "../data/remote/upload";
import * as badgeApi from "../data/remote/badge";
import * as reportApi from "../data/remote/report";
import * as XLSX from "xlsx-js-style";
import { saveAs } from "file-saver";

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

export const fetchCarlist = (store_code, page = 1, params) => {
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
          .fetchCarlist(store_code, 1, "&limit=20")
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

export const updateCar = (store_code, data, id, $this, funcModal = null) => {
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
          .fetchCarlist(store_code, 1, "&limit=20")
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
          .fetchCarlist(store_code, 1, "&limit=20")
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

export const fetchEmployeeList = (store_code, page = 1, params = null) => {
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
          .fetchEmployeeList(store_code, 1, "&limit=20")
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
          .fetchEmployeeList(store_code, 1, "&limit=20")
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
          .fetchEmployeeList(store_code, 1, "&limit=20")
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

/// Thêm sửa xóa Danh sách nhân viên

export const fetchCustomerList = (store_code, page = 1, params = null) => {
  return (dispatch) => {
    dispatch({
      type: Types.FETCH_CUSTOMER_LIST_LOADING,
    });

    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    storeApi.fetchCustomerList(store_code, page, params).then((res) => {
      dispatch({
        type: Types.FETCH_CUSTOMER_LIST_NONE,
      });

      dispatch({
        type: Types.SHOW_LOADING,
        loading: "hide",
      });
      if (res.data.code !== 401)
        dispatch({
          type: Types.FETCH_CUSTOMER_LIST,
          data: res.data.data,
        });
    });
  };
};

export const createCustomer = (store_code, id, $this, funcModal = null) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    storeApi
      .createCustomer(store_code, id)
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
          .fetchCustomerList(store_code, 1, "&limit=20")
          .then((res) => {
            if (res.data.code !== 401)
              dispatch({
                type: Types.FETCH_CUSTOMER_LIST,
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

export const updateCustomer = (
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
      .updateCustomer(store_code, data, id)
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
          .fetchCustomerList(store_code, 1, "&limit=20")
          .then((res) => {
            if (res.data.code !== 401)
              dispatch({
                type: Types.FETCH_CUSTOMER_LIST,
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

export const deleteCustomer = (store_code, id) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    storeApi
      .deleteCustomer(store_code, id)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
        storeApi
          .fetchCustomerList(store_code, 1, "&limit=20")
          .then((res) => {
            if (res.data.code !== 401)
              dispatch({
                type: Types.FETCH_CUSTOMER_LIST,
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

/// Thêm sửa xóa Danh sách chuyến xe

export const fetchTripList = (store_code, page = 1, params = null) => {
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

export const fetchTripDetail = (store_code, id) => {
  return (dispatch) => {
    dispatch({
      type: Types.FETCH_TRIP_DETAIL_LOADING,
    });

    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    storeApi.fetchTripDetail(store_code, id).then((res) => {
      dispatch({
        type: Types.FETCH_TRIP_DETAIL_NONE,
      });

      dispatch({
        type: Types.SHOW_LOADING,
        loading: "hide",
      });
      if (res.data.code !== 401)
        dispatch({
          type: Types.FETCH_TRIP_DETAIL,
          data: res.data.data,
        });
    });
  };
};
export const fetchTripDetail2 = (store_code, id) => {
  return (dispatch) => {
    dispatch({
      type: Types.FETCH_TRIP_DETAIL_LOADING,
    });

    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    storeApi.fetchTripDetail(store_code, id).then((res) => {
      dispatch({
        type: Types.FETCH_TRIP_DETAIL_NONE,
      });

      dispatch({
        type: Types.SHOW_LOADING,
        loading: "hide",
      });
      if (res.data.code !== 401)
        dispatch({
          type: Types.FETCH_TRIP_DETAIL,
          data: res.data.data,
        });
      exportToExcel(res.data.data);
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

export const updateTrip = (store_code, data, id, $this, funcModal = null) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    storeApi
      .updateTrip(store_code, data, id)
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
export const updateTripStatus = (store_code, data) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    storeApi
      .updateTripStatus(store_code, data)
      .then((res) => {
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

export const deleteTrip = (store_code, id) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    storeApi
      .deleteTrip(store_code, id)
      .then((res) => {
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

export const exportToExcel = (data) => {
  const wb = XLSX.utils.book_new();
  const { trip, customers, shipments } = data;

  // Hàm format tiền
  const formatMoney = (value) => {
    if (!value && value !== 0) return "0";
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  function formatDateToDDMMYYYY(dateStr) {
    if (!dateStr) return "";

    const parts = dateStr.split("-");
    if (parts.length !== 3) return "";

    const year = parts[0];
    const month = parts[1].padStart(2, "0"); // đảm bảo 2 chữ số
    const day = parts[2].padStart(2, "0"); // đảm bảo 2 chữ số

    return `${day}/${month}/${year}`;
  }

  // ===== SHEET 1: KHÁCH HÀNG =====
  const infoSheet = [
    [
      "Ngày chạy",
      `${formatDateToDDMMYYYY(trip.date)} (Âm lịch: ${formatDateToDDMMYYYY(
        trip.date_lunar
      )})`,
    ],
    ["Tài xế", trip.driver_1_name, trip.driver_2_name],
    ["Phụ xe", trip.assistant_1_name, trip.assistant_2_name],
    [
      "Hành trình",
      trip.route_name == "1" ? "Nam Định đi Sài Gòn" : "Sài Gòn đi Nam Định",
    ],
    [],
    [
      "STT",
      "Tên khách",
      "Số điện thoại",
      "Điểm đón",
      "Điểm trả",
      "Số vé",
      "Số tiền",
      "Tổng tiền vé",
      "Trạng thái",
    ],
  ];

  customers.forEach((c, idx) => {
    infoSheet.push([
      idx + 1,
      c.username,
      c.phone,
      c.pickup_point,
      c.dropoff_point,
      c.total_card,
      formatMoney(c.price),
      formatMoney(c.total_price),
      mapStatus(c.status),
    ]);
  });

  const totalTicket = customers.reduce((sum, c) => sum + c.total_price, 0);
  infoSheet.push([]);
  infoSheet.push([
    "",
    "",
    "",
    "",
    "",
    "",
    "Tổng tiền vé",
    formatMoney(totalTicket),
    "",
  ]);

  const ws1 = XLSX.utils.aoa_to_sheet(infoSheet);

  // ===== Tô màu dòng tiêu đề "STT" cho sheet 1 =====
  const headerRowIndex1 = 5; // dòng thứ 6 trong JS array (0-based)
  const headerCols1 = infoSheet[headerRowIndex1].length;

  for (let col = 0; col < headerCols1; col++) {
    const cellAddress = XLSX.utils.encode_cell({ r: headerRowIndex1, c: col });
    if (!ws1[cellAddress]) continue;
    ws1[cellAddress].s = {
      fill: { fgColor: { rgb: "01FF00" } }, // màu vàng
      font: { bold: true },
      alignment: { horizontal: "center", vertical: "center" },
    };
  }
  // ========== Tô màu đỏ dòng tổng tiền vé sheet Khách hàng ==========
  const lastRowIndexInfo = infoSheet.length - 1;

  // Cột 7: "Tổng tiền vé"
  const totalLabelCellInfo = XLSX.utils.encode_cell({
    r: lastRowIndexInfo,
    c: 6,
  });
  ws1[totalLabelCellInfo].s = {
    font: { color: { rgb: "FF0000" }, bold: true },
  };

  // Cột 8: totalTicket
  const totalValueCellInfo = XLSX.utils.encode_cell({
    r: lastRowIndexInfo,
    c: 7,
  });
  ws1[totalValueCellInfo].s = {
    font: { color: { rgb: "FF0000" }, bold: true },
  };

  XLSX.utils.book_append_sheet(wb, ws1, "Danh sách khách hàng");

  // ===== SHEET 2: HÀNG GỬI =====
  const shipSheet = [
    [
      "STT",
      "Tên hàng gửi",
      "Số điện thoại",
      "Điểm gửi",
      "Điểm nhận",
      "Số lượng",
      "Đơn giá",
      "Tổng tiền cước",
      "Trạng thái",
    ],
  ];

  shipments.forEach((s, idx) => {
    shipSheet.push([
      idx + 1,
      s.name,
      s.phone || "",
      s.pickup_point,
      s.dropoff_point,
      s.quantity,
      formatMoney(s.price),
      formatMoney(s.total_price),
      mapStatus(s.status),
    ]);
  });

  const totalShip = shipments.reduce((sum, s) => sum + s.total_price, 0);
  shipSheet.push([]);
  shipSheet.push([
    "",
    "",
    "",
    "",
    "",
    "",
    "Tổng tiền hàng gửi",
    formatMoney(totalShip),
    "",
  ]);

  const ws2 = XLSX.utils.aoa_to_sheet(shipSheet);
  // ===== Tô màu dòng tiêu đề "STT" cho sheet 2 =====
  const headerRowIndex2 = 0; // dòng thứ 1 trong JS array (0-based)
  const headerCols2 = shipSheet[headerRowIndex2].length;

  for (let col = 0; col < headerCols2; col++) {
    const cellAddress = XLSX.utils.encode_cell({ r: headerRowIndex2, c: col });
    if (!ws2[cellAddress]) continue;
    ws2[cellAddress].s = {
      fill: { fgColor: { rgb: "01FF00" } },
      font: { bold: true },
      alignment: { horizontal: "center", vertical: "center" },
    };
  }
  // ========== Tô màu đỏ dòng tổng ==========
  const lastRowIndex = shipSheet.length - 1;

  // Cột 7: "Tổng tiền hàng gửi"
  const totalLabelCell = XLSX.utils.encode_cell({ r: lastRowIndex, c: 6 });
  ws2[totalLabelCell].s = {
    font: { color: { rgb: "FF0000" }, bold: true },
  };

  // Cột 8: totalShip
  const totalValueCell = XLSX.utils.encode_cell({ r: lastRowIndex, c: 7 });
  ws2[totalValueCell].s = {
    font: { color: { rgb: "FF0000" }, bold: true },
  };
  XLSX.utils.book_append_sheet(wb, ws2, "Danh sách hàng gửi");

  // ===== Xuất file =====
  const wbout = XLSX.write(wb, { type: "array", bookType: "xlsx" });
  saveAs(
    new Blob([wbout], { type: "application/octet-stream" }),
    `${trip.trip_code}.xlsx`
  );
};
export const mapStatus = (status) => {
  switch (status) {
    case "1":
      return "Chờ đón";
    case "2":
      return "Đã lên xe";
    case "3":
      return "Hủy chuyến";
    case "4":
      return "Tiền mặt";
    case "5":
      return "Chuyển khoản";
    case "P":
      return "Tiền mặt";
    case "C":
      return "Chuyển khoản";
    default:
      return "";
  }
};
