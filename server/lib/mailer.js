const nodemailer = require('nodemailer');

let transporter = null;

function getTransporter() {
  if (transporter) return transporter;
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) return null;
  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT) || 587,
    secure: Number(SMTP_PORT) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
  return transporter;
}

async function sendLeadNotification(lead) {
  const t = getTransporter();
  if (!t) {
    console.log('[mailer] SMTP not configured - skipping email, lead saved to disk only.');
    return { sent: false };
  }
  const to = process.env.TO_EMAIL || process.env.SMTP_USER;
  await t.sendMail({
    from: `"AquaFlex - Site web" <${process.env.SMTP_USER}>`,
    to,
    replyTo: lead.email || undefined,
    subject: `Nouvelle demande de devis - ${lead.nom}`,
    text: [
      `Nom: ${lead.nom}`,
      `Telephone: ${lead.tel}`,
      `Email: ${lead.email || '(non renseigne)'}`,
      `Code postal: ${lead.cp || '(non renseigne)'}`,
      `Service: ${lead.service}`,
      `Message: ${lead.message}`,
      `Recu le: ${lead.receivedAt}`,
    ].join('\n'),
  });
  return { sent: true };
}

module.exports = { sendLeadNotification };
