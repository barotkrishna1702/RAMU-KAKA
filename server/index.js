/* =======================================================
   RAMU KAKA — Backend Simulation Server (Port 3001)
   ======================================================= */

import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// ── Health Check ──
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'ramu-kaka-api',
    version: '2.0.0',
    farmer: 'Rajesh Patel',
    farmSize: '3.5 acres'
  });
});

// ── Farm & Fields API ──
app.get('/api/farm', (req, res) => {
  res.json({
    success: true,
    data: {
      farmer: 'Rajesh Patel',
      totalArea: 3.5,
      fields: [
        { id: 'field-1', name: 'Field 1 (Rice)', area: 2.4, status: 'healthy', soilMoisture: 68 },
        { id: 'field-2', name: 'Field 2 (Tomato)', area: 1.1, status: 'stress', soilMoisture: 52 }
      ]
    }
  });
});

// ── Mandi Prices API ──
app.get('/api/mandi/prices', (req, res) => {
  res.json({
    success: true,
    data: [
      { mandi: 'Mandi B (Kannauj Main)', crop: 'Rice', price: 2520, unit: 'quintal', isBest: true },
      { mandi: 'Mandi A (Tirwa)', crop: 'Rice', price: 2450, unit: 'quintal', isBest: false },
      { mandi: 'Mandi C (Chhibramau)', crop: 'Rice', price: 2390, unit: 'quintal', isBest: false }
    ],
    timestamp: new Date().toISOString()
  });
});

// ── Disease Detection Simulation API ──
app.post('/api/crop/diagnose', (req, res) => {
  res.json({
    success: true,
    data: {
      condition: 'Early Blight',
      confidence: 89,
      action: 'Inspect nearby plants and scout the affected area. Apply bio-fungicide.',
      treatment: 'Mancozeb 75 WP or Neem Oil bio-control'
    }
  });
});

// ── Voice AI Agent Processing API ──
app.post('/api/voice/ask', (req, res) => {
  const { query, context } = req.body;
  const q = (query || '').toLowerCase();

  let reply = 'रामू आपके साथ है। आज खेत 2 की पत्तियों की जांच करें और बारिश से पहले सिंचाई न करें।';
  if (q.includes('पानी') || q.includes('water') || q.includes('irrigate')) {
    reply = 'आज पानी रोक दो। कल 78% बारिश का चांस है।';
  } else if (q.includes('मंडी') || q.includes('भाव') || q.includes('price')) {
    reply = 'मंडी B में सबसे अच्छा भाव ₹2,520/क्विंटल मिल रहा है।';
  }

  res.json({
    success: true,
    data: { reply, context: context || 'farm' }
  });
});

app.listen(PORT, () => {
  console.log(`\n🌾 रामू काका (Ramu Kaka 2.0) Server running at http://localhost:${PORT}`);
  console.log(`   Health: http://localhost:${PORT}/api/health\n`);
});
