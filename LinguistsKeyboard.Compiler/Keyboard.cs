using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LinguistsKeyboard.Compiler
{
    public class Keyboard
    {
        public string Name { get; set; }
        public string AbbreviatedName { get; set; }
        public string Reference { get; set; }
        public IEnumerable<Key> Row1Keys { get; set; }
        public IEnumerable<Key> Row2Keys { get; set; }
        public IEnumerable<Key> Row3Keys { get; set; }
        public IEnumerable<Key> Row4Keys { get; set; }
    }
}
