import callApi from "../../ultis/apiCaller";

export const fetchAllInventory = (store_code,branch_id,page,params) => {
    return params ? callApi(`/store/${store_code}/${branch_id}/inventory/tally_sheets?page=${page}${params}`, "get", null) 
      :callApi(`/store/${store_code}/${branch_id}/inventory/tally_sheets`, "get", null)
  };
  export const createInventorys = (store_code,branch_id,data) => {
    return  callApi(`/store/${store_code}/${branch_id}/inventory/tally_sheets`, "post", data)
  };