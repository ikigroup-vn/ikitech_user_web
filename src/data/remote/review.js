import callApi from "../../ultis/apiCaller";

export const fetchAllReview = (store_code , page=1) => {
  return callApi(`/store/${store_code}/reviews?page=${page}`, "get", null);
};



export const destroyReview= (store_code, id) =>{
  return callApi(`/store/${store_code}/reviews/${id}`, "delete", null);
}

export const updateStatusReview = (store_code,id,data) =>{
  return callApi(`/store/${store_code}/reviews/${id}`, "put", data);
}
