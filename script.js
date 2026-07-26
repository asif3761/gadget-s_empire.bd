// ==========================================================
// SUNDOWN & SAGE — interactions
// ==========================================================

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Scroll-reveal: fade/rise sections and cards into view
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => revealObserver.observe(el));

// Mesa parallax on scroll (subtle, disabled if reduced motion preferred)
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const mesas = document.querySelectorAll('.mesa');

if (!prefersReducedMotion && mesas.length) {
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const scrolled = window.scrollY;
        mesas.forEach((mesa, i) => {
          const speed = 0.15 + (i * 0.08);
          mesa.style.transform = `translateY(${scrolled * speed}px)`;
        });
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}

// Nav background solidifies after scrolling past hero
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    nav.style.boxShadow = '0 2px 0 rgba(59,38,32,0.15)';
  } else {
    nav.style.boxShadow = 'none';
  }
}, { passive: true });
