import { combineReducers } from '@reduxjs/toolkit';
import busesReducer from './slices/busesSlice';
import linesReducer from './slices/linesSlice';
import yMatrixReducer from './slices/yMatrixSlice';

const rootReducer = combineReducers({
  buses: busesReducer,
  lines: linesReducer,
  yMatrix: yMatrixReducer,
});

export default rootReducer;
