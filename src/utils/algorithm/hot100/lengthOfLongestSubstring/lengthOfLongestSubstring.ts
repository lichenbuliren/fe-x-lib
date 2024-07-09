export function lengthOfLongestSubstring(str: string): number {
  if (str.length === 0 || str.length === 1) return str.length;
  const strArr = str.split('');

  let count = 0;
  let result = 0;
  let resultStr: string[] = [];
  for (let i = 0; i < strArr.length - 1; i += 1) {
    const cur = strArr[i];
    let j = i + 1;
    if (!resultStr.includes(cur)) {
      count += 1;
      result = Math.max(result, count);
      resultStr.push(cur);
    }

    while (j < strArr.length) {
      const subCur = strArr[j];
      if (!resultStr.includes(subCur)) {
        resultStr.push(subCur);
        count += 1;
        j += 1;
        result = Math.max(result, count);
      } else {
        count = 0;
        resultStr = [];
        break;
      }
    }
  }
  return result;
}
