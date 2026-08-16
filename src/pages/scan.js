/* =============================================
   RAMU KAKA — Scan Page (Disease Detection)
   ============================================= */

import { t, getLang } from '../i18n/translations.js';
import { diseases, crops, products } from '../data/mock-data.js';
import { navigateTo, showToast } from '../main.js';

let scanHistory = JSON.parse(localStorage.getItem('rk-scan-history') || '[]');

export function renderScan(container) {
  const lang = getLang();

  container.innerHTML = `
    <h3 class="section-title" style="margin-bottom:var(--space-4);">${t('scan.title')}</h3>

    <!-- Camera Area -->
    <div class="scan-camera" id="scan-camera">
      <video id="camera-video" autoplay playsinline muted></video>
      <div class="scan-camera__overlay">
        <div class="scan-camera__frame"></div>
      </div>
      <div id="camera-placeholder" style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;color:white;gap:var(--space-3);background:linear-gradient(135deg,#1a1a1a,#2c2c2c);">
        <span style="font-size:3rem;">📸</span>
        <span style="font-size:var(--text-sm);opacity:0.8;text-align:center;padding:0 var(--space-4);">${t('scan.instruction')}</span>
      </div>
    </div>

    <!-- Capture & Upload Actions -->
    <div class="scan-actions">
      <button class="scan-upload-btn" id="upload-btn" title="${t('scan.upload')}">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
      </button>
      <button class="scan-capture-btn" id="capture-btn">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/></svg>
      </button>
      <button class="scan-upload-btn" id="switch-camera-btn" title="Switch camera">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>
      </button>
    </div>
    <input type="file" id="file-input" accept="image/*" capture="environment" class="hidden" />

    <!-- Result Area -->
    <div id="scan-result-area"></div>

    <!-- Scan History -->
    <div class="section-header" style="margin-top:var(--space-6);">
      <h3 class="section-title">${t('scan.scanHistory')}</h3>
      ${scanHistory.length > 0 ? `<button class="section-link" id="clear-history">${lang === 'hi' ? 'साफ़ करें' : 'Clear'}</button>` : ''}
    </div>
    <div id="scan-history">
      ${scanHistory.length === 0 ? `
        <div class="empty-state" style="padding:var(--space-8);">
          <div class="empty-state__icon">🔍</div>
          <div class="empty-state__title">${lang === 'hi' ? 'कोई पिछली जांच नहीं' : 'No previous scans'}</div>
          <div class="empty-state__desc">${lang === 'hi' ? 'ऊपर तस्वीर लें या अपलोड करें' : 'Take or upload a photo above'}</div>
        </div>
      ` : scanHistory.map(h => `
        <div class="mandi-card" style="cursor:pointer;" data-history-disease="${h.diseaseId}">
          <div class="mandi-card__icon">${h.severity === 'severe' ? '🔴' : h.severity === 'moderate' ? '🟡' : '🟢'}</div>
          <div class="mandi-card__info">
            <div class="mandi-card__crop">${h.name}</div>
            <div class="mandi-card__mandi">${h.date}</div>
          </div>
          <div class="mandi-card__prices">
            <span class="badge badge--${h.severity === 'severe' ? 'danger' : h.severity === 'moderate' ? 'warning' : 'success'}">
              ${lang === 'hi' ? (h.severity === 'severe' ? 'गंभीर' : h.severity === 'moderate' ? 'मध्यम' : 'हल्का') : h.severity}
            </span>
          </div>
        </div>
      `).join('')}
    </div>
  `;

  // Camera initialization
  initCamera(container);

  // File upload
  const fileInput = document.getElementById('file-input');
  document.getElementById('upload-btn').addEventListener('click', () => fileInput.click());
  fileInput.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
      simulateAnalysis(container);
    }
  });

  // Capture
  document.getElementById('capture-btn').addEventListener('click', () => {
    simulateAnalysis(container);
  });

  // Clear history
  document.getElementById('clear-history')?.addEventListener('click', () => {
    scanHistory = [];
    localStorage.setItem('rk-scan-history', '[]');
    renderScan(container);
  });

  // History items
  container.querySelectorAll('[data-history-disease]').forEach(el => {
    el.addEventListener('click', () => {
      const disease = diseases.find(d => d.id === el.dataset.historyDisease);
      if (disease) showDiseaseResult(container, disease);
    });
  });
}

function initCamera(container) {
  const video = document.getElementById('camera-video');
  const placeholder = document.getElementById('camera-placeholder');

  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
      .then(stream => {
        video.srcObject = stream;
        placeholder.style.display = 'none';

        // Clean up on page change
        const observer = new MutationObserver(() => {
          if (!document.contains(video)) {
            stream.getTracks().forEach(t => t.stop());
            observer.disconnect();
          }
        });
        observer.observe(document.getElementById('page-container'), { childList: true });
      })
      .catch(() => {
        // Camera not available — keep placeholder
      });
  }
}

