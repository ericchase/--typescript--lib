/** Zip Up Iterable Objects
 *
 * @param ...iterables: objects that implement the Symbol.iterator function
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols
 */
export declare function zip<T>(
    ...iterables: Iterable<T>[]
): Generator<(T | undefined)[]>;
