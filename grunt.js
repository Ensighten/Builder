/*global module:true */
module.exports = function(grunt) {
  var read = grunt.file.read,
      distro = require('./utils/distro'),
      _ = require('underscore');

  // Project configuration.
  var vars = {
    'Builder': read('src/Builder.js'),
    'BuilderJQuery': read('src/Builder.jquery.js'),
    'BuilderKeys': read('src/Builder.keys.js'),
    'defaultSettings': read('src/Builder.settings.jquery.js'),
    'jQuerySettings': read('src/Builder.settings.jquery.js')
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
      'require-jquery': {
        src: 'src/templates/require.mustache',
        dest: 'dist/Builder.require.jquery.js',
        variables: _.defaults({
          useJQuery: true
        }, vars)
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

    // Generating mustache templates from underscore templates
    template: {
      vanillaMustache: {
        src: 'src/templates/pre_templates/vanilla.mustache.us',
        dest: 'src/templates/vanilla.mustache',
        engine: 'underscore',
        variables: {
          content: read('src/templates/pre_templates/content.mustache')
        }
      },
      requireMustache: {
        src: 'src/templates/pre_templates/require.mustache.us',
        dest: 'src/templates/require.mustache',
        variables: {
          content: read('src/templates/pre_templates/content.mustache')
        }
      }
    },

    // Testing setup
    mocha: {
      files: ['test/**/*.html']
    },
    lint: {
      files: ['grunt.js', 'src/**/*.js', 'test/**/*.js'],
      Builder: 'src/.js'
    },

    // Watch utility
    watch: {
      files: ['<config:lint.files>', '<config:qunit.files>'],
      tasks: 'default'
    },

    // Testing config
    jshint: {
      files: {
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
      },
      Builder: {
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
          'define': true,

          // Settings are defined in external files
          'settings': true
        }
      }
    },
    uglify: {}
  };
  // initConfig.template = distro.template(initConfig.distro);
  _.extend(initConfig.template, distro.template(initConfig.distro));
  initConfig.concat = distro.concat(initConfig.distro);
  initConfig.min = distro.min(initConfig.distro);
  grunt.initConfig(initConfig);

  // Load in grunt-templater
  grunt.loadNpmTasks('grunt-templater');

  // Load in grunt-mocha
  grunt.loadNpmTasks('grunt-mocha');

  // Alias mocha as test
  grunt.registerTask('test', 'mocha');

  // Default task.
  grunt.registerTask('default', 'lint template concat min test');

  // Register task to generate mustache templates
  grunt.registerTask('template-mustache', 'template:vanillaMustache template:requireMustache');

  // Register distro as a placeholder task (not really though)
  grunt.registerTask('distro', '');
};
