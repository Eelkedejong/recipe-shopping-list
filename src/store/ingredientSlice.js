import { createSlice } from '@reduxjs/toolkit';
import { init } from 'i18next';

const initialState = [{ unit: '', amount: '', ingredient: '', id: 1 }];
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
