import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null, // Ensure this matches the expected structure
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { login, logout } = userSlice.actions;

export const selectUser = (state) => state.user.user; // Corrected selector

export default userSlice.reducer;
