import { createSlice } from '@reduxjs/toolkit';

// All search parameters for recipes are stored in the searchParams slice.
const initialState = {
  typeOfMeal: [],
  typeOfDish: [],
  cuisine: [],
  tags: [],
  time: null,
  isChildFriendly: undefined,
  isVegetarian: undefined,
  search: '',
  limit: '',
  page: '',
};

export const searchParamsSlice = createSlice({
  name: 'searchParams',
  initialState: {
    value: initialState,
  },
  reducers: {
    updateTypeOfMeal: (state, action) => {
      // If it's a single value, toggle its presence in the array
      if (typeof action.payload === 'string') {
        if (!state.value.typeOfMeal.includes(action.payload)) {
          state.value.typeOfMeal.push(action.payload);
        } else {
          state.value.typeOfMeal = state.value.typeOfMeal.filter(
            (type) => type !== action.payload
          );
        }
      }
      // If it's an array, replace the current array
      else if (Array.isArray(action.payload)) {
        state.value.typeOfMeal = action.payload;
      }
    },
    updateTypeOfDish: (state, action) => {
      // If it's a single value, toggle its presence in the array
      if (typeof action.payload === 'string') {
        if (!state.value.typeOfDish.includes(action.payload)) {
          state.value.typeOfDish.push(action.payload);
        } else {
          state.value.typeOfDish = state.value.typeOfDish.filter(
            (type) => type !== action.payload
          );
        }
      }
      // If it's an array, replace the current array
      else if (Array.isArray(action.payload)) {
        state.value.typeOfDish = action.payload;
      }
    },
    updateCuisine: (state, action) => {
      // If it's a single value, toggle its presence in the array
      if (typeof action.payload === 'string') {
        if (!state.value.cuisine.includes(action.payload)) {
          state.value.cuisine.push(action.payload);
        } else {
          state.value.cuisine = state.value.cuisine.filter(
            (type) => type !== action.payload
          );
        }
      }
      // If it's an array, replace the current array
      else if (Array.isArray(action.payload)) {
        state.value.cuisine = action.payload;
      }
    },
    updateTags: (state, action) => {
      // If it's a single value, toggle its presence in the array
      if (typeof action.payload === 'string') {
        if (!state.value.tags.includes(action.payload)) {
          state.value.tags.push(action.payload);
        } else {
          state.value.tags = state.value.tags.filter(
            (tag) => tag !== action.payload
          );
        }
      }
      // If it's an array, replace the current array
      else if (Array.isArray(action.payload)) {
        state.value.tags = action.payload;
      }
    },
    updateTime: (state, action) => {
      state.value.time = action.payload;
    },
    updateIsChildFriendly: (state, action) => {
      state.value.isChildFriendly = action.payload;
    },
    updateIsVegetarian: (state, action) => {
      state.value.isVegetarian = action.payload;
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
      state.value = { ...initialState, search: state.value.search };
    },
  },
});

export const {
  updateTypeOfMeal,
  updateTypeOfDish,
  updateCuisine,
  updateTags,
  updateTime,
  updateIsChildFriendly,
  updateIsVegetarian,
  updateSearch,
  updateLimit,
  updatePage,
  resetSearchParams,
} = searchParamsSlice.actions;

export default searchParamsSlice.reducer;
