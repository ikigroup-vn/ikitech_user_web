import callApi from "../../ultis/apiCaller";

export const fetchListGameSpinWheels = (store_code, params) => {
  return callApi(
    `/store/${store_code}/spin_wheels${params ? `?${params}` : ""}`,
    "get",
    null
  );
};
export const fetchGameSpinWheelsById = (store_code, id) => {
  return callApi(`/store/${store_code}/spin_wheels/${id}`, "get", null);
};
export const addGameSpinWheels = (store_code, form) => {
  return callApi(`/store/${store_code}/spin_wheels`, "post", form);
};
export const updateGameSpinWheels = (store_code, id, form) => {
  return callApi(`/store/${store_code}/spin_wheels/${id}`, "put", form);
};
export const deleteGameSpinWheels = (store_code, id) => {
  return callApi(`/store/${store_code}/spin_wheels/${id}`, "delete", null);
};
