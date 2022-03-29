import callApi from "../../ultis/apiCaller";

export const fetchAllNotification = (store_code , page) => {
  return callApi(`/store/${store_code}/notifications_history?page=${page}`, "get", null);
};
export const fetchAllGeneralSetting = (store_code) => {
  return callApi(`/store/${store_code}/general_settings`, "get", null);
};
export const readAllNotification = (store_code) => {
  return callApi(`/store/${store_code}/notifications_history/read_all`, "get", null);
};
export const updateGeneralSetting = (store_code,data) => {
  return callApi(`/store/${store_code}/general_settings`, "post", data);
};