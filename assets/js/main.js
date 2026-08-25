/* ==========================================================================
   for1337.github.io — DOSSIER
   Theme toggle, clock, scroll progress, index panel, reveal.
   ========================================================================== */
(function () {
  'use strict';

  const root = document.documentElement;
  const themeToggle = document.getElementById('theme-toggle');
  const cs = document.querySelector('meta[name="color-scheme"]');
  const clockEl = document.getElementById('clock');
  const progressFill = document.getElementById('progress-fill');
  const indexBtn = document.getElementById('index-btn');
  const indexPanel = document.getElementById('index-panel');
  const indexClose = document.getElementById('index-close');

  /* --- 1. Theme --------------------------------------------------------- */
  const THEME_KEY = 'lf-theme';
  const stored = (function () {
    try { return localStorage.getItem(THEME_KEY); } catch (_) { return null; }
  })();
  const initial = stored || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
  root.setAttribute('data-theme', initial);
  if (cs) cs.setAttribute('content', initial);

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      const next = (root.getAttribute('data-theme') || 'dark') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      if (cs) cs.setAttribute('content', next);
      try { localStorage.setItem(THEME_KEY, next); } catch (_) {}
    });
  }

  /* --- 2. Clock (HH:MM CET) ------------------------------------------- */
  function pad(n) { return String(n).padStart(2, '0'); }
  function updateClock() {
    if (!clockEl) return;
    try {
      const d = new Date();
      clockEl.textContent = pad(d.getHours()) + ':' + pad(d.getMinutes()) + ' CET';
    } catch (_) {
      clockEl.textContent = '--:-- CET';
    }
  }
  updateClock();
  setInterval(updateClock, 30000);

  /* --- 3. Scroll progress ---------------------------------------------- */
  function updateProgress() {
    if (!progressFill) return;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    if (max <= 0) { progressFill.style.height = '0%'; return; }
    const pct = Math.max(0, Math.min(100, (window.scrollY / max) * 100));
    progressFill.style.height = pct + '%';
  }
  updateProgress();
  window.addEventListener('scroll', updateProgress, { passive: true });
  window.addEventListener('resize', updateProgress);

  /* --- 4. Index panel ------------------------------------------------- */
  function openIndex() { if (indexPanel) indexPanel.removeAttribute('hidden'); }
  function closeIndex() { if (indexPanel) indexPanel.setAttribute('hidden', ''); }
  if (indexBtn) indexBtn.addEventListener('click', openIndex);
  if (indexClose) indexClose.addEventListener('click', closeIndex);
  if (indexPanel) {
    indexPanel.addEventListener('click', function (e) {
      if (e.target === indexPanel) closeIndex();
    });
    indexPanel.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', closeIndex);
    });
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && indexPanel && !indexPanel.hasAttribute('hidden')) {
      closeIndex();
    }
  });

  /* --- 5. Scroll reveal ----------------------------------------------- */
  const targets = document.querySelectorAll(
    '.dossier-stamps, .display-name, .dossier-id, .dossier-quote, ' +
    '.prose-main, .marginalia, .log-entry, .node-graph, .tree, ' +
    '.scope-block, .repos-table, .file-block, .channels-note, .channels-list, .channels-foot, ' +
    '.breadcrumb, .section-marker'
  );
  targets.forEach(function (el) { el.classList.add('reveal'); });

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    targets.forEach(function (el) { io.observe(el); });
  } else {
    targets.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* --- 6. Active section in index panel ------------------------------- */
  if (indexPanel) {
    const sections = document.querySelectorAll('main section[id]');
    const indexLinks = {};
    indexPanel.querySelectorAll('a').forEach(function (a) {
      const href = a.getAttribute('href') || '';
      if (href.startsWith('#')) indexLinks[href.slice(1)] = a;
    });
    if (sections.length && Object.keys(indexLinks).length && 'IntersectionObserver' in window) {
      const navIO = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            Object.values(indexLinks).forEach(function (a) { a.classList.remove('is-active'); });
            if (indexLinks[id]) indexLinks[id].classList.add('is-active');
          }
        });
      }, { rootMargin: '-40% 0px -55% 0px' });
      sections.forEach(function (s) { navIO.observe(s); });
    }
  }

})();
