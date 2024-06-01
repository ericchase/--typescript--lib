class ListNode {
  constructor(initializer) {
    if (Array.isArray(initializer)) {
      const [head, ...tail] = initializer;
      this.val = head;
      let node = this;
      for (const value of tail) {
        node.next = new ListNode(value);
        node = node.next;
      }
    } else {
      this.val = initializer;
      this.next = undefined;
    }
  }
  print() {
    console.log(this.toString());
  }
  toString() {
    const arr = [];
    for (let node = this; node; node = node.next) arr.push(node.val);
    return arr.reverse().join('');
  }
}

class Solution {
  constructor() {}
  addTwoNumbers(l1, l2) {
    const head = new ListNode((l1?.val ?? 0) + (l2?.val ?? 0));
    let node = head;
    let carry = 0;
    l1 = l1.next;
    l2 = l2.next;
    while (l1 || l2) {
      if (node.val >= 10) {
        node.val = node.val - 10;
        carry = 1;
      } else carry = 0;
      node.next = new ListNode((l1?.val ?? 0) + (l2?.val ?? 0) + carry);
      node = node.next;
      l1 = l1?.next;
      l2 = l2?.next;
    }
    if (node.val >= 10) {
      node.next = new ListNode(1);
      node.val = node.val - 10;
    }
    return head;
  }
}

const l1 = new ListNode([2, 4, 3]);
const l2 = new ListNode([5, 6, 4]);
const result = new Solution().addTwoNumbers(l1, l2);
l1?.print();
l2?.print();
result?.print();
