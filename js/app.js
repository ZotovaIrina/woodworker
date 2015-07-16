var app = angular.module('woodworks', ['ngRoute', 'ngResource']);


app.controller('mainPage', function ($scope) {
    $scope.items = [            // $scope – специальный объект, который задает параметры отображения переменной.
        {
            name: 'Дом',
            description: 'Мебель для спальни, кухни, офиса',
            link: '#/page/room',
            imgLink: 'image/photo/big/room/DSC_8339.jpg'
        },
        {
            name: 'Кресло-качалка',
            description: 'Описание кресел-качалок',
            link: '#/page/rocking_chair',
            imgLink: 'image/photo/big/rocking_chair/DSC_9464.jpg'
        },
        {
            name: 'Садовая мебель',
            description: 'Мебель для сада, бани, беседки',
            link: '#/page/garden_furniture',
            imgLink: 'image/photo/big/garden_furniture/DSC_9448.jpg'
        },
        {
            name: 'Кухонная мебель',
            description: 'Мебель для кухни',
            link: '#/page/kitchen',
            imgLink: 'image/photo/big/kitchen/DSC_9486.jpg'
        },
        {
            name: 'Прочее',
            description: 'Прочие мелочи',
            link: '#/page/other',
            imgLink: 'image/photo/big/other/DSC_9477.jpg'
        },
        {
            name: 'Детская мебель',
            description: 'Мебель для детей, игрушки',
            link: '#/page/baby',
            imgLink: 'image/photo/big/baby/DSC_9654.jpg'
        }
    ];

});

app.controller('page', function ($scope, $routeParams, $resource) {
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
});

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
    );
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
