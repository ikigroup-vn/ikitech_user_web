import callApi from "../../ultis/apiCaller";

export const fetchAllLesson = (store_code, page, params , courseId) => {
  // return callApi(`/store/${store_code}/posts?page=${page}`, "get", null);

  return params ? callApi(`/store/${store_code}/train_chapter_lessons/${courseId}?page=${page}${params}`, "get", null)
    : callApi(`/store/${store_code}/train_chapter_lessons/${courseId}?page=${page}`, "get", null)
};

export const fetchLessonId = (store_code, LessonId) => {
  return callApi(`/store/${store_code}/train_chapters/${LessonId}`, "get", null);
};

export const createLesson = (store_code, data) => {
  return callApi(`/store/${store_code}/train_lessons`, "post", data);
}
export const createChapter = (store_code, data) => {
  return callApi(`/store/${store_code}/train_chapters`, "post", data);
}

export const updateLesson = (categoryBId, categoryB, store_code) => {
  return callApi(`/store/${store_code}/train_lessons/${categoryBId}`, "put", categoryB);
}
export const updateChapter = (categoryBId, categoryB, store_code) => {
  return callApi(`/store/${store_code}/train_chapters/${categoryBId}`, "put", categoryB);
}

export const destroyLesson = (store_code, storeAid) => {
  return callApi(`/store/${store_code}/train_lessons/${storeAid}`, "delete", null);
}

export const destroyChapter = (store_code, storeAid) => {
  return callApi(`/store/${store_code}/train_chapters/${storeAid}`, "delete", null);
}



export const sortChapter = (store_code, data) => {
  return callApi(`/store/${store_code}/train_chapters_sort`, "put", data);
}

export const sortLesson = (store_code, data) => {
  return callApi(`/store/${store_code}/train_lessons_sort`, "put", data);
}





export const fetchAllCourse = (store_code, page, params) => {
  return params ? callApi(`/store/${store_code}/train_courses?page=${page}${params}`, "get", null) : callApi(`/store/${store_code}/train_courses?page=${page}`, "get", null)
};
export const fetchCourseId = (store_code, courseId) => { return callApi(`/store/${store_code}/train_courses/${courseId}`, "get", null); };
export const createCourse = (store_code, data) => { return callApi(`/store/${store_code}/train_courses`, "post", data); }
export const updateCourse = (categoryBId, categoryB, store_code) => { return callApi(`/store/${store_code}/train_courses/${categoryBId}`, "put", categoryB); }
export const destroyCourse = (store_code, storeAid) => { return callApi(`/store/${store_code}/train_courses/${storeAid}`, "delete", null); }