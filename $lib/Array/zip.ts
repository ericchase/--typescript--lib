/** Zip Up Iterable Objects
 *
 * @param ...iterables: objects that implement the Symbol.iterator function
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols
 */
export function* zip<T>(
    ...iterables: Iterable<T>[]
): Generator<(T | undefined)[]> {
    let fakedCount = 0;
    const faker: IterableIterator<undefined> = {
        next(...args: [] | [undefined]) {
            return {
                value: undefined,
            };
        },
        [Symbol.iterator]() {
            return this;
        },
    };
    function getFaker(): IterableIterator<undefined> {
        ++fakedCount;
        return faker;
    }
    function process(
        iterators: (Iterator<T> | Iterator<unknown>)[],
    ): (T | undefined)[] {
        const values: (T)[] = [];
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
        .map((iterable) => iterable ?? getFaker())
        .map((iterable) => Symbol.iterator in iterable ? iterable : getFaker())
        .map((iterable) => iterable[Symbol.iterator]() ?? getFaker())
        .map((iterator) => "next" in iterator ? iterator : getFaker());
    let values = process(iterators);
    while (fakedCount < iterators.length) {
        yield values;
        values = process(iterators);
    }
}
