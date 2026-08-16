/* =======================================================
   RAMU KAKA — 05: Records View (Calendar + Activity Heatmap)
   Section 14 of Master Vibe-Coding Prompt
   ======================================================= */

import { farmRecordsData } from '../data/mock-data.js';
import { getLanguage, t } from '../i18n/translations.js';
import { voiceOverlay } from '../components/voice-overlay.js';

let activeDay = 16;
let activities = [...farmRecordsData.activitiesForDay];

export function renderRecordsView(container) {
  const lang = getLanguage();
  const data = farmRecordsData;

  container.innerHTML = `
    <div class="records-view-container">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;">
        <div>
          <h2>${lang === 'hi' ? 'खेत रिकॉर्ड डायरी' : 'Farm Records & Diary'}</h2>
          <p style="font-size:var(--text-xs);color:var(--color-text-secondary);">
            ${data.activeMonth}
          </p>
        </div>
        <button class="btn-action-primary" style="font-size:0.8rem;padding:6px 14px;" id="btn-add-activity">
          ${t('addActivity')}
        </button>
      </div>

      <!-- MONTH CALENDAR CARD (Section 14) -->
      <div class="calendar-card">
        <div class="calendar-header">
          <span style="font-family:var(--font-heading);font-weight:bold;font-size:var(--text-base);">
            📅 ${lang === 'hi' ? 'अगस्त 2026' : 'August 2026'}
          </span>
          <span style="font-size:0.75rem;color:var(--color-turmeric-dark);font-weight:bold;">
            ● = ${lang === 'hi' ? 'गतिविधि दर्ज' : 'Activity Recorded'}
          </span>
        </div>

        <div class="calendar-grid">
          <div class="calendar-day-header">सोम (M)</div>
          <div class="calendar-day-header">मंगल (T)</div>
          <div class="calendar-day-header">बुध (W)</div>
          <div class="calendar-day-header">गुरु (T)</div>
          <div class="calendar-day-header">शुक्र (F)</div>
          <div class="calendar-day-header">शनि (S)</div>
          <div class="calendar-day-header">रवि (S)</div>

          <!-- Blank offset days -->
          <div class="calendar-cell" style="opacity:0.3;">28</div>
          <div class="calendar-cell" style="opacity:0.3;">29</div>
          <div class="calendar-cell" style="opacity:0.3;">30</div>
          <div class="calendar-cell" style="opacity:0.3;">31</div>

          <!-- August Days 1 to 31 -->
          ${Array.from({ length: 31 }, (_, i) => {
            const dayNum = i + 1;
            const hasActivity = [1, 8, 12, 16].includes(dayNum);
            const isSelected = dayNum === activeDay;
            return `
              <div class="calendar-cell ${isSelected ? 'active-day' : ''}" data-day="${dayNum}">
                <span>${dayNum}</span>
                ${hasActivity ? '<span class="calendar-dot"></span>' : ''}
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <!-- GITHUB-STYLE ACTIVITY HEATMAP (Section 14) -->
      <div class="heatmap-card">
        <div style="display:flex;align-items:center;justify-content:space-between;">
          <span style="font-family:var(--font-heading);font-weight:bold;font-size:var(--text-xs);color:var(--color-text-secondary);text-transform:uppercase;">
            🌱 ${lang === 'hi' ? 'खेती प्रबंधन निरंतरता (Farm Consistency Heatmap)' : 'Activity Heatmap'}
          </span>
          <div style="display:flex;gap:3px;align-items:center;font-size:0.65rem;color:var(--color-text-muted);">
            <span>कम</span>
            <div style="width:8px;height:8px;background:#C8E6C9;border-radius:2px;"></div>
            <div style="width:8px;height:8px;background:#81C784;border-radius:2px;"></div>
            <div style="width:8px;height:8px;background:#388E3C;border-radius:2px;"></div>
            <span>अधिक</span>
          </div>
        </div>

        <div class="heatmap-grid">
          ${data.heatmapMatrix.flat().map(lvl => `
            <div class="heatmap-cell ${lvl > 0 ? `lvl-${lvl}` : ''}"></div>
          `).join('')}
        </div>
      </div>

      <!-- SELECTED DAY'S ACTIVITIES LIST -->
      <div class="day-activities-list">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;">
          <span style="font-family:var(--font-heading);font-weight:bold;font-size:var(--text-base);">
            📌 ${activeDay} ${lang === 'hi' ? 'अगस्त 2026 की गतिविधियां' : 'August 2026 Activities'}
          </span>
          <button class="btn-why" style="font-size:0.75rem;" id="btn-voice-log-activity">
            🎙️ बोलकर दर्ज करें
          </button>
        </div>

        <div id="day-activities-container">
          ${renderActivityItems(activeDay)}
        </div>
      </div>
    </div>
  `;

  setupRecordsListeners(container);
}

function renderActivityItems(day) {
  const lang = getLanguage();
  if (day === 16) {
    return activities.map(a => `
      <div class="activity-item">
        <div style="display:flex;align-items:center;gap:10px;">
          <span style="font-size:1.3rem;">${a.icon}</span>
          <div>
            <div style="font-weight:bold;font-size:0.9rem;">${a.title}</div>
            <div style="font-size:0.75rem;color:var(--color-text-secondary);">${a.details}</div>
          </div>
        </div>
        <span style="color:var(--color-healthy-green);font-weight:bold;font-size:0.8rem;">✓ पूर्ण</span>
      </div>
    `).join('');
  } else if (day === 12) {
    return `
      <div class="activity-item">
        <div style="display:flex;align-items:center;gap:10px;">
          <span style="font-size:1.3rem;">💨</span>
          <div>
            <div style="font-weight:bold;font-size:0.9rem;">जैविक नीम छिड़काव (Neem Spray)</div>
            <div style="font-size:0.75rem;color:var(--color-text-secondary);">खेत 2 (टमाटर) में 2 लीटर नीम घोल छिड़का</div>
          </div>
        </div>
        <span style="color:var(--color-healthy-green);font-weight:bold;font-size:0.8rem;">✓ पूर्ण</span>
      </div>
    `;
  } else if (day === 8) {
    return `
      <div class="activity-item">
        <div style="display:flex;align-items:center;gap:10px;">
          <span style="font-size:1.3rem;">💧</span>
          <div>
            <div style="font-weight:bold;font-size:0.9rem;">हल्की सिंचाई (Irrigation)</div>
            <div style="font-size:0.75rem;color:var(--color-text-secondary);">खेत 1 (धान) में 3 सेमी जल स्तर किया</div>
          </div>
        </div>
        <span style="color:var(--color-healthy-green);font-weight:bold;font-size:0.8rem;">✓ पूर्ण</span>
      </div>
    `;
  } else {
    return `
      <div style="text-align:center;padding:16px 0;color:var(--color-text-muted);font-size:0.85rem;">
        ${lang === 'hi' ? 'इस दिन कोई गतिविधि दर्ज नहीं है।' : 'No activity logged for this day.'}
      </div>
    `;
  }
}

function setupRecordsListeners(container) {
  // Calendar day clicking
  container.querySelectorAll('.calendar-cell[data-day]').forEach(cell => {
    cell.addEventListener('click', () => {
      container.querySelectorAll('.calendar-cell').forEach(c => c.classList.remove('active-day'));
      cell.classList.add('active-day');
      activeDay = parseInt(cell.dataset.day);
      const listContainer = document.getElementById('day-activities-container');
      if (listContainer) listContainer.innerHTML = renderActivityItems(activeDay);
    });
  });

  // Add activity button
  document.getElementById('btn-add-activity')?.addEventListener('click', () => {
    openAddActivityModal();
  });

  // Voice log
  document.getElementById('btn-voice-log-activity')?.addEventListener('click', () => {
    voiceOverlay.show('records');
  });
}

function openAddActivityModal() {
  const modal = document.getElementById('modal-container');
  const lang = getLanguage();
  if (!modal) return;

  modal.classList.remove('hidden');
  modal.innerHTML = `
    <div class="modal-content">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;">
        <h3 style="font-size:var(--text-lg);font-weight:bold;">
          📝 ${lang === 'hi' ? 'नई गतिविधि दर्ज करें' : 'Log New Activity'}
        </h3>
        <button id="close-modal-x" style="font-size:1.2rem;color:var(--color-text-muted);">✕</button>
      </div>

      <div style="display:flex;flex-direction:column;gap:12px;">
        <div>
          <label style="font-size:0.8rem;font-weight:bold;color:var(--color-text-secondary);display:block;margin-bottom:4px;">
            ${lang === 'hi' ? 'गतिविधि प्रकार' : 'Activity Type'}
          </label>
          <select id="modal-activity-type" style="width:100%;padding:10px;border-radius:var(--radius-sm);border:1px solid var(--color-border);background:white;">
            <option value="fertilizer">🧪 उर्वरक / खाद (Fertilizer)</option>
            <option value="spraying">💨 कीटनाशक छिड़काव (Spraying)</option>
            <option value="irrigation">💧 सिंचाई (Irrigation)</option>
            <option value="inspection">🔍 खेत निरीक्षण (Inspection)</option>
            <option value="harvesting">🌾 कटाई (Harvesting)</option>
          </select>
        </div>

        <div>
          <label style="font-size:0.8rem;font-weight:bold;color:var(--color-text-secondary);display:block;margin-bottom:4px;">
            ${lang === 'hi' ? 'खेत चुनें' : 'Select Field'}
          </label>
          <select id="modal-field-select" style="width:100%;padding:10px;border-radius:var(--radius-sm);border:1px solid var(--color-border);background:white;">
            <option value="field-1">खेत 1 · धान (PRH-10)</option>
            <option value="field-2">खेत 2 · टमाटर (अर्का रक्षक)</option>
          </select>
        </div>

        <div>
          <label style="font-size:0.8rem;font-weight:bold;color:var(--color-text-secondary);display:block;margin-bottom:4px;">
            ${lang === 'hi' ? 'विवरण व मात्रा (उदा. 20 किग्रा यूरिया)' : 'Details & Quantity'}
          </label>
          <input type="text" id="modal-activity-details" placeholder="${lang === 'hi' ? 'उदा. 20 किग्रा यूरिया डाला' : 'e.g. Applied 20kg Urea'}" style="width:100%;padding:10px;border-radius:var(--radius-sm);border:1px solid var(--color-border);background:white;" />
        </div>

        <button class="btn-action-primary" style="width:100%;padding:10px;margin-top:6px;" id="modal-submit-activity">
          ✓ ${lang === 'hi' ? 'रिकॉर्ड सहेजें' : 'Save Record'}
        </button>
      </div>
    </div>
  `;

  document.getElementById('close-modal-x')?.addEventListener('click', () => {
    modal.classList.add('hidden');
  });

  document.getElementById('modal-submit-activity')?.addEventListener('click', () => {
    const details = document.getElementById('modal-activity-details')?.value || (lang === 'hi' ? 'नया कार्य संपन्न' : 'Completed task');
    activities.unshift({
      id: `a-${Date.now()}`,
      type: 'custom',
      icon: '🌱',
      title: lang === 'hi' ? 'नया कार्य (Logged Activity)' : 'Activity',
      details
    });
    modal.classList.add('hidden');
    const list = document.getElementById('day-activities-container');
    if (list) list.innerHTML = renderActivityItems(16);
  });
}
