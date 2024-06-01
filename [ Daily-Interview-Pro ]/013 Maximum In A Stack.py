class MaxStack:
    def __init__(self):
        self.items = []
        self.maxes = []

    def push(self, val):
        self.maxes.append(max(val, self.maxes[-1]) if len(self.maxes) else val)
        self.items.append(val)

    def pop(self):
        self.maxes.pop()
        return self.items.pop()

    def max(self):
        return self.maxes[-1]


s = MaxStack()
s.push(1)
s.push(2)
s.push(3)
s.push(2)
print(s.max())
# 3
s.pop()
s.pop()
print(s.max())
# 2
