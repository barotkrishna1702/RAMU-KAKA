/* =============================================
   RAMU KAKA — Mock Data: Crops, Weather, Prices
   ============================================= */

export const crops = [
  { id: 'rice', hi: 'धान', en: 'Rice', emoji: '🌾', season: 'kharif', color: '#4CAF50', stages: ['बुवाई', 'रोपाई', 'कल्ले निकलना', 'फूल आना', 'दाना भरना', 'कटाई'], waterNeedPerAcre: 4500, diseases: ['blast', 'blight', 'sheath_rot'] },
  { id: 'wheat', hi: 'गेहूँ', en: 'Wheat', emoji: '🌿', season: 'rabi', color: '#FF9800', stages: ['बुवाई', 'अंकुरण', 'कल्ले', 'बूट', 'बाली', 'पकना', 'कटाई'], waterNeedPerAcre: 2200, diseases: ['rust', 'karnal_bunt', 'loose_smut'] },
  { id: 'cotton', hi: 'कपास', en: 'Cotton', emoji: '☁️', season: 'kharif', color: '#F5F5F5', stages: ['बुवाई', 'अंकुरण', 'शाखाएँ', 'फूल', 'टिंडे', 'खिलना', 'चुगाई'], waterNeedPerAcre: 3500, diseases: ['bollworm', 'whitefly', 'leaf_curl'] },
  { id: 'sugarcane', hi: 'गन्ना', en: 'Sugarcane', emoji: '🎋', season: 'annual', color: '#8BC34A', stages: ['बुवाई', 'अंकुरण', 'कल्ले', 'बढ़वार', 'पकना', 'कटाई'], waterNeedPerAcre: 8000, diseases: ['red_rot', 'smut', 'wilt'] },
  { id: 'soybean', hi: 'सोयाबीन', en: 'Soybean', emoji: '🫘', season: 'kharif', color: '#795548', stages: ['बुवाई', 'अंकुरण', 'शाखाएँ', 'फूल', 'फलियाँ', 'पकना', 'कटाई'], waterNeedPerAcre: 2000, diseases: ['rust', 'yellow_mosaic', 'pod_borer'] },
  { id: 'tomato', hi: 'टमाटर', en: 'Tomato', emoji: '🍅', season: 'both', color: '#F44336', stages: ['रोपाई', 'बढ़वार', 'फूल', 'फल लगना', 'पकना', 'तुड़ाई'], waterNeedPerAcre: 3000, diseases: ['early_blight', 'late_blight', 'leaf_curl'] },
  { id: 'onion', hi: 'प्याज', en: 'Onion', emoji: '🧅', season: 'rabi', color: '#9C27B0', stages: ['रोपाई', 'बढ़वार', 'कंद बनना', 'पकना', 'खुदाई'], waterNeedPerAcre: 2500, diseases: ['purple_blotch', 'downy_mildew', 'thrips'] },
  { id: 'potato', hi: 'आलू', en: 'Potato', emoji: '🥔', season: 'rabi', color: '#A1887F', stages: ['बुवाई', 'अंकुरण', 'बढ़वार', 'कंद बनना', 'पकना', 'खुदाई'], waterNeedPerAcre: 2800, diseases: ['late_blight', 'early_blight', 'black_scurf'] }
];

