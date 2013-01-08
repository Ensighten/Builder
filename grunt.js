/*global module:true */
module.exports = function(grunt) {
  var read = grunt.file.read;

  // Project configuration.
  grunt.initConfig({
    pkg: '<json:package.json>',
    meta: {
      banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '<%= pkg.homepage ? "* " + pkg.homepage + "\n" : "" %>' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> Ensighten;' +
        ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */'
    },
    template: {
      vanilla: {
        src: 'src/templates/vanilla.mustache',
        dest: 'stage/Builder.js',
        variables: {
          'Builder': read('src/Builder.js')
        }
      },
      require: {
        src: 'src/templates/require.mustache',
        dest: 'stage/Builder.require.js',
        variables: {
          'Builder': read('src/Builder.js')
        }
      }
    },
    concat: {
      distVanilla: {
        src: ['<banner:meta.banner>', '<file_strip_banner:stage/<%= pkg.name %>.js>'],
        dest: 'dist/<%= pkg.name %>.js'
      },
      distRequire: {
        src: ['<banner:meta.banner>', '<file_strip_banner:stage/<%= pkg.name %>.require.js>'],
        dest: 'dist/<%= pkg.name %>.require.js'
      }
    },
    min: {
      distVanilla: {
        src: ['<banner:meta.banner>', '<config:concat.distVanilla.dest>'],
        dest: 'dist/<%= pkg.name %>.min.js'
      },
      distRequire: {
        src: ['<banner:meta.banner>', '<config:concat.distRequire.dest>'],
        dest: 'dist/<%= pkg.name %>.require.min.js'
      }
    },
    qunit: {
      files: ['test/**/*.html']
    },
    lint: {
      files: ['grunt.js', 'src/**/*.js', 'test/**/*.js']
    },
    watch: {
      files: ['<config:lint.files>', '<config:qunit.files>'],
      tasks: 'default'
    },
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
  });

  // Load in grunt-templater
  grunt.loadNpmTasks('grunt-templater');

  // Alias test as qunit
  grunt.registerTask('test', 'qunit');

  // Default task.
  grunt.registerTask('default', 'lint template concat min test');

};
