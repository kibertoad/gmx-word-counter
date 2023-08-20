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

// This is faster than /\s/.test(String.fromCodePoint(codePoint))
export function isWhitespace(codePoint: number) {
  return whitespacesSet.has(codePoint)
}

// ToDo - benchmark if precalculated codepoint comparison is faster

export function isApostrophe(symbol: string) {
  return symbol === "'" || symbol == '\u2019'
}

export function isApostropheCp(codepoint: number) {
  return isApostrophe(String.fromCodePoint(codepoint))
}

export function isHyphen(symbol: string) {
  return symbol == '\u002D' || symbol == '\u2010' || symbol == '\u058A' || symbol == '\u30A0'
}

export function isHyphenCp(codepoint: number) {
  return isHyphen(String.fromCodePoint(codepoint))
}

export function isPunctuation(symbol: string) {
  if (symbol.length === 0) {
    return false
  }

  return (
    (symbol >= '\u0021' && symbol <= '\u002F') ||
    (symbol >= '\u003A' && symbol <= '\u0040') ||
    (symbol >= '\u005B' && symbol <= '\u0060') ||
    (symbol >= '\u007B' && symbol <= '\u007E') ||
    (symbol >= '\u2000' && symbol <= '\u206F') ||
    (symbol >= '\u3000' && symbol <= '\u303F') ||
    '\u00F7\u00D7\u00A1\u00BF\u0589\u05C3\u05BE\u05C0\u061B'.indexOf(symbol) != -1
  )
}

export function isPunctuationCp(codepoint: number) {
  return isPunctuation(String.fromCodePoint(codepoint))
}
