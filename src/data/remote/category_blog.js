import callApi from "../../ultis/apiCaller";

export const fetchAllData = (store_code) => {
  return callApi(`/store/${store_code}/post_categories`, "get", null);
};



export const createCategoryB = (store_code,data) =>{
  return callApi(`/store/${store_code}/post_categories`, "post", data);
}

export const updateCategoryB = (categoryBId, categoryB, store_code) =>{
  return callApi(`/store/${store_code}/post_categories/${categoryBId}`, "post", categoryB);
}

export const destroyCategoryB = (store_code , storeAid) =>{
  return callApi(`/store/${store_code}/post_categories/${storeAid}`, "delete", null);
}
