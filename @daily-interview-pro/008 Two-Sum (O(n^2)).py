def two_sum(list, k):
    for i, vi in enumerate(list):
        for j, vj in enumerate(list[i:]):
            if vi + vj == k:
                return [i, j]


print(two_sum([4, 7, 1, -3, 2], 5))
