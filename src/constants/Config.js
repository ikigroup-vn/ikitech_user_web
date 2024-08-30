import * as helpers from "../ultis/helpers";

export const API_URL_DEV = "https://main-hqgano.ikitech.vn/api";
export const API_URL_MAIN = "https://main-hqgano.ikitech.vn/api";
export const API_URL_SOCKET_DEV = "https://main-hqgano.ikitech.vn:6441/";
export const API_URL_SOCKET_MAIN = "https://main-hqgano.ikitech.vn:6441/";
export const getApiImageStore = (store_code) => {
  return `${helpers.callUrl()}/store/${store_code}/images`;
};
