export const autofillSixLines = () => {

    let numLines = 6;
    let lines = [];
    let defaultFromBus = [1, 1, 2, 3, 3, 4];
    let defaultToBus = [2, 5, 3, 4, 5, 5];
    let defaultR = [0.042, 0.031, 0.031, 0.024, 0.053, 0.063];
    let defaultX = [0.168, 0.126, 0.126, 0.136, 0.210, 0.252];
    let defaultCharging = [0.082, 0.062, 0.062, 0.164, 0.102, 0.122];
    let defaultTap = [0, 0, 0, 0, 0, 0];
    let defaultSmax = Array(numLines).fill(100);
    
    for (var i = 0; i < numLines; i++) {
        lines.push({
            from: defaultFromBus[i],
            to: defaultToBus[i],
            R:defaultR[i],
            X: defaultX[i],
            charging: defaultCharging[i],
            Tap: defaultTap[i],
            Smax: defaultSmax[i]
        });
    }
    return lines;
    
}

export const autofillTwentyLines = () => {

    let numLines = 20;
    let lines = [];
    let defaultFromBus = [1, 1, 2, 2, 2, 3, 4, 4, 4, 5, 6, 6, 6, 7, 7, 9, 9, 10, 12, 13];
    let defaultToBus = [2, 5, 3, 4, 5, 4, 5, 7, 9, 6, 11, 12, 13, 8, 9, 10, 14, 11, 13, 14];
    let defaultR = [0.0194, 0.054, 0.047, 0.0581, 0.0569, 0.067, 0.0134, 0, 0, 0, 0.095, 0.1229, 0.0661, 0, 0, 0.0318, 0.127, 0.082, 0.2209, 0.1709];
    let defaultX = [0.0592, 0.223, 0.1979, 0.1763, 0.1738, 0.171, 0.0421, 0.209, 0.5562, 0.2522, 0.1989, 0.2557, 0.1302, 0.1762, 0.011, 0.0845, 0.2703, 0.192, 0.1999, 0.3479];
    let defaultCharging = [0.1056, 0.984, 0.0876, 0.0748, 0.0678, 0.0692, 0.0256, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    let defaultTap = [0, 0, 0, 0, 0, 0, 0, 0.978, 0.969, 0.932, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    let defaultSmax = Array(numLines).fill(250);
    
    for (var i = 0; i < numLines; i++) {
        lines.push({
            from: defaultFromBus[i],
            to: defaultToBus[i],
            R:defaultR[i],
            X: defaultX[i],
            charging: defaultCharging[i],
            Tap: defaultTap[i],
            Smax: defaultSmax[i]
        });
    }
    return lines;

}

export const initializeLineData = (numLines) => {
    let lines = [];
    for (let i = 0; i<numLines; i++) {
        lines.push({
            from: 0,
            to: 0,
            R: 0,
            X: 0,
            charging: 0,
            Tap: 0,
            Smax: 100
        });
    }
    return lines;
}