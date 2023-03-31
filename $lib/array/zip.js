/** Zip Up Iterable Objects
 *
 * @param ...iterables: objects that implement the Symbol.iterator function
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols
 */
export function* zip(...iterables) {
    let fakedCount = 0;
    const faker = {
        next(...args) {
            return {
                value: undefined,
            };
        },
        [Symbol.iterator]() {
            return this;
        },
    };
    function getFaker() {
        ++fakedCount;
        return faker;
    }
    function process(iterators) {
        const values = [];
        let index = 0;
        while (index < iterators.length) {
            const iterator = iterators[index];
            const next = iterator.next();
            if ("done" in next && next.done) {
                iterators[index] = getFaker();
            }
            values.push("value" in next ? next.value : undefined);
            ++index;
        }
        return values;
    }
    const iterators = iterables
        .map((iterable) =>
            iterable !== null && iterable !== void 0 ? iterable : getFaker()
        )
        .map((iterable) => Symbol.iterator in iterable ? iterable : getFaker())
        .map((iterable) => {
            var _a;
            return (_a = iterable[Symbol.iterator]()) !== null && _a !== void 0
                ? _a
                : getFaker();
        })
        .map((iterator) => "next" in iterator ? iterator : getFaker());
    let values = process(iterators);
    while (fakedCount < iterators.length) {
        yield values;
        values = process(iterators);
    }
}
