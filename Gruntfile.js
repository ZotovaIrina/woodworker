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
                    'js/**/*.js',
                    '!js/lib/**/*.js',
                    '!js/bundle.js'
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
                        {expand: true, src: ['js/bundle.js'], dest: 'build/', filter: 'isFile'},
                        {expand: true, src: ['json/**/*.json'], dest: 'build/', filter: 'isFile'},
                        {expand: true, src: ['css/**/*.css'], dest: 'build/', filter: 'isFile'},
                        {expand: true, src: ['image/photo/mini/**/*.jpg'], dest: 'build/', filter: 'isFile'},
                        {expand: true, src: ['image/photo/big/**/*.jpg'], dest: 'build/', filter: 'isFile'},
                        {expand: true, src: ['image/*'], dest: 'build/', filter: 'isFile'},
                        {expand: true, src: ['template/**/*.html'], dest: 'build/', filter: 'isFile'},
                        {expand: true, src: ['index.html'], dest: 'build/', filter: 'isFile'}
                    ]
                }
            },
            image: {            //сохранение фото в динамическом формате
                dynamic: {
                    files: [{
                        expand: true,
                        cwd: 'image/photo/',
                        src: '**/*.jpg',
                        dest: 'src!'
                    }]
                }
            },
            browserify: {           //Из отдельных js файлов делает один и отслеживает порядок функций
                dist: {
                    files: {
                        'js/bundle.js': ['js/**/*.js', '!js/bundle.js']
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
                    files: ['js/**/*.js', '!js/lib/**/*.js', '!js/bundle.js'],
                    tasks: ['jshint', 'browserify'],
                    options: {

                    }
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

    grunt.registerTask('default', ['jshint']);
    grunt.registerTask('build', [
        'jshint',
        'image_resize:resizeTo940',
        'image_resize:resizeTo64',
        'copy:all'
    ]);

    grunt.registerTask('dev', [
        'jshint',
        'copy:all',
        'browserify',
        'watch'
    ]);

};