
const ENGLISH_MAP: Record<string, string> = {
    '.-': 'a', '-...': 'b', '-.-.': 'c', '-..': 'd', '.': 'e', '..-.': 'f',
    '--.': 'g', '....': 'h', '..': 'i', '.---': 'j', '-.-': 'k', '.-..': 'l',
    '--': 'm', '-.': 'n', '---': 'o', '.--.': 'p', '--.-': 'q', '.-.': 'r',
    '...': 's', '-': 't', '..-': 'u', '...-': 'v', '.--': 'w', '-..-': 'x',
    '-.--': 'y', '--..': 'z',
};

const ARABIC_MAP: Record<string, string> = {
    '.-': 'ا',
    '-...': 'ب', '-': 'ت', '-.-.': 'ث',
    '.---': 'ج', /* '....': 'ح', // Duplicate key! Overwritten by 'ه' below */ '---': 'خ',
    '-..': 'د', '--..': 'ذ',
    '.-.': 'ر', '---.': 'ز',
    '...': 'س', '----': 'ش',
    '-..-': 'ص', '...-': 'ض',
    '..-': 'ط', '-.--': 'ظ',
    '.-.-': 'ع', '--.': 'غ',
    '..-.': 'ف', '--.-': 'ق',
    '-.-': 'ك', '.-..': 'ل',
    '--': 'م', '-.': 'ن',
    '....': 'ه', '.--': 'و', '..': 'ي',
    '.': 'ء',
};

const NUMBERS_SYMBOLS_MAP: Record<string, string> = {
    // Numbers
    '-----': '0', '.----': '1', '..---': '2', '...--': '3',
    '....-': '4', '.....': '5', '-....': '6',
    '--...': '7', '---..': '8', '----.': '9',

    // Symbols
    '.-.-.-': '.', '--..--': ',', '..--..': '?', '-.-.--': '!',
    '-....-': '-', '-..-.': '/', '/': ' ' // Space between words
};

export const REVERSE_MORSE_MAP: Record<string, string> = {
    ...ENGLISH_MAP,
    ...ARABIC_MAP, // Arabic overrides English for duplicates
    ...NUMBERS_SYMBOLS_MAP
};

export function decodeMorse(morseCode: string): string {
  if (!morseCode.trim()) return '';
  
  return morseCode
    .trim()
    .split(/\s+/) // Split by whitespace
    .map(code => {
        if (code === '/') return ' ';
        return REVERSE_MORSE_MAP[code] || '?';
    })
    .join('');
}

export function decodeMorseDual(morseCode: string): { english: string; arabic: string } {
  if (!morseCode.trim()) return { english: '', arabic: '' };

  const codes = morseCode.trim().split(/\s+/);

  const english = codes.map(code => {
      if (code === '/') return ' ';
      // Check English map first, then numbers/symbols
      return ENGLISH_MAP[code] || NUMBERS_SYMBOLS_MAP[code] || '?';
  }).join('');

  const arabic = codes.map(code => {
      if (code === '/') return ' ';
      // Check Arabic map first, then numbers/symbols
      return ARABIC_MAP[code] || NUMBERS_SYMBOLS_MAP[code] || '?';
  }).join('');

  return { english, arabic };
}
