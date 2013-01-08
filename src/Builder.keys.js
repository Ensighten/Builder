// Create store for key-value pairs of views
var views = {};

/**
 * Function to add new views
 * @param {String} name Name to save template under
 * @param {String} tmpl Template to save
 */
function addView(name, tmpl) {
  // Save the view for later
  views[name] = tmpl;
}
Builder.addView = addView;
Builder.views = views;

// Add a before function to look up templates
before(function (name) {
  // Look up the view
  var view = views[name];

  // If no view was found, throw an error
  if (!view) {
    throw new Error('View could not loaded "' + name + '"');
  }

  // Return the view
  return view;
});