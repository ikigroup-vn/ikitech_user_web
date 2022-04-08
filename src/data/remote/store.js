import callApi from "../../ultis/apiCaller";

export const fetchAllData = () => {
  return callApi("/store", "get", null);
};
export const fetchAllReportInventory = (
  store_code,
  branch_id,
  page,
  params
) => {
  return params
    ? callApi(
        `/store/${store_code}/report/stock/${branch_id}/product_last_inventory?page=${page}&${params}`,
        "get",
        null
      )
    : callApi(
        `/store/${store_code}/report/stock/${branch_id}/product_last_inventory?page=${page}`,
        "get",
        null
      );
};

export const fetchImportExportStock = (store_code, branch_id, page, params) => {
  return params
    ? callApi(
        `/store/${store_code}/report/stock/${branch_id}/product_import_export_stock?page=${page}&${params}`,
        "get",
        null
      )
    : callApi(
        `/store/${store_code}/report/stock/${branch_id}/product_import_export_stock?page=${page}`,
        "get",
        null
      );
};

export const fetchAllInventoryHistory = (
  store_code,
  branch_id,
  page,
  params
) => {
  return params
    ? callApi(
        `/store/${store_code}/report/stock/${branch_id}/inventory_histories?page=${page}&${params}`,
        "get",
        null
      )
    : callApi(
        `/store/${store_code}/report/stock/${branch_id}/inventory_histories?page=${page}`,
        "get",
        null
      );
};
export const fetchAllCustomerDebt = (store_code, branch_id, page, params) => {
  return params
    ? callApi(
        `/store/${store_code}/report/finance/${branch_id}/customer_debt?page=${page}&${params}`,
        "get",
        null
      )
    : callApi(
        `/store/${store_code}/report/finance/${branch_id}/customer_debt?page=${page}`,
        "get",
        null
      );
};
export const fetchReportProfit = (store_code, branch_id, params) => {
  return callApi(
    `/store/${store_code}/report/finance/${branch_id}/profit_and_loss?${params}`,
    "get",
    null
  );
};
export const fetchReportProfitCompare = (store_code, branch_id, params) => {
  return callApi(
    `/store/${store_code}/report/finance/${branch_id}/profit_and_loss?${params}`,
    "get",
    null
  );
};
export const fetchAllSupplierDebt = (store_code, branch_id, page, params) => {
  return callApi(
    `/store/${store_code}/report/finance/${branch_id}/supplier_debt?page=${page}&${params}`,
    "get",
    null
  );
};
export const fetchReportExpenditure = (store_code, branch_id, page, params) => {
  return callApi(
    `/store/${store_code}/report/finance/${branch_id}/revenue_expenditure?page=${page}&${params}`,
    "get",
    null
  );
};

export const fetchDataId = (id) => {
  return callApi(`/store/${id}`, "get", null);
};

export const createStore = (data) => {
  return callApi("/store", "post", data);
};

export const updateStore = (data, id) => {
  return callApi(`/store/${id}`, "put", data);
};

export const destroyStore = (id) => {
  return callApi(`/store/${id}`, "delete", id);
};

export const fetchBranchStore = (store_code) => {
  return callApi(`/store/${store_code}/branches`, "get", null);
};
export const fetchAllSupplier = (store_code, page, params) => {
  return callApi(
    `/store/${store_code}/suppliers?page=${page}&${params}`,
    "get",
    null
  );
};
export const deleteBranchStore = (store_code, id) => {
  return callApi(`/store/${store_code}/branches/${id}`, "delete", null);
};
export const deleteSupplier = (store_code, id) => {
  return callApi(`/store/${store_code}/suppliers/${id}`, "delete", null);
};
export const createBranchStore = (store_code, data) => {
  return callApi(`/store/${store_code}/branches`, "post", data);
};

export const updateBranchStore = (store_code, data, id) => {
  return callApi(`/store/${store_code}/branches/${id}`, "put", data);
};

export const createSupplier = (store_code, data) => {
  return callApi(`/store/${store_code}/suppliers`, "post", data);
};

export const editSupplier = (store_code, id, data) => {
  return callApi(`/store/${store_code}/suppliers/${id}`, "put", data);
};
