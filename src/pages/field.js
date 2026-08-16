/* =============================================
   RAMU KAKA — Field Page
   ============================================= */

import { t, getLang } from '../i18n/translations.js';
import { weatherData, fieldData, crops } from '../data/mock-data.js';

export function renderField(container) {
  const lang = getLang();
  const field = fieldData.fields[0];
  const crop = crops.find(c => c.id === field.crop);
  const weather = weatherData;
  const irrigation = fieldData.irrigationAdvice;

  container.innerHTML = `
    <div class="section-header">
      <h3 class="section-title">${t('field.title')}</h3>
      <button class="btn btn--sm btn--secondary" id="add-field-btn">+ ${t('field.addField')}</button>
    </div>

    <!-- Field Selector Chips -->
    <div class="category-filter" style="margin-bottom: var(--space-3);">
      ${fieldData.fields.map((f, i) => `
        <button class="chip ${i === 0 ? 'active' : ''}" data-field-id="${f.id}">
          ${crops.find(c => c.id === f.crop)?.emoji || '🌾'} ${f.name}
        </button>
      `).join('')}
    </div>

    <!-- Map Container -->
    <div class="field-map-container" id="field-map">
      <div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background: linear-gradient(135deg, #2D5016, #3D6B1E);color:white;flex-direction:column;gap:8px;">
        <span style="font-size:2rem;">🗺️</span>
        <span style="font-size:0.8rem;opacity:0.8;">${lang === 'hi' ? 'मैप लोड हो रहा है...' : 'Loading map...'}</span>
      </div>
    </div>

    <!-- Map Controls -->
    <div style="display:flex;gap:var(--space-2);margin-bottom:var(--space-4);">
      <button class="chip active" data-view="satellite">${t('field.satellite')}</button>
      <button class="chip" data-view="ndvi">${t('field.ndvi')}</button>
      <button class="chip" data-view="normal">${t('field.normal')}</button>
    </div>

    <!-- Field Stats -->
    <div class="field-stats">
      <div class="field-stat">
        <div class="field-stat__value">${field.area} <small>${t('field.acres')}</small></div>
        <div class="field-stat__label">${t('field.area')}</div>
      </div>
      <div class="field-stat">
        <div class="field-stat__value">${crop?.emoji} ${lang === 'hi' ? crop?.hi : crop?.en}</div>
        <div class="field-stat__label">${crop?.stages[field.stage] || ''}</div>
      </div>
      <div class="field-stat">
        <div class="field-stat__value" style="color: ${field.ndviAvg > 0.65 ? 'var(--color-success)' : field.ndviAvg > 0.4 ? 'var(--color-warning)' : 'var(--color-danger)'};">${field.ndviAvg.toFixed(2)}</div>
        <div class="field-stat__label">NDVI ${lang === 'hi' ? 'औसत' : 'Average'}</div>
      </div>
      <div class="field-stat">
        <div class="field-stat__value" style="color: ${field.soilMoisture > 60 ? 'var(--color-info)' : field.soilMoisture > 35 ? 'var(--color-warning)' : 'var(--color-danger)'};">${field.soilMoisture}%</div>
        <div class="field-stat__label">${t('field.soilMoisture')}</div>
      </div>
    </div>

    <!-- Crop Health -->
    <div class="card card--primary" style="margin-bottom: var(--space-4);">
      <div class="card__header">
        <span class="card__title">${t('field.cropHealth')}</span>
        <span class="badge badge--${field.healthZones.healthy > 60 ? 'success' : 'warning'}">${field.healthZones.healthy > 60 ? t('field.healthy') : t('field.stressed')}</span>
      </div>
      <div style="display:flex;gap:var(--space-2);margin-bottom:var(--space-3);">
        <div style="flex:${field.healthZones.healthy};height:12px;background:var(--color-health-good);border-radius:var(--radius-full) 0 0 var(--radius-full);"></div>
        <div style="flex:${field.healthZones.stressed};height:12px;background:var(--color-health-moderate);"></div>
        <div style="flex:${field.healthZones.critical};height:12px;background:var(--color-health-critical);border-radius:0 var(--radius-full) var(--radius-full) 0;"></div>
      </div>
      <div style="display:flex;gap:var(--space-4);font-size:var(--text-sm);">
        <span style="color:var(--color-health-good);">● ${field.healthZones.healthy}% ${t('field.healthy')}</span>
        <span style="color:var(--color-health-moderate);">● ${field.healthZones.stressed}% ${t('field.stressed')}</span>
        <span style="color:var(--color-health-critical);">● ${field.healthZones.critical}% ${t('field.critical')}</span>
      </div>
    </div>

    <!-- Nutrient Map -->
    <div class="card" style="margin-bottom: var(--space-4);">
      <div class="card__header">
        <span class="card__title">${t('field.nutrientMap')}</span>
      </div>
      <div style="display:flex;flex-direction:column;gap:var(--space-3);">
        <div>
          <div style="display:flex;justify-content:space-between;font-size:var(--text-sm);margin-bottom:4px;">
            <span>🟢 ${lang === 'hi' ? 'नाइट्रोजन (N)' : 'Nitrogen (N)'}</span>
            <span class="badge badge--danger">${t('field.nitrogenLow')}</span>
          </div>
          <div class="gauge"><div class="gauge__fill gauge__fill--danger" style="width:35%;"></div></div>
        </div>
        <div>
          <div style="display:flex;justify-content:space-between;font-size:var(--text-sm);margin-bottom:4px;">
            <span>🟠 ${lang === 'hi' ? 'फॉस्फोरस (P)' : 'Phosphorus (P)'}</span>
            <span class="badge badge--success">${t('field.phosphorusOk')}</span>
          </div>
          <div class="gauge"><div class="gauge__fill gauge__fill--success" style="width:72%;"></div></div>
        </div>
        <div>
          <div style="display:flex;justify-content:space-between;font-size:var(--text-sm);margin-bottom:4px;">
            <span>🟣 ${lang === 'hi' ? 'पोटैशियम (K)' : 'Potassium (K)'}</span>
            <span class="badge badge--warning">${t('field.potassiumLow')}</span>
          </div>
          <div class="gauge"><div class="gauge__fill gauge__fill--warning" style="width:45%;"></div></div>
        </div>
      </div>
      <div style="margin-top:var(--space-3);padding:var(--space-3);background:var(--color-primary-50);border-radius:var(--radius-md);font-size:var(--text-sm);">
        💡 <strong>${t('field.recommendation')}:</strong> ${lang === 'hi' ? 'यूरिया 50 kg/एकड़ + MOP 25 kg/एकड़ डालें। अगली सिंचाई के साथ दें।' : 'Apply Urea 50 kg/acre + MOP 25 kg/acre. Apply with next irrigation.'}
      </div>
    </div>

    <!-- Soil Moisture -->
    <div class="card" style="margin-bottom: var(--space-4);">
      <div class="card__header">
        <span class="card__title">${t('field.soilMoisture')}</span>
        <span style="font-size:var(--text-2xl);">💧</span>
      </div>
      <div style="display:flex;align-items:center;gap:var(--space-3);margin-bottom:var(--space-2);">
        <div style="flex:1;">
          <div class="gauge" style="height:14px;">
            <div class="gauge__fill gauge__fill--info" style="width:${field.soilMoisture}%;"></div>
          </div>
        </div>
        <span style="font-size:var(--text-xl);font-weight:var(--font-bold);color:var(--color-info);">${field.soilMoisture}%</span>
      </div>
      <div style="font-size:var(--text-xs);color:var(--color-text-muted);display:flex;justify-content:space-between;">
        <span>${lang === 'hi' ? 'सूखा' : 'Dry'} (0%)</span>
        <span>${lang === 'hi' ? 'उपयुक्त' : 'Optimal'} (60-80%)</span>
        <span>${lang === 'hi' ? 'गीला' : 'Wet'} (100%)</span>
      </div>
    </div>

    <!-- Irrigation Advice -->
    <div class="card irrigation-card" style="margin-bottom: var(--space-4);">
      <div class="card__header">
        <span class="card__title">${t('field.irrigationAdvice')}</span>
      </div>
      <div class="irrigation-card__status">
        <div class="irrigation-card__indicator ${irrigation.shouldIrrigate ? 'irrigation-card__indicator--needed' : 'irrigation-card__indicator--hold'}">
          ${irrigation.shouldIrrigate ? '💧' : '✋'}
        </div>
        <div>
          <div class="irrigation-card__recommendation">
            ${irrigation.shouldIrrigate ? t('field.irrigateNow') : t('field.holdBack')}
          </div>
          <div class="irrigation-card__detail">
            ${lang === 'hi' ? irrigation.reason : irrigation.reasonEn}
          </div>
        </div>
      </div>
      <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:var(--space-3);margin-top:var(--space-3);">
        <div style="padding:var(--space-2);background:rgba(255,255,255,0.6);border-radius:var(--radius-md);text-align:center;">
          <div style="font-size:var(--text-xs);color:var(--color-text-muted);">${lang === 'hi' ? 'अगली सिंचाई' : 'Next Irrigation'}</div>
          <div style="font-size:var(--text-base);font-weight:var(--font-bold);">19 ${lang === 'hi' ? 'अगस्त' : 'Aug'}</div>
        </div>
        <div style="padding:var(--space-2);background:rgba(255,255,255,0.6);border-radius:var(--radius-md);text-align:center;">
          <div style="font-size:var(--text-xs);color:var(--color-text-muted);">${t('field.waterNeeded')}</div>
          <div style="font-size:var(--text-base);font-weight:var(--font-bold);">${irrigation.waterNeeded.toLocaleString()} ${t('field.litersPerAcre')}</div>
        </div>
      </div>
    </div>

    <!-- Pest/Disease Alert -->
    <div class="alert-bar alert-bar--danger" style="margin-bottom:var(--space-4);">
      <span class="alert-bar__icon">🐛</span>
      <span>${lang === 'hi' ? 'ब्लास्ट रोग के लक्षण — खेत #1 के उत्तरी कोने में। बुधवार को छिड़काव करें।' : 'Blast disease symptoms — north corner of Field #1. Spray on Wednesday.'}</span>
    </div>

    <!-- Weather Forecast -->
    <div class="card" style="margin-bottom: var(--space-4);">
      <div class="card__header">
        <span class="card__title">${t('weather.forecast')}</span>
        <span class="badge ${weather.current.sprayable ? 'badge--success' : 'badge--warning'}">
          ${weather.current.sprayable ? t('weather.suitable') : t('weather.notSuitable')}
        </span>
      </div>
      <div style="display:flex;gap:var(--space-2);overflow-x:auto;scrollbar-width:none;padding-bottom:var(--space-1);">
        ${weather.forecast.map((d, i) => `
          <div style="flex-shrink:0;text-align:center;padding:var(--space-2) var(--space-3);border-radius:var(--radius-lg);${i === 0 ? 'background:var(--color-primary-50);border:1px solid var(--color-primary-100);' : 'background:var(--color-surface-muted);'}">
            <div style="font-size:var(--text-xs);font-weight:var(--font-semibold);color:${i === 0 ? 'var(--color-primary)' : 'var(--color-text-muted)'};">${lang === 'hi' ? d.day : d.dayEn}</div>
            <div style="font-size:1.3rem;margin:4px 0;">${d.emoji}</div>
            <div style="font-size:var(--text-xs);font-weight:var(--font-bold);">${d.high}°</div>
            <div style="font-size:0.625rem;color:var(--color-text-muted);">${d.low}°</div>
            <div style="font-size:0.625rem;color:${d.rain > 50 ? 'var(--color-info)' : 'var(--color-text-muted)'};">🌧${d.rain}%</div>
          </div>
        `).join('')}
      </div>
      <div style="margin-top:var(--space-3);padding:var(--space-2) var(--space-3);background:var(--color-warning-bg);border-radius:var(--radius-md);font-size:var(--text-sm);color:#8B6914;">
        ⚠️ ${lang === 'hi' ? weather.current.sprayReasonHi : weather.current.sprayReasonEn}
      </div>
    </div>

    <!-- Crop Plan Timeline -->
    <div class="card" style="margin-bottom: var(--space-4);">
      <div class="card__header">
        <span class="card__title">${t('field.cropPlan')}</span>
      </div>
      <div class="crop-timeline">
        ${crop?.stages.map((stage, i) => `
          <div class="crop-timeline__item ${i === field.stage ? 'active' : ''}">
            <div class="crop-timeline__date">${i <= field.stage ? '✅' : '⏳'} ${lang === 'hi' ? 'चरण' : 'Stage'} ${i + 1}</div>
            <div class="crop-timeline__title">${stage}</div>
            ${i === field.stage ? `<div class="crop-timeline__desc" style="color:var(--color-warning);font-weight:var(--font-semibold);">← ${lang === 'hi' ? 'वर्तमान चरण' : 'Current stage'}</div>` : ''}
          </div>
        `).join('')}
      </div>
    </div>

    <!-- Spray Window -->
    <div class="card card--accent" style="margin-bottom:var(--space-4);">
      <div class="card__header">
        <span class="card__title">${t('field.sprayWindow')}</span>
      </div>
      <div style="font-size:var(--text-sm);color:var(--color-text-secondary);line-height:var(--leading-relaxed);">
        ${lang === 'hi'
          ? '📅 <strong>बुधवार 20 अगस्त, सुबह 6-9 बजे</strong><br>☀️ साफ़ मौसम, हवा 6 km/h — छिड़काव के लिए उपयुक्त<br>🧪 ट्राइसाइक्लाज़ोल 75 WP @ 0.6g/L (ब्लास्ट के लिए)<br>📐 200 लीटर घोल/एकड़ का उपयोग करें'
          : '📅 <strong>Wednesday Aug 20, 6-9 AM</strong><br>☀️ Clear weather, wind 6 km/h — suitable for spraying<br>🧪 Tricyclazole 75 WP @ 0.6g/L (for Blast)<br>📐 Use 200 liters solution/acre'
        }
      </div>
    </div>
  `;

  // Initialize Leaflet map
  setTimeout(() => initMap(container, field), 100);
}

