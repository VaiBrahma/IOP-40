import * as math from 'mathjs';

const Ybus_fixedd = [
  [{ real: 6.25, imag: -18.7225 }, { real: -5.0, imag: 15.0 }, { real: -1.25, imag: 3.75 }, { real: 0.0, imag: 0.0 }, { real: 0.0, imag: 0.0 }],
  [{ real: -5.0, imag: 15.0 }, { real: 10.8333, imag: -32.4575 }, { real: -1.6667, imag: 5.0 }, { real: -1.6667, imag: 5.0 }, { real: -2.5, imag: 7.5 }],
  [{ real: -1.25, imag: 3.75 }, { real: -1.6667, imag: 5.0 }, { real: 12.9167, imag: -38.7225 }, { real: 0.0, imag: 0.0 }, { real: -10.0, imag: 30.0 }],
  [{ real: 0.0, imag: 0.0 }, { real: -1.6667, imag: 5.0 }, { real: 0.0, imag: 0.0 }, { real: 2.9167, imag: -8.7275 }, { real: -1.25, imag: 3.75 }],
  [{ real: 0.0, imag: 0.0 }, { real: -2.5, imag: 7.5 }, { real: -10.0, imag: 30.0 }, { real: -1.25, imag: 3.75 }, { real: 13.75, imag: -41.225 }],
];

const linedata = [
  { from: 1, to: 2, R: 0.02, X: 0.06, charging: 0.03 },
  { from: 1, to: 3, R: 0.08, X: 0.24, charging: 0.025 },
  { from: 2, to: 3, R: 0.06, X: 0.18, charging: 0.02 },
  { from: 2, to: 4, R: 0.06, X: 0.18, charging: 0.02 },
  { from: 2, to: 5, R: 0.04, X: 0.12, charging: 0.015 },
  { from: 3, to: 5, R: 0.01, X: 0.03, charging: 0.01 },
  { from: 4, to: 5, R: 0.08, X: 0.24, charging: 0.025 },
];

const base_busdata = [
  { bus: 1, type: 1, V: 1.06, angle: 0, Pg: 0, Qg: 0, PL: 0, QL: 0, Qmax: 0, Qmin: 0 },
  { bus: 2, type: 2, V: 1.045, angle: 0, Pg: 0.4, Qg: 0.25, PL: 0.2, QL: 0.1, Qmax: 0.5, Qmin: -0.4 },
  { bus: 3, type: 2, V: 1.01, angle: 0, Pg: 0.6, Qg: 0.3, PL: 0.25, QL: 0.1, Qmax: 0.6, Qmin: -0.4 },
  { bus: 4, type: 3, V: 1.0, angle: 0, Pg: 0, Qg: 0, PL: 0.4, QL: 0.2, Qmax: 0, Qmin: 0 },
  { bus: 5, type: 3, V: 1.0, angle: 0, Pg: 0, Qg: 0, PL: 0.5, QL: 0.25, Qmax: 0, Qmin: 0 },
];

export const stochasticFDLF = (baseBusData = base_busdata, lineData = linedata, nSamples = 500, Ybus_fixed = Ybus_fixedd) => {
  const nbus = baseBusData.length;
  const nline = lineData.length;
  const V_samples = Array.from({ length: nbus }, () => Array(nSamples).fill(NaN));
  const delta_samples = Array.from({ length: nbus }, () => Array(nSamples).fill(NaN));
  const Pline_samples = Array.from({ length: nline }, () => Array(nSamples).fill(NaN));

  let successCount = 0;

  for (let k = 0; k < nSamples; k++) {
    const busData = JSON.parse(JSON.stringify(baseBusData));
    const randP = Array.from({ length: nbus }, () => 1 + 0.1 * (2 * Math.random() - 1));
    const randQ = Array.from({ length: nbus }, () => 1 + 0.1 * (2 * Math.random() - 1));

    for (let i = 0; i < nbus; i++) {
      if (busData[i].type === 3 || busData[i].QL > 0) {
        busData[i].PL *= randP[i];
        busData[i].QL *= randQ[i];
      }
    }

    const { V, delta, success } = fdlfSolver(busData, lineData, Ybus_fixed);

    if (success) {
      for (let i = 0; i < nbus; i++) {
        V_samples[i][k] = V[i];
        delta_samples[i][k] = delta[i] * (180 / Math.PI);
      }

      const Pline = computeLineFlows(V, delta, lineData);
      for (let i = 0; i < nline; i++) {
        Pline_samples[i][k] = Pline[i];
      }

      successCount++;
    }
  }

  const successRate = (100 * successCount / nSamples).toFixed(2);
  console.log(`✅ Success rate: ${successRate}%`);

  return { V_samples, delta_samples, Pline_samples, successRate };
};

