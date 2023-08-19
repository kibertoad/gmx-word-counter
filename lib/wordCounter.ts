import {
  getCharacterCountFactor,
  isLogographicScript,
  isUnsupportedLogographicScript,
  LocaleId,
} from './logographicCounter'
import { countCharacters } from './characterCounter'

// RegEx taken from https://github.com/regexhq/word-regex by Jon Schlinkert (MIT license)
const NON_LOGOGRAPHIC_LANGUAGE_REGEX =
  /[a-zA-Z0-9_'\u0392-\u03c9\u0400-\u04FF\u0027]+|[\u4E00-\u9FFF\u3400-\u4dbf\uf900-\ufaff\u3040-\u309f\uac00-\ud7af\u0400-\u04FF]+|[\u00E4\u00C4\u00E5\u00C5\u00F6\u00D6]+|[\u0531-\u0556\u0561-\u0586\u0559\u055A\u055B]+|\w+/g

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

  const matches = segment.match(NON_LOGOGRAPHIC_LANGUAGE_REGEX)

  return matches?.length ?? 0
}