export const mandiPrices = [
  { crop: 'rice', mandi: 'आज़ादपुर', state: 'दिल्ली', price: 2850, prevPrice: 2780, unit: 'क्विंटल', date: '2026-08-16' },
  { crop: 'wheat', mandi: 'इंदौर', state: 'मध्य प्रदेश', price: 2680, prevPrice: 2720, unit: 'क्विंटल', date: '2026-08-16' },
  { crop: 'cotton', mandi: 'राजकोट', state: 'गुजरात', price: 7200, prevPrice: 7050, unit: 'क्विंटल', date: '2026-08-16' },
  { crop: 'soybean', mandi: 'लातूर', state: 'महाराष्ट्र', price: 4850, prevPrice: 4900, unit: 'क्विंटल', date: '2026-08-16' },
  { crop: 'tomato', mandi: 'नासिक', state: 'महाराष्ट्र', price: 1250, prevPrice: 980, unit: 'क्विंटल', date: '2026-08-16' },
  { crop: 'onion', mandi: 'लासलगाँव', state: 'महाराष्ट्र', price: 2100, prevPrice: 2250, unit: 'क्विंटल', date: '2026-08-16' },
  { crop: 'potato', mandi: 'आगरा', state: 'उत्तर प्रदेश', price: 1380, prevPrice: 1350, unit: 'क्विंटल', date: '2026-08-16' },
  { crop: 'sugarcane', mandi: 'मुज़फ़्फ़रनगर', state: 'उत्तर प्रदेश', price: 350, prevPrice: 345, unit: 'क्विंटल', date: '2026-08-16' },
  { crop: 'rice', mandi: 'करनाल', state: 'हरियाणा', price: 2920, prevPrice: 2880, unit: 'क्विंटल', date: '2026-08-16' },
  { crop: 'wheat', mandi: 'खन्ना', state: 'पंजाब', price: 2750, prevPrice: 2700, unit: 'क्विंटल', date: '2026-08-16' },
  { crop: 'soybean', mandi: 'इंदौर', state: 'मध्य प्रदेश', price: 4780, prevPrice: 4820, unit: 'क्विंटल', date: '2026-08-16' },
  { crop: 'tomato', mandi: 'कोलार', state: 'कर्नाटक', price: 1450, prevPrice: 1100, unit: 'क्विंटल', date: '2026-08-16' }
];

export const products = [
  // Seeds
  { id: 1, name: 'हाइब्रिड धान बीज (PRH-10)', en: 'Hybrid Paddy Seed PRH-10', category: 'seeds', brand: 'राष्ट्रीय बीज निगम', price: 280, unit: 'kg', rating: 4.5, image: '🌾', description: 'उच्च उपज देने वाला हाइब्रिड धान बीज, 120 दिन में तैयार' },
  { id: 2, name: 'गेहूँ HD-3226', en: 'Wheat HD-3226', category: 'seeds', brand: 'IARI', price: 65, unit: 'kg', rating: 4.7, image: '🌿', description: 'रोग प्रतिरोधक गेहूँ की उन्नत किस्म' },
  { id: 3, name: 'टमाटर अर्का रक्षक बीज', en: 'Tomato Arka Rakshak Seed', category: 'seeds', brand: 'IIHR', price: 450, unit: '10g', rating: 4.3, image: '🍅', description: 'तीन रोगों के प्रतिरोधक' },
  { id: 4, name: 'BG-II Bt कपास बीज', en: 'BG-II Bt Cotton Seed', category: 'seeds', brand: 'महायोद्धा', price: 930, unit: 'pkt', rating: 4.4, image: '☁️', description: 'बॉलवॉर्म प्रतिरोधक Bt कपास' },
  // Fertilizers
  { id: 5, name: 'यूरिया (46% N)', en: 'Urea (46% N)', category: 'fertilizers', brand: 'IFFCO', price: 267, unit: '45kg', rating: 4.6, image: '🧪', description: 'नाइट्रोजन युक्त प्रमुख खाद' },
  { id: 6, name: 'DAP (18:46:0)', en: 'DAP (18:46:0)', category: 'fertilizers', brand: 'IFFCO', price: 1350, unit: '50kg', rating: 4.5, image: '⚗️', description: 'फॉस्फोरस युक्त बुवाई के समय की खाद' },
  { id: 7, name: 'जैविक खाद (वर्मीकम्पोस्ट)', en: 'Vermicompost', category: 'fertilizers', brand: 'गोबर गोल्ड', price: 180, unit: '25kg', rating: 4.8, image: '🌱', description: 'शुद्ध जैविक केंचुआ खाद' },
  { id: 8, name: 'NPK 20:20:20', en: 'NPK 20:20:20', category: 'fertilizers', brand: 'IPL', price: 890, unit: '25kg', rating: 4.4, image: '🧬', description: 'संतुलित पोषक तत्व' },
  // Pesticides
  { id: 9, name: 'इमिडाक्लोप्रिड 17.8 SL', en: 'Imidacloprid 17.8 SL', category: 'pesticides', brand: 'बायर', price: 420, unit: '250ml', rating: 4.3, image: '🛡️', description: 'रस चूसने वाले कीटों के लिए' },
  { id: 10, name: 'मैंकोज़ेब 75 WP', en: 'Mancozeb 75 WP', category: 'pesticides', brand: 'इंडोफिल', price: 320, unit: '500g', rating: 4.5, image: '🔬', description: 'फफूँद रोगों के लिए कवकनाशी' },
  { id: 11, name: 'नीम तेल (Azadirachtin)', en: 'Neem Oil', category: 'pesticides', brand: 'जैव पावर', price: 280, unit: '1L', rating: 4.7, image: '🌿', description: 'जैविक कीटनाशक - सुरक्षित और प्रभावी' },
  { id: 12, name: 'ट्राइकोडर्मा विरिडी', en: 'Trichoderma Viride', category: 'pesticides', brand: 'बायो शक्ति', price: 190, unit: '1kg', rating: 4.6, image: '🦠', description: 'जैव-नियंत्रण एजेंट - मिट्टी जनित रोगों के लिए' },
  // Tools
  { id: 13, name: 'बैटरी स्प्रे पंप (16L)', en: 'Battery Spray Pump 16L', category: 'tools', brand: 'किसान किंग', price: 2800, unit: 'piece', rating: 4.4, image: '💦', description: '12V बैटरी संचालित, 5 घंटे की बैटरी' },
  { id: 14, name: 'हैंड सीड ड्रिल', en: 'Hand Seed Drill', category: 'tools', brand: 'अमूल एग्रो', price: 1500, unit: 'piece', rating: 4.2, image: '🔧', description: 'छोटे खेतों के लिए बीज बोने का यंत्र' },
  { id: 15, name: 'खुरपी सेट (5 पीस)', en: 'Weeding Tool Set (5pc)', category: 'tools', brand: 'फार्म फ्रेंड', price: 450, unit: 'set', rating: 4.6, image: '⛏️', description: 'स्टेनलेस स्टील, एर्गोनोमिक हैंडल' },
  { id: 16, name: 'सोलर वाटर पंप 1HP', en: 'Solar Water Pump 1HP', category: 'tools', brand: 'टाटा पावर सोलर', price: 45000, unit: 'piece', rating: 4.8, image: '☀️', description: 'सौर ऊर्जा से चलने वाला पंप' },
  // Bio-Inputs
  { id: 17, name: 'राइज़ोबियम कल्चर', en: 'Rhizobium Culture', category: 'bioInputs', brand: 'IARI', price: 85, unit: '200g', rating: 4.5, image: '🧫', description: 'दलहनी फसलों के लिए जैव-उर्वरक' },
  { id: 18, name: 'PSB (फॉस्फोरस घोलक जीवाणु)', en: 'PSB Culture', category: 'bioInputs', brand: 'जैव प्रयोग', price: 95, unit: '500ml', rating: 4.4, image: '🔬', description: 'फॉस्फोरस उपलब्धता बढ़ाने वाला' }
];

