def two_sum(list, k):
    map = {k - list[0]: 0}
    for i, v in enumerate(list[1:]):
        if v in map:
            return [map[v], i + 1]
        map[k - v] = i + 1


for i in range(15):
    print(i, ":", two_sum([4, 7, 1, -3, 2], i))
