const express = require('express');
const { saveLead, listLeads } = require('../lib/leads');
const { sendLeadNotification } = require('../lib/mailer');

const router = express.Router();

const SERVICES = [
  'Dépannage urgence',
  'Débouchage canalisation',
  'Recherche de fuite',
  'Chauffe-eau / chaudière',
  'Rénovation salle de bain',
  'Installation sanitaire',
  'Autre',
];

const PHONE_RE = /^[0-9+().\s-]{6,20}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(body) {
  const errors = {};
  const nom = String(body.nom || '').trim();
  const tel = String(body.tel || '').trim();
  const email = String(body.email || '').trim();
  const cp = String(body.cp || '').trim();
  const service = String(body.service || '').trim();
  const message = String(body.message || '').trim();
  const consent = body.consent === true || body.consent === 'on' || body.consent === 'true';

  if (!nom || nom.length < 2 || nom.length > 100) errors.nom = 'Nom invalide.';
  if (!PHONE_RE.test(tel)) errors.tel = 'Téléphone invalide.';
  if (email && !EMAIL_RE.test(email)) errors.email = 'Email invalide.';
  if (!SERVICES.includes(service)) errors.service = 'Service invalide.';
  if (!message || message.length < 5 || message.length > 2000) errors.message = 'Message trop court.';
  if (!consent) errors.consent = "Le consentement est requis.";

  return { errors, clean: { nom, tel, email, cp, service, message } };
}

router.post('/contact', async (req, res) => {
  const { errors, clean } = validate(req.body || {});
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ ok: false, errors });
  }

  const lead = { ...clean, receivedAt: new Date().toISOString(), ip: req.ip };
  saveLead(lead);

  try {
    await sendLeadNotification(lead);
  } catch (err) {
    console.error('[contact] email notification failed:', err.message);
  }

  res.status(201).json({ ok: true });
});

// Admin-only export, disabled unless ADMIN_TOKEN is set.
router.get('/leads', (req, res) => {
  const token = process.env.ADMIN_TOKEN;
  if (!token) return res.status(404).end();
  if (req.get('authorization') !== `Bearer ${token}`) return res.status(401).json({ ok: false });
  res.json({ ok: true, leads: listLeads() });
});

module.exports = router;
