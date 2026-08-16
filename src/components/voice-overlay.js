/* =======================================================
   RAMU KAKA — Contextual Voice Overlay Component (Section 3)
   ======================================================= */

import { farmData, mandiPricesData, cropDiagnosisMock } from '../data/mock-data.js';
import { getLanguage, t } from '../i18n/translations.js';

class VoiceOverlayController {
  constructor() {
    this.overlay = null;
    this.isListening = false;
    this.recognition = null;
    this.currentContext = 'farm';
  }

  init() {
    this.overlay = document.getElementById('ramu-voice-overlay');
    this.backdrop = document.getElementById('voice-overlay-backdrop');
    this.closeBtn = document.getElementById('voice-close-btn');
    this.doneBtn = document.getElementById('voice-done-btn');
    this.micToggle = document.getElementById('overlay-mic-toggle');
    this.statusText = document.getElementById('voice-status-text');
    this.contextChip = document.getElementById('voice-context-chip');
    this.transcriptText = document.getElementById('transcript-text');
    this.responseBox = document.getElementById('voice-response-box');
    this.responseText = document.getElementById('voice-response-text');
    this.responseActions = document.getElementById('voice-response-actions');

    this.setupListeners();
    this.setupSpeechRecognition();
  }

  setupListeners() {
    this.closeBtn?.addEventListener('click', () => this.hide());
    this.doneBtn?.addEventListener('click', () => this.hide());
    this.backdrop?.addEventListener('click', () => this.hide());

    this.micToggle?.addEventListener('click', () => {
      if (this.isListening) {
        this.stopListening();
      } else {
        this.startListening();
      }
    });

    // Triggers from sidebar or bottom tray
    document.getElementById('desktop-ramu-btn')?.addEventListener('click', () => this.show());
    document.getElementById('mobile-ramu-btn')?.addEventListener('click', () => this.show());
  }

  setupSpeechRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.interimResults = true;
      this.recognition.lang = getLanguage() === 'hi' ? 'hi-IN' : 'en-IN';

      this.recognition.onstart = () => {
        this.isListening = true;
        this.updateListeningUI(true);
      };

      this.recognition.onresult = (event) => {
        let text = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          text += event.results[i][0].transcript;
        }
        if (this.transcriptText) this.transcriptText.textContent = `"${text}"`;

