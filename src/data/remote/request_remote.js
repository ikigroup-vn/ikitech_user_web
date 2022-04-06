import callApi from "../../ultis/apiCaller";

export const fetchAllRequestRemote = (store_code, branch_id, page) => {
  return callApi(
    `/store_v2/${store_code}/${branch_id}/await_checkin_checkouts?page=${page}`,
    "get",
    null
  );
};

export const updateStatus = (store_code, branch_id, id, data) => {
  return callApi(
    `/store_v2/${store_code}/${branch_id}/await_checkin_checkouts/${id}/change_status`,
    "post",
    data
  );
};
