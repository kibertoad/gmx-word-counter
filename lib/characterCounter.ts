import { isApostropheCp, isHyphenCp, isPunctuationCp, isWhitespaceCp } from './punctuationUtils'

const UnicodeAlphanumeric = /^[\p{L}\p{N}]*$/u

// Does not need caching, as just computing it each time is actually faster
function isCpUnicodeAlphanumeric(codePoint: number): boolean {
  return UnicodeAlphanumeric.test(String.fromCodePoint(codePoint))
}

export type Counts = {
  characters: number
  whiteSpace: number
  punctuation: number
}

/**
 *
 * @param {string} text - text to count characters in
 */
export function countCharacters(text: string): Counts {
  if (!text) {
    return {
      whiteSpace: 0,
      characters: 0,
      punctuation: 0,
    }
  }

  const normalizedText = text.normalize('NFC')

  let totalCharacters = 0
  let whiteSpace = 0
  let punctuation = 0

  for (var i = 0; i < normalizedText.length; i++) {
    const cp = normalizedText.codePointAt(i)!

    // Check for surrogate pair and increment `i` if found
    if (cp > 0xffff) {
      i++
    }

    // GMX TotalCharacterCount excludes whitespace.
    if (isWhitespaceCp(cp)) {
      whiteSpace++
      continue
    }

    let isInWord = false
    if (i > 0 && i < normalizedText.length - 1) {
      const prev = normalizedText.codePointAt(i - 1)!
      const next = normalizedText.codePointAt(i + 1)!
      isInWord = isCpUnicodeAlphanumeric(prev) && isCpUnicodeAlphanumeric(next)
    }

    // Punctuation characters are excluded, but hyphens and apostrophes are included
    // if they appear inside of a word.
    if (isPunctuationCp(cp) && !(isInWord && (isHyphenCp(cp) || isApostropheCp(cp)))) {
      punctuation++
      continue
    }

    totalCharacters++
  }

  return {
    characters: totalCharacters,
    whiteSpace,
    punctuation,
  }
}
