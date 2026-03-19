/* =========================================================
   WHITE BANGER - HOMEPAGE JAVASCRIPT
========================================================= */

document.addEventListener('DOMContentLoaded', function () {

  /* ---- INTRO ANIMATION HANDLING (once per day) ---- */
  const intro = document.getElementById('wb-intro');
  if (intro) {
    const today = new Date().toDateString();
    const lastShown = localStorage.getItem('wbIntroLastShown');

    if (lastShown === today) {
      // Already shown today — remove immediately without animation
      intro.remove();
    } else {
      // First visit today — play the animation
      localStorage.setItem('wbIntroLastShown', today);
      document.body.style.overflow = 'hidden';

      // Remove intro completely after animation ends
      setTimeout(() => {
        document.body.style.overflow = '';
        intro.remove();
      }, 5500);
    }
  }

  /* ---- STICKY HEADER SHADOW ---- */
  const header = document.getElementById('wb-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
      header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.14)';
    } else {
      header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.08)';
    }
  });

  /* ---- MOBILE HAMBURGER ---- */
  const hamburger = document.getElementById('wb-hamburger');
  const nav = document.getElementById('wb-nav');
  hamburger.addEventListener('click', () => {
    nav.classList.toggle('wb-nav-open');
    const spans = hamburger.querySelectorAll('span');
    if (nav.classList.contains('wb-nav-open')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    }
  });

  /* Close nav on link click */
  nav.querySelectorAll('.wb-nav-link').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('wb-nav-open');
    });
  });

  /* ---- COURSE CARD ANIMATION ON SCROLL ---- */
  const cards = document.querySelectorAll('.wb-course-card, .wb-testimonial-card, .wb-why-card');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, idx) => {
      if (entry.isIntersecting) {
        entry.target.style.transitionDelay = `${idx * 0.06}s`;
        entry.target.classList.add('wb-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(24px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(card);
  });

  /* ---- PARTNER LOGOS INFINITE SCROLL EFFECT ---- */
  // Subtle pulse on placement logos
  const placeLogs = document.querySelectorAll('.wb-place-logo');
  placeLogs.forEach((logo, i) => {
    logo.style.animationDelay = `${i * 0.1}s`;
  });

  /* ---- HERO CAROUSEL ---- */
  const heroSlides = document.querySelectorAll('.wb-hero-slide');
  if (heroSlides.length > 0) {
    let currentSlide = 0;
    setInterval(() => {
      heroSlides[currentSlide].classList.remove('active');
      currentSlide = (currentSlide + 1) % heroSlides.length;
      heroSlides[currentSlide].classList.add('active');
    }, 5000);
  }

  /* ---- HERO BUTTON RIPPLE ---- */
  const heroBtn = document.querySelector('.wb-btn-hero');
  if (heroBtn) {
    heroBtn.addEventListener('click', function (e) {
      const ripple = document.createElement('span');
      ripple.style.cssText = `
        position: absolute; border-radius: 50%;
        background: rgba(26,86,219,0.25);
        width: 0; height: 0;
        left: ${e.offsetX}px; top: ${e.offsetY}px;
        transform: translate(-50%, -50%);
        animation: ripple-anim 0.6s ease-out forwards;
      `;
      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 700);
    });
  }

  /* ---- CSS for visible cards after intersection ---- */
  const style = document.createElement('style');
  style.textContent = `
    .wb-visible { opacity: 1 !important; transform: translateY(0) !important; }
    @keyframes ripple-anim {
      to { width: 300px; height: 300px; opacity: 0; }
    }
    .wb-place-logo:hover { animation: pulse-logo 0.4s ease; }
    @keyframes pulse-logo {
      0% { transform: scale(1); }
      50% { transform: scale(1.05); }
      100% { transform: scale(1); }
    }
  `;
  document.head.appendChild(style);

  /* ---- COURSE ACCORDION ---- */
  const accordions = document.querySelectorAll('.wb-acc-header');
  accordions.forEach(acc => {
    acc.addEventListener('click', function () {
      // Toggle rotation
      const arrow = this.querySelector('.wb-acc-arrow');
      if (arrow.style.transform === 'rotate(180deg)') {
        arrow.style.transform = 'rotate(0deg)';
      } else {
        arrow.style.transform = 'rotate(180deg)';
      }
    });
  });

  /* ---- INQUIRY MODAL ---- */
  const inquiryBtn = document.getElementById('wbFabInquiry');
  const inquiryModal = document.getElementById('wbInquiryModal');
  const modalClose = document.getElementById('wbModalClose');

  if (inquiryBtn && inquiryModal && modalClose) {
    inquiryBtn.addEventListener('click', () => {
      inquiryModal.classList.add('active');
    });

    modalClose.addEventListener('click', () => {
      inquiryModal.classList.remove('active');
    });

    window.addEventListener('click', (e) => {
      if (e.target === inquiryModal) {
        inquiryModal.classList.remove('active');
      }
    });

    const form = document.getElementById('wbInquiryForm');
    if (form) {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Find which tab is active
        const activeTabEl = form.querySelector('.wb-form-tab.active');
        const enquiryType = activeTabEl ? activeTabEl.textContent.trim() : 'Self';

        // Collect inputs
        const inputs = form.querySelectorAll('input');
        const staffId = inputs[0].value.trim();
        const name = inputs[1].value.trim();
        const phone = inputs[2].value.trim();
        const email = inputs[3].value.trim();
        const address = inputs[4].value.trim();

        // Collect select
        const select = form.querySelector('select');
        const course = select.options[select.selectedIndex].text;

        const data = {
          enquiryType,
          staffId,
          name,
          phone,
          email,
          address,
          course,
          timestamp: new Date().toLocaleString()
        };

        // 1. Safe Database Integration
        // Since this is a static site without a backend, a Webhook/API is used to securely store this in a database (like Google Sheets via Apps Script, Firebase, or SheetDB).
        try {
          // Placeholder: Replace with your actual Webhook/API URL
          const DB_URL = "https://sheetdb.io/api/v1/3n0ib1sym2eqp";

          if (DB_URL !== "https://sheetdb.io/api/v1/3n0ib1sym2eqp") {
            await fetch(DB_URL, {
              method: "POST",
              mode: "no-cors",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(data)
            });
            console.log("Data saved to Database");
          } else {
            console.log("Database URL not set. Data ready to save:", data);
          }
        } catch (err) {
          console.error("Database submission failed", err);
        }

        // 2. WhatsApp Message Redirect
        let whatsappMsg = `*New White Banger Enquiry*\n\n`;
        whatsappMsg += `*Submission Type:* ${enquiryType}\n`;
        if (enquiryType === 'By Staff' && staffId) {
          whatsappMsg += `*Staff ID:* ${staffId}\n`;
        }
        whatsappMsg += `*Name:* ${name}\n`;
        whatsappMsg += `*Phone:* ${phone}\n`;
        whatsappMsg += `*Email:* ${email}\n`;
        whatsappMsg += `*Address:* ${address}\n`;
        whatsappMsg += `*Course:* ${course}\n`;

        const whatsappNumber = '919728320132';
        const waUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMsg)}`;

        // Open WhatsApp in new tab so user can send the pre-filled message
        window.open(waUrl, '_blank');

        alert('Thank you for your inquiry! Redirecting to WhatsApp...');
        inquiryModal.classList.remove('active');
        form.reset();
      });
    }
  }

  /* ---- FAB POPUPS ---- */
  const fabWa = document.getElementById('wbFabWhatsappBtn');
  const popupWa = document.getElementById('wbPopupWhatsapp');
  const closeWa = document.getElementById('wbCloseWhatsapp');

  const fabCall = document.getElementById('wbFabCallBtn');
  const popupCall = document.getElementById('wbPopupCall');
  const closeCall = document.getElementById('wbCloseCall');

  function closeAllPopups() {
    if (popupWa) popupWa.classList.remove('active');
    if (popupCall) popupCall.classList.remove('active');
  }

  if (fabWa && popupWa) {
    fabWa.addEventListener('click', (e) => {
      e.stopPropagation();
      const isActive = popupWa.classList.contains('active');
      closeAllPopups();
      if (!isActive) popupWa.classList.add('active');
    });
  }
  if (closeWa) {
    closeWa.addEventListener('click', () => {
      popupWa.classList.remove('active');
    });
  }

  if (fabCall && popupCall) {
    fabCall.addEventListener('click', (e) => {
      e.stopPropagation();
      const isActive = popupCall.classList.contains('active');
      closeAllPopups();
      if (!isActive) popupCall.classList.add('active');
    });
  }
  if (closeCall) {
    closeCall.addEventListener('click', () => {
      popupCall.classList.remove('active');
    });
  }

  // Close popups when clicking outside
  document.addEventListener('click', (e) => {
    if (popupWa && popupWa.classList.contains('active') && !popupWa.contains(e.target)) {
      popupWa.classList.remove('active');
    }
    if (popupCall && popupCall.classList.contains('active') && !popupCall.contains(e.target)) {
      popupCall.classList.remove('active');
    }
  });

  /* ---- ENQUIRY FORM TABS ---- */
  const formTabs = document.querySelectorAll('.wb-form-tab');
  formTabs.forEach(tab => {
    tab.addEventListener('click', function () {
      const tabsContainer = this.parentElement;
      const form = this.closest('form');
      const staffField = form.querySelector('.wb-staff-field');

      tabsContainer.querySelectorAll('.wb-form-tab').forEach(t => t.classList.remove('active'));
      this.classList.add('active');

      if (this.textContent.trim() === 'By Staff') {
        if (staffField) staffField.style.display = 'block';
      } else {
        if (staffField) staffField.style.display = 'none';
      }
    });
  });

  /* ---- MULTILINGUAL TRANSLATION SYSTEM ---- */
  
  // Function to switch language (Globally accessible)
  window.switchLang = function(lang) {
    if (typeof wbTranslations === 'undefined' || !wbTranslations[lang]) {
      console.warn("Translation not found for:", lang);
      return;
    }

    // Save preference
    localStorage.setItem('wbLang', lang);

    // Update all translatable elements
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (wbTranslations[lang][key] !== undefined) {
        el.innerHTML = wbTranslations[lang][key];
      }
    });

    // Update active button state in the header
    document.querySelectorAll('.wb-lang-btn').forEach(btn => {
      // Check if the button's onclick contains the current lang
      const isMatch = btn.getAttribute('onclick').includes(`'${lang}'`);
      btn.classList.toggle('wb-active', isMatch);
    });

    // Set lang attribute on html element for CSS/SEO
    document.documentElement.lang = lang;
  };

  // Load saved language preference on page init
  const savedLang = localStorage.getItem('wbLang') || 'en';
  if (typeof wbTranslations !== 'undefined') {
    window.switchLang(savedLang);
  }

  const isCoursePage = window.location.pathname.endsWith('course.html') || window.location.pathname.endsWith('ai-automation.html') || window.location.pathname.endsWith('banking-finance.html') || window.location.pathname.endsWith('cloud-management.html') || window.location.pathname.endsWith('software-development.html') || window.location.pathname.endsWith('ui-ux.html') || window.location.pathname.endsWith('graphic-design.html') || window.location.pathname.endsWith('web-development.html');
  if (isCoursePage) {
    const urlParams = new URLSearchParams(window.location.search);
    let courseId = urlParams.get('id');

    // Default for dedicated pages
    if (!courseId) {
      if (window.location.pathname.endsWith('ai-automation.html')) courseId = 'ai-automation';
      if (window.location.pathname.endsWith('banking-finance.html')) courseId = 'banking-finance';
      if (window.location.pathname.endsWith('cloud-management.html')) courseId = 'cloud-management';
      if (window.location.pathname.endsWith('software-development.html')) courseId = 'software-dev';
      if (window.location.pathname.endsWith('ui-ux.html')) courseId = 'ui-ux';
      if (window.location.pathname.endsWith('graphic-design.html')) courseId = 'graphic-design';
      if (window.location.pathname.endsWith('web-development.html')) courseId = 'web-development';
    }

    if (courseId && typeof courseDatabase !== 'undefined' && courseDatabase[courseId]) {
      const data = courseDatabase[courseId];

      // Hero Elements
      document.getElementById('cd-breadcrumb').innerHTML = data.breadcrumbs.map(b => `<span>${b}</span>`).join('<span class="wb-tm-sep">/</span>');
      document.getElementById('cd-title').textContent = data.title;
      document.title = data.title + " - White Banger";
      document.getElementById('cd-author').textContent = data.author;
      document.getElementById('cd-rating').textContent = data.rating;
      document.getElementById('cd-students').textContent = data.students;
      document.getElementById('cd-duration').textContent = data.duration;
      document.getElementById('cd-level').textContent = data.level;
      document.getElementById('cd-daily').textContent = data.dailyCommitment;
      
      const imgEl = document.getElementById('cd-image');
      if (imgEl) imgEl.src = data.image;

      // Benefits List
      const benefitIcons = ['💻', '🏅', '📜'];
      const benefitsHtml = data.benefits.map((b, i) => `
        <div class="wb-eb-item">
          <span class="wb-eb-icon">${benefitIcons[i] || '✔'}</span>
          <span>${b}</span>
        </div>
      `).join('');
      document.getElementById('cd-benefits').innerHTML = benefitsHtml;

      // Learnings Grid
      const learningsHtml = data.learnings.map(l => `
        <div class="wb-learn-item">
          <span class="wb-checkmark">✔</span>
          <p>${l}</p>
        </div>
      `).join('');
      document.getElementById('cd-learnings').innerHTML = learningsHtml;

      // About Text
      document.getElementById('cd-about').textContent = data.about;

      // Eligibility
      const eligHtml = data.eligibility.map(e => `
        <div class="wb-doc-item">
          <span class="wb-doc-icon">✔</span>
          <span>${e}</span>
        </div>
      `).join('');
      document.getElementById('cd-eligibility').innerHTML = eligHtml;

      // Includes
      const incHtml = data.includes.map(i => `
        <div class="wb-doc-item">
          <span class="wb-doc-icon">✔</span>
          <span>${i}</span>
        </div>
      `).join('');
      document.getElementById('cd-includes').innerHTML = incHtml;

      // Tags
      const tagsHtml = data.tags.map(t => `<span class="wb-tag">${t}</span>`).join('');
      document.getElementById('cd-tags').innerHTML = tagsHtml;

      // Curriculum Accordion
      const currContainer = document.getElementById('cd-curriculum');
      const currHtml = data.curriculum.map((mod, index) => {
        const lessonsHtml = mod.lessons.map(ls => `<div style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; display: flex; align-items: center; gap: 10px; font-size: 14px; color: #475569;"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> ${ls}</div>`).join('');
        return `
          <div class="wb-acc-item">
            <div class="wb-acc-header" style="cursor: pointer;">
              <span>Module ${index + 1}: ${mod.module}</span>
              <span class="wb-acc-arrow">▼</span>
            </div>
            <div class="wb-cd-accordion-body" style="max-height: 0; overflow: hidden; transition: max-height 0.3s ease-out; background: #fff;">
              <div style="padding: 16px 24px;">${lessonsHtml}</div>
            </div>
          </div>
        `;
      }).join('');
      currContainer.innerHTML = currHtml;

      // Accordion Event Listeners
      const accHeaders = currContainer.querySelectorAll('.wb-acc-header');
      accHeaders.forEach(header => {
        header.addEventListener('click', function() {
          const body = this.nextElementSibling;
          const icon = this.querySelector('.wb-acc-arrow');
          
          if (body.style.maxHeight) {
            body.style.maxHeight = null;
            icon.textContent = '▼';
            icon.style.transform = 'rotate(0deg)';
          } else {
            // Close all others
            accHeaders.forEach(h => {
              h.nextElementSibling.style.maxHeight = null;
              const hIcon = h.querySelector('.wb-acc-arrow');
              hIcon.textContent = '▼';
              hIcon.style.transform = 'rotate(0deg)';
            });
            body.style.maxHeight = body.scrollHeight + "px";
            icon.textContent = '▲';
          }
        });
      });
      // Open first accordion by default
      if (accHeaders.length > 0) {
        accHeaders[0].click();
      }

    } else {
      document.getElementById('cd-title').textContent = "Course Not Found";
      // Hidden on invalid course
      document.querySelector('.wb-cd-content-section').style.display = 'none'; 
    }
  }

});
