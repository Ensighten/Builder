// Default settings for Builder
var settings = {
      'template engine': function (tmpl) {
        return tmpl;
      },
      'dom engine': function (content) {
        return content;
      }
    };

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



// TODO: Add a flavor of Builder which accepts keys over template