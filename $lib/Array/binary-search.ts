import * as LibNumber from '../Number/utility.js';
import * as LibArray from './utility.js';

const { getEndpoints } = LibArray;
const { getMidpoint } = LibNumber.Integer;

export function binarySearch<T>(array: T[], target: T, isOrdered: (a: T, b: T) => boolean = (a: T, b: T) => a < b): number {
  let [begin, end] = getEndpoints(array);
  let middle = getMidpoint(begin, end);
  while (begin < end) {
    if (isOrdered(target, array[middle])) {
      end = middle;
    } else {
      if (!isOrdered(array[middle], target)) {
        break;
      }
      begin = middle + 1;
    }
    middle = getMidpoint(begin, end);
  }
  return middle;
}

binarySearch.lower = function <T>(array: T[], target: T, isOrdered: (a: T, b: T) => boolean = (a: T, b: T) => a < b): number {
  return binarySearch.upper(array, target, (a: T, b: T) => isOrdered(a, b) || !isOrdered(b, a)) + 1;
};

binarySearch.upper = function <T>(array: T[], target: T, isOrdered: (a: T, b: T) => boolean = (a: T, b: T) => a < b): number {
  let [begin, end] = getEndpoints(array);
  let middle = getMidpoint(begin, end);
  while (begin < end) {
    if (isOrdered(target, array[middle])) {
      end = middle;
    } else {
      begin = middle + 1;
    }
    middle = getMidpoint(begin, end);
  }
  return middle - 1;
};
