
var application = angular.module("LinguistsKeyboard", ["ngRoute"]);

application.config(function ($routeProvider) {
    $routeProvider
        .when("/", { templateUrl: "keyboard.html", controller: "KeyboardController" })
        .when("/settings", { templateUrl: "settings.html", controller: "SettingsController" })
        .when("/credits", { templateUrl: "credits.html" });
});



class Settings {
    constructor() {
        this._mainOutput = "";
        this._numberOfRows = 7;
        this._selectedKeyboards =  ["EnglishUKBetter", "GreekForEnglishSpeakers", "RussianJCUKEN"];
        this._showInstructions = true;

        this.loadFromLocalStorage();
    }

    loadFromLocalStorage() {
        var hasBeenSet = window.localStorage.getItem("hasBeenSet");

        if (hasBeenSet) {
            this._mainOutput = window.localStorage.getItem("mainOutput");
            this._numberOfRows = parseInt(window.localStorage.getItem("numberOfRows"));
            this._selectedKeyboards = window.localStorage.getItem("selectedKeyboards").split(";");
            this._showInstructions = (window.localStorage.getItem("showInstructions") == "true");
        }
    }

    saveToLocalStorage() {
        window.localStorage.setItem("hasBeenSet", true);
        window.localStorage.setItem("mainOutput", this._mainOutput);
        window.localStorage.setItem("numberOfRows", this._numberOfRows);
        window.localStorage.setItem("selectedKeyboards", this._selectedKeyboards.join(";"));
        window.localStorage.setItem("showInstructions", this._showInstructions);
    }

    get mainOutput() {
        return this._mainOutput;
    }

    set mainOutput(value) {
        if (value != this._mainOutput) {
            this._mainOutput = value;

            this.saveToLocalStorage();
        }
    }

    get numberOfRows() {
        return this._numberOfRows;
    }

    set  numberOfRows(value) {
        if (value != this._numberOfRows) {
            this._numberOfRows = value;

            this.saveToLocalStorage();
        }
    }

    get selectedKeyboards() {
        Keyboards.forEach(k => {
            if (this._selectedKeyboards.filter(sk => sk == k.reference).length > 0) {
                k.isSelected = true;
            }
            else {
                k.isSelected = false;
            }
        });

        return Keyboards;
    }

    set selectedKeyboards(value) {
        var sk = value.filter(k => k.isSelected).map(k => k.reference);

        if (sk != this._selectedKeyboards) {
            this._selectedKeyboards = sk;

            this.saveToLocalStorage();
        }
    }

    get showInstructions() {
        return this._showInstructions;
    }

    set  showInstructions(value) {
        if (value != this._showInstructions) {
            this._showInstructions = value;

            this.saveToLocalStorage();
        }
    }
}

application.factory("settings", function () {
    return new Settings();
});

application.directive("letterkey", function () {
    return {
        restrict: "E",
        templateUrl: "letterkey.html",
        scope: {
            key: "=key",
            register: "=register"
        }
    };
});

