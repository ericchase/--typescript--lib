function two_sum(list, k) {
  const differences = new Set([k - list[0]]);
  for (const item of list.slice(1)) {
    if (differences.has(item)) return true;
    differences.add(k - item);
  }
  console.log(differences);
  return false;
}

console.log(two_sum([4, 7, 1, -3, 2], 5));
