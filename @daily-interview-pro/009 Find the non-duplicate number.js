// O(n)|O(1)
function singleNumber(nums) {
  return nums.reduce((bin, cur) => bin ^ cur);
}

console.log(singleNumber([1, 2, 3, 4, 1, 3, 4]));
