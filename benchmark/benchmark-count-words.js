const { BenchmarkBuilder } = require('photofinish')
const { countWords } = require('../dist/lib/wordCounter')

const testFn = () => {
  countWords(
    'Svenskar älskar att fika! I Sverige har bakverken sina egna dagar då de firas. Det finns en dag för kanelbullen, för wienerbrödet och för den kanske populäraste kakan – kladdkakan! Kladdkakans dag firas den 7e november varje år. Det är en söt, kladdig och god chokladkaka som nästan alla tycker om. Prova gärna att baka en kladdkaka med detta recept',
    'sw',
  )
}

const benchmarkBuilder = new BenchmarkBuilder()
const benchmarkCountCharacters = benchmarkBuilder
  .benchmarkName('countCharacters')
  .warmupCycles(1000)
  .benchmarkCycles(500)
  .benchmarkCycleSamples(100)
  .functionUnderTest(testFn)
  .build()

const benchmarkResult = benchmarkCountCharacters.execute()

console.log(`Execution results: ${JSON.stringify(benchmarkResult, undefined, 2)}`)
