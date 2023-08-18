import { countWords } from './wordCounter'
import { expect } from 'vitest'

describe('wordCounter', () => {
  describe('countWords', () => {
    it('Counts words in a Latin segment', () => {
      const segment = 'abc def ghj. Also other'

      const wordCount = countWords(segment)

      expect(wordCount).toBe(5)
    })

    it('Counts 0 words for undefined', () => {
      const segment = undefined

      const wordCount = countWords(segment as unknown as string)

      expect(wordCount).toBe(0)
    })

    it('Counts 0 words for empty string', () => {
      const segment = ''

      const wordCount = countWords(segment)

      expect(wordCount).toBe(0)
    })

    it('Counts 0 words for non-text', () => {
      const segment = '\n'

      const wordCount = countWords(segment)

      expect(wordCount).toBe(0)
    })
  })
})
