import callApi from "../../ultis/apiCaller";

export const fetchAllBadge = (store_code,branch_id) => {
  if(branch_id)
  return callApi(`/store_v2/${store_code}/${branch_id}/badges`, "get", null);
  else
  return callApi(`/store/${store_code}/badges`, "get", null);

};

