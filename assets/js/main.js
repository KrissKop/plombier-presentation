// Menu mobile
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');
if (burger) {
  burger.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));
}

// Animations au scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Compteurs animés
const counters = document.querySelectorAll('[data-count]');
if (counters.length) {
  const cObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target, target = +el.dataset.count, suffix = el.dataset.suffix || '';
      let cur = 0; const step = Math.max(1, Math.ceil(target / 60));
      const tick = () => { cur += step; if (cur >= target) cur = target; el.textContent = cur + suffix; if (cur < target) requestAnimationFrame(tick); };
      tick(); cObs.unobserve(el);
    });
  }, { threshold: 0.5 });
  counters.forEach(c => cObs.observe(c));
}

// Formulaire de contact (démo)
const form = document.getElementById('devis-form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const ok = document.querySelector('.form-ok');
    if (ok) ok.style.display = 'block';
    form.reset();
    if (ok) ok.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
}
