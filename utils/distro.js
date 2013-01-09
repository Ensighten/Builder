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

var extend = require('node.extend');

// Helper for grabbing the stageName of a config
function stageName(config) {
  return config.dest.replace('dist', 'stage');
}

module.exports = {
  template: function (config) {
    // Extend and return the object
    return extend({
      dest: stageName(config)
    }, config);
  },
  concat: function (config) {
    // Extend and return the object
    return extend({
      src: ['<banner:meta.banner>', '<file_strip_banner:' + stageName(config) + '>']
    }, config);
  },
  min: function (config) {
    // Extend and return the object
    return extend({
      src: ['<banner:meta.banner>', '<file_strip_banner:' + stageName(config) + '>'],
      dest: config.dest.replace('.js', '.min.js')
    }, config);
  }
};