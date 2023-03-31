// import { getMidpoint } from "../numbers/integers/get-midpoint.js";
import { Integer } from "../number/utility.js";
import { getEndpoints } from "./utility.js";
export function binarySearch(array, target, isOrdered = (a, b) => a < b) {
    let [begin, end] = getEndpoints(array);
    let middle = Integer.getMidpoint(begin, end);
    while (begin < end) {
        if (isOrdered(target, array[middle])) {
            end = middle;
        } else {
            if (!isOrdered(array[middle], target)) {
                break;
            }
            begin = middle + 1;
        }
        middle = Integer.getMidpoint(begin, end);
    }
    return middle;
}
binarySearch.lower = function (array, target, isOrdered = (a, b) => a < b) {
    return binarySearch.upper(
        array,
        target,
        (a, b) => isOrdered(a, b) || !isOrdered(b, a),
    ) + 1;
};
binarySearch.upper = function (array, target, isOrdered = (a, b) => a < b) {
    let [begin, end] = getEndpoints(array);
    let middle = Integer.getMidpoint(begin, end);
    while (begin < end) {
        if (isOrdered(target, array[middle])) {
            end = middle;
        } else {
            begin = middle + 1;
        }
        middle = Integer.getMidpoint(begin, end);
    }
    return middle - 1;
};
