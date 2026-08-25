/* ==========================================================================
   Leonardo Forconi — main.js
   Vanilla JS, no dependencies.
   ========================================================================== */
(function () {
  'use strict';

  const root = document.documentElement;
  const body = document.body;
  const header = document.getElementById('site-header');
  const navToggle = document.getElementById('nav-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  const themeToggle = document.getElementById('theme-toggle');
  const yearEl = document.getElementById('year');

  /* ----- 1. THEME ----------------------------------------------------- */
  const THEME_KEY = 'lf-theme';
  const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
  const stored = localStorage.getItem(THEME_KEY);
  const initial = stored || (prefersLight ? 'light' : 'dark');
  root.setAttribute('data-theme', initial);
  // also reflect in <meta name="color-scheme">
  const cs = document.querySelector('meta[name="color-scheme"]');
  if (cs) cs.setAttribute('content', initial);

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      const current = root.getAttribute('data-theme') || 'dark';
      const next = current === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      if (cs) cs.setAttribute('content', next);
      try { localStorage.setItem(THEME_KEY, next); } catch (_) {}
    });
  }

  /* ----- 2. STICKY HEADER SHADOW -------------------------------------- */
  if (header) {
    const onScroll = function () {
      if (window.scrollY > 8) header.classList.add('scrolled');
      else header.classList.remove('scrolled');
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ----- 3. MOBILE NAV ------------------------------------------------- */
  if (navToggle && mobileNav) {
    navToggle.addEventListener('click', function () {
      const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!isOpen));
      navToggle.setAttribute('aria-label', isOpen ? 'Open menu' : 'Close menu');
      if (isOpen) {
        mobileNav.setAttribute('hidden', '');
      } else {
        mobileNav.removeAttribute('hidden');
      }
    });

    // Close on link click
    mobileNav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.setAttribute('aria-label', 'Open menu');
        mobileNav.setAttribute('hidden', '');
      });
    });

    // Close on resize to desktop
    let lastW = window.innerWidth;
    window.addEventListener('resize', function () {
      if (window.innerWidth !== lastW) {
        lastW = window.innerWidth;
        if (window.innerWidth > 720) {
          navToggle.setAttribute('aria-expanded', 'false');
          navToggle.setAttribute('aria-label', 'Open menu');
          mobileNav.setAttribute('hidden', '');
        }
      }
    });

    // Close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navToggle.getAttribute('aria-expanded') === 'true') {
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.setAttribute('aria-label', 'Open menu');
        mobileNav.setAttribute('hidden', '');
        navToggle.focus();
      }
    });
  }

  /* ----- 4. REVEAL ON SCROLL ------------------------------------------ */
  // Add .reveal to elements that should fade in
  const revealTargets = document.querySelectorAll(
    '.section-head, .hero-text, .hero-card, .timeline-item, .skill-card, .service-card, .project-card, .edu-list li, .lang-list li, .contact-card'
  );
  revealTargets.forEach(function (el) { el.classList.add('reveal'); });

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealTargets.forEach(function (el) { io.observe(el); });
  } else {
    // Fallback: just show
    revealTargets.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ----- 5. ACTIVE NAV LINK -------------------------------------------- */
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.primary-nav a, .mobile-nav a');
  if (sections.length && navLinks.length && 'IntersectionObserver' in window) {
    const linkMap = {};
    navLinks.forEach(function (a) {
      const href = a.getAttribute('href') || '';
      if (href.startsWith('#')) linkMap[href.slice(1)] = a;
    });

    const navIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach(function (a) { a.classList.remove('is-active'); });
          if (linkMap[id]) linkMap[id].classList.add('is-active');
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });

    sections.forEach(function (s) { navIO.observe(s); });
  }

  /* ----- 6. FOOTER YEAR ------------------------------------------------ */
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

})();
