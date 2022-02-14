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
