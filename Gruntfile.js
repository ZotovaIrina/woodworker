module.exports = function (grunt) {
var originalPhoto = 'image/photo/src/**/*.jpg',
    bigImagesFolder = 'image/photo/big/',
    miniImagesFolder = 'image/photo/mini/';

    grunt.initConfig({

        jshint: {
            files: [
                'Gruntfile.js',
                'js/**/*.js',
                '!js/lib/**/*.js'
            ],
            options: {
                globals: {
                    jQuery: true
                }
            }
        },
        watch: {
            files: ['<%= jshint.files %>'],
            tasks: ['jshint']
        },
        image_resize: {
            resizeTo64: {
                options: {
                    width: 64,
                    height: 64,
                    upscale: true,
                    overwrite: true,
                    crop: false
                },
                src: originalPhoto,
                dest: miniImagesFolder
            },
            resizeTo940: {
                options: {
                    width: 940,
                    height: 940,
                    upscale: true,
                    overwrite: true,
                    crop: false
                },
                src: originalPhoto,
                dest: bigImagesFolder
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-image-resize');

    grunt.registerTask('default', ['jshint']);

};