require('dotenv').config();
const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger/swaggerConfig');
const sequelize = require('./config/database');
const articleRoutes = require('./routes/articleRoutes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/api/articles', articleRoutes);

// Database Sync & Start
const PORT = process.env.PORT || 3000;
sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Serveur lancé sur http://localhost:${PORT}`);
        console.log(`Documentation disponible sur http://localhost:${PORT}/api-docs`);
    });
});