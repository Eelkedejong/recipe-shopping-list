import { createSlice } from '@reduxjs/toolkit';

// Store for recipes that should be added or changed in the shopping list.
const initialState = {
  recipes: [],
};

export const shoppingListRecipesSlice = createSlice({
  name: 'shoppingListRecipes',
  initialState: {
    value: initialState,
  },
  reducers: {
    updateRecipes: (state, action) => {
      // If the recipe already exists in the state, update the persons value
      const existingRecipeIndex = state.value.recipes.findIndex((recipe) => recipe.id === action.payload.id);
      // If it doesn't exist, add a new recipe object to the state
      if (existingRecipeIndex === -1) {
        state.value.recipes.push(action.payload);
      } else {
        state.value.recipes[existingRecipeIndex] = action.payload;
      }
      // state.value.recipes = action.payload;
    },
    resetRecipes: (state) => {
      state.value = initialState;
    },
  },
});

export const { updateRecipes, resetRecipes } = shoppingListRecipesSlice.actions;

export default shoppingListRecipesSlice.reducer;
