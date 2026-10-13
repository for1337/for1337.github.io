/* ----------------------------------------------------------------
   for1337.github.io — v13 main.js

   - Preloader: shows until window load + a minimum 600ms, then fades
   - Reveal: scroll-triggered fade-up for .reveal elements
   - Smooth scroll for in-page anchor links
   - Header CTA: subtle hover state

   Style reference: albertomacherelli.com (Colega theme).
   ---------------------------------------------------------------- */

(function () {
  'use strict';

  // ---- Preloader ---------------------------------------------
  var preloader = document.getElementById('preloader');
  var progress = document.getElementById('preloaderProgress');
  var start = Date.now();
  var minTime = 600;

  function tick(p) {
    if (progress) progress.style.width = Math.min(100, Math.max(0, p)) + '%';
  }

  if (preloader) {
    // Animate progress bar over the min time even if everything is fast.
    var pTimer = setInterval(function () {
      var elapsed = Date.now() - start;
      var ratio = Math.min(1, elapsed / 1200);
      tick(ratio * 90);
    }, 30);

    function hide() {
      var elapsed = Date.now() - start;
      var wait = Math.max(0, minTime - elapsed);
      clearInterval(pTimer);
      tick(100);
      setTimeout(function () {
        if (preloader) preloader.classList.add('is-hidden');
        // Remove from DOM after transition so it does not block tab key.
        setTimeout(function () {
          if (preloader && preloader.parentNode) {
            preloader.parentNode.removeChild(preloader);
          }
        }, 700);
      }, wait);
    }

    function ready() {
      // Trigger on DOMContentLoaded (or immediately if already past it).
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', ready, { once: true });
        return;
      }
      hide();
    }

    // Race: window.load (best) | DOMContentLoaded (good) | 2.5s failsafe
    ready();
    window.addEventListener('load', hide, { once: true });
    setTimeout(hide, 2500);
  }

  // ---- Reveal on scroll (simple, no IO throttle traps) -------
  var revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add('is-visible');
          io.unobserve(en.target);
        }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.05 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    // No IO support: reveal everything immediately.
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  // ---- Smooth scroll for hash links (compensate sticky topbar)
  var topbar = document.querySelector('.topbar');
  var topbarH = topbar ? topbar.offsetHeight : 0;

  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href^="#"]');
    if (!a) return;
    var href = a.getAttribute('href');
    if (!href || href === '#' || href.length < 2) return;
    var id = href.slice(1);
    var target = document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    var y = target.getBoundingClientRect().top + window.pageYOffset - (topbarH + 12);
    window.scrollTo({ top: y, behavior: 'smooth' });
    history.replaceState(null, '', '#' + id);
  });
})();
