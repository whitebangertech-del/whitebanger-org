// Performance Optimization Utilities

export const Performance = {
  // Lazy Load Images
  lazyLoadImages() {
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            const src = img.dataset.src;

            if (src) {
              img.src = src;
              img.removeAttribute('data-src');
              img.classList.add('loaded');
              observer.unobserve(img);
            }
          }
        });
      }, {
        rootMargin: '50px 0px',
        threshold: 0.01
      });

      document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
      });
    } else {
      // Fallback for older browsers
      document.querySelectorAll('img[data-src]').forEach(img => {
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
      });
    }
  },

  // Debounce function for scroll/resize events
  debounce(func, wait = 250) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  // Throttle function for high-frequency events
  throttle(func, limit = 100) {
    let inThrottle;
    return function(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  },

  // Preload critical resources
  preloadResources(resources) {
    resources.forEach(resource => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = resource.type;
      link.href = resource.url;
      if (resource.type === 'font') {
        link.crossOrigin = 'anonymous';
      }
      document.head.appendChild(link);
    });
  },

  // Defer non-critical CSS
  deferCSS(href) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    link.media = 'print';
    link.onload = function() { this.media = 'all'; };
    document.head.appendChild(link);
  },

  // Measure page performance
  measurePerformance() {
    if ('performance' in window && 'getEntriesByType' in performance) {
      const perfData = performance.getEntriesByType('navigation')[0];

      if (perfData) {
        const metrics = {
          dns: perfData.domainLookupEnd - perfData.domainLookupStart,
          tcp: perfData.connectEnd - perfData.connectStart,
          ttfb: perfData.responseStart - perfData.requestStart,
          download: perfData.responseEnd - perfData.responseStart,
          dom: perfData.domComplete - perfData.domLoading,
          load: perfData.loadEventEnd - perfData.loadEventStart
        };

        console.table(metrics);
        return metrics;
      }
    }
  },

  // Optimize third-party scripts
  loadScriptAsync(src, callback) {
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.defer = true;

    if (callback) {
      script.onload = callback;
    }

    document.body.appendChild(script);
  },

  // Request Idle Callback wrapper
  runWhenIdle(callback) {
    if ('requestIdleCallback' in window) {
      requestIdleCallback(callback, { timeout: 2000 });
    } else {
      setTimeout(callback, 1);
    }
  },

  // Prefetch next page
  prefetchPage(url) {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = url;
    document.head.appendChild(link);
  },

  // Save data mode detection
  isDataSaverMode() {
    return (
      navigator.connection &&
      (navigator.connection.saveData || navigator.connection.effectiveType === 'slow-2g')
    );
  }
};

// Auto-initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    Performance.lazyLoadImages();

    // Measure performance in development
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      window.addEventListener('load', () => {
        Performance.runWhenIdle(() => Performance.measurePerformance());
      });
    }
  });
} else {
  Performance.lazyLoadImages();
}
