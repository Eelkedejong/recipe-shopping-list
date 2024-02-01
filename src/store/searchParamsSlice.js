import { createSlice } from "@reduxjs/toolkit";

// All search parameters for recipes are stored in the searchParams slice.
const initialState = {
  type: "",
  tags: [],
  time: null,
  search: "",
  limit: "",
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
      // Add the tag to the array if it doesn't exist
      if (!state.value.tags.includes(action.payload)) {
        state.value.tags.push(action.payload);
      } else {
        // Otherwise, remove the tag from the array
        state.value.tags = state.value.tags.filter(
          (tag) => tag !== action.payload,
        );
      }
    },
    updateTime: (state, action) => {
      state.value.time = action.payload;
    },
    updateSearch: (state, action) => {
      state.value.search = action.payload;
    },
    updateLimit: (state, action) => {
      state.value.limit = action.payload;
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
  updateLimit,
  updatePage,
  resetSearchParams,
} = searchParamsSlice.actions;

export default searchParamsSlice.reducer;
