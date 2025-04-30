import * as math from 'mathjs';

export const formatComplexNumber = (complexNumber, decimals) => {
    let real = parseFloat(complexNumber.re).toFixed(decimals);
    let imag = parseFloat(complexNumber.im).toFixed(decimals);
    return parseFloat(imag) >= 0 ? `${real} + ${imag}i` : `${real} - ${Math.abs(imag)}i`;
}

export const calculateJacobian = (numBuses, Vmag, delta, Ybus, Ybus1, buses) => {
    let J1 = math.zeros(numBuses, numBuses);
    let J2 = math.zeros(numBuses, numBuses);
    let J3 = math.zeros(numBuses, numBuses);
    let J4 = math.zeros(numBuses, numBuses);

    for (let i = 0; i < numBuses; i++) {
        for (let j = 0; j < numBuses; j++) {
            J1.set([i, j], J1.get([i, j]) - math.im(Ybus1[i][j]));
        }
    }

    for (let i = 0; i < numBuses; i++) {
        for (let j = 0; j< numBuses; j++) {
            J2.set([i, j], J2.get([i, i]));
        }
    }

    for (let i = 0; i < numBuses; i++) {
        for (let j = 0; j < numBuses; j++) {
            J3.set([i, j], 0);
        }
    }

    for (let i = 0; i < numBuses; i++) {
        for (let j = 0; j < numBuses; j++) {
            J4.set([i, j], J4.get([i, j]) - math.im(Ybus[i][j]));  
        }        
    }
    
    let pv_pq_indices = buses.map((bus, i) => bus.type !== 1 ? i : -1).filter(i => i !== -1);
    let J11 = J1.subset(math.index(pv_pq_indices, pv_pq_indices));
    let pq_indices = buses.map((bus, idx) => (bus.type === 3 ? idx : -1)).filter(idx => idx !== -1);
    let J22 = J2.subset(math.index(pv_pq_indices, pq_indices));
    let J33 = J3.subset(math.index(pq_indices, pv_pq_indices));
    let J44 = J4.subset(math.index(pq_indices, pq_indices));

    try {
        let topRow = math.concat(J11, J22, 1);
        let bottomRow = math.concat(J33, J44, 1);
        let J = math.concat(topRow, bottomRow, 0);
        let J_inv = math.inv(J);
        return  {J, J11, J22, J33, J44};
    } catch (error) {
        //console.error("Error in concatenating matrices:", error);
    }
}

