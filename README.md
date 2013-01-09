# Builder

Build chain for client-side MVC views.

Render, convert to DOM elements, and bind jQuery plugins in one fell swoop.

## Getting Started
Download any of the versions below. Each of the heading is a combination of [modifiers][modifiers].

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

// TODO: Modifiers

// TODO: Inside of README, leave notes about this.data

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
_(Coming soon)_

## Examples
_(Coming soon)_

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [grunt](http://gruntjs.com/).

_Also, please don't edit files in the "dist" or "stage" subdirectories as they are generated via grunt. You'll find source code in the "lib" subdirectory!_

### PhantomJS
While grunt can run the included unit tests via [PhantomJS](http://phantomjs.org/), this shouldn't be considered a substitute for the real thing. Please be sure to test the `test/*.html` unit test file(s) in _actual_ browsers.

See the [Why does grunt complain that PhantomJS isn't installed?](https://github.com/gruntjs/grunt/blob/master/docs/faq.md#why-does-grunt-complain-that-phantomjs-isnt-installed) guide in the [Grunt FAQ](https://github.com/gruntjs/grunt/blob/master/docs/faq.md) for help with installing or troubleshooting PhantomJS.

## License
Copyright (c) 2013 Ensighten
Licensed under the MIT license.