function computeLineFlows(V, delta, lineData) {
  return lineData.map(({ from, to, R, X }) => {
    const i = from - 1;
    const j = to - 1;
    const z = math.complex(R, X);
    const y = math.divide(1, z);
    const Vi = math.multiply(V[i], math.exp(math.complex(0, delta[i])));
    const Vj = math.multiply(V[j], math.exp(math.complex(0, delta[j])));
    const I = math.multiply(y, math.subtract(Vi, Vj));
    const S = math.multiply(math.conj(I), Vi);
    return S.re || 0;
  });
}

function fdlfSolver(busData, lineData, Ybus_raw) {
  const nbus = busData.length;
  const Ybus = Ybus_raw.map(row => row.map(c => ({ re: c.real, im: c.imag })));

  const V = busData.map(bus => bus.V || 1.0);
  const delta = busData.map(bus => (bus.angle || 0) * Math.PI / 180);
  const Pg = busData.map(bus => bus.Pg || 0);
  const Qg = busData.map(bus => bus.Qg || 0);
  const Pl = busData.map(bus => bus.PL || 0);
  const Ql = busData.map(bus => bus.QL || 0);
  const Qmax = busData.map(bus => bus.Qmax || Infinity);
  const Qmin = busData.map(bus => bus.Qmin || -Infinity);

  let P = Pg.map((p, i) => p - Pl[i]);
  let Q = Qg.map((q, i) => q - Ql[i]);

  let PQ = busData.map((b, i) => (b.type === 3 ? i : -1)).filter(i => i !== -1);
  let PV = busData.map((b, i) => (b.type === 2 ? i : -1)).filter(i => i !== -1);
  let Slack = busData.findIndex(b => b.type === 1);

  let Bprime = removeRowCol(Ybus.map(r => r.map(c => -c.im)), Slack);
  let Bdoubleprime = subMatrix(Ybus.map(r => r.map(c => -c.im)), PQ, PQ);

  const tol = 1e-6;
  const maxIter = 20;
  let iter = 0;
  let converged = false;

  while (!converged && iter < maxIter) {
    iter++;

    const P_calc = calcPower(V, delta, Ybus, "P");
    const Q_calc = calcPower(V, delta, Ybus, "Q");

    for (let i = 0; i < PV.length; i++) {
      const bus = PV[i];
      const Qg_actual = Q_calc[bus] + Ql[bus];
      if (Qg_actual > Qmax[bus]) {
        Q[bus] = Qmax[bus] - Ql[bus];
        PV = PV.filter(b => b !== bus);
        if (!PQ.includes(bus)) PQ.push(bus);
      } else if (Qg_actual < Qmin[bus]) {
        Q[bus] = Qmin[bus] - Ql[bus];
        PV = PV.filter(b => b !== bus);
        if (!PQ.includes(bus)) PQ.push(bus);
      }
    }

    Bprime = removeRowCol(Ybus.map(r => r.map(c => -c.im)), Slack);
    Bdoubleprime = subMatrix(Ybus.map(r => r.map(c => -c.im)), PQ, PQ);

    const nonSlack = [...Array(nbus).keys()].filter(i => i !== Slack);
    const dP = nonSlack.map(i => P[i] - P_calc[i]);
    const dQ = PQ.map(i => Q[i] - Q_calc[i]);

    const maxMismatch = Math.max(...dP.map(Math.abs), ...dQ.map(Math.abs));
    if (maxMismatch < tol) {
      converged = true;
      break;
    }

    try {
      const dDelta = math.lusolve(Bprime, math.transpose([dP])).map(row => row[0]);
      for (let i = 0; i < nonSlack.length; i++) delta[nonSlack[i]] += dDelta[i];

      const dV = math.lusolve(Bdoubleprime, math.transpose([dQ])).map(row => row[0]);
      for (let i = 0; i < PQ.length; i++) V[PQ[i]] += dV[i];
    } catch (e) {
      return { V, delta, success: false };
    }
  }

  return { V, delta, success: converged };
}

function calcPower(V, delta, Ybus, type = "P") {
  const n = V.length;
  const result = Array(n).fill(0);
  for (let i = 0; i < n; i++) {
    for (let k = 0; k < n; k++) {
      const angle = delta[i] - delta[k];
      const G = Ybus[i][k].re;
      const B = Ybus[i][k].im;
      result[i] += V[i] * V[k] * (type === "P"
        ? (G * Math.cos(angle) + B * Math.sin(angle))
        : (G * Math.sin(angle) - B * Math.cos(angle)));
    }
  }
  return result;
}

function removeRowCol(matrix, idx) {
  return matrix.filter((_, i) => i !== idx).map(row => row.filter((_, j) => j !== idx));
}

function subMatrix(mat, rowIdxs, colIdxs) {
  return rowIdxs.map(i => colIdxs.map(j => mat[i][j]));
}