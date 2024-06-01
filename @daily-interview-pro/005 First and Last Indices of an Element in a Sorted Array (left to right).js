// Left to Right

class Solution {
  getRange(arr, target) {
    const range = [-1, -1];
    let index = 0;
    for (; index < arr.length; ++index) {
      if (arr[index] === target) {
        range[0] = range[1] = index;
        break;
      }
    }
    for (; index < arr.length; ++index) {
      if (arr[index] !== target) {
        range[1] = index - 1;
        break;
      }
    }
    return range;
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

test([1, 2, 2, 2, 2, 3, 4, 7, 8, 8], 2, [1, 4]);
test([1, 3, 3, 5, 7, 8, 9, 9, 9, 15], 9, [6, 8]);
test([100, 150, 150, 153], 150, [1, 2]);
test([1, 2, 3, 4, 5, 6, 10], 9, [-1, -1]);
test([0], 0, [1, 1]); // This fails on purpose!
