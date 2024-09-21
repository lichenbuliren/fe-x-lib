/* eslint-disable @typescript-eslint/no-explicit-any */

// 从集合 T 里面，排除 U
type TailN<T extends any[], U extends any[]> = [T, U] extends [[any, ...infer RT], [any, ...infer RU]]
  ? TailN<RT, RU>
  : T;

interface Curry<A extends any[], R> {
  <P extends Partial<A>>(
    ...x: P & Partial<A>
  ): TailN<A, P> extends infer TN extends any[] ? (0 extends TN['length'] ? R : Curry<TN, R>) : never;
}

export function curry<A extends any[], R>(fn: (...args: A) => R): Curry<A, R>;
export function curry(fn: (...args: any) => any) {
  return (...x: any) => (fn.length === x.length ? fn(...x) : curry(fn.bind(undefined, ...x)));
}
