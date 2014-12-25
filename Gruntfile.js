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
                src : ['<%= features + "/styles.styl"'],
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
                src: ['app/**/.js']
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
                tasks: ['concat:styles', 'stylus:dist']
            },
            templates: {
                files: '<%= html2js.dist.src %>',
                tasks: ['html2js:dist']
            },
            browserify: {
                files: '<%= browserify.dist.src %>',
                tasks: ['browserify:dist']
            },
            devel: {
                src: [
                    '<%= jshint.lib_test.src %>'
                ]
            }
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-concat')
    grunt.loadNpmTasks('grunt-contrib-jshint')
    grunt.loadNpmTasks('grunt-contrib-stylus')
    grunt.loadNpmTasks('grunt-html2js')
    grunt.loadNpmTasks('grunt-browserify')
    grunt.loadNpmTasks('grunt-contrib-watch')

    // Default task.
    grunt.registerTask('default', ['jshint', 'uglify'])
    grunt.registerTask('styles', ['concat', 'stylus'])

}
