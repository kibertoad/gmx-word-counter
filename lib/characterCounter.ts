import { isApostropheCp, isHyphenCp, isPunctuationCp, isWhitespaceCp } from './punctuationUtils'

const UnicodeAlphanumeric = /^[\p{L}\p{M}\p{N}]*$/u

// Does not need caching, as just computing it each time is actually faster
function isCpUnicodeAlphanumeric(codePoint: number): boolean {
  // Within ASCII the only \p{L} and \p{N} characters are A-Z, a-z and 0-9
  if (codePoint < 0x80) {
    return (
      (codePoint >= 0x30 && codePoint <= 0x39) ||
      (codePoint >= 0x41 && codePoint <= 0x5a) ||
      (codePoint >= 0x61 && codePoint <= 0x7a)
    )
  }
  return UnicodeAlphanumeric.test(String.fromCodePoint(codePoint))
}

export type Counts = {
  characters: number
  whiteSpace: number
  punctuation: number
}

// Punctuation characters are excluded from the character count, but hyphens
// and apostrophes are included if they appear inside of a word.
function isCountedAsPunctuation(cp: number, isInWord: boolean): boolean {
  return isPunctuationCp(cp) && !(isInWord && (isHyphenCp(cp) || isApostropheCp(cp)))
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

  // Previous code point, tracked across iterations so that surrogate pairs
  // are not misread when indexing backwards by code units
  let prevCp: number | undefined

  for (let i = 0; i < normalizedText.length; i++) {
    const cp = normalizedText.codePointAt(i)!

    // Check for surrogate pair and increment `i` if found
    if (cp > 0xffff) {
      i++
    }

    // GMX TotalCharacterCount excludes whitespace.
    if (isWhitespaceCp(cp)) {
      whiteSpace++
      prevCp = cp
      continue
    }

    let isInWord = false
    if (prevCp !== undefined && i < normalizedText.length - 1) {
      // `i` points at the last code unit of the current character,
      // so `i + 1` is the start of the next one (codePointAt decodes
      // a full surrogate pair when given its leading code unit)
      const next = normalizedText.codePointAt(i + 1)!
      isInWord = isCpUnicodeAlphanumeric(prevCp) && isCpUnicodeAlphanumeric(next)
    }

    if (isCountedAsPunctuation(cp, isInWord)) {
      punctuation++
    } else {
      totalCharacters++
    }

    prevCp = cp
  }

  return {
    characters: totalCharacters,
    whiteSpace,
    punctuation,
  }
}