export const runLoadFlow = (buses, lines, Tolerance, MaIteration, Ybus, Ybus1) => {

    let Vmag, delta, iter, Pij, Qij, Pji, Qji, P_loss, Q_loss, TotalP_loss, TotalQ_loss;
    // console.log(buses, lines);
  
    let I = Array(buses.length).fill(math.complex(0, 0));
    
    let convergence = false;
    let iterations = 0;
  
    var maxIterations = MaIteration;
    var toleranceLimit = Tolerance;
  
    var numBuses = buses.length;
    var numLines = lines.length;
  
    let type = buses.map(bus => bus.type);
    let Pg = buses.map(bus => bus.Pg);
    let Qg = buses.map(bus => bus.Qg);
    let Pd = buses.map(bus => bus.PL);
    let Qd = buses.map(bus => bus.QL);
    let Qmin = buses.map(bus => bus.Qmin);
    let Qmax = buses.map(bus => bus.Qmax);
    Vmag = buses.map(bus => bus.V);
    let Vmag1 = buses.map(bus => bus.V);
    let Vini = buses.map(bus => bus.V);
    delta = buses.map(bus => bus.angle);
  
    let P_sch = Pg.map((pg, i) => pg - Pd[i]);
    let Q_sch = Qg.map((qg, i) => qg - Qd[i]);
    
    //console.log("Vmag1:", Vmag1);
    //console.log("Vini:", Vini);
  
    let accuracy = 1;
    iter = 0;
  
    while (accuracy >= toleranceLimit && iter < maxIterations) {
      iter++;  
      //console.log("iter:", iter);
      
      let type = buses.map(bus => bus.type);
      let pvIndices1 = buses.map((bus, i) => bus.type === 2 ? i : -1).filter(i => i !== -1);
  
      pvIndices1.forEach((i) => {Vmag1[i] = Vini[i]});
  
      let P_cal = Array(numBuses).fill(0);
      let Q_cal = Array(numBuses).fill(0);
      let Q_c = Array(numBuses).fill(0);
  
      for (let i = 0; i < numBuses; i++) {
        for (let n = 0; n < numBuses; n++) {
          P_cal[i] += Vmag[i] * Vmag[n] * math.abs(Ybus[i][n])* math.cos(math.arg(Ybus[i][n]) + delta[n] - delta[i]);
          Q_cal[i] -= Vmag[i] * Vmag[n] * math.abs(Ybus[i][n]) * math.sin(math.arg(Ybus[i][n])+ delta[n] - delta[i]);
          Q_c[i] -= Vmag1[i] * Vmag1[n] * math.abs(Ybus[i][n]) * math.sin(math.arg(Ybus[i][n])+ delta[n] - delta[i]);    
        }
  
        let Q_check = Qd.map((qd, i) => qd + Q_c[i]);
  
        //console.log("P_cal:", P_cal);
        //console.log("Q_cal:", Q_cal);
        //console.log("Q_c:", Q_c);
        //console.log("Q_check:", Q_check);
  
        if (buses[i].type == 2){
          if (Qmax[i] !== 0) {
            if (Q_check[i] > Qmax[i]) {
              Qg[i] = Qmax[i];
              buses[i].type = 3;
            } else if (Q_check[i] < Qmin[i]) {
              Qg[i] = Qmin[i];
              buses[i].type = 3;
            } else {
              buses[i].type = 2;
              Vmag1[i] = Vini[i];
            }
          }
        }
  
        //console.log("Qmax:", Qmax);
        //console.log("Qmin:", Qmin);
      }
  
      let pvIndices = buses.map((bus, i) => bus.type === 2 ? i : -1).filter(i => i !== -1);
      let pvpqIndices = buses.map((bus, i) => bus.type !== 1 ? i : -1).filter(i => i !== -1);
      let pqIndices = buses.map((bus, i) => bus.type === 3 ? i : -1).filter(i => i !== -1);
  
      //console.log("pvIndices:", pvIndices);
      //console.log("pvpqIndices:", pvpqIndices);
      //console.log("pqIndices:", pqIndices);
    
      let DP1 = math.subtract(
        P_sch.slice(1, numBuses),
        P_cal.slice(1, numBuses)
      );
  
      let VmagSubset = Vmag.slice(1, numBuses);
  
      let DP = DP1.map((dp, i) => dp / VmagSubset[i]);
  
      //console.log("DP1:", DP1);
      //console.log("Vmag:", Vmag);
  
      let DQ1 = pqIndices.map(i => Qg[i] - Q_cal[i] - Qd[i]);
      
      let VmagSubset1 = pqIndices.map(i => Vmag[i]);
      let DQ = DQ1.map((dq, q) => dq / VmagSubset1[q]);
  
      //console.log("DP:", DP);
      //console.log("DQ:", DQ);
    
      let DF = DP.concat(DQ);
      
      //console.log("DF:", DF);
  
      let {J, J11, J22, J33, J44} = calculateJacobian(numBuses, Vmag, delta, Ybus, Ybus1, buses);
  
      //console.log("J11 :", J11);
      //console.log("J22 :", J22);
      //console.log("J33 :", J33);
      //console.log("J44 :", J44);
  
      let J_inv = math.inv(J);
      let B_inv = math.inv(J11);
      let BB_inv = math.inv(J44);
  
      //console.log("J_inv:", J_inv);
      //console.log("B_inv:", B_inv);
      //console.log("BB_inv:", BB_inv);
  
      let DX = math.multiply(J_inv, DF);
  
      let DX1 = math.multiply(B_inv, DP);
      let DX2 = math.multiply(BB_inv, DQ);
      //console.log("DX1:", DX1);
      //console.log("DX2:", DX2);
  
      //console.log("DX:", DX);
  
      let DX_vector = DX.toArray();
  
      pvpqIndices.forEach((i, idx) => {
        let dxValue = DX_vector[idx];
        if (delta[i] !== undefined && dxValue !== undefined && !isNaN(dxValue)) {
          delta[i] = math.add(delta[i], dxValue);
        } else {
          //console.error(`Error updating delta: Index ${i} or ${idx} out of bounds or invalid in delta or DX_vector`);
        }
      });
  
      //console.log("Updated delta:", delta);
  
      pqIndices.forEach((i, idx) => {
        let DX_index = pvpqIndices.length + idx;
        let dxValue = DX_vector[DX_index];
        if (Vmag[i] !== undefined && dxValue !== undefined && !isNaN(dxValue)) {
          Vmag[i] = math.add(Vmag[i], dxValue);
          Vmag1[i] = Vmag[i]; 
        } else {
          //console.error(`Error updating Vmag: Index ${i} or ${DX_index} out of bounds or invalid in Vmag or DX_vector`);
        }
      });
  
      //console.log("Updated Vmag:", Vmag);
  
      accuracy = Math.max(...DF.map(Math.abs));
  
      //console.log("accuracy:", accuracy);
  
      let Va = buses.map((bus, i) => math.complex({ r: Vmag[i], phi: delta[i] }));
      //console.log("V:", Va);
  
      buses.forEach((bus, i) => {
        if (bus.type === 1) {
          bus.Pg = P_cal[i];
          bus.Qg = Q_cal[i];
        } else if (bus.type === 2) {
          bus.Pg = P_cal[i];
          bus.Qg = Q_cal[i];
        } else if (bus.type === 3) {
          bus.Pg = P_cal[i]+bus.PL;
          bus.Qg = Q_cal[i]+bus.QL;
        }
      });
  
      let suceptancia = [];
      let y = [];
      let z = [];
      let tap = [];
      let FromNode = [];
      let ToNode = [];
  
      let defaultTap = Array(lines.length).fill(0);
  
      lines.forEach((line, k) => {
        if (line.Tap === 0) {
          defaultTap[k] = 1;
        } else {
          defaultTap[k] = math.divide(1, line.Tap);
        }
      });
  
      //console.log("defaultTap:", defaultTap);
  
      lines.forEach((line, k) => {
        let b = math.complex(0, line.charging / 2);
        suceptancia.push(b);
        y.push(math.divide(1, math.complex(line.R, line.X)));
        z.push(math.complex(line.R, line.X));
        tap.push(line.Tap);
        FromNode.push(line.from - 1);
        ToNode.push(line.to - 1);
      });
  
      //console.log("tap:", tap);
      //console.log("y:", y);
      //console.log("z:", z);
      //console.log("suceptancia:", suceptancia);
      //console.log("FromNode:", FromNode);
      //console.log("ToNode:", ToNode);
  
      let Ss = lines.map((line, k) => {
        let term1 = math.divide(
          math.subtract(Va[FromNode[k]], math.multiply(defaultTap[k], Va[ToNode[k]])),
          math.multiply(math.pow(math.abs(defaultTap[k]), 2), z[k])
        );
        //console.log("term1:", term1);
  
        let term2 = math.multiply(Va[FromNode[k]], suceptancia[k]);
        //console.log("term2:", term2);
  
        return math.multiply(Va[FromNode[k]], math.conj(math.add(term1, term2)));
      });
      //console.log("Ss:", Ss);
  
      let Sr = lines.map((line, k) => {
        let term3 = math.divide(
          math.subtract(Va[ToNode[k]], Va[FromNode[k]]),
          math.multiply(defaultTap[k], z[k])
        );
        //console.log("term3:", term3);
  
        let term4 = math.multiply(Va[ToNode[k]],     
          math.add(math.divide(math.subtract(defaultTap[k], 1), math.multiply(defaultTap[k], z[k])), suceptancia[k])          
        );
        //console.log("term4:", term4);
  
        return math.multiply(Va[ToNode[k]], math.conj(math.add(term3, term4)));
      });
      //console.log("Sr:", Sr);
  
      Pij = Ss.map(S => math.re(S));
      Qij = Ss.map(S => math.im(S));
      Pji = Sr.map(S => math.re(S));
      Qji = Sr.map(S => math.im(S));
  
       P_loss = Pij.map((P, k) => P + Pji[k]);
       Q_loss = Qij.map((Q, k) => Q + Qji[k]);
  
      
       TotalP_loss = math.sum(P_loss.map(P => math.abs(P)));
       TotalQ_loss = math.sum(Q_loss.map(Q => math.abs(Q)));
    }
    return {Vmag, delta, iter, buses, Pij, Qij, Pji, Qji, P_loss, Q_loss, lines, TotalP_loss, TotalQ_loss};
  }
  