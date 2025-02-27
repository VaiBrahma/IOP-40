import { createSlice } from '@reduxjs/toolkit';

const defaultLines = [
  { from: 1, to: 2, R: 0.042, X: 0.168, charging: 0.082, Tap: 0, Smax: 100 },
  { from: 1, to: 5, R: 0.031, X: 0.126, charging: 0.062, Tap: 0, Smax: 100 },
  { from: 2, to: 3, R: 0.031, X: 0.126, charging: 0.062, Tap: 0, Smax: 100 },
  { from: 3, to: 4, R: 0.024, X: 0.136, charging: 0.164, Tap: 0, Smax: 100 },
  { from: 3, to: 5, R: 0.053, X: 0.210, charging: 0.102, Tap: 0, Smax: 100 },
  { from: 4, to: 5, R: 0.063, X: 0.252, charging: 0.122, Tap: 0, Smax: 100 },
];

const linesSlice = createSlice({
  name: 'lines',
  initialState: defaultLines,
  reducers: {
    setLinesMatrix: (state, action) => action.payload,
  },
});

export const { setLinesMatrix } = linesSlice.actions;
export default linesSlice.reducer;