function initMap(container, field) {
  const mapEl = document.getElementById('field-map');
  if (!mapEl || typeof L === 'undefined') return;

  mapEl.innerHTML = '';

  try {
    const map = L.map(mapEl, {
      center: field.center,
      zoom: 16,
      zoomControl: false,
      attributionControl: false
    });

    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      maxZoom: 19
    }).addTo(map);

    // Field boundary polygon
    const polygon = L.polygon(field.bounds, {
      color: '#FFD600',
      weight: 3,
      fillColor: '#4CAF50',
      fillOpacity: 0.2,
      dashArray: '8, 4'
    }).addTo(map);

    // Simulated NDVI overlay — stress patches
    L.circle([field.center[0] + 0.001, field.center[1] - 0.001], {
      radius: 30,
      color: '#FF9800',
      fillColor: '#FF9800',
      fillOpacity: 0.35,
      weight: 1
    }).addTo(map).bindPopup('⚠️ Stress zone — Scout here');

    L.circle([field.center[0] + 0.0015, field.center[1] - 0.0005], {
      radius: 15,
      color: '#F44336',
      fillColor: '#F44336',
      fillOpacity: 0.4,
      weight: 1
    }).addTo(map).bindPopup('🔴 Critical — Possible Blast');

    // Center marker
    L.marker(field.center).addTo(map).bindPopup(`🌾 ${field.name}<br>${field.area} ${field.unit}`);

    map.fitBounds(polygon.getBounds().pad(0.1));

    // View switch chips
    const viewChips = container.querySelectorAll('[data-view]');
    viewChips.forEach(chip => {
      chip.addEventListener('click', () => {
        viewChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
      });
    });
  } catch (e) {
    console.warn('Map init error:', e);
  }
}