application.controller("KeyboardController", ["$scope", "settings", function KeyboardController($scope, settings) {

    $scope.settings = settings;

    $scope.mainOutput = settings.mainOutput;

    $scope.currentKeyboard = null;
    $scope.currentKeyboardIndex = 0;
    $scope.availableKeyboards = settings.selectedKeyboards.filter(k => k.isSelected);

    if ($scope.availableKeyboards.length == 0) {
        $scope.availableKeyboards = [defaultKeyboard];
    }

    $scope.register = 1;

    $scope.shiftKeyIsDown = false;
    $scope.shiftState = 0;

    $scope.altKeyIsDown = false;
    $scope.altState = 0;

    $scope.controlKeyIsDown = false;
    $scope.controlState = 0;

    $scope.capsLockState = 0;

    $scope.backspaceKeyIsDown = false;
    $scope.spaceKeyIsDown = false;
    $scope.tabKeyIsDown = false;

    $scope.setKeyboard = function (keyboard) {
        $scope.currentKeyboard = keyboard;
        $scope.currentKeyboardIndex = $scope.availableKeyboards.indexOf(keyboard);
    }

    $scope.limitKeyboardIndex = function () {
        if ($scope.currentKeyboardIndex >= $scope.availableKeyboards.length) {
            $scope.currentKeyboardIndex = $scope.availableKeyboards.length - 1;
        }
        if ($scope.currentKeyboardIndex < 0) {
            $scope.currentKeyboardIndex = 0;
        }
    }

    $scope.selectNextKeyboard = function () {
        $scope.selectKeyboard($scope.currentKeyboardIndex + 1);
    }

    $scope.selectPreviousKeyboard = function () {
        $scope.selectKeyboard($scope.currentKeyboardIndex - 1);
    }

    $scope.selectKeyboard = function (index) {
        $scope.currentKeyboardIndex = index;
        $scope.limitKeyboardIndex();

        $scope.currentKeyboard = $scope.availableKeyboards[$scope.currentKeyboardIndex];
    }

    $scope.typeLetter = function (letter) {
        if ($scope.mainOutput == undefined || $scope.mainOutput == null) {
            $scope.mainOutput = "";
        }

        $scope.mainOutput += letter;
    }

    $scope.getRegister = function () {
        var shiftState = ($scope.shiftState == 1 || $scope.shiftState == 2) || ($scope.capsLockState == 1);
        var altState = ($scope.altState == 1 || $scope.altState == 2);

        if (!shiftState && !altState) {
            return 1;
        }
        if (shiftState && !altState) {
            return 2;
        }
        if (!shiftState && altState) {
            return 3;
        }
        if (shiftState && altState) {
            return 4;
        }

        return 1;
    }

    $scope.pressKey = function (key) {
        var c = "";
        var r = $scope.getRegister();

        if (r == 1) {
            c = key.l;
        }
        if (r == 2) {
            c = key.u;
        }
        if (r == 3) {
            c = key.al;
        }
        if (r == 4) {
            c = key.au;
        }

        $scope.typeLetter(c);
    }

    $scope.pressSpace = function () {
        $scope.typeLetter(" ");
    }

    $scope.clickKey = function (key) {
        $scope.pressKey(key);
    }

    $scope.clickShift = function () {
        if ($scope.shiftState == 0) {
            $scope.shiftState = 1;
        }
        if ($scope.shiftState == 1 && !$scope.shiftKeyIsDown) {
            $scope.shiftState = 0;
        }
        if ($scope.shiftState == 2) {
            $scope.shiftState = 0;
        }
    }

    $scope.doubleClickShift = function () {
        if ($scope.shiftState == 0) {
            $scope.shiftState = 2;
        }
        if ($scope.shiftState == 1 && !$scope.shiftKeyIsDown) {
            $scope.shiftState = 2;
        }
        if ($scope.shiftState == 2) {
            $scope.shiftState = 0;
        }
    }

    $scope.clickAlt = function () {
        if ($scope.altState == 0) {
            $scope.altState = 1;
        }
        if ($scope.altState == 1 && !$scope.altKeyIsDown) {
            $scope.altState = 0;
        }
        if ($scope.altState == 2) {
            $scope.altState = 0;
        }
    }

    $scope.doubleClickAlt = function () {
        if ($scope.altState == 0) {
            $scope.altState = 2;
        }
        if ($scope.altState == 1 && !$scope.altKeyIsDown) {
            $scope.altState = 2;
        }
        if ($scope.altState == 2) {
            $scope.altState = 0;
        }
    }

    $scope.clickControl = function () {
        if ($scope.controlState == 0) {
            $scope.controlState = 1;
        }
        if ($scope.controlState == 1 && !$scope.controlKeyIsDown) {
            $scope.controlState = 0;
        }
    }

    $scope.clickCapsLock = function () { }

    $scope.clickTab = function () {
        $scope.tab();
    }

    $scope.clickEnter = function () {
        $scope.enter();
    }

    $scope.clickBackspace = function () {
        $scope.backspace();
    }

    $scope.tab = function () {
        $scope.typeLetter("\t");
    }

    $scope.enter = function () {
        $scope.typeLetter("\n");
    }

    $scope.space = function () {
        $scope.typeLetter(" ");
    }

    $scope.backspace = function () {
        var l = $scope.mainOutput.length;

        if (l > 0) {
            $scope.mainOutput = $scope.mainOutput.slice(0, l - 1);
        }
    }

    $scope.keyDown = function (event) {

        if (event.altKey == false) {
            $scope.altKeyIsDown = false;
        }

        if (event.ctrlKey == false) {
            $scope.controlKeyIsDown = false;
        }

        $scope.register = $scope.getRegister();

        if ($scope.controlState == 0 && event.code != "Space") {
            var i = defaultKeyboardLowerShiftRegister.indexOf(event.key);

            if (i < 0) {
                i = defaultKeyboardUpperShiftRegister.indexOf(event.key);
            }

            if (i >= 0) {
                var key = $scope.currentKeyboard.getKey(i);

                $scope.pressKey(key);

                event.preventDefault();
            }
        }

        if ($scope.controlState == 1 && isAnyOneOf("0123456789", event.key)) {
            $scope.selectKeyboard(event.key - 1);
            event.preventDefault();
        }

        if (event.code == "Space") {
            $scope.spaceKeyIsDown = true;
            $scope.space();
            event.preventDefault();
        }

        if (event.code == "Tab") {
            $scope.tabKeyIsDown = true;
            $scope.tab();
            event.preventDefault();
        }

        if (event.code == "Enter") {
            $scope.enter();
            event.preventDefault();
        }

        if (event.code == "Backspace") {
            $scope.backspaceKeyIsDown = true;
            $scope.backspace();
            event.preventDefault();
        }

        if (event.code == "ShiftLeft" || event.code == "ShiftRight") {
            $scope.shiftKeyIsDown = true;
            $scope.shiftState = 1;
            event.preventDefault();
        }

        if (event.code == "AltLeft" || event.code == "AltRight") {
            $scope.altKeyIsDown = true;
            $scope.altState = 1;
            event.preventDefault();
        }

        if (event.code == "ControlLeft" || event.code == "ControlRight") {
            $scope.controlKeyIsDown = true;
            $scope.controlState = 1;
            event.preventDefault();
        }

        if (event.code == "CapsLock") {
            $scope.capsLockIsOn = !$scope.capsLockIsOn;
            $scope.capsLockState = ($scope.capsLockState == 0) ? 1 : 0;
            event.preventDefault();
        }

        if (event.code == "ArrowLeft" && $scope.controlIsDown) {
            $scope.selectPreviousKeyboard();
            event.preventDefault();
        }

        if (event.code == "ArrowRight" && $scope.controlIsDown) {
            $scope.selectNextKeyboard();
            event.preventDefault();
        }

        if (event.shiftKey == false) {
            $scope.shiftKeyIsDown = false;
        }

        $scope.register = $scope.getRegister();

        $scope.settings.mainOutput = $scope.mainOutput;
    }

    $scope.keyUp = function (event) {

        if (event.code == "Space") {
            $scope.spaceKeyIsDown = false;
            event.preventDefault();
        }

        if (event.code == "Tab") {
            $scope.tabKeyIsDown = false;
            event.preventDefault();
        }

        if (event.code == "Backspace") {
            $scope.backspaceKeyIsDown = false;
            event.preventDefault();
        }

        if (event.code == "ShiftLeft" || event.code == "ShiftRight") {
            $scope.shiftKeyIsDown = false;
            $scope.shiftState = 0;
            event.preventDefault();
        }

        if (event.code == "AltLeft" || event.code == "AltRight") {
            $scope.altKeyIsDown = false;
            $scope.altState = 0;
            event.preventDefault();
        }

        if (event.code == "ControlLeft" || event.code == "ControlRight") {
            $scope.controlIsDown = false;
            $scope.controlState = 0;
            event.preventDefault();
        }

        $scope.register = $scope.getRegister();
    }

    $scope.clearMainOutput = function () {
        $scope.mainOutput = "";

        $scope.settings.mainOutput = $scope.mainOutput;
    }

    $scope.register = $scope.getRegister();
    $scope.selectKeyboard(0);

    new ClipboardJS(".copybutton");

}]);


application.controller("SettingsController", ["$scope", "settings", function SettingsController($scope, settings) {

    $scope.settings = settings;

    $scope.keyboards = settings.selectedKeyboards;

    $scope.$watch("keyboards", function (newValue, oldValue) {
        $scope.settings.selectedKeyboards = $scope.keyboards;
    }, true);

}]);