export const diseases = [
  {
    id: 'blast',
    crop: 'rice',
    hi: 'ब्लास्ट (झुलसा रोग)',
    en: 'Rice Blast',
    scientific: 'Magnaporthe oryzae',
    severity: 'severe',
    symptoms: ['पत्तियों पर हीरे के आकार के धब्बे', 'गर्दन पर भूरे-काले घाव', 'बाली टूटकर गिरना'],
    organicTreatment: ['ट्राइकोडर्मा विरिडी 5g/L पानी में घोलकर छिड़काव', 'नीम तेल 5ml/L', 'स्यूडोमोनास फ्लूरेसेंस 10g/L'],
    chemicalTreatment: ['ट्राइसाइक्लाज़ोल 75 WP @ 0.6g/L', 'कार्बेन्डाज़िम 50 WP @ 1g/L', 'इसोप्रोथियोलेन 40 EC @ 1.5ml/L'],
    prevention: ['प्रतिरोधक किस्मों का चयन', 'बीज उपचार', 'नाइट्रोजन खाद की अधिकता से बचें', 'रोगग्रस्त पौधों के अवशेष हटाएँ'],
    linkedProducts: [11, 12, 10]
  },
  {
    id: 'early_blight',
    crop: 'tomato',
    hi: 'अगेती झुलसा',
    en: 'Early Blight',
    scientific: 'Alternaria solani',
    severity: 'moderate',
    symptoms: ['पत्तियों पर गोल भूरे धब्बे जिनमें छल्ले दिखते हैं', 'धब्बे पीले घेरे से घिरे', 'तने पर काले-भूरे घाव'],
    organicTreatment: ['नीम तेल 3ml/L + बेकिंग सोडा 5g/L', 'ट्राइकोडर्मा विरिडी 5g/L', 'बॉर्डो मिक्सचर 1%'],
    chemicalTreatment: ['मैंकोज़ेब 75 WP @ 2.5g/L', 'क्लोरोथैलोनिल 75 WP @ 2g/L', 'एज़ोक्सीस्ट्रोबिन 23 SC @ 1ml/L'],
    prevention: ['फसल चक्र अपनाएँ', 'पर्याप्त दूरी रखें', 'निचली पत्तियाँ हटाएँ', 'ड्रिप सिंचाई का उपयोग करें'],
    linkedProducts: [10, 11]
  },
  {
    id: 'leaf_curl',
    crop: 'cotton',
    hi: 'पत्ती मोड़ (लीफ कर्ल)',
    en: 'Cotton Leaf Curl Virus',
    scientific: 'CLCuV (Begomovirus)',
    severity: 'severe',
    symptoms: ['पत्तियाँ ऊपर या नीचे की ओर मुड़ना', 'पत्तियों पर मोटी नसें', 'पत्ती पर एनेशन (अतिरिक्त वृद्धि)', 'पौधा बौना रह जाना'],
    organicTreatment: ['नीम तेल 5ml/L + साबुन 1g/L हर 10 दिन', 'पीले चिपचिपे ट्रैप लगाएँ', 'मित्र कीटों को बढ़ावा दें'],
    chemicalTreatment: ['इमिडाक्लोप्रिड 17.8 SL @ 0.3ml/L (सफ़ेद मक्खी के लिए)', 'ऐसीटामिप्रिड 20 SP @ 0.2g/L', 'डायफ़ेंथिउरॉन 50 WP @ 1g/L'],
    prevention: ['Bt किस्मों का उपयोग', 'सफ़ेद मक्खी नियंत्रण', 'रोगग्रस्त पौधे तुरंत उखाड़ें', 'ट्रैप क्रॉप (भिंडी) लगाएँ'],
    linkedProducts: [9, 11]
  },
  {
    id: 'rust',
    crop: 'wheat',
    hi: 'रतुआ / गेरुआ रोग',
    en: 'Wheat Rust',
    scientific: 'Puccinia spp.',
    severity: 'moderate',
    symptoms: ['पत्तियों पर नारंगी-भूरे रंग के छोटे-छोटे फफोले', 'तने पर काले फफोले (ब्लैक रस्ट)', 'पत्तियों का सूखना'],
    organicTreatment: ['सल्फर 80 WP @ 3g/L', 'बॉर्डो मिक्सचर 1%', 'नीम तेल 5ml/L'],
    chemicalTreatment: ['प्रोपिकोनाज़ोल 25 EC @ 1ml/L', 'टेबुकोनाज़ोल 25.9 EC @ 1ml/L', 'मैंकोज़ेब 75 WP @ 2.5g/L'],
    prevention: ['प्रतिरोधक किस्में उगाएँ', 'समय पर बुवाई करें', 'अत्यधिक नाइट्रोजन न डालें'],
    linkedProducts: [10, 11]
  },
  {
    id: 'purple_blotch',
    crop: 'onion',
    hi: 'बैंगनी धब्बा रोग',
    en: 'Purple Blotch',
    scientific: 'Alternaria porri',
    severity: 'moderate',
    symptoms: ['पत्तियों पर बैंगनी-भूरे अंडाकार धब्बे', 'धब्बों पर पीला किनारा', 'गर्दन क्षेत्र में सड़न'],
    organicTreatment: ['ट्राइकोडर्मा विरिडी 5g/L', 'नीम तेल 3ml/L', 'बॉर्डो मिक्सचर 0.5%'],
    chemicalTreatment: ['मैंकोज़ेब 75 WP @ 2.5g/L', 'क्लोरोथैलोनिल 75 WP @ 2g/L'],
    prevention: ['बीज उपचार करें', 'जल निकासी अच्छी रखें', 'फसल चक्र अपनाएँ'],
    linkedProducts: [10, 12]
  }
];

