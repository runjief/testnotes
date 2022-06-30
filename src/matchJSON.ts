import { assert } from 'chai';
import snapshotMatch, { MatchOptions } from './match';

export default async function snapshotMatchJSON(
  actual: unknown,
  opts?: MatchOptions,
): Promise<void> {
  return snapshotMatch(actual, {
    ext: '.json',
    marshal: (v) => JSON.stringify(v, undefined, 2),
    assertEqual: (actual, expected, message) =>
      assert.deepEqual(JSON.parse(actual), JSON.parse(expected), message),
    ...opts,
  });
}
