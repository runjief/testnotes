import { assert } from 'chai';

import snapshot from '..';

describe('transformJSON', function () {
  it('string', function () {
    assert.equal(snapshot.transformJSON('test'), 'test');
  });
  it('boolean', function () {
    assert.equal(snapshot.transformJSON(true), true);
  });
  it('object', function () {
    assert.deepEqual(snapshot.transformJSON({ a: 1 }), { a: 1 });
  });
  it('custom object', function () {
    class CustomObject {
      text = 'text';
    }
    assert.deepEqual(snapshot.transformJSON(new CustomObject()), {
      $CustomObject: { text: 'text' },
    });
  });
  it('date', function () {
    assert.deepEqual(snapshot.transformJSON(new Date(0)), {
      $Date: new Date(0),
    });
  });
});