export const weatherData = {
  current: {
    temp: 32,
    feelsLike: 35,
    humidity: 78,
    windSpeed: 12,
    windDir: 'SW',
    condition: 'partly_cloudy',
    conditionHi: 'आंशिक बादल',
    conditionEn: 'Partly Cloudy',
    emoji: '⛅',
    rainChance: 40,
    uvIndex: 7,
    pressure: 1008,
    sprayable: false,
    sprayReasonHi: 'हवा तेज़ है, बारिश की संभावना — कल सुबह छिड़काव करें',
    sprayReasonEn: 'High wind, rain possible — spray tomorrow morning'
  },
  forecast: [
    { day: 'आज', dayEn: 'Today', emoji: '⛅', high: 33, low: 25, rain: 40 },
    { day: 'कल', dayEn: 'Tomorrow', emoji: '🌧️', high: 30, low: 24, rain: 80 },
    { day: 'सोम', dayEn: 'Mon', emoji: '🌧️', high: 29, low: 23, rain: 70 },
    { day: 'मंगल', dayEn: 'Tue', emoji: '⛅', high: 31, low: 24, rain: 30 },
    { day: 'बुध', dayEn: 'Wed', emoji: '☀️', high: 34, low: 25, rain: 10 },
    { day: 'गुरु', dayEn: 'Thu', emoji: '☀️', high: 35, low: 26, rain: 5 },
    { day: 'शुक्र', dayEn: 'Fri', emoji: '⛅', high: 33, low: 25, rain: 25 }
  ]
};

