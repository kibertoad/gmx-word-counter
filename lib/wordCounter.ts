import {
  getCharacterCountFactor,
  isLogographicScript,
  isUnsupportedLogographicScript,
  LocaleId,
} from './logographicCounter'
import { countCharacters } from './characterCounter'

// RegEx taken from https://github.com/regexhq/word-regex by Jon Schlinkert (MIT license), with CJK and Telugu removed (they are handled separately)
const NON_LOGOGRAPHIC_LANGUAGE_REGEX =
  /[\u0392-\u03c9\u0400-\u04FF\u0027\u00E4\u00C4\u00E5\u00C5\u00F6\u00D6\u0531-\u0556\u0561-\u0586\u0559\u055A\u055B\w]+/g

const localeRegexMap: Record<string, RegExp> = {
  ta: /[\u0B80-\u0BFF]+/g,
  te: /[\u0C00-\u0C7F\-]+/g,
  kn: /[\u0C80-\u0CFF]+/g,
  ml: /[\u0D00-\u0D7F]+(?:[\u200C\u200D][\u0D00-\u0D7F]+)*/g,
}

function countWordsLogographic(segment: string, locale: LocaleId) {
  const factor = getCharacterCountFactor(locale)
  const characters = countCharacters(segment)

  return Math.round(characters.total / factor)
}

export function countWords(segment: string, locale: string) {
  if (!segment) {
    return 0
  }

  if (isLogographicScript(locale)) {
    return countWordsLogographic(segment, locale as LocaleId)
  }

  if (isUnsupportedLogographicScript(locale)) {
    return 0
  }

  // Let's see if we have locale-specific regex
  const regex = localeRegexMap[locale]

  const matches = regex ? segment.match(regex) : segment.match(NON_LOGOGRAPHIC_LANGUAGE_REGEX)

  return matches?.length ?? 0
}
