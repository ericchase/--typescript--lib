function getLevenshteinDistance(a, b) {
    const m = a.length;
    const n = b.length;
    let t = [...Array(n + 1).keys()];
    let u = [];
    for (let i = 0; i < m; i++) {
        u = [i + 1];
        for (let j = 0; j < n; j++) {
            u[j + 1] = a[i] === b[j]
                ? t[j]
                : Math.min(t[j], t[j + 1], u[j]) + 1;
        }
        t = u;
    }
    return u[n];
}
export const Compare = {
    getLevenshteinDistance,
};
