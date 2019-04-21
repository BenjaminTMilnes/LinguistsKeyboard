
var application = angular.module("LinguistsKeyboard", ["ngRoute"]);


application.config(function ($routeProvider) {
    $routeProvider
        .when("/", { templateUrl: "keyboard.html", controller: "KeyboardController" })
        .when("/settings", { templateUrl: "settings.html", controller: "SettingsController" });
});


class Key {
    constructor(lowerShift, upperShift, alternateLowerShift, alternateUpperShift) {
        this.lowerShift = lowerShift;
        this.upperShift = upperShift;
        this.alternateLowerShift = alternateLowerShift;
        this.alternateUpperShift = alternateUpperShift;
    }

    get l() {
        return this.lowerShift;
    }

    get u() {
        return this.upperShift;
    }

    get al() {
        return this.alternateLowerShift;
    }

    get au() {
        return this.alternateUpperShift;
    }
}


class Keyboard {
    constructor(name,   lowerShift, upperShift, alternateLowerShift, alternateUpperShift) {
        this.name = name;
        this.lowerShift =   lowerShift.split("|");
        this.upperShift = upperShift.split("|");
        this.alternateLowerShift = alternateLowerShift.split("|");
        this.alternateUpperShift = alternateUpperShift.split("|");

        this.row1Keys = [];
        this.row2Keys = [];
        this.row3Keys = [];
        this.row4Keys = [];

        for (var i = 0; i < 12; i++) {
            this.row1Keys.push(this.getKey(i))
        }

        for (var i = 12; i < 24; i++) {
            this.row2Keys.push(this.getKey(i))
        }

        for (var i = 24; i < 36; i++) {
            this.row3Keys.push(this.getKey(i))
        }

        for (var i = 36; i < 47; i++) {
            this.row4Keys.push(   this.getKey(i))
        }
    }

    get l() {
        return this.lowerShift;
    }

    get u() {
        return this.upperShift;
    }

    get al() {
        return this.alternateLowerShift;
    }

    get au() {
        return this.alternateUpperShift;
    }

    getKey(i) {
        if (this.l[i] == " " && this.u[i] == " " && this.al[i] == " " && this.au[i] == " ") {
            return new Key(defaultKeyboardLowerShiftRegister[i], defaultKeyboardUpperShiftRegister[i], "", "");
        }
        else {
            return new Key(this.l[i], this.u[i], this.al[i], this.au[i]);
        }
    }

    getLetter(forDefault) {
        var i = -1;

        i = defaultKeyboardLowerShiftRegister.indexOf(forDefault);

        if (i >= 0) {
            return this.getKey(i);
        }

        i = defaultKeyboardUpperShiftRegister.indexOf(forDefault);

        if (i >= 0) {
            return this.getKey(i);
        }
    }
}


const defaultKeyboardLowerShiftRegister = "1234567890-=qwertyuiop[]asdfghjkl;'#\\zxcvbnm,./";
const defaultKeyboardUpperShiftRegister = "!\"£$%^&*()_+QWERTYUIOP{}ASDFGHJKL:@~ ZXCVBNM<>?";
const BLANK = "                                                ";

const defaultKeyboard = new Keyboard("English (UK)", defaultKeyboardLowerShiftRegister.split("").join("|"), defaultKeyboardUpperShiftRegister.split("").join("|"), BLANK.split("").join("|"), BLANK.split("").join("|"));
const macron1 = new Keyboard("English (UK) + Macrons",  " | | | | | | | | | | | |q̄|w̄|ē|r̄|t̄|ȳ|ū|ī|ō|p̄| | |ā|s̄|d̄|f\u0304|ḡ|h\u0304|j̄|k̄|l\u0304| | | | |z̄|x̄|c̄|v̄|b̄|n̄|m̄| | | ", " | | | | | | | | | | | |Q̄|W̄|Ē|R̄|T̄|Ȳ|Ū|Ī|Ō|P̄| | |Ā|S̄|D̄|F\u0304|Ḡ|H\u0304|J̄|K̄|L\u0304| | | | |Z̄|X̄|C̄|V̄|B̄|N̄|M̄| | | ", " | | | | | | | | | | | | | |ḗ| | |ȳ́|ū́|ī́|ṓ| | | |ā́| | | | | | | | | | | | | | | | | | | | | | ", " | | | | | | | | | | | | | |Ḗ| | |Ȳ́|Ū́|Ī́|Ṓ| | | |Ā́| | | | | | | | | | | | | | | | | | | | | | ");




application.controller("KeyboardController", ["$scope", function KeyboardController($scope) {
    
    $scope.currentKeyboard = macron1;
    $scope.availableKeyboards = [defaultKeyboard, macron1];

    $scope.shiftIsDown = false;
    $scope.altIsDown = false;
    $scope.controlIsDown = false;

    $scope.setKeyboard = function (keyboard) {
        $scope.currentKeyboard = keyboard;
    }

    $scope.typeLetter = function (letter) {
        if ($scope.mainOutput == undefined) {
            $scope.mainOutput = "";
        }

        $scope.mainOutput += letter.l;
    }

    $scope.backspace = function () {
        var l = $scope.mainOutput.length;

        if (l > 0) {
            if (l > 1 && $scope.mainOutput.slice(l - 1) == "\u0304") {
                $scope.mainOutput = $scope.mainOutput.slice(0, l - 2);
            }
            else {
                $scope.mainOutput = $scope.mainOutput.slice(0, l - 1);
            }
        }
    }

    $scope.keyDown = function (event) {

        var i = defaultKeyboardLowerShiftRegister.indexOf(event.key);
        
        if (i >= 0) {
            var l = $scope.currentKeyboard.getKey(i);
            
            $scope.typeLetter(l);
            event.preventDefault();
        }

        if (event.code == "Space") {
            $scope.typeLetter(new Key(" ", " ", " ", " "));
            event.preventDefault();
        }

        if (event.code == "Backspace") {
            $scope.backspace();
            event.preventDefault();
        }

        if (event.code == "ShiftLeft" || event.code == "ShiftRight") {
            $scope.shiftIsDown = true;
            event.preventDefault();
        }

        if (event.code == "AltLeft" || event.code == "AltRight") {
            $scope.altIsDown = true;
            event.preventDefault();
        }

        if (event.code == "ControlLeft" || event.code == "ControlRight") {
            $scope.controlIsDown = true;
            event.preventDefault();
        }
    }

    $scope.keyUp = function (event) {

        if (event.code == "ShiftLeft" || event.code == "ShiftRight") {
            $scope.shiftIsDown = false;
            event.preventDefault();
        }

        if (event.code == "AltLeft" || event.code == "AltRight") {
            $scope.altIsDown = false;
            event.preventDefault();
        }

        if (event.code == "ControlLeft" || event.code == "ControlRight") {
            $scope.controlIsDown = false;
            event.preventDefault();
        }

    }

}]);