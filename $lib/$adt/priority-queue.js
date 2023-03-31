import { BinaryHeap } from "../$ds/binary-heap.js";
class Keyed {
    constructor(key, data) {
        this.key = key;
        this.data = data;
    }
}
export class PriorityQueue {
    constructor(isOrdered = (a, b) => a < b) {
        this.isOrdered = isOrdered;
        this.key = 0;
        this.queue = new BinaryHeap((a, b) =>
            this.isOrdered(a.data, b.data) ||
            !this.isOrdered(b.data, a.data) && a.key < b.key
        );
    }
    get length() {
        return this.queue.length;
    }
    get top() {
        var _a;
        return (_a = this.queue.top) === null || _a === void 0
            ? void 0
            : _a.data;
    }
    insert(value) {
        this.queue.insert(new Keyed(this.key++, value));
    }
    remove() {
        var _a;
        return (_a = this.queue.remove()) === null || _a === void 0
            ? void 0
            : _a.data;
    }
}
export class MaxPriorityQueue extends PriorityQueue {
    constructor(isOrdered = (a, b) => a < b) {
        super((a, b) => !isOrdered(a, b) && isOrdered(b, a));
    }
}
export class MinPriorityQueue extends PriorityQueue {
}
