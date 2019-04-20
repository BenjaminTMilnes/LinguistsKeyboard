
var application = angular.module("LinguistsKeyboard", ["ngRoute"]);


application.config(function ($routeProvider) {
    $routeProvider
        .when("/", { templateUrl: "keyboard.html", controller: "KeyboardController" })
        .when("/settings", { templateUrl: "settings.html", controller: "SettingsController" });
});


var defaultKeyboardLowerShiftRegister = "1234567890-=qwertyuiop[]asdfghjkl;'#\\zxcvbnm,./ ";



application.controller("KeyboardController", ["$scope", function KeyboardController($scope) {

    $scope.row1Keys = "1234567890-=";
    $scope.row2Keys = "qwertyuiop[]";
    $scope.row3Keys = "asdfghjkl;'#";
    $scope.row4Keys = "\\zxcvbnm,./";

    $scope.currentKeyboard = defaultKeyboardLowerShiftRegister;

    $scope.typeLetter = function (letter) {
        if ($scope.mainOutput == undefined) {
            $scope.mainOutput = "";
        }

        $scope.mainOutput += letter;
    }

    $scope.keyDown = function (event) {

        var i = defaultKeyboardLowerShiftRegister.indexOf(event.key);

        if (i >= 0) {
            var l = $scope.currentKeyboard[i];

            $scope.typeLetter(l);

            event.preventDefault();
        }

    }

}]);