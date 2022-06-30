import { assert } from 'chai';

import snapshot from '..';

describe('transformSchema', function () {
  it('string', async function () {
    assert.equal(snapshot.transformSchema('test'), 'string');
  });
  it('boolean', async function () {
    assert.equal(snapshot.transformSchema(true), 'boolean');
  });
  it('object', async function () {
    assert.deepEqual(snapshot.transformSchema({ a: 1 }), { a: 'number' });
  });
  it('custom object', async function () {
    class CustomObject {}
    assert.deepEqual(
      snapshot.transformSchema(new CustomObject()),
      '$CustomObject',
    );
  });
  it('date', async function () {
    assert.deepEqual(snapshot.transformSchema(new Date(0)), '$Date');
  });
  it('array with one element type', async function () {
    assert.deepEqual(snapshot.transformSchema([1, 2, 3]), { $array: 'number' });
  });
  it('array with multiple element type', async function () {
    assert.deepEqual(snapshot.transformSchema([1, '2', 3]), [
      'number',
      'string',
      'number',
    ]);
  });
});
