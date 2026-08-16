/* =======================================================
   RAMU KAKA — 01: Farm View (Primary Map-First Experience)
   ======================================================= */

import { farmData } from '../data/mock-data.js';
import { getLanguage, t } from '../i18n/translations.js';
import { voiceOverlay } from '../components/voice-overlay.js';

let mapInstance = null;
let activeField = null;

export function renderFarmView(container) {
  const lang = getLanguage();
  const weather = farmData.weather;
  const fields = farmData.fields;

  // Primary recommendation focuses on Field 2 stress
  const heroRec = fields[1].recommendation;

  container.innerHTML = `
    <div class="farm-view-container">
      <!-- Top Contextual Floating Overlays (Section 8) -->
      <div class="map-floating-bar">
        <div class="map-chip">
          <span>🌦️</span>
          <span>${weather.temp}°C · ${lang === 'hi' ? 'उमस' : 'Humid'}</span>
        </div>
        <div class="map-chip map-chip--water">
          <span>💧</span>
          <span>${lang === 'hi' ? 'सिंचाई रोकें (कल बारिश)' : 'Hold Irrigation (Rain Tomorrow)'}</span>
        </div>
        <div class="map-chip map-chip--crop">
          <span>🌱</span>
          <span>${lang === 'hi' ? 'धान · वानस्पतिक चरण' : 'Rice · Vegetative'}</span>
        </div>
        <div class="map-chip map-chip--alert" id="chip-stress-alert">
          <span>🔴</span>
          <span>${lang === 'hi' ? 'खेत 2 में तनाव' : 'Stress in Field 2'}</span>
        </div>
      </div>

      <!-- Map Canvas (Section 7) -->
      <div id="farm-map" class="farm-map-canvas"></div>

      <!-- Today's Single Actionable Recommendation Card (Section 9) -->
      <div class="recommendation-card" id="farm-recommendation-card">
        <div class="recommendation-tag">
          <span class="recommendation-label">${t('todayRecommendation')}</span>
          <span class="badge-alert-dot">🔴</span>
        </div>
        <div class="recommendation-title">
          ${lang === 'hi' ? heroRec.title : '🔴 Check Field 2 today'}
        </div>
        <div class="recommendation-desc">
          ${lang === 'hi' ? heroRec.desc : 'Ramu detected unusual crop stress in the south-east corner.'}
        </div>
        <div class="recommendation-actions">
          <button class="btn-why" id="btn-toggle-why">${t('whyDetails')}</button>
          <button class="btn-action-primary" id="btn-view-stress-field">
            ${t('viewField')}
          </button>
        </div>

        <!-- Progressive Disclosure Drawer (Section 6) -->
        <div class="why-drawer hidden" id="why-drawer-content">
          <strong>${lang === 'hi' ? 'रामू का विश्लेषण:' : "Ramu's Analysis:"}</strong><br />
          • ${lang === 'hi' ? 'सैटेलाइट इंडेक्स: NDVI 0.52 (अपेक्षित से कम)' : 'Satellite NDVI: 0.52 (lower than expected)'}<br />
          • ${lang === 'hi' ? 'नमी: 52% | तापमान: 28°C (कवक अनुकूल)' : 'Soil Moisture: 52% | Temp: 28°C (Fungal favorable)'}<br />
          • ${lang === 'hi' ? 'सुझाव: खेत 2 की पत्तियों की तुरंत जांच करें।' : 'Recommendation: Inspect leaves in Field 2 immediately.'}
        </div>
      </div>

      <!-- Field Detail Modal / Side Sheet (when a field is tapped) -->
      <div class="field-detail-sheet hidden" id="field-detail-sheet">
        <div class="field-detail-header">
          <h4 id="sheet-field-name">खेत 2 (टमाटर)</h4>
          <button id="close-field-sheet" style="font-size: 1.1rem; color: var(--color-text-muted);">✕</button>
        </div>
        <div style="margin-bottom: 8px;">
          <span id="sheet-status-badge" class="field-status-badge field-status-badge--stress">🔴 तनाव क्षेत्र</span>
          <span id="sheet-crop-info" style="font-size: 0.8rem; color: var(--color-text-secondary); margin-left: 6px;">अर्का रक्षक · 1.1 एकड़</span>
        </div>
        <div style="font-size: 0.85rem; color: var(--color-text-main); margin-bottom: 12px;" id="sheet-recommendation">
          पत्तियों पर पीले-भूरे धब्बे दिखे हैं। रोग पहचान के लिए पत्ती की फोटो लें।
        </div>
        <div style="display: flex; gap: 8px;">
          <button class="btn-action-primary" style="flex: 1; font-size: 0.8rem;" id="btn-sheet-diagnose">
            📷 रोग जांचें (Diagnose)
          </button>
          <button class="btn-why" style="font-size: 0.8rem;" id="btn-sheet-ask-ramu">
            🎙️ रामू से पूछें
          </button>
        </div>
      </div>
    </div>
  `;

  // Attach Interaction Listeners
  setupFarmInteractions();

  // Initialize Leaflet Satellite Map
  setTimeout(() => initSatelliteMap(), 80);
}

