import * as Type from "../constants/ActionType";
import * as importStock from "../data/remote/import_stock";
import history from "../history";
import { getBranchId } from "../ultis/branchUtils";
import { callUrl } from "../ultis/helpers";
import { saveAs } from "file-saver";
import XlsxPopulate from "xlsx-populate";
export const fetchAllImportStock = (store_code, branch_id, page, params) => {
  return (dispatch) => {
    dispatch({
      type: Type.SHOW_LOADING,
      loading: "show",
    });
    console.log("page", page);
    importStock
      .fetchAllImportStock(store_code, branch_id, page, params)
      .then((res) => {
        dispatch({
          type: Type.SHOW_LOADING,
          loading: "hide",
        });
        if (res.data.code !== 401) {
          dispatch({
            type: Type.FETCH_ALL_IMPORT_STOCK,
            data: res.data.data,
          });
        }
      });
  };
};

export const ExportAllImportStock = (store_code, branch_id, page, params) => {
  return (dispatch) => {
    dispatch({
      type: Type.SHOW_LOADING,
      loading: "show",
    });
    console.log("page", page);
    importStock
      .fetchAllImportStock(store_code, branch_id, page, params)
      .then((res) => {
        dispatch({
          type: Type.SHOW_LOADING,
          loading: "hide",
        });
        if (res.data.code !== 401) {
          dispatch({
            type: Type.FETCH_ALL_IMPORT_STOCK,
            data: res.data.data,
          });
          exportExcel(res.data.data.data);
        }
      });
  };
};

function exportExcel(data) {
  XlsxPopulate.fromBlankAsync().then((workbook) => {
    const sheet = workbook.sheet(0);

    // Tiêu đề các cột
    const headers = [
      "STT",
      "Mã phiếu",
      "Tổng tiền",
      "Tổng thanh toán",
      "Nhà cung cấp",
      "Trạng thái",
      "Thời gian đặt hàng",
    ];
    headers.forEach((header, index) => {
      sheet.cell(1, index + 1).value(header);
    });

    // Dữ liệu các hàng
    data.forEach((item, index) => {
      const statusText =
        item.status === 0
          ? "Đặt hàng"
          : item.status === 1
          ? "Duyệt"
          : item.status === 2
          ? "Nhập kho"
          : item.status === 3
          ? "Hoàn thành"
          : item.status === 4
          ? "Đã hủy"
          : item.status === 5
          ? "Kết thúc"
          : item.status === 6
          ? "Trả hàng"
          : item.status === 7
          ? "Đã hoàn hết"
          : "";

      const row = index + 2;
      sheet.cell(row, 1).value(index + 1); // STT
      sheet.cell(row, 2).value(item.code); // Mã phiếu
      sheet.cell(row, 3).value(item.total_final); // Tổng tiền
      sheet.cell(row, 4).value(item.total_payment); // Tổng thanh toán
      sheet.cell(row, 5).value(item.supplier?.name || ""); // Nhà cung cấp
      sheet.cell(row, 6).value(statusText); // Trạng thái
      sheet.cell(row, 7).value(item.created_at); // Thời gian đặt hàng
    });

    // Tải xuống file
    workbook
      .outputAsync()
      .then((blob) => {
        saveAs(blob, "DANH SACH PHIEU NHAP.xlsx");
      })
      .catch((err) => {
        console.error("Lỗi khi xuất Excel:", err);
      });
  });
}

