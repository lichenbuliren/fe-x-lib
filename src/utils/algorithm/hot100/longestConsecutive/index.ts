/**
 * 题解分析：
 * 最长连续序列，要求是连续，也就是 i, i + 1, i + 2, i + n
 *
 * 思路：
 * 1. 通过 Set 集合，将数据转化为 Set 去重
 *
 * 2. 通过遍历 Set 集合，判断是否存在 has(val - 1) 来 寻找到每个集合的头部数据
 *
 * 3. 找到头部数据之后，内部 while 循环依次寻找 cur + 1 是否存在，如果存在，标记计数 + 1
 * @param nums
 * @returns
 */
export function longestConsecutive(nums: number[]): number {
  const numsSet = new Set(nums);

  let count = 0;
  let result = 0;

  // const nums = [100, 4, 200, 1, 3, 2];
  // 其中 1， 100 是头部
  numsSet.forEach((item) => {
    // 比当前小的值不存在，说明已经是头部数据了，计数 + 1
    if (!numsSet.has(item - 1)) {
      count = 1;
      let cur = item;
      // 如果有比当前数大的，说明是中部数据，继续往后寻找
      while (numsSet.has(cur + 1)) {
        count += 1;
        // 当前数累计 + 1
        cur += 1;
      }
      // 循环结束，已经到了，取最大值
      result = Math.max(result, count);
    }
  });

  return result;
}
