import callApi from "../../ultis/apiCaller";

export const fetchListConnectEcommerce = (store_code, params) => {
  return callApi(
    `/store/${store_code}/ecommerce/connect/list${params ? `?${params}` : ""}`,
    "get",
    null
  );
};

export const connectEcommerce = (platform, store_code) => {
  return callApi(
    `/store/ecommerce/connect/${platform}?store_code=${store_code}`,
    "get",
    null
  );
};
