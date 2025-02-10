export const formatComplexNumber = (complexNumber, decimals) => {
    let real = parseFloat(complexNumber.re).toFixed(decimals);
    let imag = parseFloat(complexNumber.im).toFixed(decimals);
    return parseFloat(imag) >= 0 ? `${real} + ${imag}i` : `${real} - ${Math.abs(imag)}i`;
}

export const calculateJacobian = (numBuses, Vmag, delta, Ybus, buses) => {
    // Initialize J1, J2, J3, J4 as zero matrices
    let J1 = math.zeros(numBuses, numBuses);
    let J2 = math.zeros(numBuses, numBuses);
    let J3 = math.zeros(numBuses, numBuses);
    let J4 = math.zeros(numBuses, numBuses);

    // Calculate J1
    for (let i = 0; i < numBuses; i++) {
        for (let j = 0; j < numBuses; j++) {
            J1.set([i, j], J1.get([i, j]) - math.im(Ybus1[i][j]));
        }
    }

    // Calculate J2
    for (let i = 0; i < numBuses; i++) {
        for (let j = 0; j< numBuses; j++) {
            J2.set([i, j], J2.get([i, i]));
        }
    }

    // Calculate J3
    for (let i = 0; i < numBuses; i++) {
        for (let j = 0; j < numBuses; j++) {
            J3.set([i, j], 0); // Ensure symmetry
        }
    }

    // Calculate J4
    for (let i = 0; i < numBuses; i++) {
        for (let j = 0; j < numBuses; j++) {
            J4.set([i, j], J4.get([i, j]) - math.im(Ybus[i][j]));  
        }        
    }
    
    // Extract submatrix J11
    let pv_pq_indices = buses.map((bus, i) => bus.type !== 1 ? i : -1).filter(i => i !== -1);
    let J11 = J1.subset(math.index(pv_pq_indices, pv_pq_indices));
    // console.log("J11 :", J11);

    // Extract submatrix J22
    let pq_indices = buses.map((bus, idx) => (bus.type === 3 ? idx : -1)).filter(idx => idx !== -1);
    let J22 = J2.subset(math.index(pv_pq_indices, pq_indices));
    // console.log("J22 :", J22);

    // Extract submatrix J33
    let J33 = J3.subset(math.index(pq_indices, pv_pq_indices));
    // console.log("J33 :", J33);

    // Extract submatrix J44
    let J44 = J4.subset(math.index(pq_indices, pq_indices));
    // console.log("J44 :", J44);

    try {
        // Horizontal concatenation (along columns)
        let topRow = math.concat(J11, J22, 1);
        let bottomRow = math.concat(J33, J44, 1);

        // Vertical concatenation (along rows)
        let J = math.concat(topRow, bottomRow, 0);
        // console.log("Jacobian matrix J:", J);

        let J_inv = math.inv(J);

        return  {J, J11, J22, J33, J44};

        
    } catch (error) {
        console.error("Error in concatenating matrices:", error);
    }
}