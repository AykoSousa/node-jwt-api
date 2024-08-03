const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();

// Config JSON response
app.use(express.json());

// Models
const User = require('./models/User');

app.post('/auth/register', async(req, res) => {
    const {name, email, password, confirmpassword} = req.body;
    if(!name) {
        return res.status(400).json({message: 'Name is required'});
    }
    if(!email) {
        return res.status(400).json({message: 'Email is required'});
    }
    if(!password) {
        return res.status(400).json({message: 'Password is required'});
    }
    if(!confirmpassword) {
        return res.status(400).json({message: 'Password confirmation is required'});
    }
    if(password !== confirmpassword) {
        return res.status(400).json({message: 'Passwords do not match'});
    }

    const userExistis = await User.findOne({ email: email});
    if(userExistis) {
        return res.status(400).json({message: 'Email already exists'});
    }

    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = new User({
        name,
        email,
        password: passwordHash
    });

    try {
        await user.save();
        res.status(201).json({message: "User created succefully!"})

    } catch (err) {
        res.status(500).json({message: "Internal server error!"});
        console.error(err);
    }
});

app.post('/auth/login', async(req, res) => {
    const {email, password} = req.body;
    if(!email) {
        return res.status(400).json({message: 'Email is required'});
    }
    if(!password) {
        return res.status(400).json({message: 'Password is required'});
    }

    const user = await User.findOne({ email: email });

    if(!user) {
        return res.status(404).json({message: 'Email does not exist'});
    }

    const checkPassword = await bcrypt.compare(password, user.password);
    if(!checkPassword) {
        return res.status(400).json({message: 'Invalid password!'});
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