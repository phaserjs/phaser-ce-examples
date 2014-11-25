module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-contrib-connect');

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
        }

    });

    grunt.registerTask('default', ['examples']);

};
