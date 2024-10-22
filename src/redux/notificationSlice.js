import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: { notifications: [], newNotifications: [] },
  reducers: {
    addNotifications: (state, payload) => {
      state.notifications = payload.payload;
    },
    addNewNotifications: (state, payload) => {
      state.newNotifications = payload.payload;
    },
    removeNewNotifications: (state, payload) => {
      state.newNotifications = state.newNotifications.filter(
        (item) => item._id !== payload.payload
      );
    },
  },
});

export const { addNotifications, addNewNotifications, removeNewNotifications } =
  notificationSlice.actions;
export default notificationSlice.reducer;
