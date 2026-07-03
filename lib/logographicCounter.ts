/*
 Chinese - zh
 Japenese - ja
 Korean - ko
 Thai - th
 */
const LOGOGRAPHIC_LANGUAGES = ['zh', 'ja', 'ko', 'th'] as const
const LOGOGRAPHIC_LANGUAGE_SET = new Set(LOGOGRAPHIC_LANGUAGES)

// Scripts written without inter-word spaces that GMX-V 2.0 does not assign a
// word-count factor to, and for which no dictionary-based word segmentation is
// available. ICU (the reference UAX #29 implementation) ships word-break
// dictionaries only for Burmese, CJK, Khmer, Lao and Thai, so anything outside
// that set cannot be reliably segmented into words. Without a factor or a
// segmenter a word count cannot be produced, so 0 is returned.
//   lo - Lao, km - Khmer, my - Burmese
//   bo - Tibetan, dz - Dzongkha (Tibetan script; syllables are delimited by the
//        tsheg U+0F0B, never by spaces, so the generic regex would miscount
//        every syllable as a separate word)
const UNSUPPORTED_LOGOGRAPHIC_SCRIPTS = ['lo', 'km', 'my', 'bo', 'dz'] as const
const UNSUPPORTED_LOGOGRAPHIC_SCRIPT_SET = new Set(UNSUPPORTED_LOGOGRAPHIC_SCRIPTS)

export type LogographicLanguagesSubtags = (typeof LOGOGRAPHIC_LANGUAGES)[number]

const LANGUAGE_WORD_COUNT_FACTORS: Record<LogographicLanguagesSubtags, number> = {
  zh: 2.8,
  ja: 3.0,
  ko: 3.3,
  th: 6.0,
}

export function getCharacterCountFactor(locale: LogographicLanguagesSubtags): number {
  const countFactor = LANGUAGE_WORD_COUNT_FACTORS[locale]

  // This should never happen, as we are checking before
  /* c8 ignore next 3 */
  if (!countFactor) {
    throw new Error(`Unsupported locale: ${locale}`)
  }

  return countFactor
}

export function isLogographicScript(locale: string) {
  return LOGOGRAPHIC_LANGUAGE_SET.has(locale as LogographicLanguagesSubtags)
}

export function isUnsupportedLogographicScript(locale: string) {
  return UNSUPPORTED_LOGOGRAPHIC_SCRIPT_SET.has(
    locale as (typeof UNSUPPORTED_LOGOGRAPHIC_SCRIPTS)[number],
  )
}
