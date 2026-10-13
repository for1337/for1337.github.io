/* ----------------------------------------------------------------
   for1337.github.io — v10
   Single-file JavaScript. No dependencies. No build step.

   - Theme toggle (dark default · light via data-theme)
   - Active nav link tracking
   - Smooth scroll for in-page anchors
   - Scroll reveal via IntersectionObserver (.reveal → .is-visible)
   - Stack filter pills (data-filter on .stack-row[data-cat])
   - prefers-reduced-motion: reveal animation is skipped
   ---------------------------------------------------------------- */

(() => {
  'use strict';

  const root = document.documentElement;
  const prefersReducedMotion = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Theme toggle --------------------------------------- */

  const STORAGE_KEY = 'forconi-theme';
  const toggle = document.getElementById('theme-toggle');

  const prefersLight = window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: light)').matches;
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
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
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

  /* ---------- Scroll reveal -------------------------------------- */

  // Reveal every .reveal element immediately. In some sandboxed /
  // headless browser environments, IntersectionObserver callbacks and
  // setTimeout are throttled or never fire when the tab is unfocused,
  // which leaves content stuck at opacity:0. Content visibility wins
  // over animation polish.
  const revealEls = document.querySelectorAll('.reveal');
  revealEls.forEach((el) => el.classList.add('is-visible'));

  /* ---------- Stack filter pills --------------------------------- */

  const filterButtons = document.querySelectorAll('.filter-pill');
  const stackRows = document.querySelectorAll('.stack-row[data-cat]');

  if (filterButtons.length && stackRows.length) {
    const applyFilter = (filter) => {
      stackRows.forEach(row => {
        const matches = filter === 'all' || row.dataset.cat === filter;
        row.classList.toggle('is-hidden', !matches);
      });
    };

    filterButtons.forEach((btn, idx) => {
      btn.addEventListener('click', () => {
        const filter = btn.dataset.filter || 'all';
        filterButtons.forEach(b => {
          const active = b === btn;
          b.classList.toggle('is-active', active);
          b.setAttribute('aria-selected', active ? 'true' : 'false');
          b.setAttribute('tabindex', active ? '0' : '-1');
        });
        applyFilter(filter);

        // Re-trigger reveal animation on newly-shown rows so they don't
        // appear stale. We toggle visibility first, then re-observe.
        if (!prefersReducedMotion && 'IntersectionObserver' in window) {
          const refreshObserver = new IntersectionObserver(
            (entries, obs) => {
              entries.forEach(entry => {
                if (entry.isIntersecting) {
                  entry.target.classList.add('is-visible');
                  obs.unobserve(entry.target);
                }
              });
            },
            { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
          );
          document.querySelectorAll('.stack-row:not(.is-hidden)')
            .forEach(row => refreshObserver.observe(row));
        }
      });

      // Keyboard nav across pills (left/right arrows, Home, End).
      btn.addEventListener('keydown', (e) => {
        const key = e.key;
        let target = null;
        if (key === 'ArrowRight' || key === 'ArrowDown') {
          target = filterButtons[(idx + 1) % filterButtons.length];
        } else if (key === 'ArrowLeft' || key === 'ArrowUp') {
          target = filterButtons[(idx - 1 + filterButtons.length) % filterButtons.length];
        } else if (key === 'Home') {
          target = filterButtons[0];
        } else if (key === 'End') {
          target = filterButtons[filterButtons.length - 1];
        }
        if (target) {
          e.preventDefault();
          target.focus();
        }
      });
    });
  }
})();