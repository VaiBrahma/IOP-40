import * as math from 'mathjs';

export const convertToReduxCompatible = (matrix) =>
  matrix.map(row =>
    row.map(cell => ({ real: math.re(cell), imag: math.im(cell) }))
  );

export const convertFromReduxCompatible = (matrix) =>
  matrix.map(row =>
    row.map(cell => math.complex(cell.real, cell.imag))
  );