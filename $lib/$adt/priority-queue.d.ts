import { type IBinaryHeap } from "../$ds/binary-heap.js";
export type IPriorityQueue<T> = IBinaryHeap<T>;
declare class Keyed<T> {
    key: number;
    data: T;
    constructor(key: number, data: T);
}
export declare abstract class PriorityQueue<T> implements IPriorityQueue<T> {
    isOrdered: (a: T, b: T) => boolean;
    constructor(isOrdered?: (a: T, b: T) => boolean);
    get length(): number;
    get top(): T | undefined;
    private key;
    insert(value: T): void;
    remove(): T | undefined;
    protected queue: IBinaryHeap<Keyed<T>>;
}
export declare class MaxPriorityQueue<T> extends PriorityQueue<T>
    implements IPriorityQueue<T> {
    constructor(isOrdered?: (a: T, b: T) => boolean);
}
export declare class MinPriorityQueue<T> extends PriorityQueue<T>
    implements IPriorityQueue<T> {
}
export {};
