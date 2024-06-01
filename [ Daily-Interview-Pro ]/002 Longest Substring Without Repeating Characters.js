/*
Given a string, find the length of the longest substring without repeating
    characters.
*/

class Solution {
  // 19m47s
  lengthOfLongestSubstring(string) {
    /**
     * i'll want to count each character in my current substring. i assume
     * that no repeating characters is a global requirement. so 'abrka'
     * would count 'a' as repeating. which means, we can only count 'abrk'
     * and 'brka' as valid substrings. i don't think there will be any
     * tricky cases here, so a simple sliding window technique should be
     * fine. we can store each character in a set (just to be clear, i know
     * that the optimal technique for this problem is simple yet complex,
     * and i highly doubt i would be able to come up with it in an interview
     * round). so store each character into set as we come across it. if we
     * cross a character already in the set, we move the left pointer until
     * it passes the character in question (removing each of the other
     * passed characters as well). so...
     * 'a'      set = 'a'
     * 'ab'     set = 'ab'
     * 'abr'    set = 'abr'
     * 'abrk'   set = 'abrk'
     * 'abrka'  'a' already in set, record prev substring and length
     * 'brka'   move left side up until character is passed, 1 in this case
     * 'brka'   set = 'abrk'
     * 'brkaa'  'a' already in set, record prev substring and length
     * 'rkaa'   set = 'ark' moving left side up
     * 'kaa'    set = 'ak'
     * 'aa'     set = 'a'
     * 'a'      set = 'a' resume moving right side
     * 'ab'     set = 'ab'
     * 'abc'    set = 'abc' and so on
     *
     * this will require 2 phases, the progress phase, and the correction
     * phase. will need to decide how and when to record the substring and
     * length as we go
     */
    const set = new Set();
    const maxSubstrings = [];
    let l = 0;
    let r = 0;
    let correcting = false;
    while (r < string.length) {
      const char = string[r];
      if (set.has(char)) {
        const lchar = string[l];
        if (!correcting) {
          // substring(indexStart, indexEnd-excluded)
          maxSubstrings.push(string.substring(l, r));
        }
        set.delete(lchar);
        l++;
        correcting = true;
      } else {
        set.add(char);
        r++;
        correcting = false;
      }
    }
    // now we can simply pick out the maximum substring
    const longestSubstring = maxSubstrings.reduce((max, curr) => (curr.length > max.length ? curr : max));
    return longestSubstring.length;
    /**
     * this is very imperative style coding. now that we have an
     * understanding of what's going on, we could make a second attempt
     * where we focus on declarative style programming. but nah
     */
  }
}

//console.log(new Solution().lengthOfLongestSubstring('abrkaabcdefghijjxxx'))
console.log(
  new Solution().lengthOfLongestSubstring(
    'abrkaabcdefghijjxxxfasopifhsaofywenufiyseaiuofnyasdiurbesuiofvcadsygfoialnybfuiqbaynhfcpasdbfvasonufcnasopfcajmsfioasdfyas8biuyfgvsadnfcyoadcfhaisdfychnaspdfsdhyvfgabsdfuyvgasdnofidisjfvopisandubyfvsytdfvansdoiiucvfjoisdnja9osdnnyfnnisybtvfiugysidufvnasjdoipvnfjsodiufyasibudytfvauisdvtgfvasuyihbfvuiosdnfvhaisnjvaiousgbfh1234567890oklijuhygtfrdeswxcvbnm',
  ),
);
