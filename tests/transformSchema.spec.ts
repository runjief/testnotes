import { assert } from 'chai';

import snapshot from '..';

describe('transformSchema', function () {
  it('string', function () {
    assert.equal(snapshot.transformSchema('test'), 'string');
  });
  it('boolean', function () {
    assert.equal(snapshot.transformSchema(true), 'boolean');
  });
  it('object', function () {
    assert.deepEqual(snapshot.transformSchema({ a: 1 }), { a: 'number' });
  });
  it('custom object', function () {
    class CustomObject {}
    assert.deepEqual(
      snapshot.transformSchema(new CustomObject()),
      '$CustomObject',
    );
  });
  it('date', function () {
    assert.deepEqual(snapshot.transformSchema(new Date(0)), '$Date');
  });
  it('array with one element type', function () {
    assert.deepEqual(snapshot.transformSchema([1, 2, 3]), { $array: 'number' });
  });
  it('array with multiple element type', function () {
    assert.deepEqual(snapshot.transformSchema([1, '2', 3]), [
      'number',
      'string',
      'number',
    ]);
  });
});
