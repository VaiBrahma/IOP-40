import { combineReducers } from '@reduxjs/toolkit';
import busesReducer from './slices/busesSlice';
import linesReducer from './slices/linesSlice';
import yMatrixReducer from './slices/yMatrixSlice';
import formReducer from './slices/formSlice';
import stochasticResultsReducer from './slices/stochasticResultsSlice'; 

const rootReducer = combineReducers({
  buses: busesReducer,
  lines: linesReducer,
  yMatrix: yMatrixReducer,
  form: formReducer,
  stochasticResults: stochasticResultsReducer,
});

export default rootReducer;