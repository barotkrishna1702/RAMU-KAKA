/* =======================================================
   RAMU KAKA — Farm Setup Onboarding Component
   Location Permission → 4-Point Farm Boundary → Mock Report
   ======================================================= */

import { getLanguage } from '../i18n/translations.js';

class FarmOnboarding {
  constructor() {
    this.step = 'permission'; // 'permission' → 'mapping' → 'report'
    this.userLocation = null;
    this.farmPoints = [];
    this.mapInstance = null;
    this.markers = [];
    this.polygon = null;
  }

  shouldShow() {
    return !localStorage.getItem('rk-farm-setup-done');
  }

  markComplete() {
    localStorage.setItem('rk-farm-setup-done', 'true');
    if (this.farmPoints.length > 0) {
      localStorage.setItem('rk-farm-boundary', JSON.stringify(this.farmPoints));
    }
    if (this.userLocation) {
      localStorage.setItem('rk-user-location', JSON.stringify(this.userLocation));
    }
  }

  show() {
    if (!this.shouldShow()) return;

    const overlay = document.createElement('div');
    overlay.id = 'onboarding-overlay';
    overlay.className = 'onboarding-overlay';
    document.body.appendChild(overlay);

    this.renderPermissionStep(overlay);
  }

  /* ══════════════════════════════════════
     STEP 1: Location Permission
     ══════════════════════════════════════ */
  renderPermissionStep(container) {
    const lang = getLanguage();
    this.step = 'permission';

    container.innerHTML = `
      <div class="onboarding-card onboarding-permission-card">
        <div class="onboarding-icon-circle">
          <span style="font-size:2.8rem;">📍</span>
        </div>

        <h2 class="onboarding-title">
          ${lang === 'hi' ? 'नमस्ते! स्थान की अनुमति दें' : 'Hello! Allow Location Access'}
        </h2>
        <p class="onboarding-desc">
          ${lang === 'hi'
            ? 'रामू काका को आपके खेत का सही मौसम, मिट्टी और फसल स्वास्थ्य डेटा दिखाने के लिए आपकी लोकेशन चाहिए।'
            : 'Ramu Kaka needs your location to show accurate weather, soil and crop health data for your farm.'
          }
        </p>

        <div class="onboarding-features-list">
          <div class="onboarding-feature-item">
            <span>🌦️</span>
            <span>${lang === 'hi' ? 'आपके खेत का सटीक मौसम' : 'Accurate farm weather'}</span>
          </div>
          <div class="onboarding-feature-item">
            <span>💧</span>
            <span>${lang === 'hi' ? 'सिंचाई व वर्षा का अनुमान' : 'Irrigation & rainfall forecast'}</span>
          </div>
          <div class="onboarding-feature-item">
            <span>🌱</span>
            <span>${lang === 'hi' ? 'फसल स्वास्थ्य निगरानी' : 'Crop health monitoring'}</span>
          </div>
          <div class="onboarding-feature-item">
            <span>📊</span>
            <span>${lang === 'hi' ? 'मंडी भाव और बाज़ार सुझाव' : 'Mandi prices & market tips'}</span>
          </div>
        </div>

        <button class="onboarding-btn-primary" id="btn-allow-location">
          📍 ${lang === 'hi' ? 'अनुमति दें (Allow Location)' : 'Allow Location'}
        </button>
        <button class="onboarding-btn-skip" id="btn-skip-location">
          ${lang === 'hi' ? 'बाद में करें (Skip)' : 'Skip for now'}
        </button>
      </div>
    `;

    document.getElementById('btn-allow-location')?.addEventListener('click', () => {
      this.requestLocation(container);
    });

    document.getElementById('btn-skip-location')?.addEventListener('click', () => {
      // Use mock location (Kannauj, UP)
      this.userLocation = { lat: 26.8505, lng: 80.9102 };
      this.renderMappingStep(container);
    });
  }

