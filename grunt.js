/*global module:true */
module.exports = function(grunt) {
  var read = grunt.file.read,
      distro = require('./utils/distro');

  // Project configuration.
  var vars = {
    'Builder': read('src/Builder.js'),
    'Builder-jquery': read('src/Builder.jquery.js'),
    'Builder-keys': read('src/Builder.keys.js')
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
      files: ['grunt.js', 'src/**/*.js', 'test/**/*.js']
    },

    // Watch utility
    watch: {
      files: ['<config:lint.files>', '<config:qunit.files>'],
      tasks: 'default'
    },

    // Testing config
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
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
