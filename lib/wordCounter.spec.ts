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

    it('Counts dravidian languages (Malayalam I)', () => {
      testCalculation(
        "പല ഡെസ്‌ക്‌ടോപ്പ് പബ്ലിഷിംഗ് പാക്കേജുകളും വെബ് പേജ് എഡിറ്റർമാരും ഇപ്പോൾ ലോറം ഇപ്‌സം അവരുടെ ഡിഫോൾട്ട് മോഡൽ ടെക്‌സ്‌റ്റായി ഉപയോഗിക്കുന്നു, 'ലോറെം ഇപ്‌സം' എന്നതിനായുള്ള തിരയൽ ശൈശവാവസ്ഥയിലുള്ള നിരവധി വെബ്‌സൈറ്റുകളെ കണ്ടെത്തും.",
        'ml',
        23,
      )
    })

    it('Counts dravidian languages (Malayalam II)', () => {
      testCalculation(
        "ഒരു പേജിന്റെ ലേഔട്ട് നോക്കുമ്പോൾ വായിക്കാനാകുന്ന ഉള്ളടക്കത്തിൽ നിന്ന് ഒരു വായനക്കാരൻ ശ്രദ്ധ തിരിക്കുമെന്നത് വളരെക്കാലമായി സ്ഥിരീകരിക്കപ്പെട്ട വസ്തുതയാണ്. ലോറെം ഇപ്‌സം ഉപയോഗിക്കുന്നതിന്റെ പ്രധാന കാര്യം, 'ഉള്ളടക്കം ഇവിടെ, ഉള്ളടക്കം ഇവിടെ' ഉപയോഗിക്കുന്നതിന് വിപരീതമായി അക്ഷരങ്ങളുടെ കൂടുതലോ കുറവോ സാധാരണ വിതരണമുണ്ട്, ഇത് വായിക്കാനാകുന്ന ഇംഗ്ലീഷ് പോലെ തോന്നിപ്പിക്കുന്നു. പല ഡെസ്‌ക്‌ടോപ്പ് പബ്ലിഷിംഗ് പാക്കേജുകളും വെബ് പേജ് എഡിറ്റർമാരും ഇപ്പോൾ ലോറെം ഇപ്‌സം അവരുടെ ഡിഫോൾട്ട് മോഡൽ ടെക്‌സ്‌റ്റായി ഉപയോഗിക്കുന്നു, 'ലോറെം ഇപ്‌സം' എന്നതിനായുള്ള തിരയൽ ശൈശവാവസ്ഥയിലുള്ള നിരവധി വെബ്‌സൈറ്റുകളെ കണ്ടെത്തും. വിവിധ പതിപ്പുകൾ വർഷങ്ങളായി വികസിച്ചു, ചിലപ്പോൾ ആകസ്മികമായി, ചിലപ്പോൾ ഉദ്ദേശ്യത്തോടെ (ഇൻജക്റ്റ് നർമ്മവും മറ്റും).",
        'ml',
        69,
      )
    })

    it('Counts dravidian languages (Malayalam III)', () => {
      testCalculation('നിങ്ങളുടെ ബാങ്ക് തിരഞ്ഞെടുക്കുക', 'ml', 3)
    })

    it('Counts dravidian languages (Kannada I)', () => {
      testCalculation('ನಿಮ್ಮ ಬ್ಯಾಂಕ್ ಆಯ್ಕೆಮಾಡಿ', 'kn', 3)
    })

    it('Counts dravidian languages (Kannada II)', () => {
      testCalculation(
        'ಕನ್ನಡ ಭಾಷೆ ದಕ್ಷಿಣ ಭಾರತದ ಕರ್ನಾಟಕ ರಾಜ್ಯದ ಅಧಿಕೃತ ಭಾಷೆಯಾಗಿದೆ. ಇದು ದ್ರಾವಿಡ ಭಾಷೆಗಳ ಕುಟುಂಬದಲ್ಲಿ ಸೇರಿದೆ. ಕನ್ನಡ ಭಾಷೆಯನ್ನು ಆಡುತ್ತಿರುವ ಜನಸಂಖ್ಯೆ ಸುಮಾರು ೪೪ ಮಿಲಿಯನ್ ಇದ್ದಾರೆ. ಕನ್ನಡ ಭಾಷೆಯು ಅದರ ಸಾಹಿತ್ಯ ಮತ್ತು ಸಂಸ್ಕೃತಿಯ ದೃಷ್ಟಿಯಿಂದ ಅತ್ಯಂತ ಹಳೆಯದಾಗಿದೆ. ಈ ಭಾಷೆಯಲ್ಲಿ ಅನೇಕ ಪುಸ್ತಕಗಳು, ಕಾವ್ಯಗಳು ಹಾಗೂ ನಾಟಕಗಳು ಬರೆಯಲಾಗಿದೆ.',
        'kn',
        38,
      )
    })

    it('Counts dravidian languages (Telugu I)', () => {
      testCalculation('మీ బ్యాంకును ఎంచుకోండి', 'te', 3)
    })

    it('Counts dravidian languages (Telugu II)', () => {
      testCalculation(
        'ప్రతిపత్తిస్వత్వముల విషయమున మానవులెల్లరును జన్మతః స్వతంత్రులును సమానులును నగుదురు. వారు వివేచన-అంతఃకరణ సంపన్నులగుటచే పరస్పరము భ్రాతృభావముతో వర్తింపవలయును.',
        'te',
        13,
      )
    })

    it('Counts dravidian languages (Tamil)', () => {
      testCalculation('உங்கள் வங்கியைத் தேர்ந்தெடுக்கவும்', 'ta', 3)
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
