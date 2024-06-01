function findUniques(nums) {
  const unique = [];
  for (const n of nums) {
    if (!unique.includes(n)) {
      unique.push(n);
      if (unique.length === 3) {
        break;
      }
    }
  }
  return unique;
}

function moveTarget(nums, start, target) {
  for (let curr = start; curr < nums.length; ++curr) {
    if (nums[curr] === target) {
      [nums[start], nums[curr]] = [nums[curr], nums[start]];
      ++start;
    }
  }
  return start;
}

function sortNums(nums) {
  const uniques = findUniques(nums).sort();
  let start = 0;
  start = moveTarget(nums, 0, uniques[0]);
  start = moveTarget(nums, start, uniques[1]);
  start = moveTarget(nums, start, uniques[2]);
  return nums;
}

console.log(...sortNums([3, 3, 2, 1, 3, 2, 1]));
