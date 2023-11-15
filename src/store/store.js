import { configureStore } from "@reduxjs/toolkit";
import user from "./userSlice";
import searchParams from "./searchParamsSlice";

const store = configureStore({
  reducer: {
    user,
    searchParams,
  },
});

export default store;
