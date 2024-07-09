/**
 * 思路：统计 + 去重
 * 统计：双指针
 * 定值、左右值
 * 判断三者之和大于小于等于0
 *  - 大于0 右值左移
 *  - 小于0 左值右移
 *  - 等于0 推入
 * 定值右移循环继续
 *
 */
// 统计
export function threeSum(nums: number[]): number[][] {
  const result: number[][] = [];
  const len = nums.length;
  if (nums === null || len < 3) return result;
  nums.sort((a, b) => a - b);
  for (let i = 0; i < len; i += 1) {
    // 最左侧必须有负数，否则无答案
    if (nums[i] > 0) break;

    // 左侧定值之后且大于 0，如果左右两个数相等，那么继续移动
    // eslint-disable-next-line no-continue
    if (i > 0 && nums[i] === nums[i - 1]) continue;
    // 左侧指针
    let l = i + 1;
    // 右侧指针
    let r = len - 1;
    // 双指针移动
    while (l < r) {
      const sum = nums[i] + nums[l] + nums[r];
      if (sum === 0) {
        result.push([nums[i], nums[l], nums[r]]);
        // 过滤掉重复的 nums[l]，省去了对结果二次过滤的计算
        while (l < r && nums[l] === nums[l + 1]) l += 1;
        while (l < r && nums[r] === nums[r - 1]) r -= 1;
        l += 1;
        r -= 1;
      } else if (sum < 0) {
        l += 1;
      } else if (sum > 0) {
        r -= 1;
      }
    }
  }
  return result;
}
