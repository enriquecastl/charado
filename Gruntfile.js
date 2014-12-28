/*global module:false*/
module.exports = function(grunt) {
    'use strict';
    // Project configuration.
    grunt.initConfig({
      // Metadata.
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
            '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
            '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
            '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
            ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
        tmp : 'tmp',
        dist: 'dist',
        features: 'app/**',
        // Task configuration.
        browserify : {
            dist : {
                src : 'app/main/main.js',
                dest : '<%= dist + "/build.js" %>'
            }
        },
        concat: {
            options: {
                separator : '\n',
                banner : '<%= grunt.banner %>'
            },

            styles: {
                src : ['<%= features + "/styles.styl" %>'],
                dest: '<%= tmp + "/styles.styl" %>'
            }
        },
        stylus: {
            options: {
                compress: true
            },
            dist : {
                src : ['<%= concat.styles.dest %>'],
                dest : '<%= dist + "/styles.css" %>'
            }
        },
        jshint: {
            options: {
                jshintrc : true
            },
            gruntfile: {
                src: 'Gruntfile.js'
            },
            lib_test: {
                src: ['app/**/*.js', 'app/*.js']
            }
        },
        html2js: {
            options: {
                base: '../charados/app/',
                module : 'templates'
            },
            dist: {
                src: '<%= features + "/templates/*.html" %>',
                dest: '<%= dist + "/templates.js" %>'
            }
        },
        'compile-handlebars': {
            dist: {
                template: 'app/index.hbl',
                templateData: {
                    ngVersion: '1.3.7',
                    styles: '<%= stylus.dist.dest %>',
                    templates: '<%= html2js.dist.dest %>',
                    app: '<%= browserify.dist.dest %>'
                },
                output: 'dist/index.html'
            }
        },
        watch: {
            gruntfile: {
                files: '<%= jshint.gruntfile.src %>',
                tasks: ['jshint:gruntfile']
            },
            jshint: {
                files: '<%= jshint.lib_test.src %>',
                tasks: ['jshint:lib_test']
            },
            styles: {
                files: '<%= concat.styles.src %>',
                tasks: ['styles']
            },
            templates: {
                files: '<%= html2js.dist.src %>',
                tasks: ['html2js:dist']
            },
            browserify: {
                files: '<%= jshint.lib_test.src %>',
                tasks: ['browserify:dist']
            }
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-concat')
    grunt.loadNpmTasks('grunt-contrib-jshint')
    grunt.loadNpmTasks('grunt-contrib-stylus')
    grunt.loadNpmTasks('grunt-compile-handlebars')
    grunt.loadNpmTasks('grunt-contrib-watch')
    grunt.loadNpmTasks('grunt-html2js')
    grunt.loadNpmTasks('grunt-browserify')

    // Default task.
    grunt.registerTask('default', ['jshint', 'uglify'])
    grunt.registerTask('styles', ['concat', 'stylus'])

}
