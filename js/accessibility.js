// Accessibility Enhancements

export const Accessibility = {
  // Keyboard navigation
  initKeyboardNav() {
    // ESC key to close modals/dropdowns
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        // Close modals
        document.querySelectorAll('.wb-modal.active, .erp-modal-overlay.open').forEach(modal => {
          modal.classList.remove('active', 'open');
          document.body.style.overflow = '';
        });

        // Close dropdowns
        document.querySelectorAll('.wb-dropdown-menu').forEach(dropdown => {
          dropdown.style.opacity = '0';
          dropdown.style.visibility = 'hidden';
        });

        // Close FAB popups
        document.querySelectorAll('.wb-fab-popup.active').forEach(popup => {
          popup.classList.remove('active');
        });
      }
    });

    // Tab trap in modals
    document.querySelectorAll('.wb-modal, .erp-modal-overlay').forEach(modal => {
      modal.addEventListener('keydown', (e) => {
        if (e.key === 'Tab' && modal.classList.contains('active') || modal.classList.contains('open')) {
          const focusableElements = modal.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );

          const firstElement = focusableElements[0];
          const lastElement = focusableElements[focusableElements.length - 1];

          if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      });
    });
  },

  // Focus management
  trapFocus(element) {
    const focusableElements = element.querySelectorAll(
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
    );

    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    element.addEventListener('keydown', function(e) {
      const isTabPressed = e.key === 'Tab';

      if (!isTabPressed) return;

      if (e.shiftKey) {
        if (document.activeElement === firstFocusable) {
          lastFocusable.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastFocusable) {
          firstFocusable.focus();
          e.preventDefault();
        }
      }
    });

    firstFocusable?.focus();
  },

  // ARIA live regions for dynamic content
  announceToScreenReader(message, priority = 'polite') {
    const liveRegion = document.getElementById('aria-live-region') || this.createLiveRegion();
    liveRegion.setAttribute('aria-live', priority);
    liveRegion.textContent = message;

    setTimeout(() => {
      liveRegion.textContent = '';
    }, 1000);
  },

  createLiveRegion() {
    const region = document.createElement('div');
    region.id = 'aria-live-region';
    region.className = 'sr-only';
    region.setAttribute('aria-live', 'polite');
    region.setAttribute('aria-atomic', 'true');
    document.body.appendChild(region);
    return region;
  },

  // Skip to main content link
  addSkipLink() {
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.className = 'skip-link';
    skipLink.textContent = 'Skip to main content';
    skipLink.style.cssText = `
      position: absolute;
      top: -40px;
      left: 0;
      background: var(--color-primary);
      color: white;
      padding: 8px;
      text-decoration: none;
      z-index: 100;
    `;

    skipLink.addEventListener('focus', () => {
      skipLink.style.top = '0';
    });

    skipLink.addEventListener('blur', () => {
      skipLink.style.top = '-40px';
    });

    document.body.insertBefore(skipLink, document.body.firstChild);
  },

  // Enhance form accessibility
  enhanceFormAccessibility() {
    // Add required indicators
    document.querySelectorAll('input[required], select[required], textarea[required]').forEach(field => {
      const label = field.labels?.[0];
      if (label && !label.querySelector('.required-indicator')) {
        const indicator = document.createElement('span');
        indicator.className = 'required-indicator';
        indicator.setAttribute('aria-label', 'required');
        indicator.textContent = '*';
        indicator.style.color = 'var(--color-danger)';
        label.appendChild(indicator);
      }
    });

    // Add error announcements
    document.querySelectorAll('form').forEach(form => {
      form.addEventListener('submit', (e) => {
        const invalidFields = form.querySelectorAll(':invalid');

        if (invalidFields.length > 0) {
          this.announceToScreenReader(
            `Form has ${invalidFields.length} error${invalidFields.length > 1 ? 's' : ''}. Please correct and try again.`,
            'assertive'
          );
        }
      });
    });
  },

  // Color contrast checker (development only)
  checkContrast() {
    if (window.location.hostname !== 'localhost') return;

    console.log('🎨 Checking color contrast...');

    const getContrast = (color1, color2) => {
      const rgb1 = this.getRGB(color1);
      const rgb2 = this.getRGB(color2);

      const l1 = this.getLuminance(rgb1);
      const l2 = this.getLuminance(rgb2);

      const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
      return ratio.toFixed(2);
    };

    document.querySelectorAll('*').forEach(el => {
      const color = window.getComputedStyle(el).color;
      const bgColor = window.getComputedStyle(el).backgroundColor;

      if (color && bgColor && bgColor !== 'rgba(0, 0, 0, 0)') {
        const contrast = getContrast(color, bgColor);

        if (contrast < 4.5) {
          console.warn('Low contrast:', el, `Ratio: ${contrast}:1`);
        }
      }
    });
  },

  getRGB(color) {
    const match = color.match(/\d+/g);
    return match ? match.map(Number) : [0, 0, 0];
  },

  getLuminance([r, g, b]) {
    const [rs, gs, bs] = [r, g, b].map(c => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  },

  // Initialize all accessibility features
  init() {
    this.initKeyboardNav();
    this.addSkipLink();
    this.enhanceFormAccessibility();
    this.createLiveRegion();

    // Development only
    if (window.location.hostname === 'localhost') {
      window.a11y = this;
      console.log('♿ Accessibility tools loaded. Use window.a11y to access utilities.');
    }
  }
};

// Auto-initialize
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => Accessibility.init());
} else {
  Accessibility.init();
}
