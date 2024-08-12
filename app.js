const express = require('express');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const helloWorld = require('./src/routes/helloWorld');
const authRegister = require('./src/routes/authRegister');
const authLogin = require('./src/routes/authLogin');
const userHomePage = require('./src/routes/userHomePage');

const app = express();

// Config JSON response
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Config swagger
const swaggerOptions = {
        swaggerDefinition: {
            openapi: '3.0.0',
            info: {
                title: 'Minha API',
                version: '1.0.0',
                description: 'Documentação da API',
                contact: {
                    name: "Ayko Nascimento",
                    url: "https://github.com/AykoSousa",
                    email: "seuemail@dominio.com"
                },
                servers: [{
                    url: `http://localhost:${process.env.PORT}`,
                    description: "Servidor local"
                }]
            }
        },
        apis: ['./src/routes/*.js']
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Get routes
app.use('/api/v1/', helloWorld);
app.use('/api/v1/', authRegister);
app.use('/api/v1/', authLogin);
app.use('/api/v1/', userHomePage);

// DB variables and connection
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const clusterName = process.env.CLUSTER_NAME;

mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.yk8n8tr.mongodb.net/?retryWrites=true&w=majority&appName=${clusterName}`)
    .then(() => {
        app.listen(process.env.PORT);
        console.log('Connected to MongoDB!');
    })
    .catch((err) => {
    console.log(err);
});