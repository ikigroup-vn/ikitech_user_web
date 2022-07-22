import * as Types from "../constants/ActionType";
import * as agencyApi from "../data/remote/agency";
import * as chatApi from "../data/remote/chat";
import history from "../history";
import { saveAs } from "file-saver";
import XlsxPopulate from "xlsx-populate";

function getSheetData(data, header) {
  var fields = Object.keys(data[0]);
  var sheetData = data.map(function (row) {
    return fields.map(function (fieldName) {
      return row[fieldName] ? row[fieldName] : "";
    });
  });
  sheetData.unshift(header);
  return sheetData;
}

async function saveAsExcel(value , title) {
  // var data = [
  //   { name: "John", city: "Seattle" },
  //   { name: "Mike", city: "Los Angeles" },
  //   { name: "Zach", city: "New York" }
  // ];
  // let header = ["Name", "City"];
  var data = value.data;
  var data_header = value.header;
  XlsxPopulate.fromBlankAsync().then(async (workbook) => {
    const sheet1 = workbook.sheet(0);
    const sheetData = getSheetData(data, data_header);
    console.log(sheetData);
    const totalColumns = sheetData[0].length;

    sheet1.cell("A1").value(sheetData);
    const range = sheet1.usedRange();
    const endColumn = String.fromCharCode(64 + totalColumns);
    sheet1.row(1).style("bold", true);
    sheet1.range("A1:" + endColumn + "1").style("fill", "F4D03F");
    range.style("border", true);
    return workbook.outputAsync().then((res) => {
      console.log(res);
      saveAs(res, title);
    });
  });
}
export const exportTopten = (store_code, page, params) => {
  return (dispatch) => {
    agencyApi.fetchAllTopReport(store_code, page, params).then((res) => {
      console.log(res);

      if (res.data.code !== 401)
        if (typeof res.data.data != "undefined") {
          if (typeof res.data.data.data != "undefined") {
            if (res.data.data.data.length > 0) {
              var newArray = [];

              for (const item of res.data.data.data) {
                var newItem = {};
                var arangeKeyItem = {
                  name: item.customer?.name,
                  phone_number: item.customer?.phone_number,
                  orders_count: item.orders_count,
                  sum_total_final: item.sum_total_final,
                };
                Object.entries(arangeKeyItem).forEach(([key, value], index) => {
                  if (key == "name") {
                    newItem["Tên"] = value;
                  }
                  if (key == "phone_number") {
                    newItem["Số điện thoại"] = value;
                    // newItem["Tên sản phẩm"] = value
                  }
                  if (key == "orders_count") {
                    newItem["Số đơn hàng"] = value;
                    // newItem["Tên sản phẩm"] = value
                  }
                  if (key == "sum_total_final") {
                    newItem["Tổng doanh thu"] = value;
                  }
                });

                newArray.push(newItem);
              }
              var header = [];
              if (newArray.length > 0) {
                Object.entries(newArray[0]).forEach(([key, value], index) => {
                  header.push(key);
                });
              }
              console.log(header);
              saveAsExcel({ data: newArray, header: header } , "Danh sách Top CTV");
            }
          }
        }
    });
  };
};

export const exportListAgency = (store_code, page, params) => {
  return (dispatch) => {
    agencyApi.fetchAllAgency(store_code, 1).then((res) => {
      if (res.data.code !== 401)
        if (res.data.code !== 401)
          if (typeof res.data.data != "undefined") {
            if (typeof res.data.data.data != "undefined") {
              if (res.data.data.data.length > 0) {
                var newArray = [];
                var index = 0
                for (const item of res.data.data.data) {
                  index = index + 1
                  var newItem = {};
                  var arangeKeyItem = {
                    order : index,
                    name: item.customer?.name,
                    phone_number: item.customer?.phone_number,
                    email: item.customer.email,
                    status : item.status == 1 ? "Đã kích hoạt" : "Chưa kích hoạt"
                  };
                  Object.entries(arangeKeyItem).forEach(
                    ([key, value], index) => {
                      if (key == "order") {
                        newItem["STT"] = value;
                      }
                      if (key == "name") {
                        newItem["Tên"] = value;
                      }
                      if (key == "phone_number") {
                        newItem["Số điện thoại"] = value;
                        // newItem["Tên sản phẩm"] = value
                      }
                      if (key == "email") {
                        newItem["Email"] = value;
                        // newItem["Tên sản phẩm"] = value
                      }
                      if (key == "status") {
                        newItem["Trạng thái"] = value;
                      }
                    }
                  );

                  newArray.push(newItem);
                }
                var header = [];
                if (newArray.length > 0) {
                  Object.entries(newArray[0]).forEach(([key, value], index) => {
                    header.push(key);
                  });
                }
                console.log(header);
                saveAsExcel({ data: newArray, header: header } , "Danh sách Đại lý");
              }
            }
          }
    });
  };
};
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
