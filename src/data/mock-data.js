/* =======================================================
   RAMU KAKA — Realistic Farm Demo Dataset (Section 19)
   Farmer: Rajesh Patel | Farm: 3.5 Acres
   ======================================================= */

export const farmData = {
  farmer: {
    name: 'राजेश पटेल',
    nameEn: 'Rajesh Patel',
    village: 'कन्नौज (Kannauj)',
    state: 'उत्तर प्रदेश (UP)',
    totalArea: 3.5,
    unit: 'एकड़ (Acres)'
  },
  weather: {
    temp: 28,
    humidity: 82,
    condition: '🌦️ हल्की धूप व बादल',
    conditionEn: 'Partly Cloudy & Humid',
    rainTomorrowChance: 78,
    windSpeed: 14,
    spraySuitability: 'कल बारिश है — छिड़काव न करें (Do not spray)',
    irrigationRecommendation: '💧 आज पानी रोक दो। कल अच्छी बारिश का अनुमान है।'
  },
  fields: [
    {
      id: 'field-1',
      name: 'खेत 1 (उत्तर दिशा)',
      nameEn: 'Field 1 (North Parcel)',
      crop: 'rice',
      cropName: 'धान (Rice)',
      variety: 'PRH-10 हाइब्रिड',
      stage: 'वानस्पतिक चरण (Vegetative Stage)',
      area: 2.4,
      unit: 'एकड़',
      status: 'healthy',
      healthDistribution: { healthy: 82, monitor: 14, stress: 4 },
      soilMoisture: 68,
      lastIrrigated: '10 अगस्त 2026',
      center: [26.8505, 80.9102],
      polygon: [
        [26.8485, 80.9075],
        [26.8525, 80.9078],
        [26.8522, 80.9130],
        [26.8482, 80.9125]
      ],
      recommendation: {
        title: '💧 आज सिंचाई की आवश्यकता नहीं है',
        desc: 'मिट्टी में 68% नमी है और कल भारी वर्षा की संभावना है।',
        actionLabel: 'विवरण (Why?)',
        actionType: 'why'
      }
    },
    {
      id: 'field-2',
      name: 'खेत 2 (दक्षिण दिशा)',
      nameEn: 'Field 2 (South Parcel)',
      crop: 'tomato',
      cropName: 'टमाटर (Tomato)',
      variety: 'अर्का रक्षक (Arka Rakshak)',
      stage: 'फूल आने का चरण (Flowering Stage)',
      area: 1.1,
      unit: 'एकड़',
      status: 'stress',
      healthDistribution: { healthy: 55, monitor: 25, stress: 20 },
      soilMoisture: 52,
      lastIrrigated: '08 अगस्त 2026',
      center: [26.8540, 80.9165],
      polygon: [
        [26.8528, 80.9140],
        [26.8555, 80.9145],
        [26.8550, 80.9188],
        [26.8524, 80.9180]
      ],
      recommendation: {
        title: '🔴 खेत 2 की आज तुरंत जांच करें',
        desc: 'रामू ने दक्षिण-पूर्वी कोने में फसल तनाव (Early Blight लक्षण) पहचाना है।',
        actionLabel: 'खेत देखें (View Field)',
        actionType: 'view_field'
      }
    }
  ]
};

export const mandiPricesData = [
  {
    id: 'mandi-b',
    name: 'मंडी B (कन्नौज मुख्य)',
    nameEn: 'Mandi B (Kannauj Main)',
    crop: 'धान (Rice)',
    price: 2520,
    unit: 'क्विंटल',
    distance: '8 km',
    isBest: true,
    badgeText: '⭐ सर्वश्रेष्ठ भाव (BEST PRICE)'
  },
  {
    id: 'mandi-a',
    name: 'मंडी A (तिर्वा)',
    nameEn: 'Mandi A (Tirwa)',
    crop: 'धान (Rice)',
    price: 2450,
    unit: 'क्विंटल',
    distance: '4 km',
    isBest: false,
    badgeText: 'पास में (Nearby)'
  },
  {
    id: 'mandi-c',
    name: 'मंडी C (छिबरामऊ)',
    nameEn: 'Mandi C (Chhibramau)',
    crop: 'धान (Rice)',
    price: 2390,
    unit: 'क्विंटल',
    distance: '18 km',
    isBest: false,
    badgeText: 'दूरी पर (18 km)'
  }
];

export const sellingRoutes = [
  {
    id: 'mandi',
    type: 'mandi',
    icon: '🟩',
    title: 'मंडी (Mandi)',
    route: 'Mandi B',
    rate: '₹2,520 / q',
    desc: 'नकद भुगतान, उच्चतम सरकारी दर'
  },
  {
    id: 'buyer',
    type: 'buyer',
    icon: '🟨',
    title: 'स्थानीय खरीदार (Local Buyer)',
    route: 'गाँव का व्यापारी',
    rate: '₹2,480 / q',
    desc: 'खेत से सीधी उठान, कोई भाड़ा नहीं'
  },
  {
    id: 'direct',
    type: 'direct',
    icon: '🟦',
    title: 'सीधी बिक्री (Direct Sale)',
    route: 'आस-पास के होटल/मिल',
    rate: '₹2,500 / q',
    desc: 'मध्यस्थ मुक्त, सीधा बैंक ट्रांसफर'
  },
  {
    id: 'bulk',
    type: 'bulk',
    icon: '🟧',
    title: 'थोक खरीदार (Bulk Buyer)',
    route: 'एग्रो कॉर्पोरेट',
    rate: '₹2,515 / q',
    desc: 'बड़ी मात्रा (50+ क्विंटल) के लिए'
  }
];

