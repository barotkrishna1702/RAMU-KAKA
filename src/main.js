/* =============================================
   RAMU KAKA — Main Entry Point
   ============================================= */

import { t, setLang, getLang, getLangName, getSpeechLang } from './i18n/translations.js';
import { renderHome } from './pages/home.js';
import { renderField } from './pages/field.js';
import { renderScan } from './pages/scan.js';
import { renderMarket } from './pages/market.js';
import { renderMore } from './pages/more.js';
import { renderRecords } from './pages/records.js';
import { renderTechniques } from './pages/techniques.js';

// ── Global State ──
window.RK = {
  currentPage: 'home',
  lang: getLang(),
  cart: [],
  records: JSON.parse(localStorage.getItem('rk-records') || '[]'),
  charts: {}
};

// ── Router ──
const pages = {
  home: renderHome,
  field: renderField,
  scan: renderScan,
  market: renderMarket,
  more: renderMore,
  records: renderRecords,
  techniques: renderTechniques
};

export function navigateTo(page) {
  // Destroy existing charts
  Object.values(window.RK.charts).forEach(c => { try { c.destroy(); } catch(e){} });
  window.RK.charts = {};

  window.RK.currentPage = page;
  const container = document.getElementById('page-container');
  container.innerHTML = '';
  container.scrollTop = 0;

  // Update nav
  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.toggle('active', item.dataset.page === page);
  });

  // Render page
  if (pages[page]) {
    pages[page](container);
  }

  // Scroll to top
  window.scrollTo(0, 0);
}

// ── Language Switcher ──
function initLanguageSwitcher() {
  const btn = document.getElementById('lang-switcher-btn');
  const dropdown = document.getElementById('lang-dropdown');
  const label = document.getElementById('current-lang-label');

  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdown.classList.toggle('hidden');
  });

  dropdown.querySelectorAll('.lang-option').forEach(opt => {
    opt.addEventListener('click', () => {
      const lang = opt.dataset.lang;
      setLang(lang);
      window.RK.lang = lang;
      label.textContent = getLangName(lang);

      // Update active state
      dropdown.querySelectorAll('.lang-option').forEach(o => o.classList.remove('active'));
      opt.classList.add('active');
      dropdown.classList.add('hidden');

      // Re-render current page
      navigateTo(window.RK.currentPage);
    });
  });

  // Close dropdown on outside click
  document.addEventListener('click', () => {
    dropdown.classList.add('hidden');
  });

  // Set initial
  label.textContent = getLangName();
  const activeOpt = dropdown.querySelector(`[data-lang="${getLang()}"]`);
  if (activeOpt) {
    dropdown.querySelectorAll('.lang-option').forEach(o => o.classList.remove('active'));
    activeOpt.classList.add('active');
  }
}

// ── Bottom Nav ──
function initBottomNav() {
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => {
      navigateTo(item.dataset.page);
    });
  });
}

// ── Toast System ──
export function showToast(message, type = 'info', duration = 3000) {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `toast toast--${type}`;
  toast.innerHTML = `<span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(-10px)';
    toast.style.transition = 'all 300ms ease';
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

// ── Modal System ──
export function showModal(content) {
  const overlay = document.getElementById('modal-overlay');
  overlay.classList.remove('hidden');
  overlay.innerHTML = `
    <div class="modal">
      <div class="modal__handle"></div>
      ${content}
    </div>
  `;
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });
}

export function closeModal() {
  const overlay = document.getElementById('modal-overlay');
  overlay.classList.add('hidden');
  overlay.innerHTML = '';
}

// ── Init ──
function init() {
  initLanguageSwitcher();
  initBottomNav();
  setLang(getLang());
  navigateTo('home');
}

document.addEventListener('DOMContentLoaded', init);
