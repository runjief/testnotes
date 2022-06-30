import { assert } from 'chai';

import snapshot from '..';

describe('maskString', function () {
  it('simple', function () {
    assert.equal(snapshot.maskString('text'), '****');
  });
});
