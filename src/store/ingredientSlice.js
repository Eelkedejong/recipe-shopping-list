import { createSlice } from '@reduxjs/toolkit';

const initialState = [
  { id: 1, ingredientId: null, name: '', amount: '', unit: '', prep: '' },
];
export const IngredientSlice = createSlice({
  name: 'ingredientList',
  initialState: {
    value: initialState,
  },
  reducers: {
    updateIngredientList: (state, action) => {
      state.value = action.payload;
    },
    resetIngredientList: (state) => {
      state.value = initialState;
    },
  },
});

export const { updateIngredientList, resetIngredientList } =
  IngredientSlice.actions;

export default IngredientSlice.reducer;
