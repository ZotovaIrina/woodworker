var app = angular.module('woodworks', ['ngRoute', 'ngResource']);


app.controller('mainPage', function ($scope) {
    $scope.items = [            // $scope – специальный объект, который задает параметры отображения переменной.
        {
            name: 'Дом',
            description: 'Мебель для спальни, кухни, оффиса',
            link: '#/page/room',
            imgLink: 'image/bed.jpg'
        },
        {
            name: 'Кресло-качалка',
            description: 'Описание кресел-качалок',
            link: '#/page/rocking_chair',
            imgLink: 'https://pp.vk.me/c627530/v627530274/6d23/TqCltgHOjus.jpg'
        },
        {
            name: 'Садовая мебель',
            description: 'Мебель для сада, бани, беседки',
            link: '#/page/garden_furniture',
            imgLink: 'https://pp.vk.me/c623629/v623629274/3f31c/SVgg4HgOmjY.jpg'
        },
        {
            name: 'Кухонная мебель',
            description: 'Мебель для кухни',
            link: '#/page/kitchen',
            imgLink: 'image/table.jpg'
        },
        {
            name: 'Прочее',
            description: 'Прочие мелочи',
            link: '#/page/other',
            imgLink: 'https://pp.vk.me/c623629/v623629274/3ff08/QyFF_YKO88o.jpg'
        },
        {
            name: 'Детская мебель',
            description: 'Мебель для детей, игрушки',
            link: '#/page/baby',
            imgLink: 'image/table.jpg'
        }
    ];

});

app.controller('page', function ($scope, $timeout, $routeParams, $resource) {

    var id = $routeParams.pageId; // присваиваем переменной id значение параметра URL pageId. PageId задано в ссылках на главной странице
    var contentRequest = $resource("json/content.json").get().$promise;
    contentRequest.then(
        function onSuccess(resource) {
            if (resource.success) {
                $scope.contents = resource.data.content[id];     // contents принимает значение массива с картинками и текстом с нужным id
                $timeout(function () {                            // Добавляем функцию timeoutБ которая откладывает выполнение фоторамы на 1 мс. Начинает выполняться функция scope и создает массив изображений
                    $('.fotorama').fotorama({});            // Фоторама же добавляется в очередь и дожидается завершения заполнения массива
                }, 1);
            }
        },
        function onError() {
            console.error(arguments);
        }
    );
})
;

app.controller('contact', function ($scope, $resource) {
    var contactRequest = $resource('json/contacts.json').get().$promise; // объект resource считывает данные из файла по адресу. В этом объекте есть метод get, который содержит промис с данными.
    contactRequest.then(    // После того, как ответ получен возможно 2 варианта развития событий: 1. данные считаны успешно. 2. Произошла ошибка
        function onSuccess(resource) {
            if (resource.success) {
                $scope.items = resource.data.contacts;  //Если данные успешно получены, то для отображение берутся данные из объекта
            }
        },
        function onError() {
            console.error(arguments);   // Если произошла ошибка чтения данных, то в консоль будет выведено сообщение об ошибке с перечнем всех аргументов
        }
    )
});


app.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
            when('/', {
                templateUrl: 'template/mainpage.html',
                controller: 'mainPage'
            }).
            when('/page/:pageId', {
                templateUrl: 'template/page.html',
                css: ['css/lib/fotorama.css', 'css/page.css'],
                controller: 'page'

            }).
            when('/about_me', {
                templateUrl: 'template/about_me.html',
                css: 'css/page.css'
            }).
            when('/contact', {
                templateUrl: 'template/contact.html',
                controller: 'contact',
                css: 'css/contact.css'
            }).
            otherwise({
                redirectTo: '/'
            });
    }]);
