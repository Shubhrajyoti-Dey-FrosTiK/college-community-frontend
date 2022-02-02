import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./slices/User";
import postReducer from "./slices/Post";

const rootReducer = combineReducers({
  user: userReducer,
  post: postReducer,
});

export default rootReducer;
