import callApi from "../../ultis/apiCaller";

export const fetchOverview = (store_code,branch_id, params) => {
  return params ? callApi(`/store_v2/${store_code}/${branch_id}/report/overview${params}`, "get", null) 
  :callApi(`/store_v2/${store_code}/${branch_id}/report/overview`, "get", null)
};
export const fetchTopTenProduct = (store_code,branch_id,params) => {
  return callApi(`/store_v2/${store_code}/${branch_id}/report/top_ten_products${params}`, "get", null) 
};


