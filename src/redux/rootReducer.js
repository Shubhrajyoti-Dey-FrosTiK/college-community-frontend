import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./slices/User";
import postReducer from "./slices/Post";
import pageReducer from "./slices/Page";

const rootReducer = combineReducers({
  user: userReducer,
  post: postReducer,
  page: pageReducer,
});

export default rootReducer;
