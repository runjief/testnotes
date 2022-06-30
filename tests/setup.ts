import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import snapshot from '..';

chai.use(chaiAsPromised);

beforeEach(function () {
  snapshot.currentTest.file = this.currentTest?.file;
  snapshot.currentTest.key = this.currentTest?.titlePath().join('/');
});
