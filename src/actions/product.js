import * as Types from "../constants/ActionType";
import history from "../history";
import * as productApi from "../data/remote/product";
import * as attributePApi from "../data/remote/attribute_product";
import * as uploadApi from "../data/remote/upload";
import { compressed, formatStringCharactor } from "../ultis/helpers";
import { saveAs } from "file-saver";
import XlsxPopulate from "xlsx-populate";

export const fetchAllProduct = (
  store_code,
  page = 1,
  params,
  agency_type_id
) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    productApi
      .fetchAllData(store_code, page, params, agency_type_id)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
        if (res.data.code !== 401)
          dispatch({
            type: Types.FETCH_ALL_PRODUCT,
            data: res.data.data,
          });
      });
  };
};

export const fetchAllProductV2 = (
  store_code,
  branch_id,
  page = 1,
  params,
  agency_type_id
) => {
  console.log([params])
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    productApi
      .fetchAllProductV2(store_code, branch_id, page, params, agency_type_id)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });

        if (res.data.code === 200)
          dispatch({
            type: Types.FETCH_ALL_PRODUCT,
            data: res.data.data,
          });
      });
  };
};

export const fetchAllProductEcommerce = (store_code, page = 1, data) => {
  console.log(data);
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    productApi.fetchAllProductEcommerce(store_code, page, data).then((res) => {
      dispatch({
        type: Types.SHOW_LOADING,
        loading: "hide",
      });
      if (res.data.code !== 401) {
        if (data.provider == "tiki") {
          dispatch({
            type: Types.FETCH_ALL_PRODUCT_TIKI,
            data: res.data.data,
          });
        } else if (data.provider == "shopee") {
          {
            dispatch({
              type: Types.FETCH_ALL_PRODUCT_SHOPEE,
              data: res.data.data,
            });
          }
        } else {
          {
            dispatch({
              type: Types.FETCH_ALL_PRODUCT_SENDO,
              data: res.data.data,
            });
          }
        }
      }
    });
  };
};

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

