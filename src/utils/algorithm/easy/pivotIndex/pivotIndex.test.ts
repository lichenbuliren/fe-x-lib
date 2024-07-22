import { test, expect } from 'vitest';
import { pivotIndex } from './pivotIndex';

test('test pivotIndex [1, 7, 3, 6, 5, 6]', () => {
  const nums = [1, 7, 3, 6, 5, 6];

  expect(pivotIndex(nums)).toEqual(3);
});

test('test pivotIndex [1, 2, 3]', () => {
  const nums = [1, 2, 3];

  expect(pivotIndex(nums)).toEqual(-1);
});

test('test pivotIndex [2, 1, -1]', () => {
  const nums = [2, 1, -1];

  expect(pivotIndex(nums)).toEqual(0);
});

test('test pivotIndex [-1, 1, 2, 0]', () => {
  const nums = [-1, 1, 2, 0];

  expect(pivotIndex(nums)).toEqual(2);
});

test('test pivotIndex [-5, -3, -1, 0, 4, 5]', () => {
  const nums = [-5, -3, -1, 0, 4, 5];

  expect(pivotIndex(nums)).toEqual(-1);
});
