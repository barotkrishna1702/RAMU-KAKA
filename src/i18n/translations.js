/* =======================================================
   RAMU KAKA — Multilingual Engine (Hindi & English)
   ======================================================= */

const dictionary = {
  hi: {
    tagline: 'खेती का साथी',
    nav: {
      farm: 'खेत',
      crop: 'फसल',
      ramu: 'रामू काका',
      market: 'बाज़ार',
      records: 'रिकॉर्ड'
    },
    farmerHeader: 'राजेश पटेल · 3.5 एकड़',
    todayRecommendation: "आज का मुख्य सुझाव",
    listenPrompt: "सुन रहा हूँ... बोलिए",
    whyDetails: "विवरण (Why?)",
    viewField: "खेत देखें",
    askRamu: "रामू से पूछें 🎙️",
    buy: "खरीदें (BUY)",
    sell: "बेचें (SELL)",
    ramuRecommends: "💡 रामू की सिफारिश",
    mandiPrices: "मंडी भाव",
    yourCrops: "आपकी फसल",
    addActivity: "＋ गतिविधि जोड़ें",
    done: "हो गया (Done)"
  },
  en: {
    tagline: 'AI Farm Companion',
    nav: {
      farm: 'Farm',
      crop: 'Crop / Disease',
      ramu: 'Ramu AI',
      market: 'Market',
      records: 'Records'
    },
    farmerHeader: 'Rajesh Patel · 3.5 Acres',
    todayRecommendation: "TODAY'S RECOMMENDATION",
    listenPrompt: "Listening... Speak now",
    whyDetails: "Why? (Details)",
    viewField: "View Field",
    askRamu: "Ask Ramu 🎙️",
    buy: "BUY",
    sell: "SELL",
    ramuRecommends: "💡 RAMU RECOMMENDS",
    mandiPrices: "Mandi Prices",
    yourCrops: "Your Crops",
    addActivity: "＋ Add Activity",
    done: "Done"
  }
};

let activeLang = localStorage.getItem('rk-lang') || 'hi';

export function t(key) {
  const parts = key.split('.');
  let current = dictionary[activeLang] || dictionary.hi;
  for (const part of parts) {
    if (current[part] !== undefined) {
      current = current[part];
    } else {
      return key;
    }
  }
  return current;
}

export function setLanguage(lang) {
  activeLang = lang;
  localStorage.setItem('rk-lang', lang);
  document.querySelectorAll('[data-i18n]').forEach(el => {
    el.textContent = t(el.dataset.i18n);
  });
  const desktopLabel = document.getElementById('current-lang-desktop');
  const mobileLabel = document.getElementById('current-lang-mobile');
  if (desktopLabel) desktopLabel.textContent = lang === 'hi' ? 'हिंदी' : 'English';
  if (mobileLabel) mobileLabel.textContent = lang === 'hi' ? 'हिंदी' : 'English';
}

export function getLanguage() {
  return activeLang;
}

export function toggleLanguage() {
  const next = activeLang === 'hi' ? 'en' : 'hi';
  setLanguage(next);
  return next;
}
