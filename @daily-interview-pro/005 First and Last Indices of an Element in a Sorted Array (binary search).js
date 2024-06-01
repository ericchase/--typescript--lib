import { binarySearch } from '../src/lib/array/binary-search.js';

// Binary Search O(log(n))
class Solution {
  getRange(arr, target) {
    const lower = binarySearch.lower(arr, target);
    const upper = binarySearch.upper(arr, target);
    return [arr[lower] === target ? lower : -1, arr[upper] === target ? upper : -1];
  }
}

function areEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;
  for (let i = 0; i < arr1.length; ++i) {
    if (arr1[i] !== arr2[i]) return false;
  }
  return true;
}

function test(arr, target, expected) {
  const actual = new Solution().getRange(arr, target);
  console.log(areEqual(actual, expected) ? 'Pass' : `Fail: [${expected}] !== [${actual}]`);
}

test(
  [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 7, 7, 7, 7, 7, 7, 7, 7, 7,
    7, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8,
  ],
  2,
  [10, 19],
);

test([1, 2, 2, 2, 2, 3, 4, 7, 8, 8], 2, [1, 4]);
test([1, 3, 3, 5, 7, 8, 9, 9, 9, 15], 9, [6, 8]);
test([100, 150, 150, 153], 150, [1, 2]);
test([1, 2, 3, 4, 5, 6, 10], 9, [-1, -1]);
test([], 0, [-1, -1]);
test(0, 0, [-1, -1]);
test([0], 0, [1, 1]); // This fails on purpose!
