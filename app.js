const express = require('express');
const mongoose = require('mongoose');
const routes = require('./src/routes/routes');

const app = express();

// Config JSON response
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Get routes
app.use('/', routes);


const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;

mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.yk8n8tr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
    .then(() => {
        app.listen(3000);
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
    console.log(err);
})