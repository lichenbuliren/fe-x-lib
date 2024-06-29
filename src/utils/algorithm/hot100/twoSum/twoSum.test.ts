import { expect, test } from 'vitest';
import { twoSum } from './twoSum';

test('adds 1 + 2 to equal 3', () => {
  expect(twoSum([2, 7, 11, 15], 9)).toStrictEqual([0, 1]);
});
