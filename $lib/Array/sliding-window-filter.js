function* SlidingWindowFilter(arr, size, filter) {
    if (typeof filter !== "function") {
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

// examples

function containsStrictlyDescendingTriple(arr) {
    return [...SlidingWindowFilter(arr, 3, ([a, b, c]) => a > b && b > c)]
        .length;
}
function containsDescendingQuad(arr) {
    return [
        ...SlidingWindowFilter(
            arr,
            4,
            ([a, b, c, d]) => a >= b && b >= c && c >= d,
        ),
    ].length;
}
function containsRockyQuad(arr) {
    return [
        ...SlidingWindowFilter(
            arr,
            4,
            ([a, b, c, d]) => (a < b && c < d) || (a > b && c > d),
        ),
    ].length;
}
