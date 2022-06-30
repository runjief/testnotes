import { isPlainObject } from 'lodash-es';

export default function toDeepKeySorted<T>(data: T): T {
  if (Array.isArray(data)) {
    return data.map((i) => toDeepKeySorted(i)) as unknown as T;
  }
  return Object.fromEntries(
    Object.entries(data)
      .sort()
      .map(([k, v]) => {
        if (isPlainObject(v)) {
          return [k, toDeepKeySorted(v)];
        }
        return [k, v];
      }),
  ) as T;
}
