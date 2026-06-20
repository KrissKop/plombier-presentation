const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', '..', 'data');
const LEADS_FILE = path.join(DATA_DIR, 'leads.jsonl');

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
}

function saveLead(lead) {
  ensureDataDir();
  fs.appendFileSync(LEADS_FILE, JSON.stringify(lead) + '\n', 'utf8');
}

function listLeads() {
  ensureDataDir();
  if (!fs.existsSync(LEADS_FILE)) return [];
  return fs.readFileSync(LEADS_FILE, 'utf8')
    .split('\n')
    .filter(Boolean)
    .map((line) => JSON.parse(line));
}

module.exports = { saveLead, listLeads };
