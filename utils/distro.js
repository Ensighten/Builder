// GOAL: Convert this
// distro: {
//   vanilla: {
//     src: 'src/templates/vanilla.mustache',
//     dest: 'dist/Builder.js',
//     variables: {
//       'Builder': read('src/Builder.js')
//     }
//   }
// }

// into this:
// template: {
//   vanilla: {
//     src: 'src/templates/vanilla.mustache',
//     dest: 'stage/Builder.js',
//     variables: {
//       'Builder': read('src/Builder.js')
//     }
//   }
// },
// concat: {
//   vanilla: {
//     src: ['<banner:meta.banner>', '<file_strip_banner:stage/<%= pkg.name %>.js>'],
//     dest: 'dist/<%= pkg.name %>.js'
//   }
// },
// min: {
//   vanilla: {
//     src: ['<banner:meta.banner>', '<config:concat.vanilla.dest>'],
//     dest: 'dist/<%= pkg.name %>.min.js'
//   }
// }

var _ = require('underscore');

// Helper for grabbing the stageName of a config
function stageName(config) {
  return config.dest.replace('dist', 'stage');
}

// Helper for multiplexing functions
function multiplex(fn) {
  return function multiplexedFn (config) {
    // Create a return object
    var retObj = {};

    // Iterate over the keys of the config
    Object.getOwnPropertyNames(config).forEach(function (key) {
      // Process and save the value through our fn to our retObj
      var val = config[key];
      retObj[key] = fn(val);
    });

    // Return the retObj
    return retObj;
  };
}

// Create single config item handlers
function templateSingle (config) {
    // Extend and return the object
    return _.defaults({
      dest: stageName(config)
    }, config);
}
function concatSingle (config) {
  // Extend and return the object
  return _.defaults({
    src: ['<banner:meta.banner>', '<file_strip_banner:' + stageName(config) + '>']
  }, config);
}
function minSingle (config) {
  // Extend and return the object
  return _.defaults({
    src: ['<banner:meta.banner>', '<file_strip_banner:' + stageName(config) + '>'],
    dest: config.dest.replace('.js', '.min.js')
  }, config);
}

module.exports = {
  // Expose our single methods
  templateSingle: templateSingle,
  concatSingle: concatSingle,
  minSingle: minSingle,

  // Multiplex our single methods
  template: multiplex(templateSingle),
  concat: multiplex(concatSingle),
  min: multiplex(minSingle)
};