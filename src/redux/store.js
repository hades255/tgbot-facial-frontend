import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import toastSlice from "./toastSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    toast: toastSlice,
  },
});

export default store;