export const marketplaceProducts = [
  {
    id: 'p1',
    name: 'नीम तेल 10000 PPM (जैविक रक्षक)',
    nameEn: 'Neem Oil Bio-Control',
    category: 'bio',
    brand: 'जैव पावर',
    price: 290,
    packSize: '1 लीटर',
    rating: 4.6,
    icon: '🌿',
    relevanceReason: 'खेत 2 में पत्ती झुलसा और रस चूसक कीटों की रोकथाम के लिए जैविक उपाय।'
  },
  {
    id: 'p2',
    name: 'मैंकोज़ेब 75% WP (कवकनाशी)',
    nameEn: 'Mancozeb 75 WP Fungicide',
    category: 'cropcare',
    brand: 'इंडोफिल',
    price: 320,
    packSize: '500 ग्राम',
    rating: 4.5,
    icon: '🛡️',
    relevanceReason: 'टमाटर के अगेती झुलसा (Early Blight) रोग नियंत्रण के लिए प्रभावी।'
  },
  {
    id: 'p3',
    name: 'हाइब्रिड धान बीज PRH-10',
    nameEn: 'Hybrid Paddy Seed PRH-10',
    category: 'seeds',
    brand: 'राष्ट्रीय बीज निगम',
    price: 450,
    packSize: '3 किग्रा',
    rating: 4.7,
    icon: '🌱',
    relevanceReason: 'उच्च पैदावार और जलभराव सहने में सक्षम।'
  },
  {
    id: 'p4',
    name: 'शुद्ध केंचुआ खाद (वर्मीकम्पोस्ट)',
    nameEn: 'Organic Vermicompost',
    category: 'manure',
    brand: 'किसान गोल्ड',
    price: 180,
    packSize: '25 किग्रा',
    rating: 4.8,
    icon: '🌾',
    relevanceReason: 'मिट्टी की जलधारण क्षमता और सूक्ष्म पोषक तत्वों की पूर्ति।'
  },
  {
    id: 'p5',
    name: 'बैटरी स्प्रे पंप (16 लीटर)',
    nameEn: '16L Battery Operated Sprayer',
    category: 'tools',
    brand: 'एग्रो किंग',
    price: 2800,
    packSize: '1 पीस',
    rating: 4.4,
    icon: '🚜',
    relevanceReason: 'आसान और त्वरित छिड़काव के लिए।'
  },
  {
    id: 'p6',
    name: 'IFFCO यूरिया (46% नाइट्रोजन)',
    nameEn: 'IFFCO Urea 45kg',
    category: 'fertilizer',
    brand: 'IFFCO',
    price: 267,
    packSize: '45 किग्रा',
    rating: 4.6,
    icon: '🧪',
    relevanceReason: 'धान के वानस्पतिक विकास के लिए आवश्यक टॉप-ड्रेसिंग।'
  }
];

export const cropDiagnosisMock = {
  conditionName: 'अगेती झुलसा (Early Blight)',
  conditionEn: 'Early Blight',
  confidence: 89,
  targetCrop: 'टमाटर (खेत 2)',
  alertLevel: '🔴 CHECK THIS AREA',
  actionTitle: 'तुरंत क्या करें (Action First):',
  actionText: 'रोगग्रस्त निचली पत्तियों को तोड़कर खेत से दूर नष्ट करें। आस-पास के पौधों की जांच करें।',
  whyDetected: 'पत्तियों पर संकेंद्रित छल्लेदार गोल भूरे धब्बे और किनारों पर पीलापन पाया गया।',
  technicalDetails: 'कारक: Alternaria solani कवक। तापमान 24-28°C और उच्च आर्द्रता में तेजी से फैलता है। अनुशंसित उपचार: मैंकोज़ेब 75 WP @ 2 ग्राम/लीटर या नीम तेल 5ml/लीटर।'
};

export const farmRecordsData = {
  activeMonth: 'अगस्त 2026 (August 2026)',
  selectedDate: '16 अगस्त 2026',
  activitiesForDay: [
    { id: 'a1', type: 'inspection', icon: '🔍', title: 'खेत निरीक्षण (Field Inspection)', details: 'खेत 2 में पत्ती रोग के शुरुआती लक्षण देखे' },
    { id: 'a2', type: 'fertilizer', icon: '🧪', title: 'उर्वरक प्रयोग (Fertilizer)', details: 'खेत 1 (धान) में 20 किग्रा यूरिया टॉप-ड्रेसिंग' },
    { id: 'a3', type: 'irrigation', icon: '💧', title: 'सिंचाई स्थिति (Irrigation)', details: 'कल बारिश के अनुमान से सिंचाई रोकी गई' }
  ],
  heatmapMatrix: [
    [1, 2, 0, 3, 1, 2, 0, 1, 3, 2, 1, 0, 2, 3],
    [0, 1, 2, 1, 0, 3, 2, 1, 0, 2, 3, 1, 2, 1],
    [2, 0, 1, 3, 2, 0, 1, 2, 3, 1, 0, 3, 1, 2]
  ]
};
