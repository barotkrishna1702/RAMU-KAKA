/* =============================================
   RAMU KAKA — Techniques Page
   ============================================= */

import { t, getLang } from '../i18n/translations.js';
import { techniques, crops } from '../data/mock-data.js';
import { navigateTo } from '../main.js';

export function renderTechniques(container) {
  const lang = getLang();

  const categories = [
    { id: 'all', label: lang === 'hi' ? 'सभी' : 'All', emoji: '📚' },
    { id: 'sowing', label: t('techniques.sowing'), emoji: '🌱' },
    { id: 'spacing', label: t('techniques.spacing'), emoji: '📏' },
    { id: 'intercropping', label: t('techniques.intercropping'), emoji: '🌿' },
    { id: 'pruning', label: t('techniques.pruning'), emoji: '✂️' },
    { id: 'harvesting', label: t('techniques.harvesting'), emoji: '🌾' }
  ];

  container.innerHTML = `
    <div class="page-back" id="techniques-back">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
      ${t('common.back')}
    </div>

    <div class="section-header">
      <h3 class="section-title">${t('techniques.title')}</h3>
    </div>

    <!-- Category Filter -->
    <div class="category-filter" style="margin-bottom:var(--space-4);">
      ${categories.map(c => `
        <button class="chip ${c.id === 'all' ? 'active' : ''}" data-tech-cat="${c.id}">
          ${c.emoji} ${c.label}
        </button>
      `).join('')}
    </div>

    <!-- Crop Filter -->
    <div class="category-filter" style="margin-bottom:var(--space-4);">
      <button class="chip active" data-tech-crop="all">${lang === 'hi' ? 'सभी फसल' : 'All crops'}</button>
      ${[...new Set(techniques.map(t => t.crop))].map(cropId => {
        const crop = crops.find(c => c.id === cropId);
        return crop ? `<button class="chip" data-tech-crop="${cropId}">${crop.emoji} ${lang === 'hi' ? crop.hi : crop.en}</button>` : '';
      }).join('')}
    </div>

    <!-- Techniques List -->
    <div id="techniques-list">
      ${techniques.map(tech => renderTechniqueCard(tech, lang)).join('')}
    </div>
  `;

  // Back
  document.getElementById('techniques-back').addEventListener('click', () => navigateTo('more'));

  // Category filter
  container.querySelectorAll('[data-tech-cat]').forEach(chip => {
    chip.addEventListener('click', () => {
      container.querySelectorAll('[data-tech-cat]').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      filterTechniques();
    });
  });

  // Crop filter
  container.querySelectorAll('[data-tech-crop]').forEach(chip => {
    chip.addEventListener('click', () => {
      container.querySelectorAll('[data-tech-crop]').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      filterTechniques();
    });
  });

  // Expand/collapse
  container.querySelectorAll('.technique-card').forEach(card => {
    card.addEventListener('click', () => {
      const steps = card.querySelector('.technique-card__steps');
      if (steps) {
        steps.classList.toggle('hidden');
        const arrow = card.querySelector('.tech-arrow');
        if (arrow) arrow.textContent = steps.classList.contains('hidden') ? '▼' : '▲';
      }
    });
  });

  function filterTechniques() {
    const catFilter = container.querySelector('[data-tech-cat].active')?.dataset.techCat || 'all';
    const cropFilter = container.querySelector('[data-tech-crop].active')?.dataset.techCrop || 'all';

    container.querySelectorAll('.technique-card').forEach(card => {
      const cat = card.dataset.techCategory;
      const crop = card.dataset.techCrop;
      const showCat = catFilter === 'all' || cat === catFilter;
      const showCrop = cropFilter === 'all' || crop === cropFilter;
      card.style.display = (showCat && showCrop) ? '' : 'none';
    });
  }
}

function renderTechniqueCard(tech, lang) {
  const crop = crops.find(c => c.id === tech.crop);
  return `
    <div class="technique-card" data-tech-category="${tech.category}" data-tech-crop="${tech.crop}">
      <div class="technique-card__header">
        <div class="technique-card__icon" style="background:${tech.color}22;color:${tech.color};">
          ${tech.icon}
        </div>
        <div style="flex:1;">
          <div class="technique-card__title">${lang === 'hi' ? tech.title : tech.titleEn}</div>
          <div class="technique-card__crop">${crop?.emoji || ''} ${lang === 'hi' ? crop?.hi || '' : crop?.en || ''} • ${t(`techniques.${tech.category}`)}</div>
        </div>
        <span class="tech-arrow" style="color:var(--color-text-muted);font-size:var(--text-sm);">▼</span>
      </div>
      <div class="technique-card__body">${tech.description}</div>
      <ol class="technique-card__steps hidden">
        ${tech.steps.map(step => `<li>${step}</li>`).join('')}
      </ol>
    </div>
  `;
}
