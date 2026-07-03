import { countCharacters } from './characterCounter'
import {
  getCharacterCountFactor,
  isLogographicScript,
  isUnsupportedLogographicScript,
  type LogographicLanguagesSubtags,
} from './logographicCounter'

const NON_LOGOGRAPHIC_LANGUAGE_REGEX =
  /[\p{L}\p{M}]+(?:[-'’](?=[\p{L}\p{M}])[\p{L}\p{M}]+)*|(?<=\s|^)\d+[a-zA-Z]?(?=\s|$)|\d+(?:[.,:]\d+)*|\d+/gu

const localeRegexMap: Record<string, RegExp> = {
  // persian
  /* eslint-disable no-misleading-character-class */
  fa: /[\p{Script=Arabic}\p{M}]+(?:[‌‍ـ]+(?=[\p{Script=Arabic}\p{M}])[\p{Script=Arabic}\p{M}]+)*|(?<=\s|^)\d+[a-zA-Z]?(?=\s|$)|\d+(?:[.,:]\d+)*|\d+/gu,
  ta: /[\u0B80-\u0BFF]+|\d+(?:[.,:]\d+)*/g,

  // dash is sometimes used in modern Telugu, but shouldn't be counted as a separate word,
  // while two words combined by a hyphen should be considered one word
  te: /(?:[\u0C00-\u0C7F]|(?<=[\u0C00-\u0C7F])-(?=[\u0C00-\u0C7F]))+|\d+(?:[.,:]\d+)*/g,

  kn: /[\u0C80-\u0CFF]+|\d+(?:[.,:]\d+)*/g,
  ml: /[\u0D00-\u0D7F]+(?:[\u200C\u200D][\u0D00-\u0D7F]+)*|\d+(?:[.,:]\d+)*/g,

  es: /\b[A-Za-z0-9áéíóúüñÁÉÍÓÚÜÑ-]+\b/g,
  pt: /[\wàáéíóúâêôãõçüÀÁÉÍÓÚÂÊÔÃÕÇÜ]+/g,
  // no \b anchors here: JS \b is ASCII-based and drops words that both start and end
  // with a non-ASCII letter (e.g. standalone "à")
  fr: /[\wàâäéèêëîïôöùûüçœæÀÂÄÉÈÊËÎÏÔÖÙÛÜÇŒÆ]+(?:['’][\wàâäéèêëîïôöùûüçœæÀÂÄÉÈÊËÎÏÔÖÙÛÜÇŒÆ]+)?/g,
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
 * @param {string} languageSubTag - BCP47 language subtag (a full tag like 'zh-CN' is reduced to its primary subtag)
 */
export function countWords(text: string, languageSubTag: string) {
  if (!text) {
    return 0
  }

  // Reduce full BCP47 tags like 'zh-CN' or 'EN' to the primary language subtag,
  // so that logographic detection and locale-specific regexes still apply
  const primarySubTag = languageSubTag ? languageSubTag.toLowerCase().split('-')[0] : ''

  if (isLogographicScript(primarySubTag)) {
    return countWordsLogographic(text, primarySubTag as LogographicLanguagesSubtags)
  }

  if (isUnsupportedLogographicScript(primarySubTag)) {
    return 0
  }

  // Let's see if we have locale-specific regex
  const regex = localeRegexMap[primarySubTag]

  const matches = regex ? text.match(regex) : text.match(NON_LOGOGRAPHIC_LANGUAGE_REGEX)

  return matches?.length ?? 0
}
