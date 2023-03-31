function getMidpoint(beg, end) {
    if ((end - beg) % 2 === 0) {
        return (beg + end) / 2;
    } else {
        return (beg + end - 1) / 2;
    }
}
export const Integers = {
    getMidpoint,
};
