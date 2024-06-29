import { expect, test } from 'vitest';
import { groupAnagrams } from './index';

// 输入: strs = ["eat", "tea", "tan", "ate", "nat", "bat"]
// 输出: [["bat"],["nat","tan"],["ate","eat","tea"]]
// 示例 2:

// 输入: strs = [""]
// 输出: [[""]]
// 示例 3:

// 输入: strs = ["a"]
// 输出: [["a"]]

test('case 1', () => {
  const strs = ['eat', 'tea', 'tan', 'ate', 'nat', 'bat'];
  expect(groupAnagrams(strs)).toStrictEqual([['eat', 'tea', 'ate'], ['tan', 'nat'], ['bat']]);
});

test('case 2', () => {
  const strs = [''];
  expect(groupAnagrams(strs)).toStrictEqual([['']]);
});

test('case 3', () => {
  const strs = ['a'];
  expect(groupAnagrams(strs)).toStrictEqual([['a']]);
});