export const fetchDetailImportStock = (store_code, branch_id, id) => {
  return (dispatch) => {
    dispatch({
      type: Type.SHOW_LOADING,
      loading: "show",
    });
    importStock
      .fetchDetailImportStock(store_code, branch_id, id)
      .then((res) => {
        dispatch({
          type: Type.SHOW_LOADING,
          loading: "hide",
        });
        if (res.data.code !== 401) {
          dispatch({
            type: Type.FETCH_DETAIL_IMPORT_STOCK,
            data: res.data.data,
          });
        }
      });
  };
};
export const createImportStocks = (store_code, branch_id, id) => {
  return (dispatch) => {
    dispatch({
      type: Type.SHOW_LOADING,
      loading: "show",
    });
    importStock
      .createImportStocks(store_code, branch_id, id)
      .then((res) => {
        dispatch({
          type: Type.SHOW_LOADING,
          loading: "hide",
        });
        dispatch({
          type: Type.ALERT_UID_STATUS,
          alert: {
            type: "success",
            title: "Thành công ",
            disable: "show",
            content: res.data.msg,
          },
        });
        history.replace(`/import_stocks/index/${store_code}`);
      })
      .catch(function (error) {
        dispatch({
          type: Type.SHOW_LOADING,
          loading: "hide",
        });
        dispatch({
          type: Type.ALERT_UID_STATUS,
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

export const updateImportStock = (store_code, branch_id, id, data) => {
  return (dispatch) => {
    dispatch({
      type: Type.SHOW_LOADING,
      loading: "show",
    });
    importStock
      .updateImportStock(store_code, branch_id, id, data)
      .then((res) => {
        dispatch({
          type: Type.SHOW_LOADING,
          loading: "hide",
        });
        dispatch({
          type: Type.ALERT_UID_STATUS,
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
          type: Type.SHOW_LOADING,
          loading: "hide",
        });
        dispatch({
          type: Type.ALERT_UID_STATUS,
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

export const chooseMethorPayment = (store_code, branch_id, id, data) => {
  return (dispatch) => {
    dispatch({
      type: Type.SHOW_LOADING,
      loading: "show",
    });
    importStock
      .chooseMethorPayment(store_code, branch_id, id, data)
      .then((res) => {
        dispatch({
          type: Type.SHOW_LOADING,
          loading: "hide",
        });
        importStock
          .fetchDetailImportStock(store_code, branch_id, id)
          .then((res) => {
            dispatch({
              type: Type.SHOW_LOADING,
              loading: "hide",
            });
            if (res.data.code !== 401) {
              dispatch({
                type: Type.FETCH_DETAIL_IMPORT_STOCK,
                data: res.data.data,
              });
            }
          });
        dispatch({
          type: Type.ALERT_UID_STATUS,
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
          type: Type.SHOW_LOADING,
          loading: "hide",
        });
        dispatch({
          type: Type.ALERT_UID_STATUS,
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
export const changeStatus = (store_code, branch_id, id, data, onSuccess) => {
  return (dispatch) => {
    dispatch({
      type: Type.SHOW_LOADING,
      loading: "show",
    });
    importStock.changeStatus(store_code, branch_id, id, data).then((res) => {
      dispatch({
        type: Type.SHOW_LOADING,
        loading: "hide",
      });
      if (onSuccess) onSuccess();
      importStock
        .fetchDetailImportStock(store_code, branch_id, id)
        .then((res) => {
          if (res.data.code !== 401)
            dispatch({
              type: Type.FETCH_DETAIL_IMPORT_STOCK,
              data: res.data.data,
            });
          dispatch({
            type: Type.ALERT_UID_STATUS,
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
            type: Type.ALERT_UID_STATUS,
            alert: {
              type: "danger",
              title: "Lỗi",
              disable: "show",
              content: error?.response?.data?.msg,
            },
          });
        });
    });
  };
};

export const postRefund = (
  id,
  data,
  store_code,
  branch = getBranchId(),
  onSuccess = () => {}
) => {
  return (dispatch) => {
    dispatch({
      type: Type.SHOW_LOADING,
      loading: "show",
    });
    importStock
      .postRefund(id, data, store_code, branch)
      .then((res) => {
        if (onSuccess) onSuccess();
        dispatch({
          type: Type.SHOW_LOADING,
          loading: "hide",
        });
        dispatch({
          type: Type.ALERT_UID_STATUS,
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
          type: Type.SHOW_LOADING,
          loading: "hide",
        });
        dispatch({
          type: Type.ALERT_UID_STATUS,
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

export const printImportStock = (store_code, branch_id, id) => {
  return (dispatch) => {
    dispatch({
      type: Type.SHOW_LOADING,
      loading: "show",
    });
    importStock
      .printImportStock(store_code, branch_id, id)
      .then((res) => {
        dispatch({
          type: Type.SHOW_LOADING,
          loading: "hide",
        });
        const link = document.createElement("a");
        link.href = `${callUrl()}/store/${store_code}/${localStorage.getItem(
          "branch_id"
        )}/inventory/import_stocks/${id}/print`;
        link.click();
      })
      .catch(function (error) {
        dispatch({
          type: Type.SHOW_LOADING,
          loading: "hide",
        });
        dispatch({
          type: Type.ALERT_UID_STATUS,
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
