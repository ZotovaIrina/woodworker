global.jQuery = require('jquery');
require('jquery.fotorama');
require('angular');
require('angular-route');
require('angular-resource');

var app = angular.module('woodworks', ['ngRoute', 'ngResource']);


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

app.run(function () {
    $("#site-logo")
        .mouseover(function () {
            $(".popup").show();
        })
        .mouseout(function () {
            $(".popup").hide();
        });
});

module.exports = app;