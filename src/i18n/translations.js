/* =============================================
   RAMU KAKA — i18n Translation System
   ============================================= */

const translations = {
  hi: {
    tagline: 'आपका खेती साथी',
    nav: { home: 'होम', field: 'खेत', scan: 'स्कैन', market: 'बाज़ार', more: 'और' },
    greeting: 'नमस्ते!',
    greetingPrompt: 'आज खेत के बारे में क्या जानना है?',
    voiceHint: 'बोलने के लिए दबाएँ — जैसे "आज मंडी भाव क्या है?"',
    voiceListening: 'सुन रहा हूँ...',
    quickAccess: 'सीधे खोलें',
    quick: {
      cropHealth: 'फसल स्वास्थ्य',
      weather: 'मौसम',
      irrigation: 'सिंचाई',
      mandiPrice: 'मंडी भाव',
      diseaseDetect: 'रोग पहचान',
      records: 'रिकॉर्ड'
    },
    weather: {
      title: 'आज का मौसम',
      humidity: 'नमी',
      wind: 'हवा',
      rain: 'बारिश',
      forecast: '7 दिन का पूर्वानुमान',
      suitable: 'छिड़काव के लिए उपयुक्त',
      notSuitable: 'छिड़काव न करें'
    },
    field: {
      title: 'मेरे खेत',
      addField: 'खेत जोड़ें',
      satellite: 'सैटेलाइट',
      normal: 'सामान्य',
      ndvi: 'NDVI',
      area: 'क्षेत्रफल',
      acres: 'एकड़',
      hectares: 'हेक्टेयर',
      cropHealth: 'फसल स्वास्थ्य',
      healthy: 'स्वस्थ',
      stressed: 'तनावग्रस्त',
      critical: 'गंभीर',
      soilMoisture: 'मिट्टी की नमी',
      irrigationAdvice: 'सिंचाई सलाह',
      irrigateNow: 'अभी सिंचाई करें',
      holdBack: 'रुकें — बारिश आने वाली है',
      waterNeeded: 'पानी की जरूरत',
      litersPerAcre: 'लीटर/एकड़',
      cropPlan: 'फसल योजना',
      pestAlert: 'कीट/रोग चेतावनी',
      nutrientMap: 'पोषक तत्व नक्शा',
      nitrogenLow: 'नाइट्रोजन कम',
      phosphorusOk: 'फॉस्फोरस सही',
      potassiumLow: 'पोटैशियम कम',
      recommendation: 'सिफारिश',
      sprayWindow: 'छिड़काव का समय',
      scoutNow: 'अभी जांच करें'
    },
    scan: {
      title: 'फसल रोग पहचान',
      instruction: 'फसल की पत्ती या प्रभावित भाग की तस्वीर लें',
      capture: 'तस्वीर लें',
      upload: 'गैलरी से चुनें',
      analyzing: 'विश्लेषण हो रहा है...',
      result: 'परिणाम',
      disease: 'रोग',
      severity: 'गंभीरता',
      mild: 'हल्का',
      moderate: 'मध्यम',
      severe: 'गंभीर',
      treatment: 'उपचार',
      organic: 'जैविक उपचार',
      chemical: 'रासायनिक उपचार',
      prevention: 'रोकथाम',
      buyProduct: 'दवाई खरीदें',
      scanHistory: 'पिछली जांचें',
      newScan: 'नई जांच'
    },
    market: {
      title: 'बाज़ार',
      mandiPrices: 'मंडी भाव',
      buy: 'खरीदें',
      sell: 'बेचें',
      livePrices: 'लाइव भाव',
      perQuintal: '₹/क्विंटल',
      trending: 'ट्रेंडिंग',
      bestTime: 'बेचने का सबसे अच्छा समय',
      categories: {
        seeds: 'बीज',
        fertilizers: 'खाद',
        pesticides: 'कीटनाशक',
        tools: 'औज़ार',
        bioInputs: 'जैव-इनपुट',
        all: 'सभी'
      },
      addToCart: 'कार्ट में डालें',
      cart: 'कार्ट',
      sellProduce: 'अपनी फसल बेचें',
      uploadPhoto: 'फोटो अपलोड करें',
      setPrice: 'दाम तय करें',
      listProduce: 'बिक्री के लिए लिस्ट करें'
    },
    more: {
      title: 'और विकल्प',
      records: 'रिकॉर्ड',
      recordsDesc: 'खेती का हिसाब-किताब',
      techniques: 'खेती की तकनीक',
      techniquesDesc: 'बुवाई, छँटाई, कटाई की विधि',
      settings: 'सेटिंग',
      settingsDesc: 'भाषा, सूचना, प्रोफ़ाइल',
      help: 'सहायता',
      helpDesc: 'मदद और संपर्क करें'
    },
    records: {
      title: 'फ़ार्म रिकॉर्ड',
      addRecord: 'रिकॉर्ड जोड़ें',
      planting: 'बुवाई',
      spraying: 'छिड़काव',
      fertilizer: 'खाद',
      irrigation: 'सिंचाई',
      harvest: 'कटाई',
      date: 'तारीख',
      crop: 'फसल',
      field: 'खेत',
      details: 'विवरण',
      cost: 'लागत',
      save: 'सहेजें',
      noRecords: 'अभी तक कोई रिकॉर्ड नहीं',
      startTracking: 'रिकॉर्ड जोड़ना शुरू करें'
    },
    techniques: {
      title: 'खेती की तकनीक',
      sowing: 'बुवाई',
      spacing: 'दूरी / स्पेसिंग',
      intercropping: 'अंतर-फसल',
      pruning: 'छँटाई',
      harvesting: 'कटाई',
      bestPractices: 'सर्वोत्तम प्रथाएँ',
      steps: 'चरण'
    },
    alerts: {
      pestDetected: '⚠️ कीट हमले की संभावना — {crop} में {pest} का खतरा',
      weatherWarning: '🌧️ अगले 24 घंटे में भारी बारिश — छिड़काव न करें',
      irrigationDue: '💧 सिंचाई का समय — {crop} को पानी की जरूरत',
      priceUp: '📈 {crop} का भाव बढ़ा — ₹{price}/क्विंटल'
    },
    common: {
      back: 'वापस',
      close: 'बंद करें',
      save: 'सहेजें',
      cancel: 'रद्द करें',
      confirm: 'पुष्टि करें',
      loading: 'लोड हो रहा है...',
      error: 'कुछ गलत हो गया',
      retry: 'पुनः प्रयास करें',
      today: 'आज',
      tomorrow: 'कल',
      thisWeek: 'इस हफ्ते'
    }
  },
  en: {
    tagline: 'Your Farming Companion',
    nav: { home: 'Home', field: 'Field', scan: 'Scan', market: 'Market', more: 'More' },
    greeting: 'Namaste!',
    greetingPrompt: 'What would you like to know about your farm today?',
    voiceHint: 'Press to speak — e.g. "What are today\'s mandi prices?"',
    voiceListening: 'Listening...',
    quickAccess: 'Quick Access',
    quick: {
      cropHealth: 'Crop Health',
      weather: 'Weather',
      irrigation: 'Irrigation',
      mandiPrice: 'Mandi Prices',
      diseaseDetect: 'Disease Detection',
      records: 'Records'
    },
    weather: {
      title: "Today's Weather",
      humidity: 'Humidity',
      wind: 'Wind',
      rain: 'Rain',
      forecast: '7-Day Forecast',
      suitable: 'Suitable for spraying',
      notSuitable: 'Do not spray'
    },
    field: {
      title: 'My Fields',
      addField: 'Add Field',
      satellite: 'Satellite',
      normal: 'Normal',
      ndvi: 'NDVI',
      area: 'Area',
      acres: 'Acres',
      hectares: 'Hectares',
      cropHealth: 'Crop Health',
      healthy: 'Healthy',
      stressed: 'Stressed',
      critical: 'Critical',
      soilMoisture: 'Soil Moisture',
      irrigationAdvice: 'Irrigation Advice',
      irrigateNow: 'Irrigate Now',
      holdBack: 'Hold Back — Rain Expected',
      waterNeeded: 'Water Needed',
      litersPerAcre: 'Liters/Acre',
      cropPlan: 'Crop Plan',
      pestAlert: 'Pest/Disease Alert',
      nutrientMap: 'Nutrient Map',
      nitrogenLow: 'Nitrogen Low',
      phosphorusOk: 'Phosphorus OK',
      potassiumLow: 'Potassium Low',
      recommendation: 'Recommendation',
      sprayWindow: 'Spray Window',
      scoutNow: 'Scout Now'
    },
    scan: {
      title: 'Crop Disease Detection',
      instruction: 'Take a photo of the affected leaf or plant part',
      capture: 'Capture',
      upload: 'Upload from Gallery',
      analyzing: 'Analyzing...',
      result: 'Result',
      disease: 'Disease',
      severity: 'Severity',
      mild: 'Mild',
      moderate: 'Moderate',
      severe: 'Severe',
      treatment: 'Treatment',
      organic: 'Organic Treatment',
      chemical: 'Chemical Treatment',
      prevention: 'Prevention',
      buyProduct: 'Buy Medicine',
      scanHistory: 'Scan History',
      newScan: 'New Scan'
    },
    market: {
      title: 'Market',
      mandiPrices: 'Mandi Prices',
      buy: 'Buy',
      sell: 'Sell',
      livePrices: 'Live Prices',
      perQuintal: '₹/Quintal',
      trending: 'Trending',
      bestTime: 'Best Time to Sell',
      categories: {
        seeds: 'Seeds',
        fertilizers: 'Fertilizers',
        pesticides: 'Pesticides',
        tools: 'Tools',
        bioInputs: 'Bio-Inputs',
        all: 'All'
      },
      addToCart: 'Add to Cart',
      cart: 'Cart',
      sellProduce: 'Sell Your Produce',
      uploadPhoto: 'Upload Photo',
      setPrice: 'Set Price',
      listProduce: 'List for Sale'
    },
    more: {
      title: 'More Options',
      records: 'Records',
      recordsDesc: 'Farm record keeping',
      techniques: 'Farming Techniques',
      techniquesDesc: 'Sowing, pruning, harvesting methods',
      settings: 'Settings',
      settingsDesc: 'Language, notifications, profile',
      help: 'Help',
      helpDesc: 'Support and contact'
    },
    records: {
      title: 'Farm Records',
      addRecord: 'Add Record',
      planting: 'Planting',
      spraying: 'Spraying',
      fertilizer: 'Fertilizer',
      irrigation: 'Irrigation',
      harvest: 'Harvest',
      date: 'Date',
      crop: 'Crop',
      field: 'Field',
      details: 'Details',
      cost: 'Cost',
      save: 'Save',
      noRecords: 'No records yet',
      startTracking: 'Start adding records'
    },
    techniques: {
      title: 'Farming Techniques',
      sowing: 'Sowing',
      spacing: 'Spacing',
      intercropping: 'Inter-cropping',
      pruning: 'Pruning',
      harvesting: 'Harvesting',
      bestPractices: 'Best Practices',
      steps: 'Steps'
    },
    alerts: {
      pestDetected: '⚠️ Pest risk detected — {pest} threat in {crop}',
      weatherWarning: '🌧️ Heavy rain expected in 24 hours — do not spray',
      irrigationDue: '💧 Irrigation due — {crop} needs water',
      priceUp: '📈 {crop} price up — ₹{price}/quintal'
    },
    common: {
      back: 'Back',
      close: 'Close',
      save: 'Save',
      cancel: 'Cancel',
      confirm: 'Confirm',
      loading: 'Loading...',
      error: 'Something went wrong',
      retry: 'Retry',
      today: 'Today',
      tomorrow: 'Tomorrow',
      thisWeek: 'This Week'
    }
  },
  mr: {
    tagline: 'तुमचा शेती साथी',
    nav: { home: 'होम', field: 'शेत', scan: 'स्कॅन', market: 'बाजार', more: 'अधिक' },
    greeting: 'नमस्कार!',
    greetingPrompt: 'आज शेताबद्दल काय जाणायचं आहे?',
    voiceHint: 'बोलण्यासाठी दाबा — जसे "आज मंडी भाव काय आहे?"',
    voiceListening: 'ऐकतोय...',
    quickAccess: 'लगेच उघडा',
    quick: {
      cropHealth: 'पीक आरोग्य',
      weather: 'हवामान',
      irrigation: 'सिंचन',
      mandiPrice: 'मंडी भाव',
      diseaseDetect: 'रोग ओळख',
      records: 'नोंदी'
    },
    weather: { title: 'आजचे हवामान', humidity: 'आर्द्रता', wind: 'वारा', rain: 'पाऊस', forecast: '7 दिवसांचा अंदाज', suitable: 'फवारणीसाठी योग्य', notSuitable: 'फवारणी करू नका' },
    field: { title: 'माझी शेतं', addField: 'शेत जोडा', satellite: 'सॅटेलाइट', normal: 'सामान्य', ndvi: 'NDVI', area: 'क्षेत्रफळ', acres: 'एकर', hectares: 'हेक्टर', cropHealth: 'पीक आरोग्य', healthy: 'निरोगी', stressed: 'तणावग्रस्त', critical: 'गंभीर', soilMoisture: 'मातीतील ओलावा', irrigationAdvice: 'सिंचन सल्ला', irrigateNow: 'आता सिंचन करा', holdBack: 'थांबा — पाऊस येणार', waterNeeded: 'पाण्याची गरज', litersPerAcre: 'लीटर/एकर', cropPlan: 'पीक नियोजन', pestAlert: 'कीड/रोग इशारा', nutrientMap: 'पोषक तत्व नकाशा', nitrogenLow: 'नायट्रोजन कमी', phosphorusOk: 'फॉस्फरस ठीक', potassiumLow: 'पोटॅशियम कमी', recommendation: 'शिफारस', sprayWindow: 'फवारणीची वेळ', scoutNow: 'आता तपासा' },
    scan: { title: 'पीक रोग ओळख', instruction: 'प्रभावित पान किंवा भागाचा फोटो घ्या', capture: 'फोटो घ्या', upload: 'गॅलरीतून निवडा', analyzing: 'विश्लेषण सुरू...', result: 'निकाल', disease: 'रोग', severity: 'तीव्रता', mild: 'सौम्य', moderate: 'मध्यम', severe: 'गंभीर', treatment: 'उपचार', organic: 'जैविक उपचार', chemical: 'रासायनिक उपचार', prevention: 'प्रतिबंध', buyProduct: 'औषध खरेदी करा', scanHistory: 'मागील तपासण्या', newScan: 'नवीन तपासणी' },
    market: { title: 'बाजार', mandiPrices: 'मंडी भाव', buy: 'खरेदी', sell: 'विक्री', livePrices: 'लाइव भाव', perQuintal: '₹/क्विंटल', trending: 'ट्रेंडिंग', bestTime: 'विक्रीसाठी सर्वोत्तम वेळ', categories: { seeds: 'बिया', fertilizers: 'खत', pesticides: 'कीटकनाशक', tools: 'अवजारे', bioInputs: 'जैव-इनपुट', all: 'सर्व' }, addToCart: 'कार्टमध्ये टाका', cart: 'कार्ट', sellProduce: 'तुमचं पीक विका', uploadPhoto: 'फोटो अपलोड करा', setPrice: 'किंमत ठरवा', listProduce: 'विक्रीसाठी लिस्ट करा' },
    more: { title: 'अधिक पर्याय', records: 'नोंदी', recordsDesc: 'शेतीचा हिशोब', techniques: 'शेती तंत्र', techniquesDesc: 'पेरणी, छाटणी, कापणी पद्धती', settings: 'सेटिंग', settingsDesc: 'भाषा, सूचना, प्रोफाइल', help: 'मदत', helpDesc: 'सहाय्य आणि संपर्क' },
    records: { title: 'शेत नोंदी', addRecord: 'नोंद जोडा', planting: 'पेरणी', spraying: 'फवारणी', fertilizer: 'खत', irrigation: 'सिंचन', harvest: 'कापणी', date: 'तारीख', crop: 'पीक', field: 'शेत', details: 'तपशील', cost: 'खर्च', save: 'जतन करा', noRecords: 'अजून कोणत्याही नोंदी नाहीत', startTracking: 'नोंदी जोडणे सुरू करा' },
    techniques: { title: 'शेती तंत्र', sowing: 'पेरणी', spacing: 'अंतर', intercropping: 'आंतर-पीक', pruning: 'छाटणी', harvesting: 'कापणी', bestPractices: 'सर्वोत्तम पद्धती', steps: 'चरण' },
    alerts: { pestDetected: '⚠️ कीड धोका — {crop} मध्ये {pest} चा धोका', weatherWarning: '🌧️ पुढच्या 24 तासात मुसळधार पाऊस — फवारणी करू नका', irrigationDue: '💧 सिंचनाची वेळ — {crop} ला पाण्याची गरज', priceUp: '📈 {crop} चा भाव वाढला — ₹{price}/क्विंटल' },
    common: { back: 'मागे', close: 'बंद करा', save: 'जतन करा', cancel: 'रद्द करा', confirm: 'पुष्टी करा', loading: 'लोड होत आहे...', error: 'काहीतरी चूक झाली', retry: 'पुन्हा प्रयत्न करा', today: 'आज', tomorrow: 'उद्या', thisWeek: 'या आठवड्यात' }
  },
  te: {
    tagline: 'మీ వ్యవసాయ సహచరుడు',
    nav: { home: 'హోమ్', field: 'పొలం', scan: 'స్కాన్', market: 'మార్కెట్', more: 'మరిన్ని' },
    greeting: 'నమస్తే!',
    greetingPrompt: 'ఈరోజు పొలం గురించి ఏమి తెలుసుకోవాలి?',
    voiceHint: 'మాట్లాడటానికి నొక్కండి — "ఈరోజు మండి ధరలు ఎంత?"',
    voiceListening: 'వింటున్నాను...',
    quickAccess: 'త్వరగా తెరవండి',
    quick: { cropHealth: 'పంట ఆరోగ్యం', weather: 'వాతావరణం', irrigation: 'నీటిపారుదల', mandiPrice: 'మండి ధరలు', diseaseDetect: 'వ్యాధి గుర్తింపు', records: 'రికార్డులు' },
    weather: { title: 'ఈరోజు వాతావరణం', humidity: 'తేమ', wind: 'గాలి', rain: 'వర్షం', forecast: '7 రోజుల అంచనా', suitable: 'పిచికారీకి అనువైనది', notSuitable: 'పిచికారీ చేయకండి' },
    field: { title: 'నా పొలాలు', addField: 'పొలం జోడించండి', satellite: 'శాటిలైట్', normal: 'సాధారణం', ndvi: 'NDVI', area: 'విస్తీర్ణం', acres: 'ఎకరాలు', hectares: 'హెక్టార్లు', cropHealth: 'పంట ఆరోగ్యం', healthy: 'ఆరోగ్యం', stressed: 'ఒత్తిడి', critical: 'తీవ్రం', soilMoisture: 'నేల తేమ', irrigationAdvice: 'నీటిపారుదల సలహా', irrigateNow: 'ఇప్పుడు నీరు పెట్టండి', holdBack: 'ఆగండి — వర్షం రాబోతోంది', waterNeeded: 'నీటి అవసరం', litersPerAcre: 'లీటర్లు/ఎకరం', cropPlan: 'పంట ప్రణాళిక', pestAlert: 'పురుగు/వ్యాధి హెచ్చరిక', nutrientMap: 'పోషక మ్యాప్', nitrogenLow: 'నత్రజని తక్కువ', phosphorusOk: 'భాస్వరం సరి', potassiumLow: 'పొటాషియం తక్కువ', recommendation: 'సిఫార్సు', sprayWindow: 'పిచికారీ సమయం', scoutNow: 'ఇప్పుడు తనిఖీ చేయండి' },
    scan: { title: 'పంట వ్యాధి గుర్తింపు', instruction: 'ప్రభావిత ఆకు లేదా భాగం ఫోటో తీయండి', capture: 'ఫోటో తీయండి', upload: 'గ్యాలరీ నుండి ఎంచుకోండి', analyzing: 'విశ్లేషణ జరుగుతోంది...', result: 'ఫలితం', disease: 'వ్యాధి', severity: 'తీవ్రత', mild: 'తేలిక', moderate: 'మధ్యస్థం', severe: 'తీవ్రం', treatment: 'చికిత్స', organic: 'సేంద్రియ చికిత్స', chemical: 'రసాయన చికిత్స', prevention: 'నివారణ', buyProduct: 'మందు కొనండి', scanHistory: 'గత స్కాన్లు', newScan: 'కొత్త స్కాన్' },
    market: { title: 'మార్కెట్', mandiPrices: 'మండి ధరలు', buy: 'కొనండి', sell: 'అమ్మండి', livePrices: 'లైవ్ ధరలు', perQuintal: '₹/క్వింటాల్', trending: 'ట్రెండింగ్', bestTime: 'అమ్మడానికి ఉత్తమ సమయం', categories: { seeds: 'విత్తనాలు', fertilizers: 'ఎరువులు', pesticides: 'పురుగుమందులు', tools: 'పనిముట్లు', bioInputs: 'జీవ-ఇన్‌పుట్‌లు', all: 'అన్నీ' }, addToCart: 'కార్ట్‌లో జోడించండి', cart: 'కార్ట్', sellProduce: 'మీ పంట అమ్మండి', uploadPhoto: 'ఫోటో అప్‌లోడ్', setPrice: 'ధర నిర్ణయించండి', listProduce: 'అమ్మకానికి జాబితా' },
    more: { title: 'మరిన్ని ఎంపికలు', records: 'రికార్డులు', recordsDesc: 'వ్యవసాయ లెక్కలు', techniques: 'వ్యవసాయ పద్ధతులు', techniquesDesc: 'విత్తనం, కత్తిరింపు, కోత పద్ధతులు', settings: 'సెట్టింగ్‌లు', settingsDesc: 'భాష, నోటిఫికేషన్లు, ప్రొఫైల్', help: 'సహాయం', helpDesc: 'సపోర్ట్ మరియు సంప్రదించండి' },
    records: { title: 'పొలం రికార్డులు', addRecord: 'రికార్డు జోడించండి', planting: 'విత్తనం', spraying: 'పిచికారీ', fertilizer: 'ఎరువు', irrigation: 'నీటిపారుదల', harvest: 'కోత', date: 'తేదీ', crop: 'పంట', field: 'పొలం', details: 'వివరాలు', cost: 'ఖర్చు', save: 'సేవ్ చేయండి', noRecords: 'ఇంకా రికార్డులు లేవు', startTracking: 'రికార్డులు జోడించడం ప్రారంభించండి' },
    techniques: { title: 'వ్యవసాయ పద్ధతులు', sowing: 'విత్తనం', spacing: 'అంతరం', intercropping: 'అంతర పంట', pruning: 'కత్తిరింపు', harvesting: 'కోత', bestPractices: 'ఉత్తమ పద్ధతులు', steps: 'దశలు' },
    alerts: { pestDetected: '⚠️ పురుగు ముప్పు — {crop}లో {pest} ప్రమాదం', weatherWarning: '🌧️ 24 గంటల్లో భారీ వర్షం — పిచికారీ చేయకండి', irrigationDue: '💧 నీటిపారుదల సమయం — {crop}కి నీరు అవసరం', priceUp: '📈 {crop} ధర పెరిగింది — ₹{price}/క్వింటాల్' },
    common: { back: 'వెనక్కి', close: 'మూసివేయండి', save: 'సేవ్', cancel: 'రద్దు చేయండి', confirm: 'నిర్ధారించండి', loading: 'లోడ్ అవుతోంది...', error: 'ఏదో తప్పు జరిగింది', retry: 'మళ్ళీ ప్రయత్నించండి', today: 'ఈరోజు', tomorrow: 'రేపు', thisWeek: 'ఈ వారం' }
  },
  pa: {
    tagline: 'ਤੁਹਾਡਾ ਖੇਤੀ ਸਾਥੀ',
    nav: { home: 'ਹੋਮ', field: 'ਖੇਤ', scan: 'ਸਕੈਨ', market: 'ਬਾਜ਼ਾਰ', more: 'ਹੋਰ' },
    greeting: 'ਸਤ ਸ੍ਰੀ ਅਕਾਲ!',
    greetingPrompt: 'ਅੱਜ ਖੇਤ ਬਾਰੇ ਕੀ ਜਾਣਨਾ ਹੈ?',
    voiceHint: 'ਬੋਲਣ ਲਈ ਦਬਾਓ — ਜਿਵੇਂ "ਅੱਜ ਮੰਡੀ ਭਾਅ ਕੀ ਹੈ?"',
    voiceListening: 'ਸੁਣ ਰਿਹਾ ਹਾਂ...',
    quickAccess: 'ਸਿੱਧੇ ਖੋਲੋ',
    quick: { cropHealth: 'ਫ਼ਸਲ ਸਿਹਤ', weather: 'ਮੌਸਮ', irrigation: 'ਸਿੰਚਾਈ', mandiPrice: 'ਮੰਡੀ ਭਾਅ', diseaseDetect: 'ਰੋਗ ਪਛਾਣ', records: 'ਰਿਕਾਰਡ' },
    weather: { title: 'ਅੱਜ ਦਾ ਮੌਸਮ', humidity: 'ਨਮੀ', wind: 'ਹਵਾ', rain: 'ਬਾਰਸ਼', forecast: '7 ਦਿਨ ਦੀ ਭਵਿੱਖਬਾਣੀ', suitable: 'ਛਿੜਕਾਅ ਲਈ ਢੁਕਵਾਂ', notSuitable: 'ਛਿੜਕਾਅ ਨਾ ਕਰੋ' },
    field: { title: 'ਮੇਰੇ ਖੇਤ', addField: 'ਖੇਤ ਜੋੜੋ', satellite: 'ਸੈਟੇਲਾਈਟ', normal: 'ਸਧਾਰਨ', ndvi: 'NDVI', area: 'ਖੇਤਰਫਲ', acres: 'ਏਕੜ', hectares: 'ਹੈਕਟੇਅਰ', cropHealth: 'ਫ਼ਸਲ ਸਿਹਤ', healthy: 'ਤੰਦਰੁਸਤ', stressed: 'ਤਣਾਅ ਵਾਲੀ', critical: 'ਗੰਭੀਰ', soilMoisture: 'ਮਿੱਟੀ ਦੀ ਨਮੀ', irrigationAdvice: 'ਸਿੰਚਾਈ ਸਲਾਹ', irrigateNow: 'ਹੁਣੇ ਸਿੰਚਾਈ ਕਰੋ', holdBack: 'ਰੁਕੋ — ਬਾਰਸ਼ ਆਉਣ ਵਾਲੀ ਹੈ', waterNeeded: 'ਪਾਣੀ ਦੀ ਲੋੜ', litersPerAcre: 'ਲੀਟਰ/ਏਕੜ', cropPlan: 'ਫ਼ਸਲ ਯੋਜਨਾ', pestAlert: 'ਕੀੜੇ/ਰੋਗ ਚੇਤਾਵਨੀ', nutrientMap: 'ਪੋਸ਼ਕ ਤੱਤ ਨਕਸ਼ਾ', nitrogenLow: 'ਨਾਈਟ੍ਰੋਜਨ ਘੱਟ', phosphorusOk: 'ਫਾਸਫੋਰਸ ਠੀਕ', potassiumLow: 'ਪੋਟਾਸ਼ੀਅਮ ਘੱਟ', recommendation: 'ਸਿਫ਼ਾਰਸ਼', sprayWindow: 'ਛਿੜਕਾਅ ਦਾ ਸਮਾਂ', scoutNow: 'ਹੁਣੇ ਜਾਂਚ ਕਰੋ' },
    scan: { title: 'ਫ਼ਸਲ ਰੋਗ ਪਛਾਣ', instruction: 'ਪ੍ਰਭਾਵਿਤ ਪੱਤੇ ਜਾਂ ਹਿੱਸੇ ਦੀ ਤਸਵੀਰ ਲਓ', capture: 'ਤਸਵੀਰ ਲਓ', upload: 'ਗੈਲਰੀ ਤੋਂ ਚੁਣੋ', analyzing: 'ਵਿਸ਼ਲੇਸ਼ਣ ਹੋ ਰਿਹਾ ਹੈ...', result: 'ਨਤੀਜਾ', disease: 'ਰੋਗ', severity: 'ਗੰਭੀਰਤਾ', mild: 'ਹਲਕਾ', moderate: 'ਮੱਧਮ', severe: 'ਗੰਭੀਰ', treatment: 'ਇਲਾਜ', organic: 'ਜੈਵਿਕ ਇਲਾਜ', chemical: 'ਰਸਾਇਣਕ ਇਲਾਜ', prevention: 'ਰੋਕਥਾਮ', buyProduct: 'ਦਵਾਈ ਖਰੀਦੋ', scanHistory: 'ਪਿਛਲੇ ਸਕੈਨ', newScan: 'ਨਵਾਂ ਸਕੈਨ' },
    market: { title: 'ਬਾਜ਼ਾਰ', mandiPrices: 'ਮੰਡੀ ਭਾਅ', buy: 'ਖਰੀਦੋ', sell: 'ਵੇਚੋ', livePrices: 'ਲਾਈਵ ਭਾਅ', perQuintal: '₹/ਕੁਇੰਟਲ', trending: 'ਟ੍ਰੈਂਡਿੰਗ', bestTime: 'ਵੇਚਣ ਦਾ ਸਭ ਤੋਂ ਵਧੀਆ ਸਮਾਂ', categories: { seeds: 'ਬੀਜ', fertilizers: 'ਖਾਦ', pesticides: 'ਕੀਟਨਾਸ਼ਕ', tools: 'ਔਜ਼ਾਰ', bioInputs: 'ਜੈਵ-ਇਨਪੁੱਟ', all: 'ਸਭ' }, addToCart: 'ਕਾਰਟ ਵਿੱਚ ਪਾਓ', cart: 'ਕਾਰਟ', sellProduce: 'ਆਪਣੀ ਫ਼ਸਲ ਵੇਚੋ', uploadPhoto: 'ਫੋਟੋ ਅੱਪਲੋਡ', setPrice: 'ਕੀਮਤ ਤੈਅ ਕਰੋ', listProduce: 'ਵਿਕਰੀ ਲਈ ਲਿਸਟ ਕਰੋ' },
    more: { title: 'ਹੋਰ ਵਿਕਲਪ', records: 'ਰਿਕਾਰਡ', recordsDesc: 'ਖੇਤੀ ਦਾ ਹਿਸਾਬ', techniques: 'ਖੇਤੀ ਤਕਨੀਕ', techniquesDesc: 'ਬਿਜਾਈ, ਛਾਂਟੀ, ਵਾਢੀ ਦੇ ਤਰੀਕੇ', settings: 'ਸੈਟਿੰਗ', settingsDesc: 'ਭਾਸ਼ਾ, ਸੂਚਨਾ, ਪ੍ਰੋਫ਼ਾਈਲ', help: 'ਮਦਦ', helpDesc: 'ਸਹਾਇਤਾ ਅਤੇ ਸੰਪਰਕ' },
    records: { title: 'ਖੇਤ ਰਿਕਾਰਡ', addRecord: 'ਰਿਕਾਰਡ ਜੋੜੋ', planting: 'ਬਿਜਾਈ', spraying: 'ਛਿੜਕਾਅ', fertilizer: 'ਖਾਦ', irrigation: 'ਸਿੰਚਾਈ', harvest: 'ਵਾਢੀ', date: 'ਤਾਰੀਖ', crop: 'ਫ਼ਸਲ', field: 'ਖੇਤ', details: 'ਵੇਰਵੇ', cost: 'ਖ਼ਰਚ', save: 'ਸੇਵ ਕਰੋ', noRecords: 'ਅਜੇ ਕੋਈ ਰਿਕਾਰਡ ਨਹੀਂ', startTracking: 'ਰਿਕਾਰਡ ਜੋੜਨਾ ਸ਼ੁਰੂ ਕਰੋ' },
    techniques: { title: 'ਖੇਤੀ ਤਕਨੀਕ', sowing: 'ਬਿਜਾਈ', spacing: 'ਦੂਰੀ', intercropping: 'ਅੰਤਰ-ਫ਼ਸਲ', pruning: 'ਛਾਂਟੀ', harvesting: 'ਵਾਢੀ', bestPractices: 'ਸਰਵੋਤਮ ਤਰੀਕੇ', steps: 'ਕਦਮ' },
    alerts: { pestDetected: '⚠️ ਕੀੜੇ ਦਾ ਖ਼ਤਰਾ — {crop} ਵਿੱਚ {pest} ਦਾ ਖ਼ਤਰਾ', weatherWarning: '🌧️ ਅਗਲੇ 24 ਘੰਟਿਆਂ ਵਿੱਚ ਭਾਰੀ ਬਾਰਸ਼ — ਛਿੜਕਾਅ ਨਾ ਕਰੋ', irrigationDue: '💧 ਸਿੰਚਾਈ ਦਾ ਸਮਾਂ — {crop} ਨੂੰ ਪਾਣੀ ਚਾਹੀਦਾ', priceUp: '📈 {crop} ਦਾ ਭਾਅ ਵਧਿਆ — ₹{price}/ਕੁਇੰਟਲ' },
    common: { back: 'ਪਿੱਛੇ', close: 'ਬੰਦ ਕਰੋ', save: 'ਸੇਵ ਕਰੋ', cancel: 'ਰੱਦ ਕਰੋ', confirm: 'ਪੁਸ਼ਟੀ ਕਰੋ', loading: 'ਲੋਡ ਹੋ ਰਿਹਾ ਹੈ...', error: 'ਕੁਝ ਗ਼ਲਤ ਹੋ ਗਿਆ', retry: 'ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ', today: 'ਅੱਜ', tomorrow: 'ਕੱਲ੍ਹ', thisWeek: 'ਇਸ ਹਫ਼ਤੇ' }
  },
  ta: {
    tagline: 'உங்கள் விவசாய தோழன்',
    nav: { home: 'முகப்பு', field: 'வயல்', scan: 'ஸ்கேன்', market: 'சந்தை', more: 'மேலும்' },
    greeting: 'வணக்கம்!',
    greetingPrompt: 'இன்று வயல் பற்றி என்ன தெரிந்துகொள்ள வேண்டும்?',
    voiceHint: 'பேச அழுத்தவும் — "இன்று மண்டி விலை என்ன?"',
    voiceListening: 'கேட்கிறேன்...',
    quickAccess: 'நேரடியாக திறக்கவும்',
    quick: { cropHealth: 'பயிர் நலம்', weather: 'வானிலை', irrigation: 'நீர்ப்பாசனம்', mandiPrice: 'மண்டி விலை', diseaseDetect: 'நோய் கண்டறிதல்', records: 'பதிவுகள்' },
    weather: { title: 'இன்றைய வானிலை', humidity: 'ஈரப்பதம்', wind: 'காற்று', rain: 'மழை', forecast: '7 நாள் முன்னறிவிப்பு', suitable: 'தெளிப்புக்கு ஏற்றது', notSuitable: 'தெளிக்க வேண்டாம்' },
    field: { title: 'என் வயல்கள்', addField: 'வயல் சேர்க்கவும்', satellite: 'செயற்கைக்கோள்', normal: 'சாதாரணம்', ndvi: 'NDVI', area: 'பரப்பளவு', acres: 'ஏக்கர்', hectares: 'ஹெக்டேர்', cropHealth: 'பயிர் நலம்', healthy: 'ஆரோக்கியம்', stressed: 'அழுத்தம்', critical: 'கடுமை', soilMoisture: 'மண் ஈரப்பதம்', irrigationAdvice: 'நீர்ப்பாசன ஆலோசனை', irrigateNow: 'இப்போது நீர்ப்பாசனம் செய்யுங்கள்', holdBack: 'நிறுத்துங்கள் — மழை வரும்', waterNeeded: 'நீர் தேவை', litersPerAcre: 'லிட்டர்/ஏக்கர்', cropPlan: 'பயிர் திட்டம்', pestAlert: 'பூச்சி/நோய் எச்சரிக்கை', nutrientMap: 'ஊட்டச்சத்து வரைபடம்', nitrogenLow: 'நைட்ரஜன் குறைவு', phosphorusOk: 'பாஸ்பரஸ் சரி', potassiumLow: 'பொட்டாசியம் குறைவு', recommendation: 'பரிந்துரை', sprayWindow: 'தெளிப்பு நேரம்', scoutNow: 'இப்போது சோதிக்கவும்' },
    scan: { title: 'பயிர் நோய் கண்டறிதல்', instruction: 'பாதிக்கப்பட்ட இலை அல்லது பகுதியின் புகைப்படம் எடுக்கவும்', capture: 'புகைப்படம் எடுக்கவும்', upload: 'கேலரியிலிருந்து தேர்வு செய்யவும்', analyzing: 'பகுப்பாய்வு நடைபெறுகிறது...', result: 'முடிவு', disease: 'நோய்', severity: 'தீவிரம்', mild: 'லேசான', moderate: 'மிதமான', severe: 'கடுமையான', treatment: 'சிகிச்சை', organic: 'இயற்கை சிகிச்சை', chemical: 'ரசாயன சிகிச்சை', prevention: 'தடுப்பு', buyProduct: 'மருந்து வாங்கவும்', scanHistory: 'முந்தைய ஸ்கேன்கள்', newScan: 'புதிய ஸ்கேன்' },
    market: { title: 'சந்தை', mandiPrices: 'மண்டி விலைகள்', buy: 'வாங்கவும்', sell: 'விற்கவும்', livePrices: 'நேரடி விலைகள்', perQuintal: '₹/குவிண்டால்', trending: 'ட்ரெண்டிங்', bestTime: 'விற்க சிறந்த நேரம்', categories: { seeds: 'விதைகள்', fertilizers: 'உரங்கள்', pesticides: 'பூச்சிக்கொல்லிகள்', tools: 'கருவிகள்', bioInputs: 'உயிர்-உள்ளீடுகள்', all: 'அனைத்தும்' }, addToCart: 'கார்ட்டில் சேர்', cart: 'கார்ட்', sellProduce: 'உங்கள் விளைச்சலை விற்கவும்', uploadPhoto: 'புகைப்படம் பதிவேற்றவும்', setPrice: 'விலை நிர்ணயிக்கவும்', listProduce: 'விற்பனைக்கு பட்டியலிடவும்' },
    more: { title: 'மேலும் விருப்பங்கள்', records: 'பதிவுகள்', recordsDesc: 'விவசாய கணக்கு', techniques: 'விவசாய நுட்பங்கள்', techniquesDesc: 'விதைப்பு, கத்தரிப்பு, அறுவடை முறைகள்', settings: 'அமைப்புகள்', settingsDesc: 'மொழி, அறிவிப்புகள், சுயவிவரம்', help: 'உதவி', helpDesc: 'ஆதரவு மற்றும் தொடர்பு' },
    records: { title: 'வயல் பதிவுகள்', addRecord: 'பதிவு சேர்க்கவும்', planting: 'விதைப்பு', spraying: 'தெளிப்பு', fertilizer: 'உரம்', irrigation: 'நீர்ப்பாசனம்', harvest: 'அறுவடை', date: 'தேதி', crop: 'பயிர்', field: 'வயல்', details: 'விவரங்கள்', cost: 'செலவு', save: 'சேமிக்கவும்', noRecords: 'இன்னும் பதிவுகள் இல்லை', startTracking: 'பதிவுகளைச் சேர்க்க தொடங்கவும்' },
    techniques: { title: 'விவசாய நுட்பங்கள்', sowing: 'விதைப்பு', spacing: 'இடைவெளி', intercropping: 'ஊடுபயிர்', pruning: 'கத்தரிப்பு', harvesting: 'அறுவடை', bestPractices: 'சிறந்த நடைமுறைகள்', steps: 'படிநிலைகள்' },
    alerts: { pestDetected: '⚠️ பூச்சி அபாயம் — {crop}ல் {pest} அச்சுறுத்தல்', weatherWarning: '🌧️ 24 மணி நேரத்தில் கனமழை — தெளிக்க வேண்டாம்', irrigationDue: '💧 நீர்ப்பாசன நேரம் — {crop}க்கு நீர் தேவை', priceUp: '📈 {crop} விலை உயர்ந்தது — ₹{price}/குவிண்டால்' },
    common: { back: 'பின்செல்', close: 'மூடவும்', save: 'சேமிக்கவும்', cancel: 'ரத்துசெய்', confirm: 'உறுதிசெய்', loading: 'ஏற்றுகிறது...', error: 'ஏதோ தவறு நிகழ்ந்தது', retry: 'மீண்டும் முயற்சிக்கவும்', today: 'இன்று', tomorrow: 'நாளை', thisWeek: 'இந்த வாரம்' }
  }
};

