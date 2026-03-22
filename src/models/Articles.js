const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Article = sequelize.define('Article', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    titre: { type: DataTypes.STRING, allowNull: false },
    contenu: { type: DataTypes.TEXT, allowNull: false },
    auteur: { type: DataTypes.STRING, allowNull: false },
    date: { type: DataTypes.DATEONLY, defaultValue: DataTypes.NOW },
    categorie: { type: DataTypes.STRING, allowNull: false },
    tags: {
        type: DataTypes.STRING,
        get() { return this.getDataValue('tags')?.split(','); },
        set(val) { this.setDataValue('tags', Array.isArray(val) ? val.join(',') : val); }
    }
});

module.exports = Article;