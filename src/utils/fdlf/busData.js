export const autofillFiveBusNetwork = () => {
    let buses = [];
    let numBuses = 5;
    let defaultbusType = [1, 2, 2, 3, 3];
    let defaultbusV = [1, 1, 1, 1, 1];
    let defaultbusAng = [0, 0, 0, 0, 0];
    let defaultbusPg = [0, 0.5, 1.0, 0, 0];
    let defaultbusQg = [0, 0, 0, 0, 0];
    let defaultbusPL = [0, 0, 0, 1.15, 0.85];
    let defaultbusQL = [0, 0, 0, 0.6, 0.4];
    let defaultbusQmin = [0, -5, -0.5, 0, 0];
    let defaultbusQmax = [0, 5, 0.5, 0, 0];
    for (let i = 0; i < numBuses; i++) {
        buses.push({
          type: defaultbusType[i],
          V: defaultbusV[i],
          angle: defaultbusAng[i],
          Pg: defaultbusPg[i],
          Qg: defaultbusQg[i],
          PL: defaultbusPL[i],
          QL: defaultbusQL[i],
          Qmin: defaultbusQmin[i],
          Qmax: defaultbusQmax[i],
        });
    }

    return buses;
}

export const autofillFourteenBusNetwork =  () => {
    let buses = [];
    let numBuses = 14;
    let defaultbusType = [1, 2, 3, 3, 3, 2, 3, 3, 3, 3, 3, 3, 3, 3];
    let defaultbusV = [1.06, 1.045, 1, 1, 1, 1.07, 1, 1, 1, 1, 1, 1, 1, 1]; 
    let defaultbusAng = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    let defaultbusPg = [0, 0.183, 0, 0, 0, 0.112, 0, 0, 0, 0, 0, 0, 0, 0];
    let defaultbusQg = [0, 0.05857, 0, 0, 0, 0.442, 0, 0, 0, 0, 0, 0, 0, 0];
    let defaultbusPL = [0, 0, 1.19, 0.4779, 0.07599, 0, 0, 0, 0.29499, 0.09, 0.03501, 0.06099, 0.135, 0.14901];
    let defaultbusQL = [0, 0, 0.08762, 0.039, 0.01599, 0, 0, 0.129, 0.16599, 0.05799, 0.018, 0.01599, 0.05799, 0.05001];
    let defaultbusQmin = [0, -5, 0, 0, 0, -5, 0, 0, 0, 0, 0, 0, 0, 0];
    let defaultbusQmax = [0, 5, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0];
    for (let i = 0; i < numBuses; i++) {
        buses.push({
            type: defaultbusType[i],
            V: defaultbusV[i],
            angle: defaultbusAng[i],
            Pg: defaultbusPg[i],
            Qg: defaultbusQg[i],
            PL: defaultbusPL[i],
            QL: defaultbusQL[i],
            Qmin: defaultbusQmin[i],
            Qmax: defaultbusQmax[i],
        });
    }
    return buses;
}

export const initializeBusData = (numBuses) => {
    let buses = [];
    for (let i = 0; i<numBuses; i++) {
        buses.push({
            type: 1,
            V: 0,
            angle: 0,
            Pg: 0,
            Qg: 0,
            PL: 0,
            QL: 0,
            Qmin: 0,
            Qmax: 0,
        });
    }
    return buses;
}