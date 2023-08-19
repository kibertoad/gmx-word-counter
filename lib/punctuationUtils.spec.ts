import { describe } from 'vitest'
import { isApostrophe, isHyphen, isPunctuation } from './punctuationUtils'

/* eslint-disable no-irregular-whitespace */

describe('punctuationUtils', () => {
  describe('isApostrophe', () => {
    it('returns true for an apostrophe', () => {
      expect(isApostrophe(`'`)).toBe(true)
      expect(isApostrophe(`’`)).toBe(true)
    })

    it('returns false for not an apostrophe', () => {
      expect(isApostrophe(``)).toBe(false)
      expect(isApostrophe(`"`)).toBe(false)
      expect(isApostrophe(` `)).toBe(false)
      expect(isApostrophe(`a`)).toBe(false)
      expect(isApostrophe(`0`)).toBe(false)
    })
  })

  describe('isHyphen', () => {
    it('returns true for a hyphen', () => {
      // \u2010
      expect(isHyphen(`‐`)).toBe(true)
      // \u002D
      expect(isHyphen(`-`)).toBe(true)
      expect(isHyphen(`֊`)).toBe(true)
      expect(isHyphen(`゠`)).toBe(true)
    })

    it('returns false for not a hyphen', () => {
      expect(isHyphen(`'`)).toBe(false)
      expect(isHyphen(`"`)).toBe(false)
      expect(isHyphen(` `)).toBe(false)
      expect(isHyphen(`=`)).toBe(false)
      expect(isHyphen(`a`)).toBe(false)
      expect(isHyphen(`0`)).toBe(false)
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
      expect(isPunctuation(` `)).toBe(true)
      expect(isPunctuation(`⁯`)).toBe(true)
      expect(isPunctuation(`　`)).toBe(true)
      expect(isPunctuation(`〿`)).toBe(true)
    })

    it('returns false for not punctuation', () => {
      expect(isPunctuation(``)).toBe(false)
      expect(isPunctuation(` `)).toBe(false)
      expect(isPunctuation(`a`)).toBe(false)
      expect(isPunctuation(`A`)).toBe(false)
      expect(isPunctuation(`я`)).toBe(false)
      expect(isPunctuation(`š`)).toBe(false)
      expect(isPunctuation(`0`)).toBe(false)
    })
  })
})