async function saveAsExcel(value) {
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
      saveAs(res, "Danh sách sản phẩm.xlsx");
    });
  });
}
export const fetchAllListProduct = (store_code, search) => {
  console.log(search);
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    productApi.fetchAllListProduct(store_code, search).then((res) => {
      dispatch({
        type: Types.SHOW_LOADING,
        loading: "hide",
      });
      if (res.data.code !== 401) {
        if (typeof res.data.data != "undefined") {
          if (typeof res.data.data.data != "undefined") {
            if (res.data.data.data.length > 0) {
              var newArray = [];

              for (const item of res.data.data.data) {
                var newItem = {};
                var arangeKeyItem = {
                  images : item.images,
                  sku : item.sku,
                  name : item.name,
                  price : item.price,
                  quantity_in_stock : item.quantity_in_stock,
                  categories : item.categories,
                  full_description : item.full_description
                }
                Object.entries(arangeKeyItem).forEach(([key, value], index) => {
                  if (key == "full_description") {
                    if (value != null && value.length < 32000) {
                      newItem["Mô tả"] = value;
                    } else {
                      newItem["Mô tả"] = "";
                    }
                  }
                  if (key == "name") {
                    newItem["Tên sản phẩm"] = formatStringCharactor(value);
                    // newItem["Tên sản phẩm"] = value
                  }
                  if (key == "sku") {
                    newItem["Mã SKU"] = value;
                    // newItem["Tên sản phẩm"] = value
                  }
                  if (key == "price") {
                    newItem["Giá bán lẻ"] = value;
                  }
                  // if (key == "quantity_in_stock") {
                  //   newItem["Tồn kho"] =
                  //     value == -1 ? "Vô hạn" : value == 0 ? "Hết hàng" : value;
                  // }
                  if (key == "categories") {
                    if (Array.isArray(value)) {
                      if (value.length > 0) {
                        var stringCategory = "";
                        for (const [index, category] of value.entries()) {
                          if (
                            category.name != null &&
                            typeof category.name != "undefined"
                          ) {
                            if (index == value.length - 1) {
                              stringCategory =
                                stringCategory +
                                formatStringCharactor(category.name);
                            } else {
                              stringCategory =
                                stringCategory +
                                formatStringCharactor(category.name) +
                                ",";
                            }
                          }
                        }
                        newItem["Danh mục"] = stringCategory;
                      }
                    }
                  }
                  if (key == "images") {
                    if (Array.isArray(value)) {
                      if (value.length > 0) {
                        var stringImg = "";
                        for (const [index, img] of value.entries()) {
                          if (
                            img.image_url != null &&
                            typeof img.image_url != "undefined"
                          ) {
                            if (index == value.length - 1) {
                              stringImg = stringImg + img.image_url;
                            } else {
                              stringImg = stringImg + img.image_url + ",";
                            }
                          }
                        }
                        newItem["Hình ảnh"] = stringImg;
                      }
                    }
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
              saveAsExcel({ data: newArray, header: header });
            }
          }
        }
      }
    });
  };
};

export const fetchAllAttributeP = (store_code) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    attributePApi.fetchAllData(store_code).then((res) => {
      if (res.data.code !== 401)
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
      dispatch({
        type: Types.FETCH_ALL_ATTRIBUTE_PRODUCT,
        data: res.data.data,
      });
    });
  };
};

export const updateAttributeP = (store_code, data) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    attributePApi
      .updateAttributeP(store_code, data)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
        attributePApi.fetchAllData(store_code).then((res) => {
          if (res.data.code !== 401)
            dispatch({
              type: Types.FETCH_ALL_ATTRIBUTE_PRODUCT,
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

export const destroyAttributeP = ($this, store_code, data) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    attributePApi

      .updateAttributeP(store_code, data)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
        attributePApi.fetchAllData(store_code).then((res) => {
          if (res.data.code !== 401)
            dispatch({
              type: Types.FETCH_ALL_ATTRIBUTE_PRODUCT,
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
          if (typeof $this.list_attribute[$this.name] !== "undefined") {
            delete $this.list_attribute[$this.name];
            $this._this.setState({ list_attribute: $this.list_attribute });
          }
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
export const uploadAvataProduct = (file) => {
  console.log(file);
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
          type: Types.UPLOAD_PRODUCT_IMG,
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

export const editStock = (store_code, branch_id, data, page = 1, params = null) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    productApi
      .editStock(store_code, branch_id, data)
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
        productApi
          .fetchAllProductV2(store_code, branch_id, page , params)
          .then((res) => {
            dispatch({
              type: Types.SHOW_LOADING,
              loading: "hide",
            });
            if (res.data.code !== 401)
              dispatch({
                type: Types.FETCH_ALL_PRODUCT,
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

export const uploadListImgProduct = function (files) {
  return async (dispatch) => {
    var images = [];
    for (let i = 0; i < files.length; i++) {
      const fd = new FormData();

      fd.append(`image`, await compressed(files[i]));
      try {
        var res = await uploadApi.upload(fd);
        console.log(res);
      } catch (error) {
        console.log(error);

        dispatch({
          type: Types.ALERT_UID_STATUS,
          alert: {
            type: "danger",
            title: "Lỗi",
            disable: "hide",
            content: error?.response?.data?.msg,
          },
        });
      }
      if (res.data.code == 400) {
        console.log(res.data);
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
        images.push(res.data.data);
        console.log(images);
      }
      if (i == files.length - 1) {
        dispatch({
          type: Types.UPLOAD_ALL_PRODUCT_IMG,
          data: images,
        });
      }
    }
  };
};

// export const uploadListImgProduct = function (
//   file,
//   ImgProduct,
//   listImgProduct
// ) {
//   return (dispatch) => {
//     dispatch({
//       type: Types.SHOW_LOADING,
//       loading: "show",
//     });
//     console.log("11111111", file);
//     uploadApi

//       .upload(file)
//       .then((res) => {
//         console.log("222222222", res.data);
//         dispatch({
//           type: Types.SHOW_LOADING,
//           loading: "hide",
//         });
//         var listImg = [...listImgProduct];
//         var item = {
//           data: res.data.data,
//           index: ImgProduct.index,
//           // key: imageId.key,
//           // keyItem: imageId.keyItem,
//         };
//         console.log(item, res.date, ImgProduct);
//         listImg[0] = item;
//         dispatch({
//           type: Types.UPLOAD_ALL_PRODUCT_IMG,
//           data: listImg,
//         });
//         dispatch({
//           type: Types.ALERT_UID_STATUS,
//           alert: {
//             type: "success",
//             title: "Thành công ",
//             disable: "show",
//             content: res.data.msg,
//           },
//         });
//       })
//       .catch(function (error) {
//         dispatch({
//           type: Types.ALERT_UID_STATUS,
//           alert: {
//             type: "danger",
//             title: "Lỗi",
//             disable: "show",
//             content: error?.response?.data?.msg,
//           },
//         });
//       });
//     // try {
//     //   var res = await uploadApi.upload(file);
//     //   console.log(res);
//     // } catch (error) {
//     //   console.log(error);

//     //   dispatch({
//     //     type: Types.ALERT_UID_STATUS,
//     //     alert: {
//     //       type: "danger",
//     //       title: "Lỗi",
//     //       disable: "hide",
//     //       content: error?.response?.data?.msg,
//     //     },
//     //   });
//     // }
//     // if (res.data.code == 400) {
//     //   console.log(res.data);
//     //   {
//     //     dispatch({
//     //       type: Types.ALERT_UID_STATUS,
//     //       alert: {
//     //         type: "danger",
//     //         title: "Lỗi",
//     //         disable: "show",
//     //         content: res.data.msg,
//     //       },
//     //     });
//     //   }
//     // } else {
//     //   images.push(res.data.data);
//     //   console.log(images);
//     // }
//     // if (i == file.length - 1) {
//     //   dispatch({
//     //     type: Types.UPLOAD_ALL_PRODUCT_IMG,
//     //     data: images,
//     //   });
//     // }
//   };
// };
export const uploadImgDistribute = (file, imageId, listImages) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    console.log("11111111", file);
    uploadApi

      .upload(file)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
        console.log("222222222222", res.data);
        var listImg = [...listImages];
        var item = {
          data: res.data.data,
          index: imageId.index,
          // key: imageId.key,
          // keyItem: imageId.keyItem,
        };
        listImg[0] = item;
        console.log(item, res.data, imageId);
        dispatch({
          type: Types.UPLOAD_ALL_DISTRIBUTE_IMG,
          data: listImg,
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

export const postProduct = (store_code, data) => {
  return (dispatch) => {
    const _value_price = data.price.toString().replace(/,/g, "");
    const _value_quantity_in_stock = data.quantity_in_stock
      .toString()
      .replace(/,/g, "");
    if (
      isNaN(Number(_value_price)) ||
      isNaN(Number(_value_quantity_in_stock))
    ) {
      dispatch({
        type: Types.ALERT_UID_STATUS,
        alert: {
          type: "danger",
          title: "Lỗi ",
          disable: "show",
          content: "Giá tiền sai định dạng hoặc bị để trống",
        },
      });
      return;
    }
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    productApi
      .createProduct(store_code, data)
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
        var content = "";
        if (typeof error.response.data.msg == "undefined")
          content = "Vui lòng chọn ảnh và nhập đầy đủ các thông tin";
        else content = error.response.data.msg;
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
            content: content,
          },
        });
      });
  };
};

export const postProductV2 = (store_code, branch_id, data) => {
  return (dispatch) => {
    const _value_price = data.price.toString().replace(/,/g, "");
    const _value_quantity_in_stock = data.quantity_in_stock
      .toString()
      .replace(/,/g, "");
    if (
      isNaN(Number(_value_price)) ||
      isNaN(Number(_value_quantity_in_stock))
    ) {
      dispatch({
        type: Types.ALERT_UID_STATUS,
        alert: {
          type: "danger",
          title: "Lỗi ",
          disable: "show",
          content: "Giá tiền sai định dạng hoặc bị để trống",
        },
      });
      return;
    }
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    productApi
      .createProductV2(store_code, branch_id, data)
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
        var content = "";
        if (typeof error.response.data.msg == "undefined")
          content = "Vui lòng chọn ảnh và nhập đầy đủ các thông tin";
        else content = error.response.data.msg;
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
            content: content,
          },
        });
      });
  };
};

export const postMultiProduct = (store_code, data) => {

  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    productApi
      .createMultiProduct(store_code, data)
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
            content: `<div>
            <span>- Tổng số lượng import: ${res.data.data.total_products_request} </span></br>
            <span>     - Tổng số bỏ qua khi trùng tên: ${res.data.data.total_skip_same_name}</span></br>
            <span>  - Tổng số thay đổi khi trùng tên: ${res.data.data.total_changed_same_name}</span></br>
            <span>   - Tổng số thất bại: ${res.data.data.total_failed}</span></br>
            <span> - Tổng số được thêm mới: ${res.data.data.total_new_add}</span>
                      </div>
            `,
          },
        });
        productApi.fetchAllData(store_code, 1, null).then((res) => {
          if (res.data.code !== 401)
            dispatch({
              type: Types.FETCH_ALL_PRODUCT,
              data: res.data.data,
            });
        });
      })
      .catch(function (error) {
        var content = "";
        if (typeof error.response.data.msg == "undefined")
          content = "Vui lòng kiểm tra lại các trường dữ liệu";
        else content = error.response.data.msg;
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
            content: content,
          },
        });
      });
  };
};

