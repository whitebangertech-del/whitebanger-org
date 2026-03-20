/**
 * AI Website Assistant - Smart Guide System
 * Author: White Banger Tech
 * Version: 1.0.0
 *
 * A production-ready AI assistant that guides users through websites
 * with voice narration, auto-scrolling, and interactive controls.
 */

class AIWebsiteAssistant {
  constructor(config = {}) {
    this.config = {
      language: config.language || 'hi',
      autoStart: config.autoStart !== false,
      startDelay: config.startDelay || 2000,
      sectionDelay: config.sectionDelay || 4000,
      voice: config.voice || 'female',
      sections: config.sections || this.autoDetectSections(),
      translations: config.translations || this.getDefaultTranslations(),
      analytics: config.analytics !== false,
      ...config
    };

    this.state = {
      isPlaying: false,
      isPaused: false,
      currentSectionIndex: -1,
      tourCompleted: false,
      hasSeenTour: this.checkIfSeenTour()
    };

    this.elements = {};
    this.utterance = null;

    this.init();
  }

  init() {
    if (!this.state.hasSeenTour && this.config.autoStart) {
      setTimeout(() => this.showIntroPopup(), this.config.startDelay);
    }

    this.createUI();
    this.setupEventListeners();
    this.preloadVoices();
  }

  checkIfSeenTour() {
    try {
      return localStorage.getItem('ai_assistant_tour_seen') === 'true';
    } catch (e) {
      return false;
    }
  }

  markTourAsSeen() {
    try {
      localStorage.setItem('ai_assistant_tour_seen', 'true');
      localStorage.setItem('ai_assistant_last_visit', new Date().toISOString());
    } catch (e) {
      console.warn('Could not save tour status');
    }
  }

  autoDetectSections() {
    const sections = [];

    // Common section selectors
    const commonSelectors = [
      { name: 'hero', selector: 'header, .hero, #hero, .header-section' },
      { name: 'about', selector: '#about, .about, .about-section, section[id*="about"]' },
      { name: 'services', selector: '#services, .services, .features, #features, section[id*="service"]' },
      { name: 'courses', selector: '#courses, .courses, .course-section' },
      { name: 'pricing', selector: '#pricing, .pricing, .plans' },
      { name: 'testimonials', selector: '#testimonials, .testimonials, .reviews' },
      { name: 'contact', selector: '#contact, .contact, .contact-section' }
    ];

    commonSelectors.forEach(({ name, selector }) => {
      const element = document.querySelector(selector);
      if (element) {
        sections.push({
          name: name,
          selector: selector,
          element: element
        });
      }
    });

    return sections;
  }

  getDefaultTranslations() {
    return {
      hi: {
        introMessage: "नमस्ते! मैं आपको इस वेबसाइट का पूरा टूर दे सकता हूं। क्या आप शुरू करना चाहेंगे?",
        startTour: "टूर शुरू करें",
        skip: "छोड़ें",
        pause: "रोकें",
        resume: "जारी रखें",
        skipSection: "अगला सेक्शन",
        close: "बंद करें",
        tourComplete: "टूर पूरा हो गया! क्या आपको कोई सवाल है?",
        hero: "यह हमारी वेबसाइट का मुख्य पेज है। यहाँ आपको मुख्य जानकारी मिलेगी।",
        about: "यह हमारे बारे में सेक्शन है। यहाँ हमारी कंपनी की जानकारी दी गई है।",
        services: "यहाँ हमारी सेवाओं की जानकारी है। हम विभिन्न प्रकार की सेवाएं प्रदान करते हैं।",
        courses: "यह हमारे कोर्स सेक्शन है। यहाँ आप सभी उपलब्ध कोर्स देख सकते हैं।",
        pricing: "यह हमारी प्राइसिंग और प्लान्स का सेक्शन है।",
        testimonials: "यहाँ हमारे खुश ग्राहकों की समीक्षाएं हैं।",
        contact: "यह संपर्क सेक्शन है। यहाँ से आप हमसे जुड़ सकते हैं।"
      },
      en: {
        introMessage: "Hello! I can give you a complete tour of this website. Would you like to start?",
        startTour: "Start Tour",
        skip: "Skip",
        pause: "Pause",
        resume: "Resume",
        skipSection: "Next Section",
        close: "Close",
        tourComplete: "Tour completed! Do you have any questions?",
        hero: "This is the main page of our website. Here you'll find key information.",
        about: "This is the about us section. Here's information about our company.",
        services: "Here's information about our services. We provide various types of services.",
        courses: "This is our courses section. Here you can see all available courses.",
        pricing: "This is our pricing and plans section.",
        testimonials: "Here are reviews from our happy customers.",
        contact: "This is the contact section. You can connect with us from here."
      }
    };
  }

