import { createSlice } from '@reduxjs/toolkit';

const numBuses = 5;

// Function to create an empty Ybus matrix
const generateYbusMatrix = () => {
  let Ybus = Array.from({ length: numBuses }, () =>
    Array.from({ length: numBuses }, () => ({ real: 0, imag: 0 }))
  );
  let Ybus1 = Array.from({ length: numBuses }, () =>
    Array.from({ length: numBuses }, () => ({ real: 0, imag: 0 }))
  );
  return { Ybus, Ybus1 };
};

const yMatrixSlice = createSlice({
  name: 'yMatrix',
  initialState: generateYbusMatrix(),
  reducers: {
    setYMatrix: (state, action) => action.payload,
  },
});

export const { setYMatrix } = yMatrixSlice.actions;
export default yMatrixSlice.reducer;