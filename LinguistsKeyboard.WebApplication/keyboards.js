const EnglishUKQWERTY = new Keyboard("English (UK) [QWERTY]", "English", "EnglishUKQWERTY", false, "1|2|3|4|5|6|7|8|9|0|-|=|q|w|e|r|t|y|u|i|o|p|[|]|a|s|d|f|g|h|j|k|l|;|'|#|\\|z|x|c|v|b|n|m|,|.|/", "!|\"|£|$|%|^|&|*|(|)|_|+|Q|W|E|R|T|Y|U|I|O|P|{|}|A|S|D|F|G|H|J|K|L|:|@|~| |Z|X|C|V|B|N|M|<|>|?", " | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | ", " | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | ");

const EnglishUKQWERTYBetter = new Keyboard("English (UK) [QWERTY] (Better)", "English (Better)", "EnglishUKQWERTYBetter", false, "1|2|3|4|5|6|7|8|9|0|-|\u2013|q|w|e|r|t|y|u|i|o|p|(|)|a|s|d|f|g|h|j|k|l|’|‘|’| |z|x|c|v|b|n|m|,|.|?", "#|*|{|}|'|\"| | |~|%| |\u2014|Q|W|E|R|T|Y|U|I|O|P|[|]|A|S|D|F|G|H|J|K|L| |“|”| |Z|X|C|V|B|N|M|;|:|!", "\u0301|\u0300|\u0302|\u030C|\u0304|\u0307|\u0308|\u0306|\u0303| | | | |₩|€| |₮|¥| | |œ|₽| | |æ|$| |₣| | | | |£| | | | | | |ç| | | | |\\|/| ", "\u030b|\u030f|⟨|⟩| | | | | | | | | | |&| | | | | |Œ| | | |Æ| | | | | | | | | | | | | | |Ç| | | | | | | ");

const EnglishUKQWERTYwithDiacritics = new Keyboard("English (UK) [QWERTY] with Diacritics", "English + Diacritics", "EnglishUKQWERTYwithDiacritics", false, "1|2|3|4|5|6|7|8|9|0|-|=|q|w|e|r|t|y|u|i|o|p|[|]|a|s|d|f|g|h|j|k|l|;|'|#|\\|z|x|c|v|b|n|m|,|.|/", "!|\"|£|$|%|^|&|*|(|)|_|+|Q|W|E|R|T|Y|U|I|O|P|{|}|A|S|D|F|G|H|J|K|L|:|@|~| |Z|X|C|V|B|N|M|<|>|?", "\u0301|\u0300|\u0302|\u030C|\u0306|\u0304|\u0307|\u0308|\u0303|\u030A| | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | ", " | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | ");

const FrenchFranceAZERTYBetter = new Keyboard("French (France) [AZERTY] (Better)", "French (Better)", "FrenchFranceAZERTYBetter", false, "1|2|3|4|5|6|7|8|9|0|-|\u2013|a|z|e|r|t|y|u|i|o|p|à|é|q|s|d|f|g|h|j|k|l|m|ù|è|’|w|x|c|v|b|n|,|.|/|?", "(|‹|«|‘|“|”|’|»|›|)|*|\u2014|A|Z|E|R|T|Y|U|I|O|P|À|É|Q|S|D|F|G|H|J|K|L|M|Ù|È| |W|X|C|V|B|N|;|:|\\|!", "[|{|`|'|\"| | | | }|]| | |æ| |€| | | | | |œ| |â| | |$| | | | | | |£| | | | | | |ç| | | |<|>| | ", "§| | | | | | |^|%|°| | |Æ| |&| | | | | |Œ| |Â| | | | | | | | | | | | | | | | |Ç| | | | | | | ");

const FrenchFranceAZERTY = new Keyboard("French (France) [AZERTY]", "French", "FrenchFranceAZERTY", false, "&|é|\"|'|(|-|è|–|ç|à|)|=|a|z|e|r|t|y|u|i|o|p| |$|q|s|d|f|g|h|j|k|l|m|ù|*|<|w|x|c|v|b|n|,|;|:|!", "1|2|3|4|5|6|7|8|9|0|°|+|A|Z|E|R|T|Y|U|I|O|P| |£|Q|S|D|F|G|H|J|K|L|M|%|μ|>|W|X|C|V|B|N|?|.|/|§", " |~|#|{|[| |`|\\|^|@|]|}| | |€| | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | ", " | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | ");

const GermanT1 = new Keyboard("German [T1]", "German", "GermanT1", false, "1|2|3|4|5|6|7|8|9|0|ß| |q|w|e|r|t|z|u|i|o|p|ü|+|a|s|d|f|g|h|j|k|l|ö|ä|#|<|y|x|c|v|b|n|m|,|.|-", "!|\"|§|$|%|&|/|(|)|=|?| |Q|W|E|R|T|Z|U|I|O|P|Ü|*|A|S|D|F|G|H|J|K|L|Ö|Ä|'|>|Y|X|C|V|B|N|M|;|:|_", " \u00b2|\u00b3| | | |{|[|]|}|\\| | |@| |€| | | | | | | | |~| | | | | | | | | | | | | | | | | | | |μ| | | ", " | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | ");

