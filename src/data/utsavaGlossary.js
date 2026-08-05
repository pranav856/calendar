// Tirumala Festival & Utsavam Glossary / Lexicon ("Utsava Shabda Kosh")
// Un-combined, detailed entries rewritten from TTD Sapthagiri Magazine (September 2020) and Telugu manuscripts
// All terms are individual, sorted in ascending alphabetical order, with spiritual merit section removed.

export const GLOSSARY_CATEGORIES = [
  { id: 'all', labelEn: 'All Terms', labelTe: 'అన్ని పదాలు', icon: '📖' },
  { id: 'utsavams', labelEn: 'Utsavams & Festivals', labelTe: 'ఉత్సవాలు & పండుగలు', icon: '🪔' },
  { id: 'sevas', labelEn: 'Rituals & Sevas', labelTe: 'పూజలు & సేవలు', icon: '🌸' },
  { id: 'vahanas', labelEn: 'Sacred Vahanas', labelTe: 'దివ్య వాహనాలు', icon: '🦅' },
  { id: 'timing_symbols', labelEn: 'Sacred Timing & Symbols', labelTe: 'తిథులు & ముద్రలు', icon: '🌙' },
  { id: 'significant_people', labelEn: 'Significant Devotees & Acharyas', labelTe: 'మహనీయులు & పరమ భక్తులు', icon: '🕉️' },
];

