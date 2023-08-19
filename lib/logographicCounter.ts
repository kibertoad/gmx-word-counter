/*
 Chinese - zh
 Japenese - ja
 Korean - ko
 Thai - th
 */
const LOGOGRAPHIC_SCRIPTS = ['zh', 'ja', 'ko', 'th'] as const
const LOGOGRAPHIC_SCRIPT_SET = new Set(LOGOGRAPHIC_SCRIPTS)

const UNSUPPORTED_LOGOGRAPHIC_SCRIPTS = ['lo', 'km', 'my'] as const
const UNSUPPORTED_LOGOGRAPHIC_SCRIPT_SET = new Set(UNSUPPORTED_LOGOGRAPHIC_SCRIPTS)

export type LocaleId = (typeof LOGOGRAPHIC_SCRIPTS)[number]

const LOCALE_COUNT_FACTORS: Record<LocaleId, number> = {
  zh: 2.8,
  ja: 3.0,
  ko: 3.3,
  th: 6.0,
}

export function getCharacterCountFactor(locale: LocaleId): number {
  const countFactor = LOCALE_COUNT_FACTORS[locale]
  if (!countFactor) {
    throw new Error(`Unsupported locale: ${locale}`)
  }

  return countFactor
}

export function isLogographicScript(locale: string) {
  return LOGOGRAPHIC_SCRIPT_SET.has(locale as LocaleId)
}

export function isUnsupportedLogographicScript(locale: string) {
  return UNSUPPORTED_LOGOGRAPHIC_SCRIPT_SET.has(locale as (typeof UNSUPPORTED_LOGOGRAPHIC_SCRIPTS)[number])
}