  createUI() {
    // Create container
    const container = document.createElement('div');
    container.id = 'ai-assistant-container';
    container.innerHTML = `
      <!-- Intro Popup -->
      <div id="ai-intro-popup" class="ai-popup" style="display: none;">
        <div class="ai-popup-content">
          <div class="ai-avatar">
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="45" fill="#4F46E5"/>
              <circle cx="35" cy="40" r="5" fill="white"/>
              <circle cx="65" cy="40" r="5" fill="white"/>
              <path d="M 30 60 Q 50 75 70 60" stroke="white" stroke-width="3" fill="none"/>
            </svg>
          </div>
          <p class="ai-intro-message"></p>
          <div class="ai-intro-buttons">
            <button id="ai-start-tour" class="ai-btn ai-btn-primary"></button>
            <button id="ai-skip-tour" class="ai-btn ai-btn-secondary"></button>
          </div>
        </div>
      </div>

      <!-- Chat Bubble -->
      <div id="ai-chat-bubble" class="ai-chat-bubble" style="display: none;">
        <div class="ai-bubble-avatar">
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="45" fill="#4F46E5"/>
            <circle cx="35" cy="40" r="5" fill="white"/>
            <circle cx="65" cy="40" r="5" fill="white"/>
            <path d="M 30 60 Q 50 75 70 60" stroke="white" stroke-width="3" fill="none"/>
          </svg>
          <div class="ai-pulse"></div>
        </div>
      </div>

      <!-- Main Chat Interface -->
      <div id="ai-chat-interface" class="ai-chat-interface" style="display: none;">
        <div class="ai-chat-header">
          <div class="ai-header-left">
            <div class="ai-header-avatar">
              <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="45" fill="#4F46E5"/>
                <circle cx="35" cy="40" r="5" fill="white"/>
                <circle cx="65" cy="40" r="5" fill="white"/>
                <path d="M 30 60 Q 50 75 70 60" stroke="white" stroke-width="3" fill="none"/>
              </svg>
            </div>
            <div class="ai-header-info">
              <h3>वेबसाइट गाइड</h3>
              <span class="ai-status">ऑनलाइन</span>
            </div>
          </div>
          <div class="ai-header-actions">
            <button id="ai-minimize" class="ai-icon-btn" title="Minimize">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </button>
            <button id="ai-close" class="ai-icon-btn" title="Close">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>

        <div class="ai-chat-messages" id="ai-chat-messages">
          <!-- Messages will be added here -->
        </div>

        <div class="ai-chat-controls">
          <button id="ai-pause-btn" class="ai-control-btn" style="display: none;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="4" width="4" height="16"></rect>
              <rect x="14" y="4" width="4" height="16"></rect>
            </svg>
            <span></span>
          </button>
          <button id="ai-resume-btn" class="ai-control-btn" style="display: none;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
            <span></span>
          </button>
          <button id="ai-skip-btn" class="ai-control-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polygon points="5 4 15 12 5 20 5 4"></polygon>
              <line x1="19" y1="5" x2="19" y2="19"></line>
            </svg>
            <span></span>
          </button>
        </div>

        <div class="ai-chat-input">
          <input type="text" id="ai-user-input" placeholder="मुझसे कुछ पूछें...">
          <button id="ai-send-btn" class="ai-send-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </div>

        <div class="ai-section-indicator" id="ai-section-indicator" style="display: none;">
          <div class="ai-indicator-content">
            <span class="ai-indicator-text"></span>
            <div class="ai-indicator-progress">
              <div class="ai-progress-bar"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Section Highlight Overlay -->
      <div id="ai-section-highlight" class="ai-section-highlight" style="display: none;"></div>
    `;

    document.body.appendChild(container);
    this.cacheElements();
    this.updateLanguage();
  }