export const farmRecords = [
  { id: 1, type: 'planting', crop: 'rice', field: 'खेत #1', date: '2026-07-15', details: 'धान की रोपाई — PRH-10 किस्म, 25×15 cm दूरी', cost: 3500 },
  { id: 2, type: 'fertilizer', crop: 'rice', field: 'खेत #1', date: '2026-07-28', details: 'यूरिया 50 kg/एकड़ — पहली टॉप ड्रेसिंग', cost: 300 },
  { id: 3, type: 'spraying', crop: 'rice', field: 'खेत #1', date: '2026-08-05', details: 'इमिडाक्लोप्रिड 0.3ml/L — तना छेदक के लिए', cost: 450 },
  { id: 4, type: 'irrigation', crop: 'rice', field: 'खेत #1', date: '2026-08-10', details: 'सिंचाई — 5 cm पानी खड़ा किया', cost: 200 },
  { id: 5, type: 'fertilizer', crop: 'rice', field: 'खेत #1', date: '2026-08-14', details: 'DAP 25 kg/एकड़ + पोटाश 20 kg/एकड़', cost: 850 }
];

export const techniques = [
  {
    id: 1,
    category: 'sowing',
    crop: 'rice',
    title: 'धान की SRI (श्री) विधि से रोपाई',
    titleEn: 'SRI Method of Rice Transplanting',
    icon: '🌱',
    color: '#4CAF50',
    description: 'SRI विधि से 50% कम बीज और 40% कम पानी में अधिक उपज प्राप्त करें',
    steps: [
      '8-12 दिन की छोटी पौध का उपयोग करें',
      '25 × 25 cm की दूरी पर एक-एक पौध लगाएँ',
      'रोपाई के बाद हल्का पानी रखें, खेत सूखने दें, फिर पानी दें',
      'वीडर से 10-12 दिन के अंतराल पर निराई करें',
      'जैविक खाद का उपयोग प्राथमिकता दें'
    ]
  },
  {
    id: 2,
    category: 'spacing',
    crop: 'tomato',
    title: 'टमाटर की सही दूरी और स्टेकिंग',
    titleEn: 'Tomato Spacing and Staking',
    icon: '📏',
    color: '#F44336',
    description: 'सही दूरी से हवा का संचार बढ़ता है और रोग कम होते हैं',
    steps: [
      'कतार से कतार: 60-75 cm, पौधे से पौधे: 45-60 cm',
      'रोपाई के 15 दिन बाद बाँस या तार से सहारा दें',
      'मल्चिंग (पलवार) बिछाएँ — खरपतवार कम होगी',
      'निचली पत्तियाँ और साइड शूट (सकर) हटाएँ',
      'ड्रिप सिंचाई सबसे उत्तम'
    ]
  },
  {
    id: 3,
    category: 'intercropping',
    crop: 'sugarcane',
    title: 'गन्ने में अंतर-फसल लेना',
    titleEn: 'Intercropping in Sugarcane',
    icon: '🌿',
    color: '#8BC34A',
    description: 'गन्ने की पंक्तियों में अंतर-फसल लेकर अतिरिक्त आय और मिट्टी सुधार',
    steps: [
      'गन्ने की दो पंक्तियों के बीच 90-120 cm रखें',
      'मूँग/उड़द (60 दिन) लें — नाइट्रोजन भी जमा होगी',
      'आलू/लहसुन शरदकालीन अंतर-फसल के रूप में',
      'धनिया/मेथी सब्ज़ी के लिए ले सकते हैं',
      'अंतर-फसल की कटाई के बाद गन्ने को मिट्टी चढ़ाएँ'
    ]
  },
  {
    id: 4,
    category: 'pruning',
    crop: 'cotton',
    title: 'कपास में टॉपिंग और छँटाई',
    titleEn: 'Cotton Topping and Pruning',
    icon: '✂️',
    color: '#607D8B',
    description: 'सही समय पर टॉपिंग से पौधे की ऊँचाई नियंत्रित और टिंडे अधिक',
    steps: [
      '90-100 दिन पर पौधे का शीर्ष (टॉप) तोड़ दें',
      'पौधा 4-5 फीट से ज़्यादा न बढ़ने दें',
      'सूखी और रोगग्रस्त शाखाएँ हटाएँ',
      'जमीन के पास की शाखाएँ काटें — हवा संचार बढ़ेगा',
      'कटाई/छँटाई सुबह के समय करें — घाव जल्दी भरेंगे'
    ]
  },
  {
    id: 5,
    category: 'harvesting',
    crop: 'wheat',
    title: 'गेहूँ की कटाई का सही समय',
    titleEn: 'Right Time for Wheat Harvesting',
    icon: '🌾',
    color: '#FF9800',
    description: 'सही समय पर कटाई से दाने का वज़न और गुणवत्ता अधिकतम',
    steps: [
      'जब दाने में नमी 20-25% हो तब कटाई करें',
      'बाली को दबाने पर दाना कठोर लगे',
      'पौधा पीला हो जाए और तना सूखने लगे',
      'कम्बाइन हार्वेस्टर या दरांती से कटाई करें',
      'कटाई के बाद 2-3 दिन धूप में सुखाएँ (नमी 12% तक लाएँ)',
      'साफ़ बोरियों में भण्डारण करें'
    ]
  }
];

