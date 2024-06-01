function merge(a) {
  const d = [],
    b = Array(1e4);
  for (var c = 0; c < a.length; ++c) {
    for (let e = a[c][0]; e < a[c][1]; ++e) b[e] = 1;
    1 !== b[a[c][1]] && (b[a[c][1]] = 0);
  }
  a = 0;
  a: for (; a < b.length; ) {
    if (0 === b[a]) {
      d.push([a, a]);
      ++a;
      continue a;
    }
    for (; void 0 === b[a]; ++a) if (a === b.length) break a;
    for (c = a; 0 !== b[a]; ++a) if (a === b.length) break a;
    d.push([c, a]);
    ++a;
  }
  return d;
}
