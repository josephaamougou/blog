const express = require('express');
const router = express.Router();
const articleCtrl = require('../controllers/articleController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Article:
 *       type: object
 *       required:
 *         - titre
 *         - contenu
 *         - auteur
 *         - categorie
 *       properties:
 *         id:
 *           type: integer
 *           description: L'ID auto-généré de l'article
 *         titre:
 *           type: string
 *           description: Le titre de l'article
 *         contenu:
 *           type: string
 *           description: Le corps du texte de l'article
 *         auteur:
 *           type: string
 *           description: Nom de l'auteur
 *         date:
 *           type: string
 *           format: date
 *           description: Date de publication (YYYY-MM-DD)
 *         categorie:
 *           type: string
 *           description: Catégorie de l'article (ex Tech, Sport)
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *           description: Liste de tags associés
 *       example:
 *         titre: "Introduction à Node.js"
 *         contenu: "Node.js est un environnement d'exécution JavaScript..."
 *         auteur: "Alice Dev"
 *         categorie: "Tech"
 *         tags: ["backend", "javascript"]
 */

/**
 * @swagger
 * tags:
 *   name: Articles
 *   description: API de gestion des articles du blog
 */

/**
 * @swagger
 * /api/articles:
 *   post:
 *     summary: Créer un nouvel article
 *     tags: [Articles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Article'
 *     responses:
 *       201:
 *         description: Article créé avec succès
 *       400:
 *         description: Données invalides (titre ou auteur manquant)
 *       500:
 *         description: Erreur serveur
 *
 *   get:
 *     summary: Récupérer tous les articles ou filtrer
 *     tags: [Articles]
 *     parameters:
 *       - in: query
 *         name: categorie
 *         schema:
 *           type: string
 *         description: Filtrer par catégorie
 *       - in: query
 *         name: auteur
 *         schema:
 *           type: string
 *         description: Filtrer par auteur
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *           format: date
 *         description: Filtrer par date (YYYY-MM-DD)
 *     responses:
 *       200:
 *         description: Liste des articles récupérée
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Article'
 */
router.post('/', articleCtrl.createArticle);
router.get('/', articleCtrl.getAllArticles);

/**
 * @swagger
 * /api/articles/search:
 *   get:
 *     summary: Rechercher des articles par texte (titre ou contenu)
 *     tags: [Articles]
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *         description: Le texte à rechercher
 *     responses:
 *       200:
 *         description: Résultats de la recherche
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Article'
 */
router.get('/search', articleCtrl.searchArticles);

/**
 * @swagger
 * /api/articles/{id}:
 *   get:
 *     summary: Récupérer un article par son ID
 *     tags: [Articles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l'article
 *     responses:
 *       200:
 *         description: Détails de l'article
 *       404:
 *         description: Article non trouvé
 *
 *   put:
 *     summary: Mettre à jour un article existant
 *     tags: [Articles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Article'
 *     responses:
 *       200:
 *         description: Article mis à jour
 *       404:
 *         description: Article non trouvé
 *
 *   delete:
 *     summary: Supprimer un article
 *     tags: [Articles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Article supprimé
 *       404:
 *         description: Article non trouvé
 */
router.get('/:id', articleCtrl.getArticleById);
router.put('/:id', articleCtrl.updateArticle);
router.delete('/:id', articleCtrl.deleteArticle);

module.exports = router;