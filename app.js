const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();

// Config JSON response
app.use(express.json());

// Models
const User = require('./models/User');

// Routes
app.get('/', (req, res) => {
    res.json({ message: 'Hello World!' });
});

app.get('/user/:id', checkToken, async (req, res) => {
    const id = req.params.id;
    const user = await User.findById(id, '-password');
    if(!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'Welcome to the dashboard!' });
})

function checkToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];

    if(!token) {
        return res.status(401).json({message: "Access denied"})
    }

    try {
        const secret = process.env.SECRET;
        jwt.verify(token, secret);
        next();
    } catch (err) {
        res.status(400).json({message: "Invalid token"})
    }
}

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

    try {
        const secret = process.env.SECRET
        const token = jwt.sign({
            id: user._id,
        },
        secret,
    )
    res.status(200).json({
        message: "Authentication succefully!",
        token: token
    })
    } catch (err) {
        res.status(500).json({message: "Internal server error!"});
        console.error(err);
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