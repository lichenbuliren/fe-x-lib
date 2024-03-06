import { describe, expect, vi } from 'vitest';
import { MyPromise } from './MyPromise';

describe('unit test MyPromise', () => {
  test('MyPromise contructor resolve', () => {
    const mockFn = vi.fn();
    const myPromise = new MyPromise((resolve) => {
      mockFn();
      resolve('myPromise resolve');
    });

    expect(myPromise).toBeInstanceOf(MyPromise);
    expect(mockFn).toBeCalled();
  });

  test('MyPromise contructor reject', () => {
    const myPromise = new MyPromise((_resolve, reject) => {
      reject('myPromise reject');
    });

    expect(myPromise).toBeInstanceOf(MyPromise);
  });
});