function simulateAnalysis(container) {
  const lang = getLang();
  const resultArea = document.getElementById('scan-result-area');

  // Show analyzing animation
  resultArea.innerHTML = `
    <div class="card" style="text-align:center;padding:var(--space-8);">
      <div style="font-size:2.5rem;animation:spin 1.5s linear infinite;">⚙️</div>
      <div style="margin-top:var(--space-3);font-size:var(--text-base);font-weight:var(--font-semibold);">${t('scan.analyzing')}</div>
      <div class="gauge" style="margin-top:var(--space-3);"><div class="gauge__fill gauge__fill--primary" style="width:0%;animation:analyzeProgress 2s ease forwards;"></div></div>
    </div>
    <style>
      @keyframes analyzeProgress { 0% { width: 0%; } 100% { width: 100%; } }
    </style>
  `;

  // After 2 seconds, show result
  setTimeout(() => {
    // Pick a random disease
    const disease = diseases[Math.floor(Math.random() * diseases.length)];
    showDiseaseResult(container, disease);

    // Add to history
    const historyItem = {
      diseaseId: disease.id,
      name: lang === 'hi' ? disease.hi : disease.en,
      severity: disease.severity,
      date: new Date().toLocaleDateString(lang === 'hi' ? 'hi-IN' : 'en-IN')
    };
    scanHistory.unshift(historyItem);
    if (scanHistory.length > 10) scanHistory.pop();
    localStorage.setItem('rk-scan-history', JSON.stringify(scanHistory));
  }, 2000);
}

function showDiseaseResult(container, disease) {
  const lang = getLang();
  const resultArea = document.getElementById('scan-result-area');
  const crop = crops.find(c => c.id === disease.crop);
  const linkedProds = disease.linkedProducts.map(id => products.find(p => p.id === id)).filter(Boolean);

  const severityColors = { mild: '#4CAF50', moderate: '#FF9800', severe: '#F44336' };
  const severityBg = { mild: '#E8F5E9', moderate: '#FFF3E0', severe: '#FFEBEE' };

  resultArea.innerHTML = `
    <div class="disease-result card" style="margin-top:var(--space-4);">
      <!-- Header -->
      <div class="disease-result__header">
        <div class="disease-result__severity" style="background:${severityBg[disease.severity]};color:${severityColors[disease.severity]};">
          ${disease.severity === 'severe' ? '🔴' : disease.severity === 'moderate' ? '🟡' : '🟢'}
        </div>
        <div>
          <div class="disease-result__name">${lang === 'hi' ? disease.hi : disease.en}</div>
          <div class="disease-result__scientific">${disease.scientific}</div>
          <div style="margin-top:4px;">
            <span class="badge badge--${disease.severity === 'severe' ? 'danger' : disease.severity === 'moderate' ? 'warning' : 'success'}">
              ${t('scan.severity')}: ${t(`scan.${disease.severity}`)}
            </span>
            <span class="badge badge--primary" style="margin-left:4px;">
              ${crop?.emoji} ${lang === 'hi' ? crop?.hi : crop?.en}
            </span>
          </div>
        </div>
      </div>

      <!-- Symptoms -->
      <div class="disease-result__section">
        <div class="disease-result__section-title">🔍 ${lang === 'hi' ? 'लक्षण' : 'Symptoms'}</div>
        <ul class="disease-result__list">
          ${disease.symptoms.map(s => `<li>${s}</li>`).join('')}
        </ul>
      </div>

      <!-- Organic Treatment -->
      <div class="disease-result__section">
        <div class="disease-result__section-title">🌱 ${t('scan.organic')}</div>
        <ul class="disease-result__list">
          ${disease.organicTreatment.map(s => `<li>${s}</li>`).join('')}
        </ul>
      </div>

      <!-- Chemical Treatment -->
      <div class="disease-result__section">
        <div class="disease-result__section-title">🧪 ${t('scan.chemical')}</div>
        <ul class="disease-result__list">
          ${disease.chemicalTreatment.map(s => `<li>${s}</li>`).join('')}
        </ul>
      </div>

      <!-- Prevention -->
      <div class="disease-result__section">
        <div class="disease-result__section-title">🛡️ ${t('scan.prevention')}</div>
        <ul class="disease-result__list">
          ${disease.prevention.map(s => `<li>${s}</li>`).join('')}
        </ul>
      </div>

      <!-- Linked Products -->
      ${linkedProds.length > 0 ? `
        <div class="disease-result__section">
          <div class="disease-result__section-title">🛒 ${t('scan.buyProduct')}</div>
          <div style="display:flex;flex-direction:column;gap:var(--space-2);">
            ${linkedProds.map(p => `
              <div class="mandi-card" style="cursor:pointer;" onclick="window.RK_navigateMarket && window.RK_navigateMarket()">
                <div class="mandi-card__icon">${p.image}</div>
                <div class="mandi-card__info">
                  <div class="mandi-card__crop">${p.name}</div>
                  <div class="mandi-card__mandi">${p.brand}</div>
                </div>
                <div class="mandi-card__prices">
                  <div class="mandi-card__price">₹${p.price}</div>
                  <div class="mandi-card__unit">/${p.unit}</div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}

      <!-- Action Buttons -->
      <div style="display:flex;gap:var(--space-2);margin-top:var(--space-4);">
        <button class="btn btn--primary btn--block" id="buy-medicine-btn">${t('scan.buyProduct')}</button>
        <button class="btn btn--outline" id="new-scan-btn">${t('scan.newScan')}</button>
      </div>
    </div>
  `;

  // Action handlers
  document.getElementById('buy-medicine-btn')?.addEventListener('click', () => navigateTo('market'));
  document.getElementById('new-scan-btn')?.addEventListener('click', () => {
    resultArea.innerHTML = '';
    showToast(lang === 'hi' ? 'नई जांच के लिए तैयार' : 'Ready for new scan', 'info');
  });

  window.RK_navigateMarket = () => navigateTo('market');

  // Scroll to result
  resultArea.scrollIntoView({ behavior: 'smooth' });
}
