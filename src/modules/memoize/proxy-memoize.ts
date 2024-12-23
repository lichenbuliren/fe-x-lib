/* eslint-disable no-plusplus */
/* eslint-disable @typescript-eslint/no-explicit-any */

export const memoize = (fn: (...args: any[]) => any) => {
  const cache = new Map();
  return new Proxy(fn, {
    apply(target, thisArg, argsList) {
      const cacheKey = argsList.toString();
      if (!cache.has(cacheKey)) cache.set(cacheKey, target.apply(thisArg, argsList));
      return cache.get(cacheKey);
    },
  });
};

const fibonacci = (n: number): number => (n <= 1 ? 1 : fibonacci(n - 1) + fibonacci(n - 2));
const memoizedFibonacci = memoize(fibonacci);

for (let i = 0; i < 100; i++) fibonacci(30); // ~5000ms
for (let i = 0; i < 100; i++) memoizedFibonacci(30);