  requestLocation(container) {
    const lang = getLanguage();
    const btn = document.getElementById('btn-allow-location');
    if (btn) {
      btn.textContent = lang === 'hi' ? '⏳ स्थान प्राप्त कर रहे हैं...' : '⏳ Getting location...';
      btn.disabled = true;
    }

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          this.userLocation = { lat: pos.coords.latitude, lng: pos.coords.longitude };
          this.renderMappingStep(container);
        },
        () => {
          // Permission denied — use mock location
          this.userLocation = { lat: 26.8505, lng: 80.9102 };
          this.renderMappingStep(container);
        },
        { enableHighAccuracy: true, timeout: 8000 }
      );
    } else {
      this.userLocation = { lat: 26.8505, lng: 80.9102 };
      this.renderMappingStep(container);
    }
  }

  /* ══════════════════════════════════════
     STEP 2: 4-Point Farm Boundary Mapping
     ══════════════════════════════════════ */
  renderMappingStep(container) {
    const lang = getLanguage();
    this.step = 'mapping';
    this.farmPoints = [];

    container.innerHTML = `
      <div class="onboarding-card onboarding-mapping-card">
        <div class="onboarding-mapping-header">
          <h2 class="onboarding-title" style="margin-bottom:4px;">
            ${lang === 'hi' ? '🗺️ अपने खेत की सीमा बनाएं' : '🗺️ Mark Your Farm Boundary'}
          </h2>
          <p class="onboarding-desc" style="margin-bottom:8px;">
            ${lang === 'hi'
              ? 'नक्शे पर 4 बिंदु टैप करके अपने पूरे खेत को चिह्नित करें।'
              : 'Tap 4 points on the map to outline your entire farm.'
            }
          </p>
          <div class="onboarding-points-counter" id="points-counter">
            <span id="points-count">0</span> / 4 ${lang === 'hi' ? 'बिंदु चुने' : 'points marked'}
          </div>
        </div>

        <div id="onboarding-map" class="onboarding-map-container"></div>

        <div class="onboarding-mapping-footer">
          <button class="onboarding-btn-secondary" id="btn-reset-points">
            🔄 ${lang === 'hi' ? 'फिर से करें' : 'Reset'}
          </button>
          <button class="onboarding-btn-primary disabled" id="btn-confirm-boundary" disabled>
            ✓ ${lang === 'hi' ? 'सीमा पक्की करें' : 'Confirm Boundary'}
          </button>
        </div>
      </div>
    `;

    // Initialize map after DOM is ready
    setTimeout(() => this.initMappingMap(), 100);

    document.getElementById('btn-reset-points')?.addEventListener('click', () => {
      this.resetPoints();
    });

    document.getElementById('btn-confirm-boundary')?.addEventListener('click', () => {
      this.renderAnalyzingStep(container);
    });
  }

  initMappingMap() {
    const mapEl = document.getElementById('onboarding-map');
    if (!mapEl || typeof L === 'undefined') return;

    this.mapInstance = L.map(mapEl, {
      center: [this.userLocation.lat, this.userLocation.lng],
      zoom: 17,
      zoomControl: true,
      attributionControl: false
    });

    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      maxZoom: 19
    }).addTo(this.mapInstance);

    // User location marker
    L.circleMarker([this.userLocation.lat, this.userLocation.lng], {
      radius: 8,
      color: '#F1E7CC',
      fillColor: '#1F4030',
      fillOpacity: 1,
      weight: 3
    }).addTo(this.mapInstance).bindTooltip(
      getLanguage() === 'hi' ? '📍 आपकी स्थिति' : '📍 Your Location',
      { permanent: true, direction: 'top', offset: [0, -10] }
    );

    // Click to add farm boundary points
    this.mapInstance.on('click', (e) => {
      if (this.farmPoints.length >= 4) return;

      const point = [e.latlng.lat, e.latlng.lng];
      this.farmPoints.push(point);

      // Add numbered marker
      const marker = L.circleMarker(point, {
        radius: 10,
        color: '#D9BE8C',
        fillColor: '#1F4030',
        fillOpacity: 1,
        weight: 3
      }).addTo(this.mapInstance);

      // Add number label
      L.marker(point, {
        icon: L.divIcon({
          className: 'farm-point-label',
          html: `<div style="background:#1F4030;color:#F1E7CC;width:22px;height:22px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:bold;border:2px solid #D9BE8C;">${this.farmPoints.length}</div>`,
          iconSize: [22, 22],
          iconAnchor: [11, 11]
        })
      }).addTo(this.mapInstance);

      this.markers.push(marker);
      this.updatePointsUI();

      // Draw polygon after each point
      if (this.polygon) this.mapInstance.removeLayer(this.polygon);
      if (this.farmPoints.length >= 3) {
        this.polygon = L.polygon(this.farmPoints, {
          color: '#D9BE8C',
          weight: 2,
          fillColor: '#1F4030',
          fillOpacity: 0.25,
          dashArray: this.farmPoints.length < 4 ? '6, 8' : null
        }).addTo(this.mapInstance);
      }
    });
  }

  updatePointsUI() {
    const countEl = document.getElementById('points-count');
    const confirmBtn = document.getElementById('btn-confirm-boundary');
    if (countEl) countEl.textContent = this.farmPoints.length;
    if (confirmBtn) {
      if (this.farmPoints.length === 4) {
        confirmBtn.disabled = false;
        confirmBtn.classList.remove('disabled');
      } else {
        confirmBtn.disabled = true;
        confirmBtn.classList.add('disabled');
      }
    }
  }

  resetPoints() {
    this.farmPoints = [];
    this.markers.forEach(m => this.mapInstance?.removeLayer(m));
    this.markers = [];
    if (this.polygon) {
      this.mapInstance?.removeLayer(this.polygon);
      this.polygon = null;
    }
    // Remove number labels too
    this.mapInstance?.eachLayer((layer) => {
      if (layer instanceof L.Marker && layer.options.icon?.options?.className === 'farm-point-label') {
        this.mapInstance.removeLayer(layer);
      }
    });
    this.updatePointsUI();
  }

  /* ══════════════════════════════════════
     STEP 2.5: Analyzing / Loading Screen
     ══════════════════════════════════════ */
  renderAnalyzingStep(container) {
    const lang = getLanguage();
    this.step = 'analyzing';

    const steps = lang === 'hi'
      ? [
          { icon: '🛰️', text: 'सैटेलाइट इमेजरी प्राप्त कर रहे हैं...' },
          { icon: '🌱', text: 'फसल स्वास्थ्य विश्लेषण कर रहे हैं...' },
          { icon: '🧪', text: 'मिट्टी की गुणवत्ता जांच रहे हैं...' },
          { icon: '🌦️', text: 'मौसम डेटा लोड हो रहा है...' },
          { icon: '💧', text: 'वर्षा इतिहास का विश्लेषण...' },
          { icon: '📊', text: 'आपकी रिपोर्ट तैयार कर रहे हैं...' },
        ]
      : [
          { icon: '🛰️', text: 'Fetching satellite imagery...' },
          { icon: '🌱', text: 'Analyzing crop health indices...' },
          { icon: '🧪', text: 'Evaluating soil quality...' },
          { icon: '🌦️', text: 'Loading weather data...' },
          { icon: '💧', text: 'Analyzing rainfall history...' },
          { icon: '📊', text: 'Generating your farm report...' },
        ];

    container.innerHTML = `
      <div class="onboarding-card onboarding-analyzing-card">
        <div class="analyzing-satellite-ring">
          <div class="analyzing-orbit"></div>
          <div class="analyzing-core">🛰️</div>
        </div>

        <h2 class="onboarding-title" style="margin-top:18px;">
          ${lang === 'hi' ? 'आपके खेत का विश्लेषण हो रहा है...' : 'Analyzing Your Farm...'}
        </h2>

        <div class="analyzing-progress-bar">
          <div class="analyzing-progress-fill" id="analyzing-fill"></div>
        </div>

        <div class="analyzing-step-label" id="analyzing-label">
          <span class="analyzing-step-icon" id="analyzing-icon">${steps[0].icon}</span>
          <span id="analyzing-text">${steps[0].text}</span>
        </div>

        <div class="analyzing-steps-list" id="analyzing-steps-list"></div>
      </div>
    `;

    const fill = document.getElementById('analyzing-fill');
    const label = document.getElementById('analyzing-text');
    const icon = document.getElementById('analyzing-icon');
    const list = document.getElementById('analyzing-steps-list');

    let i = 0;
    const interval = setInterval(() => {
      // Mark current step as done
      const doneEl = document.createElement('div');
      doneEl.className = 'analyzing-done-item';
      doneEl.innerHTML = `<span style="color:#6FA85C;">✓</span> <span>${steps[i].text}</span>`;
      list?.appendChild(doneEl);

      i++;
      if (i < steps.length) {
        if (fill) fill.style.width = `${((i + 1) / steps.length) * 100}%`;
        if (label) label.textContent = steps[i].text;
        if (icon) icon.textContent = steps[i].icon;
      } else {
        clearInterval(interval);
        if (fill) fill.style.width = '100%';
        setTimeout(() => this.renderReportStep(container), 600);
      }
    }, 1200);
  }

  /* ══════════════════════════════════════
     STEP 3: Farm Report with Mini-Map
     ══════════════════════════════════════ */
  renderReportStep(container) {
    const lang = getLanguage();
    this.step = 'report';

    const areaAcres = this.calculateMockArea();

    container.innerHTML = `
      <div class="onboarding-card onboarding-report-card">
        <div class="onboarding-icon-circle" style="background:#E8F5E9;">
          <span style="font-size:2.4rem;">✅</span>
        </div>

        <h2 class="onboarding-title">
          ${lang === 'hi' ? 'आपके खेत की रिपोर्ट तैयार है!' : 'Your Farm Report is Ready!'}
        </h2>
        <p class="onboarding-desc" style="margin-bottom:14px;">
          ${lang === 'hi' ? `अनुमानित क्षेत्रफल: ~${areaAcres} एकड़` : `Estimated area: ~${areaAcres} acres`}
        </p>

        <!-- FARM BOUNDARY MINI-MAP -->
        <div class="report-section" style="padding:0;overflow:hidden;">
          <div id="report-farm-map" class="report-farm-map"></div>
        </div>

        <!-- WEATHER SECTION -->
        <div class="report-section report-section-animate" style="animation-delay:0.1s">
          <div class="report-section-header">
            <span>🌦️</span>
            <span class="report-section-title">${lang === 'hi' ? 'मौसम की स्थिति' : 'Weather Conditions'}</span>
          </div>
          <div class="report-grid">
            <div class="report-stat-card">
              <span class="report-stat-icon">🌡️</span>
              <span class="report-stat-value">28°C</span>
              <span class="report-stat-label">${lang === 'hi' ? 'तापमान' : 'Temperature'}</span>
            </div>
            <div class="report-stat-card">
              <span class="report-stat-icon">💧</span>
              <span class="report-stat-value">82%</span>
              <span class="report-stat-label">${lang === 'hi' ? 'नमी (Humidity)' : 'Humidity'}</span>
            </div>
            <div class="report-stat-card">
              <span class="report-stat-icon">💨</span>
              <span class="report-stat-value">14 km/h</span>
              <span class="report-stat-label">${lang === 'hi' ? 'हवा की गति' : 'Wind Speed'}</span>
            </div>
            <div class="report-stat-card">
              <span class="report-stat-icon">☁️</span>
              <span class="report-stat-value">${lang === 'hi' ? 'आंशिक बादल' : 'Partly Cloudy'}</span>
              <span class="report-stat-label">${lang === 'hi' ? 'आकाश' : 'Sky'}</span>
            </div>
          </div>
        </div>

        <!-- RAINFALL SECTION -->
        <div class="report-section report-section-animate" style="animation-delay:0.3s">
          <div class="report-section-header">
            <span>🌧️</span>
            <span class="report-section-title">${lang === 'hi' ? 'वर्षा की जानकारी' : 'Rainfall Data'}</span>
          </div>
          <div class="report-grid">
            <div class="report-stat-card report-stat-highlight">
              <span class="report-stat-icon">⛈️</span>
              <span class="report-stat-value" style="color:#2B7FD8;">78%</span>
              <span class="report-stat-label">${lang === 'hi' ? 'कल बारिश की संभावना' : 'Rain Expected Tomorrow'}</span>
            </div>
            <div class="report-stat-card">
              <span class="report-stat-icon">🌧️</span>
              <span class="report-stat-value">12 mm</span>
              <span class="report-stat-label">${lang === 'hi' ? 'अपेक्षित वर्षा' : 'Expected Rainfall'}</span>
            </div>
            <div class="report-stat-card">
              <span class="report-stat-icon">📅</span>
              <span class="report-stat-value">45 mm</span>
              <span class="report-stat-label">${lang === 'hi' ? 'इस सप्ताह हुई बारिश' : 'Rain This Week'}</span>
            </div>
            <div class="report-stat-card">
              <span class="report-stat-icon">📊</span>
              <span class="report-stat-value">186 mm</span>
              <span class="report-stat-label">${lang === 'hi' ? 'इस माह कुल वर्षा' : 'Monthly Rainfall'}</span>
            </div>
          </div>
        </div>

        <!-- SOIL & IRRIGATION -->
        <div class="report-section report-section-animate" style="animation-delay:0.5s">
          <div class="report-section-header">
            <span>🌱</span>
            <span class="report-section-title">${lang === 'hi' ? 'मिट्टी व सिंचाई' : 'Soil & Irrigation'}</span>
          </div>
          <div class="report-grid">
            <div class="report-stat-card">
              <span class="report-stat-icon">🪴</span>
              <span class="report-stat-value">68%</span>
              <span class="report-stat-label">${lang === 'hi' ? 'मिट्टी नमी' : 'Soil Moisture'}</span>
            </div>
            <div class="report-stat-card">
              <span class="report-stat-icon">🧪</span>
              <span class="report-stat-value">6.8 pH</span>
              <span class="report-stat-label">${lang === 'hi' ? 'मिट्टी pH' : 'Soil pH'}</span>
            </div>
            <div class="report-stat-card report-stat-highlight">
              <span class="report-stat-icon">💧</span>
              <span class="report-stat-value" style="color:#1F4030;">${lang === 'hi' ? 'रोकें' : 'Hold'}</span>
              <span class="report-stat-label">${lang === 'hi' ? 'आज सिंचाई सलाह' : "Today's Irrigation"}</span>
            </div>
            <div class="report-stat-card">
              <span class="report-stat-icon">🌾</span>
              <span class="report-stat-value">${lang === 'hi' ? 'अच्छी' : 'Good'}</span>
              <span class="report-stat-label">${lang === 'hi' ? 'फसल स्वास्थ्य' : 'Crop Health'}</span>
            </div>
          </div>
        </div>

        <!-- RAMU RECOMMENDATION -->
        <div class="report-ramu-box report-section-animate" style="animation-delay:0.7s">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;">
            <span style="font-size:1.3rem;">💡</span>
            <span style="font-family:var(--font-heading);font-weight:bold;color:#A3702A;font-size:0.85rem;">
              ${lang === 'hi' ? 'रामू की सलाह' : "RAMU'S ADVICE"}
            </span>
          </div>
          <p style="font-size:0.9rem;font-weight:600;color:var(--color-text-main);line-height:1.45;">
            ${lang === 'hi'
              ? '💧 आज सिंचाई न करें — कल 78% बारिश की संभावना है। मिट्टी में पर्याप्त नमी (68%) है। बारिश के बाद खेत का निरीक्षण करें।'
              : "💧 Don't irrigate today — 78% rain expected tomorrow. Soil moisture is sufficient (68%). Inspect your field after rainfall."
            }
          </p>
        </div>

        <button class="onboarding-btn-primary report-section-animate" id="btn-start-app" style="margin-top:14px;animation-delay:0.9s">
          🌾 ${lang === 'hi' ? 'खेत देखना शुरू करें' : 'Start Exploring Your Farm'}
        </button>
      </div>
    `;

    // Initialize mini-map showing farm boundary
    setTimeout(() => this.initReportMap(), 150);

    document.getElementById('btn-start-app')?.addEventListener('click', () => {
      this.markComplete();
      const overlay = document.getElementById('onboarding-overlay');
      overlay?.classList.add('onboarding-fade-out');
      setTimeout(() => overlay?.remove(), 300);
    });
  }

  initReportMap() {
    const mapEl = document.getElementById('report-farm-map');
    if (!mapEl || typeof L === 'undefined' || this.farmPoints.length < 4) return;

    const reportMap = L.map(mapEl, {
      zoomControl: false,
      attributionControl: false,
      dragging: false,
      scrollWheelZoom: false,
      doubleClickZoom: false,
      touchZoom: false
    });

    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      maxZoom: 19
    }).addTo(reportMap);

    // Draw the farm polygon
    const polygon = L.polygon(this.farmPoints, {
      color: '#D9BE8C',
      weight: 2.5,
      fillColor: '#6FA85C',
      fillOpacity: 0.25,
    }).addTo(reportMap);

    // Add numbered pin markers at each point
    this.farmPoints.forEach((pt, idx) => {
      L.marker(pt, {
        icon: L.divIcon({
          className: 'farm-point-label',
          html: `<div style="background:#1F4030;color:#F1E7CC;width:24px;height:24px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:bold;border:2px solid #D9BE8C;box-shadow:0 2px 8px rgba(0,0,0,0.3);">${idx + 1}</div>`,
          iconSize: [24, 24],
          iconAnchor: [12, 12]
        })
      }).addTo(reportMap);
    });

    // Fit the map to show the farm boundary with padding
    reportMap.fitBounds(polygon.getBounds().pad(0.15));
  }

  calculateMockArea() {
    if (this.farmPoints.length < 4) return '3.5';
    const lats = this.farmPoints.map(p => p[0]);
    const lngs = this.farmPoints.map(p => p[1]);
    const dLat = (Math.max(...lats) - Math.min(...lats)) * 111000;
    const dLng = (Math.max(...lngs) - Math.min(...lngs)) * 111000 * Math.cos(Math.min(...lats) * Math.PI / 180);
    const sqm = dLat * dLng * 0.5;
    const acres = sqm / 4047;
    return Math.max(0.5, acres).toFixed(1);
  }
}

export const farmOnboarding = new FarmOnboarding();
