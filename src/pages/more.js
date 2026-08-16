/* =============================================
   RAMU KAKA — More Page
   ============================================= */

import { t, getLang } from '../i18n/translations.js';
import { navigateTo } from '../main.js';

export function renderMore(container) {
  const lang = getLang();

  container.innerHTML = `
    <h3 class="section-title" style="margin-bottom:var(--space-4);">${t('more.title')}</h3>

    <div class="more-menu">
      <div class="more-menu__item" data-goto="records">
        <div class="more-menu__icon" style="background:#E8F5E9;">📝</div>
        <div class="more-menu__label">${t('more.records')}</div>
        <div class="more-menu__desc">${t('more.recordsDesc')}</div>
      </div>
      <div class="more-menu__item" data-goto="techniques">
        <div class="more-menu__icon" style="background:#FFF3E0;">🌱</div>
        <div class="more-menu__label">${t('more.techniques')}</div>
        <div class="more-menu__desc">${t('more.techniquesDesc')}</div>
      </div>
      <div class="more-menu__item" data-goto="settings">
        <div class="more-menu__icon" style="background:#E3F2FD;">⚙️</div>
        <div class="more-menu__label">${t('more.settings')}</div>
        <div class="more-menu__desc">${t('more.settingsDesc')}</div>
      </div>
      <div class="more-menu__item" data-goto="help">
        <div class="more-menu__icon" style="background:#F3E5F5;">❓</div>
        <div class="more-menu__label">${t('more.help')}</div>
        <div class="more-menu__desc">${t('more.helpDesc')}</div>
      </div>
    </div>

    <!-- About Section -->
    <div class="card" style="margin-top:var(--space-6);text-align:center;">
      <div style="display:flex;align-items:center;justify-content:center;gap:var(--space-3);margin-bottom:var(--space-3);">
        <div class="top-bar__avatar" style="width:48px;height:48px;font-size:var(--text-xl);">रा</div>
        <div>
          <div style="font-size:var(--text-xl);font-weight:var(--font-extrabold);">रामू काका</div>
          <div style="font-size:var(--text-sm);color:var(--color-text-secondary);">${t('tagline')}</div>
        </div>
      </div>
      <div style="font-size:var(--text-sm);color:var(--color-text-muted);margin-bottom:var(--space-3);">
        ${lang === 'hi'
          ? 'AI-संचालित कृषि सहायक<br>संस्करण 1.0.0'
          : 'AI-powered Agricultural Assistant<br>Version 1.0.0'
        }
      </div>
      <div style="display:flex;gap:var(--space-4);justify-content:center;font-size:var(--text-xs);color:var(--color-text-muted);">
        <span>🌾 ${lang === 'hi' ? '8 फसलें' : '8 crops'}</span>
        <span>🗣️ ${lang === 'hi' ? '6 भाषाएँ' : '6 languages'}</span>
        <span>📊 ${lang === 'hi' ? '12 मंडियाँ' : '12 mandis'}</span>
      </div>
    </div>

    <!-- Settings Section (inline) -->
    <div id="settings-section" class="hidden" style="margin-top:var(--space-4);">
      <div class="page-back" id="settings-back">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
        ${t('common.back')}
      </div>
      <h3 class="section-title" style="margin-bottom:var(--space-4);">${t('more.settings')}</h3>
      <div class="card" style="margin-bottom:var(--space-3);">
        <div class="card__title" style="margin-bottom:var(--space-3);">${lang === 'hi' ? 'सूचना सेटिंग' : 'Notification Settings'}</div>
        <div style="display:flex;flex-direction:column;gap:var(--space-3);">
          ${['मंडी भाव अलर्ट', 'मौसम चेतावनी', 'सिंचाई रिमाइंडर', 'कीट/रोग अलर्ट'].map((label, i) => `
            <label style="display:flex;align-items:center;justify-content:space-between;font-size:var(--text-sm);">
              <span>${lang === 'hi' ? label : ['Mandi price alerts', 'Weather warnings', 'Irrigation reminders', 'Pest/disease alerts'][i]}</span>
              <input type="checkbox" checked style="width:18px;height:18px;accent-color:var(--color-primary);" />
            </label>
          `).join('')}
        </div>
      </div>
    </div>

    <!-- Help Section (inline) -->
    <div id="help-section" class="hidden" style="margin-top:var(--space-4);">
      <div class="page-back" id="help-back">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
        ${t('common.back')}
      </div>
      <h3 class="section-title" style="margin-bottom:var(--space-4);">${t('more.help')}</h3>
      <div class="card" style="margin-bottom:var(--space-3);">
        <div class="card__title" style="margin-bottom:var(--space-3);">${lang === 'hi' ? 'वॉयस कमांड उदाहरण' : 'Voice Command Examples'}</div>
        <div style="font-size:var(--text-sm);color:var(--color-text-secondary);line-height:2;">
          ${lang === 'hi'
            ? '🎤 "आज मंडी भाव क्या है?"<br>🎤 "मेरी फसल कैसी है?"<br>🎤 "कब सिंचाई करनी चाहिए?"<br>🎤 "आज मौसम कैसा रहेगा?"<br>🎤 "धान में कौन सा रोग है?"'
            : '🎤 "What are today\'s mandi prices?"<br>🎤 "How is my crop?"<br>🎤 "When should I irrigate?"<br>🎤 "How is the weather today?"<br>🎤 "What disease is in my rice?"'
          }
        </div>
      </div>
      <div class="card">
        <div class="card__title" style="margin-bottom:var(--space-3);">${lang === 'hi' ? 'संपर्क करें' : 'Contact Us'}</div>
        <div style="font-size:var(--text-sm);color:var(--color-text-secondary);line-height:2;">
          📞 1800-XXX-XXXX (${lang === 'hi' ? 'टोल फ्री' : 'Toll Free'})<br>
          📧 help@ramukaka.ai<br>
          💬 WhatsApp: +91-XXXXX-XXXXX
        </div>
      </div>
    </div>
  `;

  // Navigation
  container.querySelectorAll('[data-goto]').forEach(item => {
    item.addEventListener('click', () => {
      const target = item.dataset.goto;
      if (target === 'records' || target === 'techniques') {
        navigateTo(target);
      } else if (target === 'settings') {
        container.querySelector('.more-menu').classList.add('hidden');
        container.querySelector('.card').classList.add('hidden');
        document.getElementById('settings-section').classList.remove('hidden');
      } else if (target === 'help') {
        container.querySelector('.more-menu').classList.add('hidden');
        container.querySelector('.card').classList.add('hidden');
        document.getElementById('help-section').classList.remove('hidden');
      }
    });
  });

  // Back buttons
  document.getElementById('settings-back')?.addEventListener('click', () => renderMore(container));
  document.getElementById('help-back')?.addEventListener('click', () => renderMore(container));
}
