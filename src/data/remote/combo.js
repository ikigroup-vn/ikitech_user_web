import callApi from "../../ultis/apiCaller";

export const fetchAllCombo = (store_code) => {
  return callApi(`/store/${store_code}/combos`, "get", null);
};

export const fetchAllComboEnd = (store_code, page) => {
  return callApi(`/store/${store_code}/combos_end?page=${page}`, "get", null);
};

export const fetchComboId = (store_code, id) => {
  return callApi(`/store/${store_code}/combos/${id}`, "get", null);
};

export const createCombo = (store_code, data) => {
  return callApi(`/store/${store_code}/combos_v2`, "post", data);
};

export const updateDetailCombo = (store_code, combo_id, group, data) => {
  return callApi(
    `/store/${store_code}/combos_v2/${combo_id}/group/${group}`,
    "put",
    data
  );
};

export const addDetailCombo = (store_code, combo_id, data) => {
  return callApi(
    `/store/${store_code}/combos_v2/${combo_id}/group`,
    "post",
    data
  );
};
export const updateCombo = (store_code, data, id) => {
  return callApi(`/store/${store_code}/combos/${id}`, "put", data);
};

export const destroyCombo = (store_code, id) => {
  return callApi(`/store/${store_code}/combos/${id}`, "delete", null);
};
export const destroyComboGroup = (store_code, combo_id, group) => {
  return callApi(
    `/store/${store_code}/combos_v2/${combo_id}/group/${group}`,
    "delete",
    null
  );
};

export const upload = (file) => {
  return callApi(`/images`, "post", file);
};
