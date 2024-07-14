import { test, expect } from 'vitest';
import { flattenArray } from './flattenArray';

test('flattenArray', () => {
  const arr = [1, [2, 3], 4, [5, 7], [8, [9, 0]]];

  expect(flattenArray(arr)).toEqual([1, 2, 3, 4, 5, 7, 8, 9, 0]);

  expect(flattenArray([])).toEqual([]);

  expect(flattenArray([[], []])).toEqual([]);
});
