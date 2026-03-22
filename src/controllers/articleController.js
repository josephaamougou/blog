const Article = require('../models/Articles');
const { Op } = require('sequelize');

exports.createArticle = async (req, res) => {
    try {
        const { titre, contenu, auteur, categorie, tags } = req.body;
        if (!titre || !auteur) return res.status(400).json({ message: "Titre et auteur requis" });

        const article = await Article.create(req.body);
        res.status(201).json(article);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllArticles = async (req, res) => {
    try {
        const { categorie, auteur, date } = req.query;
        let filters = {};
        if (categorie) filters.categorie = categorie;
        if (auteur) filters.auteur = auteur;
        if (date) filters.date = date;

        const articles = await Article.findAll({ where: filters });
        res.json(articles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getArticleById = async (req, res) => {
    try {
        const article = await Article.findByPk(req.params.id);
        if (!article) return res.status(404).json({ message: "Article non trouvé" });
        res.json(article);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateArticle = async (req, res) => {
    try {
        const article = await Article.findByPk(req.params.id);
        if (!article) return res.status(404).json({ message: "Article non trouvé" });
        await article.update(req.body);
        res.json({ message: "Article mis à jour", article });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteArticle = async (req, res) => {
    try {
        const deleted = await Article.destroy({ where: { id: req.params.id } });
        if (!deleted) return res.status(404).json({ message: "Article non trouvé" });
        res.json({ message: "Article supprimé avec succès" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.searchArticles = async (req, res) => {
    try {
        const { query } = req.query;
        const articles = await Article.findAll({
            where: {
                [Op.or]: [
                    { titre: { [Op.like]: `%${query}%` } },
                    { contenu: { [Op.like]: `%${query}%` } }
                ]
            }
        });
        res.json(articles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};