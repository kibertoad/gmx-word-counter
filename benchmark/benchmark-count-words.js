const {BenchmarkBuilder} = require("photofinish");
const {countWords} = require("../dist/lib/wordCounter");

const testFn = () => {
    countWords('ప్రతిపత్తిస్వత్వముల విషయమున - మానవులెల్లరును జన్మతః స్వతంత్రులును సమానులును నగుదురు. వారు వివేచన-అంతఃకరణ సంపన్నులగుటచే పరస్పరము భ్రాతృభావముతో వర్తింపవలయును.', 'te')
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
