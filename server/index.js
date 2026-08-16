/* =============================================
   RAMU KAKA — Node.js API Server
   Mock API endpoints for the agricultural app
   ============================================= */

import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// ── Mock Data ──

const crops = [
  { id: 'rice', hi: 'धान', en: 'Rice', emoji: '🌾', season: 'kharif' },
  { id: 'wheat', hi: 'गेहूँ', en: 'Wheat', emoji: '🌿', season: 'rabi' },
  { id: 'cotton', hi: 'कपास', en: 'Cotton', emoji: '☁️', season: 'kharif' },
  { id: 'sugarcane', hi: 'गन्ना', en: 'Sugarcane', emoji: '🎋', season: 'annual' },
  { id: 'soybean', hi: 'सोयाबीन', en: 'Soybean', emoji: '🫘', season: 'kharif' },
  { id: 'tomato', hi: 'टमाटर', en: 'Tomato', emoji: '🍅', season: 'both' },
  { id: 'onion', hi: 'प्याज', en: 'Onion', emoji: '🧅', season: 'rabi' },
  { id: 'potato', hi: 'आलू', en: 'Potato', emoji: '🥔', season: 'rabi' }
];

const mandiPrices = [
  { crop: 'rice', mandi: 'आज़ादपुर', state: 'दिल्ली', price: 2850, prevPrice: 2780, unit: 'क्विंटल' },
  { crop: 'wheat', mandi: 'इंदौर', state: 'मध्य प्रदेश', price: 2680, prevPrice: 2720, unit: 'क्विंटल' },
  { crop: 'cotton', mandi: 'राजकोट', state: 'गुजरात', price: 7200, prevPrice: 7050, unit: 'क्विंटल' },
  { crop: 'soybean', mandi: 'लातूर', state: 'महाराष्ट्र', price: 4850, prevPrice: 4900, unit: 'क्विंटल' },
  { crop: 'tomato', mandi: 'नासिक', state: 'महाराष्ट्र', price: 1250, prevPrice: 980, unit: 'क्विंटल' },
  { crop: 'onion', mandi: 'लासलगाँव', state: 'महाराष्ट्र', price: 2100, prevPrice: 2250, unit: 'क्विंटल' },
  { crop: 'potato', mandi: 'आगरा', state: 'उत्तर प्रदेश', price: 1380, prevPrice: 1350, unit: 'क्विंटल' },
  { crop: 'sugarcane', mandi: 'मुज़फ़्फ़रनगर', state: 'उत्तर प्रदेश', price: 350, prevPrice: 345, unit: 'क्विंटल' }
];

const weatherData = {
  current: {
    temp: 32, feelsLike: 35, humidity: 78, windSpeed: 12, windDir: 'SW',
    condition: 'partly_cloudy', conditionHi: 'आंशिक बादल', conditionEn: 'Partly Cloudy',
    emoji: '⛅', rainChance: 40, uvIndex: 7, pressure: 1008, sprayable: false
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

// ── API Routes ──

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'ramu-kaka-api', version: '1.0.0' });
});

// Crops
app.get('/api/crops', (req, res) => {
  res.json({ success: true, data: crops });
});

app.get('/api/crops/:id', (req, res) => {
  const crop = crops.find(c => c.id === req.params.id);
  if (!crop) return res.status(404).json({ success: false, error: 'Crop not found' });
  res.json({ success: true, data: crop });
});

// Mandi Prices
app.get('/api/mandi/prices', (req, res) => {
  let result = [...mandiPrices];
  const { crop, state } = req.query;
  if (crop) result = result.filter(p => p.crop === crop);
  if (state) result = result.filter(p => p.state.includes(state));
  
  // Add computed fields
  result = result.map(p => ({
    ...p,
    change: p.price - p.prevPrice,
    changePercent: (((p.price - p.prevPrice) / p.prevPrice) * 100).toFixed(1),
    trend: p.price >= p.prevPrice ? 'up' : 'down',
    date: new Date().toISOString().split('T')[0]
  }));

  res.json({ success: true, data: result, timestamp: new Date().toISOString() });
});

// Price history (mock)
app.get('/api/mandi/history/:crop', (req, res) => {
  const basePrice = mandiPrices.find(p => p.crop === req.params.crop)?.price || 2000;
  const history = [];
  for (let i = 30; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    history.push({
      date: date.toISOString().split('T')[0],
      price: Math.round(basePrice * (0.9 + Math.random() * 0.2))
    });
  }
  res.json({ success: true, data: history });
});

// Weather
app.get('/api/weather', (req, res) => {
  res.json({ success: true, data: weatherData });
});

// Irrigation advice
app.get('/api/irrigation/advice', (req, res) => {
  const rainTomorrow = weatherData.forecast[1]?.rain > 50;
  res.json({
    success: true,
    data: {
      shouldIrrigate: !rainTomorrow,
      reason: rainTomorrow ? 'Heavy rain expected tomorrow — hold back irrigation' : 'Soil moisture below optimal — irrigate now',
      reasonHi: rainTomorrow ? 'कल भारी बारिश की उम्मीद है — सिंचाई रोकें' : 'मिट्टी की नमी कम है — अभी सिंचाई करें',
      nextIrrigationDate: (() => { const d = new Date(); d.setDate(d.getDate() + 3); return d.toISOString().split('T')[0]; })(),
      waterNeeded: 3200,
      cropStage: 'Tillering',
      cropStageHi: 'कल्ले निकलना',
      etIndicator: 5.2
    }
  });
});

