import * as Types from "../../constants/ActionType";

var initialState = {
  allCourse: [],
  courseID: {  },
  type: [],
};

export const train = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case Types.FETCH_ALL_TRAIN_COURSE:
      newState.allCourse = action.data;
      return newState;
    case Types.FETCH_ID_TRAIN_COURSE:
      newState.courseID = action.data;
      return newState;
   
    default:
      return newState;
  }
};
