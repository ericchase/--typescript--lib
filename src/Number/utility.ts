// function getMidpoint(beg: number, end: number): number {
//     if ((end - beg) % 2 === 0) {
//         return (beg + end) / 2;
//     } else {
//         return (beg + end - 1) / 2;
//     }
// }
function getMidpoint(a: number, b: number): number {
  return 0 === (b - a) % 2 ? (a + b) / 2 : (a + b - 1) / 2;
}
export const Integer = {
  getMidpoint,
};
