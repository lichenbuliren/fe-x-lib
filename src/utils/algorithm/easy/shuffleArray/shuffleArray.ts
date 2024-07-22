/* eslint-disable no-plusplus */
export function shuffleArray<T>(array: T[]): T[] {
  const shuffledArray = [...array]; // 创建一个副本，以免修改原始数组

  // 倒序
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    // 获得随机索引 j， 0 < j < i + 1
    // 核心算法，如何获取随机数，并保证每个元素都有可能出现
    const j = Math.floor(Math.random() * (i + 1));
    // temp array to the result
    const tempArr = [shuffledArray[j], shuffledArray[i]];
    // 解构赋值，把当前的值给随机出来的值互换
    [shuffledArray[i], shuffledArray[j]] = tempArr;
    // shuffledArray[i] = shuffledArray[j];
    // shuffledArray[j] = shuffledArray[i];
  }

  console.log(shuffledArray); // 输出：随机排序后的数组
  return shuffledArray;
}
