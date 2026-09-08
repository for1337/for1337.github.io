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

  // ---------- Rotate overlay (smartphone portrait only) ----------
  // Show a full-screen "rotate your device" message whenever the
  // viewport looks like a smartphone in portrait orientation.
  // No "continue anyway" button: the spec is forced landscape.

  const rotateOverlay = document.getElementById('rotate-overlay');
  const fullscreenHint = document.getElementById('fullscreen-hint');

  // matchMedia('(orientation: portrait)') is the modern API but
  // isn't supported on every WebView (e.g. older iOS Safari).
  // Fall back to comparing innerWidth vs innerHeight.
  const mqPortrait =
    window.matchMedia && window.matchMedia('(orientation: portrait)');

  // Treat anything with the short side <= 500 CSS px as a
  // smartphone. Tablets in portrait (typically >500 on the
  // short side) keep the desktop layout.
  const isPhone = () => Math.min(window.innerWidth, window.innerHeight) <= 500;
  const isPortrait = () => window.innerHeight > window.innerWidth;

  if (rotateOverlay) {
    const reduceMotion = window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const icon = rotateOverlay.querySelector('.rotate-overlay-icon');
    if (icon && !reduceMotion) {
      let frame = 0;
      const animateIcon = () => {
        // gentle 0deg -> -90deg -> 0deg tilt, 2.4s per cycle
        const t = (Date.now() % 2400) / 2400;
        const deg = Math.sin(t * Math.PI * 2) * 22.5; // ±22.5deg peak
        icon.style.transform = `rotate(${deg}deg)`;
        frame = requestAnimationFrame(animateIcon);
      };
      animateIcon();
    }
  }

  // ---------- Fullscreen on landscape (smartphone only) ----------
  // iOS Safari and most Android browsers require a user gesture
  // before requestFullscreen() is allowed. Strategy:
  //   - in landscape, on a phone, show a "Tap for fullscreen" hint
  //   - first user pointerdown / touchstart triggers requestFullscreen
  //   - exiting fullscreen manually (gesture, ESC, etc.) hides the
  //     hint for a few seconds so we don't immediately re-prompt
  //   - rotating back to portrait always exits fullscreen and hides
  //     the hint
  let lastFullscreenExitAt = 0;

  const isFullscreen = () =>
    !!(document.fullscreenElement || document.webkitFullscreenElement);

  const requestFullscreen = (el) => {
    const fn = el.requestFullscreen || el.webkitRequestFullscreen;
    if (!fn) return Promise.reject(new Error('Fullscreen API unsupported'));
    try {
      const result = fn.call(el);
      // Webkit returns void instead of a Promise; normalize.
      return result && typeof result.then === 'function'
        ? result
        : Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  };

  const exitFullscreen = () => {
    const fn = document.exitFullscreen || document.webkitExitFullscreen;
    if (!fn) return;
    try { fn.call(document); } catch {}
  };

  const onUserGesture = (e) => {
    // Don't trigger when tapping inside the rotate overlay itself —
    // that overlay blocks the page anyway, and the tap is meant
    // to rotate the device, not enter fullscreen.
    if (rotateOverlay && !rotateOverlay.hidden) return;
    if (!isPhone() || isPortrait()) return;
    if (isFullscreen()) return;
    // Don't re-prompt right after the user just exited fullscreen.
    if (Date.now() - lastFullscreenExitAt < 4000) return;

    requestFullscreen(document.documentElement)
      .then(() => { /* fullscreen is now active; hint will be hidden by fullscreenchange */ })
      .catch(() => { /* user denied or API not allowed */ });
  };

  document.addEventListener('pointerdown', onUserGesture, { passive: true });
  document.addEventListener('touchstart', onUserGesture, { passive: true });

  const onFullscreenChange = () => {
    if (!isFullscreen()) {
      // Mark the moment of exit so the next tap (after a 4s cooldown)
      // can try fullscreen again, instead of getting immediately
      // re-prompted by the now-visible hint.
      lastFullscreenExitAt = Date.now();
    }
  };
  document.addEventListener('fullscreenchange', onFullscreenChange);
  document.addEventListener('webkitfullscreenchange', onFullscreenChange);

  const updateFullscreenHint = () => {
    if (!fullscreenHint) return;
    const inCooldown = Date.now() - lastFullscreenExitAt < 4000;
    const show = isPhone() && !isPortrait() && !isFullscreen() && !inCooldown;
    if (show) fullscreenHint.removeAttribute('hidden');
    else fullscreenHint.setAttribute('hidden', '');
  };

  // ---------- Combined update: rotate overlay + fullscreen hint ----------

  const updateViewport = () => {
    if (rotateOverlay) {
      const shouldShow = isPhone() && isPortrait();
      if (shouldShow) {
        rotateOverlay.removeAttribute('hidden');
        document.body.classList.add('rotate-locked');
      } else {
        rotateOverlay.setAttribute('hidden', '');
        document.body.classList.remove('rotate-locked');
      }
    }
    // Going back to portrait: always leave fullscreen so the browser
    // chrome and orientation are restored.
    if (isPhone() && isPortrait() && isFullscreen()) {
      exitFullscreen();
    }
    updateFullscreenHint();
  };

  // resize fires on rotation (Chrome, Firefox). orientationchange
  // fires on Safari. Listen to both for safety. matchMedia change
  // event is the modern preferred path (Chrome 81+).
  window.addEventListener('resize', updateViewport);
  window.addEventListener('orientationchange', () => {
    // Delay one frame: some Android WebViews fire
    // orientationchange BEFORE the new innerWidth/innerHeight
    // values are written. Reading them next tick is safer.
    requestAnimationFrame(updateViewport);
  });
  if (mqPortrait) {
    if (mqPortrait.addEventListener) {
      mqPortrait.addEventListener('change', updateViewport);
    } else if (mqPortrait.addListener) {
      mqPortrait.addListener(updateViewport);
    }
  }
  updateViewport();
})();
