export const calculateYbus = (buses, lines) => {

    var numBuses = buses.length;
    var numLines = lines.length;

    console.log(buses);
    console.log(lines);

    let Ybus = Array.from({ length: numBuses }, () => Array.from({ length: numBuses }, () => Math.complex(0, 0)));
    let Ybus1 = Array.from({ length: numBuses }, () => Array.from({ length: numBuses }, () => Math.complex(0, 0)));

    for (var i = 0; i < numLines; i++) {
        var from = lines[i].from - 1; // Convert to zero-based index
        var to = lines[i].to - 1; // Convert to zero-based index
        var R = lines[i].R;
        var X = lines[i].X;
        var B = lines[i].charging / 2; // Half charging admittance at each end
        var tap = lines[i].Tap; // Tap changing transformer value, 1 if no transformer
        var admittance = Math.divide(1, Math.complex(R, X));
        var admittance1 = Math.divide(1, Math.complex(0, X));
        var shuntAdmittance = Math.complex(0, B);
        if (tap > 0) {
            // Update Ybus matrix for tap-changing transformers
            var tapComplex = Math.complex(tap, 0);
            var tapSquare = Math.multiply(tapComplex, tapComplex);
            
            Ybus[from][to] = Math.subtract(Ybus[from][to], Math.multiply(admittance, tapComplex));
            Ybus[to][from] = Ybus[from][to]; // Symmetric matrix

            Ybus1[from][to] = Math.subtract(Ybus1[from][to], Math.multiply(admittance1, tapComplex));
            Ybus1[to][from] = Ybus1[from][to]; // Symmetric matrix


            var fromAdmittance = Math.add(
                Math.multiply(admittance, tap),
                Math.multiply(tap, Math.subtract(tap, 1), admittance),
                shuntAdmittance
            );

            //For from admittance without resistance-
            var fromAdmittance1 = Math.add(
                Math.multiply(admittance, tap),
                Math.multiply(tap, Math.subtract(tap, 1), admittance),
                shuntAdmittance
            );

            var toAdmittance = Math.add(
                Math.multiply(admittance, tap),
                Math.multiply(Math.subtract(1, tap), admittance),
                shuntAdmittance
            );

            //For to admittance without resistance-
            var toAdmittance1 = Math.add(
                Math.multiply(admittance, tap),
                Math.multiply(Math.subtract(1, tap), admittance),
                shuntAdmittance
            );

            // For Ybus1 (With resistance)
            Ybus[from][from] = Math.add(Ybus[from][from], fromAdmittance);
            Ybus[to][to] = Math.add(Ybus[to][to], toAdmittance);

            // For Ybus1 (Without resistance)
            Ybus1[from][from] = Math.add(Ybus1[from][from], fromAdmittance1);
            Ybus1[to][to] = Math.add(Ybus1[to][to], toAdmittance1);

        } else {
            // Regular update without tap-changing transformers
            // For Ybus (With resistance)
            Ybus[from][to] = Math.subtract(Ybus[from][to], admittance);
            Ybus[to][from] = Ybus[from][to]; // Symmetric matrix
            Ybus[from][from] = Math.add(Ybus[from][from], admittance, shuntAdmittance);
            Ybus[to][to] = Math.add(Ybus[to][to], admittance, shuntAdmittance);

            // For Ybus1 (Without resistance)
            Ybus1[from][to] = Math.subtract(Ybus1[from][to], admittance1);
            Ybus1[to][from] = Ybus1[from][to]; // Symmetric matrix
            Ybus1[from][from] = Math.add(Ybus1[from][from], admittance1, shuntAdmittance);
            Ybus1[to][to] = Math.add(Ybus1[to][to], admittance1, shuntAdmittance);

        }
    }

    console.log("Ybus1:", Ybus1);
    displayYbusMatrix();
}