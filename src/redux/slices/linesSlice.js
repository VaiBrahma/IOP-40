import { createSlice } from '@reduxjs/toolkit';

const linesSlice = createSlice({
  name: 'lines',
  initialState: [],
  reducers: {
    setLines: (state, action) => action.payload
  }
});

export const { setLines } = linesSlice.actions;
export default linesSlice.reducer;
