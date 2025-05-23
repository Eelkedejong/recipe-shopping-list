import { createSlice } from "@reduxjs/toolkit";

// The user slice stores the user's information.
export const userSlice = createSlice({
  name: "user",
  initialState: {
    value: null,
  },
  reducers: {
    user: (state, action) => {
      state.value = action.payload;
    },
    setUser: (state, action) => {
      state.value = action.payload;
    },
    signOut: (state, action) => {
      state.value = null;
    },
  },
});

export const { user } = userSlice.actions;

export default userSlice.reducer;