const GreekIntuitiveforEnglishspeakers = new Keyboard("Greek (Intuitive for English-speakers)", "Greek", "GreekIntuitiveforEnglishspeakers", false, "1|2|3|4|5|6|7|8|9|0|-|=|χ|ω|ε|ρ|τ|υ| |ι|ο|π|[|]|α|σ|δ|φ|θ|η| |κ|λ|;|'|#|\\|ζ|ξ|γ|ψ|β|ν|μ|,|.|/", "!|\"|£|$|%|^|&|*|(|)|_|+|Χ|Ω|Ε|Ρ|Τ|Υ| |Ι|Ο|Π|{|}|Α|Σ|Δ|Φ|Θ|Η| |Κ|Λ|:|@|~| |Ζ|Ξ|Γ|Ψ|Β|Ν|Μ|<|>|?", "\u0301|\u0308| | | | | | | | | | | |ϝ| | | | | | | | | | | |ς| | | | | |ϙ| | | | | | | | | | | | | | | ", " | | | | | | | | | | | | |Ϝ| | | | | | | | | | | | | | | | | |Ϙ| | | | | | | | | | | | | | | ");

const GreekGreece = new Keyboard("Greek (Greece)", "Greek", "GreekGreece", false, "1|2|3|4|5|6|7|8|9|0|-|=|;|ς|ε|ρ|τ|υ|θ|ι|ο|π|[|]|α|σ|δ|φ|γ|η|ξ|κ|λ|\u0301|'|\\|<|ζ|χ|ψ|ω|β|ν|μ|,|.|/", "!|@|#|$|%|^|&|*|(|)|_|+|:| |Ε|Ρ|Τ|Υ|Θ|Ι|Ο|Π|{|}|Α|Σ|Δ|Φ|Γ|Η|Ξ|Κ|Λ|\u0308|\"| |>|Ζ|Χ|Ψ|Ω|Β|Ν|Μ|<|>|?", " \u2082|\u2083|£|§|¶| |¤| | | | | | | |€|®| |¥| | | | | | | | | | | | | | | | | | | | | |©| | | | | | | ", " | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | ");

const HanyuPinyinQWERTY = new Keyboard("Hanyu Pinyin [QWERTY]", "Hanyu Pinyin", "HanyuPinyinQWERTY", false, "1|2|3|4|5|6|7|8|9|0|-|\u2013|q|w|e|r|t|y|u|i|o|p|\u0301|\u0300|a|s|d|f|g|h|j|k|l|’|\u030c|\u0304| |z|x|c| |b|n|m|,|.|?", "#|*|{|}|'|\"|[|]|(|)| |\u2014|Q|W|E|R|T|Y|U|I|O|P|“|”|A|S|D|F|G|H|J|K|L| |‘|’| |Z|X|C| |B|N|M|;|:|!", " | | | | | | | |~|%| | | | |ê| | |¥|ü| | | | | | | | | | | | | | | |\\|/| | | | | | | | | | | ", " | | | | | | | | | | | | | |Ê| | | |Ü| | | | | | | | | | | | | | | | | | | | | | | | | | | | ");

const IPAforEnglishQWERTY = new Keyboard("IPA for English [QWERTY]", "IPA for English", "IPAforEnglishQWERTY", false, "1|2|3|4|5|6|7|8|9|0|-|\u2013|ɛ|w|e|r|t|θ|u|i|o|p|(|)|a|s|d|f|g|h|j|k|l|ɑ|ð|ː|æ|z|x|ʃ|v|b|n|m|,|.|?", "#|*|{|}|'|\"| | |~|%| |\u2014| |ʊ|ə| | | |ʌ|ɪ|ɔ| |[|]| | | | |ʒ| | | | |ɒ| | | | | | | | |ŋ| |;|:|!", " | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | |\\|/| ", " | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | ");

const Latin = new Keyboard("Latin", "Latin", "Latin", false, "1|2|3|4|5|6|7|8|9|0|-|\u2013|q| |e|r|t|y|v|i|o|p|(|)|a|s|d|f|g|h| |k|l|’|‘|’| |z|x|c| |b|n|m|,|.|?", "#|*|{|}|'|\"| | |~|%| |\u2014|Q| |E|R|T|Y|V|I|O|P|[|]|A|S|D|F|G|H| |K|L| |“|”| |Z|X|C| |B|N|M|;|:|!", " | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | |£| | | | | | | | | | | |\\|/| ", " | | | | | | | | | | | | | |&| | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | ");