const langNames = {
  hi: 'हिंदी', en: 'English', mr: 'मराठी',
  te: 'తెలుగు', pa: 'ਪੰਜਾਬੀ', ta: 'தமிழ்'
};

const speechLangCodes = {
  hi: 'hi-IN', en: 'en-IN', mr: 'mr-IN',
  te: 'te-IN', pa: 'pa-IN', ta: 'ta-IN'
};

let currentLang = localStorage.getItem('rk-lang') || 'hi';

export function t(key) {
  const keys = key.split('.');
  let val = translations[currentLang];
  for (const k of keys) {
    if (val && val[k] !== undefined) val = val[k];
    else {
      // Fallback to Hindi
      val = translations.hi;
      for (const fk of keys) {
        if (val && val[fk] !== undefined) val = val[fk];
        else return key;
      }
      return val;
    }
  }
  return val;
}

export function setLang(lang) {
  currentLang = lang;
  localStorage.setItem('rk-lang', lang);
  // Update all data-i18n elements
  document.querySelectorAll('[data-i18n]').forEach(el => {
    el.textContent = t(el.dataset.i18n);
  });
}

export function getLang() {
  return currentLang;
}

export function getLangName(lang) {
  return langNames[lang || currentLang];
}

export function getSpeechLang(lang) {
  return speechLangCodes[lang || currentLang];
}

export { translations, langNames, speechLangCodes };
