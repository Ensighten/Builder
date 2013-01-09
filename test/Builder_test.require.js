/*global QUnit:false, module:false, test:false, asyncTest:false, expect:false*/
describe('A Builder', function () {
  describe('defined by require.js', function () {
    it('exists', function () {
      chai.assert(window.Builder);
    });
  });
});