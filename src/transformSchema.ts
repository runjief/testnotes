import { isEqual, isPlainObject } from 'lodash-es';

/**
 * TransformSchema that only keep type info.
 * Useful when handling dynamic data like timestamp.
 * @param v value
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
export default function transformSchema(v: unknown): unknown {
  const typeName = typeof v;
  if (typeName !== 'object') {
    return typeName;
  }

  if (Array.isArray(v)) {
    const ret = v.map((i) => transformSchema(i));
    if (ret.slice(1).every((i) => isEqual(ret[0], i))) {
      return { $array: ret[0] };
    }
    return ret;
  }

  if (isPlainObject(v)) {
    return Object.fromEntries(
      Object.entries(v).map(([k, v]) => [k, transformSchema(v)]),
    );
  }

  return '$' + Object.getPrototypeOf(v).constructor.name;
}
