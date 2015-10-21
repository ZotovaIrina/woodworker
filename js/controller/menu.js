var app = require("../app");

app.controller('menu', function ($scope, $resource) {
    var menuRequest = $resourse('json/mainpage.json').get().$promise;
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