/* =======================================================
   RAMU KAKA — Main App Router & Initializer
   ======================================================= */

import { renderFarmView } from './pages/farm.js';
import { renderCropView } from './pages/crop.js';
import { renderMarketView } from './pages/market.js';
import { renderRecordsView } from './pages/records.js';
import { voiceOverlay } from './components/voice-overlay.js';
import { farmOnboarding } from './components/farm-onboarding.js';
import { setLanguage, toggleLanguage, getLanguage } from './i18n/translations.js';

class AppRouter {
  constructor() {
    this.currentPage = 'farm';
    this.routes = {
      farm: renderFarmView,
      crop: renderCropView,
      market: renderMarketView,
      records: renderRecordsView
    };
  }

  init() {
    this.setupNavigation();
    this.setupLanguageSwitcher();
    voiceOverlay.init();
    this.navigate('farm');
  }

  navigate(page) {
    if (page === 'ramu') {
      voiceOverlay.show(this.currentPage);
      return;
    }

    if (!this.routes[page]) return;
    this.currentPage = page;

    // Update active nav items in desktop sidebar
    document.querySelectorAll('.sidebar-nav-item').forEach(item => {
      item.classList.toggle('active', item.dataset.nav === page);
    });

    // Update active items in mobile bottom tray
    document.querySelectorAll('.bottom-tray-item').forEach(item => {
      item.classList.toggle('active', item.dataset.nav === page);
    });

    // Render page content
    const container = document.getElementById('page-container');
    if (container) {
      container.scrollTop = 0;
      this.routes[page](container);
    }
  }

  setupNavigation() {
    // Desktop Sidebar Navigation
    document.querySelectorAll('.sidebar-nav-item[data-nav]').forEach(btn => {
      btn.addEventListener('click', () => {
        this.navigate(btn.dataset.nav);
      });
    });

    // Mobile Bottom Tray Navigation
    document.querySelectorAll('.bottom-tray-item[data-nav]').forEach(btn => {
      btn.addEventListener('click', () => {
        this.navigate(btn.dataset.nav);
      });
    });
  }

  setupLanguageSwitcher() {
    const desktopBtn = document.getElementById('lang-btn-desktop');
    const mobileBtn = document.getElementById('lang-btn-mobile');

    const handleToggle = () => {
      const nextLang = toggleLanguage();
      // Re-render current page with new language
      this.navigate(this.currentPage);
    };

    desktopBtn?.addEventListener('click', handleToggle);
    mobileBtn?.addEventListener('click', handleToggle);
  }
}

// Global Router Instance
window.RK_Router = new AppRouter();

document.addEventListener('DOMContentLoaded', () => {
  setLanguage(getLanguage());
  window.RK_Router.init();

  // Show farm onboarding on first visit
  farmOnboarding.show();
});
