using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;
using LinguistsKeyboard.Compiler;

namespace LinguistsKeyboard.TerminalApplication
{
    class Program
    {
        static void Main(string[] args)
        {
            var directoryInfo = new DirectoryInfo(@"..\..\..\LinguistsKeyboard.Keyboards");
            var keyboardFiles = directoryInfo.GetFiles("*.txt");

            var keyboardCompiler = new KeyboardCompiler();

            var keyboards = new List<Keyboard>();

            foreach (var file in keyboardFiles)
            {
                var lines = File.ReadAllLines(file.FullName);
                var keyboard = keyboardCompiler.GetKeyboard(lines);
                keyboards.Add(keyboard);
            }

            var js = string.Join("", keyboards.Select(k => keyboardCompiler.ExportKeyboardToJS(k)));

            js += string.Format("const Keyboards = [{0}];", string.Join(", ", keyboards.Select(k => k.Reference)));

            File.WriteAllText(@"..\..\..\LinguistsKeyboard.WebApplication\keyboards.js", js);
        }
    }
}
