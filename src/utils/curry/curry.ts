/* eslint-disable @typescript-eslint/no-explicit-any */

// 从集合 T 里面，排除 U
// 这个类型是关键
type TailN<T extends any[], U extends any[]> = [T, U] extends [[any, ...infer RT], [any, ...infer RU]]
  ? TailN<RT, RU>
  : T;

// TailN<A, P> extends infer TN extends any[] ? (0 extends TN['length'] ? R : Curry<TN, R>) : never
// 1. 从参数集合 A 中，排除当前 curried 参数 P, 得到的结果 TN
// 2. TN 如果还有多个参数的话，
// 2.1 TN 长度为 0，代表没有剩余参数了，那么函数返回值为 R
// 2.2 否则继续返回值为剩余的参数 Curry<TN, R>
interface Curry<A extends any[], R> {
  <P extends Partial<A>>(
    ...x: P & Partial<A>
  ): TailN<A, P> extends infer TN extends any[] ? (0 extends TN['length'] ? R : Curry<TN, R>) : never;
}

export const curry = <P extends any[], R>(fn: (...args: P) => R): Curry<P, R> => {
  const curried = (...prevArgs: any[]): any => {
    if (prevArgs.length === fn.length) return fn(...(prevArgs as P)) as R;
    return ((...nextArgs: any[]) => curried(...prevArgs, ...nextArgs)) as Curry<P, R>;
  };

  return curried as Curry<P, R>;
};
