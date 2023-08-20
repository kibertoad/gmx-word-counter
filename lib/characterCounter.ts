import { isApostropheCp, isHyphenCp, isPunctuationCp, isWhitespace } from './punctuationUtils'

const UnicodeAlphanumeric = /^[\p{L}\p{N}]*$/u

// Does not need caching, as just computing it each time is actually faster
function isCpUnicodeAlphanumeric(codePoint: number): boolean {
  return UnicodeAlphanumeric.test(String.fromCodePoint(codePoint))
}

export type Counts = {
  total: number
  whiteSpace: number
  punctuation: number
}

export function countCharacters(originalText: string): Counts {
  if (!originalText) {
    return {
      whiteSpace: 0,
      total: 0,
      punctuation: 0,
    }
  }

  const text = originalText.normalize('NFC')

  let total = 0
  let whiteSpace = 0
  let punctuation = 0

  for (var i = 0; i < text.length; i++) {
    const cp = text.codePointAt(i)!

    // Check for surrogate pair and increment `i` if found
    if (cp > 0xffff) {
      i++
    }

    // GMX TotalCharacterCount excludes whitespace.
    if (isWhitespace(cp)) {
      whiteSpace++
      continue
    }

    let isInWord = false
    if (i > 0 && i < text.length - 1) {
      const prev = text.codePointAt(i - 1)!
      const next = text.codePointAt(i + 1)!
      isInWord = isCpUnicodeAlphanumeric(prev) && isCpUnicodeAlphanumeric(next)
    }

    // Punctuation characters are excluded, but hyphens and apostrophes are included
    // if they appear inside of a word.
    if (isPunctuationCp(cp) && !(isInWord && (isHyphenCp(cp) || isApostropheCp(cp)))) {
      punctuation++
      continue
    }

    total++
  }

  return {
    total,
    whiteSpace,
    punctuation,
  }
}
