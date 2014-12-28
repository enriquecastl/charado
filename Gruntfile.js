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
        distFiles : {
            build : 'build.js',
            templates : 'template.js',
            styles : 'styles.css'
        },
        features: 'app/**',
        // Task configuration.
        browserify : {
            dist : {
                src : 'app/main/index.js',
                dest : '<%= dist + "/" + distFiles.build %>'
            }
        },
        clean : ['tmp'],
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
                dest : '<%= dist + "/" + distFiles.styles %>'
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
                dest: '<%= dist + "/" + distFiles.templates %>'
            }
        },
        'compile-handlebars': {
            dist: {
                template: 'app/index.hbl',
                templateData: {
                    ngVersion: '1.3.7',
                    styles: '<%= distFiles.styles %>',
                    templates: '<%= distFiles.templates %>',
                    build: '<%= distFiles.build %>'
                },
                output: 'dist/index.html'
            }
        },
        connect : {
            serve: {
                options: {
                    port: 3000,
                    livereload : true,
                    open : true,
                    base : '<%= dist %>'
                }
            }
        },
        watch: {
            options: {
                livereload : true
            },
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
            handlebars: {
                files: 'app/index.hbl',
                tasks : ['compile-handlebars']
            },
            browserify: {
                files: '<%= jshint.lib_test.src %>',
                tasks: ['browserify:dist']
            }
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-connect')
    grunt.loadNpmTasks('grunt-contrib-concat')
    grunt.loadNpmTasks('grunt-contrib-jshint')
    grunt.loadNpmTasks('grunt-contrib-stylus')
    grunt.loadNpmTasks('grunt-contrib-watch')
    grunt.loadNpmTasks('grunt-contrib-clean')
    grunt.loadNpmTasks('grunt-compile-handlebars')
    grunt.loadNpmTasks('grunt-html2js')
    grunt.loadNpmTasks('grunt-browserify')

    // Default task.
    grunt.registerTask('styles', ['concat', 'stylus'])
    grunt.registerTask('compile', ['jshint', 'browserify'])
    grunt.registerTask('templates', ['html2js', 'compile-handlebars'])
    grunt.registerTask('build', ['styles', 'compile', 'templates', 'clean'])
    grunt.registerTask('serve', ['build', 'connect:serve', 'watch'])
    grunt.registerTask('default', ['build'])
}
