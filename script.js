// script.js

// Page Transition / Loader Logic
window.addEventListener('load', () => {
    const loader = document.getElementById('global-loader');
    if (loader) {
        // Hide loader once the page is fully loaded
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 500); // 500ms minimum display time for dramatic effect
    }
});

document.addEventListener('DOMContentLoaded', () => {
    // Intercept link clicks for page transitions
    document.body.addEventListener('click', e => {
        const link = e.target.closest('a');
        if (link && link.href && !link.href.includes('#') && link.target !== '_blank') {
            e.preventDefault();
            const loader = document.getElementById('global-loader');
            if (loader) {
                loader.classList.remove('hidden');
            }
            setTimeout(() => {
                window.location.href = link.href;
            }, 500); // wait for loader intro animation
        }
    });

    // 1. Sticky Navbar Effect
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Scroll Reveal Animations (Intersection Observer)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Stop observing once revealed for better performance
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const fadeUpElements = document.querySelectorAll('.fade-up-scroll');
    fadeUpElements.forEach(el => {
        scrollObserver.observe(el);
    });

    // 3. Smooth scrolling for internal anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            // Ignore if it's just "#"
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const offsetTop = targetElement.getBoundingClientRect().top + window.scrollY;
                // Offset for navbar
                window.scrollTo({
                    top: offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});
