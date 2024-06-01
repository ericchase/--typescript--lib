class Node:
    def __init__(self, value):
        self.left = None
        self.right = None
        self.value = value


def findCeilingFloor(node, k, floor=None, ceil=None):
    if node.value > k and node.left:
        (floor, ceil) = findCeilingFloor(node.left, k, floor, ceil)
    if node.value < k and node.right:
        (floor, ceil) = findCeilingFloor(node.right, k, floor, ceil)

    if floor == None:
        floor = node.value if node.value <= k else None
    if ceil == None:
        ceil = node.value if node.value >= k else None

    return (floor, ceil)


root = Node(8)
root.left = Node(4)
root.right = Node(12)
root.left.left = Node(2)
root.left.right = Node(6)
root.right.left = Node(10)
root.right.right = Node(14)

for i in range(16):
    print(i, findCeilingFloor(root, i))
