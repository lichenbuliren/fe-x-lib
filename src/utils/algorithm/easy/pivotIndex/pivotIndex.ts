//  寻找数组的中心坐标
export const pivotIndex = (nums: number[]) => {
  const arrLen = nums.length;
  if (arrLen === 0) return -1;

  let totalSum = 0;
  let leftSum = 0;
  // 优先求出总和
  for (let i = 0; i < arrLen; i += 1) {
    totalSum += nums[i];
  }

  for (let i = 0; i < arrLen; i += 1) {
    // 总和减去当前索引的值，总值累减
    totalSum -= nums[i];

    // 如果左侧 === 右侧，找到
    if (leftSum === totalSum) return i;
    // 左侧累加
    leftSum += nums[i];
  }
  return -1;
};