const MathematicsSet1 = new Keyboard("Mathematics Set 1", "Mathematics 1", "MathematicsSet1", false, "1|2|3|4|5|6|7|8|9|0|\u2212|\u002b|q|w|e|r|t|y|u|i|o|p|(|)|a|s|d|f|g|h|j|k|l|$|{|}|÷|z|x|c|v|b|n|m|,|.|×", " | | | | | | | | | | | |Q|W|E|R|T|Y|U|I|O|P|[|]|A|S|D|F|G|H|J|K|L| |\u27e8|\u27e9| |Z|X|C|V|B|N|M| | | ", " | | | | | | |\u226a|\u2264|<|≡|=| | |∃| | | | | | | |\u230a|\u230b| | |∂| | |ħ| | | | | | | | | | | | | | | | | ", " | | | | | | |\u226b|\u2265|>| |≠| | |∄| | | | | | | |\u2308|\u2309|∀| |∇| | |Ħ| | | | |\u27ea|\u27eb| | | | | | | | | | | ");

const MathematicsSet2Greek = new Keyboard("Mathematics Set 2 (Greek)", "Mathematics 2 (Greek)", "MathematicsSet2Greek", false, "1|2|3|4|5|6|7|8|9|0|\u2212|\u002b|χ|ω|ε|ρ|τ|υ| |ι|ο|π|(|)|α|σ|δ|φ|θ|η| |κ|λ|$|{|}| |ζ|ξ|γ|ψ|β|ν|μ|,|.| ", " | | | | | | | | | | | |Χ|Ω|Ε|Ρ|Τ|Υ| |Ι|Ο|Π|[|]|Α|Σ|Δ|Φ|Θ|Η| |Κ|Λ| |\u27e8|\u27e9| |Ζ|Ξ|Γ|Ψ|Β|Ν|Μ| | | ", " | | | | | | | | | | | | | |ε|ϱ| | | | | |ϖ|\u230a|\u230b| |ς| |φ|ϑ| | |ϰ| | | | | | | | | | | | | | | ", " | | | | | | | | | | | | | | | | | | | | | |\u2308|\u2309| | | | | | | | | | |\u27ea|\u27eb| | | | | | | | | | | ");

const OldEnglish = new Keyboard("Old English", "Old English", "OldEnglish", false, "1|2|3|4|5|6|7|8|9|0|-|\u2013|q|w|e|r|t|y|u|i|o|p|\u0304|\u0307|a|s|d|f|g|h| |k|l|’|‘|’| |z|x|c| |b|n|m|,|.|?", "#|*|{|}|'|\"| | |(|)| |\u2014|Q|W|E|R|T|Y|U|I|O|P| | |A|S|D|F|G|H| |K|L| |“|”| |Z|X|C| |B|N|M|;|:|!", " | | | | | | | |[|]| | | |ƿ| | |þ| | | |œ| | | |æ| |ð| | | | | | | | | | | | | | | | | |\\|/| ", " | | | | | | | | | | | | |Ƿ| | |Þ| | | |Œ| | | |Æ| |Ð| | | | | | | | | | | | | | | | | | | | ");

const RussianRussianJCUKEN = new Keyboard("Russian (Russian) [JCUKEN]", "Russian", "RussianRussianJCUKEN", false, "1|2|3|4|5|6|7|8|9|0|-|=|й|ц|у|к|е|н|г|ш|щ|з|х|ъ|ф|ы|в|а|п|р|о|л|д|ж|э| | |я|ч|с|м|и|т|ь|б|ю|.", "!|\"| |;|%|:|?|*|(|)|_|+|Й|Ц|У|К|Е|Н|Г|Ш|Щ|З|Х|Ъ|Ф|Ы|В|А|П|Р|О|Л|Д|Ж|Э| | |Я|Ч|С|М|И|Т|Ь|Б|Ю|,", " | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | ", " | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | ");

const TypographicalSymbols = new Keyboard("Typographical Symbols", "Typographical Symbols", "TypographicalSymbols", false, "#|*|⁂|†|‡|~|%|‰|‱|-|\u2013| | | |&| | | | |'|‘|’|(|)|@|§| | |\\|/|<|>|‹|›|{|}| | | |·|:|,|;|.|?|!|‽", " | |※| | | |′|″|‴|_|\u2014| | | | | | | | |\"|“|”|[|]| | | | | | | | | «|»|⟨|⟩| | | |⋯| | | |…|⸮| | ", " | | | | | | | | | | | | |₩|€|₽|₮|¥| | | | ₱| | |₳|$|₯|₣|₲| | | ₭|£| | | | | |₡|¢| |฿|₦| | ¿|¡| ", " | | | | | | | | | | | | | | |®|₸| | | | | ℗| | | | |֏|ƒ| | | | | ₺| | | | | |₵|©| | | | | | | ");

const Keyboards = [EnglishUKQWERTY, EnglishUKQWERTYBetter, EnglishUKQWERTYwithDiacritics, FrenchFranceAZERTYBetter, FrenchFranceAZERTY, GermanT1, GreekIntuitiveforEnglishspeakers, GreekGreece, HanyuPinyinQWERTY, IPAforEnglishQWERTY, Latin, MathematicsSet1, MathematicsSet2Greek, OldEnglish, RussianRussianJCUKEN, TypographicalSymbols];