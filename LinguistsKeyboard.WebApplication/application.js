
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
    constructor(name, lowerShift, upperShift, alternateLowerShift, alternateUpperShift) {
        this.name = name;
        this.lowerShift = lowerShift.split("|");
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
            this.row4Keys.push(this.getKey(i))
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

function isAnyOneOf(characters, character) {
    return (characters.split("").filter(c => c == character).length > 0);
}

function applyDiacritic(set, diacritic) {
    return set.split("").map(c => (isAnyOneOf(lowercaseEnglishLetters + uppercaseEnglishLetters, c)) ? c + diacritic : c).join("|");
}


class DiacriticModifierKeyboard extends Keyboard {
    constructor(name, diacritic) {
        super(name, applyDiacritic(defaultKeyboardLowerShiftRegister, diacritic), applyDiacritic(defaultKeyboardUpperShiftRegister, diacritic), BLANK.split("").join("|"), BLANK.split("").join("|"));
    }
}


const defaultKeyboardLowerShiftRegister = "1234567890-=qwertyuiop[]asdfghjkl;'#\\zxcvbnm,./";
const defaultKeyboardUpperShiftRegister = "!\"£$%^&*()_+QWERTYUIOP{}ASDFGHJKL:@~ ZXCVBNM<>?";
const BLANK = "                                                ";

const lowercaseEnglishLetters = "qwertyuiopasdfghjklzxcvbnm";
const uppercaseEnglishLetters = "QWERTYUIOPASDFGHJKLZXCVBNM";

const defaultKeyboard = new Keyboard("English", defaultKeyboardLowerShiftRegister.split("").join("|"), defaultKeyboardUpperShiftRegister.split("").join("|"), BLANK.split("").join("|"), BLANK.split("").join("|"));
const englishMacron = new DiacriticModifierKeyboard("English + Macrons", "\u0304");
const englishAcute = new DiacriticModifierKeyboard("English + Acute Accents", "\u0301");
const englishDiacritics = new Keyboard("English + Diacritics", defaultKeyboardLowerShiftRegister.split("").join("|"), defaultKeyboardUpperShiftRegister.split("").join("|"), "\u0301|\u0300|\u0302|\u030C|\u0306|\u0304|\u0307|\u0308|\u0303|\u030A" + BLANK.substr(10).split("").join("|"), BLANK.split("").join("|"));
const greek = new Keyboard("Greek", "1234567890-=χωερτυ ιοπ[]ασδφθη κλ;'#\\ζξγψβνμ,./".split("").join("|"), "!\"£$%^&*()_+ΧΩΕΡΤΥ ΙΟΠ{}ΑΣΔΦΘΗ ΚΛ:@~ ΖΞΓΨΒΝΜ<>?".split("").join("|"), "\u0301\u0308                       ς                       ".split("").join("|"), BLANK.split("").join("|"));
const mathematics1 = new Keyboard("Mathematics 1", "1234567890\u2212\u002bqwertyuiop()asdfghjkl;'#\\zxcvbnm,./".split("").join("|"), "!\"£$%^&\u00d7  _+QWERTYUIOP{}ASDFGHJKL:@~ ZXCVBNM<>?".split("").join("|"), "\u2081\u2082\u2083\u2084\u2085\u2086\u2087\u2088\u2089\u2080\u208b\u208aχωερτυ ιοπ[]ασδφθη κλ    ζξγψβνμ\u226a\u226b ".split("").join("|"), "\u00b9\u00b2\u00b3\u2074\u2075\u2076\u2077\u2078\u2079\u2070\u207b\u207aΧΩΕΡΤΥ ΙΟΠ  ΑΣΔΦΘΗ ΚΛ    ΖΞΓΨΒΝΜ\u2264\u2265 ".split("").join("|"));
const T1German = new Keyboard("German (T1)", "1234567890ß qwertzuiopü+asdfghjklöä#<yxcvbnm,.-".split("").join("|"), "!\"§$%&/()=? QWERTZUIOP *ASDFGHJKL  '>YXCVBNM;:_".split("").join("|"), "                                                ".split("").join("|"), "                                                ".split("").join("|"));



application.controller("KeyboardController", ["$scope", function KeyboardController($scope) {

    $scope.currentKeyboard = defaultKeyboard;
    $scope.currentKeyboardIndex = 0;
    $scope.availableKeyboards = [defaultKeyboard, englishDiacritics, greek, mathematics1, T1German];

    $scope.shiftIsDown = false;
    $scope.altIsDown = false;
    $scope.controlIsDown = false;
    $scope.capsLockIsOn = false;
    $scope.backspaceIsDown = false;
    $scope.spaceIsDown = false;
    $scope.tabIsDown = false;

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
        $scope.currentKeyboardIndex += 1;
        $scope.limitKeyboardIndex();

        $scope.currentKeyboard = $scope.availableKeyboards[$scope.currentKeyboardIndex];
    }

    $scope.selectPreviousKeyboard = function () {
        $scope.currentKeyboardIndex -= 1;
        $scope.limitKeyboardIndex();

        $scope.currentKeyboard = $scope.availableKeyboards[$scope.currentKeyboardIndex];
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

    $scope.backspace = function () {
        var l = $scope.mainOutput.length;

        if (l > 0) {
            $scope.mainOutput = $scope.mainOutput.slice(0, l - 1);
        }
    }

    $scope.keyDown = function (event) {

        if (!$scope.controlIsDown && event.code != "Space") {
            var i = defaultKeyboardLowerShiftRegister.indexOf(event.key);

            if (i < 0) {
                i = defaultKeyboardUpperShiftRegister.indexOf(event.key);
            }

            if (i >= 0) {
                var key = $scope.currentKeyboard.getKey(i);
                var c = "";

                if (!$scope.shiftIsDown && !$scope.capsLockIsOn && !$scope.altIsDown) {
                    c = key.l;
                }
                if (($scope.shiftIsDown || $scope.capsLockIsOn) && !$scope.altIsDown) {
                    c = key.u;
                }
                if (!$scope.shiftIsDown && !$scope.capsLockIsOn && $scope.altIsDown) {
                    c = key.al;
                }
                if (($scope.shiftIsDown || $scope.capsLockIsOn) && $scope.altIsDown) {
                    c = key.au;
                }

                $scope.typeLetter(c);
                event.preventDefault();
            }
        }

        if ($scope.controlIsDown && isAnyOneOf("0123456789", event.key)) {
            $scope.selectKeyboard(event.key - 1);
            event.preventDefault();
        }

        if (event.code == "Space") {
            $scope.spaceIsDown = true;
            $scope.typeLetter(" ");
            event.preventDefault();
        }

        if (event.code == "Tab") {
            $scope.tabIsDown = true;
            $scope.typeLetter("\t");
            event.preventDefault();
        }

        if (event.code == "Backspace") {
            $scope.backspaceIsDown = true;
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

        if (event.code == "CapsLock") {
            $scope.capsLockIsOn = !$scope.capsLockIsOn;
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
    }

    $scope.keyUp = function (event) {

        if (event.code == "Space") {
            $scope.spaceIsDown = false;
            event.preventDefault();
        }

        if (event.code == "Tab") {
            $scope.tabIsDown = false;
            event.preventDefault();
        }

        if (event.code == "Backspace") {
            $scope.backspaceIsDown = false;
            event.preventDefault();
        }

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


application.controller("SettingsController", ["$scope", function SettingsController($scope) {



}]);