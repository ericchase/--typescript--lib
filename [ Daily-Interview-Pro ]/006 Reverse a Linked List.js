class ListNode {
  constructor(value) {
    this.value = value;
    this.next = undefined;
  }

  static Build(values) {
    if (!values) throw "Can't make a list without values!";
    const head = new ListNode(values[0]);
    let node = head;
    for (const value of values.slice(1)) {
      node.next = new ListNode(value);
      node = node.next;
    }
    return { head, tail: node };
  }

  // Function to print the list
  print() {
    const values = [];
    for (let node = this; node !== undefined; node = node.next) {
      values.push(node.value);
    }
    console.log(values.join(' '));
  }

  // Iterative Solution
  reverseIteratively() {
    let nodeA = this;
    let nodeB = nodeA?.next;
    let nodeC = nodeB?.next;
    while (nodeA && nodeB && nodeC) {
      nodeB.next = nodeA;
      nodeA = nodeB;
      nodeB = nodeC;
      nodeC = nodeB?.next;
    }
    if (nodeA && nodeB) {
      nodeB.next = nodeA;
    }
    this.next = undefined;
  }

  // Concise Iterative Solution
  setNext(node) {
    [this.next, node] = [node, this.next];
    return node;
  }
  conciseReverseIteratively() {
    let curr = this;
    let prev = undefined;
    while (curr.next) {
      [curr, prev] = [curr.setNext(prev), curr];
    }
    this.setNext(curr.setNext(prev));
  }

  // Recursive Solution
  reverseRecursively() {
    if (!this.next) return this;
    const new_head = this.next.reverseRecursively();
    this.next.next = this;
    this.next = undefined;
    return new_head;
  }
}

// Test Program
// Initialize the test list:
const { head: testHead, tail: testTail } = ListNode.Build([4, 3, 2, 1, 0]);

console.log('Initial list: ');
testHead.print(); // 4 3 2 1 0;

//testHead.reverseIteratively();
//testHead.reverseRecursively();
testHead.conciseReverseIteratively();

console.log('List after reversal: ');
testTail.print(); // 0 1 2 3 4;
