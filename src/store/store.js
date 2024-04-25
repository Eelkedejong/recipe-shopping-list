import { configureStore } from '@reduxjs/toolkit';
import user from './userSlice';
import searchParams from './searchParamsSlice';
import publicSearchParams from './publicSearchParamsSlice';
import shoppingListRecipes from './shoppingListRecipesSlice';
import ingredientList from './ingredientSlice';

const store = configureStore({
  reducer: {
    user,
    searchParams,
    publicSearchParams,
    shoppingListRecipes,
    ingredientList,
  },
});

export default store;
