using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Text.RegularExpressions;

namespace LinguistsKeyboard.Compiler
{
    public class KeyboardCompiler
    {
        private IEnumerable<string> RemoveBlankLines(IEnumerable<string> lines)
        {
            return lines.Where(l => l.Trim() != "");
        }

        public Keyboard GetKeyboard(IEnumerable<string> lines)
        {
            var l = RemoveBlankLines(lines).ToArray();

            var keyboard = new Keyboard();

            keyboard.Name = l[0];
            keyboard.AbbreviatedName = l[1];
            keyboard.Reference = GetReference(keyboard.Name);

            keyboard.Row1Keys = GetKeysForRow(l[2], l[3], l[4], l[5], 12);
            keyboard.Row2Keys = GetKeysForRow(l[6], l[7], l[8], l[9], 12);
            keyboard.Row3Keys = GetKeysForRow(l[10], l[11], l[12], l[13], 12);
            keyboard.Row4Keys = GetKeysForRow(l[14], l[15], l[16], l[17], 11);

            if (l.Length > 18)
            {
                keyboard.Row1PhoneKeys = GetKeysForRow(l[18], l[19], l[20], l[21], 10);
                keyboard.Row2PhoneKeys = GetKeysForRow(l[22], l[23], l[24], l[25], 10);
                keyboard.Row3PhoneKeys = GetKeysForRow(l[26], l[27], l[28], l[29], 9);
                keyboard.Row4PhoneKeys = GetKeysForRow(l[30], l[31], l[32], l[33], 7);
            }
            else
            {
                keyboard.Row1PhoneKeys = keyboard.Row1Keys;
                keyboard.Row2PhoneKeys = keyboard.Row2Keys;
                keyboard.Row3PhoneKeys = keyboard.Row3Keys;
                keyboard.Row4PhoneKeys = keyboard.Row4Keys;
            }

            return keyboard;
        }

        public string ExportKeyboardToJS(Keyboard keyboard)
        {
            var r1 = string.Join("|", keyboard.Row1Keys.Select(k => k.LowerShift)) + "|" + string.Join("|", keyboard.Row2Keys.Select(k => k.LowerShift)) + "|" + string.Join("|", keyboard.Row3Keys.Select(k => k.LowerShift)) + "|" + string.Join("|", keyboard.Row4Keys.Select(k => k.LowerShift));

            var r2 = string.Join("|", keyboard.Row1Keys.Select(k => k.UpperShift)) + "|" + string.Join("|", keyboard.Row2Keys.Select(k => k.UpperShift)) + "|" + string.Join("|", keyboard.Row3Keys.Select(k => k.UpperShift)) + "|" + string.Join("|", keyboard.Row4Keys.Select(k => k.UpperShift));

            var r3 = string.Join("|", keyboard.Row1Keys.Select(k => k.AlternateLowerShift)) + "|" + string.Join("|", keyboard.Row2Keys.Select(k => k.AlternateLowerShift)) + "|" + string.Join("|", keyboard.Row3Keys.Select(k => k.AlternateLowerShift)) + "|" + string.Join("|", keyboard.Row4Keys.Select(k => k.AlternateLowerShift));

            var r4 = string.Join("|", keyboard.Row1Keys.Select(k => k.AlternateUpperShift)) + "|" + string.Join("|", keyboard.Row2Keys.Select(k => k.AlternateUpperShift)) + "|" + string.Join("|", keyboard.Row3Keys.Select(k => k.AlternateUpperShift)) + "|" + string.Join("|", keyboard.Row4Keys.Select(k => k.AlternateUpperShift));

            return string.Format("const {0} = new Keyboard(\"{1}\", \"{2}\", \"{3}\", false, \"{4}\", \"{5}\", \"{6}\", \"{7}\");\n\n", keyboard.Reference, keyboard.Name, keyboard.AbbreviatedName, keyboard.Reference, r1, r2, r3, r4);
        }

        private string GetReference(string name)
        {
            return Regex.Replace(name, "[^A-Za-z0-9]", "");
        }

        private Key[] GetKeysForRow(string line1, string line2, string line3, string line4, int minimumLength)
        {
            var c1 = GetCharactersForRow(line1, minimumLength);
            var c2 = GetCharactersForRow(line2, minimumLength);
            var c3 = GetCharactersForRow(line3, minimumLength);
            var c4 = GetCharactersForRow(line4, minimumLength);

            var keys = new List<Key>();

            for (var i = 0; i < minimumLength; i++)
            {
                var key = new Key();

                key.LowerShift = c1[i];
                key.UpperShift = c2[i];
                key.AlternateLowerShift = c3[i];
                key.AlternateUpperShift = c4[i];

                keys.Add(key);
            }

            return keys.ToArray();
        }

        private string[] GetCharactersForRow(string line, int minimumLength)
        {
            var characters = new List<string>();
            var n = 0;
            var t = "";

            line = line.Trim();

            for (var i = 2; i < line.Length; i++)
            {
                var c = line[i];

                if (n == 0 && c == ' ')
                {
                    t += c;
                    n = 1;
                    continue;
                }

                if (n == 1 && c == ' ')
                {
                    characters.Add(t);
                    t = "";
                    n = 0;
                    continue;
                }

                if (n == 0 && c != ' ')
                {
                    t += c;
                    n = 1;
                    continue;
                }

                if (n == 1 && c != ' ')
                {
                    t += c;
                    continue;
                }
            }

            if (t != "")
            {
                characters.Add(t);
            }

            while (characters.Count < minimumLength)
            {
                characters.Add(" ");
            }

            return characters.ToArray();
        }
    }
}