  cacheElements() {
    this.elements = {
      introPopup: document.getElementById('ai-intro-popup'),
      chatBubble: document.getElementById('ai-chat-bubble'),
      chatInterface: document.getElementById('ai-chat-interface'),
      chatMessages: document.getElementById('ai-chat-messages'),
      sectionHighlight: document.getElementById('ai-section-highlight'),
      sectionIndicator: document.getElementById('ai-section-indicator'),
      startTourBtn: document.getElementById('ai-start-tour'),
      skipTourBtn: document.getElementById('ai-skip-tour'),
      pauseBtn: document.getElementById('ai-pause-btn'),
      resumeBtn: document.getElementById('ai-resume-btn'),
      skipBtn: document.getElementById('ai-skip-btn'),
      minimizeBtn: document.getElementById('ai-minimize'),
      closeBtn: document.getElementById('ai-close'),
      userInput: document.getElementById('ai-user-input'),
      sendBtn: document.getElementById('ai-send-btn')
    };
  }

  updateLanguage() {
    const t = this.config.translations[this.config.language];

    document.querySelector('.ai-intro-message').textContent = t.introMessage;
    this.elements.startTourBtn.textContent = t.startTour;
    this.elements.skipTourBtn.textContent = t.skip;
    this.elements.pauseBtn.querySelector('span').textContent = t.pause;
    this.elements.resumeBtn.querySelector('span').textContent = t.resume;
    this.elements.skipBtn.querySelector('span').textContent = t.skipSection;
  }

