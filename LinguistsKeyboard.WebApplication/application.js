
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
        this._selectedKeyboards = ["EnglishUKBetter", "GreekForEnglishSpeakers", "RussianJCUKEN"];
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

    set showInstructions(value) {
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

    $scope.mainOutputElement = document.getElementById("mainOutput");
    $scope.mainOutput = settings.mainOutput;

    $scope.cursor1 = $scope.mainOutput.length;
    $scope.cursor2 = $scope.mainOutput.length;

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
    $scope.deleteKeyIsDown = false;
    $scope.spaceKeyIsDown = false;
    $scope.tabKeyIsDown = false;
    $scope.enterKeyIsDown = false;

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

        var l = $scope.mainOutput.length;

        $scope.mainOutput = $scope.mainOutput.slice(0, $scope.cursor1) + letter + $scope.mainOutput.slice($scope.cursor2, l);

        $scope.cursor1 = $scope.cursor1 + 1;
        $scope.cursor2 = $scope.cursor1;
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

    $scope.setRegister = function () {
        $scope.register = $scope.getRegister();
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

    $scope.clickKey = function (key) {
        $scope.pressKey(key);

        if (!$scope.shiftKeyIsDown && $scope.shiftState == 1) {
            $scope.shiftState = 0;
        }

        if (!$scope.altKeyIsDown && $scope.altState == 1) {
            $scope.altState = 0;
        }

        if (!$scope.controlKeyIsDown && $scope.controlState == 1) {
            $scope.controlState = 0;
        }

        $scope.setRegister();
    }

    $scope.clickShift = function () {
        if ($scope.shiftState == 0) {
            $scope.shiftState = 1;
        }
        else if ($scope.shiftState == 1 && !$scope.shiftKeyIsDown) {
            $scope.shiftState = 0;
        }
        else if ($scope.shiftState == 2) {
            $scope.shiftState = 0;
        }

        $scope.setRegister();
    }

    $scope.doubleClickShift = function () {
        if ($scope.shiftState == 0) {
            $scope.shiftState = 2;
        }
        else if ($scope.shiftState == 1 && !$scope.shiftKeyIsDown) {
            $scope.shiftState = 2;
        }
        else if ($scope.shiftState == 2) {
            $scope.shiftState = 0;
        }

        $scope.setRegister();
    }

    $scope.clickAlt = function () {
        if ($scope.altState == 0) {
            $scope.altState = 1;
        }
        else if ($scope.altState == 1 && !$scope.altKeyIsDown) {
            $scope.altState = 0;
        }
        else if ($scope.altState == 2) {
            $scope.altState = 0;
        }

        $scope.setRegister();
    }

    $scope.doubleClickAlt = function () {
        if ($scope.altState == 0) {
            $scope.altState = 2;
        }
        else if ($scope.altState == 1 && !$scope.altKeyIsDown) {
            $scope.altState = 2;
        }
        else if ($scope.altState == 2) {
            $scope.altState = 0;
        }

        $scope.setRegister();
    }

    $scope.clickControl = function () {
        if ($scope.controlState == 0) {
            $scope.controlState = 1;
        }
        else if ($scope.controlState == 1 && !$scope.controlKeyIsDown) {
            $scope.controlState = 0;
        }

        $scope.setRegister();
    }

    $scope.clickCapsLock = function () {
        $scope.capsLockState = ($scope.capsLockState == 0) ? 1 : 0;
    }

    $scope.clickTab = function () {
        $scope.tab();
    }

    $scope.clickEnter = function () {
        $scope.enter();
    }

    $scope.clickSpace = function () {
        $scope.space();
    }

    $scope.clickBackspace = function () {
        $scope.backspace();
    }

    $scope.clickDelete = function () {

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
        if ($scope.cursor1 == $scope.cursor2) {
            $scope.deleteAtPosition($scope.cursor1 , 1, -1);
        }
        else {
            $scope.deleteSection($scope.cursor1, $scope.cursor2);
        }
    }

    $scope.delete = function () {
        if ($scope.cursor1 == $scope.cursor2) {
            $scope.deleteAtPosition($scope.cursor1, 1, 1);
        }
        else {
            $scope.deleteSection($scope.cursor1, $scope.cursor2);
        }
    }

    $scope.deleteSection = function (i, j, direction) {

        var l = $scope.mainOutput.length;

        if (i < 0) { i = 0; }
        if (i > l) { i = l; }
        if (j < 0) { j = 0; }
        if (j > l) { j = l; }
        if (j < i) { var k = i; i = j; j = k; }

        if (j >= i) {
            $scope.mainOutput = $scope.mainOutput.slice(0, i) + $scope.mainOutput.slice(j, l);

       
                $scope.cursor1 = i;
                $scope.cursor2 = i;
         

            $scope.setSelection();
        }
    }

    $scope.deleteAtPosition = function (i, n, direction) {
        var l = $scope.mainOutput.length;

        if (direction > 0) {
            $scope.deleteSection(i, i + n, direction);
        }
        if (direction < 0) {
            $scope.deleteSection(i, i - n, direction);
        }
    }

    $scope.setSelection = function () {
        $scope.mainOutputElement.selectionStart = $scope.cursor1;
        $scope.mainOutputElement.selectionEnd = $scope.cursor2;
    }

    $scope.clickMainOutput = function () {
        $scope.cursor1 = $scope.mainOutputElement.selectionStart;
        $scope.cursor2 = $scope.mainOutputElement.selectionEnd;
    }

    $scope.keyDown = function (event) {

        if (event.shiftKey == false) {
            $scope.shiftKeyIsDown = false;
        }

        if (event.altKey == false) {
            $scope.altKeyIsDown = false;
        }

        if (event.ctrlKey == false) {
            $scope.controlKeyIsDown = false;
        }

        $scope.setRegister();

        if ($scope.controlState == 0 && event.code != "Space") {
            var i = keycodes.indexOf(event.code);
            
            if (i >= 0) {
                var key = $scope.currentKeyboard.getKey(i);

                $scope.pressKey(key);
                key.isDown = true;

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

        if (event.code == "Backspace") {
            $scope.backspaceKeyIsDown = true;
            $scope.backspace();
            event.preventDefault();
        }

        if (event.code == "Enter") {
            $scope.enterKeyIsDown = true;
            $scope.enter();
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
            $scope.capsLockState = ($scope.capsLockState == 0) ? 1 : 0;
            event.preventDefault();
        }

        if (event.code == "ArrowLeft" && $scope.controlState == 1) {
            $scope.selectPreviousKeyboard();
            event.preventDefault();
        }

        if (event.code == "ArrowRight" && $scope.controlState == 1) {
            $scope.selectNextKeyboard();
            event.preventDefault();
        }

        if (event.code == "ArrowLeft" && $scope.controlState == 0) {
            if ($scope.shiftIsDown) {
                if ($scope.cursor2 > 0) {
                    $scope.cursor2 -= 1;
                }
            }
            else {
                if ($scope.cursor1 > 0) {
                    $scope.cursor1 -= 1;
                }

                $scope.cursor2 = $scope.cursor1;
            }

            event.preventDefault();
        }

        if (event.code == "ArrowRight" && $scope.controlState == 0) {
            if ($scope.shiftIsDown) {
                if ($scope.cursor2 > 0) {
                    $scope.cursor2 += 1;
                }
            }
            else {
                if ($scope.cursor1 < $scope.mainOutput.length) {
                    $scope.cursor1 += 1;
                }

                $scope.cursor2 = $scope.cursor1;
            }

            event.preventDefault();
        }

        $scope.setSelection();
        $scope.setRegister();
        $scope.saveMainOutput();
    }

    $scope.keyUp = function (event) {

        $scope.setSelection();

        if ($scope.controlState == 0 && event.code != "Space") {
            var i = keycodes.indexOf(event.code);
            
            if (i >= 0) {
                var key = $scope.currentKeyboard.getKey(i);

                key.isDown = false;

                if (!$scope.shiftKeyIsDown && $scope.shiftState == 1) {
                    $scope.shiftState = 0;
                }

                if (!$scope.altKeyIsDown && $scope.altState == 1) {
                    $scope.altState = 0;
                }

                if (!$scope.controlKeyIsDown && $scope.controlState == 1) {
                    $scope.controlState = 0;
                }

                event.preventDefault();
            }
        }

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

        if (event.code == "Enter") {
            $scope.enterKeyIsDown = false;
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

        if (event.code == "ArrowLeft" && $scope.controlState == 1) {
            event.preventDefault();
        }

        if (event.code == "ArrowRight" && $scope.controlState == 1) {
            event.preventDefault();
        }

        $scope.setRegister();
    }

    $scope.saveMainOutput = function () {
        $scope.settings.mainOutput = $scope.mainOutput;
    }

    $scope.clearMainOutput = function () {
        $scope.mainOutput = "";

        $scope.cursor1 = 0;
        $scope.cursor2 = 0;

        $scope.saveMainOutput();
    }

    $scope.setRegister();
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