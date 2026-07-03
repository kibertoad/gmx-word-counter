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
    codepoint === 0x002d || codepoint === 0x2010 || codepoint === 0x058a || codepoint === 0x30a0
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
    codepoint === 0x00f7 ||
    codepoint === 0x00d7 ||
    codepoint === 0x00a1 ||
    codepoint === 0x00bf ||
    codepoint === 0x0589 ||
    codepoint === 0x05c3 ||
    codepoint === 0x05be ||
    codepoint === 0x05c0 ||
    codepoint === 0x061b
  )
}

export function isPunctuation(symbol: string) {
  if (symbol.length === 0) {
    return false
  }

  return isPunctuationCp(symbol.codePointAt(0)!)
}
