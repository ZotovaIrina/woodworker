var app = require("../app");

app.directive('menuDerective', function () {
    return {
        templateUrl: 'template/menu.html',
        controller: 'menu',
        css: 'menu.css'
    };
});