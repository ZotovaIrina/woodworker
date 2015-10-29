var app = require("../app");

app.controller('MenuController', ['$scope', function ($scope) {
    $scope.menuToggle = function () {
        $scope.menuIsOpen = !$scope.menuIsOpen;
    };
    $scope.$on('documentClicked', function ($event, $element) {
        if ($element.hasClass("main-nav-link")) {
            return;
        }

        $scope.menuIsOpen = false;
        $scope.$apply();
    });
}]);

app.controller('menu', function ($scope, $resource) {
    var menuRequest = $resource('json/mainpage.json').get().$promise;

    menuRequest.then(
        function onSuccess(resource) {
            if (resource.success) {
                $scope.items = resource.data.mainpage;
            }
        },
        function onError() {
            console.error(arguments);
        }
    );
});