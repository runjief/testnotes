import { assert } from 'chai';
import snapshotMatch, { SnapshotOptions } from './match';

export default async function snapshotMatchJSON(
  actual: unknown,
  opts?: SnapshotOptions,
): Promise<void> {
  return snapshotMatch(actual, {
    ext: '.json',
    marshal: (v) => JSON.stringify(v, undefined, 2),
    assertEqual: (actual, expected, message) =>
      assert.deepEqual(JSON.parse(actual), JSON.parse(expected), message),
    ...opts,
  });
}
