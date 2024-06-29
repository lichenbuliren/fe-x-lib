export function groupAnagrams(strs: string[]): string[][] {
  const strMap: { [x: string]: string[] } = {};
  for (let i = 0; i < strs.length; i += 1) {
    const cur = strs[i];
    // 按照字母排序，生成 key
    const sortKey = cur.split('').sort().join('');
    // 将当前单次入栈
    const subResult = [cur];
    if (strMap[sortKey]) {
      // 如果有相同的 key，则 push 入栈
      strMap[sortKey].push(cur);
    } else {
      // 新的 key
      strMap[sortKey] = subResult;
    }
  }

  return Object.values(strMap);
}
