import { assert } from 'chai';

import snapshot from '..';

describe('match', function () {
  it('simple', async function () {
    await snapshot.match('text');
    await assert.isRejected(
      snapshot.match('text2', { update: false }),
      "expected 'text2' to equal 'text'",
    );
  });
  it('object', async function () {
    await snapshot.match({ a: 1 });
  });
  it('date', async function () {
    await snapshot.match(new Date(0));
  });
  it('custom object', async function () {
    class CustomObject {
      text = 'text';
    }
    await snapshot.match(new CustomObject());
  });
  it('use key', async function () {
    await snapshot.match('text1', { key: snapshot.getKey('1') });
    await snapshot.match('text2', { key: snapshot.getKey('2') });
  });
  it('use clean', async function () {
    await snapshot.match(new Date(), {
      clean: (v) =>
        v.replace(/(?<="\$Date": ").+(?=")/g, snapshot.maskString),
    });
  });
});
