/* ----------------------------------------------------------------
   for1337.github.io — v13 main.js

   - Reveal: scroll-triggered fade-up for .reveal elements
   - Smooth scroll for in-page anchor links
   - Hero entrance is pure CSS (no preloader — too fragile in headless)

   Style reference: albertomacherelli.com (Colega theme).
   ---------------------------------------------------------------- */

(function () {
  'use strict';

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
