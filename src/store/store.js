import { configureStore } from "@reduxjs/toolkit";
import user from "./userSlice";
import searchParams from "./searchParamsSlice";
import publicSearchParams from "./publicSearchParamsSlice";
import shoppingListRecipes from "./shoppingListRecipesSlice";

const store = configureStore({
  reducer: {
    user,
    searchParams,
    publicSearchParams,
    shoppingListRecipes,
  },
});

export default store;
