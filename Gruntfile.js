module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-lintspaces');

    grunt.loadTasks('./tasks');

    grunt.initConfig({

        examples: {
            all: {
            options: {
                base: 'examples',
                excludes: ['_site', 'assets', 'states', 'wip']
            },
            src: ['examples/**/*.js'],
            dest: 'examples/_site/examples.json'
            }
        },

        connect: {
            root: {
                options: {
                    keepalive: true,
                    hostname: '*',
                    port: 8001
                }
            }
        },

        prettify: {
            options: {
                indent: 4,
                indent_char: ' ',
                brace_style: 'end-expand',
                preserve_newlines: true
            },
            files: {
                expand: true,
                cwd: 'examples/',
                ext: '.js',
                src: ['*.js'],
                dest: 'examples/pretty/'
            }
        }

    });

    grunt.registerTask('default', ['examples']);

};
