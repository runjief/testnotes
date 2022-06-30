import { assert } from 'chai';
import type { MatchOptions } from './match';
import snapshotMatch from './match';

export default async function snapshotMatchJSON(
  value: unknown,
  opts?: MatchOptions,
): Promise<void> {
  return snapshotMatch(value, {
    ext: '.json',
    marshal: (v) => JSON.stringify(v, undefined, 2),
    assertEqual: (actual, expected, message) =>
      assert.deepEqual(JSON.parse(actual), JSON.parse(expected), message),
    ...opts,
  });
}
