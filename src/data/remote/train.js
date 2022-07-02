import callApi from "../../ultis/apiCaller";

export const fetchAllCourse = (store_code , page , params) => {
  // return callApi(`/store/${store_code}/posts?page=${page}`, "get", null);

  return params ? callApi(`/store/${store_code}/train_courses?page=${page}${params}`, "get", null) 
  :callApi(`/store/${store_code}/train_courses?page=${page}`, "get", null)
};

export const fetchCourseId = (store_code  , courseId) => {
  return callApi(`/store/${store_code}/train_courses/${courseId}`, "get", null);
};

export const createCourse = (store_code,data) =>{
  return callApi(`/store/${store_code}/train_courses`, "post", data);
}

export const updateCourse = (categoryBId, categoryB, store_code) =>{
  return callApi(`/store/${store_code}/train_courses/${categoryBId}`, "put", categoryB);
}

export const destroyCourse = (store_code , storeAid) =>{
  return callApi(`/store/${store_code}/train_courses/${storeAid}`, "delete", null);
}
