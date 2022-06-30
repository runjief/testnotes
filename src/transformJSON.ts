import { isPlainObject } from 'lodash-es';
import toDeepKeySorted from './utils/toDeepKeySorted';

/**
 * convert any value to json friendly data.
 * use format like mongo-compass used to edit document,
 * types that json not support will be wrapped as { "$"+type: value  }.
 * @param value value to convert
 * @returns a plain object only contains json compatible values
 */
export default function transformJSON(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map((i) => transformJSON(i));
  }
  if (isPlainObject(value)) {
    return Object.fromEntries(
      Object.entries(toDeepKeySorted(value)).map(([k, v]) => [k, transformJSON(v)]),
    );
  }

  switch (typeof value) {
    case 'function':
      return { $Function: value.name };
    case 'object':
      if (value === null) {
        return null;
      }
      return { [`$${value.constructor.name}`]: value };
    case 'undefined':
      return { $undefined: null };
    default:
      return value;
  }
}
