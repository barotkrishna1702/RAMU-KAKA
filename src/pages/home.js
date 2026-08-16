/* =============================================
   RAMU KAKA — Home Page
   ============================================= */

import { t, getLang, getSpeechLang } from '../i18n/translations.js';
import { navigateTo, showToast } from '../main.js';
import { weatherData, crops, mandiPrices } from '../data/mock-data.js';

export function renderHome(container) {
  const lang = getLang();
  const weather = weatherData.current;

  container.innerHTML = `
    <!-- Greeting -->
    <div class="home-greeting">
      <h2 class="home-greeting__hello">${t('greeting')}</h2>
      <p class="home-greeting__prompt">${t('greetingPrompt')}</p>
    </div>

    <!-- Active Alerts -->
    <div class="alert-bar alert-bar--warning" id="home-alert">
      <span class="alert-bar__icon">🌧️</span>
      <span>${lang === 'hi' ? 'कल भारी बारिश — छिड़काव न करें, सिंचाई रोकें' : 'Heavy rain tomorrow — do not spray, hold irrigation'}</span>
      <span class="alert-bar__close" onclick="this.parentElement.remove()">✕</span>
    </div>

    <!-- Voice Section -->
    <div class="voice-section">
      <div class="voice-btn-container">
        <button class="voice-btn" id="voice-btn" aria-label="Voice input">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
            <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
            <line x1="12" y1="19" x2="12" y2="23"/>
            <line x1="8" y1="23" x2="16" y2="23"/>
          </svg>
        </button>
        <div class="voice-ring voice-ring--1"></div>
        <div class="voice-ring voice-ring--2"></div>
        <div class="voice-ring voice-ring--3"></div>
      </div>
      <p class="voice-hint" id="voice-hint">${t('voiceHint')}</p>
      <div class="voice-transcript hidden" id="voice-transcript"></div>
    </div>

    <!-- AI Response Area -->
    <div id="ai-response-area"></div>

    <!-- Quick Access -->
    <div class="section-header" style="animation: fadeInUp 500ms ease 400ms both;">
      <h3 class="section-title">${t('quickAccess')}</h3>
    </div>
    <div class="quick-grid" style="animation: fadeInUp 500ms ease 500ms both;">
      <div class="quick-card" data-action="crop-health">
        <div class="quick-card__icon" style="background: #E8F5E9;">🌾</div>
        <span class="quick-card__label">${t('quick.cropHealth')}</span>
      </div>
      <div class="quick-card" data-action="weather">
        <div class="quick-card__icon" style="background: #E3F2FD;">🌤️</div>
        <span class="quick-card__label">${t('quick.weather')}</span>
      </div>
      <div class="quick-card" data-action="irrigation">
        <div class="quick-card__icon" style="background: #E0F7FA;">💧</div>
        <span class="quick-card__label">${t('quick.irrigation')}</span>
      </div>
      <div class="quick-card" data-action="mandi">
        <div class="quick-card__icon" style="background: #FFF8E1;">📊</div>
        <span class="quick-card__label">${t('quick.mandiPrice')}</span>
      </div>
      <div class="quick-card" data-action="scan">
        <div class="quick-card__icon" style="background: #FCE4EC;">📸</div>
        <span class="quick-card__label">${t('quick.diseaseDetect')}</span>
      </div>
      <div class="quick-card" data-action="records">
        <div class="quick-card__icon" style="background: #F3E5F5;">📝</div>
        <span class="quick-card__label">${t('quick.records')}</span>
      </div>
    </div>

    <!-- Weather Summary -->
    <div class="weather-summary" style="margin-top: var(--space-4);">
      <div class="weather-summary__icon">${weather.emoji}</div>
      <div class="weather-summary__info">
        <div class="weather-summary__temp">${weather.temp}°C</div>
        <div class="weather-summary__desc">${lang === 'hi' ? weather.conditionHi : weather.conditionEn}</div>
        <div class="weather-summary__details">
          <span>💧 ${weather.humidity}%</span>
          <span>💨 ${weather.windSpeed} km/h</span>
          <span>🌧️ ${weather.rainChance}%</span>
        </div>
      </div>
    </div>

    <!-- Today's Top Mandi Prices -->
    <div class="section-header" style="margin-top: var(--space-4);">
      <h3 class="section-title">${t('quick.mandiPrice')}</h3>
      <button class="section-link" id="see-all-prices">${lang === 'hi' ? 'सभी देखें →' : 'See all →'}</button>
    </div>
    <div id="home-mandi-prices"></div>
  `;

  // Render top 4 mandi prices
  const mandiContainer = document.getElementById('home-mandi-prices');
  mandiPrices.slice(0, 4).forEach(item => {
    const crop = crops.find(c => c.id === item.crop);
    const change = item.price - item.prevPrice;
    const changePercent = ((change / item.prevPrice) * 100).toFixed(1);
    const isUp = change >= 0;

    mandiContainer.innerHTML += `
      <div class="mandi-card">
        <div class="mandi-card__icon">${crop?.emoji || '🌾'}</div>
        <div class="mandi-card__info">
          <div class="mandi-card__crop">${crop ? (lang === 'hi' ? crop.hi : crop.en) : item.crop}</div>
          <div class="mandi-card__mandi">${item.mandi}, ${item.state}</div>
        </div>
        <div class="mandi-card__prices">
          <div class="mandi-card__price">₹${item.price.toLocaleString('en-IN')}</div>
          <div class="mandi-card__unit">${t('market.perQuintal')}</div>
          <div class="mandi-card__trend ${isUp ? 'up' : 'down'}">
            ${isUp ? '▲' : '▼'} ${Math.abs(changePercent)}%
          </div>
        </div>
      </div>
    `;
  });

  // ── Quick Card Actions ──
  container.querySelectorAll('.quick-card').forEach(card => {
    card.addEventListener('click', () => {
      const action = card.dataset.action;
      switch(action) {
        case 'crop-health': navigateTo('field'); break;
        case 'weather': navigateTo('field'); break;
        case 'irrigation': navigateTo('field'); break;
        case 'mandi': navigateTo('market'); break;
        case 'scan': navigateTo('scan'); break;
        case 'records': navigateTo('records'); break;
      }
    });
  });

  // See all prices
  document.getElementById('see-all-prices')?.addEventListener('click', () => navigateTo('market'));

  // ── Voice Engine ──
  initVoiceEngine();
}

