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

app.controller('page', function ($scope, $timeout, $routeParams) {
    $timeout(function () {                            // Добавляем функцию timeoutБ которая откладывает выполнение фоторамы на 1 мс. Начинает выполняться функция scope и создает массив изображений
        $('.fotorama').fotorama({});            // Фоторама же добавляется в очередь и дожидается завершения заполнения массива
    }, 1);
    var id = $routeParams.pageId; // присваиваем переменной id значение параметра URL pageId. PageId задано в ссылках на главной странице
    var cont = {    // Объект содержащий данные для страниц. Список номеров картинок и адрес файла с текстом
        room: {
            images: [
                '6383',
                '6384',
                '6385',
                '6386',
                '6387',
                '6388',
                '6389',
                '6390',
                '6391'
            ],
            description: 'template/room.html'
        },
        rocking_chair: {
            images: [
                '6383',
                '6384',
                '6385',
                '6386',
                '6387',
                '6388',
                '6389',
                '6390',
                '6391'
            ],
            description: 'template/rocking_chair.html'
        },
        garden_furniture: {
            images: [
                '9490',
                '9491',
                '9493',
                '9494',
                '9496',
                '9497',
                '9499'
            ],
            description: 'template/garden_furniture.html'
        },
        kitchen: {
            images: [
                '9490',
                '9491',
                '9493',
                '9494',
                '9496',
                '9497',
                '9499'
            ],
            description: 'template/kitchen.html'
        },
        other: {
            images: [
                '9490',
                '9491',
                '9493',
                '9494',
                '9496',
                '9497',
                '9499'
            ],
            description: 'template/other.html'
        },
        baby: {
            images: [
                '9490',
                '9491',
                '9493',
                '9494',
                '9496',
                '9497',
                '9499'
            ],
            description: 'template/baby.html'
        }
    };
    $scope.contents = cont[id];     // contents принимает значение массива с картинками и текстом с нужным id
})
;

app.controller('contact', function ($scope, $resource) {
    var contactRequest = $resource('json/contacts.json').get().$promise;
    contactRequest.then(
        function onSuccess(resource) {
            if (resource.success) {
                $scope.items = resource.data.contacts;
            }
        },
        function onError() {
            console.error(arguments);
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
