import { describe, expect, it } from 'vitest'
import {
  isApostropheCp,
  isHyphenCp,
  isPunctuation,
  isPunctuationCp,
  isWhitespaceCp,
} from './punctuationUtils'

/* eslint-disable no-irregular-whitespace */

const cp = (symbol: string) => symbol.codePointAt(0)!

describe('punctuationUtils', () => {
  describe('isWhitespaceCp', () => {
    it('returns true for whitespace on the ASCII fast path', () => {
      expect(isWhitespaceCp(cp(' '))).toBe(true) // 0x0020
      expect(isWhitespaceCp(cp('\t'))).toBe(true) // 0x0009
      expect(isWhitespaceCp(cp('\n'))).toBe(true) // 0x000a
      expect(isWhitespaceCp(0x000b)).toBe(true) // LINE TABULATION
      expect(isWhitespaceCp(0x000c)).toBe(true) // FORM FEED
      expect(isWhitespaceCp(cp('\r'))).toBe(true) // 0x000d
    })

    it('returns true for whitespace resolved via the set', () => {
      expect(isWhitespaceCp(0x0085)).toBe(true) // NEXT LINE
      expect(isWhitespaceCp(0x00a0)).toBe(true) // NO-BREAK SPACE
      expect(isWhitespaceCp(0x2003)).toBe(true) // EM SPACE
      expect(isWhitespaceCp(0x3000)).toBe(true) // IDEOGRAPHIC SPACE
    })

    it('returns false for non-whitespace', () => {
      expect(isWhitespaceCp(cp('a'))).toBe(false)
      expect(isWhitespaceCp(cp('0'))).toBe(false)
      expect(isWhitespaceCp(cp('.'))).toBe(false)
      expect(isWhitespaceCp(0x0008)).toBe(false) // just below the fast-path range
      expect(isWhitespaceCp(0x000e)).toBe(false) // just above the fast-path range
      expect(isWhitespaceCp(0x0084)).toBe(false) // just below NEL
    })
  })

  describe('isApostropheCp', () => {
    it('returns true for an apostrophe', () => {
      expect(isApostropheCp(cp(`'`))).toBe(true) // 0x0027
      expect(isApostropheCp(cp('’'))).toBe(true) // 0x2019
    })

    it('returns false for not an apostrophe', () => {
      expect(isApostropheCp(cp('"'))).toBe(false)
      expect(isApostropheCp(cp(' '))).toBe(false)
      expect(isApostropheCp(cp('a'))).toBe(false)
      expect(isApostropheCp(cp('0'))).toBe(false)
    })
  })

  describe('isHyphenCp', () => {
    it('returns true for a hyphen', () => {
      expect(isHyphenCp(cp('-'))).toBe(true) // 0x002d
      expect(isHyphenCp(cp('‐'))).toBe(true) // 0x2010
      expect(isHyphenCp(cp('֊'))).toBe(true) // 0x058a
      expect(isHyphenCp(cp('゠'))).toBe(true) // 0x30a0
    })

    it('returns true for a non-breaking hyphen', () => {
      expect(isHyphenCp(cp('‑'))).toBe(true) // 0x2011
    })

    it('returns false for not a hyphen', () => {
      expect(isHyphenCp(cp(`'`))).toBe(false)
      expect(isHyphenCp(cp('"'))).toBe(false)
      expect(isHyphenCp(cp(' '))).toBe(false)
      expect(isHyphenCp(cp('='))).toBe(false)
      expect(isHyphenCp(cp('a'))).toBe(false)
      expect(isHyphenCp(cp('0'))).toBe(false)
    })
  })

  describe('isPunctuationCp', () => {
    it('returns true for punctuation', () => {
      expect(isPunctuationCp(cp(`'`))).toBe(true)
      expect(isPunctuationCp(cp('’'))).toBe(true)
      expect(isPunctuationCp(cp('"'))).toBe(true)
      expect(isPunctuationCp(cp('.'))).toBe(true)
      expect(isPunctuationCp(cp(','))).toBe(true)
      expect(isPunctuationCp(cp(':'))).toBe(true)
      expect(isPunctuationCp(cp('@'))).toBe(true)
      expect(isPunctuationCp(cp('['))).toBe(true)
      expect(isPunctuationCp(cp('~'))).toBe(true)
      expect(isPunctuationCp(0x2000)).toBe(true) // lower bound of the 0x2000 block
      expect(isPunctuationCp(cp('⁯'))).toBe(true) // 0x206f, upper bound
      expect(isPunctuationCp(cp('　'))).toBe(true) // 0x3000, lower bound
      expect(isPunctuationCp(cp('〿'))).toBe(true) // 0x303f, upper bound
      expect(isPunctuationCp(0x00f7)).toBe(true)
      expect(isPunctuationCp(0x00d7)).toBe(true)
      expect(isPunctuationCp(0x061b)).toBe(true)
      expect(isPunctuationCp(cp('«'))).toBe(true) // 0x00ab guillemet
      expect(isPunctuationCp(cp('»'))).toBe(true) // 0x00bb guillemet
      expect(isPunctuationCp(cp('،'))).toBe(true) // 0x060c ARABIC COMMA
      expect(isPunctuationCp(cp('؟'))).toBe(true) // 0x061f ARABIC QUESTION MARK
      expect(isPunctuationCp(cp('।'))).toBe(true) // 0x0964 DEVANAGARI DANDA
      expect(isPunctuationCp(0x0965)).toBe(true) // DEVANAGARI DOUBLE DANDA
      expect(isPunctuationCp(cp('！'))).toBe(true) // 0xff01 fullwidth
      expect(isPunctuationCp(cp('｣'))).toBe(true) // 0xff63 halfwidth
    })

    it('returns false for not punctuation', () => {
      expect(isPunctuationCp(cp(' '))).toBe(false)
      expect(isPunctuationCp(cp('a'))).toBe(false)
      expect(isPunctuationCp(cp('A'))).toBe(false)
      expect(isPunctuationCp(cp('я'))).toBe(false)
      expect(isPunctuationCp(cp('š'))).toBe(false)
      expect(isPunctuationCp(cp('0'))).toBe(false)
      expect(isPunctuationCp(0x00e9)).toBe(false)
      expect(isPunctuationCp(0x2fff)).toBe(false) // just below the 0x3000 block
      expect(isPunctuationCp(0x3040)).toBe(false) // just above the 0x303f block
      expect(isPunctuationCp(cp('０'))).toBe(false) // 0xff10 fullwidth digit
      expect(isPunctuationCp(cp('Ａ'))).toBe(false) // 0xff21 fullwidth letter
      expect(isPunctuationCp(cp('ａ'))).toBe(false) // 0xff41 fullwidth letter
    })
  })

  describe('isPunctuation', () => {
    it('returns true for punctuation', () => {
      expect(isPunctuation(`'`)).toBe(true)
      expect(isPunctuation(`’`)).toBe(true)
      expect(isPunctuation(`"`)).toBe(true)
      expect(isPunctuation(`.`)).toBe(true)
      expect(isPunctuation(`,`)).toBe(true)
      expect(isPunctuation(`:`)).toBe(true)
      expect(isPunctuation(`;`)).toBe(true)
      expect(isPunctuation(`!`)).toBe(true)
      expect(isPunctuation(`?`)).toBe(true)
      expect(isPunctuation(`-`)).toBe(true)
      expect(isPunctuation(`_`)).toBe(true)
      expect(isPunctuation(`/`)).toBe(true)
      expect(isPunctuation(`\\`)).toBe(true)
      expect(isPunctuation(`@`)).toBe(true)
      expect(isPunctuation(`[`)).toBe(true)
      expect(isPunctuation(`]`)).toBe(true)
      expect(isPunctuation('`')).toBe(true)
      expect(isPunctuation(`{`)).toBe(true)
      expect(isPunctuation(`}`)).toBe(true)
      expect(isPunctuation(`~`)).toBe(true)
      expect(isPunctuation(`⁯`)).toBe(true)
      expect(isPunctuation(`　`)).toBe(true)
      expect(isPunctuation(`〿`)).toBe(true)
    })

    it('returns true for guillemets, Arabic and Devanagari punctuation', () => {
      expect(isPunctuation(`«`)).toBe(true)
      expect(isPunctuation(`»`)).toBe(true)
      // ARABIC COMMA
      expect(isPunctuation(`،`)).toBe(true)
      // ARABIC QUESTION MARK
      expect(isPunctuation(`؟`)).toBe(true)
      // DEVANAGARI DANDA and DOUBLE DANDA
      expect(isPunctuation(`।`)).toBe(true)
      expect(isPunctuation(`॥`)).toBe(true)
    })

    it('returns true for fullwidth and halfwidth CJK punctuation', () => {
      expect(isPunctuation(`！`)).toBe(true)
      expect(isPunctuation(`？`)).toBe(true)
      expect(isPunctuation(`：`)).toBe(true)
      expect(isPunctuation(`（`)).toBe(true)
      expect(isPunctuation(`）`)).toBe(true)
      expect(isPunctuation(`｡`)).toBe(true)
      expect(isPunctuation(`｢`)).toBe(true)
      expect(isPunctuation(`｣`)).toBe(true)
    })

    it('returns false for fullwidth digits and letters', () => {
      expect(isPunctuation(`０`)).toBe(false)
      expect(isPunctuation(`Ａ`)).toBe(false)
      expect(isPunctuation(`ａ`)).toBe(false)
    })

    it('returns false for not punctuation', () => {
      expect(isPunctuation(``)).toBe(false)
      expect(isPunctuation(` `)).toBe(false)
      expect(isPunctuation(`a`)).toBe(false)
      expect(isPunctuation(`A`)).toBe(false)
      expect(isPunctuation(`я`)).toBe(false)
      expect(isPunctuation(`š`)).toBe(false)
      expect(isPunctuation(`0`)).toBe(false)

      expect(isPunctuation(`é`)).toBe(false)
      expect(isPunctuation(`è`)).toBe(false)
      expect(isPunctuation(`ç`)).toBe(false)
    })
  })
})
