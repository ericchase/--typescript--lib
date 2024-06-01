function two_sum(list, k) {
  const indexedDifferences = new Map([[k - list[0], 0]]);
  for (let index = 1; index < list.length; ++index) {
    const item = list[index];
    if (indexedDifferences.has(item)) {
      return [indexedDifferences.get(item), index];
    }
    indexedDifferences.set(k - item, index);
  }
  return undefined;
}

for (let i = 0; i < 15; ++i) {
  const index = i.toString(10).padStart(2);
  console.log(`${index}:  `, two_sum([4, 7, 1, -3, 2], i));
}
