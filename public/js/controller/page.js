var app = require("../app");
    $ = require('jquery');

app.controller('page',['$scope', '$routeParams', '$resource', function ($scope, $routeParams, $resource) {
    var id = $routeParams.pageId; // присваиваем переменной id значение параметра URL pageId. PageId задано в ссылках на главной странице
    var contentRequest = $resource("json/content.json").get().$promise;
    contentRequest.then(
        function onSuccess(resource) {
            var content = resource.data.content[id],
                images = [],// Создаем массив, в который будут записываться адреса всех файлов с картинками
                fotoramaAPI = $('.fotorama') // Подключаем функцию управления фоторамой из javascript http://fotorama.io/customize/api/
                    .fotorama()
                    .data('fotorama');
            if (resource.success) {             // Если соединение прошло успешно, то
                $scope.contents = content;     // contents принимает значение массива с картинками и текстом с нужным id
                $scope.pageId = id;
                if (content.images && content.images.length) {  // Если получен объект с названиями картинок и этот объект имеет длину, т.е. не пустой, то
                    //подготавливаем картинки для фоторамы
                    angular.forEach(content.images, function (value) {         // Цикл ангуляра. Для каждого content.images выполняем функцию.
                        this.push({                                             // push добавляет новый элемент в массив, который передается в forEach 3м элементом, т.е. images
                            img: ['image/photo/big', id, value.name].join('/'),      // join объединяет элементы массива в одну строчку, вставляя между ними соединительный элемент
                            thumb: ['image/photo/mini', id, value.name].join('/'),
                            caption: value.caption
                        });
                    }, images);
                    fotoramaAPI
                        .load(images);
                }
            }
        },
        function onError() {
            console.error(arguments);
        }
    );
}]);