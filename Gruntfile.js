module.exports = function (grunt) {
    var originalPhoto = 'image/photo/src/**/*.jpg',
        bigImagesFolder = 'image/photo/big/',
        miniImagesFolder = 'image/photo/mini/',
        bigImagesFolderBuild = 'build/image/photo/big/',
        miniImagesFolderBuild = 'build/image/photo/mini/';

    grunt.initConfig({
            jshint: {                   // Проверка ошибок
                files: [
                    'Gruntfile.js',
                    'public/js/**/*.js',
                    '!public/js/lib/**/*.js',
                    '!public/js/bundle.js'
                ],
                options: {
                    globals: {
                        jQuery: true
                    }
                }
            },
            image_resize: {             // Изменение размера фото
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
            },
            copy: {             // Копирование файлов
                all: {
                    files: [
                        // includes files within path
                        {expand: true, src: ['public/js/bundle.js'], dest: 'build/', filter: 'isFile'},
                        {expand: true, src: ['public/json/**/*.json'], dest: 'build/', filter: 'isFile'},
                        {expand: true, src: ['public/css/**/*.css'], dest: 'build/', filter: 'isFile'},
                        {expand: true, src: ['public/image/photo/mini/**/*.jpg'], dest: 'build/', filter: 'isFile'},
                        {expand: true, src: ['public/image/photo/big/**/*.jpg'], dest: 'build/', filter: 'isFile'},
                        {expand: true, src: ['public/image/*'], dest: 'build/', filter: 'isFile'},
                        {expand: true, src: ['public/template/**/*.html'], dest: 'build/', filter: 'isFile'},
                        {expand: true, src: ['public/index.html'], dest: 'build/', filter: 'isFile'}
                    ]
                }
            },
            image: {            //сохранение фото в динамическом формате
                dynamic: {
                    files: [{
                        expand: true,
                        cwd: 'public/image/photo/',
                        src: 'public/**/*.jpg',
                        dest: 'public/src!'
                    }]
                }
            },
            browserify: {           //Из отдельных js файлов делает один и отслеживает порядок функций
                dist: {
                    files: {
                        'public/js/bundle.js': ['public/js/**/*.js', '!public/js/bundle.js']
                    },
                    transform: ["browserify-shim"],
                    options: {
                        browserifyOptions: {
                            debug: true
                        }
                    }
                }
            },
            watch: {                //Сканирует изменения в файлах, если изменение есть, то автоматически запускает browserify
                scripts: {
                    files: ['public/js/**/*.js', '!public/js/lib/**/*.js', '!public/js/bundle.js'],
                    tasks: ['jshint', 'browserify'],
                    options: {

                    }
                }
            },
            uglify: {
                js: {
                    src: ['public/js/bundle.js'],
                    dest: 'public/js/bundle.min.js'
                }
            }
        }
    );

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-image-resize');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-image');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['jshint']);
    grunt.registerTask('build', [
        'jshint',
        'image_resize:resizeTo940',
        'image_resize:resizeTo64',
        'copy:all'
    ]);

    grunt.registerTask('dev', [
        'jshint',
        'browserify',
        'watch'
    ]);

    grunt.registerTask('min', [
        'uglify'
    ]);

};