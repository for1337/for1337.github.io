/* ----------------------------------------------------------------
   for1337.github.io — v12 main.js

   Minimal: smooth scroll for hash links (browsers handle scroll-behavior
   already but we add a header offset compensation), and an active
   state for topbar actions when hovering/focusing a section.

   No theme toggle, no IntersectionObserver, no animation triggers.
   Dark-only design (matches leonardoforconi.com v3).
   ---------------------------------------------------------------- */

(function () {
  'use strict';

  // Smooth scroll for in-page anchor links, accounting for sticky topbar height.
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

  // Lightweight topbar CTAs pulse on visibility: add a class when the page
  // is scrolled past the hero, so the "Get in touch" CTA gets a subtle
  // border-strong treatment.
  var cta = document.querySelector('.actions .cta');
  var hero = document.querySelector('.hero');
  if (cta && hero && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          cta.classList.remove('is-past');
        } else {
          cta.classList.add('is-past');
        }
      });
    }, { rootMargin: '-80px 0px 0px 0px', threshold: 0 });
    io.observe(hero);
  }
})();
