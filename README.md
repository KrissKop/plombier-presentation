# Plombier Présentation

Site de présentation pour **AquaFlex Plomberie**, un artisan plombier fictif basé à Paris & Île-de-France. Projet vitrine en HTML/CSS/JS statique, sans framework ni build.

## Pages

- `index.html` — Accueil (hero, chiffres clés, services, étapes, réalisations, avis clients)
- `services.html` — Détail des prestations (dépannage, débouchage, chauffe-eau, salle de bain, etc.)
- `realisations.html` — Galerie de chantiers réalisés
- `apropos.html` — Présentation de l'entreprise
- `contact.html` — Coordonnées et formulaire de contact

## Stack

- HTML5 / CSS3 (`assets/css/style.css`)
- JavaScript vanilla (`assets/js/main.js`) — menu mobile, animations au scroll, compteurs animés
- Police [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) via Google Fonts

## Lancer en local

Aucune dépendance ni build requis : c'est du HTML statique.

```bash
python -m http.server 8000
```

Puis ouvrir `http://localhost:8000/index.html`.
