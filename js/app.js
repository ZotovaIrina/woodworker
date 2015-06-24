var app = angular.module('woodworks', ['ngRoute']);


app.controller('mainPage', function ($scope) {
    $scope.items = [            // $scope – специальный объект, который задает параметры отображения переменной.
        {
            name: 'Комната',
            description: 'Мебель для спальни, прихожей',
            link: '#/room',
            imgLink: 'image/bed.jpg'
        },
        {
            name: 'Кресло-качалка',
            description: 'Описание кресел-качалок',
            link: 'http://link.ru',
            imgLink: 'image/dsc_8343.jpg'
        },
        {
            name: 'Садовая мебель',
            description: 'Мебель для сада, бани, беседки',
            link: 'http://link.ru',
            imgLink: 'image/dsc_8343.jpg'
        },
        {
            name: 'Кухонная мебель',
            description: 'Мебель для кухни',
            link: 'http://link.ru',
            imgLink: 'image/table.jpg'
        },
        {
            name: 'Прочее',
            description: 'Прочие мелочи',
            link: 'http://link.ru',
            imgLink: 'image/other.jpg'
        },
        {
            name: 'Контакты',
            description: 'Как со мной связаться',
            link: 'http://link.ru',
            imgLink: 'image/table.jpg'
        }
    ];

});

app.controller('room', function ($scope) {
    $('.fotorama').fotorama({
    });
});

app.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/', {
                templateUrl: 'template/mainpage.html',
                controller: 'mainPage'
            }).
            when('/room', {
                templateUrl: 'template/room.html',
                css: ['css/lib/fotorama.css', 'css/room.css'],
                controller: 'room'

            }).
            when('/rocking-chair', {
                templateUrl: 'template/rocking_chair.html'
            }).
            when('/garden-furniture', {
                templateUrl: 'template/garden_furniture.html'
            }).
            when('/kitchen', {
                templateUrl: 'template/kitchen.html'
            }).
            when('/about-me', {
                templateUrl: 'template/about-me.html',
                css: 'css/about-me.css'
            }).
            otherwise({
                redirectTo: '/'
            });
    }]);
