export const tsa = (formData) => {
            const { E, V, Pmec, Xt, X1, X2, H, f, tStep, faultTime, clearTime } = formData;

            const Xpre = Xt + ((X1*X2)/(X1+X2)); 
            const Xpost = Xt + X1; 

            const d = Array.from({ length: 51 }, (_, i) => i * Math.PI / 50); // Load angles in radians

            // Power curves
            const P = d.map(delta => (E * V / Xpre) * Math.sin(delta)); // Pre-fault
            const PeFault = d.map(() => 0); // During fault
            const Pme = d.map(() => Pmec); // Mechanical
            const PePost = d.map(delta => (E * V / Xpost) * Math.sin(delta)); // Post-fault

            //console.log("criticalAngle:", PePost);

            const Ppremax = (E * V / Xpre);
            const Pdurmax = 0;
            const Ppostmax = (E * V / Xpost);

            const swingCurve = Math.asin(Pmec/Ppremax) * (180/3.14);
            console.log("criticalAngle:", swingCurve);


 // Parameters
        const Time = 5;               // Total simulation time
        const T = Math.floor(Time / tStep); // Number of time steps

        let wr = new Array(T + 1).fill(0);  // Angular velocity array
        let del = new Array(T + 1).fill(swingCurve); // Angle array (initial value)
        let tt = new Array(T + 1).fill(0);       // Time array
        let Pmax = new Array(T + 1).fill(0);    // Pmax array

        const tf = Math.round((faultTime / Time) * T);  // Fault time index
        const tc = Math.round(((faultTime + clearTime)/ Time) * T); // Fault clearance time index

        // Loop to calculate wr and del over time
        for (let n = 0; n < T; n++) {
            // Set Pmax based on fault conditions
            if (n < tf) {
                Pmax[n] = Ppremax; // Before fault clearance
            } else if (n >= tf && n < tc) {
                Pmax[n] = 0;    // During fault
            } else {
                Pmax[n] = Ppostmax; // After fault clearance
            }

            // Compute intermediate steps (Runge-Kutta 2nd order)
            let k1d = ((Pmec/(2*H)) - (Pmax[n] / (2*H)) * Math.sin((del[n] * Math.PI) / 180)) * tStep;
            let k1dd = (2*3.14159*f * wr[n]) * tStep;

            let k2d = ((Pmec/(2*H))  - (Pmax[n] / (2*H)) * Math.sin(((del[n] * Math.PI) / 180) + k1dd)) * tStep;
            let k2dd = (2*3.14159*f * (wr[n] + k1d)) * tStep;

            // Update time, angular velocity, and angle
            tt[n + 1] = tt[n] + tStep;
            wr[n + 1] = wr[n] + (k1d + k2d) / 2;
            del[n + 1] = del[n] + ((180 / Math.PI) * (k1dd + k2dd)) / 2;
        }

    return {Pme, P, PeFault, PePost, del, d, tt, swingCurve};
}