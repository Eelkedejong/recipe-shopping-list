import { createSlice } from "@reduxjs/toolkit";

// Store for recipes that should be added or changed in the shopping list.
const initialState = {
  recipes: [],
};

export const shoppingListRecipesSlice = createSlice({
  name: "shoppingListRecipes",
  initialState: {
    value: initialState,
  },
  reducers: {
    updateRecipes: (state, action) => {
      state.value.recipes = action.payload;
    },
    resetRecipes: (state) => {
      state.value = initialState;
    },
  },
});

export const { updateRecipes, resetRecipes } = shoppingListRecipesSlice.actions;

export default shoppingListRecipesSlice.reducer;
