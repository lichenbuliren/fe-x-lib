import { test, expect } from 'vitest';
import { findAnagrams } from './findAnagrams';

test('s = "cbaebabacd", p = "abc"', () => {
  expect(findAnagrams('cbaebabacd', 'abc')).toEqual([0, 6]);
});

test('s = "abab", p = "ab"', () => {
  expect(findAnagrams('abab', 'ab')).toEqual([0, 1, 2]);
});
