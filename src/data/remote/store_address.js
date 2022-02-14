import callApi from "../../ultis/apiCaller";

export const fetchAllData = (id) => {
  return callApi(`/store/${id}/store_address`, "get", null);
};

export const fetchDataId = (id) => {
  return callApi(`/store/${id}`, "get", null);
};

export const createStoreA = (store_code,data) =>{
  return callApi(`/store/${store_code}/store_address`, "post", data);
}

export const updateStoreA = (storeAId, storeA, store_code) =>{
  return callApi(`/store/${store_code}/store_address/${storeAId}`, "put", storeA);
}

export const destroyStoreA = (store_code , storeAid) =>{
  return callApi(`/store/${store_code}/store_address/${storeAid}`, "delete", null);
}
