const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();

// Config JSON response
app.use(express.json());

app.post('/auth/register', async(req, res) => {
    const {name, email, password, confirmpassword} = req.body;
    if(!name) {
        return res.status(400).json({message: 'Name is required'});
    }
});

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