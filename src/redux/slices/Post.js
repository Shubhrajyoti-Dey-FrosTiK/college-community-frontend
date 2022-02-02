import { createSlice } from "@reduxjs/toolkit";
import { current } from "@reduxjs/toolkit";

export const postSlice = createSlice({
  name: "post",
  initialState: {
    open: false,
    pendingPost: false,
    pendingImageUrl: [],
  },
  reducers: {
    createPost: (state) => {
      state.open = true;
    },
    cancelCreatePost: (state) => {
      state.open = false;
    },
    triggerPendingPost: (state) => {
      state.pendingPost = true;
    },
    initializePendingPost: (state) => {
      state.pendingPost = false;
    },
    pushImageUrl(state, action) {
      let pendingImageUrl = state.pendingImageUrl;
      pendingImageUrl.push(action.payload);
    },
    clearImageUrl: (state) => {
      let pendingImageUrl = state.pendingImageUrl;
      pendingImageUrl.splice(0, pendingImageUrl.length);
    },
    clearPendingPost: (state) => {
      state.pendingPost = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  createPost,
  cancelCreatePost,
  triggerPendingPost,
  initializePendingPost,
  pushImageUrl,
  clearImageUrl,
  clearPendingPost,
} = postSlice.actions;

export const selectPost = (state) => {
  return state.post;
};

export default postSlice.reducer;
