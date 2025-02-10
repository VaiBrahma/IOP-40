import { createSlice } from '@reduxjs/toolkit';

const yMatrixSlice = createSlice({
  name: 'yMatrix',
  initialState: [],
  reducers: {
    setYMatrix: (state, action) => action.payload
  }
});

export const { setYMatrix } = yMatrixSlice.actions;
export default yMatrixSlice.reducer;
