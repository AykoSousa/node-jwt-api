const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const login = async(req, res) => {
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
};

module.exports = login;