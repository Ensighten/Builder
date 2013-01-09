/*global module:true */
module.exports = function(grunt) {
  var read = grunt.file.read,
      distro = require('./utils/distro'),
      _ = require('underscore');

  // Project configuration.
  var vars = {
    'Builder': read('src/Builder.js'),
    'BuilderJQuery': read('src/Builder.jquery.js'),
    'BuilderKeys': read('src/Builder.keys.js')
  },
  initConfig = {
    // Package data
    pkg: '<json:package.json>',
    meta: {
      banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '<%= pkg.homepage ? "* " + pkg.homepage + "\n" : "" %>' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> Ensighten;' +
        ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */'
    },

    // Distribution setup
    distro: {
      vanilla: {
        src: 'src/templates/vanilla.mustache',
        dest: 'dist/Builder.js',
        variables: vars
      },
      require: {
        src: 'src/templates/require.mustache',
        dest: 'dist/Builder.require.js',
        variables: vars
      },
      'require-jquery-keys': {
        src: 'src/templates/require.mustache',
        dest: 'dist/Builder.require.jquery.keys.js',
        variables: _.defaults({
          useJQuery: true,
          useKeys: true
        }, vars)
      }
    },
    // Cannot do inline, see below =(
    // template: distro.template(initConfig.distro),
    // concat: distro.concat(initConfig.distro),
    // min: distro.min(initConfig.distro),

    // Testing setup
    qunit: {
      files: ['test/**/*.html']
    },
    lint: {
      main: ['grunt.js', 'src/Builder.js', 'test/**/*.js'],
      plugins: 'src/**/*.js'
    },

    // Watch utility
    watch: {
      files: ['<config:lint.main>', '<config:lint.plugins>', '<config:qunit.files>'],
      tasks: 'default'
    },

    // Testing config
    jshint: {
      main: {
        options: {
          curly: true,
          eqeqeq: true,
          immed: true,
          // latedef: true,
          // newcap: true,
          noarg: true,
          sub: true,
          undef: true,
          boss: true,
          eqnull: true,

          browser: true
        },
        globals: {
          '$': true,
          'jQuery': true,
          'require': true,
          'define': true
        }
      },
      plugins: {
        globals: {
          '$': true,
          'jQuery': true,
          'require': true,
          'define': true,

          // Builder functions
          'Builder': true,
          'before': true,
          'after': true,
          'settings': true
        }
      }
    },
    uglify: {}
  };
  initConfig.template = distro.template(initConfig.distro);
  initConfig.concat = distro.concat(initConfig.distro);
  initConfig.min = distro.min(initConfig.distro);
  grunt.initConfig(initConfig);

  // Load in grunt-templater
  grunt.loadNpmTasks('grunt-templater');

  // Alias test as qunit
  grunt.registerTask('test', 'qunit');

  // Default task.
  grunt.registerTask('default', 'lint template concat min test');

  // Register distro as a placeholder task (not really though)
  grunt.registerTask('distro', '');
};
