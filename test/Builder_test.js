(function($) {
  // Mocha: http://visionmedia.github.com/mocha/

  module('Builder#window', {
    // This will run before each test in this module.
    setup: function() {
      this.elems = $('#qunit-fixture').children();
    }
  });

  test('exists', function() {
    expect(1);
    // Not a bad test to run on collection methods.
    ok(Builder, 'Builder defined on window exists');
  });

}(jQuery));