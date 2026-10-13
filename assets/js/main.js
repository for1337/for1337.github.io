/* ----------------------------------------------------------------
   for1337.github.io — v11
   Single-file JavaScript. No dependencies. No build step.

   - Theme toggle (light default · dark via data-theme)
   - Active nav link tracking
   - Smooth scroll for in-page anchors
   ---------------------------------------------------------------- */

(() => {
  'use strict';

  const root = document.documentElement;

  /* ---------- Theme toggle --------------------------------------- */

  const STORAGE_KEY = 'forconi-theme';
  const toggle = document.getElementById('theme-toggle');

  const prefersDark = window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches;
  const stored = (() => {
    try { return localStorage.getItem(STORAGE_KEY); } catch { return null; }
  })();

  const initial = stored || (prefersDark ? 'dark' : 'light');
  root.setAttribute('data-theme', initial);

  if (toggle) {
    toggle.addEventListener('click', () => {
      const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem(STORAGE_KEY, next); } catch {}
    });
  }

  /* ---------- Active nav link tracking --------------------------- */

  const navLinks = document.querySelectorAll('.nav a[href^="#"]');
  const sections = Array.from(navLinks)
    .map(link => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  if (sections.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = '#' + entry.target.id;
            navLinks.forEach(link => {
              link.classList.toggle('is-active', link.getAttribute('href') === id);
            });
          }
        });
      },
      { rootMargin: '-30% 0px -65% 0px', threshold: 0 }
    );
    sections.forEach(s => observer.observe(s));
  }

  /* ---------- Smooth scroll for in-page links ------------------- */

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!href || !href.startsWith('#')) return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      if (history.replaceState) history.replaceState(null, '', href);
    });
  });
})();