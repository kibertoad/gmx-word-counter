import { isApostropheCp, isHyphenCp, isPunctuationCp, isWhitespace } from './punctuationUtils'

const UnicodeAlphanumeric = /^[\p{L}\p{N}]*$/u

function isUnicodeAlphanumeric(str: string): boolean {
  return UnicodeAlphanumeric.test(str)
}

// ToDo test if this can be adjusted to include unicode ranges, as this is faster than RegEx
function _isAlphaNumeric(str: string) {
  let code, i, len

  for (i = 0, len = str.length; i < len; i++) {
    code = str.charCodeAt(i)
    if (
      !(code > 47 && code < 58) && // numeric (0-9)
      !(code > 64 && code < 91) && // upper alpha (A-Z)
      !(code > 96 && code < 123)
    ) {
      // lower alpha (a-z)
      return false
    }
  }
  return true
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

  for (let i = 0; i < text.length; i++) {
    const cp = text.codePointAt(i)!
    const cc = Array.from(text.charAt(i)).length // This gives the count of characters represented by the code point.

    // GMX TotalCharacterCount excludes whitespace.
    if (isWhitespace(cp)) {
      whiteSpace++
      continue
    }

    let isInWord = false
    if (i > 0 && i < text.length - cc) {
      const prev = text.codePointAt(i - 1)!
      const next = text.codePointAt(i + cc)!
      //isInWord = /\w/.test(String.fromCodePoint(prev)) && /\w/.test(String.fromCodePoint(next));

      isInWord = isUnicodeAlphanumeric(String.fromCodePoint(prev)) && isUnicodeAlphanumeric(String.fromCodePoint(next))
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
