const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Blog API Documentation',
            version: '1.0.0',
            description: 'API simple pour la gestion d’un blog',
        },
        servers: [{ url: 'http://localhost:3000' }],
    },
    apis: ['./src/routes/*.js'], // Où chercher les annotations
};

module.exports = swaggerJsdoc(options);