function initVoiceEngine() {
  const voiceBtn = document.getElementById('voice-btn');
  const hintEl = document.getElementById('voice-hint');
  const transcriptEl = document.getElementById('voice-transcript');
  const responseArea = document.getElementById('ai-response-area');
  let isListening = false;
  let recognition = null;

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    // Fallback for browsers without Speech API
    voiceBtn.addEventListener('click', () => {
      showDemoResponse(responseArea);
    });
    return;
  }

  recognition = new SpeechRecognition();
  recognition.lang = getSpeechLang();
  recognition.interimResults = true;
  recognition.continuous = false;
  recognition.maxAlternatives = 1;

  voiceBtn.addEventListener('click', () => {
    if (isListening) {
      recognition.stop();
      return;
    }

    isListening = true;
    voiceBtn.classList.add('listening');
    hintEl.textContent = t('voiceListening');
    transcriptEl.classList.remove('hidden');
    transcriptEl.classList.add('active');
    transcriptEl.textContent = '...';

    try {
      recognition.lang = getSpeechLang();
      recognition.start();
    } catch (e) {
      stopListening();
      showDemoResponse(responseArea);
    }
  });

  recognition.onresult = (event) => {
    let transcript = '';
    for (let i = event.resultIndex; i < event.results.length; i++) {
      transcript += event.results[i][0].transcript;
    }
    transcriptEl.textContent = transcript;

    if (event.results[event.results.length - 1].isFinal) {
      stopListening();
      processVoiceCommand(transcript, responseArea);
    }
  };

  recognition.onerror = () => {
    stopListening();
    showDemoResponse(responseArea);
  };

  recognition.onend = () => {
    stopListening();
  };

  function stopListening() {
    isListening = false;
    voiceBtn.classList.remove('listening');
    hintEl.textContent = t('voiceHint');
    transcriptEl.classList.remove('active');
  }
}

