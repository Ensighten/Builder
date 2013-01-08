// Default settings for Builder
var settings = {
      'template engine': function (tmpl) {
        return tmpl;
      },
      'dom engine': function (content) {
        return content;
      }
    },
    beforeFns = [],
    afterFns = [];

/**
 * Build chain for client side views. tmpl -> html -> post render fns -> return
 * @param {String} tmpl Template to process through template engine
 * @param {Object} [data] Data to pass through to template engine
 * @returns {Mixed}
 */
function Builder(tmpl, data) {
  // Convert the template into content
  var content = template(tmpl, data);

  // Pass the template through the dom engine
  var $content = domify(content);

  // Return the $content
  return $content;
}

/**
 * Parse template through its engine
 * @param {String} tmpl Template to process through template engine
 * @param {Object} [data] Data to pass through to template engine
 */
function template(tmpl, data) {
  // Grab the template engine
  var engine = settings['template engine'];

  // Process the template through the template engine
  var content = engine(tmpl, data);

  // Return the content
  return content;
}
Builder.template = template;

/**
 * Convert HTML into HTMLElements, jQuery elements, or other
 * @param {String} content HTML to pass through dom engine
 */
function domify(content) {
  // Grab the dom engine
  var engine = settings['dom engine'];

  // Process the content through the dom engine
  var $content = engine(content);

  // Return the $content
  return $content;
}
Builder.domify = domify;

/**
 * Settings helper for Builder
 * @param {String|Object} name If object, interpret as key-value pairs of settings. If string, save val under settings key.
 * @param {Mixed} [val] Value to save under name
 */
function set(name, val) {
  // If the name is an object
  var key;
  if (typeof name === 'object') {
    // Iterate over its properties
    for (key in name) {
      if (name.hasOwnProperty(key)) {
        // Set each one
        set(key, name[key]);
      }
    }
  } else {
  // Otherwise, save to settings
    settings[name] = val;
  }
}
Builder.set = set;
Builder.settings = settings;

// TODO: Implement before and after

// TODO: Add a flavor of Builder which accepts keys over template
// TODO: This could be a built-in: attempt to retrieve from template store and fallback to string? -- nah, people would want errors upon non-existance