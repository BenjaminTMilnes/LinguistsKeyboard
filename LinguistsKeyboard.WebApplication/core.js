
function isAnyOneOf(characters, character) {
    return (characters.split("").filter(c => c == character).length > 0);
}

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
    constructor(name, abbreviatedName, reference, isSelected, lowerShift, upperShift, alternateLowerShift, alternateUpperShift) {
        this.name = name;
        this.abbreviatedName = abbreviatedName;
        this.reference = reference;
        this.isSelected = isSelected;

        this.lowerShift = lowerShift.split("|");
        this.upperShift = upperShift.split("|");
        this.alternateLowerShift = alternateLowerShift.split("|");
        this.alternateUpperShift = alternateUpperShift.split("|");

        this.row1Keys = [];
        this.row2Keys = [];
        this.row3Keys = [];
        this.row4Keys = [];

        for (var i = 0; i < 12; i++) {
            this.row1Keys.push(this.createKey(i));
        }

        for (var i = 12; i < 24; i++) {
            this.row2Keys.push(this.createKey(i));
        }

        for (var i = 24; i < 36; i++) {
            this.row3Keys.push(this.createKey(i));
        }

        for (var i = 36; i < 47; i++) {
            this.row4Keys.push(this.createKey(i));
        }

        this.allKeys = this.row1Keys.concat(this.row2Keys).concat(this.row3Keys).concat(this.row4Keys);
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

    createKey(i) {
        return new Key(this.l[i], this.u[i], this.al[i], this.au[i]);

    }

    getKey(i) {
        return this.allKeys[i];
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

const keycodes = ["Digit1", "Digit2", "Digit3", "Digit4", "Digit5", "Digit6", "Digit7", "Digit8", "Digit9", "Digit0", "Minus", "Equal", "KeyQ", "KeyW", "KeyE", "KeyR", "KeyT", "KeyY", "KeyU", "KeyI", "KeyO", "KeyP", "BracketLeft", "BracketRight", "KeyA", "KeyS", "KeyD", "KeyF", "KeyG", "KeyH", "KeyJ", "KeyK", "KeyL", "Semicolon", "Quote", "Backslash", "IntlBackslash", "KeyZ", "KeyX", "KeyC", "KeyV", "KeyB", "KeyN", "KeyM", "Comma", "Period", "Slash"];

const lowercaseEnglishLetters = "qwertyuiopasdfghjklzxcvbnm";
const uppercaseEnglishLetters = "QWERTYUIOPASDFGHJKLZXCVBNM";

const defaultKeyboard = new Keyboard("English (UK)", "English", "english1", true, defaultKeyboardLowerShiftRegister.split("").join("|"), defaultKeyboardUpperShiftRegister.split("").join("|"), BLANK.split("").join("|"), BLANK.split("").join("|"));