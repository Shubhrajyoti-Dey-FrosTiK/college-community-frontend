import { createSlice } from "@reduxjs/toolkit";

export const postSlice = createSlice({
  name: "post",
  initialState: {
    open: false,
  },
  reducers: {
    createPost: (state) => {
      state.open = true;
    },
    cancelCreatePost: (state) => {
      state.open = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { createPost, cancelCreatePost } = postSlice.actions;

export const selectPost = (state) => {
  return state.post;
};

export default postSlice.reducer;
