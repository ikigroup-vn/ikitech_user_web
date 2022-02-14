import callApi from "../../ultis/apiCaller";

export const fetchOverview = (store_code , params) => {
  return params ? callApi(`/store/${store_code}/report/overview${params}`, "get", null) 
  :callApi(`/store/${store_code}/report/overview`, "get", null)
};
export const fetchTopTenProduct = (store_code,params) => {
  return params ? callApi(`/store/${store_code}/report/top_ten_products${params}`, "get", null) 
  :callApi(`/store/${store_code}/report/top_ten_products`, "get", null)
};


