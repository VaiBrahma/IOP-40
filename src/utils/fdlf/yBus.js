import * as math from 'mathjs';

export const calculateYbus = (buses, lines) => {
    const numBuses = buses.length;
    const numLines = lines.length;

    let Ybus = Array.from({ length: numBuses }, () => Array.from({ length: numBuses }, () => math.complex(0, 0)));
    let Ybus1 = Array.from({ length: numBuses }, () => Array.from({ length: numBuses }, () => math.complex(0, 0)));

    for (let i = 0; i < numLines; i++) {
        const from = lines[i].from - 1; 
        const to = lines[i].to - 1;
        const R = lines[i].R;
        const X = lines[i].X;
        const B = lines[i].charging / 2;
        const tap = lines[i].Tap || 1; 
        
        const admittance = math.divide(1, math.complex(R, X));
        const admittance1 = math.divide(1, math.complex(0, X));
        const shuntAdmittance = math.complex(0, B);
        const tapComplex = math.complex(tap, 0);

        if (tap !== 1) {
            const tapSquare = math.multiply(tapComplex, tapComplex);
            Ybus[from][to] = math.subtract(Ybus[from][to], math.divide(admittance, tapComplex));
            Ybus[to][from] = Ybus[from][to];

            Ybus1[from][to] = math.subtract(Ybus1[from][to], math.divide(admittance1, tapComplex));
            Ybus1[to][from] = Ybus1[from][to];

            Ybus[from][from] = math.add(Ybus[from][from], math.divide(admittance, tapSquare), shuntAdmittance);
            Ybus[to][to] = math.add(Ybus[to][to], admittance, shuntAdmittance);

            Ybus1[from][from] = math.add(Ybus1[from][from], math.divide(admittance1, tapSquare), shuntAdmittance);
            Ybus1[to][to] = math.add(Ybus1[to][to], admittance1, shuntAdmittance);
        } else {
            Ybus[from][to] = math.subtract(Ybus[from][to], admittance);
            Ybus[to][from] = Ybus[from][to];
            Ybus[from][from] = math.add(Ybus[from][from], admittance, shuntAdmittance);
            Ybus[to][to] = math.add(Ybus[to][to], admittance, shuntAdmittance);

            Ybus1[from][to] = math.subtract(Ybus1[from][to], admittance1);
            Ybus1[to][from] = Ybus1[from][to];
            Ybus1[from][from] = math.add(Ybus1[from][from], admittance1, shuntAdmittance);
            Ybus1[to][to] = math.add(Ybus1[to][to], admittance1, shuntAdmittance);
        }
    }

    // console.log("Ybus:", Ybus);
    // console.log("Ybus1:", Ybus1);
    return { Ybus, Ybus1 };
};
