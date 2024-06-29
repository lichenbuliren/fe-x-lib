export function twoSum(nums: number[], target: number) {
  const diffMap: { [x: number]: number } = {};
  for (let i = 0; i < nums.length; i += 1) {
    const current = nums[i];
    const diff = target - current;
    if (diffMap[diff] !== undefined) {
      return [diffMap[diff], i];
    }
    diffMap[current] = i;
  }
  return null;
}
