import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./slices/User";

const rootReducer = combineReducers({
  user: userReducer,
});

export default rootReducer;
