const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const login = async(req, res) => {
    const { email, password } = req.body;
    if(!email) {
        return res.status(400).json({
            status: 400,
            message: 'Email is required!'
        });
    }
    if(!password) {
        return res.status(400).json({
            status: 400,
            message: 'Password is required!'
        });
    }

    const user = await User.findOne({ email: email });

    if(!user) {
        return res.status(404).json({
            status: 404,
            message: 'Incorrect email or password.'
        });
    }

    const checkPassword = await bcrypt.compare(password, user.password);
    if(!checkPassword) {
        return res.status(400).json({
            status: 404,
            message: 'Incorrect email or password.'
        });
    }

    try {
        const secret = process.env.SECRET
        const token = jwt.sign({
            id: user._id,
        },
        secret,
    )
    res.status(200).json({
        status: 200,
        message: 'Authentication successfully!',
        token: token
    })
    } catch (err) {
        res.status(500).json({
            status: 500,
            message: 'Internal server error!'
        });
        console.error(err);
    }
};

module.exports = login;