/*global QUnit:false, module:false, test:false, asyncTest:false, expect:false*/
/*global start:false, stop:false ok:false, equal:false, notEqual:false, deepEqual:false*/
/*global notDeepEqual:false, strictEqual:false, notStrictEqual:false, raises:false*/
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

module('Builder#requirejs.jquery');

test('A template with a jQuery plugin (string flavor) rendered by a jQuery pluginified Builder instantiates the jQuery plugin', function () {
  expect(2);

  // Stop the test while we load jQuery.
  stop();

  // Load jQuery.
  require(['Builder'], function (Builder) {
    // Continue testing.
    start();

    // Create our jQuery module
    $.fn.test = function () {
      $(this).data('testRan', true);
    };

    // Register our plugin
    Builder.addPlugin('test');

    // Render our view
    var $content = Builder('<div class="testRan">a</div><div><span class="testRan">b</span></div>');

    // Verify the first node was instantiated
    ok($content.eq(0).data('testRan'), 'instantiated first testRan');
    ok($content.find('span').data('testRan'), 'instantiated second testRan');
  });
});


test('A template with a jQuery plugin (object flavor) rendered by a jQuery pluginified Builder instantiates the jQuery plugin', function () {
  expect(1);

  // Stop the test while we load jQuery.
  stop();

  // Load jQuery.
  require(['Builder'], function (Builder) {
    // Continue testing.
    start();

    // Create our jQuery module
    $.fn.test2 = function () {
      $(this).data('test2Ran', true);
    };

    // Register our plugin
    Builder.addPlugin({'plugin': 'test2', 'selector': 'li'});

    // Render our view
    var $content = Builder('<ul><li>List item</li></ul>');

    // Verify the first node was instantiated
    ok($content.find('li').data('test2Ran'), 'instantiated test2Ran on li');
  });
});