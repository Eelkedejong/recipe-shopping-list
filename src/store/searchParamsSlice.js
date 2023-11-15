import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  type: "",
  tags: [],
  time: null,
  search: "",
  page: "",
};

export const searchParamsSlice = createSlice({
  name: "searchParams",
  initialState: {
    value: initialState,
  },
  reducers: {
    updateType: (state, action) => {
      state.value.type = action.payload;
    },
    updateTags: (state, action) => {
      state.value.tags = action.payload;
    },
    updateTime: (state, action) => {
      state.value.time = action.payload;
    },
    updateSearch: (state, action) => {
      state.value.search = action.payload;
    },
    updatePage: (state, action) => {
      state.value.page = action.payload;
    },
    resetSearchParams: (state) => {
      state.value = initialState;
    },
  },
});

export const {
  updateType,
  updateTags,
  updateTime,
  updateSearch,
  updatePage,
  resetSearchParams,
} = searchParamsSlice.actions;

export default searchParamsSlice.reducer;
