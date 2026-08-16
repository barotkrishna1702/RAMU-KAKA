/* =============================================
   RAMU KAKA — Records Page
   ============================================= */

import { t, getLang } from '../i18n/translations.js';
import { farmRecords, crops } from '../data/mock-data.js';
import { navigateTo, showToast, showModal, closeModal } from '../main.js';

export function renderRecords(container) {
  const lang = getLang();
  const allRecords = [...farmRecords, ...(window.RK.records || [])].sort((a, b) => new Date(b.date) - new Date(a.date));

  const typeConfig = {
    planting: { emoji: '🌱', color: '#4CAF50', label: t('records.planting') },
    spraying: { emoji: '💨', color: '#FF5722', label: t('records.spraying') },
    fertilizer: { emoji: '🧪', color: '#FF9800', label: t('records.fertilizer') },
    irrigation: { emoji: '💧', color: '#2196F3', label: t('records.irrigation') },
    harvest: { emoji: '🌾', color: '#795548', label: t('records.harvest') }
  };

  // Calculate total cost
  const totalCost = allRecords.reduce((sum, r) => sum + (r.cost || 0), 0);

  container.innerHTML = `
    <div class="page-back" id="records-back">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
      ${t('common.back')}
    </div>

    <div class="section-header">
      <h3 class="section-title">${t('records.title')}</h3>
    </div>

    <!-- Summary Stats -->
    <div class="field-stats" style="margin-bottom:var(--space-4);">
      <div class="field-stat">
        <div class="field-stat__value">${allRecords.length}</div>
        <div class="field-stat__label">${lang === 'hi' ? 'कुल रिकॉर्ड' : 'Total Records'}</div>
      </div>
      <div class="field-stat">
        <div class="field-stat__value" style="color:var(--color-danger);">₹${totalCost.toLocaleString('en-IN')}</div>
        <div class="field-stat__label">${lang === 'hi' ? 'कुल खर्च' : 'Total Cost'}</div>
      </div>
    </div>

    <!-- Filter Chips -->
    <div class="category-filter" style="margin-bottom:var(--space-4);">
      <button class="chip active" data-type-filter="all">${lang === 'hi' ? 'सभी' : 'All'}</button>
      ${Object.entries(typeConfig).map(([key, config]) => `
        <button class="chip" data-type-filter="${key}">${config.emoji} ${config.label}</button>
      `).join('')}
    </div>

    <!-- Cost Chart -->
    <div class="card" style="margin-bottom:var(--space-4);">
      <div class="card__header">
        <span class="card__title">${lang === 'hi' ? '📊 खर्च सारांश' : '📊 Cost Summary'}</span>
      </div>
      <div class="chart-container"><canvas id="records-chart"></canvas></div>
    </div>

    <!-- Timeline -->
    <div class="record-timeline" id="records-list">
      ${allRecords.length === 0 ? `
        <div class="empty-state">
          <div class="empty-state__icon">📝</div>
          <div class="empty-state__title">${t('records.noRecords')}</div>
          <div class="empty-state__desc">${t('records.startTracking')}</div>
        </div>
      ` : allRecords.map(r => {
        const config = typeConfig[r.type] || typeConfig.planting;
        const crop = crops.find(c => c.id === r.crop);
        return `
          <div class="record-item" data-record-type="${r.type}">
            <div class="record-item__dot" style="background:${config.color};"></div>
            <div class="record-item__date">${config.emoji} ${new Date(r.date).toLocaleDateString(lang === 'hi' ? 'hi-IN' : 'en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
            <div class="record-item__type">${config.label} — ${crop?.emoji || ''} ${lang === 'hi' ? crop?.hi || '' : crop?.en || ''}</div>
            <div class="record-item__details">${r.details}</div>
            ${r.cost ? `<div style="margin-top:4px;font-size:var(--text-sm);font-weight:var(--font-semibold);color:var(--color-danger);">💰 ₹${r.cost.toLocaleString('en-IN')}</div>` : ''}
          </div>
        `;
      }).join('')}
    </div>

    <!-- Add Record FAB -->
    <button class="fab" id="add-record-fab">+</button>
  `;

  // Back navigation
  document.getElementById('records-back').addEventListener('click', () => navigateTo('more'));

  // Filter
  container.querySelectorAll('[data-type-filter]').forEach(chip => {
    chip.addEventListener('click', () => {
      container.querySelectorAll('[data-type-filter]').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      const filter = chip.dataset.typeFilter;
      container.querySelectorAll('.record-item').forEach(item => {
        item.style.display = (filter === 'all' || item.dataset.recordType === filter) ? '' : 'none';
      });
    });
  });

  // Add Record
  document.getElementById('add-record-fab').addEventListener('click', () => showAddRecordModal(container));

  // Chart
  setTimeout(() => initRecordsChart(allRecords, typeConfig), 100);
}

function initRecordsChart(records, typeConfig) {
  const canvas = document.getElementById('records-chart');
  if (!canvas || typeof Chart === 'undefined') return;

  const lang = getLang();
  const costByType = {};
  Object.keys(typeConfig).forEach(key => { costByType[key] = 0; });
  records.forEach(r => { costByType[r.type] = (costByType[r.type] || 0) + (r.cost || 0); });

  window.RK.charts['records'] = new Chart(canvas, {
    type: 'doughnut',
    data: {
      labels: Object.keys(costByType).map(k => typeConfig[k]?.label || k),
      datasets: [{
        data: Object.values(costByType),
        backgroundColor: Object.keys(costByType).map(k => typeConfig[k]?.color || '#ccc'),
        borderWidth: 2,
        borderColor: '#fff'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: 'bottom', labels: { font: { size: 10 }, usePointStyle: true, padding: 10 } }
      },
      cutout: '60%'
    }
  });
}

function showAddRecordModal(container) {
  const lang = getLang();

  showModal(`
    <div class="modal__title">${t('records.addRecord')}</div>

    <div class="input-group">
      <label class="input-group__label">${lang === 'hi' ? 'प्रकार' : 'Type'}</label>
      <select class="input-group__field" id="record-type" style="background:var(--color-surface);">
        <option value="planting">${lang === 'hi' ? '🌱 बुवाई' : '🌱 Planting'}</option>
        <option value="spraying">${lang === 'hi' ? '💨 छिड़काव' : '💨 Spraying'}</option>
        <option value="fertilizer">${lang === 'hi' ? '🧪 खाद' : '🧪 Fertilizer'}</option>
        <option value="irrigation">${lang === 'hi' ? '💧 सिंचाई' : '💧 Irrigation'}</option>
        <option value="harvest">${lang === 'hi' ? '🌾 कटाई' : '🌾 Harvest'}</option>
      </select>
    </div>

    <div class="input-group">
      <label class="input-group__label">${t('records.date')}</label>
      <input type="date" class="input-group__field" id="record-date" value="${new Date().toISOString().split('T')[0]}" style="background:var(--color-surface);" />
    </div>

    <div class="input-group">
      <label class="input-group__label">${t('records.crop')}</label>
      <select class="input-group__field" id="record-crop" style="background:var(--color-surface);">
        ${crops.map(c => `<option value="${c.id}">${c.emoji} ${lang === 'hi' ? c.hi : c.en}</option>`).join('')}
      </select>
    </div>

    <div class="input-group">
      <label class="input-group__label">${t('records.field')}</label>
      <input type="text" class="input-group__field" id="record-field" placeholder="${lang === 'hi' ? 'खेत #1' : 'Field #1'}" value="${lang === 'hi' ? 'खेत #1' : 'Field #1'}" />
    </div>

    <div class="input-group">
      <label class="input-group__label">${t('records.details')}</label>
      <textarea class="input-group__field" id="record-details" rows="3" placeholder="${lang === 'hi' ? 'विवरण लिखें...' : 'Enter details...'}"></textarea>
    </div>

    <div class="input-group">
      <label class="input-group__label">${t('records.cost')} (₹)</label>
      <input type="number" class="input-group__field" id="record-cost" placeholder="${lang === 'hi' ? 'उदा: 500' : 'e.g. 500'}" />
    </div>

    <div style="display:flex;gap:var(--space-2);margin-top:var(--space-4);">
      <button class="btn btn--primary btn--block" id="save-record-btn">${t('records.save')}</button>
      <button class="btn btn--outline" id="cancel-record-btn">${t('common.cancel')}</button>
    </div>
  `);

  document.getElementById('save-record-btn').addEventListener('click', () => {
    const newRecord = {
      id: Date.now(),
      type: document.getElementById('record-type').value,
      crop: document.getElementById('record-crop').value,
      field: document.getElementById('record-field').value,
      date: document.getElementById('record-date').value,
      details: document.getElementById('record-details').value || (lang === 'hi' ? 'रिकॉर्ड जोड़ा गया' : 'Record added'),
      cost: parseInt(document.getElementById('record-cost').value) || 0
    };

    window.RK.records.push(newRecord);
    localStorage.setItem('rk-records', JSON.stringify(window.RK.records));
    closeModal();
    showToast(lang === 'hi' ? '✅ रिकॉर्ड सहेजा गया!' : '✅ Record saved!', 'success');
    renderRecords(container);
  });

  document.getElementById('cancel-record-btn').addEventListener('click', closeModal);
}
