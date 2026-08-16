/* =======================================================
   RAMU KAKA — 03: Market View (BUY + SELL Superchoices)
   Section 13 of Master Vibe-Coding Prompt
   ======================================================= */

import { marketplaceProducts, mandiPricesData, sellingRoutes, farmData } from '../data/mock-data.js';
import { getLanguage, t } from '../i18n/translations.js';
import { voiceOverlay } from '../components/voice-overlay.js';

let activeMode = 'buy'; // 'buy' or 'sell'
let cart = [];

export function renderMarketView(container) {
  const lang = getLanguage();

  container.innerHTML = `
    <div class="market-view-container">
      <!-- Top Superchoice Tabs (Section 13) -->
      <div class="superchoice-tabs">
        <button class="superchoice-btn ${activeMode === 'buy' ? 'active' : ''}" id="tab-btn-buy">
          🛒 ${t('buy')}
        </button>
        <button class="superchoice-btn ${activeMode === 'sell' ? 'active' : ''}" id="tab-btn-sell">
          💰 ${t('sell')}
        </button>
      </div>

      <!-- DYNAMIC CONTENT (BUY or SELL) -->
      <div id="market-mode-container">
        <!-- Rendered based on activeMode -->
      </div>
    </div>
  `;

  document.getElementById('tab-btn-buy')?.addEventListener('click', () => {
    activeMode = 'buy';
    updateMarketTabs();
  });

  document.getElementById('tab-btn-sell')?.addEventListener('click', () => {
    activeMode = 'sell';
    updateMarketTabs();
  });

  updateMarketTabs();
}

function updateMarketTabs() {
  const lang = getLanguage();
  const buyBtn = document.getElementById('tab-btn-buy');
  const sellBtn = document.getElementById('tab-btn-sell');
  const modeContainer = document.getElementById('market-mode-container');

  if (!modeContainer) return;

  if (activeMode === 'buy') {
    buyBtn?.classList.add('active');
    sellBtn?.classList.remove('active');
    renderBuyStore(modeContainer);
  } else {
    sellBtn?.classList.add('active');
    buyBtn?.classList.remove('active');
    renderSellPortal(modeContainer);
  }
}

/* ── BUY: Amazon-Style Agricultural Marketplace ── */
function renderBuyStore(container) {
  const lang = getLanguage();

  container.innerHTML = `
    <!-- RAMU RECOMMENDS BOX (Explain WHY before showing products) -->
    <div class="ramu-recommends-banner">
      <div class="ramu-recommends-header">
        <span>💡</span>
        <span>${t('ramuRecommends')}</span>
      </div>
      <div class="ramu-recommends-text">
        ${lang === 'hi'
          ? 'आपके <strong>खेत 2 (टमाटर)</strong> में अर्ली ब्लाइट कवक का संकेत मिला है। इसके लिए जैविक नीम रक्षक और मैंकोज़ेब कवकनाशी उपयोगी हो सकते हैं।'
          : 'Your <strong>Field 2 (Tomato)</strong> shows an early fungal stress signal. Neem oil bio-control and Mancozeb fungicide are directly recommended.'
        }
      </div>
    </div>

    <!-- Search Bar -->
    <div style="margin-bottom: 14px;">
      <input type="text" placeholder="${lang === 'hi' ? '🔍 बीज, खाद, कीटनाशक, औजार खोजें...' : '🔍 Search seeds, fertilizers, tools...'}" style="width:100%;padding:10px 14px;border-radius:var(--radius-pill);border:1px solid var(--color-border);background:white;font-size:0.9rem;" />
    </div>

    <!-- Categories Scroller -->
    <div class="product-category-scroller">
      <button class="category-chip active">🌱 ${lang === 'hi' ? 'सभी उत्पाद' : 'All Products'}</button>
      <button class="category-chip">🌿 ${lang === 'hi' ? 'जैव-इनपुट' : 'Bio-Inputs'}</button>
      <button class="category-chip">🛡️ ${lang === 'hi' ? 'फसल सुरक्षा' : 'Crop Care'}</button>
      <button class="category-chip">🧪 ${lang === 'hi' ? 'उर्वरक व खाद' : 'Fertilizers'}</button>
      <button class="category-chip">🚜 ${lang === 'hi' ? 'कृषि औजार' : 'Tools'}</button>
    </div>

    <!-- Products Grid -->
    <div class="products-grid-amazon">
      ${marketplaceProducts.map(p => `
        <div class="agro-product-card">
          <div>
            <div class="product-img-box">${p.icon}</div>
            <div class="product-title-sm">${lang === 'hi' ? p.name : p.nameEn}</div>
            <div class="product-brand-tag">${p.brand} · ${p.packSize}</div>
            <div style="font-size:0.75rem;color:var(--color-turmeric-dark);margin-top:2px;">⭐ ${p.rating}</div>
          </div>
          <div>
            <div class="product-price-row">
              <span class="product-price-main">₹${p.price}</span>
            </div>
            <button class="btn-add-cart-sm" onclick="window.RK_addToCart('${p.id}')">
              ＋ ${lang === 'hi' ? 'कार्ट में जोड़ें' : 'Add to Cart'}
            </button>
          </div>
        </div>
      `).join('')}
    </div>
  `;

  window.RK_addToCart = (id) => {
    const prod = marketplaceProducts.find(p => p.id === id);
    if (prod) {
      cart.push(prod);
      showGlobalToast(lang === 'hi' ? `✅ ${prod.name} कार्ट में जोड़ा गया` : `✅ Added ${prod.nameEn} to cart`);
    }
  };
}

