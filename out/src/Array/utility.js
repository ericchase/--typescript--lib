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
export function* generateSlidingWindowFilter(array, size, filter) {
  if (typeof filter !== 'function') {
    throw new Error('Parameter `filter` must be of type "function".');
  }
  if (size <= array.length) {
    for (let index = size; index <= array.length; ++index) {
      const slice = array.slice(index - size, index);
      if (filter(slice)) {
        yield { slice, begin: index - size, end: index };
      }
    }
  }
}
export function* generateChunks(array, size) {
  if (size <= array.length) {
    for (let index = size; index <= array.length; index += size) {
      const slice = array.slice(index - size, index);
      yield { slice, begin: index - size, end: index };
    }
  }
}
