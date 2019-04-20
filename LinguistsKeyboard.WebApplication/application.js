
var application = angular.module("LinguistsKeyboard", ["ngRoute"]);


application.config(function ($routeProvider) {
    $routeProvider
        .when("/", { templateUrl: "keyboard.html", controller: "KeyboardController" })
        .when("/settings", { templateUrl: "settings.html", controller: "SettingsController" });
});



application.controller("KeyboardController", ["$scope", function KeyboardController($scope) {

    $scope.row1Keys = "1234567890-=";
    $scope.row2Keys = "qwertyuiop[]";
    $scope.row3Keys = "asdfghjkl;'#";
    $scope.row4Keys = "\\zxcvbnm,./";

}]);