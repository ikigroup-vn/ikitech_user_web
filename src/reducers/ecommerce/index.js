import { combineReducers } from "redux";
import { connect } from "./connect";
import { product } from "./product";

export const ecommerceReducers = combineReducers({
  connect,
  product,
});