  setupEventListeners() {
    this.elements.startTourBtn.addEventListener('click', () => this.startTour());
    this.elements.skipTourBtn.addEventListener('click', () => this.skipIntro());
    this.elements.chatBubble.addEventListener('click', () => this.openChat());
    this.elements.pauseBtn.addEventListener('click', () => this.pauseTour());
    this.elements.resumeBtn.addEventListener('click', () => this.resumeTour());
    this.elements.skipBtn.addEventListener('click', () => this.skipSection());
    this.elements.minimizeBtn.addEventListener('click', () => this.minimizeChat());
    this.elements.closeBtn.addEventListener('click', () => this.closeChat());
    this.elements.sendBtn.addEventListener('click', () => this.handleUserMessage());
    this.elements.userInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.handleUserMessage();
    });

    // Stop speech when clicking outside
    document.addEventListener('click', (e) => {
      if (this.state.isPlaying && !e.target.closest('#ai-chat-interface')) {
        // Allow clicks but don't stop the tour
      }
    });
  }

  preloadVoices() {
    if ('speechSynthesis' in window) {
      speechSynthesis.getVoices();
      window.speechSynthesis.onvoiceschanged = () => {
        this.voices = speechSynthesis.getVoices();
      };
    }
  }

  showIntroPopup() {
    this.elements.introPopup.style.display = 'flex';
    setTimeout(() => {
      this.elements.introPopup.classList.add('ai-show');
    }, 10);

    this.trackEvent('intro_shown');
  }

  skipIntro() {
    this.elements.introPopup.classList.remove('ai-show');
    setTimeout(() => {
      this.elements.introPopup.style.display = 'none';
    }, 300);

    this.showChatBubble();
    this.markTourAsSeen();
    this.trackEvent('intro_skipped');
  }

  showChatBubble() {
    this.elements.chatBubble.style.display = 'flex';
    setTimeout(() => {
      this.elements.chatBubble.classList.add('ai-show');
    }, 10);
  }

  openChat() {
    this.elements.chatBubble.classList.remove('ai-show');
    setTimeout(() => {
      this.elements.chatBubble.style.display = 'none';
    }, 300);

    this.elements.chatInterface.style.display = 'flex';
    setTimeout(() => {
      this.elements.chatInterface.classList.add('ai-show');
    }, 10);
  }

  minimizeChat() {
    this.elements.chatInterface.classList.remove('ai-show');
    setTimeout(() => {
      this.elements.chatInterface.style.display = 'none';
      this.showChatBubble();
    }, 300);
  }

  closeChat() {
    this.stopSpeech();
    this.state.isPlaying = false;
    this.elements.chatInterface.classList.remove('ai-show');
    setTimeout(() => {
      this.elements.chatInterface.style.display = 'none';
    }, 300);

    this.trackEvent('chat_closed');
  }

  startTour() {
    this.elements.introPopup.classList.remove('ai-show');
    setTimeout(() => {
      this.elements.introPopup.style.display = 'none';
    }, 300);

    this.openChat();
    this.state.isPlaying = true;
    this.state.currentSectionIndex = -1;

    this.elements.pauseBtn.style.display = 'inline-flex';
    this.elements.resumeBtn.style.display = 'none';

    this.addMessage('assistant', this.config.translations[this.config.language].introMessage);

    setTimeout(() => {
      this.nextSection();
    }, 1000);

    this.markTourAsSeen();
    this.trackEvent('tour_started');
  }

  nextSection() {
    if (!this.state.isPlaying || this.state.isPaused) return;

    this.state.currentSectionIndex++;

    if (this.state.currentSectionIndex >= this.config.sections.length) {
      this.completeTour();
      return;
    }

    const section = this.config.sections[this.state.currentSectionIndex];
    this.presentSection(section);
  }

  presentSection(section) {
    const element = section.element || document.querySelector(section.selector);
    if (!element) {
      this.nextSection();
      return;
    }

    // Scroll to section
    this.scrollToElement(element);

    // Highlight section
    this.highlightSection(element);

    // Get explanation
    const explanation = this.generateExplanation(section, element);

    // Show message
    this.addMessage('assistant', explanation);

    // Speak
    this.speak(explanation, () => {
      setTimeout(() => {
        this.nextSection();
      }, this.config.sectionDelay);
    });

    // Show indicator
    this.showSectionIndicator(section.name, this.state.currentSectionIndex + 1, this.config.sections.length);

    this.trackEvent('section_viewed', { section: section.name });
  }

  generateExplanation(section, element) {
    const t = this.config.translations[this.config.language];

    // Check if custom explanation exists
    if (section.explanation) {
      return section.explanation;
    }

    // Use default translation
    if (t[section.name]) {
      return t[section.name];
    }

    // Generate from content
    const heading = element.querySelector('h1, h2, h3, h4');
    const text = element.querySelector('p');

    let explanation = `यह ${section.name} सेक्शन है।`;

    if (heading) {
      explanation += ` ${heading.textContent.trim()}।`;
    }

    if (text && text.textContent.length < 200) {
      explanation += ` ${text.textContent.trim().substring(0, 150)}...`;
    }

    return explanation;
  }

  scrollToElement(element) {
    const rect = element.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const targetY = rect.top + scrollTop - 100;

    window.scrollTo({
      top: targetY,
      behavior: 'smooth'
    });
  }

  highlightSection(element) {
    const rect = element.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

    this.elements.sectionHighlight.style.top = (rect.top + scrollTop) + 'px';
    this.elements.sectionHighlight.style.left = (rect.left + scrollLeft) + 'px';
    this.elements.sectionHighlight.style.width = rect.width + 'px';
    this.elements.sectionHighlight.style.height = rect.height + 'px';
    this.elements.sectionHighlight.style.display = 'block';

    setTimeout(() => {
      this.elements.sectionHighlight.classList.add('ai-active');
    }, 10);

    setTimeout(() => {
      this.elements.sectionHighlight.classList.remove('ai-active');
      setTimeout(() => {
        this.elements.sectionHighlight.style.display = 'none';
      }, 300);
    }, 3000);
  }

  showSectionIndicator(name, current, total) {
    const indicatorText = document.querySelector('.ai-indicator-text');
    const progressBar = document.querySelector('.ai-progress-bar');

    indicatorText.textContent = `${name} (${current}/${total})`;
    progressBar.style.width = ((current / total) * 100) + '%';

    this.elements.sectionIndicator.style.display = 'flex';
  }

  speak(text, onEnd) {
    this.stopSpeech();

    if (!('speechSynthesis' in window)) {
      console.warn('Speech synthesis not supported');
      if (onEnd) onEnd();
      return;
    }

    this.utterance = new SpeechSynthesisUtterance(text);
    this.utterance.lang = this.config.language === 'hi' ? 'hi-IN' : 'en-US';
    this.utterance.rate = 0.9;
    this.utterance.pitch = 1;

    // Try to find appropriate voice
    const voices = speechSynthesis.getVoices();
    const targetLang = this.config.language === 'hi' ? 'hi-IN' : 'en-US';
    const voice = voices.find(v => v.lang === targetLang && v.name.includes(this.config.voice === 'female' ? 'female' : 'male'))
                  || voices.find(v => v.lang === targetLang)
                  || voices[0];

    if (voice) {
      this.utterance.voice = voice;
    }

    this.utterance.onend = () => {
      if (onEnd) onEnd();
    };

    speechSynthesis.speak(this.utterance);
  }

  stopSpeech() {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
    }
  }

  pauseTour() {
    this.state.isPaused = true;
    this.stopSpeech();
    this.elements.pauseBtn.style.display = 'none';
    this.elements.resumeBtn.style.display = 'inline-flex';
    this.trackEvent('tour_paused');
  }

  resumeTour() {
    this.state.isPaused = false;
    this.elements.pauseBtn.style.display = 'inline-flex';
    this.elements.resumeBtn.style.display = 'none';
    this.nextSection();
    this.trackEvent('tour_resumed');
  }

  skipSection() {
    this.stopSpeech();
    this.nextSection();
    this.trackEvent('section_skipped');
  }

  completeTour() {
    this.state.isPlaying = false;
    this.state.tourCompleted = true;
    this.elements.pauseBtn.style.display = 'none';
    this.elements.resumeBtn.style.display = 'none';
    this.elements.sectionIndicator.style.display = 'none';

    const t = this.config.translations[this.config.language];
    this.addMessage('assistant', t.tourComplete);
    this.speak(t.tourComplete);

    this.trackEvent('tour_completed');
  }

  addMessage(type, text) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `ai-message ai-message-${type}`;

    const bubble = document.createElement('div');
    bubble.className = 'ai-message-bubble';
    bubble.textContent = text;

    messageDiv.appendChild(bubble);
    this.elements.chatMessages.appendChild(messageDiv);

    this.elements.chatMessages.scrollTop = this.elements.chatMessages.scrollHeight;
  }

  handleUserMessage() {
    const message = this.elements.userInput.value.trim();
    if (!message) return;

    this.addMessage('user', message);
    this.elements.userInput.value = '';

    this.processUserCommand(message);
    this.trackEvent('user_message', { message });
  }

  processUserCommand(message) {
    const lower = message.toLowerCase();

    // Navigate to section
    const sectionMatch = lower.match(/(go to|explain|show|बताओ|दिखाओ) (.*)/);
    if (sectionMatch) {
      const sectionName = sectionMatch[2];
      const section = this.config.sections.find(s =>
        s.name.toLowerCase().includes(sectionName) ||
        sectionName.includes(s.name.toLowerCase())
      );

      if (section) {
        this.presentSection(section);
        return;
      }
    }

    // Default response
    const responses = [
      "मैं आपकी मदद करने के लिए यहाँ हूँ। आप मुझे किसी भी सेक्शन के बारे में पूछ सकते हैं।",
      "कृपया अधिक स्पष्ट रूप से पूछें। जैसे: 'explain pricing' या 'go to contact'",
      "मुझे समझ नहीं आया। क्या आप फिर से पूछ सकते हैं?"
    ];

    this.addMessage('assistant', responses[Math.floor(Math.random() * responses.length)]);
  }

  trackEvent(eventName, data = {}) {
    if (!this.config.analytics) return;

    try {
      const eventData = {
        event: `ai_assistant_${eventName}`,
        timestamp: new Date().toISOString(),
        language: this.config.language,
        ...data
      };

      console.log('AI Assistant Event:', eventData);

      // Send to analytics if available
      if (window.gtag) {
        window.gtag('event', eventName, eventData);
      }

      // Store in localStorage for later analysis
      const events = JSON.parse(localStorage.getItem('ai_assistant_events') || '[]');
      events.push(eventData);
      localStorage.setItem('ai_assistant_events', JSON.stringify(events.slice(-100)));
    } catch (e) {
      console.warn('Analytics tracking failed', e);
    }
  }

  // Public API
  show() {
    this.showChatBubble();
  }

  hide() {
    this.closeChat();
    this.elements.chatBubble.style.display = 'none';
  }

  setLanguage(lang) {
    this.config.language = lang;
    this.updateLanguage();
  }

  restart() {
    this.stopSpeech();
    this.state.currentSectionIndex = -1;
    this.elements.chatMessages.innerHTML = '';
    this.startTour();
  }
}

// Auto-initialize if data attribute present
if (document.currentScript && document.currentScript.hasAttribute('data-auto-init')) {
  window.addEventListener('DOMContentLoaded', () => {
    window.aiAssistant = new AIWebsiteAssistant();
  });
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = AIWebsiteAssistant;
}

// Make available globally
window.AIWebsiteAssistant = AIWebsiteAssistant;
