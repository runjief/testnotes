import { isEqual, isPlainObject } from 'lodash-es';

/**
 * TransformSchema that only keep type info.
 * Useful when handling dynamic data like timestamp.
 * @param value
 * @returns
 *    typeof value
 *      when value type is not object
 *
 *    { $array: unknown }
 *      when value is array and all element schema is deep equal
 *
 *    unknown[]
 *      when value is array
 *
 *    Record<string, unknown>
 *      when value is plain object
 *
 *    "$"+type
 *      default
 */
export default function transformSchema(value: unknown): unknown {
  const typeName = typeof value;
  if (typeName !== 'object') {
    return typeName;
  }

  if (Array.isArray(value)) {
    const ret = value.map((i) => transformSchema(i));
    if (ret.slice(1).every((i) => isEqual(ret[0], i))) {
      return { $array: ret[0] };
    }
    return ret;
  }

  if (isPlainObject(value)) {
    return Object.fromEntries(
      Object.entries(value).map(([k, v]) => [k, transformSchema(v)]),
    );
  }

  const proto = Object.getPrototypeOf(value) as Record<string, unknown>;
  if (proto instanceof Object) {
    return `$${value.constructor.name}`;
  }
  return `$${String(proto)}`;
}
