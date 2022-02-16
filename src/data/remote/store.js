import callApi from "../../ultis/apiCaller";

export const fetchAllData = () => {
  return callApi("/store", "get", null);
};

export const fetchDataId = (id) => {
  return callApi(`/store/${id}`, "get", null);
};

export const createStore = (data) =>{
  return callApi("/store", "post", data);
}

export const updateStore = (data,id) =>{
  return callApi(`/store/${id}`, "put", data);
}

export const destroyStore = (id) =>{
  return callApi(`/store/${id}`, "delete", id);
}

export const fetchBranchStore = (store_code) =>{
  return callApi(`/store/${store_code}/branches`, "get", null);
}

export const deleteBranchStore = (store_code,id) =>{
  return callApi(`/store/${store_code}/branches/${id}`, "delete", null);
}
export const createBranchStore = (store_code,data) =>{
  return callApi(`/store/${store_code}/branches`, "post", data);
}