function processVoiceCommand(text, responseArea) {
  const lower = text.toLowerCase();
  const lang = getLang();

  let response = '';
  let actions = [];

  // Mandi / price queries
  if (lower.includes('मंडी') || lower.includes('भाव') || lower.includes('price') || lower.includes('mandi') || lower.includes('दाम')) {
    response = lang === 'hi'
      ? 'आज के मंडी भाव:<br>🌾 धान — ₹2,850/क्विंटल (आज़ादपुर) ▲2.5%<br>🌿 गेहूँ — ₹2,680/क्विंटल (इंदौर) ▼1.5%<br>🍅 टमाटर — ₹1,250/क्विंटल (नासिक) ▲27.6%<br><br>💡 टमाटर का भाव तेज़ी से बढ़ रहा है — अभी बेचने का अच्छा समय है!'
      : 'Today\'s mandi prices:<br>🌾 Rice — ₹2,850/quintal (Azadpur) ▲2.5%<br>🌿 Wheat — ₹2,680/quintal (Indore) ▼1.5%<br>🍅 Tomato — ₹1,250/quintal (Nasik) ▲27.6%<br><br>💡 Tomato prices are rising fast — good time to sell!';
    actions = [{ label: lang === 'hi' ? 'सभी भाव देखें' : 'See all prices', page: 'market' }];
  }
  // Weather queries
  else if (lower.includes('मौसम') || lower.includes('weather') || lower.includes('बारिश') || lower.includes('rain')) {
    response = lang === 'hi'
      ? 'आज: ⛅ 32°C, नमी 78%, हवा 12 km/h<br>🌧️ कल भारी बारिश (80% संभावना)<br>⚠️ छिड़काव न करें — हवा तेज़ है<br>💧 सिंचाई रोकें — बारिश आ रही है<br><br>बुधवार से मौसम साफ़ होगा — तब छिड़काव करें'
      : 'Today: ⛅ 32°C, Humidity 78%, Wind 12 km/h<br>🌧️ Heavy rain tomorrow (80% chance)<br>⚠️ Do not spray — high wind<br>💧 Hold irrigation — rain coming<br><br>Weather will clear Wednesday — spray then';
    actions = [{ label: lang === 'hi' ? 'पूरा पूर्वानुमान' : 'Full forecast', page: 'field' }];
  }
  // Crop health queries
  else if (lower.includes('फसल') || lower.includes('crop') || lower.includes('health') || lower.includes('स्वास्थ्य')) {
    response = lang === 'hi'
      ? '🌾 खेत #1 (धान, 5.2 एकड़):<br>✅ 72% क्षेत्र स्वस्थ<br>⚠️ 22% में हल्का तनाव — उत्तरी कोने में<br>🔴 6% गंभीर — ब्लास्ट के लक्षण दिख रहे हैं<br><br>💡 सिफारिश: उत्तरी कोने की जांच करें और ट्राइसाइक्लाज़ोल 0.6g/L छिड़कें (बुधवार को, जब मौसम साफ़ हो)'
      : '🌾 Field #1 (Rice, 5.2 acres):<br>✅ 72% area healthy<br>⚠️ 22% mild stress — north corner<br>🔴 6% critical — Blast symptoms visible<br><br>💡 Scout north corner, spray Tricyclazole 0.6g/L on Wednesday when weather clears';
    actions = [
      { label: lang === 'hi' ? 'खेत देखें' : 'View field', page: 'field' },
      { label: lang === 'hi' ? 'दवाई खरीदें' : 'Buy medicine', page: 'market' }
    ];
  }
  // Irrigation queries
  else if (lower.includes('सिंचाई') || lower.includes('irrigat') || lower.includes('पानी') || lower.includes('water')) {
    response = lang === 'hi'
      ? '💧 सिंचाई सलाह:<br>🚫 अभी सिंचाई न करें<br>📌 कारण: कल 80% बारिश की संभावना<br>📅 अगली सिंचाई: 19 अगस्त (मंगलवार)<br>💧 मात्रा: ~3,200 लीटर/एकड़<br>🌱 फसल चरण: कल्ले निकलना<br><br>बारिश के बाद खेत की नमी जांचें'
      : '💧 Irrigation advice:<br>🚫 Do not irrigate now<br>📌 Reason: 80% rain chance tomorrow<br>📅 Next irrigation: Aug 19 (Tuesday)<br>💧 Amount: ~3,200 liters/acre<br>🌱 Crop stage: Tillering<br><br>Check soil moisture after rain';
    actions = [{ label: lang === 'hi' ? 'विस्तार से देखें' : 'View details', page: 'field' }];
  }
  // Default
  else {
    response = lang === 'hi'
      ? `आपने कहा: "${text}"<br><br>मैं आपकी इन बातों में मदद कर सकता हूँ:<br>• मंडी भाव जानें<br>• मौसम और सिंचाई सलाह<br>• फसल स्वास्थ्य जांचें<br>• रोग पहचान करें<br>• खेती की तकनीक सीखें`
      : `You said: "${text}"<br><br>I can help you with:<br>• Mandi prices<br>• Weather & irrigation advice<br>• Crop health check<br>• Disease detection<br>• Farming techniques`;
  }

  showAIResponse(responseArea, response, actions);
  speakResponse(response);
}

