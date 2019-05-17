using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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

            keyboard.Row1Keys = GetKeysForRow(l[2], l[3], l[4], l[5], 12);
            keyboard.Row2Keys = GetKeysForRow(l[6], l[7], l[8], l[9], 12);
            keyboard.Row3Keys = GetKeysForRow(l[10], l[11], l[12], l[13], 12);
            keyboard.Row4Keys = GetKeysForRow(l[14], l[15], l[16], l[17], 11);

            return keyboard;
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

            for (var i = 2; i < line.Length; i++)
            {
                var c = line[i];

                if (n == 0 && c == ' ')
                {
                    t += c;
                    n = 1;
                }

                if (n == 1 && c == ' ')
                {
                    characters.Add(t);
                    t = "";
                    n = 0;
                }

                if (n == 0 && c != ' ')
                {
                    t += c;
                    n = 1;
                }

                if (n == 1 && c != ' ')
                {
                    t += c;
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
