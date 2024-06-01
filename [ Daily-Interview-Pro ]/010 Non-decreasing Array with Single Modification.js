function* SlidingWindowFilter(arr, size, filter) {
  if (typeof filter !== 'function') {
    throw new Error('Parameter `filter` must be of type "function".');
  }
  if (size <= arr.length) {
    for (let index = size; index <= arr.length; ++index) {
      const slice = arr.slice(index - size, index);
      if (filter(slice)) {
        yield { slice, begin: index - size, end: index };
      }
    }
  }
}

function containsStrictlyDescendingTriple(arr) {
  return [...SlidingWindowFilter(arr, 3, ([a, b, c]) => a > b && b > c)].length;
}
function containsDescendingQuad(arr) {
  return [...SlidingWindowFilter(arr, 4, ([a, b, c, d]) => a >= b && b >= c && c >= d)].length;
}
function containsRockyQuad(arr) {
  return [...SlidingWindowFilter(arr, 4, ([a, b, c, d]) => (a < b && c < d) || (a > b && c > d))].length;
}

// use sliding window technique
// find specific wrong ordered runs
function check(arr) {
  return Array.isArray(arr) && !containsStrictlyDescendingTriple(arr) && !containsDescendingQuad(arr) && !containsRockyQuad(arr);
}

const pass = (arr) => (check(arr) ? 0 : console.log('expected', arr, 'to pass'));
const fail = (arr) => (check(arr) ? console.log('expected', arr, 'to fail') : 0);

// not an array
fail(1);

// less than 3 items
pass([]);
pass([13]);
pass([13, 4]);

// ascending
pass([4, 5, 5]);

// simple dip
pass([13, 4, 7]);
pass([13, 13, 7]);
pass([13, 7, 7]);
pass([4, 3, 3, 5, 5]);
pass([4, 4, 6, 6, 5]);

// simple bump
pass([4, 6, 5]);
pass([4, 5, 3]);

// long dip or bump
fail([4, 4, 3, 3, 5, 5]);
fail([4, 4, 6, 6, 5, 5]);

// strictly descending triple
fail([13, 4, 1]);

// descending quad
fail([5, 5, 4, 4]);

// rocky quad
fail([4, 5, 3, 4]);
fail([4, 3, 5, 4]);