function showAIResponse(container, html, actions = []) {
  const lang = getLang();
  let actionsHtml = actions.map(a => 
    `<button class="btn btn--sm btn--secondary ai-action-btn" data-page="${a.page}">${a.label}</button>`
  ).join('');

  container.innerHTML = `
    <div class="ai-response">
      <div class="ai-response__header">
        <div class="ai-response__avatar">रा</div>
        <span class="ai-response__name">${lang === 'hi' ? 'रामू काका' : 'Ramu Kaka'}</span>
      </div>
      <div class="ai-response__text">${html}</div>
      ${actionsHtml ? `<div class="ai-response__actions">${actionsHtml}</div>` : ''}
    </div>
  `;

  container.querySelectorAll('.ai-action-btn').forEach(btn => {
    btn.addEventListener('click', () => navigateTo(btn.dataset.page));
  });
}

function showDemoResponse(responseArea) {
  const lang = getLang();
  const response = lang === 'hi'
    ? '🙏 नमस्ते! मैं रामू काका हूँ।<br><br>आज की मुख्य बातें:<br>🌧️ कल भारी बारिश — छिड़काव और सिंचाई रोकें<br>🍅 टमाटर ₹1,250/क्विंटल — भाव बढ़ रहा है<br>⚠️ खेत #1 में ब्लास्ट के लक्षण — बुधवार को छिड़काव करें<br><br>नीचे के बटनों से या बोलकर कोई भी जानकारी लें!'
    : '🙏 Namaste! I am Ramu Kaka.<br><br>Today\'s highlights:<br>🌧️ Heavy rain tomorrow — hold spraying and irrigation<br>🍅 Tomato ₹1,250/quintal — prices rising<br>⚠️ Blast symptoms in Field #1 — spray Wednesday<br><br>Use buttons below or speak for any information!';
  
  showAIResponse(responseArea, response, [
    { label: lang === 'hi' ? 'मंडी भाव' : 'Mandi Prices', page: 'market' },
    { label: lang === 'hi' ? 'खेत देखें' : 'View Field', page: 'field' }
  ]);
}

function speakResponse(html) {
  if (!('speechSynthesis' in window)) return;
  
  // Strip HTML tags for speech
  const text = html.replace(/<br\s*\/?>/g, '. ').replace(/<[^>]*>/g, '').replace(/[•▲▼✅⚠️🔴💡📌📅💧🌱🚫🌾🌿🍅]/g, '');
  
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = getSpeechLang();
  utterance.rate = 0.9;
  utterance.pitch = 1;
  
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
}
