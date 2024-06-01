export interface IBinaryHeap<T> {
  get length(): number;
  get top(): T | undefined;
  insert(value: T): void;
  remove(): T | undefined;
}
export declare class BinaryHeap<T> implements IBinaryHeap<T> {
  isOrdered: (a: T, b: T) => boolean;
  constructor(isOrdered?: (a: T, b: T) => boolean);
  get length(): number;
  get top(): T | undefined;
  insert(value: T): void;
  remove(): T | undefined;
  protected getLeftChildIndex(index: number): number;
  protected getParentIndex(index: number): number;
  protected getRightChildIndex(index: number): number;
  protected siftDown(index: number): void;
  protected siftUp(index: number): void;
  protected swap(index1: number, index2: number): void;
  protected heap: T[];
}
export declare class MaxBinaryHeap<T> extends BinaryHeap<T> implements IBinaryHeap<T> {
  constructor(isOrdered?: (a: T, b: T) => boolean);
}
export declare class MinBinaryHeap<T> extends BinaryHeap<T> implements IBinaryHeap<T> {}
