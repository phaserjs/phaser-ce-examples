module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.initConfig({

        compile_dir: 'js',

        rox: [

            'src/Boot.js',
            'src/Preloader.js',
            'src/MainMenu.js',
            'src/Player.js',
            'src/PlayerBullets.js',
            'src/Asteroid.js',
            'src/Asteroids.js',
            'src/Waves.js',
            'src/Game.js'

        ],

        clean: ['<%= compile_dir %>'],

        concat: {

            rox: {
                src: ['<%= rox %>'],
                dest: '<%= compile_dir %>/rox.js'
            },

        },

        uglify: {

            rox: {
                options: {
                    banner: '/* Rox by Photon Storm Ltd. */\n'
                },
                src: ['<%= concat.rox.dest %>'],
                dest: '<%= compile_dir %>/rox.min.js'
            },

        },

        copy: {
            main: {
                files: [
                    { src: ['dist/rox.min.js'], dest: 'js/rox.min.js' },
                    { src: ['../../../phaser/build/custom/phaser-arcade-physics.min.js'], dest: 'js/phaser.min.js' }
                ]
            }
        }

    });

    grunt.registerTask('default', ['clean', 'concat', 'uglify', 'copy']);

};
