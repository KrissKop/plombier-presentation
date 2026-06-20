require('dotenv').config();

const path = require('path');
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression');
const rateLimit = require('express-rate-limit');

const contactRouter = require('./routes/contact');

const app = express();
const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = path.join(__dirname, '..', 'public');

app.set('trust proxy', 1);
app.use(helmet({ contentSecurityPolicy: false }));
app.use(compression());
app.use(cors({ origin: process.env.CORS_ORIGIN || true }));
app.use(express.json({ limit: '20kb' }));
app.use(express.urlencoded({ extended: true, limit: '20kb' }));

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
});

app.get('/api/health', (req, res) => res.json({ ok: true }));
app.use('/api', contactLimiter, contactRouter);

app.use(express.static(PUBLIC_DIR, { extensions: ['html'] }));

app.use((req, res) => {
  res.status(404).sendFile(path.join(PUBLIC_DIR, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`AquaFlex server listening on http://localhost:${PORT}`);
});
