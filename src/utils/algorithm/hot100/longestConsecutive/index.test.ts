import { expect, test } from 'vitest';
import { longestConsecutive } from './index';

test('[100, 4, 200, 1, 3, 2] => 4', () => {
  const nums = [100, 4, 200, 1, 3, 2];
  const result = longestConsecutive(nums);
  expect(result).toBe(4);
});

test('[100, 4, 200, 1, 3, 2] => 4', () => {
  const nums = [0, 1, 2, 3, 6, 7, 10, 12, 13, 14, 100, 5, 8, 9];
  const result = longestConsecutive(nums);
  // [5, 6, 7, 8, 9, 10]
  expect(result).toBe(6);
});
