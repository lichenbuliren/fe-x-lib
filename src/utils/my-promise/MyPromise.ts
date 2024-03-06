/**
 * 模拟 Promise 实现
 */

enum PromiseState {
  Pending = 'Pending',
  Fulfilled = 'Fulfilled',
  Rejected = 'Rejected',
}

type ResolveHandle<T> = (value: T) => void;
type RejectHandle = (reason: unknown) => void;

type Executor<T> = (resolve: ResolveHandle<T>, reject: RejectHandle) => void;

export class MyPromise<T> {
  private state: PromiseState = PromiseState.Pending;

  private value: T | undefined;

  private reason: unknown = undefined;

  /**
   * 当状态到达终态的时候，需要执行所有已经注册的回调函数
   * @param state PromiseState
   */
  private changeState(state: PromiseState) {
    this.state = state;
    if (this.state === PromiseState.Fulfilled) {
      this.onFulfilledCallbacks.forEach((handle) => handle(this.value as T));
    }

    if (this.state === PromiseState.Rejected) {
      this.onRejectedCallbacks.forEach((handle) => handle(this.reason));
    }
  }

  private onFulfilledCallbacks: ((value: T) => void)[] = [];

  private onRejectedCallbacks: ((reason: unknown) => void)[] = [];

  constructor(executor: Executor<T>) {
    this.state = PromiseState.Pending;
    this.value = undefined;
    this.reason = undefined;

    const resolve = (value: T) => {
      if (this.state === PromiseState.Fulfilled) return;
      this.value = value;
      this.changeState(PromiseState.Fulfilled);
    };

    const reject = (reason: unknown) => {
      if (this.state === PromiseState.Rejected) return;
      this.reason = reason;
      this.changeState(PromiseState.Rejected);
    };

    executor(resolve, reject);
  }

  /**
   * return new MyPromise instance
   */
  then<U>(onFulfilledHandle?: (value: T | undefined) => U | null, onRejctedHandle?: RejectHandle | null) {
    return new MyPromise((resolve, reject) => {
      // 这里需要等待主 Promise 状态变更到终态
      if (this.state === PromiseState.Fulfilled) {
        if (typeof onFulfilledHandle !== 'function') {
          resolve(this.value);
          return;
        }

        setTimeout(() => {
          try {
            const result = onFulfilledHandle(this.value);
            resolve(result);
          } catch (error) {
            reject(error);
          }
        });
      }

      if (this.state === PromiseState.Rejected) {
        if (typeof onRejctedHandle !== 'function') {
          reject(this.reason);
          return;
        }

        setTimeout(() => {
          try {
            const result = onRejctedHandle(this.reason);
            resolve(result as U);
          } catch (error) {
            reject(error);
          }
        }, 0);
      }

      // 一个 promise 可以注册多个 then 方法
      // const promise = new Promsie();
      // promise.then(); promise.then();
      if (this.state === PromiseState.Pending) {
        if (typeof onFulfilledHandle === 'function') {
          this.onFulfilledCallbacks.push((value) => {
            setTimeout(() => {
              try {
                const result = onFulfilledHandle(value);
                resolve(result as U);
              } catch (error) {
                reject(error);
              }
            }, 0);
          });
        }

        if (typeof onRejctedHandle === 'function') {
          this.onRejectedCallbacks.push((reason) => {
            setTimeout(() => {
              try {
                const result = onRejctedHandle(reason);
                resolve(result as U);
              } catch (error) {
                reject(error);
              }
            }, 0);
          });
        }
      }
    });
  }
}

const promise = new Promise<number>((resolve) => {
  resolve(1);
});

promise
  .then((val) => {
    console.log('then1 call', val);
    return val + 1;
  })
  .then((val) => {
    console.log('then2 call', val);
    return val + 1;
  });