        if (event.results[event.results.length - 1].isFinal) {
          this.processQuery(text);
        }
      };

      this.recognition.onerror = () => {
        this.stopListening();
      };

      this.recognition.onend = () => {
        this.stopListening();
      };
    }
  }

  show(context = null) {
    if (context) this.currentContext = context;
    if (!this.overlay) this.init();

    this.overlay.classList.remove('hidden');
    this.updateContextChip();
    this.resetResponse();
    this.startListening();
  }

  hide() {
    this.stopListening();
    this.overlay?.classList.add('hidden');
  }

  updateContextChip() {
    const lang = getLanguage();
    if (this.contextChip) {
      if (this.currentContext === 'farm') {
        this.contextChip.textContent = lang === 'hi' ? '📍 खेत 1 व 2 (नक्शा सक्रिय)' : '📍 Farm Map View Active';
      } else if (this.currentContext === 'crop') {
        this.contextChip.textContent = lang === 'hi' ? '🌿 फसल व रोग जांच सक्रिय' : '🌿 Crop / Disease View';
      } else if (this.currentContext === 'market') {
        this.contextChip.textContent = lang === 'hi' ? '🛒 बाज़ार व मंडी भाव सक्रिय' : '🛒 Market & Mandi Active';
      } else {
        this.contextChip.textContent = lang === 'hi' ? '📋 फ़ार्म रिकॉर्ड सक्रिय' : '📋 Farm Records Active';
      }
    }
  }

  startListening() {
    this.isListening = true;
    this.updateListeningUI(true);
    if (this.recognition) {
      try {
        this.recognition.lang = getLanguage() === 'hi' ? 'hi-IN' : 'en-IN';
        this.recognition.start();
      } catch (e) {
        // Recognition already started
      }
    } else {
      // Simulate speech input after 1.8 seconds for demonstration
      setTimeout(() => {
        if (this.isListening) {
          const sampleQuery = getLanguage() === 'hi' ? 'आज पानी देना चाहिए?' : 'Should I irrigate today?';
          if (this.transcriptText) this.transcriptText.textContent = `"${sampleQuery}"`;
          this.processQuery(sampleQuery);
        }
      }, 2000);
    }
  }

  stopListening() {
    this.isListening = false;
    this.updateListeningUI(false);
    if (this.recognition) {
      try {
        this.recognition.stop();
      } catch (e) {}
    }
  }

  updateListeningUI(listening) {
    if (this.micToggle) {
      if (listening) {
        this.micToggle.classList.add('listening');
      } else {
        this.micToggle.classList.remove('listening');
      }
    }
    if (this.statusText) {
      this.statusText.textContent = listening 
        ? (getLanguage() === 'hi' ? 'सुन रहा हूँ... बोलिए' : 'Listening... Speak now')
        : (getLanguage() === 'hi' ? 'उत्तर तैयार है' : 'Response Ready');
    }
  }

  resetResponse() {
    this.responseBox?.classList.add('hidden');
    if (this.transcriptText) {
      this.transcriptText.textContent = getLanguage() === 'hi' 
        ? '"आज पानी देना चाहिए?" या "खेत में क्या समस्या है?"' 
        : '"Should I irrigate today?" or "Check crop health"';
    }
  }

  processQuery(query) {
    const q = query.toLowerCase();
    const lang = getLanguage();
    let reply = '';
    let actions = [];

    // Water / Irrigation Query
    if (q.includes('पानी') || q.includes('water') || q.includes('irrigate') || q.includes('सिंचाई')) {
      reply = lang === 'hi' 
        ? 'आज पानी रोक दो। कल 78% बारिश का चांस है। मिट्टी में अभी 68% नमी है।'
        : 'Don\'t irrigate today. 78% rain is expected tomorrow. Soil moisture is currently 68%.';
      actions.push({
        label: lang === 'hi' ? 'मौसम देखें' : 'View Weather',
        handler: () => { this.hide(); window.RK_Router?.navigate('farm'); }
      });
    }
    // Crop / Stress / Disease Query
    else if (q.includes('रोग') || q.includes('फसल') || q.includes('disease') || q.includes('crop') || q.includes('खेत 2') || q.includes('field 2')) {
      reply = lang === 'hi'
        ? '🔴 खेत 2 (टमाटर) में अर्ली ब्लाइट का तनाव दिखा है। रोगग्रस्त पत्तियां हटाएं और मैंकोज़ेब 75 WP का छिड़काव करें।'
        : '🔴 Unusual crop stress (Early Blight) detected in Field 2 (Tomato). Remove affected leaves and apply Mancozeb.';
      actions.push({
        label: lang === 'hi' ? 'रोग जांचें' : 'Inspect Crop',
        handler: () => { this.hide(); window.RK_Router?.navigate('crop'); }
      });
    }
    // Mandi / Market / Sell Query
    else if (q.includes('मंडी') || q.includes('भाव') || q.includes('price') || q.includes('sell') || q.includes('बेच')) {
      reply = lang === 'hi'
        ? 'मंडी B (कन्नौज) में धान का सबसे अच्छा भाव ₹2,520/क्विंटल मिल रहा है। आपके पास लगभग 800 किग्रा उपलब्ध है।'
        : 'Mandi B (Kannauj) has the best price for your rice at ₹2,520/quintal. You have ~800 kg ready.';
      actions.push({
        label: lang === 'hi' ? 'बिक्री विकल्प' : 'Selling Options',
        handler: () => { this.hide(); window.RK_Router?.navigate('market'); }
      });
    }
    // Default contextual answer
    else {
      reply = lang === 'hi'
        ? 'रामू आपके साथ है। आज का मुख्य काम: खेत 2 की पत्तियों की जांच करें और बारिश से पहले सिंचाई न करें।'
        : 'Ramu is here. Today\'s priority: Check Field 2 for leaf stress and hold irrigation before rain.';
    }

    this.showResponse(reply, actions);
    this.speak(reply);
  }

  showResponse(replyText, actions = []) {
    this.stopListening();
    if (this.responseBox) this.responseBox.classList.remove('hidden');
    if (this.responseText) this.responseText.textContent = replyText;

    if (this.responseActions) {
      this.responseActions.innerHTML = '';
      actions.forEach(action => {
        const btn = document.createElement('button');
        btn.className = 'btn-action-primary';
        btn.style.fontSize = '0.75rem';
        btn.style.padding = '6px 14px';
        btn.textContent = action.label;
        btn.onclick = action.handler;
        this.responseActions.appendChild(btn);
      });
    }
  }

  speak(text) {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    const isHindi = getLanguage() === 'hi';
    const lang = isHindi ? 'hi-IN' : 'en-IN';
    utterance.lang = lang;
    utterance.rate = 0.92;
    utterance.pitch = 0.8; // deep male pitch

    // Known male voice names across platforms
    const MALE_NAMES = [
      'hemant', 'ravi', 'purus', 'madhur', 'kumar',   // Hindi male
      'microsoft hemant', 'google हिन्दी',              // Windows/Chrome Hindi
      'male', 'david', 'mark', 'james', 'rishi',       // English male
      'microsoft david', 'microsoft mark', 'microsoft rishi'
    ];

    // Known female voice names to EXCLUDE
    const FEMALE_NAMES = [
      'kalpana', 'swara', 'heera', 'lekha', 'priya',   // Hindi female
      'female', 'woman', 'zira', 'hazel', 'susan',     // English female
      'microsoft zira', 'microsoft hazel'
    ];

    const isMaleVoice = (name) => {
      const n = name.toLowerCase();
      return MALE_NAMES.some(m => n.includes(m));
    };

    const isFemaleVoice = (name) => {
      const n = name.toLowerCase();
      return FEMALE_NAMES.some(f => n.includes(f));
    };

    const matchesLang = (v) => {
      const vLang = v.lang.toLowerCase();
      // Match hi, hi-IN, hi_IN for Hindi; en, en-IN, en_IN, en-US etc for English
      return vLang.startsWith(isHindi ? 'hi' : 'en');
    };

    const pickMaleVoice = () => {
      const voices = window.speechSynthesis.getVoices();
      // Log voices for debugging (check browser console)
      console.log('🎙️ Ramu Kaka — Available voices:', voices.map(v => `${v.name} [${v.lang}]`));

      // 1. Exact male voice in target language
      const exactMale = voices.find(v => matchesLang(v) && isMaleVoice(v.name));

      // 2. Any non-female voice in target language
      const nonFemale = voices.find(v => matchesLang(v) && !isFemaleVoice(v.name));

      // 3. Any voice in target language
      const anyLang = voices.find(v => matchesLang(v));

      // 4. Last resort — any male voice in any language
      const anyMale = voices.find(v => isMaleVoice(v.name));

      const chosen = exactMale || nonFemale || anyLang || anyMale || null;
      if (chosen) {
        utterance.voice = chosen;
        console.log('🎙️ Ramu Kaka — Using voice:', chosen.name, `[${chosen.lang}]`);
      }
      window.speechSynthesis.speak(utterance);
    };

    // Voices may load asynchronously
    const voices = window.speechSynthesis.getVoices();
    if (voices.length) {
      pickMaleVoice();
    } else {
      window.speechSynthesis.onvoiceschanged = () => pickMaleVoice();
    }
  }
}

export const voiceOverlay = new VoiceOverlayController();
