module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-contrib-jshint');

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
        },

	jshint: {
        all: [
	        'examples/**/*.js',
		    '!!examples/_site/**',
		    '!!examples/_plugins/**',
		    '!!examples/wip/**'
	    ],
        options: {
	        jshintrc: 'tasks/jshint.json'
        }
	}

    });

    grunt.registerTask('default', ['examples']);

};
