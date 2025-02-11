import { createSlice } from '@reduxjs/toolkit';

const defaultBuses = [
  { type: 1, V: 1, angle: 0, Pg: 0, Qg: 0, PL: 0, QL: 0, Qmin: 0, Qmax: 0 },
  { type: 2, V: 1, angle: 0, Pg: 0.5, Qg: 0, PL: 0, QL: 0, Qmin: -5, Qmax: 5 },
  { type: 2, V: 1, angle: 0, Pg: 1.0, Qg: 0, PL: 0, QL: 0, Qmin: -0.5, Qmax: 0.5 },
  { type: 3, V: 1, angle: 0, Pg: 0, Qg: 0, PL: 1.15, QL: 0.6, Qmin: 0, Qmax: 0 },
  { type: 3, V: 1, angle: 0, Pg: 0, Qg: 0, PL: 0.85, QL: 0.4, Qmin: 0, Qmax: 0 },
];

const busesSlice = createSlice({
  name: 'buses',
  initialState: defaultBuses,
  reducers: {
    setBusesMatrix: (state, action) => action.payload,
  },
});

export const { setBusesMatrix } = busesSlice.actions;
export default busesSlice.reducer;