/* ── SELL: Mandi-First Selling Portal (No generic product grid) ── */
function renderSellPortal(container) {
  const lang = getLanguage();
  const mandis = mandiPricesData;
  const routes = sellingRoutes;

  container.innerHTML = `
    <!-- MANDI PRICES SECTION (Mandi A, B, C) -->
    <div class="mandi-price-banner">
      <div style="display:flex;align-items:center;justify-content:space-between;">
        <span style="font-family:var(--font-heading);font-weight:bold;font-size:var(--text-base);color:var(--color-primary-dark);">
          📊 ${lang === 'hi' ? 'आज के मंडी भाव (धान · Rice)' : 'Mandi Prices · Rice Today'}
        </span>
        <span style="font-size:0.75rem;color:var(--color-text-secondary);">
          ${lang === 'hi' ? 'कन्नौज क्षेत्र · लाइव' : 'Kannauj Region · Live'}
        </span>
      </div>

      <div class="mandi-cards-row">
        ${mandis.map(m => `
          <div class="mandi-single-card ${m.isBest ? 'best-price' : ''}">
            <div class="mandi-name-text">${lang === 'hi' ? m.name : m.nameEn}</div>
            <div class="mandi-rate-text">₹${m.price.toLocaleString('en-IN')}</div>
            <div class="mandi-name-text">/ ${m.unit}</div>
            <span class="mandi-best-badge">${m.badgeText}</span>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- RAMU SELLING SUGGESTION -->
    <div class="ramu-recommends-banner">
      <div class="ramu-recommends-header">
        <span>💡</span>
        <span>${lang === 'hi' ? "रामू का बिक्री सुझाव" : "Ramu's Selling Suggestion"}</span>
      </div>
      <div class="ramu-recommends-text">
        ${lang === 'hi'
          ? '<strong>मंडी B (कन्नौज)</strong> में आज का अधिकतम भाव ₹2,520/क्विंटल है। आपके खेत 1 का अनुमानित उत्पादन 800 किग्रा धान तैयार है।'
          : '<strong>Mandi B</strong> currently has the highest listed price for your rice at ₹2,520/q. Estimated available yield: 800 kg.'
        }
      </div>
    </div>

    <!-- YOUR CROPS QUICK SELL CARD -->
    <div style="background:var(--color-bg-card);border-radius:var(--radius-lg);padding:14px;border:1px solid var(--color-border);margin-bottom:18px;">
      <div style="font-family:var(--font-heading);font-weight:bold;font-size:var(--text-sm);margin-bottom:6px;">
        ${t('yourCrops')}
      </div>
      <div style="display:flex;align-items:center;justify-content:space-between;">
        <div>
          <div style="font-weight:bold;">🌾 धान (PRH-10) · खेत 1</div>
          <div style="font-size:0.8rem;color:var(--color-text-secondary);">800 किग्रा बिक्री योग्य स्टॉक उपलब्ध</div>
        </div>
        <button class="btn-action-primary" style="font-size:0.75rem;padding:6px 14px;" onclick="window.RK_sellCrop()">
          ${lang === 'hi' ? 'फसल बेचें' : 'Sell this crop'}
        </button>
      </div>
    </div>

    <!-- 4 FEATURED SELLING OPTIONS (🟩 Mandi, 🟨 Local Buyer, 🟦 Direct Sale, 🟧 Bulk Buyer) -->
    <div>
      <h3 style="font-size:var(--text-base);font-weight:var(--weight-bold);margin-bottom:8px;">
        ${lang === 'hi' ? 'बिक्री के विकल्प (Selling Routes)' : 'Featured Selling Options'}
      </h3>
      <div class="selling-routes-grid">
        ${routes.map(r => `
          <div class="route-card route-card--${r.type}">
            <div>
              <div class="route-badge">${r.icon} ${r.title}</div>
              <div class="route-price">${r.rate}</div>
              <div style="font-size:0.75rem;color:var(--color-text-secondary);">${r.desc}</div>
            </div>
            <button class="btn-action-primary" style="font-size:0.75rem;padding:4px 10px;margin-top:8px;" onclick="window.RK_viewRoute('${r.title}')">
              ${lang === 'hi' ? 'विकल्प देखें' : 'View'}
            </button>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  window.RK_sellCrop = () => {
    showGlobalToast(lang === 'hi' ? '✅ धान बिक्री के लिए मंडी B पर सूचित किया गया' : '✅ Rice listed for sale at Mandi B');
  };

  window.RK_viewRoute = (name) => {
    showGlobalToast(`${name}: ${lang === 'hi' ? 'विकल्प चुना गया' : 'Selected'}`);
  };
}

function showGlobalToast(msg) {
  const container = document.getElementById('toast-container');
  if (!container) return;
  const item = document.createElement('div');
  item.className = 'toast-item';
  item.textContent = msg;
  container.appendChild(item);
  setTimeout(() => item.remove(), 2500);
}