// Field data
app.get('/api/fields', (req, res) => {
  res.json({
    success: true,
    data: [
      {
        id: 1, name: 'खेत #1 — मुख्य', area: 5.2, unit: 'acres', crop: 'rice',
        stage: 3, ndviAvg: 0.72, soilMoisture: 65,
        healthZones: { healthy: 72, stressed: 22, critical: 6 },
        nutrients: { nitrogen: 'low', phosphorus: 'ok', potassium: 'low' }
      },
      {
        id: 2, name: 'खेत #2 — पिछला', area: 3.1, unit: 'acres', crop: 'soybean',
        stage: 4, ndviAvg: 0.58, soilMoisture: 42,
        healthZones: { healthy: 55, stressed: 35, critical: 10 },
        nutrients: { nitrogen: 'ok', phosphorus: 'low', potassium: 'ok' }
      }
    ]
  });
});

// Disease detection (simulated)
app.post('/api/scan/detect', (req, res) => {
  const diseases = [
    { id: 'blast', crop: 'rice', hi: 'ब्लास्ट (झुलसा रोग)', en: 'Rice Blast', severity: 'severe', confidence: 0.89 },
    { id: 'early_blight', crop: 'tomato', hi: 'अगेती झुलसा', en: 'Early Blight', severity: 'moderate', confidence: 0.82 },
    { id: 'leaf_curl', crop: 'cotton', hi: 'पत्ती मोड़', en: 'Leaf Curl Virus', severity: 'severe', confidence: 0.91 },
    { id: 'rust', crop: 'wheat', hi: 'रतुआ रोग', en: 'Wheat Rust', severity: 'moderate', confidence: 0.76 }
  ];
  const detected = diseases[Math.floor(Math.random() * diseases.length)];
  
  // Simulate processing delay
  setTimeout(() => {
    res.json({ success: true, data: detected });
  }, 500);
});

// Products
app.get('/api/products', (req, res) => {
  const allProducts = [
    { id: 1, name: 'हाइब्रिड धान बीज (PRH-10)', category: 'seeds', brand: 'राष्ट्रीय बीज निगम', price: 280, unit: 'kg' },
    { id: 2, name: 'यूरिया (46% N)', category: 'fertilizers', brand: 'IFFCO', price: 267, unit: '45kg' },
    { id: 3, name: 'इमिडाक्लोप्रिड 17.8 SL', category: 'pesticides', brand: 'बायर', price: 420, unit: '250ml' },
    { id: 4, name: 'बैटरी स्प्रे पंप (16L)', category: 'tools', brand: 'किसान किंग', price: 2800, unit: 'piece' }
  ];
  const { category } = req.query;
  const filtered = category ? allProducts.filter(p => p.category === category) : allProducts;
  res.json({ success: true, data: filtered });
});

// Records
let records = [];

app.get('/api/records', (req, res) => {
  res.json({ success: true, data: records });
});

app.post('/api/records', (req, res) => {
  const record = { id: Date.now(), ...req.body, createdAt: new Date().toISOString() };
  records.push(record);
  res.json({ success: true, data: record });
});

// Voice AI (simulated)
app.post('/api/voice/process', (req, res) => {
  const { text, lang } = req.body;
  const lower = (text || '').toLowerCase();

  let response = '';
  let action = null;

  if (lower.includes('मंडी') || lower.includes('भाव') || lower.includes('price')) {
    response = 'आज के मंडी भाव: धान ₹2,850/क्विंटल, गेहूँ ₹2,680/क्विंटल, टमाटर ₹1,250/क्विंटल';
    action = 'navigate:market';
  } else if (lower.includes('मौसम') || lower.includes('weather')) {
    response = 'आज 32°C, नमी 78%। कल भारी बारिश (80%) की संभावना।';
    action = 'navigate:field';
  } else if (lower.includes('सिंचाई') || lower.includes('irrigat')) {
    response = 'अभी सिंचाई न करें — कल बारिश आने वाली है। अगली सिंचाई 19 अगस्त।';
    action = 'navigate:field';
  } else {
    response = 'मैं आपकी मदद कर सकता हूँ — मंडी भाव, मौसम, सिंचाई, या फसल स्वास्थ्य के बारे में पूछें।';
  }

  res.json({ success: true, data: { response, action, lang: lang || 'hi' } });
});

// ── Start Server ──
app.listen(PORT, () => {
  console.log(`\n🌾 रामू काका API Server running on http://localhost:${PORT}`);
  console.log(`   Health: http://localhost:${PORT}/api/health`);
  console.log(`   Prices: http://localhost:${PORT}/api/mandi/prices`);
  console.log(`   Weather: http://localhost:${PORT}/api/weather\n`);
});