export const UTSAVA_GLOSSARY_TERMS = [
  {
    id: 'abhishekam',
    term: 'Abhishekam',
    termTe: 'అభిషేకం',
    category: 'sevas',
    shortDesc: 'Sacred Vedic bathing ritual offered to the deity with holy liquids, milk, curd, honey, ghee, sandalwood, and herbs.',
    shortDescTe: 'పాలు, పెరుగు, తేనె, నెయ్యి, చందనం మరియు పవిత్ర జలాలతో దివ్య మూలవిరాట్‌కు నిర్వహించే మహోన్నత స్నపన సేవ.',
    detailedMeaning: `Abhishekam is a central Vedic bathing ritual performed to sanctify the deity accompanied by continuous Vedaparayanam and sacred mantra chants. 

At Tirumala, Abhishekam is performed using sanctified liquids poured over the deity in golden and silver vessels. This sacred bath cools the intense cosmic aura of the Lord and represents spiritual purification for the entire universe.

The ritual is conducted strictly according to Vaikhanasa Agama scriptures, utilizing pure ingredients like cow's milk, curd, honey, clarified butter (ghee), turmeric, civet oil, and aromatic sandalwood paste brought from the temple treasury.`,
    detailedMeaningTe: `వైదిక మంత్రోచ్చారణల మధ్య దివ్య విగ్రహానికి పవిత్ర ద్రవ్యాలతో స్నపనం చేసే ముఖ్యమైన క్రతువు అభిషేకం.

తిరుమల శ్రీవారి ఆలయంలో పాలు, పెరుగు, తేనె, నెయ్యి, పసుపు, చందనములతో వెండి బంగారం పాత్రలలో ఈ మహోన్నత స్నపన సేవ జరుపబడుతుంది. స్వామివారి దివ్య తేజస్సును దర్శించి మానవాళి శ్రేయస్సును కాంక్షించడానికి ఈ పూజ అత్యంత కీలకమైనది.

వైఖానస ఆగమ శాస్త్ర నియమాల ప్రకారం అత్యంత నియమ నిష్ఠలతో పవిత్ర ద్రవ్యాలను సమర్పిస్తూ ఈ అభిషేకాన్ని అర్చక స్వాములు నిర్వహిస్తారు.`,
    relatedEventKeywords: ['Abhishekam', 'అభిషేకం', 'Snapana']
  },
  {
    id: 'alankaram',
    term: 'Alankaram',
    termTe: 'అలంకారం',
    category: 'sevas',
    shortDesc: 'The sacred art of decorating Lord Venkateswara with silk garments, precious antique jewels, and fragrant garlands.',
    shortDescTe: 'స్వామివారిని రత్నాభరణాలు, పట్టు వస్త్రాలు మరియు సుగంధ పరిమళ మాలలతో మహోన్నతంగా అలంకరించే కళ.',
    detailedMeaning: `Alankaram is the divine art of ornamentation wherein Lord Venkateswara and His processional deities are bedecked in silk robes, diamond crowns, and fragrant flower garlands.

During festivals, temple master artisans adorn Lord Malayappa Swamy in iconic forms (such as Mohini Avataram, Sri Rama, Venugopala, or Muralikrishna). 

Acharya Ramanuja instituted the strict Agama rule that during Alankaram, decorations must first be offered to the Shankha (Conch) and Chakra (Discus) on the Lord's upper hands, then to the Lotus Feet, followed by Goddess Mahalakshmi on the chest necklace, and finally the golden Crown.`,
    detailedMeaningTe: `అలంకారం అంటే స్వామివారిని వివిధ అవతారాలలో, రత్నకచిత ఆభరణాలు, పట్టు వస్త్రాలు మరియు పూలమాలలతో దివ్యంగా శృంగారించే పవిత్ర ప్రక్రియ.

బ్రహ్మోత్సవాల సమయంలో శ్రీమలయప్ప స్వామివారిని మోహిని, శ్రీరామ, మురళీకృష్ణ వంటి రకరకాల అవతారాలలో తీర్చిదిద్ది భక్తులకు నేత్రపర్వ దర్శనం కలిగిస్తారు.

శ్రీ రామానుజాచార్యుల వారి నియమం ప్రకారం స్వామివారికి అలంకారం చేసేటప్పుడు మొదట శంఖ చక్రాలకు, తరువాత శ్రీచరణాలకు, ఆపై వక్షస్థలంలోని మహాలక్ష్మికి, చివరిగా కిరీటానికి అలంకారం జరపాలి.`,
    relatedEventKeywords: ['Alankaram', 'అలంకారం', 'Decor']
  },
  {
    id: 'alipiri-padala-mandapam',
    term: 'Alipiri & Srivari Padala Mandapam',
    termTe: 'అలిపిరి & శ్రీవారి పాదాల మంటపం',
    category: 'timing_symbols',
    shortDesc: 'Sacred threshold footstool of Tirumala, the confluence of nature, history, and devotion at the foot of Seven Hills.',
    shortDescTe: 'తిరుమలకు పాదపీఠం; పంచభూతాత్మక ప్రకృతి, పురాణాలు, ఇతిహాసాలు మరియు సనాతన భక్తితత్పరతల పవిత్ర సంగమస్థలి అలిపిరి.',
    detailedMeaning: `Alipiri is a sacred realm constantly vibrant with pilgrims, mountain peaks, temple gopurams, and sculpted mandapams. It serves as the grand junction for the two uphill ghat roads and the trekking footway steps—the divine footstool (Padapeetham) of Tirumala. Alipiri is the holy confluence of nature's five elements, puranas, epics, Sanatana traditions, history, and contemporary devotion.

Some refer to it as 'Adipuli', as Tamils originally called it upon seeing a tamarind tree ('Puli Maram' in Tamil) at the first step. They also pronounced it 'Adipadi', which gradually transformed into 'Alipiri'. 'Adi' means first, and 'Padi' means step—meaning the 'First Step' (Tholi Mettu). The pavilion where the Lord's lotus feet manifest here is named Srivari Padala Mandapam. Another esoteric interpretation of 'Alipiri' is 'Alpa Sareeri' (subtle form); devotees faithfully believe that Lord Venkateswara resides here in His subtle body to bless pilgrims.

Pilgrims trekking up the hills offer prayers to the Lord in this mandapam, place the sacred metallic feet (Looha Padalu) reverently upon their heads, and circumambulate the sanctum. Devotees also offer metallic footwear made of brass or silver as sacred vows to the Lord.

(Source: TTD Sapthagiri Magazine, September 2020)`,
    detailedMeaningTe: `కొండశిఖరాలతో, ఘనగుడి గోపురాలతో, శిల్పశోభిత మంటపాలతో, భక్తులరాకపోకలతో నిరంతరం సందడిగా ఉండే దైవావరణం. రెండు ఘాట్‌రోడ్లకు, నడకదోవకు కూడలిస్థానం. తిరుమలకు పాదపీఠం. ఒక్కమాటలో చెప్పాలంటే పంచభూతాత్మకప్రకృతి, పురాణాలు, ఇతిహాసాలు, సనాతనసంస్కృతిసంప్రదాయాలు, చరిత్ర, సమకాలీనభక్తితత్పరతల సంగమస్థలి - అలిపిరి.

'అడిపుళి' అని కొందరంటారు. తొలిమెట్టుదగ్గర చింతచెట్టును చూసి తమిళులు అలా పిలిచేవారు. తమిళంలో చింతచెట్టును 'పుళిమరం' అంటారు. వారు అడిపుళి అనే కాకుండా అడిపడి అనికూడా పలుకుతారు. తమిళంలో అడిపడి కాస్తా అలిపిరిగా మారింది. 'అడి' అంటే అది లేక తొలి, 'పడి' అంటే మెట్టు, తొలిమెట్టు అని అర్థం. ఇక్కడ స్వామి పాదాలు వెలసిన మంటపానికే అలిపిరి పాదాలమంటపం అని పేరు. అలిపిరి అంటే 'అల్పశరీరి' అనికూడా అర్థంగా చెబుతారు. శ్రీవేంకటేశ్వరస్వామి సూక్ష్మశరీరంతో ఇక్కడ భక్తులను అనుగ్రహిస్తుంటారని భక్తుల నమ్మకం.

మెట్లెక్కి తిరుమలకు నడచివెళ్లే భక్తులు మంటపంలోని శ్రీస్వామివారిని సేవించుకుని, శ్రీవారిలోహపాదాలను భక్తి ప్రపత్తులతో నెత్తినెడుకుని గర్భగుడి ప్రదక్షిణ చేస్తారు. సనాతన భారతీయతాత్త్విక ఆరాధనలో పాదాల ఔన్నత్యానికి ఇదో మచ్చుతునక. ఇత్తడి, వెండితో చేసిన పాదరక్షలను భక్తులు కొందరు శ్రీస్వామివారికి మొక్కుగా చెల్లించుకుంటారు.

(ఆధారం: సప్తగిరి మాసపత్రిక, సెప్టెంబరు 2020)`,
    relatedEventKeywords: ['Alipiri', 'అలిపిరి', 'Padala Mandapam', 'Tholi Mettu']
  },
  {
    id: 'alwars-divya-prabandham',
    term: 'Alwars & Nalayira Divya Prabandham',
    termTe: 'ఆళ్వార్లు & నాళయిర దివ్య ప్రబంధం',
    category: 'significant_people',
    shortDesc: 'The 12 holy Saint-Poets of South India and their 4,000 Tamil nectarine hymns praising Lord Venkateswara.',
    shortDescTe: 'దక్షిణ భారత 12 మంది పరమ ఆళ్వార్ల దివ్య సన్యాసి వర్గం మరియు వారు గానం చేసిన 4,000 నాళయిర దివ్య ప్రబంధ శ్లోకాలు.',
    detailedMeaning: `The Alwars (Poigai, Bhutat, Peyalwar, Nammalwar, Kulasekhara, Tirumazhisai, Tiruppan, Thondaradippodi, Tirumangai, Perialwar, Andal, and Madhurakavi) were 12 mystics immersed in divine love for Vishnu.

Their collective compilation, Nalayira Divya Prabandham (the Tamil Veda), contains 4,000 honeyed verses praising Tirumala Hills, its fragrant gardens, and Lord Srinivasa.

During Brahmotsavams, every Vahana procession is led by Adhyapakas reciting specific Divya Prabandham pasurams selected to match the deity's vehicle (e.g. Poigai Alwar's 53rd pasuram for Sesha Vahana, Perialwar's 95th pasuram for Simha Vahana, and Tirumangai Alwar's Ratha Bandham poem for Rathotsavam).`,
    detailedMeaningTe: `దక్షిణ భారతదేశానికి చెందిన 12 మంది దివ్య ఆళ్వార్ సన్యాసులు (పొయ్గై, భూతత్, పేయాళ్వార్, నమ్మాళ్వార్, కులశేఖర, తిరుమళిశై, తిరుప్పాణ్, తొండరడిప్పొడి, తిరుమంగై, పెరియాళ్వార్, ఆండాళ్, మధురకవి) విష్ణుభక్తిలో మైమరచి 4,000 తమిళ్ వేద పాశురాలను గానం చేశారు.

తిరుమల బ్రహ్మోత్సవాలలో ప్రతి వాహన సేవ ముందు వేద పండితులు ఆ వాహనానికి సంబంధించిన ఆళ్వార్ పాశురాలను (ఉదా: శేష వాహనానికి పొయ్గై ఆళ్వార్ 53వ పాశురం, సింహ వాహనానికి పెరియాళ్వార్ 95వ పాశురం) చదువుతూ ఊరేగింపును నడిపిస్తారు.

ఈ పాశురాలు తిరుమల కొండల దివ్యత్వాన్ని, పూలతోటల వైభవాన్ని విశదీకరిస్తాయి.`,
    relatedEventKeywords: ['Alwar', 'ఆళ్వార్', 'Divya Prabandham']
  },
  {
    id: 'angapradakshinam',
    term: 'Angapradakshinam',
    termTe: 'అంగప్రదక్షిణం',
    category: 'sevas',
    shortDesc: 'Sacred prostration roll ritual performed around the temple sanctum in wet clothes after bathing in Swami Pushkarini.',
    shortDescTe: 'స్వామిపుష్కరిణిలో స్నానం చేసి తడిబట్టలతో సాష్టాంగ ప్రణామాలతో ఆలయ ప్రాకారాన్ని చుట్టివచ్చే అత్యంత పవిత్రమైన సేవ.',
    detailedMeaning: `Angapradakshinam is a devout prostration ritual where pilgrims roll around the inner circumambulatory path (Pradakshina Marga) of the Tirumala temple.

Pilgrims take a holy bath in the Swami Pushkarini tank before dawn (by 2:00 AM) and proceed in wet garments to perform prostrations.

The word "Sashtanga" signifies prostration using eight body parts (forehead, chest, hands, knees, and feet) touching the sacred ground. Performing Angapradakshinam surrenders one's ego, mind, and physical body completely at the feet of Lord Venkateswara.`,
    detailedMeaningTe: `సాష్టాంగ నమస్కార రూపంలో శరీరంలోని సర్వాంగాలు భూమిని తాకుతూ శ్రీవారి ఆలయాన్ని ప్రదక్షిణం చేసే అత్యంత పవిత్రమైన సేవ అంగప్రదక్షిణం.

వేకువ జామున రెండు గంటలలోపే పవిత్ర స్వామిపుష్కరిణిలో స్నానంచేసి, తడిబట్టలతో దండాలు పెడుతూ ఈ ప్రదక్షిణం మొదలుపెడతారు. దీన్ని శుద్ధాంగప్రదక్షిణం అని కూడా అంటారు. పుష్కరిణిలో చేసే స్నానం బహుపుణ్యవంతం. శాస్త్రబద్ధంగా పరిశీలిస్తే ప్రదక్షిణం అంటే ఎక్కడ ఆరంభిస్తామో అక్కడే ముగించాలి. "ప్రదక్షిణ ప్రణామానాం యుగ్మాన్యేవ సమాచరేత్" అంటే ప్రదక్షిణాలు గాని, ప్రణామాలు గానీ రెండేసిమార్లు చేయాలి.

శ్రీవేంకటేశ్వరుడికి సర్వాంగాలతో పొర్లిపొర్లి తృప్తిగా నమస్కరించడంవల్ల శరీరం, మనస్సు మమేకం చెంది, భక్తి పరాకాష్ఠకు చేరుతుంది. అంగప్రదక్షిణ మార్గంలో బంగారుబావి, అంకురార్పణ మంటపం, యాగశాల, శ్రీరామానుజాచార్యుల సన్నిధి, శ్రీయోగనరసింహస్వామిని దర్శించుకుంటూ ప్రదక్షిణ పూర్తి చేస్తారు.`,
    relatedEventKeywords: ['Angapradakshinam', 'అంగప్రదక్షిణం', 'Pushkarini']
  },
  {
    id: 'ankurarpanam',
    term: 'Ankurarpanam',
    termTe: 'అంకురార్పణ',
    category: 'sevas',
    shortDesc: 'Sacred seed-sowing ritual conducted on the evening prior to Brahmotsavam to symbolize cosmic germination.',
    shortDescTe: 'బ్రహ్మోత్సవాల ప్రారంభానికి ముందు రోజు సాయంత్రం నవధాన్యాలను పాలికలలో నాటి మొలకెత్తించే దివ్య అంకురార్పణ క్రతువు.',
    detailedMeaning: `Ankurarpanam is the formal prelude to Brahmotsavams performed on the evening before Dwajarohanam.

Priests proceed with temple music to the Vasantha Mandapam in the South-West direction of the temple. Sanctified soil collected from the forehead, arms, and chest area of Mother Bhudevi's form is brought in procession to the Yagashala.

This sacred earth is filled into nine earthen pots (Palikas), and nine types of sacred grains (Navadhanyas) are sown inside. Lord Soma (Chandra - Moon God) is invoked as the presiding deity of this ritual. Daily water is poured so the seeds sprout lushly like the waxing moon of Sukla Paksha, symbolizing successful completion and cosmic fruitfulness of the festival.`,
    detailedMeaningTe: `బ్రహ్మోత్సవాలు ప్రారంభమయ్యే ముందు రోజు రాత్రి జరిగే అత్యంత పవిత్రమైన కార్యం అంకురార్పణ.

ఆలయానికి నైరుతి దిశలో ఉన్న వసంత మండపానికి మేళతాళాలతో వెళ్లి, భూదేవి ఆకారంలోని లలాట, బాహు, స్తన ప్రదేశాల నుండి పవిత్ర మట్టిని సేకరించి ఊరేగింపుగా యాగశాలకు చేరుకుంటారు.

యాగశాలలో తొమ్మిది పాలికలలో (మట్టి కుండలలో) ఈ మట్టిని నింపి నవధాన్యాలను పోసి మొలకెత్తించే పనిని ప్రారంభిస్తారు. ఈ కార్యక్రమానికి సోముడు (చంద్రుడు) అధిపతి. శుక్లపక్ష చంద్రునిలా నవధాన్యాలు దినదినాభివృద్ధి చెందేలా ప్రార్థిస్తూ నిత్యం నీరు పోసి జాగ్రత్తపడతారు. అంకురాలను ఆరోపింపజేసే క్రతువు కాబట్టి దీనిని అంకురార్పణ అంటారు.`,
    relatedEventKeywords: ['Ankurarpanam', 'అంకురార్పణ']
  },
  {
    id: 'archana',
    term: 'Archana',
    termTe: 'అర్చనా',
    category: 'sevas',
    shortDesc: 'Recitation of 1008 divine names of Lord Venkateswara while offering fresh sacred Tulasi leaves at His lotus feet.',
    shortDescTe: 'శ్రీవారి 1008 దివ్య నామాలను చదువుతూ స్వామివారి శ్రీచరణాల వద్ద పవిత్ర తులసి దళాలను సమర్పించే నిత్య పూజ.',
    detailedMeaning: `Archana is the intimate offering of sacred Tulasi (holy basil) leaves at the lotus feet of the deity while chanting 1008 epithets praising His supreme attributes, compassion, and divine weapons.

Srivari Sahasranamarchana is performed daily in the sanctum during the early morning hours, following which the First Bell Naivedyam is offered.

The sacred Tulasi used during Archana is brought from the Sri Ananthalwan Gardens inside Tirumala.`,
    detailedMeaningTe: `శ్రీ వెంకటేశ్వర స్వామివారి దివ్య గుణాలు, కళ్యాణ లక్షణాలను కీర్తిస్తూ 1008 నామాలతో పవిత్ర తులసి దళాలను శ్రీచరణాల వద్ద ఉంచుతూ చేసే పవిత్ర అర్చనా సేవ.

తిరుమల ఆలయంలో ప్రతిరోజూ ఉదయాన్నే తోమాల సేవ అనంతరం ఈ సహస్రనామార్చన జరిగి, వెంటనే ప్రథమ నివేదన గంట మోగుతుంది.

ఈ అర్చన కోసం శ్రీ అనంతాళ్వాన్ తోటల నుండి పవిత్ర తులసి దళాలను సేకరిస్తారు.`,
    relatedEventKeywords: ['Archana', 'అర్చనా', 'Tulasi']
  },
  {
    id: 'aswa-vahana',
    term: 'Aswa Vahanam',
    termTe: 'అశ్వవాహనం',
    category: 'vahanas',
    shortDesc: 'Galloping Horse vehicle procession on the 8th night depicting Kalki Avatar, taming unruly souls and ruling all realms.',
    shortDescTe: 'బ్రహ్మోత్సవాలలో 8వ రోజు రాత్రి చతురంగ బలాల్లో శ్రేష్ఠమైన అశ్వవాహనంపై అదుపులేని పాపులను అదుపు చేసే కలికి అవతార సేవ.',
    detailedMeaning: `On the night of the eighth day, the Lord glides in grand procession upon the Aswa (Horse) Vahanam. Among the four arms of an army (Chaturanga Bala), horse power is paramount.

The purpose of this vehicle is to proclaim that at the end of Kali Yuga, Lord Srinivasa will arrive riding a white horse to punish evil and protect the righteous (Dushta Sikshana, Sishta Rakshana).

The Aswa Vahanam demonstrates that the Lord can tame and control unruly sinners and souls like wild unbridled horses. 'Aswa Vahanam' signifies that He alone is the Sovereign Lord of all nations and all cosmic worlds.`,
    detailedMeaningTe: `ఎనిమిదోరోజు రాత్రి అశ్వవాహనం మీద స్వామి ఊరేగుతాడు. చతురంగబలాల్లో అత్యంత ప్రధానమైంది అశ్వబలం. కలియుగాంతంలో శ్రీనివాసుడు అశ్వవాహనంమీద వచ్చి, దుష్టశిక్షణ, శిష్టరక్షణ చేస్తాడని చాటి చెప్పడమే దీని ఉద్దేశం.

అదుపు, ఆజ్ఞలేనిగుర్రాల లాంటి పాపుల్ని- జీవుల్ని అదుపులో పెట్టగలనని నిరూపించడానికే అశ్వవాహనం. అన్ని దేశాలకు, అన్నిలోకాలకు అధిపతిని నేనే అనే అర్థంలో 'అశ్వవాహనం'.`,
    relatedEventKeywords: ['Aswa', 'అశ్వవాహనం', 'Horse', 'Kalki']
  },
  {
    id: 'bhoga-srinivasa-vastram',
    term: 'Bhoga Srinivasa Pattu Vastram',
    termTe: 'భోగ శ్రీనివాసమూర్తి పట్టు వస్త్రం',
    category: 'timing_symbols',
    shortDesc: 'Sacred silk cloth adorned to Bhoga Srinivasa Murthy during the Sahasra Kalasabhishekam ritual.',
    shortDescTe: 'సహస్ర కలశాభిషేక క్రతువు సమయంలో భోగ శ్రీనివాసమూర్తికి ధరింపజేసే ప్రత్యేక పట్టు వస్త్రం.',
    detailedMeaning: `Bhoga Srinivasa Pattu Vastram is a specialized pure silk garment draped around the 1.5-foot silver idol of Bhoga Srinivasa Murthy.

This silk cloth is adorned exclusively during the weekly Sahasra Kalasabhishekam ritual conducted in the sanctum.

The vastram is woven with auspicious yellow and maroon borders symbolizing supreme royalty and purity.`,
    detailedMeaningTe: `భోగ శ్రీనివాసమూర్తి పట్టు వస్త్రం అనేది ఆలయంలోని 1.5 అడుగుల వెండి భోగ శ్రీనివాసమూర్తికి అలంకరించే పవిత్ర పట్టు వస్త్రం.

వారపు సేవగా జరిగే సహస్ర కలశాభిషేక సమయంలో ఈ పట్టు వస్త్రాన్ని అత్యంత భక్తితో స్వామివారికి ధరింపజేస్తారు.

ఈ వస్త్రం పసుపు, ఎరుపు రంగుల అంచులతో పవిత్రతకు నిదర్శనంగా ఉంటుంది.`,
    relatedEventKeywords: ['Bhoga Srinivasa', 'భోగ శ్రీనివాస', 'Vastram']
  },
  {
    id: 'brahmotsavam-origin',
    term: 'Brahmotsavam Origin & History',
    termTe: 'బ్రహ్మోత్సవం నేపథ్యం & చరిత్ర',
    category: 'utsavams',
    shortDesc: 'The flagship 9-day celestial festival originally founded by Lord Brahma as described in Bhavishyottara Purana.',
    shortDescTe: 'బ్రహ్మదేవునిచే స్వయంగా ప్రారంభించబడి భవిష్యోత్తర పురాణంలో వర్ణించబడిన 9 రోజుల మహా బ్రహ్మోత్సవ దివ్య చరిత్ర.',
    detailedMeaning: `Brahmotsavam derives its name from Sanskrit: "Brahma" (Creator) + "Utsavam" (Festival).

According to Bhavishyottara Purana, Lord Brahma first performed this grand celebration to express cosmic gratitude to Lord Venkateswara, who bound Himself by a divine boon to reside in the Saligrama idol at Ananda Nilayam till the end of Kali Yuga.

Lord Brahma lit two eternal lamps (Akhanda Jyothis) in the sanctum and commissioned King Thondaman and divine architect Viswakarma to build ornate Vahanas and chariots. Even today, an empty small wooden chariot called "Brahmaratham" moves right in front of Malayappa Swamy's procession, symbolizing Lord Brahma personally directing the festivities.`,
    detailedMeaningTe: `బ్రహ్మ మరియు ఉత్సవం అనే రెండు సంస్కృత పదాల కలయికే బ్రహ్మోత్సవం.

భవిష్యోత్తర పురాణం ప్రకారం తిరుమల ఆనంద నిలయంలో మూలవిరాట్‌గా వెలసిన శ్రీ వెంకటేశ్వర స్వామివారికి బ్రహ్మదేవుడే మొదటిసారిగా ఈ ఉత్సవాన్ని నిర్వహించాడు.

ఆనంద నిలయంలో బ్రహ్మదేవుడు వెలిగించిన రెండు అఖండ జ్యోతులు కలియుగాంతం వరకు వెలుగుతూనే ఉంటాయి. బ్రహ్మదేవుని ఆదేశం మేరకు తొండమాన్ చక్రవర్తి, విశ్వకర్మలు దివ్య వాహనాలను తయారీ చేశారు. ఇప్పటికీ ఉత్సవ ఊరేగింపుల ముందు "బ్రహ్మరథం" అనే చిన్న ఖాళీ రథం నడుస్తుంది, ఇందులో బ్రహ్మదేవుడు స్వయంగా ఉండి ఉత్సవాన్ని నడిపిస్తున్నాడని నమ్మకం.`,
    relatedEventKeywords: ['Brahmotsavam', 'బ్రహ్మోత్సవం', 'Brahma']
  },
  {
    id: 'chakra-snanam',
    term: 'Chakra Snanam',
    termTe: 'చక్రస్నానం',
    category: 'sevas',
    shortDesc: 'Grand finale holy dip of Sri Sudarshana Chakra in Swami Pushkarini waters on the 9th morning.',
    shortDescTe: 'బ్రహ్మోత్సవాల ముగింపు రోజున శ్రీ సుదర్శన చక్రత్తాళ్వార్ పుష్కరిణిలో ఆచరించే దివ్య స్నపన చక్రస్నాన ఘట్టం.',
    detailedMeaning: `On the 9th and final morning of Brahmotsavam, Lord Malayappa Swamy, Sridevi, Bhudevi, and Sri Sudarshana Chakra (the Lord's cosmic discus emblem) proceed to the north-west banks of Swami Pushkarini facing Sri Varaha Swami temple.

Snapana Tirumanjanam is conducted using milk, curd, honey, turmeric, and sandalwood.

At the precise auspicious Muhurtham, Sri Sudarshana Chakra is immersed into the Pushkarini waters while tens of thousands of ecstatic pilgrims take a holy dip simultaneously.`,
    detailedMeaningTe: `9 రోజుల బ్రహ్మోత్సవాల మహోన్నత ముగింపు ఘట్టం చక్రస్నానం.

9వ రోజు ఉదయం స్వామి, అమ్మవార్లు మరియు సుదర్శన చక్రత్తాళ్వార్లను స్వామి పుష్కరిణిలోని వరాహస్వామి ఆలయం ఎదురుగా ఉన్న వాయవ్య ఒడ్డుకు తీసుకెళ్తారు. అక్కడ స్నపన తిరుమంజనం ముగిసిన వెంటనే వేదాక్షతలతో సుదర్శన చక్రాన్ని పవిత్ర పుష్కరిణి నీటిలో ముంచుతారు.

ఆ సమయంలో లక్షలాది మంది భక్తులు పుష్కరిణిలో దివ్య స్నానం చేస్తారు.`,
    relatedEventKeywords: ['Chakra Snanam', 'చక్రస్నానం', 'Sudarshana']
  },
  {
    id: 'chandra-prabha',
    term: 'Chandra Prabha Vahanam',
    termTe: 'చంద్రప్రభ వాహనం',
    category: 'vahanas',
    shortDesc: 'Cooling Moon vehicle procession on the 7th night nourishing medicinal plants and governing the Moon.',
    shortDescTe: 'బ్రహ్మోత్సవాలలో 7వ రోజు రాత్రి శ్వేత వస్త్రాలు, మల్లె పూలమాలలతో చంద్రుని ఓషధి పోషణ తత్త్వాన్ని చాటుతూ స్వామివారి ఊరేగింపు.',
    detailedMeaning: `On the night of the seventh day, wearing pure white garments and white flower garlands, the Lord glides upon the Chandra Prabha Vahanam.

Through these twin solar and lunar vehicles, the Lord reveals that both the fiery intensity of the Sun and the soothing coolness of the Moon are His cosmic manifestations.

Chandra Prabha Vahanam signifies that God in the form of the Moon nourishes medicinal plants and flora (Oshadhis). Furthermore, another profound inner meaning is that He alone is the Supreme Sovereign who rules and governs even the Moon.`,
    detailedMeaningTe: `ఏడోరోజు రాత్రి తెల్లటివస్త్రాలు, పూమాలలు ధరించి, స్వామి చంద్రప్రభ వాహనంపై విహరిస్తారు. సూర్యుడి తీవ్రత, చంద్రుని శీతలత్వం రెండూ తన అంశ లేనని ఈ వాహనాల ద్వారా తెలియజేస్తాడు.

భగవంతుడు చంద్రుని రూపంలో ఓషధులను పోషిస్తున్నాడనే అర్థంలో చంద్రప్రభవాహనం. అంతేగాక చంద్రుణ్ణి కూడా శాసించేమూర్తి తానే అని చెప్పడం మరొక విశేషార్థం.`,
    relatedEventKeywords: ['Chandra Prabha', 'చంద్రప్రభవాహనం', 'Moon', 'Oshadhi']
  },
  {
    id: 'chinna-sesha',
    term: 'Chinna Sesha Vahanam',
    termTe: 'చిన్నశేషవాహనం',
    category: 'vahanas',
    shortDesc: 'Five-hooded Vasuki serpent vehicle procession on the 2nd morning of Brahmotsavam.',
    shortDescTe: 'బ్రహ్మోత్సవాల రెండో రోజు ఉదయం ఐదు శిరస్సుల వాసుకి సర్ప రూపమైన చిన్నశేషవాహనంపై స్వామివారు వేంచేసే సేవ.',
    detailedMeaning: `On the morning of the second day of Brahmotsavam, Lord Malayappa Swamy blesses devotees riding the Chinna Sesha Vahanam.

This vehicle features a five-hooded serpent representing Vasuki, the king of serpents used during the churning of the Milk Ocean (Samudra Manthan).

While Pedda Sesha signifies Adisesha, Chinna Sesha signifies Vasuki, teaching devotees to direct their Kundalini energy toward divine devotion.`,
    detailedMeaningTe: `రెండోరోజు ఉదయం స్వామి తన దేవేరులతో కలిసి ఐదుశిరస్సుల చిన్నశేషవాహనంపై దర్శనభాగ్యం కలిగిస్తారు.

పెద్దశేషవాహనం 'ఆదిశేషుడి'గానూ, చిన్నశేషవాహనం 'వాసుకి'గానూ భావించవచ్చు.`,
    relatedEventKeywords: ['Chinna Sesha', 'చిన్నశేషవాహనం', 'Vasuki']
  },
  {
    id: 'dhanurmasam-prasadam',
    term: 'Dhanurmasam Prasadam',
    termTe: 'ధనుర్మాస ప్రత్యేక ప్రసాదాలు',
    category: 'timing_symbols',
    shortDesc: 'Special winter Prasadam offerings including Jaggery Dosas, Kesari Bath, Bakala Bath, and Mavaaharam.',
    shortDescTe: 'ధనుర్మాసంలో స్వామివారికి సమర్పించే ప్రత్యేక జిల్లేడు బెల్లం దోశలు, కేసరి బాత్, బకాల బాత్ నైవేద్యాలు.',
    detailedMeaning: `Dhanurmasam Prasadam is a distinct set of culinary offerings prepared exclusively during the holy month of Dhanurmasam (December-January) when Suprabhatam is replaced by Tiruppavai recitation.

The special offerings during this month consist of Jaggery Dosas, Kesari Bath, Chakery Bath, Bakala Bath, and Mavaaharam.

These warm, rich offerings nourish the body and mind during the winter chill.`,
    detailedMeaningTe: `ధనుర్మాసంలో (డిసెంబర్-జనవరి) శ్రీవారి ఆలయంలో సమర్పించే నైవేద్యాలు మిగిలిన రోజుల కంటే భిన్నంగా ఉంటాయి. ఈ నెలలో సుప్రభాతం స్థానంలో తిరుప్పావై పఠనం జరుగుతుంది.

ఈ సమయంలో బెల్లం దోశలు, కేసరి బాత్, సక్కర బాత్, బకాల బాత్ మరియు మావాహారములను స్వామివారికి ప్రత్యేకంగా నివేదిస్తారు.

శీతాకాలంలో శ్రీవారికి అత్యంత ప్రీతికరంగా ఈ నివేదనలు ఉంటాయి.`,
    relatedEventKeywords: ['Dhanurmasam', 'ధనుర్మాసం', 'Prasadam']
  },
  {
    id: 'dosa-padi-molahora',
    term: 'Dosa Padi & Molahora Naivedyam',
    termTe: 'దోశ పడి & మోళహోర నైవేద్యం',
    category: 'timing_symbols',
    shortDesc: 'Special Tomala Seva culinary offerings consisting of Ghee Dosas and Pepper-Jeera Rice.',
    shortDescTe: 'తోమాల సేవ సమయంలో స్వామివారికి నివేదించే నెయ్యి దోశలు మరియు మిరియాల జీలకర్ర అన్న ప్రసాదం.',
    detailedMeaning: `Dosa Padi & Molahora are exclusive Naivedyams prepared for the Tomala Seva.

Dosa Padi consists of crispy ghee-rich dosas, while Molahora Anna Prasadam is prepared by mixing freshly ground black pepper, cumin seeds (jeera), salt, and pure cow ghee into fragrant cooked rice.

Along with Kadambam (multi-vegetable rice), these spicy and aromatic items form the special offerings of Tomala Seva.`,
    detailedMeaningTe: `దోశ పడి మరియు మోళహోర అన్న ప్రసాదాలు తోమాల సేవలో స్వామివారికి నివేదించే ప్రత్యేక పదార్థాలు.

దోశ పడి అనేది ఆవు నెయ్యితో చేసిన రుచికరమైన దోశలు కాగా, మోళహోర అనేది మిరియాలు, జీలకర్ర, ఉప్పు, నెయ్యితో కలిపి వండిన ప్రత్యేక అన్న ప్రసాదం.

కదంబంతో పాటు ఈ కారమైన పరిమళ భరిత నైవేద్యాలు తోమాల సేవ ప్రత్యేకం.`,
    relatedEventKeywords: ['Dosa Padi', 'Molahora', 'Tomala', 'Naivedyam']
  },
  {
    id: 'duppata-pattu-vastram',
    term: 'Duppata Pattu Vastram',
    termTe: 'దుప్పట పట్టు వస్త్రం',
    category: 'timing_symbols',
    shortDesc: 'New daily silk vastrams adorned to Lord Malayappa Swamy and consorts during Kalyanotsavam.',
    shortDescTe: 'ప్రతిరోజూ కల్యాణోత్సవంలో శ్రీ మలయప్ప స్వామివారికి మరియు అమ్మవార్లకు ధరింపజేసే నూతన పట్టు వస్త్రాలు.',
    detailedMeaning: `Duppata Pattu Vastram refers to the fresh silk vastrams adorned daily to processional deity Lord Malayappa Swamy during the Kalyanotsavam ceremony.

Simultaneously, vibrant new silk sarees (Pattu Sarees) are presented to Goddess Sridevi and Goddess Bhudevi.

These garments feature bright festive colors with intricate zari work.`,
    detailedMeaningTe: `దుప్పట పట్టు వస్త్రం అంటే నిత్య కల్యాణోత్సవం సమయంలో శ్రీమలయప్ప స్వామివారికి అలంకరించే నూతన పట్టు వస్త్రాలు.

అదే సమయంలో శ్రీదేవి, భూదేవి అమ్మవార్లకు కూడా కాంతివంతమైన పట్టు చీరలను సమర్పిస్తారు.

వివాహ శోభను రెట్టింపు చేసే దివ్య పట్టు వస్త్రాలు ఇవి.`,
    relatedEventKeywords: ['Duppata', 'Kalyanotsavam', 'Vastram']
  },
  {
    id: 'dwajarohanam-avarohanam',
    term: 'Dwajarohanam & Dwaja Avarohanam',
    termTe: 'ధ్వజారోహణం & ధ్వజావరోహణం',
    category: 'timing_symbols',
    shortDesc: 'Sacred flag hoisting and lowering ceremonies marking the official opening and closing of Brahmotsavams.',
    shortDescTe: 'బ్రహ్మోత్సవాల అధికారిక ప్రారంభ మరియు ముగింపులకు సూచికగా స్వర్ణ ధ్వజస్తంభంపై గరుడ పటాన్ని ఎగురవేసే, దించే క్రతువులు.',
    detailedMeaning: `Dwajarohanam takes place on the 1st day evening inside the temple at the Golden Dwajasthambam.

Prior to the ceremony, processional deities and parivara deities (Garuda, Anantha, Chakra, Vishwaksena) go in procession around Mada Streets. A sacred yellow flag bearing the image of Lord Garuda is hoisted amidst Vedic chants and drum beats.

Lord Garuda is believed to fly across cosmic realms to invite Devas, Dikpalakas, Rishis, Yakshas, and Gandharvas. On the 9th night, after Chakra Snanam, Dwaja Avarohanam is performed where the Garuda flag is lowered respectfully, signalling the conclusion of the festival.`,
    detailedMeaningTe: `బ్రహ్మోత్సవాలలో 1వ రోజు సాయంత్రం ఆలయంలోని స్వర్ణ ధ్వజస్తంభంపై గరుడ పటాన్ని ఎగురవేసే వేడుక ధ్వజారోహణం.

గరుత్మంతుడు ముప్పై మూడు కోట్ల దేవతలకు, దిక్పాలకులకు, ఋషులకు బ్రహ్మోత్సవ ఆహ్వానం అందిస్తాడని ప్రతీతి.

9వ రోజు రాత్రి చక్రస్నానం అనంతరం ధ్వజావరోహణం జరిపి గరుడ పటాన్ని పవిత్రంగా దించడంతో ఉత్సవాలు అధికారికంగా ముగుస్తాయి.`,
    relatedEventKeywords: ['Dwajarohanam', 'ధ్వజారోహణం', 'Dwaja Avarohanam']
  },
  {
    id: 'ekanta-seva-prasadam',
    term: 'Ekanta Seva Milk & Dry Fruits',
    termTe: 'ఏకాంత సేవ వేడి పాలు & ఎండు ఫలాలు',
    category: 'timing_symbols',
    shortDesc: 'The final night food offering consisting of hot cow milk and a mixture of fried dry fruits.',
    shortDescTe: 'రాత్రి ఏకాంత సేవలో స్వామివారికి సమర్పించే వేడి ఆవు పాలు మరియు వేయించిన ఎండు ఫలాల మిశ్రమం.',
    detailedMeaning: `Ekanta Seva Milk & Dry Fruits is the last Naivedyam offered to Lord Venkateswara during the night Ekanta Seva (Pavalimpu Seva).

Priests offer boiled cow milk flavored with cardamom and saffron, accompanied by a bowl of almond, cashew, and raisin dry fruits.

Following this offering, Mutyala Harati is conducted and temple doors are locked for the night.`,
    detailedMeaningTe: `ఏకాంత సేవ పాలు & ఎండు ఫలాలు అనేది రోజువారీ నిత్య సేవలలో స్వామివారికి సమర్పించే చివరి నైవేద్యం.

యాలకుల పరిమళంతో కూడిన వేడి ఆవు పాలు, నెయ్యిలో వేయించిన జీడిపప్పు, బాదం, ద్రాక్షలను స్వామివారికి నివేదిస్తారు.

ఈ నైవేద్యం అనంతరం ముత్యాల హారతి జరిపి ఆలయ బంగారు వాకిలి మూసివేస్తారు.`,
    relatedEventKeywords: ['Ekanta Seva', 'ఏకాంత సేవ', 'Milk', 'Prasadam']
  },
  {
    id: 'first-bell-naivedyam',
    term: 'First Bell Naivedyams',
    termTe: 'ప్రథమ నివేదన గంట నైవేద్యాలు',
    category: 'timing_symbols',
    shortDesc: 'Early morning large-quantity offerings including Pulihora, Pongali, Daddhyodanam, Laddus, and Vadas.',
    shortDescTe: 'ఉదయం సహస్రనామార్చన అనంతరం మొదటి గంట మోగినప్పుడు సమర్పించే పులిహోర, పొంగలి, దద్దోజనం, లడ్లు, వడలు.',
    detailedMeaning: `First Bell Naivedyams are offered inside Ananda Nilayam soon after the early morning Sahasranamarchana Seva.

When the massive temple bell rings, large covered brass vessels (Gangalam) are brought into the sanctum.

The offerings include Pulihora (yellow tamarind rice), Pongali (moong dal rice), Daddhyodanam (curd rice), Chakkera Pongali (sweet rice), along with Small & Big Laddus, Appams, and Vadas.`,
    detailedMeaningTe: `ప్రథమ నివేదన నైవేద్యాలు ఉదయం సహస్రనామార్చన ముగిసిన వెంటనే ఆనంద నిలయంలో సమర్పించబడతాయి.

మొదటి గంట మోగినప్పుడు పెద్ద గంగాల పాత్రలలో పవిత్ర ఆహారాన్ని గర్భాలయానికి తెస్తారు.

ఇందులో పులిహోర, పొంగలి, దద్దోజనం, చక్కెర పొంగలి, చిన్న పెద్ద లడ్లు, అప్పాలు మరియు వడలు ఉంటాయి.`,
    relatedEventKeywords: ['First Bell', 'ప్రథమ నివేదన', 'Pulihora', 'Pongali']
  },
  {
    id: 'gadwal-vastrams',
    term: 'Gadwal Jodu Eruvaada Vastrams',
    termTe: 'గద్వాల్ జోడు ఏరువాడ వస్త్రాలు',
    category: 'timing_symbols',
    shortDesc: '400-year-old royal tradition of presenting handwoven 11-yard cotton/silk dhotis from Gadwal on Brahmotsavam Day 1.',
    shortDescTe: '400 సంవత్సరాల సాంప్రదాయం ప్రకారం గద్వాల్ నేతకారులు తయారుచేసి బ్రహ్మోత్సవాల 1వ రోజు శ్రీవారికి సమర్పించే దివ్య వస్త్రాలు.',
    detailedMeaning: `Gadwal (Telangana) lies between the Krishna and Tungabhadra rivers ("Eru" = river, "Vaada" = delta). Four hundred years ago, during the reign of Raja Nala Somanadri of Gadwal Samsthanam, the king pledged to present sacred "Seshavastrams" to Lord Venkateswara on the 1st day of Brahmotsavams.

This tradition continues today into its tenth generation of weavers. Five master weavers work on a dedicated loom reserved exclusively for this divine task.

Each dhoti is 11 yards long, 2.5 yards wide, with a 15-inch border featuring eight Gadwal fort rampart motifs in white, maroon, and yellow. The weavers take no labor charges, only accepting raw material costs, and receive a returned Seshavastram as the Lord's royal blessing.`,
    detailedMeaningTe: `తెలంగాణలోని కృష్ణ-తుంగభద్ర నదుల నడుమ ఉన్న గద్వాల్ సంస్థానాధిపతి రాజా నల సోమనాద్రి 400 సంవత్సరాల క్రితం బ్రహ్మోత్సవాల మొదటి రోజు శ్రీవారికి పట్టు-నూలు వస్త్రాలు (జోడు ఏరువాడ) సమర్పించే సంప్రదాయాన్ని ప్రారంభించారు.

10 తరాలుగా గద్వాల్‌కు చెందిన 5 గురు నేతకారులు ప్రత్యేకం కేటాయించిన మగ్గంపై ఈ వస్త్రాలను తయారుచేస్తారు.

11 గజాల పొడవు, 15 అంగుళాల అంచుతో గద్వాల్ కోట బురుజుల నమూనాతో తెల్ల, ఎరుపు, పసుపు రంగులలో తయారుచేసే ఈ వస్త్రాలను శ్రీవారికి బ్రహ్మోత్సవాల తొలిరోజు ధరింపజేస్తారు.`,
    relatedEventKeywords: ['Gadwal', 'గద్వాల్', 'Eruvaada', 'Vastram']
  },
  {
    id: 'gadwal-yeeravada-cushion',
    term: 'Gadwal Yeeravada Head Cushion Cloth',
    termTe: 'గద్వాల్ ఈరవాడ శిరో వస్త్రం',
    category: 'timing_symbols',
    shortDesc: 'Special inner cloth draped as a protective cushion on the main deity’s head before placing the heavy Crown (Kireetam).',
    shortDescTe: 'మూలవిరాట్ కిరీటం సరిగ్గా అమరడానికి శిరస్సుకు దిండులా చుట్టే పవిత్ర గద్వాల్ వస్త్రం.',
    detailedMeaning: `Gadwal Yeeravada is a specialized inner cloth draped around the bare head of the Moola Virat (main deity) before placing the gold gem-studded Crown (Kireetam).

It acts as a comfortable cushion so that the heavy crown fits perfectly without shifting.

This historical cloth has been presented by Gadwal Samsthanam for centuries.`,
    detailedMeaningTe: `గద్వాల్ ఈరవాడ వస్త్రం అనేది మూలవిరాట్ స్వామివారి శిరస్సుపై బంగారు రత్నకిరీటం పెట్టడానికి ముందు చుట్టే ప్రత్యేక వస్త్రం.

కిరీటం సరిగ్గా అమరడానికి ఇది దిండులా ఉపయోగపడుతుంది.

ఈ వస్త్రాన్ని గద్వాల్ సంస్థానం ఎన్నో శతాబ్దాలుగా సమర్పిస్తోంది.`,
    relatedEventKeywords: ['Gadwal', 'Yeeravada', 'Kireetam', 'Crown']
  },
  {
    id: 'gaja-vahana',
    term: 'Gaja Vahanam',
    termTe: 'గజవాహనం',
    category: 'vahanas',
    shortDesc: 'Golden Elephant vehicle procession on the 6th night proclaiming refuge (Saranagati) and dispelling ego.',
    shortDescTe: 'బ్రహ్మోత్సవాల 6వ రోజు రాత్రి శరణు కోరినవారిని కాపాడతానని చాటుతూ స్వర్ణ ఏనుగు వాహనంపై స్వామివారి ఊరేగింపు.',
    detailedMeaning: `On the night of the sixth day, the Lord rides the Gaja (Elephant) Vahanam to proclaim that just as He rescued the elephant Gajendra in the Gajendra Moksham episode, He will surely protect anyone who seeks divine refuge (Saranagati).

Devotees believe that beholding the Lord mounted on the Elephant vehicle dispels even mountain-sized problems.

'Gajam' (the elephant) symbolizes ego. The human who subdues ego becomes worthy of worship, for ego surrenders before God transformed into 'Dasoham' (I am Your humble servant).`,
    detailedMeaningTe: `గజేంద్రమోక్షం ఘట్టంలో ఏనుగును కాపాడిన విధంగానే, శరణు కోరినవారిని కాపాడతానని చాటి చెప్పడానికి స్వామి ఆరోరోజు రాత్రి ఈ వాహనంపై ఊరేగుతాడు.

గజవాహనారూఢుడైన స్వామిని దర్శిస్తే ఏనుగంత సమస్యకూడా తొలగిపోతుందని భక్తుల విశ్వాసం.'గజం' అహంకారానికి ప్రతీక. అహంకారాన్ని అణచినమనిషి ఆరాధ్యు డవుతాడు. అహంకారం భగవంతునిదగ్గర 'దాసో౽ హం' మవుతుంది.`,
    relatedEventKeywords: ['Gaja', 'గజవాహనం', 'Elephant', 'Gajendra']
  },
  {
    id: 'garuda-seva',
    term: 'Garuda Vahanam (Garuda Seva)',
    termTe: 'గరుడవాహనం (గరుడ సేవ)',
    category: 'vahanas',
    shortDesc: 'The premier 5th night procession on Golden Garuda adorned with Makarakanti, Lakshmi Haram, and Srivilliputtur Goda Devi garlands.',
    shortDescTe: 'బ్రహ్మోత్సవాలలో 5వ రోజు రాత్రి మకరకంటి, లక్ష్మీహారం మరియు శ్రీవిల్లిపుత్తూరు ఆండాళ్ తులసిమాలలతో స్వర్ణ గరుడవాహనంపై స్వామివారి మహా పరాకాష్ఠ సేవ.',
    detailedMeaning: `On the night of the fifth day, the Lord rides upon His eternal servant, Lord Garutmanta. Lord Malayappa Swamy blesses devotees adorned with the sacred heritage jewels taken directly from the Moola Virat idol—Makarakanti, Lakshmi Haaram, and the Srivari Sahasranama Mala.

The fragrant Tulasi garland and new sacred umbrellas sent from Srivilliputtur by Goda Devi (Andal, who extolled Lord Venkateswara in numerous Tamil hymns) are specially adorned during Garuda Vahanam. This service proclaims the intimate eternal bond between the Lord and Garuda.

Riding upon the Golden Garuda under the shade of new temple umbrellas, with His hand in Varada Mudra granting boons, the procession along Mada Streets is a mesmerizing sight. This is the ultimate pinnacle of the Brahmotsavams. Garutmanta is a Nitya Suri—the Lord's servant, companion, vehicle, and flag emblem. There are no divine secrets of the Lord unknown to Garuda. In Sri Vaishnava tradition, Garuda is reverently hailed as 'Periya Tiruvadi'.`,
    detailedMeaningTe: `ఐదోరోజు రాత్రి తనకు నిత్యసేవకుడైన గరుత్మంతుడిమీద స్వామి ఊరేగుతాడు. స్వామి మూలమూర్తి మీద ఉన్న మకరకంటి, లక్ష్మీహారం, శ్రీవేంకటేశ్వర సహస్రనామమాల ధరించి, మలయప్పస్వామి భక్తులను అనుగ్రహిస్తాడు. శ్రీవేంకటేశ్వరస్వామిని అనేకవిధాల కొనియాడిన గోదాదేవి శ్రీవిల్లిపుత్తూరు నుంచి పంపే తులసిమాల, నూతనచ్ఛత్రాలను గరుడవాహనంలో అలంకరిస్తారు. గరుడుడితో స్వామికి గల అనుబంధాన్నికూడా ఈ సేవ చాటిచెబుతుంది.

కొత్తగొడుగులనీడలో, బంగారుగరుడునిపై వేంచేసి, వరదహస్తుడైన స్వామిని తిరువీధులలో ఊరేగించడం రమణీయమైన దృశ్యం. పదిరోజులు జరిగే బ్రహ్మోత్సవాలలో ఇది పరాకాష్ట. గరుత్మంతుడు నిత్యసూరి, స్వామికి దాసుడు, సఖుడు, వాహనం, పతాకచిహ్నం. గరుత్మంతునికి తెలియని స్వామి రహస్యాలు లేవు. గరుడుని 'పెరియతిరువడి' అనడం వైష్ణవసంప్రదాయం.`,
  },
  {
    id: 'garuda-panchami-puranam',
    term: 'Garuda Panchami & Garuda Puranam',
    termTe: 'గరుడ పంచమి & గరుడ పురాణం',
    category: 'utsavams',
    shortDesc: 'Birth anniversary of Lord Garuda on Sravana Suddha Panchami and the divine discourse of Garuda Puranam.',
    shortDescTe: 'శ్రావణశుద్ధపంచమి నాడు గరుత్మంతుని జయంతి గరుడ పంచమి మరియు శ్రీమహావిష్ణువు ఉపదేశించిన పవిత్ర గరుడ పురాణ మహత్యం.',
    detailedMeaning: `Sravana Suddha Panchami is the sacred birth anniversary of Lord Garutmanta (Garuda). Commemorating this, Garuda Panchami is celebrated annually. Scriptures affirm that worshipping Garuda liberates devotees from all afflictions and serpent doshas. Traditional elders advise that before sleeping at night, remembering the five divine protector figures—Sri Rama, Lord Subramanya, Lord Hanuman, Lord Garutmanta, and Bhima—eliminates nightmares.

At Tirumala, Garuda holds premier honor during Brahmotsavams. Marking the commencement of the festival, temple priests hoist the sacred flag bearing Garuda's emblem atop the golden flagpole during Dwajarohanam. Garuda flies across realms to invite the 33 crore Devas to the festival. Among all Vahana processions, Garuda Vahanam Seva is the most supreme, drawing lakhs of pilgrims to Tirumala. As servant, friend, fan, seat, abode, and flag emblem, Garuda dedicated his entire existence to Lord Hari. In Sri Vaishnava tradition, Garuda is reverently worshipped as a deity named 'Garudalwar'.

Garuda Puranam is one among the 18 Mahapuranas of Vedic literature. This scripture was directly imparted by Lord Maha Vishnu to His vehicle, Garutmanta, giving it the name 'Garuda Puranam'. It elaborates on various human sins, karmic consequences in hellish realms (Naraka), modes of atonement (Prayaschittam), paths to earn spiritual merit (Punya), and ancestor rituals (Pitru Karyas). Garuda Puranam profoundly highlights the imperative of leading a righteous life on Earth and enjoying its fruits.

(Source: TTD Sapthagiri Magazine, August 2026, Page 50)`,
    detailedMeaningTe: `శ్రావణశుద్ధపంచమి గరుత్మంతుడు పుట్టినరోజు. ఇందుకు ప్రతీకగా ఆ రోజున గరుడపంచమి జరుపుకోవటం ఆనవాయితీ. గరుత్మంతుడిని అర్చించిన వారికి సర్వబాధలనుంచి విముక్తి కలుగుతుందని శాస్త్రాలు చెబుతున్నాయి.

ప్రతి వ్యక్తి రాత్రి నిద్రపోయేముందు రాముడు, సుబ్రహ్మణ్యస్వామి, హనుమంతుడు, గరుత్మంతుడు, భీముడు- వీరిని తలుచుకుంటే దుస్స్వప్నాలు కలగవని పెద్దలు చెబుతారు.

తిరుమల కొండపై శ్రీవారికి జరిగే బ్రహ్మోత్సవాల్లో అగ్రతాంబూలం గరుత్మంతుడిదే. శ్రీవారి ఉత్సవాల ప్రారంభ సూచకంగా గరుత్మంతుడి చిత్రం ఉన్న పతాకాన్ని అర్చకస్వాములు ఎగురవేస్తారు. దీన్నే ధ్వజారోహణం అంటారు. ముక్కోటి దేవతల్ని ఉత్సవాలకు రావలసిందిగా గరుత్మంతుడు ఆహ్వానిస్తాడు. ఉత్సవాల్లో గరుడపతాకావిష్కరణకు ఎంతో ప్రాధాన్యత ఉంది. అలాగే, బ్రహ్మోత్సవ వాహన సేవల్లో గరుడవాహనసేవ ఎంతో ప్రత్యేకమైంది. ఈ ఉత్సవాన్ని చూడటానికి లక్షలాదిమంది భక్తులు కొండకు చేరుకుంటారు. దాసుడిగా, మిత్రుడిగా, విసన కర్రగా, ఆసనంగా, ఆవాసంగా, ధ్వజంగా ఇలా తన జీవితసర్వస్వాన్నీ శ్రీహరిసేవకు అంకితం చేసిన దాసోత్తముడు గరుత్మంతుడు. వైష్ణవసంప్రదాయంలో గరుత్మంతుని 'గరుడాళ్వార్' అనే పేరుతో దైవంగా కొలుస్తారు.

గరుడపురాణం అష్టాదశ పురాణాలలో ఒకటి. ఈ పురాణం శ్రీమహావిష్ణువు చేత అతని వాహనమైన గరుత్మంతుడికి ఉపదేశించబడింది. అందుకే ఈ పురాణానికి “గరుడపురాణం” అని పేరు వచ్చింది. మానవుడు చేసే विभिन्न పాపాలు, వాటికి నరకలోకంలో విధించే శిక్షలు, పాపాలకు ప్రాయశ్చిత్తం, పుణ్యం సంపాదించుకునేందుకు विभिन्न మార్గాలు, పితృకార్యాల వర్ణన ఈ పురాణంలో ఉంటుంది. ఇహలోకంలో ధర్మబద్ధమైన జీవితాన్ని గడపాల్సిన అవసరాన్ని, ధర్మబద్ధమైన జీవనఫలితాన్ని గరుడపురాణం ఎంతగానో ప్రకటిస్తుంది.

(ఆధారం: సప్తగిరి మాసపత్రిక, అగష్టు 2026, పేజీ 50)`,
    relatedEventKeywords: ['Garuda Panchami', 'గరుడ పంచమి', 'Garuda Puranam', 'గరుడ పురాణం']
  },
  {
    id: 'hamsa-vahana',
    term: 'Hamsa Vahanam',
    termTe: 'హంసవాహనం',
    category: 'vahanas',
    shortDesc: 'White Swan vehicle procession on the 2nd night depicting the Lord as Sharada Maata / Hamsa Avatar.',
    shortDescTe: 'బ్రహ్మోత్సవాలలో రెండో రోజు రాత్రి స్వామివారు శారదామాత రూపంలో హంసవాహనంపై ఊరేగే దివ్యజ్ఞాన సేవ.',
    detailedMeaning: `On the second night of Brahmotsavam, Lord Malayappa Swamy rides the Hamsa (Swan) Vahanam decorated in the divine attire of Sharada Maata (Goddess of Knowledge).

The swan possesses the unique discriminatory power (Ksheera-Neera Viveka) to separate pure milk from water, symbolizing supreme wisdom.

In spiritual philosophy, the liberated soul (Jiva) freed from worldly bondage is compared to a swan (Paramahamsa). Srinivasa riding as the Supreme Swan is a feast to the eyes. The word 'Hamsa' also signifies the pure temple of the human mind cleared of all darkness.

Lord Vishnu imparted Vedic wisdom in the form of Hamsa Avatar. Through this vehicle, the Lord proclaims to devotees to abandon worldly trivial desires and tread the path of Mukti toward the Eternal Paramatma.`,
    detailedMeaningTe: `రెండోరోజురాత్రి స్వామివారు శారదామాత రూపంలో హంసవాహనంపై ఊరేగుతారు. పాలు, నీళ్లు వేరు చేసినట్లే గుణాగుణవిచక్షణ జ్ఞానానికి సంకేతంగా ఈ వాహనం అధిరోహిస్తారు.

ఇహలోకబంధముక్తుడైన జీవునిఆత్మను హంసతో పోలుస్తారు. అలాంటి హంసపై పరమహంస అయిన శ్రీనివాసుడు ఊరేగడం నయనానందకరం. 'హంస' శబ్దానికి అంధకారాన్ని తొలగించి వెలుగునిచ్చే పరిశుద్ధమైన మనోమందిర మనికూర్డా అర్థం ఉంది.

పరమాత్మ వేదోపదేశాన్ని హంసరూపంలోనే చేసినందువల్ల తుచ్ఛమైన కోర్కెల అంధకారం వీడి శాశ్వతమైన పరబ్రహ్మ చెంతకు చేరే ముక్తిమార్గంవైపు నడవాలని ఈ వాహనం ద్వారా స్వామిభక్తులకు చాటుతారు.`,
    relatedEventKeywords: ['Hamsa', 'హంసవాహనం', 'Swan', 'Saraswati']
  },
  {
    id: 'hanumantha-vahana',
    term: 'Hanumantha Vahanam',
    termTe: 'హనుమంతవాహనం',
    category: 'vahanas',
    shortDesc: 'Procession on the 6th morning mounted on Lord Hanuman revealing that Rama, Krishna, and Venkateswara are one.',
    shortDescTe: 'బ్రహ్మోత్సవాలలో 6వ రోజు ఉదయం రాముడు, కృష్ణుడు, శ్రీవేంకటేశ్వరుడు అన్నీ తానేనని హనుమంతవాహనంపై స్వామివారి దివ్య ఊరేగింపు.',
    detailedMeaning: `This service takes place on the sixth day morning of Brahmotsavam. Mounted upon Lord Hanuman, who served Him with supreme devotion in Treta Yuga, the Lord moves in grand procession through the sacred temple streets.

Proclaiming the unblemished devotion of Hanuman, the Lord reveals through this vehicle that He alone is Sri Rama, Sri Krishna, and Lord Venkateswara.

The special purpose of the Lord riding Hanumantha Vahanam is to inspire devotees to cultivate pure devotion like Hanuman. A grand highlight of the evening is the Swarna Ratham (Golden Chariot) procession.`,
    detailedMeaningTe: `ఆరో రోజు జరిగేసేవ ఇది. త్రేతాయుగంలో తనకు సేవ చేసిన హనుమంతుణ్ణి వాహనంగా చేసుకుని స్వామి తిరువీధుల్లో ఊరేగింపుగా వెళతారు.

హనుమంతుని భక్తితత్పరతను చాటిచెబుతూ, రాముడు, కృష్ణుడు, శ్రీవేంకటేశ్వరుడు అన్నీ తానేనని ఈవాహనం ద్వారా స్వామి తెలియజేస్తారు. తన భక్తితత్పరతను చాటిన హనుమంతుడిద్వారా భక్తులు స్ఫూర్తి పొందడానికి వీలుగా హనుమంతవాహనంపై స్వామి ఊరేగడం ప్రత్యేకత. సాయంత్రం స్వర్ణరథసేవ జరగడం విశేషం.`,
    relatedEventKeywords: ['Hanumantha', 'హనుమంతవాహనం', 'Ramayana', 'Hanuman']
  },
  {
    id: 'kalpavriksha-vahana',
    term: 'Kalpavriksha Vahanam',
    termTe: 'కల్పవృక్ష వాహనం',
    category: 'vahanas',
    shortDesc: 'Wish-fulfilling celestial tree vehicle procession on the 4th morning granting ultimate Kaivalya salvation.',
    shortDescTe: 'బ్రహ్మోత్సవాలలో నాలుగో రోజు ఉదయం సకల ఆభరణాలంకృతుడై శాశ్వత కైవల్యాన్ని ప్రసాదించే కల్పవృక్ష వాహనంపై స్వామివారి ఊరేగింపు.',
    detailedMeaning: `On the morning of the fourth day of Brahmotsavam, Lord Venkateswara rides the Kalpavriksha Vahanam decorated with all exquisite ornaments.

The divine celestial Kalpavriksha grants boons only to those who ask for them. But Lord Venkateswaran of Venkatadri grants unasked blessings to His devotees.

While the celestial tree can only provide temporary material desires like food, clothing, and worldly wishes, Lord Venkateswara is the supreme Kalpa Vriksha who bestows eternal Kaivalya (Salvation / Moksha). On the fourth day morning, Venkanna glides along the temple streets in full divine splendor.`,
    detailedMeaningTe: `కల్పవృక్షం కోరినవారికి మాత్రమే వరా లిస్తుంది. తన భక్తులకు అడగకుండానే వరాలిచ్చే దేవాదేవుడు వేంకటాద్రివాసుడు. కల్పవృక్షం... అన్నం, వస్త్రాలు, కోర్కెలు మాత్రమే తీర్చగలదు. కానీ స్వామి శాశ్వతకైవల్యం ప్రసాదించే కల్పతరువు. నాలుగోరోజు ఉదయం ఈ వాహనంపై వెంకన్న సర్వాలంకారభూషితుడై ఊరేగుతాడు.`,
    relatedEventKeywords: ['Kalpavriksha', 'కల్పవృక్ష', 'Tree']
  },
  {
    id: 'kalyanotsavam',
    term: 'Kalyanotsavam',
    termTe: 'కల్యాణోత్సవం',
    category: 'sevas',
    shortDesc: 'Celestial wedding ceremony of Lord Venkateswara with Goddesses Sridevi and Bhudevi.',
    shortDescTe: 'శ్రీదేవి, భూదేవి అమ్మవార్లతో శ్రీ వెంకటేశ్వర స్వామివారికి ప్రతిరోజూ జరిపే పవిత్ర దివ్య కల్యాణ వేడుక.',
    detailedMeaning: `Kalyanotsavam is the formal celestial wedding ceremony performed daily in the Kalyanotsava Mandapam.

Priests conduct the wedding following Pancharatra Agama rites including Kanyadanam, Mangalya Dharana, Varmala exchange, and Akshatarohanam.

Lord Srinivasa instructed Lord Brahma and King Thondaman that His divine marriage should be celebrated thrice a day for world peace.`,
    detailedMeaningTe: `తిరుమల ఆలయంలో ప్రతిరోజూ వైభవంగా జరిగే స్వామివారి దివ్య వివాహ మహోత్సవం.

శ్రీదేవి, భూదేవి సమేత శ్రీమలయప్ప స్వామికి వైఖానస ఆగమ పద్ధతిలో కన్యాదానం, మాంగల్య ధారణ, అక్షతోత్సవాలతో ఈ వేడుక జరుగుతుంది.

ప్రపంచ శాంతికి శ్రీవారి కల్యాణం అత్యంత పవిత్రమైనది.`,
    relatedEventKeywords: ['Kalyanotsavam', 'కల్యాణోత్సవం', 'Wedding']
  },
  {
    id: 'kalyanotsavam-offerings',
    term: 'Kalyanotsavam Big Laddus & Vadas',
    termTe: 'కల్యాణోత్సవ పెద్ద లడ్లు & వడలు',
    category: 'timing_symbols',
    shortDesc: 'Large festive Laddus, Vadas, Appams, and Anna Prasadams offered during Kalyanotsavam.',
    shortDescTe: 'కల్యాణోత్సవ సేవలో నివేదించే పెద్ద లడ్లు, వడలు, అప్పాలు మరియు అన్న ప్రసాదాలు.',
    detailedMeaning: `Kalyanotsavam Offerings are special large-scale Naivedyams prepared exclusively for the celestial marriage ceremony.

These include massive Kalyanotsavam Laddus (weighing several hundred grams each), fried Vadas, sweet Appams, and various Anna Prasadams (rice dishes).

Devotees participating in Kalyanotsavam receive these blessed offerings as divine wedding Prasadam.`,
    detailedMeaningTe: `కల్యాణోత్సవ నైవేద్యాలు స్వామివారి దివ్య వివాహ మహోత్సవంలో నివేదించే విశేష ప్రసాదాలు.

ఇందులో భారీ పరిమాణంలో ఉండే కల్యాణోత్సవ లడ్లు, వడలు, అప్పాలు మరియు వివిధ రకాల అన్న ప్రసాదాలు ఉంటాయి.

ఈ సేవలో పాల్గొన్న భక్తులకు ఈ పవిత్ర ప్రసాదాలు అందించబడతాయి.`,
    relatedEventKeywords: ['Kalyanotsavam', 'Laddu', 'Vada', 'Prasadam']
  },
  {
    id: 'king-thondaman',
    term: 'King Thondaman Chakravarti',
    termTe: 'తొండమాన్ చక్రవర్తి',
    category: 'significant_people',
    shortDesc: 'Ancient ruler of Tondaimandalam summoned by Lord Brahma to construct the original Tirumala temple structures.',
    shortDescTe: 'బ్రహ్మదేవుని ఆదేశం మేరకు తిరుమల మొదటి ఆలయ ప్రాకారం, వాహనాలు నిర్మించిన పురాణ చక్రవర్తి.',
    detailedMeaning: `King Thondaman Chakravarti was an ancient ruler of Tondaimandalam and brother-in-law of King Akasa Raja (father of Goddess Padmavathi).

According to Bhavishyottara Purana, Lord Brahma summoned King Thondaman and introduced him to Viswakarma to construct the original temple mandapams, prakarams, processional chariots, and vahanas for Lord Venkateswara.

Thondaman also invited kings from all ancient kingdoms (Kashi, Kalinga, Kerala, Pandya, Chola, Kuru) to attend the first Srinivasotsavam.`,
    detailedMeaningTe: `భవిష్యోత్తర పురాణం ప్రకారం తొండమాన్ చక్రవర్తి తిరుమల మొదటి ఆలయ నిర్మాణకర్త.

బ్రహ్మదేవుని ఆజ్ఞ మేరకు విశ్వకర్మ సహాయంతో శ్రీవారికి వాహనాలు, రథాలు మరియు ఆలయ ప్రాకారాలను నిర్మించాడు.

మొదటి బ్రహ్మోత్సవాలకు కాశి, కళింగ, కేరళ, పాండ్య రాజులను ఆహ్వానించి సత్కరించాడు.`,
    relatedEventKeywords: ['Thondaman', 'తొండమాన్', 'King']
  },
  {
    id: 'koluvu-prasadam',
    term: 'Koluvu Sesame Jaggery Flour',
    termTe: 'కొలువు నువ్వుల బెల్లం పిండి నైవేద్యం',
    category: 'timing_symbols',
    shortDesc: 'Morning Koluvu ritual offering made of beaten sesame seeds mixed with pure jaggery.',
    shortDescTe: 'ఉదయాన్నే కొలువు సేవలో స్వామివారికి సమర్పించే నువ్వుల పిండి బెల్లం మిశ్రమ నైవేద్యం.',
    detailedMeaning: `Koluvu Sesame Jaggery Flour is the specific Naivedyam offered during the morning Koluvu ritual.

Prepared by fine grinding roasted sesame seeds and blending them with dark jaggery, this nutritious dish is offered to Koluvu Srinivasa Murthy while daily accounts and Panchangam details are reported.`,
    detailedMeaningTe: `కొలువు నువ్వుల పిండి నైవేద్యం ఉదయాన్నే జరిపే కొలువు సేవలో సమర్పించే ప్రత్యేక ప్రసాదం.

వేయించిన నువ్వుల పిండిని శుద్ధ బెల్లంతో కలిపి తయారుచేసే ఈ నైవేద్యాన్ని కొలువు శ్రీనివాసమూర్తికి నివేదిస్తారు.`,
    relatedEventKeywords: ['Koluvu', 'Sesame', 'Jaggery', 'Prasadam']
  },
  {
    id: 'koluvu-srinivasa-vastram',
    term: 'Koluvu Srinivasa Pattu Vastram',
    termTe: 'కొలువు శ్రీనివాసమూర్తి పట్టు వస్త్రం',
    category: 'timing_symbols',
    shortDesc: 'Silk cloth adorned to Koluvu Srinivasa Murthy on Sravana Nakshatra and Ekadasi days.',
    shortDescTe: 'శ్రావణ నక్షత్రం మరియు ఏకాదశి రోజుల్లో కొలువు శ్రీనివాసమూర్తికి ధరింపజేసే పట్టు వస్త్రం.',
    detailedMeaning: `Koluvu Srinivasa Pattu Vastram is a fine silk garment adorned to Koluvu Srinivasa Murthy (the Bali Bera deity).

This cloth is presented on special calendar days such as Sravana Nakshatra (the birth star of Lord Venkateswara) and Ekadasi days during morning Darbar.`,
    detailedMeaningTe: `కొలువు శ్రీనివాసమూర్తి పట్టు వస్త్రం అనేది దర్బార్‌లో వేంచేసే కొలువు శ్రీనివాసమూర్తికి అలంకరించే పట్టు వస్త్రం.

శ్రీవారి జన్మ నక్షత్రమైన శ్రావణ నక్షత్రం రోజు మరియు పవిత్ర ఏకాదశి దినాల్లో ఈ వస్త్రాన్ని సమర్పిస్తారు.`,
    relatedEventKeywords: ['Koluvu Srinivasa', 'Sravana', 'Ekadasi', 'Vastram']
  },
  {
    id: 'ksheerannam-prasadam',
    term: 'Ksheerannam Special Prasadam',
    termTe: 'క్షీరాన్నం విశేష నైవేద్యం',
    category: 'timing_symbols',
    shortDesc: 'Rich delicacy prepared by boiling rice in milk for hours, flavored with cardamom, saffron, and dry fruits.',
    shortDescTe: 'పాలు, బియ్యం, యాలకులు, కేసరి, ఎండు ఫలాలతో గంటల తరబడి వండి స్వామివారికి సమర్పించే దివ్య క్షీరాన్నం.',
    detailedMeaning: `Ksheerannam is a regal sweet Prasadam prepared during Pavitrotsavams, Brahmotsavams, and major temple festivals.

It is prepared by boiling high-quality rice in pure cow's milk for long hours until it thickens into a creamy texture, flavored with crushed cardamom, saffron strands, cashews, and raisins.`,
    detailedMeaningTe: `క్షీరాన్నం అనేది పవిత్రోత్సవాలు, బ్రహ్మోత్సవాల సమయంలో సమర్పించే మహోన్నత తీపి ప్రసాదం.

ఆవు పాలలో బియ్యాన్ని గంటల తరబడి సన్నని సెగపై ఉడికించి, యాలకులు, కేసరి, జీడిపప్పుతో తయారుచేసే ఈ నైవేద్యం అమృత తుల్యంగా ఉంటుంది.`,
    relatedEventKeywords: ['Ksheerannam', 'క్షీరాన్నం', 'Milk Rice', 'Prasadam']
  },
  {
    id: 'kuravarthanambi',
    term: 'Kuravarthanambi',
    termTe: 'కురువర్తనంబి',
    category: 'significant_people',
    shortDesc: 'Humble clay potter and supreme devotee in whose memory Curd Rice (Odu/Matrannam) is offered daily in Sanctum.',
    shortDescTe: 'శ్రీవారి పరమ భక్తుడైన కుమ్మరి దాసరి; ఆయన జ్ఞాపకార్థం ప్రతిరోజూ గర్భాలయంలో దద్దోజనం నివేదిస్తారు.',
    detailedMeaning: `Kuravarthanambi was a humble clay potter and ardent devotee of Lord Venkateswara who made wooden flowers to worship the Lord at home while making clay pots.

Pleased with his selfless devotion, Lord Srinivasa accepted his offerings above all royal gifts.

Even today, during the First Bell daily Naivedyam inside Ananda Nilayam, a special pot of curd rice called "Odu" or "Matrannam" is placed directly in front of the Moola Virat deity in memory of Kuravarthanambi.`,
    detailedMeaningTe: `కురువర్తనంబి తిరుమల చరిత్రలో ప్రసిద్ధి చెందిన కుమ్మరి భక్తుడు. ఇంట్లోనే మట్టితో పూలు తయారుచేసి శ్రీవారికి భక్తితో పూజించేవాడు.

ఆయన నిష్కామ భక్తికి మెచ్చి స్వామివారు రాజుల బంగారు పూల కంటే కురువర్తనంబి మట్టి పూలనే ప్రీతిగా స్వీకరించారు.

ఆయన జ్ఞాపకార్థం ప్రతిరోజూ ప్రథమ నివేదన సమయంలో గర్భాలయంలో మూలవిరాట్ ఎదుట "ఓడు" లేదా "మాత్రాన్నం" అనే పెరుగు అన్నాన్ని నివేదిస్తారు.`,
    relatedEventKeywords: ['Kuravarthanambi', 'కురువర్తనంబి', 'Matrannam']
  },
  {
    id: 'melchat-vastram',
    term: 'Melchat Vastram',
    termTe: 'మేల్చాట్ పట్టు వస్త్రం',
    category: 'timing_symbols',
    shortDesc: 'New silk vastram draped around Moola Virat’s body and head every Friday immediately after Abhishekam.',
    shortDescTe: 'ప్రతి శుక్రవారం మూలవిరాట్ అభిషేకం ముగిసిన వెంటనే స్వామివారి శరీరానికి, శిరస్సుకు అలంకరించే పట్టు వస్త్రం.',
    detailedMeaning: `Melchat Vastram is a brand new silk garment adorned to the main deity (Moola Virat Lord Venkateswara) every Friday immediately following Abhishekam.

These silk vastrams are donated by ardent devotees during Friday Abhishekam. They come in bright colors like yellow, green, orange, or white with contrasting borders.

One silk vastram is draped beautifully around the Lord's body and shoulders, while another matching vastram covers the Lord's head tightly before the crown is placed.`,
    detailedMeaningTe: `మేల్చాట్ వస్త్రం అనేది ప్రతి శుక్రవారం అభిషేకం ముగిసిన వెంటనే మూలవిరాట్ స్వామివారికి అలంకరించే నూతన పట్టు వస్త్రం.

భక్తులు అభిషేకం సమయంలో సమర్పించే ఈ వస్త్రాలు పసుపు, పచ్చ, నారింజ, తెల్ల రంగులలో ఆకర్షణీయమైన అంచులతో ఉంటాయి.

ఒక పట్టు వస్త్రాన్ని స్వామివారి శరీరానికి అలంకరిస్తే, మరొక వస్త్రాన్ని శిరస్సుకు దివ్యంగా చుడతారు.`,
    relatedEventKeywords: ['Melchat', 'మేల్చాట్', 'Abhishekam', 'Vastram']
  },
  {
    id: 'mohini-avataram',
    term: 'Mohini Avataram',
    termTe: 'మోహిని అవతారం',
    category: 'vahanas',
    shortDesc: 'Procession on the 5th morning depicting the Lord as celestial beauty Mohini starting directly from inside Srivari Temple on a Palanquin.',
    shortDescTe: 'బ్రహ్మోత్సవాలలో అత్యంత ప్రధానమైన 5వ రోజు ఉదయం పల్లకీపై శ్రీవారి ఆలయం నుంచే ప్రారంభమయ్యే జగన్మోహిని అవతార పవిత్ర సేవ.',
    detailedMeaning: `On the morning of the fifth day, which is of paramount importance, the Lord manifests in the alluring Mohini Avataram. While all other Vahana processions begin from the Vahana Mandapam, the Mohini Avataram procession uniquely commences on a palanquin (Pallaki) directly from inside Srivari Temple.

This is the avatar that enchanted even Lord Shiva and ensured that the nectar (Amrutam) emerged from the churning of the Milk Ocean was secured exclusively for the Devas. Lord Srinivasa glides through the temple streets in the form of Jaganmohini to proclaim to the world how divine grace can be attained through noble deeds.

Uniquely, the processional deity appears seated rather than in the customary standing posture. Adorning the Lord with all feminine ornaments is a special feature. While the Lord's right hand usually features the Varada Mudra, in Mohini Alankaram it uniquely displays the Abhaya Hasta Mudra. The Lord is bedecked in a fine silk saree, a gem-encrusted Surya-Chandra Saaveri jewel atop the crown, a diamond-studded nose pin (Mukkupudaka) and Bulaki on the nose, and in place of the Shankha and Chakra, two fully bloomed golden lotuses are adorned in His hands.`,
    detailedMeaningTe: `అత్యంత ప్రధానమైన ఐదవరోజు ఉదయం మోహినీఅవతారంలో స్వామి సాక్షాత్కరిస్తాడు. అన్ని వాహనసేవలూ వాహనమండపం నుంచి ప్రారంభమైతే, మోహినీఅవతారం మాత్రం శ్రీవారిఆలయంలో నుంచే పల్లకిపై ప్రారంభమౌతుంది. పరమశివుడినిసైతం సమోహనపరచి, క్షీరసాగరమథనంనుంచి వెలువడిన అమృతాన్ని దేవతలకు మాత్రమే దక్కేలా చేసిన అవతారమిది. మంచిపనులు చేయడం ద్వారా అనుగ్రహం ఎలా పొందవచ్చో లోకానికి చాటడానికే శ్రీవారు జగన్మోహిని రూపంలో తిరువీధుల్లో విహరిస్తారు.

ఉత్సవమూర్తి మామూలుగా నిలబడే భంగిమలో కాకుండా ఆసీనులైన భంగిమలో కనిపించడం విశేషం. స్త్రీలు ధరించే అన్ని ఆభరణాలతో స్వామివారిని అలంకరించడం ఒక ప్రత్యేకత. సాధారణంగా వరదభంగిమలో కనిపించే స్వామి వారికుడిహస్తం మోహినీఅలకరణలో అభయహస్తముద్రతో ఉండడం ఒక ప్రత్యేకత. స్వామివారికి పట్టుచీర, కిరీటంపైన రత్నఖచితమైన సూర్యచంద్రసావేరి, నాసికకు వజ్రఖచితమైన ముక్కుపుడక, బులాకి, శంఖచక్రాల స్థానంలో రెండు వికసించిన స్వర్ణకమలాలను అలంకరిస్తారు.`,
    relatedEventKeywords: ['Mohini', 'మోహిని', 'Palanquin', 'Pallaki']
  },
  {
    id: 'mutyala-harati',
    term: 'Mutyala Harati',
    termTe: 'ముత్యాల హారతి',
    category: 'significant_people',
    shortDesc: 'The final night camphor Harati offered in a pearl-filled silver plate before temple doors close for Ekanta Seva.',
    shortDescTe: 'రాత్రి ఏకాంత సేవలో ఆలయ ద్వారాలు మూసే ముందు ముత్యాల పళ్లెంలో సమర్పించే చివరి దివ్య కర్పూర హారతి.',
    detailedMeaning: `Mutyala Harati is the final service offered to Lord Venkateswara each night before the temple doors are closed.

Sannidhi Golla prepares the bed and lights oil lamps. The Lord is gently rocked on a golden swing while a descendant of saint-poet Annamacharya sings a lullaby.

Simultaneously, a descendant of saint-poetess Tarigonda Vengamamba offers camphor "Nirajanam" in a silver plate filled with natural pearls. Tarigonda Vengamamba was a legendary saint who settled in Tirumala and spent her life in ecstatic service to Lord Srinivasa.`,
    detailedMeaningTe: `రాత్రి ఏకాంత సేవలో స్వామివారికి జరిగే ముగింపు పవిత్ర సేవ ముత్యాల హారతి.

సన్నిధి గొల్లా పక్కపరచి దివ్య దీపాలు వెలిగిస్తారు. అద్దాల మంటపంలో సువర్ణ ఉయ్యాలపై స్వామివారిని ఊపుతూ అన్నమయ్య వంశస్థులు జోలపాట పాడుతారు.

అదే సమయంలో తరిగొండ వెంగమాంబ వంశస్థులు ముత్యాలు నింపిన వెండి పళ్లెంలో కర్పూర నీరాజనం సమర్పిస్తారు. ఈ హారతి సమర్పించిన వెంటనే ఆలయ బంగారు వాకిలి మూసివేస్తారు.`,
    relatedEventKeywords: ['Mutyala Harati', 'ముత్యాల హారతి', 'Vengamamba']
  },
  {
    id: 'mutyapu-pandiri',
    term: 'Mutyapu Pandiri Vahanam',
    termTe: 'ముత్యపుపందిరి వాహనం',
    category: 'vahanas',
    shortDesc: 'Canopy of pure white pearls procession on the 3rd night featuring the Lord as Bala Krishna who slayed Bakasura.',
    shortDescTe: 'బ్రహ్మోత్సవాలలో మూడో రోజు రాత్రి బకాసుర సంహార బాలకృష్ణుని అవతారంలో ముత్యాల పందిరి కింద స్వామివారు ఉభయనాంచారులతో ఊరేగే దివ్య సేవ.',
    detailedMeaning: `On the third night of Brahmotsavam, the tender and delicate procession known as Mutyapu Pandiri Vahanam is offered to the Lord.

Through this vehicle, the Lord proclaims to the world that to attain liberation (Mukti), one's mind must become as pure and immaculate as a pearl.

Dressed in the Avatar form of Bala Krishna who slayed the demon Bakasura, Lord Malayappa Swamy along with His two consorts (Sridevi and Bhudevi) moves along the sacred temple streets. This divine service is reverently called Mutyapundal or Mutyapu Pandiri Vahanam.`,
    detailedMeaningTe: `మూడోరోజురాత్రి స్వామికి జరిగే సుకుమారసేవగా ముత్యపుపందిరి వాహనాన్ని చెప్పవచ్చు. ముక్తిసాధనకు ముత్యం లాంటి స్వచ్ఛమైన మనసు కావాలని ఈ వాహనంద్వారా స్వామి చాటిచెబుతారు.

బకాసురుని వధించిన బాలకృష్ణుని అవతారరూపంలో ఈ వాహనంమీద మలయప్ప స్వామి ఉభయనాంచారులతో తిరువీధులలో సంచరిస్తారు. ఈ వాహనసేవను ముత్యపందల్, ముత్యపుపందిరి అని అంటారు.`,
    relatedEventKeywords: ['Mutyapu Pandiri', 'ముత్యపుపందిరి', 'Pearl']
  },
  {
    id: 'niluvu-dopidi',
    term: 'Niluvu Dopidi',
    termTe: 'నిలువుదోపిడి',
    category: 'timing_symbols',
    shortDesc: 'Supreme ritual of total self-surrender where devotees offer all worn gold ornaments and locks of hair into Srivari Hundi.',
    shortDescTe: 'భక్తులు తమ ఒంటిపై ఉన్న సమస్త బంగారం, ఆభరణాలు మరియు తలనీలాలను స్వామి హుండీలో సమర్పించే పరమ శరణాగతి మొక్క.',
    detailedMeaning: `Niluvu Dopidi is the ultimate vow of unconditional self-surrender to Lord Venkateswara.

Devotees offering Niluvu Dopidi systematically unbag and surrender every piece of gold jewelry, cash, and valuables worn on their body directly into the sacred Hundi.

Prior to offering Niluvu Dopidi, devotees must undergo Kesakhandanam (shaving of hair). Surrendering wealth and physical beauty at the feet of the Lord symbolizes shedding all material pride (Dhana Garvam) and physical vanity (Saundarya Garvam).`,
    detailedMeaningTe: `నిలువుదోపిడి మొక్కుకున్నవారు మొక్కుకున్న సమయంలో ధరించి ఉన్న ఆభరణాలన్నీ స్వామివారి హుండీలో క్రమక్రమంగా ఊడగట్టి వేసి, పసుపుకొమ్ము కట్టిన పసుపు తాడును ధరించి వెనుతిరిగి వచ్చే అత్యంత పవిత్రమైన సేవ.

నిలువుదోపిడి ఇచ్చేవారు ముందుగా కేశఖండనం చేయించుకోవాలి. పూర్వం స్త్రీపురుషులిద్దరూ కేశాల్ని పెంచుకునేవారు. స్త్రీలు కురులతో ఎంతో అందంగా అలంకరించుకుని, కేశదానంలో అత్యంత శ్రద్ధ వహిస్తారు. తలనీలాలు తీయించుకోకుండా నిలువుదోపిడి ఇవ్వడం శాస్త్రసమ్మతం కాదు.

భగవంతుడి సమక్షంలో సొమ్మునూ, అందం తెచ్చే జుట్టునీ వదులుకోవడమే నిలువుదోపిడి. ధనగర్వం, సౌందర్యగర్వం మటమాయమయ్యే శరణాగతి మార్గం ఇది.`,
    relatedEventKeywords: ['Niluvu Dopidi', 'నిలువుదోపిడి', 'Hundi']
  },
  {
    id: 'odu-matrannam',
    term: 'Odu / Matrannam Curd Rice',
    termTe: 'ఓడు / మాత్రాన్నం నైవేద్యం',
    category: 'timing_symbols',
    shortDesc: 'Special curd rice offered inside Ananda Nilayam sanctum in memory of Kuravarthanambi.',
    shortDescTe: 'కురువర్తనంబి జ్ఞాపకార్థం ప్రథమ నివేదన గంట సమయంలో మూలవిరాట్ ఎదుట నివేదించే పెరుగు అన్నం.',
    detailedMeaning: `Odu or Matrannam is a specific pot of curd rice offered to Dhruva Bera (Moola Virat) inside the Sanctum Sanctorum during the First Bell Naivedyam.

This offering commemorates Kuravarthanambi, a humble pot-maker and staunch devotee of Lord Venkateswara in Pauranic times whom Lord Srinivasa blessed.`,
    detailedMeaningTe: `ఓడు లేదా మాత్రాన్నం అనేది ప్రథమ నివేదన గంట సమయంలో గర్భాలయంలో మూలవిరాట్ ఎదుట ఉంచే ప్రత్యేక పెరుగు అన్నం.

పౌరాణిక కాలంలో స్వామివారి పరమ భక్తుడైన కుమ్మరి దాసరి కురువర్తనంబి నిష్కామ భక్తికి నిదర్శనంగా ఈ నైవేద్యాన్ని నివేదిస్తారు.`,
    relatedEventKeywords: ['Odu', 'Matrannam', 'Kuravarthanambi', 'Curd Rice']
  },
  {
    id: 'pancha-beras',
    term: 'Pancha Beras (Five Deities of Tirumala)',
    termTe: 'తిరుమల పంచబేరాలు',
    category: 'timing_symbols',
    shortDesc: 'The five sacred forms of Lord Venkateswara inside the Tirumala temple representing specific cosmic roles.',
    shortDescTe: 'తిరుమల ఆలయంలో నిర్దిష్ట నిత్య సేవలను, పూజలను అందుకోనే శ్రీవారి ఐదు ప్రధాన దివ్య మూర్తులు.',
    detailedMeaning: `In accordance with Vaikhanasa Agama, Lord Venkateswara presides inside the temple in five sacred divine forms (Pancha Beras):

1) Dhruva Bera (Moola Virat): The permanent self-manifested Saligrama idol in Ananda Nilayam;

2) Bhoga Srinivasa (Kautuka Bera): 1.5-foot silver idol presented by Pallava Queen Samavayi in 960 AD, receives daily Abhishekam and Ekanta Seva;

3) Malayappa Swamy (Utsava Bera): Processional deity discovered in Malayappa Kona along with Sridevi and Bhudevi, riding all festival Vahanams;

4) Ugra Srinivasa (Snapana Bera): Wrathful form brought out only once a year on Kaishika Dwadasi before sunrise;

5) Koluvu Srinivasa / Lekhaka (Bali Bera): Seated daily in Darbar to listen to Panchanga Sravanam and audit temple revenues.`,
    detailedMeaningTe: `వైఖానస ఆగమం ప్రకారం తిరుమల ఆలయంలో స్వామివారు ఐదు దివ్య రూపాల్లో (పంచబేరాలు) పూజలందుకుంటున్నారు:

1) ధ్రువబేరం (మూలవిరాట్): ఆనంద నిలయంలోని స్వయంవ్యక్త సాలిగ్రామ దివ్య మూర్తి;

2) భోగ శ్రీనివాసమూర్తి: సా.శ. 960లో పల్లవ రాణి సామవాయి సమర్పించిన వెండి మూర్తి, నిత్య అభిషేకం అందుకుంటుంది;

3) మలయప్ప స్వామి (ఉత్సవబేరం): శ్రీదేవి, భూదేవి సమేతంగా మలయప్ప కోనలో లభించిన మూర్తి, బ్రహ్మోత్సవ వాహనాలపై ఊరేగుతారు;

4) ఉగ్ర శ్రీనివాసమూర్తి: కార్తీక కైశిక ద్వాదశి నాడు సూర్యోదయానికి ముందే ఊరేగే మూర్తి;

5) కొలువు శ్రీనివాసమూర్తి: ప్రతిరోజూ దర్బార్‌లో పంచాంగ శ్రవణం, ఆదాయ లెక్కలు వినే మూర్తి.`,
    relatedEventKeywords: ['Pancha Beras', 'పంచబేరాలు', 'Malayappa']
  },
  {
    id: 'panchakam-pancha-kacchayam',
    term: 'Pancha Kacchayam Offering',
    termTe: 'పంచకజ్జాయం ప్రత్యేక నైవేద్యం',
    category: 'timing_symbols',
    shortDesc: 'Special Sahasra Deepalankara Seva offering made of sugar, cashew nuts, and cardamom.',
    shortDescTe: 'సహస్ర దీపాలంకార సేవ సమయంలో స్వామివారికి సమర్పించే పంచదార, జీడిపప్పు, యాలుకల మిశ్రమ నైవేద్యం.',
    detailedMeaning: `Pancha Kacchayam is a sweet Prasadam prepared specifically for Sahasra Deepalankara Seva (1000 Lamp Lighting Service) conducted in the evening.

It is made of pure sugar, broken cashew nuts, dried coconut, and crushed cardamom.`,
    detailedMeaningTe: `పంచకజ్జాయం అనేది సాయంత్రం వేళ జరిగే సహస్ర దీపాలంకార సేవలో సమర్పించే తీపి ప్రసాదం.

పంచదార, జీడిపప్పు, యాలకులు, కొబ్బరి మిశ్రమంతో దీనిని తయారుచేస్తారు.`,
    relatedEventKeywords: ['Pancha Kacchayam', 'Deepalankara', 'Prasadam']
  },
  {
    id: 'panchangam',
    term: 'Panchangam',
    termTe: 'పంచాంగం',
    category: 'timing_symbols',
    shortDesc: 'Traditional Vedic astronomical almanac detailing Tithi, Vara, Nakshatra, Yoga, and Karana.',
    shortDescTe: 'తిథి, వార, నక్షత్ర, యోగ, కరణాలు అనే 5 అంశాలతో కూడిన పంచాంగ వివరాలను కొలువు శ్రీనివాసునికి చదివి వినిపించే క్రతువు.',
    detailedMeaning: `Panchangam ("Five Limbs") is the sacred astronomical almanac used by temple priests to calculate auspicious muhurthams for daily rituals, festival dates, and planetary transits.

Every morning during Koluvu Seva, priests recite the day's Panchangam before Koluvu Srinivasa (Lekhaka) in the sanctum.`,
    detailedMeaningTe: `హిందూ కాలమానంలో తిథి, వార, నక్షత్ర, యోగ, కరణాలు అనే ఐదు అంగాల కలయికే పంచాంగం.

తిరుమల ఆలయంలో ప్రతిరోజూ ఉదయం కొలువు సేవలో పండితులు కొలువు శ్రీనివాసమూర్తికి ఆ రోజు పంచాంగ వివరాలను చదివి వినిపిస్తారు.`,
    relatedEventKeywords: ['Panchangam', 'పంచాంగం', 'Almanac']
  },
  {
    id: 'pavithrotsavam',
    term: 'Pavithrotsavam',
    termTe: 'పవిత్రోత్సవం',
    category: 'utsavams',
    shortDesc: 'Purification festival conducted to cleanse any unwitting ritual lapses (Doshas) over the year.',
    shortDescTe: 'సంవత్సరంలో తెలిసీ తెలియక జరిగే అర్చనా లోపాలను, దోషాలను నివారించే పవిత్ర ఉత్సవం.',
    detailedMeaning: `Pavithrotsavam is a 3 to 4 day annual purification festival performed to expiate any errors, omissions, or unintentional lapses in rituals conducted by priests, temple staff, or pilgrims throughout the year.

Special Pavithra silk threads (garlands of woven silk) are consecrated and placed around the neck of the presiding deity, processional idols, vimanam, and temple altars to restore pristine sanctity.`,
    detailedMeaningTe: `ఆలయంలో ఏడాది పొడవునా జరిగే అర్చనలు, ఉత్సవాల్లో తెలిసీ తెలియక పొరపాట్లు జరిగి ఉంటే వాటి వల్ల కలిగే దోష పరిహారార్థం జరిపే పవిత్ర ప్రక్షాళన ఉత్సవమే పవిత్రోత్సవం.

స్వామివారి మూలవిరాట్, ఉత్సవమూర్తులు మరియు ఆలయ విమాన గోపురాలకు పవిత్ర పట్టు దారాల (పవిత్రాలు) ధారణ జరిపి దోషాలను నివారిస్తారు.`,
    relatedEventKeywords: ['Pavithrotsavam', 'పవిత్రోత్సవం', 'Purification']
  },
  {
    id: 'pedda-sesha',
    term: 'Pedda Sesha Vahanam',
    termTe: 'పెద్దశేషవాహనం',
    category: 'vahanas',
    shortDesc: 'Seven-hooded Adisesha serpent vehicle procession on the 1st night of Brahmotsavam.',
    shortDescTe: 'బ్రహ్మోత్సవాలలో మొదటి రోజు రాత్రి ఏడు శిరస్సుల ఆదిశేషునిపై శ్రీదేవి భూదేవి సమేత శ్రీవారి దివ్య ఊరేగింపు.',
    detailedMeaning: `On the night of Dwajarohanam (Day 1 of Brahmotsavam), Lord Venkateswara, decorated with all exquisite jewels alongside Sridevi and Bhudevi, glides in grand procession through the four Mada Streets of Tirumala on the Seven-Hooded Pedda Sesha Vahanam.

Since the Lord resides on Seshachalam hills, sleeps on Adisesha as His serpent bed, and wears Seshavastram, Adisesha is granted the prime honor of carrying the Lord on the very first night of Brahmotsavam.

Pedda Sesha Vahanam represents Adisesha—the primordial serpent king who embodies total devotion and service to Lord Sriman Narayana.`,
    detailedMeaningTe: `ధ్వజారోహణం అయిన రోజు రాత్రి స్వామివారు... శ్రీదేవి, భూదేవి సమేతంగా సర్వాలంకారభూషితుడై తిరుమల ఆలయ నాలుగుమాడవీధుల్లో ఊరేగుతారు.

స్వామివారు కొలువు తీరింది శేషాద్రి, ధరించేది శేషవస్త్రం. ఆయన పానుపు శేషుడు. అందుకే ఉత్సవాల్లో శేషుడికి అత్యంతప్రాధాన్యతనిస్తూ తొలి రోజు ఆ వాహనం మీదే ఊరేగుతారు.

పెద్దశేషవాహనం 'ఆదిశేషుడి'గానూ భావించవచ్చు.`,
    relatedEventKeywords: ['Pedda Sesha', 'పెద్దశేషవాహనం', 'Adisesha']
  },
  {id: 'peethaambaram',
    term: 'Peethaambaram Gold Cloth',
    termTe: 'పీతాంబరం స్వర్ణ వస్త్రం',
    category: 'timing_symbols',
    shortDesc: 'Shining gold-plated silk Peethaambaram draped around the main deity’s waist on special Asthanam occasions.',
    shortDescTe: 'యుగాది ఆస్థానం, దీపావళి ఆస్థానం దినాలలో మూలవిరాట్ నడుముకు చుట్టే పవిత్ర స్వర్ణ పీతాంబరం.',
    detailedMeaning: `Peethaambaram is a famous shining gold-plated silk garment draped around the waist of Moola Virat Lord Venkateswara.

In Tirumala temple, this regal cloth is adorned on major festival occasions such as Ugadi Asthanam and Deepavali Asthanam.`,
    detailedMeaningTe: `పీతాంబరం అనేది మూలవిరాట్ శ్రీ వెంకటేశ్వర స్వామివారి నడుముకు అలంకరించే ప్రసిద్ధ స్వర్ణ పట్టు వస్త్రం.

తిరుమల ఆలయంలో యుగాది ఆస్థానం, దీపావళి ఆస్థానం వంటి విశేష పండుగ రోజుల్లో ఈ రాజసపు వస్త్రాన్ని సమర్పిస్తారు.`,
    relatedEventKeywords: ['Peethaambaram', 'పీతాంబరం', 'Gold Cloth']
  },
  {
    id: 'pushpa-yagam',
    term: 'Pushpa Yagam',
    termTe: 'పుష్పయాగం',
    category: 'sevas',
    shortDesc: 'Spectacular floral bath ritual showering metric tons of fragrant fresh flowers on the deities.',
    shortDescTe: 'బ్రహ్మోత్సవాల అనంతరం టన్నుల కొద్దీ పరిమళ పుష్పములతో స్వామివారికి నిర్వహించే మహోన్నత పుష్పార్చన.',
    detailedMeaning: `Pushpa Yagam is conducted immediately following Brahmotsavams or Pavithrotsavams to relieve the deity of festival fatigue.

Tons of fragrant flowers (Jasmines, Roses, Marigolds, Tulasi, Lotuses) brought from various states are poured over Lord Malayappa Swamy, Sridevi, and Bhudevi in an overwhelming floral shower.`,
    detailedMeaningTe: `బ్రహ్మోత్సవాలు పూర్తయిన మరుసటి రోజు స్వామివారికి ఉత్సవ శ్రమ నివారణార్థం వివిధ రకాల సుగంధ పుష్పములతో (గులాబీ, మల్లె, తామర, తులసి) చేసే మహోన్నత పుష్పార్చన సేవ.`,
    relatedEventKeywords: ['Pushpa Yagam', 'పుష్పయాగం', 'Flower']
  },
  {
    id: 'rathotsavam',
    term: 'Rathotsavam',
    termTe: 'రథోత్సవం',
    category: 'vahanas',
    shortDesc: 'Gigantic Wooden Chariot procession on the 8th morning pulled by thousands along Mada Streets.',
    shortDescTe: 'బ్రహ్మోత్సవాలలో 8వ రోజు ఉదయం మాడ వీధులలో వేలాది మంది భక్తులు తాడు పట్టి లాగే బృహత్తర రథోత్సవం.',
    detailedMeaning: `On the 8th day morning of Salakatla Brahmotsavam, Lord Malayappa Swamy, Sridevi, and Bhudevi ascend the colossal wooden Chariot (Ratham) crowned with a golden umbrella.

Thousands of pilgrims pull the heavy ropes chanting "Govinda! Govinda!".

During the procession, Adhyapakas recite Tirumangai Alwar's "Tiruvezhu Kootrirukkai" (composed in Ratha Bandham format). Ancient scriptures state: "Rathastam Kesavam drushtva punarjanma na vidyate" (Beholding the Lord on the Chariot eliminates rebirth).`,
    detailedMeaningTe: `సాలకట్ల బ్రహ్మోత్సవాల 8వ రోజు ఉదయం స్వామివారు శ్రీదేవి, భూదేవి సమేతంగా మహారథంపై వేంచేసి నలుగు మాడ వీధుల్లో విహరిస్తారు. భక్తులు "గోవిందా గోవిందా" అని స్మరిస్తూ రథాన్ని లాగుతారు.

పండితులు తిరుమంగై ఆళ్వార్ "రథబంధం" పాశురాలను పఠిస్తారు. "రథస్థం కేశవం దృష్ట్వా పునర్జన్మ న విద్యతే" అని పురాణాలు చెబుతున్నాయి.`,
    relatedEventKeywords: ['Rathotsavam', 'రథోత్సవం', 'Chariot']
  },
  {
    id: 'salakatla-vs-navarathri',
    term: 'Salakatla vs. Navarathri Brahmotsavam',
    termTe: 'సాలకట్ల మరియు నవరాత్రి బ్రహ్మోత్సవాల వ్యత్యాసం',
    category: 'utsavams',
    shortDesc: 'The distinction between Annual Salakatla Brahmotsavam and intercalary Navarathri Brahmotsavam.',
    shortDescTe: 'సాలకట్ల వార్షిక బ్రహ్మోత్సవాలు మరియు అధిక మాసంలో వచ్చే నవరాత్రి బ్రహ్మోత్సవాల మధ్య ప్రధాన వ్యత్యాసాలు.',
    detailedMeaning: `Normally, Brahmotsavam is celebrated once a year in Purattasi / Ashvija month. However, when an intercalary lunar month (Adhika Masa) occurs (e.g. 2015, 2018, 2020), Brahmotsavam is held twice. The first is called "Salakatla Brahmotsavam" (Annual) and the second is "Navarathri Brahmotsavam".

Key differences:
1) Salakatla features formal flag hoisting (Dwajarohanam) and lowering (Dwaja Avarohanam), whereas Navarathri has no flag ceremonies;

2) On the 8th morning, Salakatla features the massive Wooden Chariot (Rathotsavam), whereas Navarathri features the Golden Chariot (Swarna Ratham).`,
    detailedMeaningTe: `సాధారణంగా ప్రతి సంవత్సరం పురట్టాశి (ఆశ్వయుజ) మాసంలో సాలకట్ల బ్రహ్మోత్సవాలు జరుగుతాయి. అయితే పంచాంగంలో అధిక మాసం వచ్చిన సంవత్సరాలలో (ఉదా: 2015, 2018, 2020) రెండు బ్రహ్మోత్సవాలు జరుగుతాయి. మొదటిది సాలకట్ల బ్రహ్మోత్సవం, రెండోది నవరాత్రి బ్రహ్మోత్సవం.

వ్యత్యాసాలు:
1) సాలకట్ల ఉత్సవంలో ధ్వజారోహణం, ధ్వజావరోహణం ఉంటాయి; నవరాత్రి ఉత్సవంలో ఇవి ఉండవు.

2) 8వ రోజు ఉదయం సాలకట్లలో చెక్క రథోత్సవం జరిగితే, నవరాత్రిలో స్వర్ణరథ ఊరేగింపు జరుగుతుంది.`,
    relatedEventKeywords: ['Salakatla', 'సాలకట్ల', 'Navarathri']
  },
  {
    id: 'samavayi-pallava-queen',
    term: 'Samavayi (Pallava Queen)',
    termTe: 'సామవాయి (పల్లవ రాణి)',
    category: 'significant_people',
    shortDesc: 'Pallava Queen who presented the silver Bhoga Srinivasa idol in 960 AD and established Brahmotsavam processions.',
    shortDescTe: 'సా.శ. 960లో వెండి భోగ శ్రీనివాసమూర్తిని సమర్పించి బ్రహ్మోత్సవ ఊరేగింపు సంప్రదాయాన్ని ప్రారంభించిన పల్లవ రాణి.',
    detailedMeaning: `Pallava Queen Samavayi (Kaduvan Perundevi) was an ancient royal patron of Tirumala.

As recorded in stone inscriptions dated 960 AD, Queen Samavayi commissioned and consecrated the silver idol of Naralapperumal (Bhoga Srinivasa Murthy) inside Ananda Nilayam.

She donated vast lands and gold ornaments, establishing the practice of taking processional idols out during annual Brahmotsavams.`,
    detailedMeaningTe: `పల్లవ రాణి సామవాయి (కాడువన్ పెరుందేవి) తిరుమల ఆలయ చరిత్రలో అత్యంత ప్రసిద్ధి చెందిన రాచరిక భక్తురాలు.

సా.శ. 960 నాటి శాసనాల ప్రకారం, రాణి సామవాయి 1.5 అడుగుల వెండి భోగ శ్రీనివాసమూర్తిని తయారుచేయించి స్వామివారికి సమర్పించింది.

ఆమె భూములను, స్వర్ణాభరణాలను విరాళంగా ఇచ్చి బ్రహ్మోత్సవ ఊరేగింపు సంప్రదాయానికి నాంది పలికింది.`,
    relatedEventKeywords: ['Samavayi', 'సామవాయి', 'Pallava', 'Bhoga Srinivasa']
  },
  {
    id: 'sarvabhoopala-vahana',
    term: 'Sarvabhoopala Vahanam',
    termTe: 'సర్వభూపాల వాహనం',
    category: 'vahanas',
    shortDesc: '7-foot gold-sheathed vehicle procession on the 4th night proclaiming the Lord as Supreme Ruler of all kings.',
    shortDescTe: 'బ్రహ్మోత్సవాలలో నాలుగో రోజు రాత్రి తానే సకల భూపాలురకు భూపాలుడనని చాటుతూ 7 అడుగుల స్వర్ణ సర్వభూపాల వాహనంపై స్వామివారి కొలువు.',
    detailedMeaning: `Proclaiming to the universe that He alone is the Sovereign King of all kings and earthly rulers, Lord Venkateswara presides on the Sarvabhoopala Vahanam on the fourth night of Brahmotsavam.

This procession cleanses the ego within living beings and bestows eternal spiritual rewards.

Standing 7 feet tall and entirely crafted with gold sheets, the vehicle is known in temple inscriptions as 'Sarvabhoopala Vahanam' or 'Samarabhoopala Vahanam'.

Temple historical records reveal that this sacred vehicle was presented to Lord Venkateswara by Mattukumara Anantharayalu of the Devachoda dynasty.`,
    detailedMeaningTe: `లోకంలో భూపాలులందరికీ భూపాలుడు తానేనని లోకానికి చాటుతూ స్వామి నాలుగోరోజు రాత్రి ఈ వాహనంపై కొలువుదీరుతాడు. ఈ వాహనసేవ జీవుల్లో అహంకారాన్ని తొలగించి, శాశ్వత ఫలాన్ని ఇస్తుంది.

ఏడడుగుల ఎత్తు, పూర్తిగా బంగారురేకులతో నిర్మించిన వాహనం 'సర్వభూపాలవాహనం'. 'సమరభూపాలవాహన' ఉన్న పేరు శాసనంలో కనబడుతుంది. దేవచోడ వంశానికి చెందిన మట్లుకుమార అనంతరాయలు ఇచ్చిన వాహనాలలో ఇది ఒకటి.`,
    relatedEventKeywords: ['Sarvabhoopala', 'సర్వభూపాల', 'Dikpalaka', 'Mattukumara']
  },
  {
    id: 'second-bell-naivedyam',
    term: 'Second Bell Naivedyams',
    termTe: 'ద్వితీయ నివేదన గంట నైవేద్యాలు',
    category: 'timing_symbols',
    shortDesc: 'Morning offerings between 7:00 and 8:00 AM including Sheera sweet, Kadambam multi-vegetable rice, and Kesari Bath.',
    shortDescTe: 'ఉదయం 7 నుండి 8 గంటల మధ్య సమర్పించే నివేదనలు - క్షీరాన్నం, కదంబం, షీరా, కేసరి బాత్.',
    detailedMeaning: `Second Bell Naivedyams are offered during morning hours between 7:00 AM and 8:00 AM inside Ananda Nilayam.

In addition to regular items like Pulihora and Daddhyodanam, special delicacies are offered: Suddhannam (pure cooked rice), Sheera (sweet made of ghee, milk, semolina, and cashews), Kadambam (multi-vegetable rice), Payasam, and Kesari Bath.`,
    detailedMeaningTe: `ద్వితీయ నివేదన గంట నైవేద్యాలు ఉదయం 7 నుండి 8 గంటల మధ్య గర్భాలయంలో నివేదించబడతాయి.

పులిహోర, దద్దోజనంతో పాటు శుద్ధాన్యం, షీరా (రవ్వ, నెయ్యి, పాల తీపి), కదంబం (కాయగూరల అన్నం), పాయసం మరియు కేసరి బాత్‌లను స్వామివారికి సమర్పిస్తారు.`,
    relatedEventKeywords: ['Second Bell', 'ద్వితీయ నివేదన', 'Sheera', 'Kadambam']
  },
  {
    id: 'seshavastram',
    term: 'Seshavastram',
    termTe: 'శేషవస్త్రం',
    category: 'timing_symbols',
    shortDesc: 'The sacred cloth worn by Lord Venkateswara, sent back to royal patrons and blessed devotees as divine Prasadam.',
    shortDescTe: 'మూలవిరాట్ స్వామివారు ధరించిన పవిత్ర వస్త్రం; భక్తులకు, పీఠాధిపతులకు ప్రసాదంగా అందించే దివ్య వస్త్రం.',
    detailedMeaning: `Seshavastram is the highly revered cloth worn by Lord Venkateswara (Moola Virat) in the sanctum.

After being adorned on the deity, it is carefully preserved and presented as the Lord's supreme gift (Seshavastram) to visiting seers, VIP patrons, or royal families (such as Gadwal royalty).`,
    detailedMeaningTe: `శేషవస్త్రం అనేది మూలవిరాట్ శ్రీ వెంకటేశ్వర స్వామివారు స్వయంగా ధరించిన పవిత్ర వస్త్రం.

స్వామివారు ధరించిన అనంతరం ఈ వస్త్రాన్ని పీఠాధిపతులకు, రాజకుటుంబీకులకు లేదా విశిష్ట భక్తులకు స్వామివారి దివ్య ప్రసాదంగా (శేషవస్త్రం) బహూకరిస్తారు.`,
    relatedEventKeywords: ['Seshavastram', 'శేషవస్త్రం', 'Prasadam']
  },
  {
    id: 'simha-vahana',
    term: 'Simha Vahanam',
    termTe: 'సింహవాహనం',
    category: 'vahanas',
    shortDesc: 'Lion vehicle procession on the 3rd morning featuring the Lord decorated as Lord Narasimha Avatar.',
    shortDescTe: 'బ్రహ్మోత్సవాలలో మూడో రోజు ఉదయం స్వామివారు సింహవాహనంపై నరసింహ అవతార రూపంలో దర్శనమిచ్చే పవిత్ర సేవ.',
    detailedMeaning: `On the morning of the third day of Brahmotsavam, Lord Venkateswara grants divine darsan mounted upon the Simha (Lion) Vahanam.

The lion is the king of animals, representing supreme majesty and power. Through this vehicle, the Lord demonstrates that humans must control and tame the animalistic tendencies (Janthu Pravrutti) within themselves.

In Dushtasikshana and Sishtarakshana (punishing evil and protecting righteousness), Lord Vishnu assumed the ferociously divine form of Sri Narasimha Swami to slay Hiranyakasipu and save Prahlada.

To vividly portray this epic narration to devotees, the Simha Vahanam procession is conducted. Adorning a Diamond Crown (Vajra Kireetam), Emerald Ornaments (Pachala Aabharanalu), Sri Vatsam emblem, and Lakshmi Haaram is the special distinction of today's ornamentation.`,
    detailedMeaningTe: `మూడోరోజు ఉదయం సింహవాహనంపై వేంకటనాథుడు దర్శనమిస్తాడు. జంతువులకు రాజైన సింహం సైతం తాపస నిష్ట, మనుషులు తమలోని జంతుప్రవృత్తిని అదుపుచేసుకోవాలని స్వామి చాటుతారు.

దుష్టశిక్షణ, శిష్టరక్షణలో భాగంగా దుర్మార్గుడైన హిరణ్యకశిపుని వధించి, ప్రహ్లాదుని రక్షించడానికి శ్రీమహావిష్ణువు ధరించిన అవతారం నరసింహావతారం. ఈ వృత్తాంతాన్ని భక్తులకు కన్నులకు కట్టినట్లు చూపించందుకే 'సింహ' వాహనోత్సవం నిర్వహిస్తారు. వజ్రకిరీటం, పచ్చల ఆభరణాలు, శ్రీవత్సం, లక్ష్మీపతకం - ఈనాటి అలంకరణలోని ప్రత్యేకత.`,
    relatedEventKeywords: ['Simha', 'సింహవాహనం', 'Narasimha']
  },
  {
    id: 'snapana-tirumanjanam',
    term: 'Snapana Tirumanjanam',
    termTe: 'స్నపన తిరుమంజనం',
    category: 'sevas',
    shortDesc: 'Vedic bathing ceremony performed to processional deities using Panchamrutam, coconut water, and sandalwood.',
    shortDescTe: 'ఉత్సవాల సమయంలో ఉత్సవమూర్తులకు పాలు, పెరుగు, తేనె, కొబ్బరి నీళ్ళు, చందనంతో చేసే పవిత్ర అభిషేకం.',
    detailedMeaning: `Snapana Tirumanjanam is an intricate bathing ceremony performed for Lord Malayappa Swamy and His consorts during Brahmotsavams, Vasanthotsavams, and Pushpa Yagam.

Priests pour Panchamrutam, tender coconut water, turmeric, and sandalwood paste using golden and silver sieves.`,
    detailedMeaningTe: `బ్రహ్మోత్సవాలు, వసంతోత్సవాల సమయంలో ఉత్సవమూర్తులకు వెండి, బంగారు పాత్రలలో పాలు, పెరుగు, తేనె, కొబ్బరిబోండాల నీళ్లు, చందనం, పసుపులతో చేసే మహోన్నత పవిత్ర అభిషేక సేవ.`,
    relatedEventKeywords: ['Snapana', 'స్నపన', 'Tirumanjanam']
  },
  {
    id: 'snapana-thirumanjana-peetham',
    term: 'Snapana Thirumanjana Peetham',
    termTe: 'స్నాపన తిరుమంజన పీఠం',
    category: 'sevas',
    shortDesc: 'Sacred sanctified platform utilized for performing sacred Snapana Thirumanjanam bathing ceremonies during Pavitrotsavam.',
    shortDescTe: 'పవిత్రోత్సవాలు మరియు విశేష ఉత్సవాలలో శ్రీవారి ఉత్సవమూర్తులకు దివ్య స్నాపన తిరుమంజన అభిషేకం నిర్వహించే పవిత్ర పీఠం.',
    detailedMeaning: `Snapana Thirumanjana Peetham is the highly venerated sanctified stone pedestal inside the Tirumala temple complex used during Snapana Thirumanjanam and Pavitrotsavams.

Processional deities Lord Malayappa Swamy, Sridevi, and Bhudevi are seated on this sacred pedestal while priests chant Vedic hymns and pour sacred liquids, coconut water, milk, honey, turmeric, and sandal paste.

Agama scriptures declare that invoking Vedic mantras upon this Peetham purifies the temple and removes any inadvertent ritual defects.`,
    detailedMeaningTe: `తిరుమల ఆలయంలో పవిత్రోత్సవాలు మరియు బ్రహ్మోత్సవాలలో స్వామివారికి విశేష స్నాపన తిరుమంజన అభిషేక క్రతువును నిర్వహించే అత్యంత పవిత్రమైన దివ్య పీఠం.

శ్రీదేవి, భూదేవి సమేత శ్రీమలయప్ప స్వామివార్లను ఈ పీఠంపై వేంచేపు చేసి పంచామృతాలు, డబ్బ తేనె, పాలు, చందనములతో శీతల స్నపన అభిషేకం నిర్వహిస్తారు.

వైఖానస ఆగమ శాస్త్రం ప్రకారం ఈ పీఠంపై సకల దేవతలు ఆవాహన చెంది ఆలయానికి పవిత్రతను చేకూరుస్తారు.`,
    relatedEventKeywords: ['Snapana Thirumanjana Peetham', 'స్నాపన తిరుమంజన పీఠం', 'Peetham']
  },
  {
    id: 'sri-ananthalwan',
    term: 'Sri Ananthalwan',
    termTe: 'శ్రీ అనంతాళ్వాన్',
    category: 'significant_people',
    shortDesc: 'Staunch disciple of Acharya Ramanuja who moved to Tirumala to dig a lake and establish flower gardens.',
    shortDescTe: 'రామానుజాచార్యుల ఆదేశంతో తిరుమలలో చెరువు తవ్వి, నందనవనాన్ని నెలకొల్పి పుష్ప కైంకర్యాన్ని ప్రారంభించిన పరమ శిష్యుడు.',
    detailedMeaning: `Sri Ananthalwan was a devoted disciple of Acharya Ramanuja.

When Ramanuja asked his disciples who would move to Tirumala to revive worship despite wild animals and obstacles, only Ananthalwan volunteered.

He moved to Tirumala, dug a lake, established a beautiful flower garden ("Sri Ananthalwan Gardens"), and initiated daily Pushpa Kainkaryam for Tomala Seva. Even today, the gardens exist on Tirumala, and flower garlands for Lord Venkateswara are brought from there.`,
    detailedMeaningTe: `శ్రీ అనంతాళ్వాన్ రామానుజాచార్యుల వారి ప్రియ శిష్యుడు.

తిరుమలలో వనమూలికలు, పుష్ప తోటలను నెలకొల్పి స్వామివారికి తోమాల సేవ కోసం పూలమాలలు సమర్పించడానికి రామానుజుల ఆదేశం మేరకు తిరుమలకు వచ్చి స్థిరపడ్డారు.

తిరుమలలో ఒక చెరువును తవ్వి "అనంతాళ్వాన్ తోట"ను నిర్మించారు. నేటికీ శ్రీవారి తోమాల సేవకు ఈ తోటల నుండే పూలమాలలు వస్తాయి.`,
    relatedEventKeywords: ['Ananthalwan', 'అనంతాళ్వాన్', 'Garden']
  },
  {
    id: 'sri-annamacharya',
    term: 'Sri Tallapaka Annamacharya',
    termTe: 'శ్రీ తాళ్లపాక అన్నమాచార్యులు',
    category: 'significant_people',
    shortDesc: '15th-century Saint-Composer who authored 32,000 Sankeertanas praising Lord Venkateswara’s divine glory.',
    shortDescTe: 'శ్రీ వెంకటేశ్వర స్వామివారిపై 32,000 సంకీర్తనలను రచించి పదకవితా పితామహుడిగా వెలిగిన వాగ్గేయకారుడు.',
    detailedMeaning: `Tallapaka Annamacharya (1408–1503) was the supreme saint-composer of Tirumala who composed 32,000 Sankeertanas in Telugu and Sanskrit in praise of Lord Venkateswara.

His songs describe every festival, Vahana procession, Naivedyam, and ritual (e.g. "Itu Garuduni nee vekkinavu...", "Brahma Kadigina Paadamu", "Podagantimayya").

His descendants continue to sing lullabies during night Ekanta Seva.`,
    detailedMeaningTe: `తాళ్లపాక అన్నమాచార్యులు (1408-1503) తిరుమల శ్రీ వెంకటేశ్వర స్వామివారి పరమ భక్తుడు, సంకీర్తనాచార్యుడు.

స్వామివారి వైభవంపై 32,000 పదాత్మక సంకీర్తనలను రచించారు. గరుడ సేవ, రథోత్సవం, ఏకాంత సేవలపై ఆయన రచించిన కీర్తనలు నేటికీ తిరుమలలో మార్మోగుతాయి.

రాత్రి ఏకాంత సేవ సమయంలో అన్నమయ్య వంశస్థులు స్వామివారికి జోలపాట పాడుతారు.`,
    relatedEventKeywords: ['Annamacharya', 'అన్నమయ్య', 'Sankeertana'],
    images: [
      {
        url: 'https://rjdltvopbejhvbheindb.supabase.co/storage/v1/object/public/event-photos/Annamaacaaryulu.jpg',
        caption: 'Sri Tallapaka Annamacharya - Supreme Saint-Composer of Tirumala'
      }
    ]
  },
  {
    id: 'sri-ramanuja',
    term: 'Sri Ramanujacharya',
    termTe: 'శ్రీ రామానుజాచార్యులు',
    category: 'significant_people',
    shortDesc: 'Great 11th-century Vaishnava Acharya who renovated Ananda Nilayam, established 4 Mada Streets, and codified temple Agamas.',
    shortDescTe: 'తిరుమల ఆలయ పద్ధతులను క్రమబద్ధీకరించి, 4 మాడ వీధులను నిర్మించి, వైఖానస ఆగమ సేవలను పునరుద్ధరించిన పరమాచార్యుడు.',
    detailedMeaning: `Sri Ramanujacharya (1017–1137 AD) was the supreme Acharya who restored the glory of Tirumala.

Facing inaccessible forests and KAPALIKA threats, he visited Tirumala, proved the deity is Lord Vishnu, renovated the dilapidated Ananda Vimanam, installed the golden Lakshmi on the Lord's chest necklace, and placed Sri Rama Parivara and Yoga Narasimha shrines.

He widened the Four Mada Streets around the temple so Brahmotsavams could be celebrated atop Tirumala instead of Tiruchanur. He established the Jeer Mutt, introduced Akasa Ganga Teertha Kainkaryam through Tirumala Nambi, and instituted the Friday Abhishekam schedule.`,
    detailedMeaningTe: `శ్రీ రామానుజాచార్యులు (1017-1137) తిరుమల ఆలయ దివ్య స్వరూపాన్ని సుస్థిరం చేసిన మహోన్నత ఆచార్యుడు.

ఆనంద నిలయ విమానాన్ని పునరుద్ధరించి, స్వామివారి వక్షస్థలంలో స్వర్ణ లక్ష్మీదేవిని ప్రతిష్టించారు. తిరుమలలో ఉత్సవాలు జరిపేందుకు ఆలయం చుట్టూ 4 వెడల్పాటి మాడ వీధులను నిర్మించారు.

జీయర్ మఠాన్ని స్థాపించి, వైఖానస ఆగమ పద్ధతిలో సేవలను క్రమబద్ధీకరించారు. ప్రతి శుక్రవారం మూలవిరాట్ అభిషేక సమయాన్ని నిర్ణయించిన మహనీయుడు.`,
    relatedEventKeywords: ['Ramanuja', 'రామానుజ', 'Acharya']
  },
  {
    id: 'sri-tirumala-nambi',
    term: 'Sri Tirumala Nambi',
    termTe: 'శ్రీ తిరుమల నంబి',
    category: 'significant_people',
    shortDesc: 'Maternal uncle of Ramanuja who initiated the 1000-year-old tradition of fetching Akasa Ganga water for daily Abhishekam.',
    shortDescTe: 'ఆకాశగంగ నుండి పవిత్ర జలాలను తిరుమల ఆలయానికి తెచ్చి స్వామివారి అభిషేకానికి సమర్పించే 1000 ఏళ్ళ సేవకు శ్రీకారం చుట్టిన మహనీయుడు.',
    detailedMeaning: `Sri Tirumala Nambi (Periya Tirumala Nambi) was the maternal uncle and guru of Acharya Ramanuja.

Over 1000 years ago, he initiated the daily "Teertha Kainkaryam"—walking miles through rugged hills to fetch holy water from Akasa Ganga for Lord Venkateswara's Abhishekam.

Legend states Lord Srinivasa Himself appeared as a young hunter to drink water from Nambi's pot and affectionately addressed him as "Tata" (Grandfather). His descendants continue this sacred service today.`,
    detailedMeaningTe: `శ్రీ తిరుమల నంబి రామానుజాచార్యుల వారి మేనమామ మరియు గురువు.

1000 సంవత్సరాల క్రితం ఆకాశగంగ తీర్థం నుండి పవిత్ర జలాలను బిందెలలో నింపుకుని తిరుమల ఆలయానికి తెచ్చి స్వామివారి నిత్య అభిషేకానికి సమర్పించే "తీర్థ కైంకర్యం" ప్రారంభించారు.

స్వామివారే స్వయంగా బోయవాని రూపంలో వచ్చి నంబి బిందె నీటిని తాగి ఆయనను "తాతా" అని ఆప్యాయంగా పిలిచారని ప్రతీతి.`,
    relatedEventKeywords: ['Tirumala Nambi', 'తిరుమల నంబి', 'Akasa Ganga']
  },
  {
    id: 'sri-varaha-swami',
    term: 'Sri Varaha Swami Temple & First Darshan',
    termTe: 'శ్రీ వరాహస్వామి ఆలయం & ప్రథమ దర్శనం',
    category: 'timing_symbols',
    shortDesc: 'Ancient shrine of Lord Varaha on Swami Pushkarini banks where first worship must be offered before visiting Lord Srinivasa.',
    shortDescTe: 'స్వామి పుష్కరిణి ఒడ్డున ఉన్న ఆది వరాహస్వామి ఆలయం; శ్రీవారి దర్శనానికి ముందే వరాహస్వామిని దర్శించుకోవడం ఆలయ నియమం.',
    detailedMeaning: `Sri Varaha Swami Temple is situated on the north-west banks of Swami Pushkarini.

Puranic legend dictates that Tirumala originally belonged to Lord Varaha (the boar incarnation of Vishnu who rescued Mother Earth).

When Lord Srinivasa came to Tirumala, Lord Varaha granted Him land on the condition that all visiting pilgrims must first worship Lord Varaha and offer Naivedyam to Him before proceeding to Lord Venkateswara's sanctum. Acharya Ramanuja codified this practice and installed the Utsava Murthy of Sri Varaha Swami.`,
    detailedMeaningTe: `స్వామి పుష్కరిణి వాయవ్య ఒడ్డున ఉన్న ప్రసిద్ధ శ్రీ వరాహస్వామి ఆలయం.

తిరుమల గిరులు మొదట ఆదివరాహస్వామి క్షేత్రం. శ్రీ వెంకటేశ్వర స్వామివారు ఇక్కడ నివసించడానికి వరాహస్వామి స్థలాన్ని ఇచ్చారు.

అందువల్ల తిరుమలకు వచ్చే భక్తులు మొదట వరాహస్వామిని దర్శించి, ఆ తదుపరి శ్రీవారి దర్శనానికి వెళ్లాలని రామానుజాచార్యులు శాసించారు.`,
    relatedEventKeywords: ['Varaha', 'వరాహ', 'First Darshan']
  },
  {
    id: 'suprabhatam',
    term: 'Suprabhatam',
    termTe: 'సుప్రభాతం',
    category: 'sevas',
    shortDesc: 'Early morning Sanskrit hymns recited at Bangaru Vakili to gently awaken Lord Venkateswara at 3:00 AM.',
    shortDescTe: 'ప్రతిరోజు వేకువజామున 3:00 గంటలకు బంగారు వాకిలి వద్ద పఠించే 29 శ్లోకాల సంస్కృత ప్రభాత గీతం.',
    detailedMeaning: `Suprabhatam ("Auspicious Dawn") is the first service performed daily in Tirumala temple.

At 3:00 AM, priests and Veda scholars gather before Bangaru Vakili and recite the 29-verse Sanskrit hymn "Kausalya Supraja Rama..." composed by Sri Hastigirinathar (Prativadi Bhayankaram Annan).

Fresh butter, warm milk, and sugar are offered as the first Naivedyam.`,
    detailedMeaningTe: `ప్రతిరోజూ ఉదయం 3:00 గంటలకు శ్రీవారి ఆలయ బంగారు వాకిలి వద్ద పండితులు పఠించే పవిత్ర "కౌసల్యా సుప్రజా రామా..." ప్రభాత గీతం.

స్వామివారిని పవిత్రంగా నిద్రలేపుతూ వెన్న, పాలు, పంచదారలను మొదటి నైవేద్యంగా సమర్పిస్తారు.`,
    relatedEventKeywords: ['Suprabhatam', 'సుప్రభాతం']
  },
  {
    id: 'surya-prabha',
    term: 'Surya Prabha Vahanam',
    termTe: 'సూర్యప్రభ వాహనం',
    category: 'vahanas',
    shortDesc: 'Radiant Sun-god chariot procession on the 7th morning adorned with red garlands depicting the Lord as the inner soul of the Sun.',
    shortDescTe: 'బ్రహ్మోత్సవాలలో 7వ రోజు ఉదయం ఎర్రటి పూలమాలలు ధరించి సప్తచక్ర రథసారధి భానుని తేజోమండలంలో సూర్యప్రభ వాహనంపై స్వామివారి ఊరేగింపు.',
    detailedMeaning: `On the morning of the seventh day, with the Sun God (Bhanu) driving the chariot drawn by seven horses (Saptaswas), Lord Malayappa Swamy rides the magnificent Surya Prabha Vahanam adorned with vivid red flower garlands.

The Lord proclaims to the world that He is the supreme inner soul and manifestation of the Sun God who grants light and life force to the universe.

Lord Malayappa uniquely possesses the tallest and most breathtaking Surya Prabha Vahanam unmatched across all Sri Vaishnava temples in South India. The Sun and Moon are the twin divine eyes of Lord Venkateswara.`,
    detailedMeaningTe: `ఏడోరోజు ఉదయం సప్తాశ్వాలపై భానుడు రథసారధిగా ఎర్రటిపూలమాలలు ధరించి, స్వామి ఈ వాహనం మీద ఊరేగుతాడు. ప్రపంచానికి వెలుగు ప్రసాదించే సూర్య భగవానుడికి తానే ప్రతిరూపమని చాటి చెబుతారు.

దక్షిణదేశంలోని వైష్ణవాలయాలో ఎక్కడా లేనంతటి ఎత్తైన రమణీయమైన సూర్యప్రభవాహనం మలయప్పకే ఉంది. సూర్య చంద్రులు శ్రీవారినేత్రద్వయం.`,
    relatedEventKeywords: ['Surya Prabha', 'సూర్యప్రభవాహనం', 'Sun', 'Bhanu']
  },
  {
    id: 'swami-pushkarini',
    term: 'Swami Pushkarini',
    termTe: 'స్వామి పుష్కరిణి',
    category: 'timing_symbols',
    shortDesc: 'The celestial lake adjacent to Tirumala temple brought down from Vaikuntha by Lord Garuda.',
    shortDescTe: 'వైకుంఠం నుండి గరుత్మంతునిచే భూమికి తేబడిన తిరుమల శ్రీవారి ఆలయ పవిత్ర కోనేరు.',
    detailedMeaning: `Swami Pushkarini is the holy lake abutting Lord Venkateswara's temple. Detailed descriptions exist in Varaha, Padma, Vamana, Markandeya, Skanda, Brahma, and Bhavishyottara Puranas.

Legend states 3.5 crore celestial Theerthas and Devas reside in its waters. On Margasira Suddha Dwadasi day, all cosmic holy waters unite here. A bath in Swami Pushkarini before entering the sanctum cleanses sins.`,
    detailedMeaningTe: `శ్రీవారి ఆలయం పక్కనే ఉన్న స్వామి పుష్కరిణి అత్యంత పవిత్రమైన కోనేరు. పద్మ, వరాహ, స్కంద పురాణాలలో దీని వర్ణన ఉంది.

మూడున్నర కోట్ల దివ్య తీర్థాలు ఈ పుష్కరిణిలో కొలువై ఉన్నాయి. మార్గశిర శుద్ధ ద్వాదశి రోజున సకల పుణ్య తీర్థాలు ఇందులో కలుస్తాయి. ఇందులో స్నానం చేయడం వలన మానసిక, శరీర శుద్ధి కలుగుతుంది.`,
    relatedEventKeywords: ['Pushkarini', 'పుష్కరిణి', 'Lake']
  },
  {
    id: 'swarna-ratham',
    term: 'Swarna Ratham (Golden Chariot)',
    termTe: 'స్వర్ణ రథం (బంగారు రథం)',
    category: 'vahanas',
    shortDesc: 'Scintillating Golden Chariot procession during Navarathri Brahmotsavam Day 8 & Mohini Avatar morning.',
    shortDescTe: 'నవరాత్రి బ్రహ్మోత్సవాలలో 8వ రోజున మరియు మోహిని అవతారంలో ఊరేగే దివ్య స్వర్ణ రథం.',
    detailedMeaning: `Swarna Ratham is the majestic Golden Chariot of Tirumala temple constructed with gold-plated embellishments and intricate carvings.

During Navarathri Brahmotsavam, Swarna Ratham is pulled along Mada Streets on the 8th day morning (in place of the Wooden Chariot).

It is also drawn during Mohini Avatar morning, filling the town with brilliant golden radiance.`,
    detailedMeaningTe: `స్వర్ణ రథం తిరుమల ఆలయపు మహోన్నత బంగారు రథం.

నవరాత్రి బ్రహ్మోత్సవాలలో 8వ రోజు ఉదయం చెక్క రథానికి బదులుగా ఈ స్వర్ణ రథ ఊరేగింపు జరుగుతుంది.

మోహిని అవతారం రోజు ఉదయం కూడా స్వామివారు ఈ స్వర్ణ రథంపై ఊరేగుతూ భక్తులకు దర్శనమిస్తారు.`,
    relatedEventKeywords: ['Swarna Ratham', 'స్వర్ణ రథం', 'Golden Chariot']
  },
  {
    id: 'teppotsavam',
    term: 'Teppotsavam',
    termTe: 'తెప్పోత్సవం',
    category: 'utsavams',
    shortDesc: 'Picturesque 5-day Float Festival in Swami Pushkarini lake illuminated with floating lamps.',
    shortDescTe: 'స్వామి పుష్కరిణి జలాలలో దీపకాంతులతో అలంకరించిన తెప్పపై స్వామివార్లు జరిపే 5 రోజుల రమణీయ ఉత్సవం.',
    detailedMeaning: `Teppotsavam takes place for 5 days during Phalguna month in Swami Pushkarini lake.

Beautifully illuminated rafts (Teppa) carry Lord Malayappa Swamy, Sridevi, and Bhudevi as Nadaswaram music and Vedic chants echo across the illuminated waters.`,
    detailedMeaningTe: `ఫాల్గుణ మాసంలో 5 రోజుల పాటు స్వామి పుష్కరిణిలో తెప్పోత్సవాలు జరుగుతాయి.

దీపకాంతులతో అలంకరించిన తెప్పపై స్వామి, అమ్మవార్లు జలవిహారం చేస్తూ భక్తులకు నేత్రపర్వ దర్శనం కలిగిస్తారు.`,
    relatedEventKeywords: ['Teppotsavam', 'తెప్పోత్సవం', 'Float']
  },
  {
    id: 'tirumala-gardens',
    term: 'Tirumala Divya Vana & Alwar Pasurams',
    termTe: 'తిరుమల నందనవనాలు & ఆళ్వార్ల పాశురాలు',
    category: 'timing_symbols',
    shortDesc: 'The celestial gardens of Tirumala extolled by Alwars where flowers continue to bloom even after falling.',
    shortDescTe: 'ఆళ్వార్ల ప్రబంధాలలో వర్ణించబడిన తిరుమల పవిత్ర తోటలు; చెట్టు నుండి రాలిన తర్వాత కూడా వికసించే దివ్య పుష్పాల క్షేత్రం.',
    detailedMeaning: `The lush gardens and mountain slopes of Tirumala have been praised by ancient Alwar saints in their Tamil Prabandhams.

Thirumalisai Alwar in Nanmukhan Thiruvandadi (44) sang "పాశిల్ వేజ్గడమలై" (Tirumala covered in green gardens). Nammalwar in Thiruvaimozhi (3-3-1) composed the famous verse "సిష్టురా మకిణుమ్ తిరువేజ్గడమ్", describing a unique cosmic miracle: on any ordinary tree, a flower fades and loses beauty after falling from its stem; but on Tirumala hill, flowers that drop onto the sacred ground shine with even greater radiance and fragrance!

Kulasekhara Alwar and Thirumangai Alwar also sang of Tirumala's dense bamboo gardens yielding lustrous pearls.`,
    detailedMeaningTe: `తిరుమల కొండలపై ఉన్న దివ్య ఉద్యానవనాలను ఆళ్వార్లు తమ పాశురాలలో పరమానందంతో వర్ణించారు.

తిరుమళిశై ఆళ్వార్ "పాశిల్ వేజ్గడమలై" అని, నమ్మాళ్వార్ తిరువాయిమొళిలో "సిష్టురా మకిణుమ్ తిరువేజ్గడమ్" అని కీర్తించారు. సాధారణంగా చెట్టు నుండి రాలిన పూవు వాడిపోతుంది, కానీ తిరుమల కొండపై రాలిన పూలు మరింత కాంతివంతంగా, సుగంధంతో వికసిస్తాయి!

తిరుమల వెదురు తోటలలో ముత్యాలు పండుతాయని ఆళ్వార్లు వర్ణించారు. TTD ఉద్యానవన శాఖ ఈ నందనవనాలను నేటికీ పవిత్రంగా పరిరక్షిస్తోంది.`,
    relatedEventKeywords: ['Gardens', 'తోటలు', 'Vana', 'Pasuram']
  },
  {
    id: 'thulabharam',
    term: 'Thulabharam',
    termTe: 'తులాభారం',
    category: 'sevas',
    shortDesc: 'Ancient vow of offering items (gold, silver, coins, grains, jaggery, sugar) matching the exact body weight of a person or child.',
    shortDescTe: 'భక్తులు లేదా బిడ్డల శరీర బరువుకు సరితూగేలా బంగారం, వెండి, నాణాలు, ధాన్యం, బెల్లం, కలకండ స్వామికి సమర్పించే పవిత్ర మొక్కు.',
    detailedMeaning: `Thulabharam is a beloved tradition at Tirumala where a devotee or newborn child is weighed on one scale of a giant balance against offerings of gold, silver, currency coins, grains, sugar, jaggery, or camphor on the opposite scale.

Devotees fulfill this vow in gratitude for children born through the grace of Lord Venkateswara.

The sacred balance (Thuladandam) is located near the Ranganayaka Mandapam close to the Mahadwaram entrance.`,
    detailedMeaningTe: `త్రాసులో తులాభారం తూగేవారు ఒకవైపు; మరోవైపు ధనం, ధాన్యం, బంగారం, వెండి, కర్పూరం, బెల్లం, కలకండ వంటి వస్తువులతో సరితూగి స్వామివారికి అర్పించే పవిత్ర మొక్కు.

స్వామివారి కరుణాకటాక్షాలవల్ల పుట్టిన సంతానాన్ని ఇలా తూచడం తిరుమలలో వంశపారంపర్యంగా వస్తున్న ఆచారం. తులాభారం తూగేవరకు ఆ బిడ్డ స్వామిబిడ్డ; తూచిన తర్వాతే ఆ బిడ్డ కన్నవారిబిడ్డ అని భక్తుల నమ్మకం.

తిరుమల కొండపై తులాదండం మహాద్వారం దగ్గర రంగనాథమండపం ముందు ఉంది. మొదట్లో ఇది హుండీ దగ్గర ఉండేది.`,
    relatedEventKeywords: ['Thulabharam', 'తులాభారం', 'Weighing Scale']
  },
  {
    id: 'unjal-seva',
    term: 'Unjal Seva (Dolotsavam)',
    termTe: 'ఊంజల్ సేవ (డోలోత్సవం)',
    category: 'sevas',
    shortDesc: 'Gently swinging the processional deities on a golden mirror-lined swing accompanied by lullaby music.',
    shortDescTe: 'అద్దాల మంటపంలో సువర్ణ ఉయ్యాలపై స్వామి అమ్మవార్లను ఊపే శ్రావ్యమైన సంగీత సేవ.',
    detailedMeaning: `Unjal Seva takes place daily in the Addala Mandapam (Hall of Mirrors).

Lord Malayappa Swamy, Sridevi, and Bhudevi are seated on an ornate golden swing surrounded by hundreds of reflecting mirrors while Carnatic vocalists sing soothing lullabies.`,
    detailedMeaningTe: `అద్దాల మంటపంలో శ్రీదేవి, భూదేవి సమేత శ్రీమలయప్ప స్వామివారిని సువర్ణ ఉయ్యాలపై వేంచేపు చేసి అద్దాల వెలుగులో శ్రావ్యమైన సంగీతం మధ్య మెల్లగా ఊపే రమణీయ సేవ.`,
    relatedEventKeywords: ['Unjal', 'ఊంజల్', 'Dolotsavam']
  },
  {
    id: 'uttariyam-vastram',
    term: 'Uttariyam Silk Vastram',
    termTe: 'ఉత్తరీయం పట్టు వస్త్రం',
    category: 'timing_symbols',
    shortDesc: 'Special heavy silk Uttariyams brought with Vedic chanting for festivals like Ugadi and Deepavali.',
    shortDescTe: 'యుగాది, దీపావళి, అనివార ఆస్థానం రోజుల్లో వేద మంత్రాల మధ్య ఆలయానికి తెచ్చే పవిత్ర పట్టు ఉత్తరీయాలు.',
    detailedMeaning: `Uttariyam Silk Vastram refers to the sacred silk shoulder cloths brought into the sanctum sanctorum amidst Vedic recitations on special festival occasions.

These Uttariyams are adorned to the deity during major celebrations like Ugadi Asthanam, Deepavali Asthanam, and Anivara Asthanam.`,
    detailedMeaningTe: `ఉత్తరీయం పట్టు వస్త్రం అనేది విశేష పండుగ రోజుల్లో గర్భాలయానికి వేద మంత్రాల మధ్య తెచ్చే పవిత్ర పట్టు శాలువా.

యుగాది ఆస్థానం, దీపావళి ఆస్థానం, అనివార ఆస్థానం రోజుల్లో స్వామివారికి ఈ పట్టు ఉత్తరీయాన్ని రాజసంగా అలంకరిస్తారు.`,
    relatedEventKeywords: ['Uttariyam', 'ఉత్తరీయం', 'Asthanam', 'Vastram']
  },
  {
    id: 'vakshasthala-thaayaar-vastram',
    term: 'Vakshasthala Thaayaarla Pattu Vastram',
    termTe: 'వక్షస్థల తాయార్ పట్టు వస్త్రం',
    category: 'timing_symbols',
    shortDesc: 'Silk garment tied around Goddess Mahalakshmi on Lord Venkateswara’s chest after special Abhishekam.',
    shortDescTe: 'శ్రీవారి వక్షస్థలంలో ఉన్న మహాలక్ష్మి అమ్మవారికి ప్రత్యేక అభిషేకం అనంతరం సమర్పించే పట్టు వస్త్రం.',
    detailedMeaning: `Vakshasthala Thaayaarla Pattu Vastram is an exclusive silk garment tied around Goddess Mahalakshmi (Thaayaar) who resides eternally on the chest of Lord Venkateswara.

This garment is adorned immediately following the special Abhishekam offered to Vakshasthala Lakshmi on Fridays.`,
    detailedMeaningTe: `వక్షస్థల తాయార్ పట్టు వస్త్రం అనేది శ్రీవారి రొమ్ముపై వెలిసే మహాలక్ష్మి అమ్మవారికి సమర్పించే ప్రత్యేక పట్టు వస్త్రం.

శుక్రవారం అభిషేకం ముగిసిన వెంటనే వక్షస్థల లక్ష్మీదేవికి ఈ వస్త్రాన్ని అత్యంత భక్తితో కడతారు.`,
    relatedEventKeywords: ['Vakshasthala', 'Thaayaar', 'Mahalakshmi', 'Vastram']
  },
  {
    id: 'vasanthotsavam',
    term: 'Vasanthotsavam',
    termTe: 'వసంతోత్సవం',
    category: 'utsavams',
    shortDesc: 'Annual 3-day Spring festival conducted in Vasantha Mandapam garden welcoming spring season.',
    shortDescTe: 'వసంత ఋతువును పురస్కరించుకుని వసంత మంటపంలో 3 రోజుల పాటు జరిగే దివ్య సేవ.',
    detailedMeaning: `Vasanthotsavam is celebrated for 3 days during Chaitra month.

Deities are seated in the Vasantha Mandapam surrounded by fragrant flowers, perfumes, and cool waters, receiving Snapana Tirumanjanam.`,
    detailedMeaningTe: `చైత్ర మాసంలో వసంత ఆగమనాన్ని పురస్కరించుకుని 3 రోజులు వసంత మంటపంలో స్వామివారికి పరిమళ జలాలు, పూలతో స్నపన తిరుమంజనం జరిపిస్తారు.`,
    relatedEventKeywords: ['Vasanthotsavam', 'వసంతోత్సవం', 'Spring']
  },
  {
    id: 'vimana-venkateswara',
    term: 'Vimana Venkateswara Swami',
    termTe: 'విమాన వెంకటేశ్వర స్వామి',
    category: 'timing_symbols',
    shortDesc: 'Sacred image of Lord Venkateswara residing on the Ananda Nilaya Vimanam gold tower.',
    shortDescTe: 'ఆనంద నిలయ సువర్ణ విమాన గోపురంపై కొలువై ఉన్న విమాన వెంకటేశ్వర స్వామివారి దివ్య స్వరూపం.',
    detailedMeaning: `Vimana Venkateswara Swami refers to the sacred image of Lord Venkateswara carved on the north-west side of the golden Ananda Nilayam Vimanam tower over the sanctum.

Ancient scriptures decree that darshan of Vimana Venkateswara Swami is equal in spiritual merit to darshan of the Moola Virat inside the Sanctum Sanctorum.`,
    detailedMeaningTe: `ఆనంద నిలయ సువర్ణ విమాన గోపురంపై వాయవ్య దిశలో కొలువై ఉన్న దివ్య రూపమే విమాన వెంకటేశ్వర స్వామి.

ఈ గోపుర వెంకటేశ్వర స్వామివారిని దర్శించడం గర్భాలయంలోని మూలవిరాట్‌ను దర్శించినంత సమాన ఫలాన్ని ఇస్తుందని విశ్వాసం.`,
    relatedEventKeywords: ['Vimana', 'విమాన', 'Ananda Nilayam']
  },
  {
    id: 'vaikhanasa-aradhana',
    term: 'Tirumala Temple - Vaikhanasa Bhagavad Aradhana',
    termTe: 'తిరుమల ఆలయం - వైఖానస భగవదారాధన',
    category: 'sevas',
    shortDesc: 'Ancient Agama worship system of Tirumala temple formulated by Bhagavan Vikhanasa Maharshi.',
    shortDescTe: 'తిరుమల శ్రీవారి ఆలయంలో అనదిగా అమలవుతున్న వైఖానస భగవదారాధనా సంప్రదాయం మరియు విఖనస మహర్షి వైభవం.',
    detailedMeaning: `There exists an ancient and inseparable bond between Tirumala Srivari Temple and the Sri Vaikhanasa Bhagavad Aradhana system. Rishis who were disciples of Bhagavan Vikhanasa Maharshi (a divine incarnation of Lord Vishnu)—namely Atri, Bhrigu, Mareechi, and Kashyapa—authored numerous Vaikhanasa Samhitas under their Guru's divine command and established Vishnu worship on Earth. Mareechi Maharshi worshipped at Mandara Kshetram, Atri Maharshi at Srinivasa Kshetram (Tirumala), Kashyapa at Vishnudhishtana Kshetram, and Bhrigu Maharshi at Subha Kshetram according to Sri Vaikhanasa Agama codes.

**Bhagavan Vikhanasa Maharshi**:
Bhagavan Vikhanasa Maharshi is the mind-born son (Manasa Putra) of Lord Maha Vishnu. Mareechi's Ananda Samhita reveals that Vikhanasa, who composed the Vaikhanasa Sutra of Yajur Veda in primordial times, is an aspect of Brahma himself. Lineal descendants of Vikhanasa Maharshi are renowned as 'Vaikhanasas'.

Lord Vishnu Himself manifested as Vikhanasa. When a comprehensive worship code was required for Lord Maha Vishnu to manifest in Archa-Avatara (iconic idol form) on Earth, Vishnu created Brahma and commanded him to formulate an ideal system of worship. Expressing his inability, Brahma sought guidance. Lord Maha Vishnu then focused His divine meditation upon the entire corpus of Vedas. Consequently, Bhagavan Vikhanasa Maharshi emerged directly from the divine mind of Lord Vishnu holding the four-armed symbols of Vishnu (Shankha, Chakra, Abhaya and Varada Mudras), wearing 12 Urdhva Pundra marks, carrying Kamandalam and Tridandam, decorated with Tulasi and lotus garlands, golden crown, and ear ornaments (Karna Kundalas).

Lord Vishnu commanded Vikhanasa to formulate the sacred Agama scriptures. Deeply meditating on the Vedas, Vikhanasa formulated the exalted Sri Vaikhanasa Kalpa Sutram, which was subsequently expanded by his disciples into the celebrated Sri Vaikhanasa Bhagavad Shastram.

Author: Dr. Nossum Narasimhacharya
(Source: TTD Sapthagiri Magazine, August 2026)`,
    detailedMeaningTe: `తిరుమల శ్రీవారి ఆలయానికి, శ్రీవైఖానస భగవదారాధనా విధానానికి, చాలా ప్రాచీనకాలం నుండి అవినాభావ సంబంధం ఉంది. విష్ణుంశ సంభూతుడైన భగవాన్ విఖనస మహర్షి శిష్యులైన ఋషులు - అత్రి, భృగు, మరీచి, కశ్యపుడు, గురువుగారి ఆదేశం మేరకు అనేక వైఖానస సంహితలను రచించి వాటి ఆధారంగా ఈ భూమండలంలో విష్ణువును ఆరాధించారు. మరీచిమహర్షి మందరక్షేత్రంలో, అత్రి శ్రీనివాస క్షేత్రంలో, కశ్యపుడు విష్ణుధిష్ఠాన క్షేత్రంలో, భృగుమహర్షి శుభక్షేత్రంలో, శ్రీ వైఖానస భగవచ్ఛాస్త్ర విధిగా శ్రీమహావిష్ణువు అర్చారూపాన్ని ఆరాధించారు.

భగవాన్ విఖనస మహర్షి విష్ణుమానసపుత్రుడు. ఆదికాలంలో యజుర్వేదశాఖగా వైఖానస సూత్రాన్ని రచించిన విఖనసుడు స్వయంగా బ్రహ్మ అని మరీచి ఆనందసంహిత తెలియజేస్తోంది. విఖనసమహర్షి వంశీయులే ‘వైఖానసులు’గా ప్రసిద్ధి చెందారు.

విష్ణువే విఖనసుడు. ఆయన వంశస్థులు వైఖానసులు. విష్ణు వంశజుడైన విఖనసుడు ఉపదేశించిన సూత్రం, చాలా ఉత్తమమైంది. భగవంతుడైన మహావిష్ణువు భూలోకంలో అర్చావతార రూపంలో అవతారధించడానికి ఒక సమగ్రమైన ఆరాధన విధానం అవసరమైంది. అందువల్ల మహావిష్ణువు, బ్రహ్మను సృష్టించి, తన ఆరాధనకోసం ఒక సమగ్రమైన విధానాన్ని రూపొందించమని ఆదేశించాడు.

కాని బ్రహ్మదేవుడు తన అశక్తతను తెలియజేయగా, అప్పుడు శ్రీమహావిష్ణువు తన మనస్సులో సమస్త వేదరాశిమీద దృష్టి నిలిపి ధ్యానించాడు. తత్ఫలితంగా, భగవాన్ విఖనస మహర్షి విష్ణు మనస్సు నుండి ఉద్భవించాడు. సలక్షణంగా, దివ్యమైన తేజస్సుతో విష్ణు చిహ్నాలైన, చతుర్భుజాలు, శంఖ, చక్రాలతో, అభయ వరదహస్తాలతో, ద్వాదశ ఊర్థ్వపుండ్ర ధారియై, కమండలం, త్రిదండం చేతబూని తులసీ, పద్మ మాలలు, కిరీట కర్ణకుండలాలతో వెలుగుందుతున్న విఖనసుడు భగవంతునికి నమస్కరించి “ఆజ్ఞాపించమని” అడుగగా, విష్ణువు తన ఆరాధనకై శాస్త్రాన్ని రూపొందించమని ఆదేశించాడు.

విఖనసుడు వేదరాశి మీద ధ్యానించి మహత్తరమైన శ్రీ వైఖానసకల్పసూత్రాన్ని రూపొందించాడు. ఇదే తర్వాతి కాలంలో విఖనసుడి శిష్యులచే విస్తరింపబడి, శ్రీ వైఖానస భగవచ్ఛాస్త్రం అనే పేరుతో ప్రసిద్ధి చెందింది.

రచయిత: డా॥ నోస్సుం నరసింహాచార్య
(ఆధారం: సప్తగిరి మాసపత్రిక, అగష్టు 2026)`,
    relatedEventKeywords: ['Vaikhanasa', 'వైఖానస', 'Vikhanasa Maharshi', 'Agama']
  },
  {
    id: 'chakrathalwar-sudarshana-chakra',
    term: 'Sudarshana Chakra (Chakrathalwar)',
    termTe: 'సుదర్శన చక్రం (చక్రత్తాళ్వార్)',
    category: 'timing_symbols',
    shortDesc: 'The divine, 108-edged cosmic discus of Lord Vishnu embodying righteousness, protection, and destruction of negativity.',
    shortDescTe: 'శ్రీమహావిష్ణువు ధర్మ రక్షణ, దుష్ట శిక్షణ మరియు భక్త రక్షణ కోసం ధరించిన 108 అంచుల పవిత్ర సుదర్శన చక్రత్తాళ్వార్ స్వరూపం.',
    detailedMeaning: `Chakrathalwar (Sudarshana Alwar) represents the celestial, revolving discus of Supreme Lord Vishnu. Far beyond being just a cosmic weapon, Sudarshana embodies cosmic order, eternal righteousness, spiritual defense, and the total destruction of evil. Celebrated across sacred texts such as the Mahabharata, Bhagavata Purana, and Vishnu Purana, it serves as both a protector of dharma and a force against negativity.

What is the Sudarshana Chakra?
The Sudarshana Chakra is the divine discus of Lord Vishnu, the preserver. Described as a formidable celestial weapon with sharp rotating edges, it symbolizes divine protection, righteousness, and cosmic order. The name combines "Su" (auspicious/divine) and "darshana" (vision), meaning "auspicious or divine vision," while chakra means "wheel" or "that which is constantly in motion."

Creation & Gift of Lord Shiva:
According to Hindu tradition, Vishwakarma, the divine architect, crafted the Sudarshana Chakra using surplus solar energy when reducing the intense brilliance of Sun God Surya to assist his daughter Sanjana. From this energy, Vishwakarma created three divine objects: the Pushpaka Vimana, Shiva's Trident (Trishula), and the powerful Sudarshana Chakra. Furthermore, according to the Linga Purana, Lord Vishnu worshipped Lord Shiva with 1000 lotus flowers to seek assistance against demons. When one lotus was found missing during worship, Lord Vishnu offered one of His own eyes in its place. Moved by this supreme act of devotion, Lord Shiva presented Him the divine Sudarshana Chakra.

Symbolism & Attributes:
- Wheel of Time (Kala Chakra): Mentioned in the Rig Veda, it symbolizes the continuous flow of time through creation, preservation, and dissolution.
- 108 Serrated Edges: Possesses 108 serrated edges, 12 rays (12 months), and 6 hubs (6 seasons), moving constantly under Lord Vishnu's command.
- Cycle of Samsara & Divine Wisdom: The circular form reminds devotees to seek liberation (moksha), while "Sudarshana" signifies clear vision to dispel spiritual ignorance.

Incarnations & Presence in Epics:
- In Ramayana: Incarnated as Shatrughna, the youngest brother of Lord Rama, establishing dharma in Treta Yuga.
- In Mahabharata: Sri Krishna employed the Chakra during Sisupala Vadha, Jayadratha's death (temporarily obscuring the sun), Khandava Dahana, Paundraka Vasudeva Vadha, Dantavakra Vadha, Shalva Vadha, Banasura Yuddha, and Narakasura Vadha.
- In Puranas: Assisted in Samudra Manthan, protected King Ambarisha from Durvasa's curse, rescued Gajendra the elephant king, severed Rahu's head, and divided Sati's body into sacred Shakti Peethas.

Author: Smt. P.S. Pranavi
(Source: TTD Sapthagiri Magazine, English, August 2026)`,
    detailedMeaningTe: `చక్రత్తాళ్వార్ (సుదర్శన ఆళ్వార్) శ్రీమహావిష్ణువు దివ్యాయుధమైన సుదర్శన చక్ర స్వరూపం. కేవలం ఒక ఆయుధం మాత్రమే కాకుండా, ఇది ధర్మ పరిరక్షణ, విశ్వ క్రమం, ఆధ్యాత్మిక రక్షణ మరియు దుష్ట సంహారానికి సంకేతంగా నిలుస్తుంది. మహాభారతం, విష్ణు పురాణం మరియు భాగవత పురాణాలలో ఈ చక్ర వైభవం విశేషంగా వర్ణించబడింది.

ఏమిటీ సుదర్శన చక్రం?
సుదర్శన చక్రం శ్రీమహావిష్ణువు దివ్యాయుధం. సుదర్శన అనగా "సు" (శుభకరమైన/దివ్యమైన) మరియు "దర్శన" (దృష్టి) కలిసి "శుభకరమైన దివ్య దృష్టి" అని అర్థాన్నిస్తాయి. చక్రం అనగా "నిరంతరం తిరిగే చక్రం".

సృష్టి మరియు పరమశివుని దివ్య వరప్రసాదం:
విశ్వకర్మ సూర్యుని అత్యధిక తేజస్సును తగ్గించినప్పుడు, ఆ రశ్మితో పుష్పక విమానం, శివుని త్రిశూలం మరియు విష్ణువు సుదర్శన చక్రాన్ని నిర్మించారు. లింగ పురాణం ప్రకారం విష్ణువు శివుడిని 1000 పద్మాలతో పూజిస్తుండగా ఒక పుష్పం తక్కువకాగా, తన కంటినే సమర్పించారు. ఈ భక్తికి మెచ్చి శివుడు విష్ణువుకు సుదర్శన చక్రాన్ని ప్రసాదించారు.

లక్షణాలు మరియు విశేషాలు:
ఈ చక్రానికి 108 పదునైన అంచులు, 12 మాసాలకు ప్రతీకగా 12 దివ్య రశ్ములు, 6 ఋతువులకు సంకేతంగా 6 కేంద్రాలు ఉంటాయి. వైష్ణవ ఆలయాలలో చక్రత్తాళ్వార్ వెనుక భాగంలో యోగ నరసింహస్వామి కొలువై ఉంటారు. బ్రహ్మోత్సవాలలో చక్రస్నానం మరియు సుదర్శన హోమానికి ఈయనే ప్రధాన దైవం.

ఇతిహాసాలలో ప్రాధాన్యత:
త్రేతాయుగంలో శ్రీరాముని తమ్ముడు శత్రుఘ్నుడిగా సుదర్శన చక్రం అవతరించింది. ద్వాపరయుగంలో శ్రీకృష్ణుని కంస, శిశుపాల, నరకాసుర సంహారాలలో, జయద్రథ వధ సమయంలో సూర్యుడిని కప్పివేయడంలో, గజేంద్ర మోక్షంలో, సతీదేవి శరీర భాగాలను శక్తిపీఠాలుగా చేయడంలో సుదర్శన చక్రం ధర్మాన్ని నిలబెట్టింది.

రచయిత్రి: శ్రీమతి పి.ఎస్. ప్రణవి
(ఆధారం: సప్తగిరి ఆంగ్ల మాసపత్రిక, అగష్టు 2026)`,
    relatedEventKeywords: ['Sudarshana', 'సుదర్శన చక్రం', 'Chakrathalwar', 'Chakra Snanam']
  },
  {
    id: 'andal-tiruvadipooram-festival',
    term: 'Andal Tiruvadipooram Festival in Tirupati',
    termTe: 'తిరుపతిలో ఆండాళ్ తిరువడిపురం ఉత్సవాలు',
    category: 'utsavams',
    shortDesc: 'Annual 10-day grand festival celebrating the Thirunakshatram (Pooradam) of Sri Goda Devi (Andal) in Tirupati.',
    shortDescTe: 'శ్రీ గోవిందరాజస్వామి ఆలయంలో 10 రోజుల పాటు ఆండాళ్ అమ్మవారి తిరునక్షత్రం (ఆడి పూర్వం) సందర్భంగా జరిగే దివ్య ఉత్సవాలు.',
    detailedMeaning: `Tiruvadipooram is the grand annual festival commemorating the divine appearance (Thirunakshatram) of Goddess Andal (Goda Devi) under the Pooram star in the Tamil month of Aadi (Sravana Masam). Born in the sacred Tulasi garden of Srivilliputhur Divya Desam, Andal is revered as the divine avatar of Bhudevi Nachiyar and foster daughter of Periyalwar. She appeared on Earth to guide bound souls (Jivathmas) toward eternal kainkaryam (service) to Lord Sriman Narayana through sweet Tamil poetry.

10-Day Festival Celebrations in Tirupati:
At the ancient Sri Govindaraja Swamy Temple in Tirupati, the Andal Tiruvadipooram festival is celebrated for 10 days with immense devotion:
1. Morning Snapana Thirumanjanam: Every morning, sacred Abhishekam is performed to Sri Govindaraja Swamy and Sri Andal Ammavaru using sanctified water, milk, curd, honey, ghee, coconut water, turmeric, and sandalwood paste alongside continuous Vedic chanting.
2. Procession to Alipiri & Padala Mandapam: In the evening, processional deities move in grand procession from Sri Govindaraja Swamy Temple all the way to Alipiri. At Srivari Padala Mandapam, special pujas and Asthanam are conducted before returning to the temple.
3. Grand Saathumurai: The festival concludes with traditional Saathumurai recitations on the final Aadi Pooram day.

Author: Sri A.S. Ramanujan Iyengar
(Source: TTD Sapthagiri Magazine, English, August 2026)`,
    detailedMeaningTe: `ఆడి (శ్రావణ) మాసంలో 'పూర్వం' నక్షత్రంలో ఉద్భవించిన ఆండాళ్ (గోదాదేవి) దివ్య తిరునక్షత్ర వేడుకే తిరువడిపురం. శ్రీవిల్లిపుత్తూర్ పవిత్ర తులసి తోటలో అవతరించిన గోదాదేవి, భూదేవి అమ్మవారి అవతారంగా, పెరియాళ్వార్ పెంపుడు కుమార్తెగా వైష్ణవ సంప్రదాయంలో పూజలందుకుంటోంది.

తిరుపతిలో 10 రోజుల ఉత్సవ శోభ:
తిరుపతిలోని శ్రీ గోవిందరాజస్వామి ఆలయంలో ఈ ఉత్సవాన్ని 10 రోజుల పాటు కన్నులపండువగా నిర్వహిస్తారు:
1. ఉదయం స్నపన తిరుమంజనం: ప్రతిరోజు ఉదయం శ్రీ గోవిందరాజస్వామి మరియు ఆండాళ్ అమ్మవార్లకు పాలు, పెరుగు, తేనె, నెయ్యి, చందనం, కొబ్బరినీళ్లతో వైభవోపేతంగా అభిషేకం జరుపుతారు.
2. అలిపిరి పాదాల మంటప ఊరేగింపు: సాయంత్రం వేళ ఉత్సవమూర్తులు ఆలయం నుండి అలిపిరి వరకు ఊరేగింపుగా వెళ్తారు. అలిపిరి శ్రీవారి పాదాల మంటపం వద్ద విశేష ఆస్థానం, పూజలు నిర్వహించి తిరిగి ఆలయానికి చేరుకుంటారు.
3. సాత్తుమురై: ఆడి పూర్వం రోజున తిరువడిపురం మహోన్నత సాత్తుమురైతో ఉత్సవాలు ముగుస్తాయి.

రచయిత: శ్రీ ఎ.ఎస్. రామానుజన్ అయ్యంగార్
(ఆధారం: సప్తగిరి ఆంగ్ల మాసపత్రిక, అగష్టు 2026)`,
    relatedEventKeywords: ['Tiruvadipooram', 'తిరువడిపురం', 'Andal', 'Goda Devi', 'Govindaraja']
  },
  {
    id: 'soodikodutha-nachiyar-malai',
    term: 'Soodikodutha Nachiyar Malai (Srivilliputhur to Tirumala Sacred Bond)',
    termTe: 'సూడికొడుత్త నాచ్చియార్ మాల (శ్రీవిల్లిపుత్తూర్ - తిరుమల దివ్య బంధం)',
    category: 'timing_symbols',
    shortDesc: 'Sacred garland worn by Andal in Srivilliputhur ceremonially sent to adorn Lord Venkateswara during Tirumala Garuda Seva.',
    shortDescTe: 'శ్రీవిల్లిపుత్తూరులో ఆండాళ్ అమ్మవారు ధరించిన పవిత్ర పూలమాల తిరుమల గరుడ సేవలో శ్రీవారికి అలంకరించే శతాబ్దాల సంప్రదాయం.',
    detailedMeaning: `The Soodikkodutha Nachiyar Malai is an ultra-sacred floral garland personally worn first by Goddess Andal at Srivilliputhur Divya Desam before being offered to the Lord. Every year, this sanctified garland is ceremonially dispatched from Srivilliputhur to Tirumala.

Garuda Seva Presentation:
On the 5th night of Tirumala Annual Brahmotsavam, during the supreme Garuda Seva, this sacred garland is adorned upon Lord Venkateswara Swamy under the direct supervision of HH Tirumala Pedda Jeeyar Swamiji, Chinna Jeeyar Swamiji, and TTD authorities.

Accompanying Sacred Offerings:
Along with the holy garland, Srivilliputhur temple officials bring:
- Decorative parrots intricately crafted from fresh betel leaves.
- Holy Silk Garments (Pattu Vastram).
- Sacred prasadam associated with Andal's worship.

This centuries-old spiritual tradition highlights the eternal love of Andal and the timeless bond linking Srivilliputhur and Tirumala.

Author: Sri A.S. Ramanujan Iyengar
(Source: TTD Sapthagiri Magazine, English, August 2026)`,
    detailedMeaningTe: `శ్రీవిల్లిపుత్తూర్ దివ్యదేశంలో ఆండాళ్ అమ్మవారు స్వయంగా ధరించి సమర్పించిన పవిత్రమైన పూలమాలనే "సూడికొడుత్త నాచ్చియార్ మాల" అంటారు. ప్రతి సంవత్సరం ఈ పవిత్ర మాలను శ్రీవిల్లిపుత్తూర్ నుండి తిరుమలకు అత్యంత భక్తిశ్రద్ధలతో పంపుతారు.

గరుడ సేవలో అలంకారం:
తిరుమల శ్రీవారి సాలకట్ల బ్రహ్మోత్సవాలలో 5వ రోజు రాత్రి జరిగే అత్యంత ప్రాధాన్య గరుడ సేవలో తిరుమల పెద్ద జీయర్, చిన్న జీయర్ స్వాముల పర్యవేక్షణలో ఈ మాలను శ్రీ వేంకటేశ్వరస్వామివారికి అలంకరిస్తారు.

అనుబంధ పవిత్ర కానుకలు:
మాలతో పాటుగా శ్రీవిల్లిపుత్తూర్ అధికారులు:
- తమలపాకులతో అందంగా తయారు చేసిన చిలుకలు (Betel Leaf Parrots).
- పవిత్ర పట్టు వస్త్రాలు (Pattu Vastram).
- ఆండాళ్ అమ్మవారి ప్రసాదాలను తిరుమలకు ఊరేగింపుగా తెస్తారు.

రచయిత: శ్రీ ఎ.ఎస్. రామానుజన్ అయ్యంగార్
(ఆధారం: సప్తగిరి ఆంగ్ల మాసపత్రిక, అగష్టు 2026)`,
    relatedEventKeywords: ['Soodikodutha', 'సూడికొడుత్త', 'Garuda Seva', 'Srivilliputhur']
  },
  {
    id: 'margazhi-dhanurmasam-celebrations',
    term: 'Margazhi (Dhanurmasam) Celebrations in Tirumala',
    termTe: 'తిరుమలలో మార్గళి (ధనుర్మాస) దివ్య వేడుకలు',
    category: 'utsavams',
    shortDesc: 'Sacred month dedicated to Andal where Thiruppavai replaces Suprabhatam and Krishna receives Ekanta Seva.',
    shortDescTe: 'తిరుమల ఆలయంలో సుప్రభాతం స్థానంలో తిరుప్పావై పఠనం మరియు శ్రీకృష్ణునికి ఏకాంత సేవ జరిగే ధనుర్మాస పవిత్ర నెల.',
    detailedMeaning: `The Tamil month of Margazhi (Dhanurmasam), spanning mid-December to mid-January, is entirely dedicated to Goddess Andal Nachiyar at Tirumala Tirupati.

Unique Temple Ritual Changes:
1. Thiruppavai Recitation: The morning Suprabhatam awakening hymn is suspended and replaced by ThiruppaLLiyezhuchchi and Andal's 30 Thiruppavai Pasurams.
2. Bilva Leaves Archana: Daily Sahasranamarchana is performed using holy Bilva (Bael) leaves instead of traditional Tulsi leaves.
3. Ekanta Seva to Lord Krishna: For all 30 days of Dhanurmasam, night Ekanta Seva is offered to the processional idol of Lord Krishna instead of Lord Venkateswara, strictly following Vaikhanasa Agama Shastram.
4. Special Naivedyams: Special daily offerings include Jaggery Dosa, Mudgannam (Katte Pongali), Sundal, and Seera.

Author: Sri A.S. Ramanujan Iyengar
(Source: TTD Sapthagiri Magazine, English, August 2026)`,
    detailedMeaningTe: `డిసెంబరు సగం నుండి జనవరి సగం వరకు వచ్చే మార్గళి (ధనుర్మాసం) నెల తిరుమల శ్రీవారి ఆలయంలో ఆండాళ్ అమ్మవారికి అత్యంత ప్రీతిపాత్రమైన పవిత్ర సమయం.

ఆలయ దివ్య సంప్రదాయ మార్పులు:
1. తిరుప్పావై పఠనం: ఉదయం వేళ సుప్రభాతం స్థానంలో తిరుప్పళ్లియెఴుచ్చి మరియు ఆండాళ్ రచించిన 30 తిరుప్పావై పాశురాలను గానం చేస్తారు.
2. మారేడు (బిల్వ) దళార్చన: ప్రతిరోజు సహస్రనామార్చనలో తులసికి బదులుగా పవిత్ర మారేడు (బిల్వ) దళాలను ఉపయోగిస్తారు.
3. శ్రీకృష్ణునికి ఏకాంత సేవ: వైఖానస ఆగమ శాస్త్రం ప్రకారం ధనుర్మాసం 30 రోజులూ రాత్రి ఏకాంత సేవ శ్రీవారికి బదులుగా శ్రీకృష్ణ స్వామి ఉత్సవమూర్తికి జరుగుతుంది.
4. విశేష నైవేద్యాలు: బెల్లం దోశ, ముద్గాన్నం (కట్టె పొంగలి), శనగల సుండల్, సీరా రోజువారీ నివేదనగా సమర్పిస్తారు.

రచయిత: శ్రీ ఎ.ఎస్. రామానుజన్ అయ్యంగార్
(ఆధారం: సప్తగిరి ఆంగ్ల మాసపత్రిక, అగష్టు 2026)`,
    relatedEventKeywords: ['Dhanurmasam', 'ధనుర్మాసం', 'Thiruppavai', 'Margazhi']
  },
  {
    id: 'andal-neerattam-utsavam',
    term: 'Andal Neerattam Utsavam at Sri Govindaraja Swamy Temple',
    termTe: 'శ్రీ గోవిందరాజస్వామి ఆలయంలో ఆండాళ్ నీరాట్టం ఉత్సవం',
    category: 'utsavams',
    shortDesc: '7-day sacred Thirumanjanam festival at Ramachandra Teertham concluding with Bhogi Palanquin & Goda-Krishna Kalyanotsavam.',
    shortDescTe: 'రామచంద్ర తీర్థం నీరాట్ట మంటపంలో 7 రోజులు జరిగి భోగి పల్లకీ ఉత్సవం, గోదా-కృష్ణ కల్యాణంతో ముగిసే పవిత్ర పండుగ.',
    detailedMeaning: `Andal Neerattam Utsavam is a unique 7-day Thirumanjanam festival celebrated during Dhanurmasam at TTD Sri Govindaraja Swamy Temple in Tirupati, beginning 7 days prior to Bhogi.

Festival Ritual Progression:
- Daily Procession: Every morning after Dhanurmasa puja, Goddess Andal is taken in a palanquin procession through Mada Streets to the Neerattam Mandapam at Ramachandra Teertham.
- Mandapam Rituals: Special Thirumanjanam, Nivedanam, Sattumurai, and Asthanam are performed at the lake mandapam, returning to the temple in the evening.
- Bhogi Palanquin & Celestial Wedding: On the 8th day (Bhogi), Andal ascends the ornate Bhogi Palanquin alongside Sri Krishna Swamy. Reaching the Andal Sannidhi inside the temple, the grand divine Kalyanotsavam (wedding ceremony) of Goda Devi and Lord Krishna is celebrated with cosmic grandeur.

Author: Sri A.S. Ramanujan Iyengar
(Source: TTD Sapthagiri Magazine, English, August 2026)`,
    detailedMeaningTe: `తిరుపతి శ్రీ గోవిందరాజస్వామి ఆలయంలో ధనుర్మాసంలో భోగి పండుగకు 7 రోజుల ముందు ప్రారంభమయ్యే పవిత్ర స్నాన ఉత్సవమే ఆండాళ్ నీరాట్టం ఉత్సవం.

ఉత్సవ క్రమం:
- రామచంద్ర తీర్థ ఊరేగింపు: ప్రతిరోజు ఉదయం పూజల అనంతరం ఆండాళ్ అమ్మవారు పల్లకీపై మాడ వీధుల గుండా రామచంద్ర తీర్థంలో ఉన్న నీరాట్ట మంటపానికి వేంచేస్తారు.
- స్నపన తిరుమంజనం: మంటపంలో విశేష తిరుమంజనం, నివేదన, సాత్తుమురై, ఆస్థానం ముగిసి సాయంత్రం తిరిగి ఆలయానికి చేరుకుంటారు.
- భోగి పల్లకి & శ్రీ గోదా-కృష్ణ కల్యాణం: 8వ రోజు (భోగి) నాడు శ్రీకృష్ణ స్వామితో కలిసి ఆండాళ్ అమ్మవారు భోగి పల్లకీపై ఊరేగి, ఆలయంలోని ఆండాళ్ సన్నిధిలో దివ్య కల్యాణోత్సవాన్ని వైభవంగా జరుపుకుంటారు.

రచయిత: శ్రీ ఎ.ఎస్. రామానుజన్ అయ్యంగార్
(ఆధారం: సప్తగిరి ఆంగ్ల మాసపత్రిక, అగష్టు 2026)`,
    relatedEventKeywords: ['Neerattam', 'నీరాట్టం', 'Bhogi', 'Goda Kalyanotsavam']
  },
  {
    id: 'sri-godadevi-parinayotsavam',
    term: 'Sri Godadevi Parinayotsavam',
    termTe: 'శ్రీ గోదాదేవి పరిణయోత్సవం',
    category: 'utsavams',
    shortDesc: 'Kanuma day festival where sacred garlands brought from Sri Govindaraja Swamy Temple adorn Tirumala Moola Virat.',
    shortDescTe: 'కనుమ పండుగ నాడు తిరుపతి శ్రీ గోవిందరాజస్వామి ఆలయం నుండి తెచ్చిన గోదాదేవి పూలమాలలను తిరుమల మూలవిరాట్‌కు అలంకరించే సేవ.',
    detailedMeaning: `Sri Godadevi Parinayotsavam is a celebrated annual tradition observed on Kanuma day (the day following Makara Sankranti).

Ritual Procession to Tirumala Sanctum:
Sacred garlands presented by Sri Godadevi (Andal) at Sri Govindaraja Swamy Temple in Tirupati are brought uphill to Tirumala. The holy garlands first arrive at the Pedda Jeeyar Mutt at Tirumala. From there, accompanied by Mangala Vaidyams (auspicious temple nadaswaram music), they are taken in grand procession into Srivari Temple and reverently adorned upon the Moola Virat presiding deity of Lord Venkateswara.

Author: Sri A.S. Ramanujan Iyengar
(Source: TTD Sapthagiri Magazine, English, August 2026)`,
    detailedMeaningTe: `ప్రతి సంవత్సరం కనుమ పండుగ నాడు తిరుమల శ్రీవారి ఆలయంలో జరిగే దివ్య వేడుకే 'శ్రీ గోదాదేవి పరిణయోత్సవం'.

శ్రీవారికి మాలల అలంకారం:
తిరుపతి శ్రీ గోవిందరాజస్వామి ఆలయంలోని గోదాదేవి అమ్మవారి పవిత్ర పూలమాలలను తిరుమలకు తీసుకువస్తారు. మొదట తిరుమల పెద్ద జీయర్ మఠానికి చేరిన ఈ మాలలను, అక్కడి నుండి మంగళ వాయిద్యాలతో శ్రీవారి ఆలయానికి ఊరేగింపుగా తీసుకెళ్లి గర్భాలయంలోని మూలవిరాట్ వేంకటేశ్వరస్వామికి భక్తితో అలంకరిస్తారు.

రచయిత: శ్రీ ఎ.ఎస్. రామానుజన్ అయ్యంగార్
(ఆధారం: సప్తగిరి ఆంగ్ల మాసపత్రిక, అగష్టు 2026)`,
    relatedEventKeywords: ['Godadevi Parinayotsavam', 'గోదాదేవి పరిణయోత్సవం', 'Kanuma']
  }
];
