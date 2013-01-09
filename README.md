# Builder

Build chain for client-side MVC views.

Render, convert to DOM elements, and bind jQuery plugins in one fell swoop.

## Getting Started
Download any of the versions below. A [definition of each preset](#presets) is presented later in the documentation.

|             |  Vanilla  |  jQuery  |    keys    |    require    | require + jQuery | require + jQuery + keys |
|-------------|-----------|----------|------------|---------------|------------------|-------------------------|
| Development | [van_max] | [jq_max] | [keys_max] | [require_max] | [require_jq_max] | [the_works_max]         |
| Production  | [van_min] | [jq_min] | [keys_min] | [require_min] | [require_jq_min] | [the_works_min]         |

[van_max]: https://raw.github.com/Ensighten/Builder/master/dist/Builder.js
[van_min]: https://raw.github.com/Ensighten/Builder/master/dist/Builder.min.js
[jq_max]: https://raw.github.com/Ensighten/Builder/master/dist/Builder.jquery.js
[jq_min]: https://raw.github.com/Ensighten/Builder/master/dist/Builder.jquery.min.js
[keys_max]: https://raw.github.com/Ensighten/Builder/master/dist/Builder.keys.js
[keys_min]: https://raw.github.com/Ensighten/Builder/master/dist/Builder.keys.min.js
[require_max]: https://raw.github.com/Ensighten/Builder/master/dist/Builder.require.js
[require_min]: https://raw.github.com/Ensighten/Builder/master/dist/Builder.require.min.js
[require_jq_max]: https://raw.github.com/Ensighten/Builder/master/dist/Builder.require.jquery.js
[require_jq_min]: https://raw.github.com/Ensighten/Builder/master/dist/Builder.require.jquery.min.js
[the_works_max]: https://raw.github.com/Ensighten/Builder/master/dist/Builder.require.jquery.keys.js
[the_works_min]: https://raw.github.com/Ensighten/Builder/master/dist/Builder.require.jquery.keys.min.js

In your web page:

```html
<script src="jquery.js"></script>
<script src="dist/Builder.min.js"></script>
<script>
// Demonstration of jQuery Builder

// Specify Jade as our template engine
Builder.set('template engine', jade.render);

// Register a few plugins
Builder.addPlugin('datepicker');
Builder.addPlugin('timepicker');

// Render our view via jQuery
var template = [
      '#main',
      '  input.datepicker',
      '  input.timepicker'
    ].join('\n'),
    $content = Builder(template);

// Content is a jQuery collection of #main
$content; // [<div id="main">]

// The children have also been rendered
$content.find('.datepicker'); // [<input class="datepicker">]

// and datepicker has already bound to the DOM and is visually represented

// the same goes for timepicker
</script>
```

## Documentation
Builder is run as a standalone function that you can configure as you please.
```js
Builder(tmpl, data);
/**
 * Build chain for client side views. before -> template -> domify -> after -> return
 * @param {String} tmpl Template to process through template engine
 * @param {Object} [data] Data to pass through to template engine
 * @returns {Mixed} Output from before -> template -> domify -> after -> return
 */
```

As mentioned in the documentation above, Builder runs through 4 steps.

Each of these steps has access to the original data passed into Builder via `this`.

This is also where you can/should modify data in `before`.
```js
this; // {'tmpl': tmpl, 'data': data};
```

```js
Builder.before(fn);
/**
 * Add a new method to run before template.
 * Before methods are run in the sequence the are added.
 * These are intended to modify template data.
 * @param {Function} fn Before method to add
 */

Builder.template(tmpl, data);
/**
 * Parse template through its engine
 * @param {String} tmpl Template to process through template engine
 * @param {Object} [data] Data to pass through to template engine
 */

Builder.domify(content);
/**
 * Convert HTML into HTMLElements, jQuery elements, or other
 * @param {String} content HTML to pass through dom engine
 */

Builder.after(fn);
/**
 * Add a new method to run after domify.
 * After methods are run in the sequence the are added.
 * These are intended to modify $content.
 * @param {Function} fn After method to add
 */
```

Lastly, we can update our `template engine` (e.g. [jade][jade], [ejs][ejs], [mustache][mustache]) and `dom engine` (e.g. [jQuery][jquery], [Mason.js][mason], [innerHTML][innerHTML]).

The `template engine` takes views and interprets the template along with data to output content.

`template engine` recieves `(<template string>, <data object>)` as parameters and is expected to return a `string` synchronously.

The `dom engine` takes strings and converts them into HTML elements, jQuery collections, or similar.

```js
Builder.set(name, val);
Builder.set(object);
/**
 * Settings helper for Builder
 * @param {String|Object} name If object, interpret as key-value pairs of settings. If string, save val under settings key.
 * @param {Mixed} [val] Value to save under name
 */
```

[jade]: https://github.com/visionmedia/jade
[ejs]: https://github.com/visionmedia/ejs
[mustache]: https://github.com/janl/mustache.js
[jquery]: http://jquery.com/
[mason]: https://github.com/twolfson/Mason.js
[innerHTML]: https://developer.mozilla.org/en-US/docs/DOM/element.innerHTML

## Presets

### Vanilla
Builder with no adjustments.

### jQuery
Sets `dom engine` to jQuery and adds
```js
Builder.addPlugin(plugin);
Builder.addPlugin({'plugin': plugin, 'selector': selector});
/**
 * Initialize jQuery plugins after rendering
 * @param {String|Object} params If a string, it will be used for params.plugin and we will search elements which use it as a class
 * @param {String} params.plugin jQuery plugin to instantiate
 * @param {Mixed} params.selector Selector to use within $content.filter and $content.find
 */
```

### keys
Adds a `before` method which will look up templates by a name rather than accepting the template directly through Builder.

Additionally, we add an `addView` method which allows you to add new views to look up.
```js
Builder.addView(name, tmpl);
/**
 * Function to add new views
 * @param {String} name Name to save template under
 * @param {String} tmpl Template to save
 */
```

### require
Defines `Builder` within `define` function of [require.js][requirejs]

[requirejs]: http://requirejs.org/

## Examples
### jQuery
See [Getting Started](#getting-started).

### keys
```js
// Register a view
Builder.addView('sample', '<div>Sample!!</div>');

// Render the view
Builder('sample'); // <div>Sample!!</div>
```

### require
```js
require(['Builder'], function (Builder) {
  // Render the $content
  var $content = Builder('<div>some content</div>');

  // Do stuff with $content
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [grunt](http://gruntjs.com/).

_Also, please don't edit files in the "dist" or "stage" subdirectories as they are generated via grunt. You'll find source code in the "lib" subdirectory!_

### PhantomJS
While grunt can run the included unit tests via [PhantomJS](http://phantomjs.org/), this shouldn't be considered a substitute for the real thing. Please be sure to test the `test/*.html` unit test file(s) in _actual_ browsers.

See the [Why does grunt complain that PhantomJS isn't installed?](https://github.com/gruntjs/grunt/blob/master/docs/faq.md#why-does-grunt-complain-that-phantomjs-isnt-installed) guide in the [Grunt FAQ](https://github.com/gruntjs/grunt/blob/master/docs/faq.md) for help with installing or troubleshooting PhantomJS.

## License
Copyright (c) 2013 Ensighten
Licensed under the MIT license.
