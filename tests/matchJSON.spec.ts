import snapshot from '..';

describe('matchJSON', function () {
  it('simple', async function () {
    await snapshot.matchJSON('text');
  });
  it('object', async function () {
    await snapshot.matchJSON({ a: 1 });
  });
  it('date', async function () {
    await snapshot.matchJSON(new Date(0));
  });
  it('custom object', async function () {
    class CustomObject {
      text = 'text';
    }
    await snapshot.matchJSON(new CustomObject());
  });
});
