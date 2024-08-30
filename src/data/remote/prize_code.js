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
