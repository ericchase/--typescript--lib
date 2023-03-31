export function areEqual(arrayA, arrayB) {
    if (arrayA.length !== arrayB.length) {
        return false;
    }
    for (let i = 0; i < arrayA.length; ++i) {
        if (arrayA[i] !== arrayB[i]) {
            return false;
        }
    }
    return true;
}
export function getEndpoints(array) {
    if (!Array.isArray(array) || array.length < 1) {
        return [-1, -1];
    }
    return [0, array.length];
}
