/* =======================================================
   RAMU KAKA — 02: Crop & Disease View (Camera-First)
   Section 11 & Section 12 of Master Vibe-Coding Prompt
   ======================================================= */

import { cropDiagnosisMock, farmData } from '../data/mock-data.js';
import { getLanguage, t } from '../i18n/translations.js';
import { voiceOverlay } from '../components/voice-overlay.js';

let streamTrack = null;

export function renderCropView(container) {
  const lang = getLanguage();
  const diag = cropDiagnosisMock;

  container.innerHTML = `
    <div class="crop-view-container">
      <div class="crop-header-section">
        <div>
          <h2>${lang === 'hi' ? 'फसल व रोग पहचान' : 'Crop & Disease Diagnosis'}</h2>
          <p style="font-size: var(--text-xs); color: var(--color-text-secondary);">
            ${lang === 'hi' ? 'खेत 2 (टमाटर) · 1.1 एकड़' : 'Field 2 (Tomato) · 1.1 Acres'}
          </p>
        </div>
        <button class="btn-why" id="btn-crop-ask-ramu">
          🎙️ ${t('askRamu')}
        </button>
      </div>

      <!-- CAMERA-FIRST SECTION (Section 11) -->
      <div class="camera-viewfinder-card" id="camera-box">
        <video id="camera-video-stream" class="camera-stream-video" autoplay playsinline muted></video>
        <div class="camera-guide-reticle"></div>
        <div class="camera-guide-text" id="camera-guide-text">
          📸 ${lang === 'hi' ? 'प्रभावित पत्ती को फ्रेम के बीच में रखें' : 'Frame affected leaf in the center'}
        </div>
        <canvas id="camera-capture-canvas" class="hidden"></canvas>
      </div>

      <!-- Capture Controls -->
      <div class="camera-actions-row">
        <input type="file" id="file-upload-input" accept="image/*" class="hidden" />
        <button class="btn-upload-subtle" id="btn-upload-trigger">
          📁 ${lang === 'hi' ? 'गैलरी से चुनें' : 'Upload Photo'}
        </button>
        <button class="btn-shutter" id="btn-capture-shutter">
          <span>📷</span>
          <span>${lang === 'hi' ? 'पत्ती की फोटो लें' : 'Take Crop Photo'}</span>
        </button>
      </div>

      <!-- POST-SCAN DIAGNOSIS CARD (Action First, then Why/Technical) -->
      <div class="diagnosis-result-card hidden" id="diagnosis-card">
        <div class="diagnosis-header">
          <div class="diagnosis-photo-thumb" style="display:flex;align-items:center;justify-content:center;font-size:2rem;background:#FDF1ED;">
            🍂
          </div>
          <div class="diagnosis-meta">
            <span class="diagnosis-badge-alert">${diag.alertLevel}</span>
            <h3 class="diagnosis-condition-name">${lang === 'hi' ? diag.conditionName : diag.conditionEn}</h3>
            <span class="diagnosis-confidence">${lang === 'hi' ? 'सटीकता (Confidence):' : 'Confidence:'} ${diag.confidence}%</span>
          </div>
        </div>

        <!-- ACTION FIRST BOX (Crucial rule from Section 11) -->
        <div class="diagnosis-action-box">
          <div class="action-box-title">${diag.actionTitle}</div>
          <div class="action-box-text">${lang === 'hi' ? diag.actionText : 'Inspect nearby plants and remove heavily affected leaves. Apply protective bio-control.'}</div>
        </div>

        <div style="display:flex;gap:10px;margin-bottom:14px;">
          <button class="btn-action-primary" style="flex:1;" id="btn-diag-ask-ramu">
            🎙️ ${lang === 'hi' ? 'रामू से सलाह लें' : 'Ask Ramu'}
          </button>
          <button class="btn-upload-subtle" id="btn-diag-buy-medicine">
            🛒 ${lang === 'hi' ? 'दवाई देखें (Market)' : 'Buy Medicine'}
          </button>
        </div>

        <!-- Progressive Disclosure: Why detected & Technical details -->
        <div style="display:flex;flex-direction:column;gap:8px;border-top:1px solid var(--color-border-subtle);padding-top:12px;">
          <div>
            <button class="btn-why" id="toggle-why-detect" style="font-size:0.8rem;">
              ${lang === 'hi' ? 'यह रोग क्यों पहचाना गया? ▼' : 'Why did we detect this? ▼'}
            </button>
            <div class="why-drawer hidden" id="drawer-why-detect" style="margin-top:6px;">
              ${diag.whyDetected}
            </div>
          </div>

          <div>
            <button class="btn-why" id="toggle-tech-details" style="font-size:0.8rem;">
              ${lang === 'hi' ? 'तकनीकी विवरण व उपचार विधि ▼' : 'Technical details & treatment ▼'}
            </button>
            <div class="why-drawer hidden" id="drawer-tech-details" style="margin-top:6px;">
              ${diag.technicalDetails}
            </div>
          </div>
        </div>
      </div>

      <!-- CROP PLAN & THIS WEEK CHECKLIST (Section 12) -->
      <div class="crop-plan-section">
        <div class="crop-plan-header">
          <div>
            <h3 style="font-size: var(--text-base); font-weight: var(--weight-bold);">
              🌾 ${lang === 'hi' ? 'धान फसल कैलेंडर' : 'Rice Crop Plan'}
            </h3>
            <span style="font-size:0.75rem; color:var(--color-text-muted);">
              ${lang === 'hi' ? 'वानस्पतिक अवस्था · बुवाई: 15 जुलाई' : 'Vegetative Stage · Sown: 15 July'}
            </span>
          </div>
          <span class="badge-healthy-dot" style="font-size:0.8rem;color:var(--color-healthy-green);font-weight:bold;">
            🟢 ${lang === 'hi' ? 'सक्रिय' : 'Active'}
          </span>
        </div>

        <div style="margin-top: 10px;">
          <div style="font-size:0.75rem;font-weight:bold;color:var(--color-turmeric-dark);text-transform:uppercase;margin-bottom:6px;">
            ${lang === 'hi' ? 'इस सप्ताह के कार्य (This Week):' : 'This Week\'s Checklist:'}
          </div>
          <div class="crop-checklist-item">
            <span>🌱</span>
            <span style="flex:1;">${lang === 'hi' ? 'कल्ले निकलने की संख्या जांचें (25-30 कल्ले प्रति पौधा)' : 'Check tillering count (25-30 per hill)'}</span>
            <span style="color:var(--color-healthy-green);font-weight:bold;">✓</span>
          </div>
          <div class="crop-checklist-item">
            <span>💧</span>
            <span style="flex:1;">${lang === 'hi' ? 'खेत में 3-5 सेमी पानी का स्तर बनाए रखें (बारिश के बाद)' : 'Maintain 3-5 cm water level after rain'}</span>
            <span style="color:var(--color-text-muted);">⏳</span>
          </div>
          <div class="crop-checklist-item">
            <span>🔍</span>
            <span style="flex:1;">${lang === 'hi' ? 'तना छेदक व झुलसा कीटों के लिए नियमित निरीक्षण करें' : 'Scout for stem borer and leaf blast'}</span>
            <span style="color:var(--color-text-muted);">⏳</span>
          </div>
        </div>
      </div>
    </div>
  `;

  setupCameraAndInteractions(container);
}

