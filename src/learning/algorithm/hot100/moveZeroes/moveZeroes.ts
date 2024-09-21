/**
 * Do not return anything, modify nums in-place instead.
 * 双指针解题思路
 *
 * 慢指针 index
 *
 * 快指针为数组所以
 */
export function moveZeroes(nums: number[]): void {
  let slowIndex = 0;
  const numLen = nums.length;

  for (let fast = 0; fast < numLen; fast += 1) {
    // 命中 0，直接跳过，指针不移动
    if (nums[fast] === 0) {
      // eslint-disable-next-line no-continue
      continue;
    }

    // 这里意味着至少从第二项开始
    // 并且只有当中途出现过 0 的情况下，index 才会小于 i
    // 这个时候, index 纪录的是上一个不为 0 的项的索引 + 1
    if (slowIndex < fast) {
      // 这里把当前 i 所在的项往前挪
      // eslint-disable-next-line no-param-reassign
      nums[slowIndex] = nums[fast];
    }
    // 指针移动 + 1
    slowIndex += 1;
  }

  // 最后从指针 index 开始到数据结尾，需要补充 0
  for (let i = slowIndex; i < numLen; i += 1) {
    // eslint-disable-next-line no-param-reassign
    nums[i] = 0;
  }
}
