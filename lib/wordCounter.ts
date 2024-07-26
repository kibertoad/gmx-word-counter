import { countCharacters } from './characterCounter'
import {
  type LogographicLanguagesSubtags,
  getCharacterCountFactor,
  isLogographicScript,
  isUnsupportedLogographicScript,
} from './logographicCounter'

const NON_LOGOGRAPHIC_LANGUAGE_REGEX =
  /[\p{L}\p{M}]+(?:[-’](?=[\p{L}\p{M}])[\p{L}\p{M}]+)*|(?<=\s|^)\d+[a-zA-Z]?(?=\s|$)|\d+(?:[.,:]\d+)*|\d+/gu

const localeRegexMap: Record<string, RegExp> = {
  // persian
  /* eslint-disable no-misleading-character-class */
  fa: /[\p{Script=Arabic}\p{M}]+(?:[‌‍ـ]+(?=[\p{Script=Arabic}\p{M}])[\p{Script=Arabic}\p{M}]+)*|(?<=\s|^)\d+[a-zA-Z]?(?=\s|$)|\d+(?:[.,:]\d+)*|\d+/gu,
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

function countWordsLogographic(text: string, languageSubTag: LogographicLanguagesSubtags) {
  const factor = getCharacterCountFactor(languageSubTag)
  const characters = countCharacters(text)

  return Math.round(characters.characters / factor)
}

/**
 *
 * @param {string} text - Text to count words in
 * @param {string} languageSubTag - BCP47 language subtag
 */
export function countWords(text: string, languageSubTag: string) {
  if (!text) {
    return 0
  }

  if (isLogographicScript(languageSubTag)) {
    return countWordsLogographic(text, languageSubTag as LogographicLanguagesSubtags)
  }

  if (isUnsupportedLogographicScript(languageSubTag)) {
    return 0
  }

  // Let's see if we have locale-specific regex
  const regex = localeRegexMap[languageSubTag]

  const matches = regex ? text.match(regex) : text.match(NON_LOGOGRAPHIC_LANGUAGE_REGEX)

  return matches?.length ?? 0
}
