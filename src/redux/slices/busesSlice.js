import { createSlice } from '@reduxjs/toolkit';

const busesSlice = createSlice({
  name: 'buses',
  initialState: [],
  reducers: {
    setBuses: (state, action) => action.payload
  }
});

export const { setBuses } = busesSlice.actions;
export default busesSlice.reducer;
