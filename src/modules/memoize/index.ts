/* eslint-disable @typescript-eslint/no-explicit-any */
const memoize = (fn: (...args: any[]) => any) => {
  const cache = new Map();
  const cached = (val: unknown) => {
    if (!cache.has(val)) cache.set(val, fn);
    return cache.get(val);
  };
  cached.cache = cache;
  return cached;
};

// This function is slow and will benefit from memoization
const anagrams = (str: string): string[] => {
  if (str.length <= 2) return str.length === 2 ? [str, str[1] + str[0]] : [str];
  return str
    .split('')
    .reduce<
      string[]
    >((acc, letter, i) => acc.concat(anagrams(str.slice(0, i) + str.slice(i + 1)).map((val) => letter + val)), []);
};

const anagramsCached = memoize(anagrams);

anagramsCached('javascript');
// takes a long time
anagramsCached('javascript');
// returns virtually instantly since it's cached