export const updateAgencyPrice = (store_code, data, productId, page) => {
  return (dispatch) => {
    const _value_price = data.main_price.toString().replace(/,/g, "");
    if (isNaN(Number(_value_price))) {
      dispatch({
        type: Types.ALERT_UID_STATUS,
        alert: {
          type: "danger",
          title: "Lỗi ",
          disable: "show",
          content: "Sai định dạng hoặc bị để trống",
        },
      });
      return;
    }
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    productApi
      .updateAgencyPrice(store_code, data, productId)
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
        // history.push(`/product/index/${store_code}/${page}`);
        history.goBack();
      })
      .catch(function (error) {
        var content = "";
        if (typeof error.response.data.msg == "undefined")
          content = "Vui lòng chọn ảnh và nhập đầy đủ các thông tin";
        else content = error.response.data.msg;
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
            content: content,
          },
        });
      });
  };
};

export const updateProduct = (store_code, data, productId, page) => {
  return (dispatch) => {
    const _value_price = data.price.toString().replace(/,/g, "");
    const _value_quantity_in_stock = data.quantity_in_stock
      .toString()
      .replace(/,/g, "");
    if (
      isNaN(Number(_value_price)) ||
      isNaN(Number(_value_quantity_in_stock))
    ) {
      dispatch({
        type: Types.ALERT_UID_STATUS,
        alert: {
          type: "danger",
          title: "Lỗi ",
          disable: "show",
          content: "Sai định dạng hoặc bị để trống",
        },
      });
      return;
    }
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    productApi
      .updateProduct(store_code, data, productId)
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
        console.log(page, store_code);
        history.push(`/product/index/${store_code}/${page}`);
        // history.goBack();
      })
      .catch(function (error) {
        var content = "";
        if (typeof error.response.data.msg == "undefined")
          content = "Vui lòng chọn ảnh và nhập đầy đủ các thông tin";
        else content = error.response.data.msg;
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
            content: content,
          },
        });
      });
  };
};

