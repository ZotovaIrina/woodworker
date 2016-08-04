global.jQuery = require('jquery');
require('jquery.fotorama');
require('angular');
require('angular-route');
require('angular-resource');

var app = angular.module('woodworks', ['ngRoute', 'ngResource']);


app.config(['$routeProvider', '$locationProvider',
    function ($routeProvider, $locationProvider) {
        $routeProvider.
            when('/', {
                templateUrl: '/template/mainpage.html',
                controller: 'mainPage'
            }).
            when('/page/:pageId', {
                templateUrl: '/template/page.html',
                css: ['/css/lib/fotorama.css', '/css/page.css'],
                controller: 'page'

            }).
            when('/about_me', {
                templateUrl: '/template/about_me.html',
                css: '/css/page.css'
            }).
            when('/contact', {
                templateUrl: '/template/contact.html',
                controller: 'contact',
                css: '/css/contact.css'
            }).
            otherwise({
                redirectTo: '/'
            });

//check browser support
        if(window.history && window.history.pushState){
            //$locationProvider.html5Mode(true); will cause an error $location in HTML5 mode requires a  tag to be present! Unless you set baseUrl tag after head tag like so: <head> <base href="/">

            // to know more about setting base URL visit: https://docs.angularjs.org/error/$location/nobase

            // if you don't wish to set base URL then use this
            $locationProvider.html5Mode({
                enabled: true,
                requireBase: false
            });
        }


    }]);

app.run(['$rootScope', function ($rootScope) {
    $("#site-logo")
        .mouseover(function () {
            $(".popup").show();
        })
        .mouseout(function () {
            $(".popup").hide();
        });
    angular.element(document).on("click", function (e) {
        $rootScope.$broadcast("documentClicked", angular.element(e.target));
    });
}]);

module.exports = app;