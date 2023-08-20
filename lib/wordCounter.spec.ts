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

    it('Counts words in a French text', () => {
      testCalculation(
        'Ah, le mois de décembre : ses illuminations, la couronne de l’Avent pour les catholiques, et le fameux calendrier empli de chocolat pour les enfants... Tous ces préparatifs rendent chaque année l’atmosphère festive et enjouée. Il n’y a qu’à observer la métamorphose des rues commerçantes pour en être convaincu. Finies les façades grises et ternes, terminée la morosité ambiante : les rues se parent de guirlandes scintillantes et les vitrines rivalisent d’imagination pour leur décoration.',
        'fr',
        73,
      )
    })

    it('Counts words in a Italian text', () => {
      testCalculation(
        'Tritate finemente la cipolla, l’aglio e il peperoncino. Lavate e tagliate a cubetti la zucchina, la melanzana e il peperone. Riscaldate 3 cucchiai di olio evo in una padella e poi aggiungete cipolla, aglio e peperoncino. Soffriggete fino a quando la cipolla diventa dorata. Aggiungete le verdure. Quando le verdure sono a buon punto aggiungete la passata di pomodoro. Mescolate e salate a piacere. Riempite una grossa pentola d’acqua e mettetela a bollire a fuoco alto. Aggiungete un pugno di sale all’acqua bollente e poi aggiungete la pasta. Una volta cotta la pasta scolatela al dente, aggiungetela al sugo e mescolate. La pasta è pronta per essere servita!',
        'it',
        108,
      )
    })

    it('Counts words in a German text', () => {
      testCalculation(
        'Mit dem „Faust“ schuf Goethe sein wohl wichtigstes Werk. Es geht darin um einen Mann, der seine Seele dem Teufel verschreibt. Den zweiten Teil der Tragödie beendete er kurz vor seinem Tod im Jahr 1832. Mit 82 Jahren starb Goethe und hinterließ ein reiches literarisches Erbe, durch das er unsterblich wurde.',
        'de',
        51,
      )
    })

    it('Counts words in a Lithuanian text', () => {
      testCalculation('Aš einu į parduotuvę', 'lt', 4)
    })

    it('Counts words in a Danish text', () => {
      testCalculation(
        'Han er en stille, eftertænksom mand. Selvom han har meget erfaring, er han ikke stolt. Han tager ikke sig selv alt for højtideligt. Derfor elsker Maria sin morfar. Han er tilgængelig og bliver aldrig sur; tværtimod spreder han ro og god stemning. Maria syntes det er sjovt at kilde ham. Han griner så meget, at han er ved at falde ned af stolen. Det er så hyggeligt! Han er så sød! Han er et meget nostalgisk menneske. Han elsker at kigge på billeder fra gamle dage og lukke sig inde på sit kontor for at fordybe sig i Bibelen og andre lærerige bøger.',
        'da',
        103,
      )
    })

    it('Counts words in a Polish text', () => {
      testCalculation(
        'To najpiękniejsza i jednocześnie najstarsza część Wrocławia, pozostałości pierwszej osady odkryte tu pochodzą z X wieku. Przez wieki podlegała władzy kościelnej, dzisiaj to nastrojowe miejsce, popularne wśród zakochanych, spacerowiczów i turystów. Od kilkunastu lat jest popularnym miejscem spotkań zakochanych. Tradycją stało się wieszanie na nim kłódek (kluczyki do nich wrzucane są do Odry), na znak trwałości uczucia łączącego pary. Most Tumski łączy Wyspę Piasek i Ostrów Tumski. Stalowa konstrukcja z 1889 r. stanęła w miejscu, gdzie od co najmniej XII wieku budowano mosty. Przy wejściu na most stoją figury św. Jadwigi i św. Jana Chrzciciela.',
        'pl',
        95,
      )
    })

    it('Counts words in a Dutch text', () => {
      testCalculation(
        'Gisteren ging ik met Marcel naar de supermarkt. Wij hadden al een tijd samen ruzie. Toch moesten er boodschappen worden gedaan, dus besloten wij om toch maar gewoon wat inkopen te gaan doen. We kregen al meer ruzie toen we besloten naar welke supermarkt te gaan. Marcel wilde namelijk naar de supermarkt waar wasmiddel in de aanbieding was en ik wilde naar de supermarkt die het dichtst bij was.',
        'nl',
        69,
      )
    })

    it('Counts words in a Swedish text', () => {
      testCalculation(
        'Svenskar älskar att fika! I Sverige har bakverken sina egna dagar då de firas. Det finns en dag för kanelbullen, för wienerbrödet och för den kanske populäraste kakan – kladdkakan! Kladdkakans dag firas den 7e november varje år. Det är en söt, kladdig och god chokladkaka som nästan alla tycker om. Prova gärna att baka en kladdkaka med detta recept',
        'sw',
        59,
      )
    })

    it('Counts words in a Norwegian text', () => {
      testCalculation(
        'Alle jentene foretrekker å danse ballet, men til helgen kommer de til å opptre med hip hop. I tillegg til dette har jentene opptrådt med salsa og swing. Marte gruer seg litt til søndag, hun sliter nemlig med å huske alle dansetrinnene. Ingrid er også litt stresset, hun sliter nemlig med et vondt kne. Live og Marianne derimot føler at de kan koreografien ganske godt og de gleder seg til forestillingen.',
        'no',
        71,
      )
    })

    it('Counts words in an English text with unknown locale', () => {
      testCalculation('He is actually pretty well-known around here.', '-', 7)
    })

    it('Counts words in a Latvian text', () => {
      testCalculation(
        'Noslēdzošajā spēles nogrieznī Latvijas izlase turpināja rādīt labu sniegumu, pie pirmajiem gūtajiem punktiem tika arī Jānis Timma, kuram šī bija pirmā pārbaudes spēle un atgriešanās 5:5 basketbolā pēc ilgākas pauzes. 84:72 - ar šādu rezultātu uzvarēja Latvijas izlase priekšpēdējā pārbaudes spēlē. one more: ī',
        'lt',
        43,
      )
    })

    it('Counts words in an English text', () => {
      testCalculation(
        'Saving your merry humour, here’s the note ' +
          'How much your chain weighs to the utmost carat, ' +
          'The fineness of the gold, and chargeful fashion, ' +
          '30 Which doth amount to three odd ducats more ' +
          'Than I stand debted to this gentleman: ' +
          'I pray you, see him presently discharged, ' +
          "For he is bound to sea, and stays but for it. And five o'clock",
        'en',
        61,
      )

      testCalculation('He is a very down-to-earth person.', 'en', 6)

      testCalculation("Such a ne'er-do-well!", 'en', 3)

      testCalculation('I will visit you on the 7th!', 'en', 7)
    })

    it('Counts words in a Spanish text', () => {
      testCalculation('Es un placer conocerte, ¿Cómo te llamas?', 'es', 7)
      testCalculation(
        'Luego, me interesé más en los pasatiempos y empecé a emplear más tiempo en ellos. Así que comencé a probar otros deportes como el basquetbol y el tenis. También, luego de desarrollar un muy buen gusto por la música, aprendí a tocar otros instrumentos como la guitarra y el violín. Todas estas herramientas fueron construyendo nuevas habilidades que podía utilizar en otras actividades.',
        'es',
        63,
      )
    })

    it('Counts words in a Portuguese text', () => {
      testCalculation(
        'O Brasil é um país que sempre foi referido por outras nações por seu tamanho ou por sua população. Mas em discussões entre os cientistas, jornalistas, economistas, e experientes internacionais, este país é muitas vezes caracterizado como um país subdesenvolvido',
        'pt',
        40,
      )
    })

    it('Counts words with ellipsis', () => {
      testCalculation('What can I say... Sometimes it be like that', 'en', 9)
    })

    it('Counts words with hyphen', () => {
      testCalculation('He was a well-known scientist', 'en', 5)
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

    it('Counts dravidian languages (Telugu III)', () => {
      testCalculation(
        'ప్రతిపత్తిస్వత్వముల విషయమున - మానవులెల్లరును జన్మతః స్వతంత్రులును సమానులును నగుదురు. వారు వివేచన-అంతఃకరణ సంపన్నులగుటచే పరస్పరము భ్రాతృభావముతో వర్తింపవలయును.',
        'te',
        13,
      )
    })

    it('Counts dravidian languages (Tamil)', () => {
      testCalculation('உங்கள் வங்கியைத் தேர்ந்தெடுக்கவும்', 'ta', 3)
    })

    it('Counts text with surrogate pair', () => {
      testCalculation('古池や蛙飛び込む𠮷の音', 'ja', 4)
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