export const updateDistribute = (store_code, data, productId, branchId) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    productApi
      .updateDistribute(store_code, data, productId, branchId)
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
      })
      .catch(function (error) {});
  };
};

export const removeItemImgDis = (data) => {
  return {
    type: Types.UPLOAD_ALL_DISTRIBUTE_IMG,
    data: data,
  };
};

export const destroyProduct = (store_code, id) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    productApi
      .destroyProduct(store_code, id)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
        productApi
          .fetchAllData(store_code)
          .then((res) => {
            if (res.data.code !== 401)
              dispatch({
                type: Types.FETCH_ALL_PRODUCT,
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

export const destroyMultiProduct = (store_code, data) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    productApi
      .destroyMultiProduct(store_code, { list_id: data })
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
        productApi
          .fetchAllData(store_code)
          .then((res) => {
            if (res.data.code !== 401)
              dispatch({
                type: Types.FETCH_ALL_PRODUCT,
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

export const fetchProductAgencyPrice = (store_code, id, agency_id) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    productApi
      .fetchProductAgencyPrice(store_code, id, agency_id)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
        if (res.data.code !== 401)
          dispatch({
            type: Types.FETCH_ID_PRODUCT_AGENCY_PRICE,
            data: res.data.data,
          });
      });
  };
};

export const fetchProductId = (store_code, id) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    productApi.fetchProductId(store_code, id).then((res) => {
      dispatch({
        type: Types.SHOW_LOADING,
        loading: "hide",
      });
      if (res.data.code !== 401)
        dispatch({
          type: Types.FETCH_ID_PRODUCT,
          data: res.data.data,
        });
    });
  };
};
