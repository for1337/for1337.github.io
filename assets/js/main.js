/* ----------------------------------------------------------------
   for1337.github.io — v5 Engineer's Console
   Single-file JavaScript. No dependencies. No build step.
   Theme toggle · nav active state · smooth scroll · scroll reveal.
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
  // Apply to every section and to row-level children that benefit from a
  // staggered fade-in. Hero keeps its own immediate presence (no reveal).

  const skipReveal = document.querySelectorAll('.hero, .reveal-no');
  const heroSection = document.querySelector('.hero');
  if (heroSection) heroSection.classList.remove('reveal');

  const revealEls = document.querySelectorAll(
    '.sec, .role, .svc, .stack tbody tr, .projects tbody tr, .edu, .lang, .contact-note, .contact-actions, .meta-block'
  );
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
      { rootMargin: '0px 0px -6% 0px', threshold: 0.04 }
    );
    revealEls.forEach(el => ro.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('is-visible'));
  }
})();
