/**
 * 解题思路：
 *
 * 滑动窗口
 * @param str
 * @returns
 */
export function lengthOfLongestSubstring(s: string): number {
  const cache = new Map();
  let max = 0;
  // 左指针 left, 又指针 i;
  for (let i = 0, left = 0; i < s.length; i += 1) {
    // 如果命中相同的字符的时候，移动左侧指针
    if (cache.has(s[i])) {
      // 找到出现重复的时候。left 的指针
      // 这里左侧指针取交大的那个，因为这里可能出现过去已经遍历过的所有字符的相同的那个，所以需要取最大值，而不能简单的 left 索引 + 1
      left = Math.max(left, cache.get(s[i]) + 1);
    }

    // i 为右指针，所以这里两个指针相减得到字串长度
    // i - left + 1 为子串长度
    // 使用 Math.max(max, ) 记录最大值
    max = Math.max(max, i - left + 1);

    // 这里记录每个字符的索引
    cache.set(s[i], i);
  }

  return max;
}
