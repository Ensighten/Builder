/*global QUnit:false, module:false, test:false, asyncTest:false, expect:false*/
/*global start:false, stop:false ok:false, equal:false, notEqual:false, deepEqual:false*/
/*global notDeepEqual:false, strictEqual:false, notStrictEqual:false, raises:false*/
(function($) {
  /*
    ======== A Handy Little QUnit Reference ========
    http://docs.jquery.com/QUnit

    Test methods:
      expect(numAssertions)
      stop(increment)
      start(decrement)
    Test assertions:
      ok(value, [message])
      equal(actual, expected, [message])
      notEqual(actual, expected, [message])
      deepEqual(actual, expected, [message])
      notDeepEqual(actual, expected, [message])
      strictEqual(actual, expected, [message])
      notStrictEqual(actual, expected, [message])
      raises(block, [expected], [message])
  */

  module('Builder#window', {
    // This will run before each test in this module.
    setup: function() {
      this.elems = $('#qunit-fixture').children();
    }
  });

  test('exists', function() {
    expect(1);
    ok(Builder, 'Builder defined on window exists');
  });


  module('Builder#template');

  test('processed by a template-augmented vanilla Builder augments content', function () {
    expect(1);
    Builder.set('template engine', function (content) {
      return content.replace('hi', 'hello');
    });

    var input = '<span>hi</span>',
        output = Builder(input);

    strictEqual(output, '<span>hello</span>');
  });


  module('Builder#anotherTemplate');

  test('processed by an domify-augmented vanilla Builder augments content', function () {
    expect(1);
    Builder.set('template engine', function (content) {
      return content;
    });
    Builder.set('dom engine', function (content) {
      return '<div>' + content + '</div>';
    });

    var input = '<span>hello</span>',
        output = Builder(input);

    strictEqual(output, '<div><span>hello</span></div>');
  });

}(jQuery));