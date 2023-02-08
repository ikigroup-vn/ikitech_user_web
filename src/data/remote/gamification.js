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

export const fetchListGiftGameSpinWheels = (store_code, idGame) => {
  return callApi(
    `/store/${store_code}/spin_wheels/${idGame}/gift_spin_wheels`,
    "get",
    null
  );
};
export const addGiftGameSpinWheels = (store_code, idGame, data) => {
  return callApi(
    `/store/${store_code}/spin_wheels/${idGame}/gift_spin_wheels`,
    "post",
    data
  );
};
export const updateGiftGameSpinWheels = (store_code, idGame, idGift, data) => {
  return callApi(
    `/store/${store_code}/spin_wheels/${idGame}/gift_spin_wheels/${idGift}`,
    "put",
    data
  );
};
export const deleteGiftGameSpinWheels = (store_code, idGame, idGift) => {
  return callApi(
    `/store/${store_code}/spin_wheels/${idGame}/gift_spin_wheels/${idGift}`,
    "delete",
    null
  );
};
