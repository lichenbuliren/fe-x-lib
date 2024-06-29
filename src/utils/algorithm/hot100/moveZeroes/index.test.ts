import { expect, test } from 'vitest';
import { moveZeroes } from './index';

test('[0,1,0,3,12] => [1, 3, 12, 0, 0]', () => {
  const nums = [0, 1, 0, 3, 12];
  moveZeroes(nums);
  expect(nums).toEqual([1, 3, 12, 0, 0]);
});
