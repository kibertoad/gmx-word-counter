# gmx-word-counter

[![NPM Version](https://img.shields.io/npm/v/gmx-word-counter.svg)](https://npmjs.org/package/gmx-word-counter)
[![Build Status](https://github.com/kibertoad/gmx-word-counter/workflows/ci/badge.svg)](https://github.com/kibertoad/gmx-word-counter/actions)
[![Coverage Status](https://coveralls.io/repos/kibertoad/gmx-word-counter/badge.svg?branch=main)](https://coveralls.io/r/kibertoad/gmx-word-counter?branch=main)

GMX-V 2.0 compliant word and character counting implementation for Node.js

## Basic usage

```ts
import { countCharacters, countWords } from 'gmx-word-counter'

const wordCountEn = countWords(`It's five o'clock!`, 'en') // uses English-specific regex, returns 3
const wordCountLt = countWords(`Aš einu į parduotuvę.`, '-') // uses generic regex, returns 4

const characterCount = countCharacters(`d'une famille d'or.`) // returns { punctuation: 1, characters: 16, whiteSpace: 2 }
```

## Language support

Language for word counting is passed in a [BCP47 language subtag format](https://www.iana.org/assignments/language-subtag-registry/language-subtag-registry), e. g. `en` or `fr`.

In case there is no specific word-splitting RegEx implemented for the language, or language subtag is not recognized by the library, generic word splitting RegEx will be used. Therefore you can pass any invalid subtag (e. g. `-`) in case you do not know the language of the text that you are parsing.

## Logographic language support

As per [GMX-V 2.0 specification](https://www.etsi.org/deliver/etsi_gs/LIS/001_099/004/02.00.00_60/gs_LIS004v020000p.pdf), logographic languages that do not have a concept of words per se are supposed to use the so called word count factor in order to calculate the number. In order to calculate the word count in a GMX-V compliant way, one needs to calculate the amount of characters, and then divide it by the word count factor.
GMX-V 2.0 describes the following word count factors:

- Chinese (all forms): 2.8
- Japanese: 3.0
- Korean: 3.3
- Thai: 6.0

`gmx-word-counter` follows the GMX-V directions for these languages.

For logographic languages that GMX-V does not cover (Lao, Khmer and Myanmar), 0 is always returned as a word count.

Note that correct counting for logographic languages requires passing correct language subtag as a parameter. `gmx-word-counter` will not automatically detect that language is logographic if invalid language subtag is passed as a parameter.
