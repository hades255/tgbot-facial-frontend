import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    userId: "",
    name: "",
    username: "",
    avatar: "",
  },
  reducers: {
    login: (state, payload) => {
      state.userId = payload.payload.userId;
      state.name = payload.payload.name;
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
export default authSlice.reducer;
