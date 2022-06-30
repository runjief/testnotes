import { assert } from 'chai';

import snapshot from '..';

describe('transformJSON', function () {
  it('string', async function () {
    assert.equal(snapshot.transformJSON('test'), 'test');
  });
  it('boolean', async function () {
    assert.equal(snapshot.transformJSON(true), true);
  });
  it('object', async function () {
    assert.deepEqual(snapshot.transformJSON({ a: 1 }), { a: 1 });
  });
  it('custom object', async function () {
    class CustomObject {
      text = 'text';
    }
    assert.deepEqual(snapshot.transformJSON(new CustomObject()), {
      $CustomObject: { text: 'text' },
    });
  });
  it('date', async function () {
    assert.deepEqual(snapshot.transformJSON(new Date(0)), {
      $Date: new Date(0),
    });
  });
});
