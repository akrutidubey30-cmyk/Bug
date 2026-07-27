import { configureStore } from "@reduxjs/toolkit";
import bugsReducer from "./bugsSlice";
import authReducer from "./authSlice";

const store = configureStore({
  reducer: {
    bugs: bugsReducer,
    auth: authReducer,
  },
});

export default store;
