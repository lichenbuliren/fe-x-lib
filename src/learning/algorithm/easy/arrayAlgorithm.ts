// 解题要求：给定一个排序数组和一个目标值，在数组中找到目标值，并返回其索引。如果目标值不存在于数组中，返回它将会被按顺序插入的位置。https://leetcode.cn/leetbook/read/array-and-string/cxqdh/
// 要求时间复杂度为 O(n)
// 二分法查找
// 假定为升序
export const searchInsert = (nums: number[], target: number) => {
  // 优先判断数组最大值
  const arrLen = nums.length;
  let leftIndex = 0;
  let rightIndex = arrLen - 1;

  if (nums[rightIndex] < target) return rightIndex;
  if (nums[leftIndex] >= target) return leftIndex;

  while (leftIndex <= rightIndex) {
    const mid = Math.floor((leftIndex + rightIndex) / 2);
    // 找到，退出循环
    if (nums[mid] === target) return mid;
    if (nums[mid] < target) leftIndex = mid + 1;
    if (nums[mid] > target) rightIndex = mid - 1;
  }

  // 最终没有找到匹配的 target，因为是升序，所以这里返回 leftIndex 是合理的
  return leftIndex;
};
