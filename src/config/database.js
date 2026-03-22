const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'postgres',
        logging: false, // Désactive les logs SQL dans la console pour plus de clarté
        dialectOptions: {
            // Utile si vous déployez sur Render/Railway (nécessite SSL)
            // ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
        }
    }
);

// Test de la connexion
const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ Connexion à PostgreSQL réussie.');
    } catch (error) {
        console.error('❌ Impossible de se connecter à la base de données:', error);
    }
};

testConnection();

module.exports = sequelize;