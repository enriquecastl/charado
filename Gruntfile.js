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
        // Task configuration.
        concat: {
            options: {
                separator : '\n',
                banner : '<%= grunt.banner %>'
            },

            styles: {
                src : ['app/**/styles.styl'],
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
        watch: {
            gruntfile: {
                files: '<%= jshint.gruntfile.src %>',
                tasks: ['jshint:gruntfile']
            },
            lib_test: {
                files: '<%= jshint.lib_test.src %>',
                tasks: ['jshint:lib_test']
            },
            styles: {
                files: '<%= concat.styles.src %>',
                tasks: ['concat:styles', 'stylus:dist']
            }
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-jshint')
    grunt.loadNpmTasks('grunt-contrib-stylus')
    grunt.loadNpmTasks('grunt-contrib-concat')
    grunt.loadNpmTasks('grunt-contrib-watch')

    // Default task.
    grunt.registerTask('default', ['jshint', 'uglify'])
    grunt.registerTask('styles', ['concat', 'stylus'])

}
