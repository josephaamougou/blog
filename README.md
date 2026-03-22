# blog

# Blog API - Part 1

API Backend pour la gestion d'articles de blog construite avec Node.js, Express et SQLite.

## Installation
1. `npm install`
2. Créer un fichier `.env` (voir exemple ci-dessous)
3. `npm start` (ou `npm run dev` pour le mode développement)

## Variables d'environnement
PORT=3000

## Endpoints principaux
- GET /api-docs : Documentation Swagger
- POST /api/articles : Créer un article
- GET /api/articles : Lister les articles (Filtres: ?categorie=, ?auteur=, ?date=)
- GET /api/articles/search?query=... : Rechercher dans le titre/contenu
- GET /api/articles/:id : Détails d'un article
- PUT /api/articles/:id : Modifier un article
- DELETE /api/articles/:id : Supprimer un article