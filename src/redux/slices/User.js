import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    username: null,
    userid: null,
    token: null,
  },
  reducers: {
    updateUser: (state, action) => {
      state.username = action.payload.username;
      state.userid = action.payload.userid;
      state.token = action.payload.token;
    },
    deleteUser: (state) => {
      state.username = null;
      state.userid = null;
      state.token = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateUser, deleteUser } = userSlice.actions;

export const selectUser = (state) => {
  return state.user;
};

export default userSlice.reducer;
