# Plombier Présentation

Site de présentation pour **AquaFlex Plomberie**, un artisan plombier fictif basé à Paris & Île-de-France. Frontend statique (`public/`) servi par un backend Node.js/Express qui traite les demandes de devis du formulaire de contact.

## Structure

```
public/             Frontend statique (HTML/CSS/JS), servi tel quel par Express
  index.html, services.html, realisations.html, apropos.html, contact.html
  assets/css/style.css
  assets/js/main.js
server/             Backend Node.js/Express
  index.js          Point d'entree : middlewares, fichiers statiques, routes API
  routes/contact.js Validation + traitement du formulaire de devis
  lib/leads.js       Stockage des demandes dans data/leads.jsonl
  lib/mailer.js       Notification par email (optionnelle, via SMTP)
data/               Demandes recues (genere a l'execution, jamais commite)
```

## Pages

- `index.html` — Accueil (hero, chiffres clés, services, étapes, réalisations, avis clients)
- `services.html` — Détail des prestations (dépannage, débouchage, chauffe-eau, salle de bain, etc.)
- `realisations.html` — Galerie de chantiers réalisés
- `apropos.html` — Présentation de l'entreprise
- `contact.html` — Coordonnées et formulaire de devis (connecté au backend)

## Backend — API

- `POST /api/contact` — reçoit le formulaire de devis (`nom`, `tel`, `email`, `cp`, `service`, `message`, `consent`), valide les champs, enregistre la demande dans `data/leads.jsonl` et envoie un email de notification si SMTP est configuré. Limité à 10 requêtes / 15 min / IP.
- `GET /api/health` — vérification de disponibilité (`{"ok":true}`).
- `GET /api/leads` — liste des demandes reçues. Désactivée (404) tant que `ADMIN_TOKEN` n'est pas défini ; sinon protégée par `Authorization: Bearer <ADMIN_TOKEN>`.

## Lancer en local

```bash
npm install
cp .env.example .env   # optionnel : configurer SMTP / ADMIN_TOKEN
npm start              # ou: npm run dev (redemarrage auto)
```

Puis ouvrir `http://localhost:3000`. Sans configuration SMTP, le serveur fonctionne normalement : chaque demande de devis est simplement enregistrée dans `data/leads.jsonl` sans envoi d'email.

## Variables d'environnement

Voir `.env.example`. Aucune n'est obligatoire pour faire fonctionner le site — sans elles, le formulaire enregistre les demandes localement sans notification email et la route `/api/leads` reste désactivée.

| Variable | Rôle |
|---|---|
| `PORT` | Port HTTP (fourni automatiquement par la plupart des hébergeurs) |
| `CORS_ORIGIN` | Origine autorisée en cross-origin (inutile si front + back sur le même domaine) |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` | Identifiants SMTP pour l'envoi d'email à chaque demande |
| `TO_EMAIL` | Adresse qui reçoit les notifications de devis |
| `ADMIN_TOKEN` | Jeton secret pour activer `GET /api/leads` |

## Déploiement en production

Le code est prêt à déployer tel quel (Dockerfile fourni, `render.yaml` pour [Render](https://render.com)). Ce qui reste à faire — étape qui nécessite obligatoirement un compte chez l'hébergeur choisi, donc non automatisable depuis cet environnement :

1. Créer un compte sur la plateforme d'hébergement de ton choix (Render, Railway, Fly.io, un VPS, etc.).
2. Connecter le repo GitHub `KrissKop/plombier-presentation` (déploiement automatique à chaque push sur `master`).
3. Renseigner les variables d'environnement de production (SMTP si tu veux recevoir les devis par email, `ADMIN_TOKEN` si tu veux consulter `/api/leads`).

**Limite à connaître** : `data/leads.jsonl` est stocké sur le disque local du serveur. Sur la plupart des hébergeurs gratuits (système de fichiers éphémère), ce fichier est perdu à chaque redéploiement/redémarrage — l'email de notification SMTP est donc le canal fiable pour ne rater aucune demande tant qu'une vraie base de données n'est pas branchée.

## Stack

- Frontend : HTML5 / CSS3, JavaScript vanilla (menu mobile, animations au scroll, compteurs animés, soumission du formulaire en fetch/JSON)
- Backend : Node.js, Express, helmet, express-rate-limit, nodemailer, dotenv
- Police [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) via Google Fonts
