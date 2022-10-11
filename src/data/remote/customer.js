import callApi from "../../ultis/apiCaller";

export const fetchAllCustomer = (
  store_code,
  page,
  params,
  referral_phone_number = ""
) => {
  return params
    ? callApi(
        `/store/${store_code}/customers?page=${page}${params}&referral_phone_number=${referral_phone_number}`,
        "get",
        null
      )
    : callApi(
        `/store/${store_code}/customers?page=${page}&referral_phone_number=${referral_phone_number}`,
        "get",
        null
      );
};

export const fetchCustomerId = (store_code, blogId) => {
  return callApi(`/store/${store_code}/customers/${blogId}`, "get", null);
};
export const createCustomer = (store_code, data) => {
  return callApi(`/store/${store_code}/customers`, "post", data);
};
export const editCustomer = (store_code, id, data) => {
  return callApi(`/store/${store_code}/customers/${id}`, "put", data);
};
export const fetchAllPointHistory = (
  id,
  store_code,
  page,
  branch_id,
  params
) => {
  return callApi(
    `/store/${store_code}/customers/${id}/history_points?page=${page}`,
    "get",
    null
  );
};
