import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  E: 1.1626,
  V: 0.9,
  Pmec: 0.9,
  Xt: 0.45,
  X1: 0.5,
  X2: 0.93,
  H: 3.5,
  f: 60,
  tStep: 0.0005,
  faultTime: 1,
  clearTime: 0.085,
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    updateFormData: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetFormData: () => initialState,
  },
});

export const { updateFormData, resetFormData } = formSlice.actions;
export default formSlice.reducer;