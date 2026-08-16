/* =============================================
   RAMU KAKA — Market Page
   ============================================= */

import { t, getLang } from '../i18n/translations.js';
import { mandiPrices, products, crops } from '../data/mock-data.js';
import { showToast, showModal, closeModal } from '../main.js';

export function renderMarket(container) {
  const lang = getLang();
  const activeTab = 'prices';

  container.innerHTML = `
    <h3 class="section-title" style="margin-bottom:var(--space-3);">${t('market.title')}</h3>

    <!-- Tabs -->
    <div class="tabs">
      <button class="tab active" data-tab="prices">${t('market.mandiPrices')}</button>
      <button class="tab" data-tab="buy">${t('market.buy')}</button>
      <button class="tab" data-tab="sell">${t('market.sell')}</button>
    </div>

    <!-- Tab Content -->
    <div id="tab-content"></div>

    <!-- Cart FAB -->
    <div class="fab hidden" id="cart-fab" style="font-size:1.2rem;">
      🛒 <span id="cart-count" style="position:absolute;top:-4px;right:-4px;background:var(--color-danger);color:white;border-radius:var(--radius-full);width:20px;height:20px;font-size:0.625rem;display:flex;align-items:center;justify-content:center;">0</span>
    </div>
  `;

  // Tab switching
  container.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
      container.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      renderTabContent(tab.dataset.tab);
    });
  });

  // Cart FAB
  document.getElementById('cart-fab')?.addEventListener('click', () => showCartModal());

  renderTabContent('prices');

  function renderTabContent(tab) {
    const content = document.getElementById('tab-content');
    const cartFab = document.getElementById('cart-fab');

    switch(tab) {
      case 'prices': renderPricesTab(content); cartFab?.classList.add('hidden'); break;
      case 'buy': renderBuyTab(content); updateCartFab(); break;
      case 'sell': renderSellTab(content); cartFab?.classList.add('hidden'); break;
    }
  }

  function renderPricesTab(content) {
    // Group by crop
    const grouped = {};
    mandiPrices.forEach(p => {
      if (!grouped[p.crop]) grouped[p.crop] = [];
      grouped[p.crop].push(p);
    });

    content.innerHTML = `
      <!-- Mandi Ticker -->
      <div class="mandi-ticker">
        <div class="mandi-ticker__header">
          📊 ${t('market.livePrices')} — ${new Date().toLocaleDateString(lang === 'hi' ? 'hi-IN' : 'en-IN')}
        </div>
        <div class="mandi-ticker__scroll">
          ${mandiPrices.map(p => {
            const crop = crops.find(c => c.id === p.crop);
            const change = p.price - p.prevPrice;
            const isUp = change >= 0;
            return `
              <div class="mandi-ticker__item">
                <div class="mandi-ticker__crop">${crop?.emoji} ${lang === 'hi' ? crop?.hi : crop?.en}</div>
                <div class="mandi-ticker__price">₹${p.price.toLocaleString('en-IN')}</div>
                <div class="mandi-ticker__change ${isUp ? 'up' : 'down'}">
                  ${isUp ? '▲' : '▼'} ₹${Math.abs(change)}
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <!-- Best Time to Sell -->
      <div class="card card--accent" style="margin-bottom:var(--space-4);">
        <div class="card__header">
          <span class="card__title">💡 ${t('market.bestTime')}</span>
        </div>
        <div style="font-size:var(--text-sm);color:var(--color-text-secondary);line-height:var(--leading-relaxed);">
          ${lang === 'hi'
            ? '🍅 <strong>टमाटर</strong> — भाव तेज़ी से बढ़ रहा है (₹980 → ₹1,250)। अगले 3-5 दिन में बेचें।<br>☁️ <strong>कपास</strong> — भाव स्थिर, होली तक रुकें तो बेहतर मिल सकता है।<br>🧅 <strong>प्याज</strong> — भाव गिर रहा है (₹2,250 → ₹2,100)। स्टॉक करने से बचें।'
            : '🍅 <strong>Tomato</strong> — Prices rising fast (₹980 → ₹1,250). Sell in next 3-5 days.<br>☁️ <strong>Cotton</strong> — Prices stable, holding till Holi may yield better rates.<br>🧅 <strong>Onion</strong> — Prices dropping (₹2,250 → ₹2,100). Avoid stocking.'
          }
        </div>
      </div>

      <!-- Crop Filter -->
      <div class="category-filter">
        <button class="chip active" data-crop-filter="all">${lang === 'hi' ? 'सभी' : 'All'}</button>
        ${[...new Set(mandiPrices.map(p => p.crop))].map(cId => {
          const crop = crops.find(c => c.id === cId);
          return `<button class="chip" data-crop-filter="${cId}">${crop?.emoji} ${lang === 'hi' ? crop?.hi : crop?.en}</button>`;
        }).join('')}
      </div>

      <!-- Price List -->
      <div id="price-list">
        ${mandiPrices.map(p => renderMandiCard(p)).join('')}
      </div>

      <!-- Price Chart -->
      <div class="card" style="margin-top:var(--space-4);">
        <div class="card__header">
          <span class="card__title">${lang === 'hi' ? '📈 7 दिन का ट्रेंड' : '📈 7-Day Trend'}</span>
        </div>
        <div class="chart-container"><canvas id="price-chart"></canvas></div>
      </div>
    `;

    // Filter chips
    content.querySelectorAll('[data-crop-filter]').forEach(chip => {
      chip.addEventListener('click', () => {
        content.querySelectorAll('[data-crop-filter]').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        const filter = chip.dataset.cropFilter;
        const list = document.getElementById('price-list');
        const filtered = filter === 'all' ? mandiPrices : mandiPrices.filter(p => p.crop === filter);
        list.innerHTML = filtered.map(p => renderMandiCard(p)).join('');
      });
    });

    // Price chart
    setTimeout(() => initPriceChart(), 100);
  }

  function renderMandiCard(p) {
    const crop = crops.find(c => c.id === p.crop);
    const change = p.price - p.prevPrice;
    const changePercent = ((change / p.prevPrice) * 100).toFixed(1);
    const isUp = change >= 0;

    return `
      <div class="mandi-card">
        <div class="mandi-card__icon">${crop?.emoji || '🌾'}</div>
        <div class="mandi-card__info">
          <div class="mandi-card__crop">${lang === 'hi' ? crop?.hi : crop?.en}</div>
          <div class="mandi-card__mandi">${p.mandi}, ${p.state}</div>
        </div>
        <div class="mandi-card__prices">
          <div class="mandi-card__price">₹${p.price.toLocaleString('en-IN')}</div>
          <div class="mandi-card__unit">${t('market.perQuintal')}</div>
          <div class="mandi-card__trend ${isUp ? 'up' : 'down'}">
            ${isUp ? '▲' : '▼'} ${Math.abs(changePercent)}%
          </div>
        </div>
      </div>
    `;
  }

  function initPriceChart() {
    const canvas = document.getElementById('price-chart');
    if (!canvas || typeof Chart === 'undefined') return;

    window.RK.charts['price'] = new Chart(canvas, {
      type: 'line',
      data: {
        labels: lang === 'hi' ? ['10 अग', '11 अग', '12 अग', '13 अग', '14 अग', '15 अग', '16 अग'] : ['Aug 10', 'Aug 11', 'Aug 12', 'Aug 13', 'Aug 14', 'Aug 15', 'Aug 16'],
        datasets: [
          {
            label: lang === 'hi' ? 'धान' : 'Rice',
            data: [2700, 2720, 2750, 2780, 2800, 2830, 2850],
            borderColor: '#4CAF50',
            backgroundColor: 'rgba(76,175,80,0.1)',
            fill: true,
            tension: 0.4,
            pointRadius: 3
          },
          {
            label: lang === 'hi' ? 'टमाटर' : 'Tomato',
            data: [900, 920, 980, 1020, 1100, 1180, 1250],
            borderColor: '#F44336',
            backgroundColor: 'rgba(244,67,54,0.1)',
            fill: true,
            tension: 0.4,
            pointRadius: 3
          },
          {
            label: lang === 'hi' ? 'प्याज' : 'Onion',
            data: [2400, 2380, 2350, 2300, 2280, 2250, 2100],
            borderColor: '#9C27B0',
            backgroundColor: 'rgba(156,39,176,0.1)',
            fill: true,
            tension: 0.4,
            pointRadius: 3
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'bottom', labels: { font: { size: 10 }, usePointStyle: true, padding: 12 } }
        },
        scales: {
          x: { grid: { display: false }, ticks: { font: { size: 9 } } },
          y: { grid: { color: 'rgba(0,0,0,0.05)' }, ticks: { font: { size: 9 }, callback: v => '₹' + v } }
        }
      }
    });
  }

  function renderBuyTab(content) {
    const categories = [
      { id: 'all', label: t('market.categories.all'), emoji: '🏪' },
      { id: 'seeds', label: t('market.categories.seeds'), emoji: '🌱' },
      { id: 'fertilizers', label: t('market.categories.fertilizers'), emoji: '🧪' },
      { id: 'pesticides', label: t('market.categories.pesticides'), emoji: '🛡️' },
      { id: 'tools', label: t('market.categories.tools'), emoji: '🔧' },
      { id: 'bioInputs', label: t('market.categories.bioInputs'), emoji: '🧫' }
    ];

    content.innerHTML = `
      <!-- Search -->
      <div class="input-group" style="margin-bottom:var(--space-3);">
        <div style="position:relative;">
          <input type="text" class="input-group__field" id="product-search" placeholder="${lang === 'hi' ? '🔍 उत्पाद खोजें...' : '🔍 Search products...'}" style="padding-left:var(--space-4);" />
        </div>
      </div>

      <!-- Category Filter -->
      <div class="category-filter">
        ${categories.map(c => `
          <button class="chip ${c.id === 'all' ? 'active' : ''}" data-cat="${c.id}">
            ${c.emoji} ${c.label}
          </button>
        `).join('')}
      </div>

      <!-- Products Grid -->
      <div class="product-grid" id="product-grid">
        ${products.map(p => renderProductCard(p)).join('')}
      </div>
    `;

    // Category filter
    content.querySelectorAll('[data-cat]').forEach(chip => {
      chip.addEventListener('click', () => {
        content.querySelectorAll('[data-cat]').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        const cat = chip.dataset.cat;
        const grid = document.getElementById('product-grid');
        const filtered = cat === 'all' ? products : products.filter(p => p.category === cat);
        grid.innerHTML = filtered.map(p => renderProductCard(p)).join('');
        attachProductListeners();
      });
    });

    // Search
    document.getElementById('product-search')?.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase();
      const grid = document.getElementById('product-grid');
      const filtered = products.filter(p => p.name.toLowerCase().includes(q) || (p.en && p.en.toLowerCase().includes(q)) || p.brand.toLowerCase().includes(q));
      grid.innerHTML = filtered.map(p => renderProductCard(p)).join('');
      attachProductListeners();
    });

    attachProductListeners();
  }

  function renderProductCard(p) {
    return `
      <div class="product-card" data-product-id="${p.id}">
        <div class="product-card__image" style="display:flex;align-items:center;justify-content:center;font-size:2.5rem;background:${
          p.category === 'seeds' ? '#E8F5E9' : p.category === 'fertilizers' ? '#FFF3E0' : p.category === 'pesticides' ? '#FCE4EC' : p.category === 'tools' ? '#E3F2FD' : '#F3E5F5'
        };">${p.image}</div>
        <div class="product-card__body">
          <div class="product-card__name">${p.name}</div>
          <div class="product-card__brand">${p.brand}</div>
          <div class="product-card__footer">
            <span class="product-card__price">₹${p.price.toLocaleString('en-IN')}<small style="font-size:0.625rem;color:var(--color-text-muted);">/${p.unit}</small></span>
            <button class="product-card__add-btn" data-add-id="${p.id}">+</button>
          </div>
        </div>
      </div>
    `;
  }

  function attachProductListeners() {
    container.querySelectorAll('[data-add-id]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = parseInt(btn.dataset.addId);
        const product = products.find(p => p.id === id);
        if (product) {
          const existing = window.RK.cart.find(item => item.id === id);
          if (existing) {
            existing.qty++;
          } else {
            window.RK.cart.push({ ...product, qty: 1 });
          }
          updateCartFab();
          showToast(`${product.name} ${lang === 'hi' ? 'कार्ट में जोड़ा' : 'added to cart'}`, 'success');
          btn.textContent = '✓';
          btn.style.background = 'var(--color-primary)';
          btn.style.color = 'white';
          setTimeout(() => { btn.textContent = '+'; btn.style.background = ''; btn.style.color = ''; }, 1000);
        }
      });
    });

    // Product detail on card click
    container.querySelectorAll('[data-product-id]').forEach(card => {
      card.addEventListener('click', () => {
        const id = parseInt(card.dataset.productId);
        const product = products.find(p => p.id === id);
        if (product) showProductDetail(product);
      });
    });
  }

  function showProductDetail(p) {
    showModal(`
      <div class="modal__title">${p.name}</div>
      <div style="display:flex;align-items:center;justify-content:center;font-size:4rem;height:120px;background:var(--color-surface-muted);border-radius:var(--radius-lg);margin-bottom:var(--space-4);">${p.image}</div>
      <div style="margin-bottom:var(--space-2);"><span class="badge badge--primary">${t(`market.categories.${p.category}`)}</span> <span class="badge badge--info">${p.brand}</span></div>
      <div style="font-size:var(--text-2xl);font-weight:var(--font-bold);color:var(--color-primary);margin-bottom:var(--space-2);">₹${p.price.toLocaleString('en-IN')} <small style="font-size:var(--text-sm);color:var(--color-text-muted);">/ ${p.unit}</small></div>
      <div style="font-size:var(--text-sm);color:var(--color-text-secondary);line-height:var(--leading-relaxed);margin-bottom:var(--space-4);">${p.description}</div>
      <div style="display:flex;gap:var(--space-2);">
        <button class="btn btn--primary btn--block" onclick="
          const existing = window.RK.cart.find(item => item.id === ${p.id});
          if(existing) existing.qty++; else window.RK.cart.push({...${JSON.stringify(p).replace(/"/g, '&quot;')}, qty:1});
          document.getElementById('modal-overlay').classList.add('hidden');
          document.getElementById('modal-overlay').innerHTML='';
        ">${t('market.addToCart')} — ₹${p.price.toLocaleString('en-IN')}</button>
      </div>
    `);
  }

  function updateCartFab() {
    const fab = document.getElementById('cart-fab');
    const count = document.getElementById('cart-count');
    const total = window.RK.cart.reduce((sum, item) => sum + item.qty, 0);
    if (total > 0) {
      fab?.classList.remove('hidden');
      if (count) count.textContent = total;
    } else {
      fab?.classList.add('hidden');
    }
  }

  function showCartModal() {
    if (window.RK.cart.length === 0) {
      showToast(lang === 'hi' ? 'कार्ट खाली है' : 'Cart is empty', 'info');
      return;
    }
    const total = window.RK.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    showModal(`
      <div class="modal__title">🛒 ${t('market.cart')}</div>
      ${window.RK.cart.map(item => `
        <div class="mandi-card" style="margin-bottom:var(--space-2);">
          <div class="mandi-card__icon">${item.image}</div>
          <div class="mandi-card__info">
            <div class="mandi-card__crop">${item.name}</div>
            <div class="mandi-card__mandi">${lang === 'hi' ? 'मात्रा' : 'Qty'}: ${item.qty}</div>
          </div>
          <div class="mandi-card__prices">
            <div class="mandi-card__price">₹${(item.price * item.qty).toLocaleString('en-IN')}</div>
          </div>
        </div>
      `).join('')}
      <div style="display:flex;justify-content:space-between;padding:var(--space-3);background:var(--color-surface-muted);border-radius:var(--radius-lg);margin-top:var(--space-3);">
        <span style="font-weight:var(--font-bold);">${lang === 'hi' ? 'कुल' : 'Total'}</span>
        <span style="font-weight:var(--font-bold);color:var(--color-primary);font-size:var(--text-lg);">₹${total.toLocaleString('en-IN')}</span>
      </div>
      <button class="btn btn--primary btn--block" style="margin-top:var(--space-4);" onclick="
        window.RK.cart = [];
        document.getElementById('modal-overlay').classList.add('hidden');
        document.getElementById('modal-overlay').innerHTML='';
        document.getElementById('cart-count').textContent='0';
        document.getElementById('cart-fab').classList.add('hidden');
      ">${lang === 'hi' ? 'ऑर्डर करें' : 'Place Order'} — ₹${total.toLocaleString('en-IN')}</button>
    `);
  }

  function renderSellTab(content) {
    content.innerHTML = `
      <div class="card" style="margin-bottom:var(--space-4);">
        <div class="card__title" style="margin-bottom:var(--space-3);">${t('market.sellProduce')}</div>

        <div class="sell-upload-area" id="sell-upload">
          <span style="font-size:2rem;">📷</span>
          <span style="font-size:var(--text-sm);">${t('market.uploadPhoto')}</span>
        </div>

        <div class="input-group">
          <label class="input-group__label">${lang === 'hi' ? 'फसल' : 'Crop'}</label>
          <select class="input-group__field" style="background:var(--color-surface);">
            ${crops.map(c => `<option value="${c.id}">${c.emoji} ${lang === 'hi' ? c.hi : c.en}</option>`).join('')}
          </select>
        </div>

        <div class="input-group">
          <label class="input-group__label">${lang === 'hi' ? 'मात्रा (क्विंटल)' : 'Quantity (Quintals)'}</label>
          <input type="number" class="input-group__field" placeholder="${lang === 'hi' ? 'उदा: 50' : 'e.g. 50'}" />
        </div>

        <div class="input-group">
          <label class="input-group__label">${t('market.setPrice')} (₹/${lang === 'hi' ? 'क्विंटल' : 'Quintal'})</label>
          <input type="number" class="input-group__field" placeholder="${lang === 'hi' ? 'उदा: 2500' : 'e.g. 2500'}" />
        </div>

        <div class="input-group">
          <label class="input-group__label">${lang === 'hi' ? 'स्थान' : 'Location'}</label>
          <input type="text" class="input-group__field" placeholder="${lang === 'hi' ? 'गाँव/शहर का नाम' : 'Village/city name'}" />
        </div>

        <button class="btn btn--primary btn--block" id="list-produce-btn">
          ${t('market.listProduce')}
        </button>
      </div>

      <!-- Recent Listings -->
      <div class="section-header">
        <h3 class="section-title">${lang === 'hi' ? 'हाल की लिस्टिंग' : 'Recent Listings'}</h3>
      </div>
      <div class="empty-state" style="padding:var(--space-6);">
        <div class="empty-state__icon">📦</div>
        <div class="empty-state__title">${lang === 'hi' ? 'अभी कोई लिस्टिंग नहीं' : 'No listings yet'}</div>
        <div class="empty-state__desc">${lang === 'hi' ? 'ऊपर से अपनी फसल लिस्ट करें' : 'List your produce above'}</div>
      </div>
    `;

    document.getElementById('list-produce-btn')?.addEventListener('click', () => {
      showToast(lang === 'hi' ? '✅ आपकी फसल लिस्ट हो गई!' : '✅ Your produce has been listed!', 'success');
    });
  }
}
