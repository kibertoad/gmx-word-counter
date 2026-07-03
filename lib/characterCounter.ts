import { isApostropheCp, isHyphenCp, isPunctuationCp, isWhitespaceCp } from './punctuationUtils'

const UnicodeAlphanumeric = /^[\p{L}\p{N}]*$/u

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

// Hyphens and apostrophes count as characters rather than punctuation when
// they appear inside of a word, i.e. between two alphanumeric characters.
function isWordInternalCp(text: string, i: number, cp: number): boolean {
  if (!isHyphenCp(cp) && !isApostropheCp(cp)) {
    return false
  }
  if (i <= 0 || i >= text.length - 1) {
    return false
  }
  return (
    isCpUnicodeAlphanumeric(text.codePointAt(i - 1)!) &&
    isCpUnicodeAlphanumeric(text.codePointAt(i + 1)!)
  )
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
  const length = normalizedText.length

  let totalCharacters = 0
  let whiteSpace = 0
  let punctuation = 0

  for (let i = 0; i < length; i++) {
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

    // Punctuation characters are excluded, but hyphens and apostrophes are included
    // if they appear inside of a word.
    if (isPunctuationCp(cp) && !isWordInternalCp(normalizedText, i, cp)) {
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
