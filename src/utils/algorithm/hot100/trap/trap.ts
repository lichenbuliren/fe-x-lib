export function trap(height: number[]): number {
  let result: number = 0;
  let leftIndex: number = 0;
  let rightIndex: number = height.length - 1;

  // 左边木板高度，默认等于第一项
  let leftMax: number = height[0];
  // 右边木板高度，默认等于数组默认项
  let rightMax: number = height[height.length - 1];

  // 从左右两边开始移动
  while (leftIndex < rightIndex) {
    // 记录左边最高的那块木板
    // 木板高度
    leftMax = Math.max(leftMax, height[leftIndex]);

    // 纪录右边最高的那块木板
    rightMax = Math.max(rightMax, height[rightIndex]);

    // 左边木板高度小于右边，则使用左边统计
    if (leftMax < rightMax) {
      result += leftMax - height[leftIndex];
      leftIndex += 1;
    } else {
      result += rightMax - height[rightIndex];
      rightIndex -= 1;
    }
  }

  return result;
}
