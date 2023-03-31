export declare function binarySearch<T>(
    array: T[],
    target: T,
    isOrdered?: (a: T, b: T) => boolean,
): number;
export declare namespace binarySearch {
    var lower: <T>(
        array: T[],
        target: T,
        isOrdered?: (a: T, b: T) => boolean,
    ) => number;
    var upper: <T>(
        array: T[],
        target: T,
        isOrdered?: (a: T, b: T) => boolean,
    ) => number;
}
