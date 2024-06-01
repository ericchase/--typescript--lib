class Solution {
  isValid(string) {
    const bracketMap = new Map(['()', '[]', '{}'].map((_) => _.split('')));
    const openBrackets = Array.from(bracketMap.keys());
    const stack = [];
    for (const char of string) {
      if (openBrackets.includes(char)) {
        stack.push(char);
      } else if (bracketMap.get(stack.pop()) !== char) {
        return false;
      }
    }
    return stack.length === 0;
  }
}

console.log('Test Case 1:', new Solution().isValid('()(){(())') === false ? 'Pass' : 'Fail');
console.log('Test Case 2:', new Solution().isValid('') === true ? 'Pass' : 'Fail');
console.log('Test Case 3:', new Solution().isValid('([{}])()') === true ? 'Pass' : 'Fail');
console.log('Test Case 4:', new Solution().isValid('(') === false ? 'Pass' : 'Fail');
console.log('Test Case 5:', new Solution().isValid('[]') === true ? 'Pass' : 'Fail');
