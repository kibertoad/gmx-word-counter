const whitespaces = [
  0x0009, // CHARACTER TABULATION
  0x000a, // LINE FEED (LF)
  0x000b, // LINE TABULATION
  0x000c, // FORM FEED (FF)
  0x000d, // CARRIAGE RETURN (CR)
  0x0020, // SPACE
  0x0085, // NEXT LINE (NEL)
  0x00a0, // NO-BREAK SPACE
  0x1680, // OGHAM SPACE MARK
  0x2000, // EN QUAD
  0x2001, // EM QUAD
  0x2002, // EN SPACE
  0x2003, // EM SPACE
  0x2004, // THREE-PER-EM SPACE
  0x2005, // FOUR-PER-EM SPACE
  0x2006, // SIX-PER-EM SPACE
  0x2007, // FIGURE SPACE
  0x2008, // PUNCTUATION SPACE
  0x2009, // THIN SPACE
  0x200a, // HAIR SPACE
  0x2028, // LINE SEPARATOR
  0x2029, // PARAGRAPH SEPARATOR
  0x202f, // NARROW NO-BREAK SPACE
  0x205f, // MEDIUM MATHEMATICAL SPACE
  0x3000, // IDEOGRAPHIC SPACE
]

const whitespacesSet = new Set(whitespaces)

// This is faster than /\s/.test(String.fromCodePoint(codePoint)).
// The fast path handles the sub-U+0085 whitespace codepoints (tab..CR and
// space) inline; keep its bounds in sync with the low entries of `whitespaces`.
export function isWhitespaceCp(codePoint: number) {
  if (codePoint < 0x0085) {
    return codePoint === 0x0020 || (codePoint >= 0x0009 && codePoint <= 0x000d)
  }
  return whitespacesSet.has(codePoint)
}

// The direct codepoint checks below are the single source of truth. The public
// string helper delegates to them so each set is defined in exactly one place.

export function isApostropheCp(codepoint: number) {
  return codepoint === 0x0027 || codepoint === 0x2019
}

export function isHyphenCp(codepoint: number) {
  return (
    codepoint === 0x002d || // HYPHEN-MINUS
    codepoint === 0x2010 || // HYPHEN
    codepoint === 0x2011 || // NON-BREAKING HYPHEN
    codepoint === 0x058a || // ARMENIAN HYPHEN
    codepoint === 0x30a0 //    KATAKANA-HIRAGANA DOUBLE HYPHEN
  )
}

export function isPunctuationCp(codepoint: number) {
  return (
    (codepoint >= 0x0021 && codepoint <= 0x002f) ||
    (codepoint >= 0x003a && codepoint <= 0x0040) ||
    (codepoint >= 0x005b && codepoint <= 0x0060) ||
    (codepoint >= 0x007b && codepoint <= 0x007e) ||
    (codepoint >= 0x2000 && codepoint <= 0x206f) ||
    (codepoint >= 0x3000 && codepoint <= 0x303f) ||
    // Halfwidth and Fullwidth Forms mirroring ASCII punctuation plus halfwidth
    // CJK punctuation, deliberately excluding fullwidth digits (0xff10-0xff19)
    // and letters (0xff21-0xff3a, 0xff41-0xff5a)
    (codepoint >= 0xff01 && codepoint <= 0xff0f) ||
    (codepoint >= 0xff1a && codepoint <= 0xff20) ||
    (codepoint >= 0xff3b && codepoint <= 0xff40) ||
    (codepoint >= 0xff5b && codepoint <= 0xff65) ||
    codepoint === 0x00f7 || // DIVISION SIGN
    codepoint === 0x00d7 || // MULTIPLICATION SIGN
    codepoint === 0x00a1 || // INVERTED EXCLAMATION MARK
    codepoint === 0x00bf || // INVERTED QUESTION MARK
    codepoint === 0x00ab || // LEFT-POINTING DOUBLE ANGLE QUOTATION MARK
    codepoint === 0x00bb || // RIGHT-POINTING DOUBLE ANGLE QUOTATION MARK
    codepoint === 0x0589 || // ARMENIAN FULL STOP
    codepoint === 0x05c3 || // HEBREW PUNCTUATION SOF PASUQ
    codepoint === 0x05be || // HEBREW PUNCTUATION MAQAF
    codepoint === 0x05c0 || // HEBREW PUNCTUATION PASEQ
    codepoint === 0x060c || // ARABIC COMMA
    codepoint === 0x061b || // ARABIC SEMICOLON
    codepoint === 0x061f || // ARABIC QUESTION MARK
    codepoint === 0x0964 || // DEVANAGARI DANDA
    codepoint === 0x0965 //   DEVANAGARI DOUBLE DANDA
  )
}

export function isPunctuation(symbol: string) {
  if (symbol.length === 0) {
    return false
  }

  return isPunctuationCp(symbol.codePointAt(0)!)
}