export const fieldData = {
  fields: [
    {
      id: 1,
      name: 'खेत #1 — मुख्य',
      area: 5.2,
      unit: 'acres',
      crop: 'rice',
      stage: 3,
      ndviAvg: 0.72,
      soilMoisture: 65,
      healthZones: { healthy: 72, stressed: 22, critical: 6 },
      nutrients: { nitrogen: 'low', phosphorus: 'ok', potassium: 'low' },
      center: [26.85, 80.91],
      bounds: [[26.848, 80.908], [26.852, 80.908], [26.852, 80.912], [26.848, 80.912]]
    },
    {
      id: 2,
      name: 'खेत #2 — पिछला',
      area: 3.1,
      unit: 'acres',
      crop: 'soybean',
      stage: 4,
      ndviAvg: 0.58,
      soilMoisture: 42,
      healthZones: { healthy: 55, stressed: 35, critical: 10 },
      nutrients: { nitrogen: 'ok', phosphorus: 'low', potassium: 'ok' },
      center: [26.853, 80.915],
      bounds: [[26.851, 80.913], [26.855, 80.913], [26.855, 80.917], [26.851, 80.917]]
    }
  ],
  irrigationAdvice: {
    shouldIrrigate: false,
    reason: 'कल भारी बारिश (80% संभावना) की उम्मीद है — सिंचाई रोकें',
    reasonEn: 'Heavy rain expected tomorrow (80% chance) — hold back irrigation',
    nextIrrigationDate: '2026-08-19',
    waterNeeded: 3200,
    cropStage: 'कल्ले निकलना (Tillering)',
    etIndicator: 5.2
  }
};