function setupFarmInteractions() {
  const whyBtn = document.getElementById('btn-toggle-why');
  const whyDrawer = document.getElementById('why-drawer-content');
  const viewFieldBtn = document.getElementById('btn-view-stress-field');
  const stressChip = document.getElementById('chip-stress-alert');
  const closeSheetBtn = document.getElementById('close-field-sheet');
  const sheetDiagnoseBtn = document.getElementById('btn-sheet-diagnose');
  const sheetAskRamuBtn = document.getElementById('btn-sheet-ask-ramu');

  whyBtn?.addEventListener('click', () => {
    whyDrawer?.classList.toggle('hidden');
  });

  const focusOnField2 = () => {
    if (mapInstance) {
      mapInstance.flyTo([26.8540, 80.9165], 17, { duration: 1.2 });
      showFieldSheet(farmData.fields[1]);
    }
  };

  viewFieldBtn?.addEventListener('click', focusOnField2);
  stressChip?.addEventListener('click', focusOnField2);

  closeSheetBtn?.addEventListener('click', () => {
    document.getElementById('field-detail-sheet')?.classList.add('hidden');
  });

  sheetDiagnoseBtn?.addEventListener('click', () => {
    window.RK_Router?.navigate('crop');
  });

  sheetAskRamuBtn?.addEventListener('click', () => {
    voiceOverlay.show('farm');
  });
}

