import { countWords } from './wordCounter'
import { expect } from 'vitest'

function testCalculation(text: string, locale: string, expectedWords: number) {
  const characterCount = countWords(text, locale)

  expect(characterCount).toBe(expectedWords)
}

describe('wordCounter', () => {
  describe('countWords', () => {
    it('Counts words in a Latin text', () => {
      testCalculation('abc def ghj. Also other', 'en', 5)
    })

    it('Counts words with apostrophes', () => {
      testCalculation("d'une famille d'or.", 'fr', 3)
    })

    it('Counts words with ellipsis', () => {
      testCalculation('What can I say... Sometimes it be like that', 'en', 9)
    })

    it('Counts 0 words for undefined', () => {
      testCalculation(undefined as unknown as string, 'en', 0)
    })

    it('Counts 0 words for empty string', () => {
      testCalculation('', 'en', 0)
    })

    it('Counts 0 words for non-text', () => {
      testCalculation('\n', 'en', 0)
    })

    // ToDo fix dravidian language support
    it.skip('Counts dravidian languages', () => {
      testCalculation(
        "പല ഡെസ്‌ക്‌ടോപ്പ് പബ്ലിഷിംഗ് പാക്കേജുകളും വെബ് പേജ് എഡിറ്റർമാരും ഇപ്പോൾ ലോറം ഇപ്‌സം അവരുടെ ഡിഫോൾട്ട് മോഡൽ ടെക്‌സ്‌റ്റായി ഉപയോഗിക്കുന്നു, 'ലോറെം ഇപ്‌സം' എന്നതിനായുള്ള തിരയൽ ശൈശവാവസ്ഥയിലുള്ള നിരവധി വെബ്‌സൈറ്റുകളെ കണ്ടെത്തും.",
        'te',
        23,
      )
    })

    it('Counts GMX factor languages', () => {
      testCalculation('\u65E5\u672C\u8A9E', 'ja', 1)
      testCalculation('\uD55C\uAD6D\uC5B4', 'ko', 1)
      testCalculation('\u4F60\u597D\u5417', 'zh', 1)
      testCalculation('\u0E20\u0E32\u0E29\u0E32\u0E44\u0E17\u0E22', 'th', 1)
    })

    it('Does not counts logographic languages without GMX factor', () => {
      // Laotian, Khmer, and Burmese do not have character count factors defined,
      // so word counts cannot be determined (thus they are 0).
      testCalculation('\u0E9E\u0EB2\u0EAA\u0EB2\u0EA5\u0EB2\u0EA7', 'lo', 0)
      testCalculation('\u1797\u17B6\u179F\u17B6\u1781\u17D2\u1798\u17C2\u179A', 'km', 0)
      testCalculation('\u1019\u103C\u1014\u103A\u1019\u102C\u1018\u102C\u101E\u102C', 'my', 0)
    })
  })
})
