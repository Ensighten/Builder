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

  module('Builder#jquery');

  test('A template rendered by a jQuery Builder returns a valid jQuery collection and the expected elements', function() {
    expect(7);

    // Render the content via Builder
    var template = '<div><span>Hello</span> <article>World</article></div><section>!</section>',
        $content = Builder(template);

    // Compare properties of the $content
    strictEqual($content.length, 2, 'has a length of 2');
    ok($content instanceof $, 'is a jQuery object');
    strictEqual($content.text(), 'Hello World!', 'has proper text');

    // Hard comparison for first elemnt
    ok($content.eq(0).is('div'), 'has div for first element');
    strictEqual($content.eq(0).html(), '<span>Hello</span> <article>World</article>', 'has proper first element HTML');

    // Hard comparison for second elemnt
    ok($content.eq(1).is('section'), 'has section for second element');
    strictEqual($content.eq(1).html(), '!', 'has proper second element HTML');
  });

}(jQuery));