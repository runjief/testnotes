import { isPlainObject } from 'lodash-es';
import toDeepKeySorted from './utils/toDeepKeySorted';

/**
 * convert any value to json friendly data.
 * use format like mongo-compass used to edit document,
 * types that json not support will be wrapped as { "$"+type: value  }.
 * @param v value to convert
 * @returns a plain object only contains json compatible values
 */
export default function transformJSON(v: unknown): unknown {
  if (Array.isArray(v)) {
    return v.map((i) => transformJSON(i));
  }
  if (isPlainObject(v)) {
    return Object.fromEntries(
      Object.entries(toDeepKeySorted(v)).map(([k, v]) => [k, transformJSON(v)]),
    );
  }

  switch (typeof v) {
    case 'function':
      return { $Function: v.name };
    case 'object':
      if (v === null) {
        return null;
      }
      return { [`$${v.constructor.name}`]: v };
    case 'undefined':
      return { $undefined: null };
    default:
      return v;
  }
}
