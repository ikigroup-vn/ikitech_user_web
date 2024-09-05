import callApi from "../../ultis/apiCaller";

export const fetchAllPrizeCode = (store_code, params = "") => {
  return callApi(`/store/${store_code}/prize_codes${params}`, "get", null);
};

export const fetchOnePrizeCode = (store_code, id) => {
  return callApi(`/store/${store_code}/prize_codes/${id}`, "get", null);
};

export const createPrizeCode = (store_code, data) => {
  return callApi(`/store/${store_code}/prize_codes`, "post", data);
};

export const updatePrizeCode = (store_code, data, id) => {
  return callApi(`/store/${store_code}/prize_codes/${id}`, "put", data);
};

export const deletePrizeCode = (store_code, id) => {
  return callApi(`/store/${store_code}/prize_codes/${id}`, "delete", null);
};

export const updateMultiProductPrizeCode = (store_code, data) => {
  return callApi(`/store/${store_code}/prize_codes/multi`, "put", data);
};

export const deleteMultiProductPrizeCode = (store_code, data) => {
  return callApi(`/store/${store_code}/prize_codes/multi`, "delete", data);
};

export const updateBackgroundPrizeCode = (store_code, data) => {
  return callApi(
    `/store/${store_code}/prize_codes/update_background`,
    "put",
    data
  );
};

export const getConfig = (store_code) => {
  return callApi(`/store/${store_code}/prize_codes/config`, "get");
};