function setupCameraAndInteractions(container) {
  const video = document.getElementById('camera-video-stream');
  const shutterBtn = document.getElementById('btn-capture-shutter');
  const uploadBtn = document.getElementById('btn-upload-trigger');
  const fileInput = document.getElementById('file-upload-input');
  const diagCard = document.getElementById('diagnosis-card');
  const askRamuCrop = document.getElementById('btn-crop-ask-ramu');
  const diagAskRamu = document.getElementById('btn-diag-ask-ramu');
  const diagBuyMed = document.getElementById('btn-diag-buy-medicine');

  // Progressive disclosure triggers
  document.getElementById('toggle-why-detect')?.addEventListener('click', () => {
    document.getElementById('drawer-why-detect')?.classList.toggle('hidden');
  });

  document.getElementById('toggle-tech-details')?.addEventListener('click', () => {
    document.getElementById('drawer-tech-details')?.classList.toggle('hidden');
  });

  // Try live camera access
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
      .then(stream => {
        video.srcObject = stream;
        streamTrack = stream;
      })
      .catch(() => {
        // Fallback gracefully without error
      });
  }

  // Shutter or Upload trigger simulated instant AI diagnosis
  const runDiagnosis = () => {
    const guideText = document.getElementById('camera-guide-text');
    if (guideText) guideText.textContent = getLanguage() === 'hi' ? '⚡ विश्लेषण हो रहा है...' : '⚡ Analyzing leaf symptoms...';

    setTimeout(() => {
      diagCard?.classList.remove('hidden');
      diagCard?.scrollIntoView({ behavior: 'smooth' });
      if (guideText) guideText.textContent = getLanguage() === 'hi' ? '✅ पत्ती की जांच पूरी हुई' : '✅ Leaf scan complete';
    }, 900);
  };

  shutterBtn?.addEventListener('click', runDiagnosis);
  uploadBtn?.addEventListener('click', () => fileInput?.click());
  fileInput?.addEventListener('change', runDiagnosis);

  askRamuCrop?.addEventListener('click', () => voiceOverlay.show('crop'));
  diagAskRamu?.addEventListener('click', () => voiceOverlay.show('crop'));
  diagBuyMed?.addEventListener('click', () => window.RK_Router?.navigate('market'));
}
