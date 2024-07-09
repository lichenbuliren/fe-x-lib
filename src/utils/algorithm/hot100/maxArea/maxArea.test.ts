import { expect, test } from 'vitest';
import { maxArea } from './maxArea';

test('maxArea with [1,8,6,2,5,4,8,3,7]', () => {
  const nums = [1, 8, 6, 2, 5, 4, 8, 3, 7];
  const area = maxArea(nums);
  expect(area).toEqual(49);
});

test('maxArea with [1,1]', () => {
  const nums = [1, 1];
  const area = maxArea(nums);
  expect(area).toEqual(1);
});
