// make sure the movement vector has max magnitude 1
const limitInputsToUnitCircle = (x: number, y: number): {xOut: number, yOut: number} => {
    if (x === 0 || y === 0) {
        return {xOut: x, yOut: y};
    }

    return {
        xOut: (Math.sqrt(2) / 2) * x,
        yOut: (Math.sqrt(2) / 2) * y
    };
};

export {
    limitInputsToUnitCircle
}