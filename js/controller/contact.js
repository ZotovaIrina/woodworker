var app = require("../app");

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