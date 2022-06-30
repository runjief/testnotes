import { assert } from 'chai';
import { mkdir, readFile, writeFile } from 'fs';
import * as path from 'path';
import { promisify } from 'util';
import currentTest from './currentTest';
import getSnapshotKey from './getKey';
import marshalTextOrJSON from './marshalTextOrJSON';
import transformJSON from './transformJSON';

export interface MatchOptions {
  key?: string;
  ext?: string;
  message?: string;
  transform?: (actual: unknown) => unknown;
  marshal?: (actual: unknown) => string;
  clean?: (actual: string) => string;
  assertEqual?: (actual: string, expected: string, message?: string) => void;
  update?: boolean;
}

export default async function snapshotMatch(
  actual: unknown,
  {
    key = getSnapshotKey(''),
    ext = '',
    message,
    transform = transformJSON,
    marshal = marshalTextOrJSON,
    clean,
    assertEqual = (...args) => assert.equal(...args),
    update = process.env.SNAPSHOT_UPDATE === 'true',
  }: MatchOptions = {},
): Promise<void> {
  const p = path.resolve(
    currentTest.file ?? __dirname,
    '..',
    '__snapshots__',
    key + ext,
  );
  let actualSnapshot = marshal(transform(actual));
  if (clean) {
    actualSnapshot = clean(actualSnapshot);
  }
  const write = async (): Promise<void> => {
    await promisify(writeFile)(p, actualSnapshot);
  };
  await promisify(mkdir)(path.dirname(p), { recursive: true });
  if (update) {
    await write();
    return;
  }
  try {
    const expectedSnapshot = (await promisify(readFile)(p)).toString();
    assertEqual(actualSnapshot, expectedSnapshot, message);
  } catch (err) {
    if (err instanceof Error && err.message.startsWith('ENOENT:')) {
      await write();
      return;
    }
    throw err;
  }
}
