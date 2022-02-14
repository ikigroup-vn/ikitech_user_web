import callApi from "../../ultis/apiCaller";

export const fetchCollaboratorConf = (store_code) => {
  return callApi(`/store/${store_code}/collaborator_configs`, "get", null);
};
export const fetchAllSteps = (store_code) => {
  return callApi(`/store/${store_code}/collaborator_configs/bonus_steps`, "get", null);
};
export const createStep = (store_code , data) => {
  return callApi(`/store/${store_code}/collaborator_configs/bonus_steps`, "post", data);
};

export const destroyStep = (store_code, id) =>{
  return callApi(`/store/${store_code}/collaborator_configs/bonus_steps/${id}`, "delete", null);
}

export const updateStep = (store_code,id ,data) =>{
  return callApi(`/store/${store_code}/collaborator_configs/bonus_steps/${id}`, "put", data);
}

export const updateConfig = (store_code,data) =>{
  return callApi(`/store/${store_code}/collaborator_configs`, "post", data);
}

export const fetchAllCollaborator = (store_code , page=1) => {
  return callApi(`/store/${store_code}/collaborators?page=${page}`, "get", null);
};

export const fetchAllRequestPayment = (store_code) => {
  return callApi(`/store/${store_code}/collaborators/request_payment/current`, "get", null);
};
export const fetchAllHistory = (store_code) => {
  return callApi(`/store/${store_code}/collaborators/request_payment/history`, "get", null);
};
export const updateRequestPayment = (store_code,data) =>{
  return callApi(`/store/${store_code}/collaborators/request_payment/change_status`, "post", data);
}

export const updateAllRequestPayment = (store_code) =>{
  return callApi(`/store/${store_code}/collaborators/request_payment/settlement`, "post", null);
}
export const updateCollaborator = (store_code,id,data) =>{
  return callApi(`/store/${store_code}/collaborators/${id}`, "put", data);
}
