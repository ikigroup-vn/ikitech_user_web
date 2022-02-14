import * as Types from "../../constants/ActionType";

var initialState = {
  product_img: "",
  listImgProduct: [],
  listImgDistribute: []

};

export const productImg = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case Types.UPLOAD_PRODUCT_IMG:
      newState.product_img = action.data;
      return newState;
    case Types.UPLOAD_ALL_PRODUCT_IMG:
      newState.listImgProduct = action.data;
      return newState;
    case Types.UPLOAD_ALL_DISTRIBUTE_IMG:
      newState.listImgDistribute = action.data;
      return newState;
    default:
      return newState;
  }
};
