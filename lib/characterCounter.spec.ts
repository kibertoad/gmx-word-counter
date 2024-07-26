import { describe, expect, it } from 'vitest'
import { type Counts, countCharacters } from './characterCounter'

function testCalculation(text: string, expectedCounts: Counts) {
  const characterCount = countCharacters(text)

  expect(characterCount).toEqual({
    punctuation: expectedCounts.punctuation,
    characters: expectedCounts.characters,
    whiteSpace: expectedCounts.whiteSpace,
  })
}

describe('characterCounter', () => {
  it('skips if no text is provided', () => {
    testCalculation(undefined as unknown as string, {
      punctuation: 0,
      characters: 0,
      whiteSpace: 0,
    })
  })

  it('calculates amount of characters in a simple Latin text', () => {
    testCalculation('The quick brown fox jumps over the lazy dog', {
      punctuation: 0,
      characters: 35,
      whiteSpace: 8,
    })

    testCalculation('Test word count is correct', {
      punctuation: 0,
      characters: 22,
      whiteSpace: 4,
    })
  })

  it('calculates amount of characters in a simple Cyrillic text', () => {
    testCalculation('Каждый охотник желает знать где сидит фазан', {
      punctuation: 0,
      characters: 37,
      whiteSpace: 6,
    })
  })

  it('calculates amount of characters in more complex Latin texts', () => {
    testCalculation('The quick ("brown") fox can\'t jump 32.3 feet, right?', {
      punctuation: 7,
      characters: 37,
      whiteSpace: 8,
    })

    testCalculation(`The quick (\u201Cbrown\u201D) fox can\u2019t jump 32.3 feet, right?`, {
      punctuation: 7,
      characters: 37,
      whiteSpace: 8,
    })
  })

  it('calculates amount of characters in a text with apostrophes', () => {
    testCalculation("L'objectif est defini.", {
      punctuation: 1,
      characters: 19,
      whiteSpace: 2,
    })

    testCalculation('L\u2019objectif est defini.', {
      punctuation: 1,
      characters: 19,
      whiteSpace: 2,
    })

    // Punctuation characters are excluded, but hyphens and apostrophes are included
    // if they appear inside of a word.
    testCalculation(`d'une famille d'or.`, {
      punctuation: 1,
      characters: 16,
      whiteSpace: 2,
    })

    testCalculation("d'\u00E9migr\u00E9s.", {
      punctuation: 1,
      characters: 9,
      whiteSpace: 0,
    })

    testCalculation(
      'Elle a \u00E9t\u00E9 la ' +
        "premi\u00E8re Fran\u00E7aise d'une famille d'\u00E9migr\u00E9s.",
      {
        punctuation: 1,
        characters: 48,
        whiteSpace: 8,
      },
    )

    testCalculation(
      'Elle a \u00E9t\u00E9 la ' +
        'premi\u00E8re Fran\u00E7aise d\u2019une famille d\u2019\u00E9migr\u00E9s.',
      {
        punctuation: 1,
        characters: 48,
        whiteSpace: 8,
      },
    )

    testCalculation("He can't eat that fast.", {
      punctuation: 1,
      characters: 18,
      whiteSpace: 4,
    })

    testCalculation('He can\u2019t eat that fast.', {
      punctuation: 1,
      characters: 18,
      whiteSpace: 4,
    })
  })

  it('calculates amount of characters in text with hyphens', () => {
    testCalculation('  Al Capone was an Italian-American.  ', {
      punctuation: 1,
      characters: 29,
      whiteSpace: 8,
    })
  })

  it('calculates amount of characters in text with accordance to GMX requirements', () => {
    testCalculation('The black cat eats.', {
      punctuation: 1,
      characters: 15,
      whiteSpace: 3,
    })

    testCalculation('Start Text end.', {
      punctuation: 1,
      characters: 12,
      whiteSpace: 2,
    })

    testCalculation(
      'In this example the in-line codes do not form\n' +
        'part of the word or character counts but are counted separately.',
      {
        punctuation: 1,
        characters: 90,
        whiteSpace: 19,
      },
    )

    testCalculation('This sentence/text unit has a word count of 11 words.', {
      punctuation: 2,
      characters: 42,
      whiteSpace: 9,
    })

    testCalculation('This sentence has a word count of 9 words.', {
      punctuation: 1,
      characters: 33,
      whiteSpace: 8,
    })
  })
})
