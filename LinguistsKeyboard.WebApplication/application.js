
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
    constructor( lowerShift, upperShift, alternateLowerShift, alternateUpperShift) {
        this.name = "";
        this.lowerShift =   lowerShift.split("|");
        this.upperShift = upperShift.split("|");
        this.alternateLowerShift = alternateLowerShift.split("|");
        this.alternateUpperShift = alternateUpperShift.split("|");

        this.row1Keys = [];
        this.row2Keys = [];
        this.row3Keys = [];
        this.row4Keys = [];

        for (var i = 0; i < 12; i++) {
            this.row1Keys.push(new Key(this.lowerShift[i], this.upperShift[i], this.alternateLowerShift[i], this.alternateUpperShift[i]))
        }

        for (var i = 12; i < 24; i++) {
            this.row2Keys.push(new Key(this.lowerShift[i], this.upperShift[i], this.alternateLowerShift[i], this.alternateUpperShift[i]))
        }

        for (var i = 24; i < 36; i++) {
            this.row3Keys.push(new Key(this.lowerShift[i], this.upperShift[i], this.alternateLowerShift[i], this.alternateUpperShift[i]))
        }

        for (var i = 36; i < 47; i++) {
            this.row4Keys.push(new Key(this.lowerShift[i], this.upperShift[i], this.alternateLowerShift[i], this.alternateUpperShift[i]))
        }
    }
}


const defaultKeyboardLowerShiftRegister = "1234567890-=qwertyuiop[]asdfghjkl;'#\\zxcvbnm,./";
const defaultKeyboardUpperShiftRegister = "!\"£$%^&*()_+QWERTYUIOP{}ASDFGHJKL:@~|ZXCVBNM<>?";
const BLANK = "                                                ";

const defaultKeyboard = new Keyboard(defaultKeyboardLowerShiftRegister, defaultKeyboardUpperShiftRegister, BLANK, BLANK);
const macron1 = new Keyboard(" | | | | | | | | | | | |q̄|w̄|ē|r̄|t̄|ȳ|ū|ī|ō|p̄| | |ā|s̄|d̄| |ḡ| |j̄|k̄| | | | | |z̄|x̄|c̄|v̄|b̄|n̄|m̄| | | ", " | | | | | | | | | | | |Q̄|W̄|Ē|R̄|T̄|Ȳ|Ū|Ī|Ō|P̄| | |Ā|S̄|D̄| |Ḡ| |J̄|K̄| | | | | |Z̄|X̄|C̄|V̄|B̄|N̄|M̄| | | ", " | | | | | | | | | | | | | |ḗ| | |ȳ́|ū́|ī́|ṓ| | | |ā́| | | | | | | | | | | | | | | | | | | | | | ", " | | | | | | | | | | | | | |Ḗ| | |Ȳ́|Ū́|Ī́|Ṓ| | | |Ā́| | | | | | | | | | | | | | | | | | | | | | ");




application.controller("KeyboardController", ["$scope", function KeyboardController($scope) {
    
    $scope.currentKeyboard = macron1;

    $scope.typeLetter = function (letter) {
        if ($scope.mainOutput == undefined) {
            $scope.mainOutput = "";
        }

        $scope.mainOutput += letter.l;
    }

    $scope.keyDown = function (event) {

        var i =   defaultKeyboard.lowerShift.indexOf(event.key);
        
        if (i >= 0) {
            var l = $scope.currentKeyboard[i];

            $scope.typeLetter(l);

            event.preventDefault();
        }


    }

}]);