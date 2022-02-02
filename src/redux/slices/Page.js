import { createSlice } from "@reduxjs/toolkit";

export const pageSlice = createSlice({
  name: "page",
  initialState: {
    page: "Post",
  },
  reducers: {
    changePage: (state, action) => {
      state.page = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { changePage } = pageSlice.actions;

export const selectPage = (state) => {
  return state.page;
};

export default pageSlice.reducer;
