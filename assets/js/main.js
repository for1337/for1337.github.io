/* ----------------------------------------------------------------
   for1337.github.io — R3 Linear School
   Single-file JavaScript. No dependencies. No build step.
   ---------------------------------------------------------------- */

(() => {
  'use strict';

  // ---------- Theme toggle ----------

  const STORAGE_KEY = 'forconi-theme';
  const root = document.documentElement;
  const toggle = document.getElementById('theme-toggle');

  const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
  const stored = (() => {
    try { return localStorage.getItem(STORAGE_KEY); } catch { return null; }
  })();

  const initial = stored || (prefersLight ? 'light' : 'dark');
  root.setAttribute('data-theme', initial);

  if (toggle) {
    toggle.addEventListener('click', () => {
      const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem(STORAGE_KEY, next); } catch {}
    });
  }

  // ---------- Active nav link tracking ----------

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
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    );
    sections.forEach(s => observer.observe(s));
  }

  // ---------- Smooth scroll offset for in-page links ----------
  // (CSS already has scroll-padding-top, but we also fade-in on click.)

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!href || !href.startsWith('#')) return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Update the URL without triggering a jump.
      if (history.replaceState) history.replaceState(null, '', href);
    });
  });

  // ---------- Scroll reveal ----------

  const revealEls = document.querySelectorAll('.sec, .hero, .proj, .job, .svc, .skill-group, .edu, .channel');
  revealEls.forEach(el => el.classList.add('reveal'));

  if ('IntersectionObserver' in window && revealEls.length) {
    const ro = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            ro.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 }
    );
    revealEls.forEach(el => ro.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('is-visible'));
  }
})();
