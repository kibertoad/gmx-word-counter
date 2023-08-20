import {
  getCharacterCountFactor,
  isLogographicScript,
  isUnsupportedLogographicScript,
  LocaleId,
} from './logographicCounter'
import { countCharacters } from './characterCounter'

const NON_LOGOGRAPHIC_LANGUAGE_REGEX = /[\p{L}\p{M}]+(?:[-’][\p{L}\p{M}]+)*|\d+[:\d+]*/gu

const localeRegexMap: Record<string, RegExp> = {
  ta: /[\u0B80-\u0BFF]+/g,

  // dash is sometimes used in modern Telugu, but shouldn't be counted as a separate word,
  // while two words combined by a hyphen should be considered one word
  te: /(?:[\u0C00-\u0C7F]|(?<=[\u0C00-\u0C7F])-(?=[\u0C00-\u0C7F]))+/g,

  kn: /[\u0C80-\u0CFF]+/g,
  ml: /[\u0D00-\u0D7F]+(?:[\u200C\u200D][\u0D00-\u0D7F]+)*/g,

  es: /\b[A-Za-záéíóúüñÁÉÍÓÚÜÑ\-]+\b/g,
  pt: /[\wáéíóúâêôãõçÁÉÍÓÚÂÊÔÃÕÇ]+/g,
  fr: /\b[\wàâäéèêëîïôöùûüçÀÂÄÉÈÊËÎÏÔÖÙÛÜÇ]+(?:['’][\wàâäéèêëîïôöùûüçÀÂÄÉÈÊËÎÏÔÖÙÛÜÇ]+)?\b/g,
  it: /[\w'àèéìòóù]+(?:(?:’[\w'àèéìòóù]+)?)/gi,
  de: /\b[\wäöüÄÖÜß-]+\b/g,
  en: /\b[a-zA-Z0-9]+(?:['’-][a-zA-Z0-9]+)*\b/g,
}

function countWordsLogographic(text: string, locale: LocaleId) {
  const factor = getCharacterCountFactor(locale)
  const characters = countCharacters(text)

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
