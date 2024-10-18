import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    userId: "",
    name: "",
    email: "",
    username: "",
    avatar: "",
    confirmemail: "",
  },
  reducers: {
    login: (state, payload) => {
      state.userId = payload.payload.userId;
      state.name = payload.payload.name;
      state.email = payload.payload.email;
      state.username = payload.payload.username;
      state.avatar = payload.payload.avatar;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.isAuthenticated = false;
    },
    updateUser: (state, payload) => {
      payload.payload.forEach((item) => {
        state[item.key] = item.value;
      });
    },
  },
});

export const { login, logout, updateUser } = authSlice.actions;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export default authSlice.reducer;