function initSatelliteMap() {
  const mapEl = document.getElementById('farm-map');
  if (!mapEl || typeof L === 'undefined') return;

  // Cleanup old map instance
  if (mapInstance) {
    try { mapInstance.remove(); } catch(e){}
    mapInstance = null;
  }

  // Centered on Rajesh's farm in UP
  mapInstance = L.map(mapEl, {
    center: [26.8520, 80.9130],
    zoom: 16,
    zoomControl: false,
    attributionControl: false
  });

  // ESRI World Imagery (High-Res Satellite)
  L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 19
  }).addTo(mapInstance);

  // Field 1 (Rice - Healthy 🟢)
  const f1 = farmData.fields[0];
  const poly1 = L.polygon(f1.polygon, {
    color: '#2E7D32',
    weight: 3,
    fillColor: '#4CAF50',
    fillOpacity: 0.35
  }).addTo(mapInstance);

  poly1.on('click', () => {
    mapInstance.flyTo(f1.center, 17);
    showFieldSheet(f1);
  });

  // Label Field 1
  L.marker(f1.center, {
    icon: L.divIcon({
      className: 'custom-map-label',
      html: `<div style="background:rgba(30,63,32,0.85);color:white;padding:3px 8px;border-radius:12px;font-size:11px;font-weight:bold;white-space:nowrap;border:1px solid #81C784;">🟢 ${f1.name} (धान)</div>`
    })
  }).addTo(mapInstance);

  // Field 2 (Tomato - Stress 🔴)
  const f2 = farmData.fields[1];
  const poly2 = L.polygon(f2.polygon, {
    color: '#D32F2F',
    weight: 3,
    fillColor: '#E53935',
    fillOpacity: 0.45
  }).addTo(mapInstance);

  // Specific Stress Hotspot Circle inside Field 2
  L.circle([26.8546, 80.9175], {
    radius: 18,
    color: '#FF1744',
    fillColor: '#FF1744',
    fillOpacity: 0.6,
    weight: 2
  }).addTo(mapInstance).bindTooltip('🔴 तनाव क्षेत्र (Crop Stress Spot)', { permanent: true, direction: 'top' });

  poly2.on('click', () => {
    mapInstance.flyTo(f2.center, 17);
    showFieldSheet(f2);
  });

  // Label Field 2
  L.marker(f2.center, {
    icon: L.divIcon({
      className: 'custom-map-label',
      html: `<div style="background:rgba(211,47,47,0.9);color:white;padding:3px 8px;border-radius:12px;font-size:11px;font-weight:bold;white-space:nowrap;border:1px solid #FF8A80;">🔴 ${f2.name} (टमाटर)</div>`
    })
  }).addTo(mapInstance);

  // ── Draw User's Farm Boundary from Onboarding ──
  const savedBoundary = localStorage.getItem('rk-farm-boundary');
  if (savedBoundary) {
    try {
      const farmPoints = JSON.parse(savedBoundary);
      if (Array.isArray(farmPoints) && farmPoints.length >= 3) {
        // Draw the outer farm boundary
        const farmBoundary = L.polygon(farmPoints, {
          color: '#D9BE8C',
          weight: 2.5,
          fillColor: 'transparent',
          fillOpacity: 0,
          dashArray: '8, 6',
          className: 'farm-boundary-outline'
        }).addTo(mapInstance);

        // Add corner pin markers
        farmPoints.forEach((pt, idx) => {
          L.marker(pt, {
            icon: L.divIcon({
              className: 'farm-corner-pin',
              html: `<div style="width:18px;height:18px;border-radius:50%;background:#1F4030;border:2px solid #D9BE8C;display:flex;align-items:center;justify-content:center;font-size:9px;color:#F1E7CC;font-weight:bold;box-shadow:0 2px 6px rgba(0,0,0,0.3);">${idx + 1}</div>`,
              iconSize: [18, 18],
              iconAnchor: [9, 9]
            })
          }).addTo(mapInstance);
        });

        // Add "My Farm" label at center of boundary
        const bounds = farmBoundary.getBounds();
        const center = bounds.getCenter();
        const lang = getLanguage();
        L.marker(center, {
          icon: L.divIcon({
            className: 'custom-map-label',
            html: `<div style="background:rgba(31,64,48,0.85);color:#F1E7CC;padding:3px 10px;border-radius:12px;font-size:11px;font-weight:bold;white-space:nowrap;border:1.5px solid #D9BE8C;">🏡 ${lang === 'hi' ? 'मेरा खेत' : 'My Farm'}</div>`,
            iconAnchor: [40, -5]
          })
        }).addTo(mapInstance);

        // Fit map to show the full farm boundary
        mapInstance.fitBounds(bounds.pad(0.08), { maxZoom: 17 });
      }
    } catch (e) {
      console.warn('Failed to parse farm boundary:', e);
    }
  }
}

function showFieldSheet(field) {
  const sheet = document.getElementById('field-detail-sheet');
  const nameEl = document.getElementById('sheet-field-name');
  const badgeEl = document.getElementById('sheet-status-badge');
  const cropEl = document.getElementById('sheet-crop-info');
  const recEl = document.getElementById('sheet-recommendation');
  const lang = getLanguage();

  if (!sheet) return;

  sheet.classList.remove('hidden');
  nameEl.textContent = field.name;
  cropEl.textContent = `${field.cropName} · ${field.area} ${field.unit}`;

  if (field.status === 'healthy') {
    badgeEl.className = 'field-status-badge field-status-badge--healthy';
    badgeEl.textContent = lang === 'hi' ? '🟢 स्वस्थ फसल (Healthy)' : '🟢 Healthy Crop';
    recEl.textContent = lang === 'hi' ? 'फसल की बढ़वार अच्छी है। कल बारिश होने वाली है, इसलिए आज पानी न दें।' : 'Crop is in great health. Rain is expected tomorrow, so hold irrigation today.';
  } else {
    badgeEl.className = 'field-status-badge field-status-badge--stress';
    badgeEl.textContent = lang === 'hi' ? '🔴 तनाव क्षेत्र (Investigate)' : '🔴 Stress Zone';
    recEl.textContent = lang === 'hi' ? 'पत्तियों पर संकेंद्रित धब्बे (Early Blight) दिखे हैं। कैमरा खोलकर पत्ती की फोटो लें।' : 'Concentric spots detected on leaves. Open camera to diagnose.';
  }
}
