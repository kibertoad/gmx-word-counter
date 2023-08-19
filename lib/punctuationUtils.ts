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
