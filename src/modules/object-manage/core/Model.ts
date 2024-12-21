/* eslint-disable @typescript-eslint/no-explicit-any */
import { RecordSet } from './RecordSet';

class Model {
  static instances: Record<string, RecordSet<any>> = {};

  constructor() {
    const modelName = this.constructor.name; // 当前类名

    // 如果不存在当前类的实例集合，创建一个空的 RecordSet
    if (!Model.instances[modelName]) {
      Model.instances[modelName] = new RecordSet();
    }

    // 将当前实例添加到对应的 RecordSet
    Model.instances[modelName].push(this);
  }

  static all<T extends Model>(this: new (...args: any[]) => T): RecordSet<T> {
    const modelName = this.name; // 获取当前类的名字
    console.log('modelName', modelName);
    const instances = Model.instances[modelName] || new RecordSet<T>();
    return instances;
  }
}

export { Model };
