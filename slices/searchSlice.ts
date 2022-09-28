import { createSlice } from "@reduxjs/toolkit";

export const searchSlice = createSlice({
  name: "search",
  initialState: {
    search: null,
  },
  reducers: {
    search: (state, action) => {
      state.search = action.payload;
    },
  },
});

export const { search } = searchSlice.actions;
export const selectSearch = (state: any) => state.search.search;

export default searchSlice.reducer;
