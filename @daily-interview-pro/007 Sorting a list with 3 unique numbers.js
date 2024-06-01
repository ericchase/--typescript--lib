function findUnique(nums) {
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

function findEnds(nums, unique) {
  const ends = [0, 0];
  for (const n of nums) {
    if (n === unique[0]) {
      ++ends[0];
    }
    if (n === unique[1]) {
      ++ends[1];
    }
  }
  ends[1] += ends[0];
  return ends;
}

function sortNums(nums) {
  const unique = findUnique(nums).sort();
  const ends = findEnds(nums, unique);
  // replace nums
  nums.fill(unique[0], 0, ends[0]);
  nums.fill(unique[1], ends[0], ends[1]);
  nums.fill(unique[2], ends[1], nums.length);
  return nums;
}

console.log(...sortNums([3, 3, 2, 1, 3, 2, 1]));
