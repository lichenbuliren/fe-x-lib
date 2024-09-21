import { test, expect } from 'vitest';
import { shuffleArray } from './shuffleArray';

test('shuffleArray', () => {
  const arr = [418, 11, 22, 55];
  expect(shuffleArray([418, 11, 22, 55])).not.toEqual(arr);
});
