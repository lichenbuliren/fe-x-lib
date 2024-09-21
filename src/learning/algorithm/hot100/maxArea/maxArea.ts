/**
 * n == height.length
 * 2 <= n <= 105
 * 0 <= height[i] <= 104
 * @param nums
 */
export const maxArea = (nums: number[]) => {
  let i = 0;
  let j = nums.length - 1;

  let area = 0;
  while (i < j) {
    const curArea = Math.min(nums[i], nums[j]) * (j - i);
    area = Math.max(area, curArea);
    if (nums[i] < nums[j]) {
      i += 1;
    } else {
      j -= 1;
    }
  }
  return area;
};
