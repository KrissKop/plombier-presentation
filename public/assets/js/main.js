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

// Formulaire de contact
const form = document.getElementById('devis-form');
if (form) {
  const ok = form.querySelector('.form-ok');
  const error = form.querySelector('.form-error');
  const submitBtn = form.querySelector('button[type="submit"]');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (ok) ok.style.display = 'none';
    if (error) { error.style.display = 'none'; error.textContent = ''; }
    if (submitBtn) submitBtn.disabled = true;

    const data = new FormData(form);
    const payload = {
      nom: data.get('nom'),
      tel: data.get('tel'),
      email: data.get('email'),
      cp: data.get('cp'),
      service: data.get('service'),
      message: data.get('message'),
      consent: data.get('consent') === 'on',
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(Object.values(body.errors || {})[0] || 'Une erreur est survenue.');

      if (ok) { ok.style.display = 'block'; ok.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
      form.reset();
    } catch (err) {
      if (error) { error.textContent = '⚠️ ' + err.message; error.style.display = 'block'; error.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
    } finally {
      if (submitBtn) submitBtn.disabled = false;
    }
  });
}
