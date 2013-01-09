/**
 * Initialize jQuery plugins after rendering
 * @param {String|Object} params If a string, it will be used for params.plugin and we will search elements which use it as a class
 * @param {String} params.plugin jQuery plugin to instantiate
 * @param {Mixed} params.selector Selector to use within $content.filter and $content.find
 */
function addPlugin(params) {
  // If the params are a string, upcast it to an object
  if (typeof params === 'string') {
    params = {
      'plugin': params
    };
  }

  // Grab and fallback plugin and selector
  var plugin = params.plugin,
      selector = params.selector || '.' + plugin;

  // Generate an after function for binding
  var afterFn = function pluginAfterFn($content) {
    // Filter and find any jQuery module that has the corresponding class
    var $items = $().add($content.filter(selector)).add($content.find(selector));

    // Iterate over the items and initialize the plugin
    $items.each(function () {
      $(this)[plugin]();
    });
  };

  // Bind the after function
  after(afterFn);
}
Builder.addPlugin = addPlugin;