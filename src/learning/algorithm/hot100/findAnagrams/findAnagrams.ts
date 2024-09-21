/* eslint-disable no-plusplus */
// 示例 1:

// 输入: s = "cbaebabacd", p = "abc"
// 输出: [0,6]
// 解释:
// 起始索引等于 0 的子串是 "cba", 它是 "abc" 的异位词。
// 起始索引等于 6 的子串是 "bac", 它是 "abc" 的异位词。
// 示例 2:

// 输入: s = "abab", p = "ab"
// 输出: [0,1,2]
// 解释:
// 起始索引等于 0 的子串是 "ab", 它是 "ab" 的异位词。
// 起始索引等于 1 的子串是 "ba", 它是 "ab" 的异位词。
// 起始索引等于 2 的子串是 "ab", 它是 "ab" 的异位词。

export const findAnagrams = (s: string, p: string) => {
  // 来吧来吧，按官方题解，按字母个数来
  // 原始数组
  const sArray = Array.from(s);
  // 目标数组
  const pArray = Array.from(p);
  const pStringArr = new Array(26).fill(0);
  const currentStringArr = new Array(26).fill(0);
  // 计算 a 字母在 26 个字母数组中的字符所代表的数字，后续用来计算在 26 个字母数组中的索引
  const aCode = 'a'.charCodeAt(0);
  const result: number[] = [];
  for (let i = 0; i < pArray.length; i++) {
    // 缓存好目标字符串的 26 个字母数组计数
    pStringArr[pArray[i].charCodeAt(0) - aCode]++;
  }

  // 滑动窗口左侧
  let first = 0;
  // 滑动窗口右侧
  let seconde = 0;

  while (seconde < s.length) {
    // 原始数组字母计数
    currentStringArr[sArray[seconde].charCodeAt(0) - aCode]++;

    // 右移动长度 === 目标字符串长度的时候
    if (seconde - first + 1 === p.length) {
      // 对比 26 个字母数字里面的字符模板是否相等，如果相等，说明是异位词
      if (pStringArr.join('') === currentStringArr.join('')) {
        // 结果入栈
        result.push(first);
      }

      // 如果不相等，滑动窗口左侧的字母计数 - 1，相当于被左移的那个点需要重置，否则会影响后续的判断
      currentStringArr[sArray[first].charCodeAt(0) - aCode]--;
      first++;
    }
    seconde++;
  }
  return result;
};
