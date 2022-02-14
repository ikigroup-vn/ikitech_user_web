import callApi from "../../ultis/apiCaller";

export const fetchAllBadge = (store_code) => {
  return callApi(`/store/${store_code}/badges`, "get", null);
};


