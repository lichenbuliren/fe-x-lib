import { test, expect } from 'vitest';
import { curry } from './curry';

const sum = (a: number, b: number, c: number) => a + b + c;

test('curry functoin', () => {
  const curriedSum = curry(sum);
  expect(curriedSum).toBeTypeOf('function');
  const add1 = curriedSum(1);
  expect(add1).toBeTypeOf('function');
  const add2 = add1(2);
  expect(add2).toBeTypeOf('function');
  const result = add2(3);
  expect(result).toBe(6);

  const curriedSum2 = curry(sum);
  expect(curriedSum2(1, 2, 3)).toBe(6);

  const curriedSum3 = curry(sum);
  const addFirst = curriedSum3(1, 2);
  expect(addFirst).toBeTypeOf('function');
  expect(addFirst(3)).toBe(6);
  const d = curriedSum3();
  expect(d(1)).toBeTypeOf('function');
});
