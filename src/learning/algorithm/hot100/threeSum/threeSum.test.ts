import { expect, test } from 'vitest';
import { threeSum } from './threeSum';

test('[-1,0,1,2,-1,-4] => [[-1,-1,2],[-1,0,1]]', () => {
  const nums = [-1, 0, 1, 2, -1, -4];
  expect(threeSum(nums)).toEqual([
    [-1, -1, 2],
    [-1, 0, 1],
  ]);
});

test('[0,1,1] => []', () => {
  const nums = [0, 1, 1];
  expect(threeSum(nums)).toEqual([]);
});
test('[-1,0,1,2,-1,-4,-2,-3,3,0,4] => [[-4,0,4],[-4,1,3],[-3,-1,4],[-3,0,3],[-3,1,2],[-2,-1,3],[-2,0,2],[-1,-1,2],[-1,0,1]]', () => {
  const nums = [-1, 0, 1, 2, -1, -4, -2, -3, 3, 0, 4];
  expect(threeSum(nums).length).toEqual(
    [
      [-4, 0, 4],
      [-4, 1, 3],
      [-3, -1, 4],
      [-3, 0, 3],
      [-3, 1, 2],
      [-2, -1, 3],
      [-2, 0, 2],
      [-1, -1, 2],
      [-1, 0, 1],
    ].length,
  );
});
