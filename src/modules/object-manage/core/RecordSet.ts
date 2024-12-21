/* eslint-disable @typescript-eslint/no-explicit-any */
class RecordSet<T extends Record<string, any>> extends Array<T> {
  static from<T extends Record<string, any>>(array: Array<T>) {
    const recordSet = new RecordSet<T>();
    recordSet.push(...array);
    return recordSet;
  }

  pluck<K extends keyof T>(attribute: K) {
    return this.map((record) => record[attribute]);
  }

  select<K extends keyof T>(attributes: K[]): RecordSet<Pick<T, K>> {
    return RecordSet.from(
      this.map((record) =>
        attributes.reduce(
          (acc, attribute) => {
            acc[attribute] = record[attribute];
            return acc;
          },
          {} as Pick<T, K>,
        ),
      ),
    );
  }

  where<K extends keyof T>(query: {
    [P in K]?: ((value: T[P]) => boolean) | T[P][] | T[P];
  }): RecordSet<T> {
    return RecordSet.from(
      this.filter((record) =>
        Object.entries(query).every(([key, condition]) => {
          const value = record[key as K];

          if (typeof condition === 'function') {
            return (condition as (value: T[K]) => boolean)(value);
          }

          if (Array.isArray(condition)) {
            return condition.includes(value);
          }

          return value === condition;
        }),
      ),
    );
  }
}

export { RecordSet };
