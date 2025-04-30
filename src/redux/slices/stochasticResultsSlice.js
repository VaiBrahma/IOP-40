import { createSlice } from '@reduxjs/toolkit';

const defaultStochasticResults = {
  V_samples: [],
  delta_samples: [],
  Pline_samples: [],
  successRate: '0.00', // Default as a string like your structure
};

const stochasticResultsSlice = createSlice({
  name: 'stochasticResults',
  initialState: defaultStochasticResults,
  reducers: {
    setStochasticResults: (state, action) => action.payload,
    clearStochasticResults: () => defaultStochasticResults,
  },
});

export const { setStochasticResults, clearStochasticResults } = stochasticResultsSlice.actions;
export default stochasticResultsSlice.reducer;