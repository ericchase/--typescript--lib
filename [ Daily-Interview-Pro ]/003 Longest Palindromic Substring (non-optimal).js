// A palindrome is a sequence of characters that reads the same backwards and
// forwards. Given a string, s, find the longest palindromic substring in s.

/*

first thought is possibly a sliding window technique
storing each character in a map could filter out substrings that cannot be palindromes
but that would still require multiple iterations

considering a string that has 2 palindromes, approaching from both sides wouldn't work

if we map each character to its index and then iterate in reverse
t 0
r 1 7
a 2 6
c 3 5
e 4
s 8

s,8 - no other match
r,7 - matches at 1, start second iterator here and go in reverse
a,6 - matches at 2
c,5 - matches at 3
e,4 - no match, if both iterators meet, is a palindrome
if the matches break anywhere inbetween, not a palindrome, look for next match

this is really complicated, but i think it can work

aye, got it to work, but obviously not a great solution for complex inputs

this probably really requires a dynamic programming solution, which is basically
just a lot of memoization. we could keep adding memo to this solution, but it would
be faster to just think up a DP solution instead

*/

// O(n) where n = j-i
function testForPalindrome(chars, i, j) {
  while (i < j) {
    console.log(' ', i, j);
    if (chars[i] !== chars[j]) {
      return false;
    }
    ++i;
    --j;
  }
  return true;
}

//console.log(testForPalindrome("tracecars", 2, 6));

// ~30 minutes??
// time complexity??
class Solution {
  longestPalindrome(string) {
    if (!string || string.length < 2) {
      return string;
    }

    const chars = string.split('');

    // map char to index
    const map = new Map();

    // The entries() method returns a new Array Iterator object that
    // contains the key/value pairs for each index in the array.

    // O(n) where n = string.length
    for (const [i, c] of chars.entries()) {
      if (map.has(c)) {
        map.set(c, [...map.get(c), i]);
      } else {
        map.set(c, [i]);
      }
    }

    const palindromes = [];

    // O(not good) complex
    let stop_index = chars.length;
    for (let l_index = 0; l_index < chars.length; ++l_index) {
      const c = chars[l_index];
      const indices = map.get(c);
      for (const r_index of indices) {
        console.log(c, l_index, r_index, stop_index);
        if (l_index < r_index) {
          if (r_index < stop_index) {
            if (testForPalindrome(chars, l_index, r_index)) {
              palindromes.push(string.substring(l_index, r_index + 1));
              l_index = r_index;
              stop_index = chars.length;
            } else {
              stop_index = l_index + (r_index - l_index) / 2;
            }
            break;
          }
        }
      }
    }

    if (palindromes.length) {
      const maxPalindrome = palindromes.reduce((max, cur) => (cur.length > max.length ? cur : max));
      return maxPalindrome;
    } else {
      return string[0];
    }
  }
}

// Test program
function test(string, expected) {
  const actual = new Solution().longestPalindrome(string);
  console.log(actual === expected ? 'pass' : 'fail');
}
test('racegcarracegcarracegcarracegcar', '');
//test("", "");
//test("g", "g");
//test("tracecars", "racecar");
//test("million", "illi");
//test("tracecarsmillion", "racecar");
//test("aaaabbaa", "abba");
//test("abc", "a");
//test("forgeeksskeegfor", "geeksskeeg");
//test("Geeks", "ee");
//test("tracecarsforgeeksskeegforaaaabbaaGeekstracecarsmillion", "geeksskeeg");
