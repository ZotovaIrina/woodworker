var app = require("../app");

app.controller('mainPage',['$scope', '$resource', function ($scope, $resource) {
    var mainpageRequest = $resource('json/mainpage.json').get().$promise;
    mainpageRequest.then(
        function onSuccess(resource) {
            if (resource.success) {
                $scope.items = resource.data.mainpage;
            }
        },
        function onError() {
            console.error(arguments);
        }
    );

}]);