/* ============================================================
   Applegate Plumbing & Heating — Main JS
   ============================================================ */

(function () {
  'use strict';

  /* --- Mobile nav --- */
  const hamburger = document.getElementById('hamburger-btn');
  const mobileNav = document.getElementById('mobile-nav');
  const closeBtn = document.getElementById('close-nav-btn');
  const mobileLinks = mobileNav ? mobileNav.querySelectorAll('a') : [];

  function openNav() {
    mobileNav.setAttribute('aria-hidden', 'false');
    hamburger.setAttribute('aria-expanded', 'true');
    mobileLinks.forEach(a => a.removeAttribute('tabindex'));
    document.body.style.overflow = 'hidden';
  }

  function closeNav() {
    mobileNav.setAttribute('aria-hidden', 'true');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileLinks.forEach(a => a.setAttribute('tabindex', '-1'));
    document.body.style.overflow = '';
  }

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', openNav);
    closeBtn && closeBtn.addEventListener('click', closeNav);
    mobileLinks.forEach(a => {
      a.addEventListener('click', closeNav);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mobileNav.getAttribute('aria-hidden') === 'false') {
        closeNav();
        hamburger.focus();
      }
    });
  }

  /* --- Scroll reveal --- */
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    reveals.forEach(el => obs.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('visible'));
  }

  /* --- Smooth nav link active state --- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  if ('IntersectionObserver' in window && navLinks.length) {
    const navObs = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            navLinks.forEach(a => a.removeAttribute('aria-current'));
            const active = document.querySelector('.nav-links a[href="#' + entry.target.id + '"]');
            if (active) active.setAttribute('aria-current', 'page');
          }
        });
      },
      { threshold: 0.4 }
    );
    sections.forEach(s => navObs.observe(s));
  }

  /* --- Form success message --- */
  const form = document.querySelector('.contact-form form');
  if (form) {
    form.addEventListener('submit', function (e) {
      // Formspree handles submission; show inline thanks on success
      // (Formspree will redirect unless AJAX is used — basic HTML form submit is fine)
    });
  }

})();
