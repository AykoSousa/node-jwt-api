const bcrypt = require('bcrypt');
const User = require('../models/User');

const registerUser = async(req, res) => {
    const {name, email, password, confirmpassword} = req.body;
    if(name.length <= 1) {
        return res.status(400).json({
            status: 400,
            message: 'Name must be at least 1 characters!'
        });
    }
    if(!name) {
        return res.status(400).json({
            status: 400,
            message: 'Name is required!'
        });
    }
    if(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!regex.test(email)) {
            return res.status(400).json({
                status: 400,
                message: 'Invalid email!'
            });
        }
    }
    if(!email) {
        return res.status(400).json({
            status: 400,
            message: 'Email is required!'
        });
    }
    if(password.length < 5) {
        return res.status(400).json({
            status: 400,
            message: 'Password must be at least 5 characters!'
        });
    }
    if(!password) {
        return res.status(400).json({
            status: 400,
            message: 'Password is required!'
        });
    }
    if(!confirmpassword) {
        return res.status(400).json({
            status: 400,
            message: 'Password confirmation is required!'
        });
    }
    if(password !== confirmpassword) {
        return res.status(400).json({
            status: 400,
            message: 'Passwords do not match!'
        });
    }

    const userExistis = await User.findOne({ email: email });

    if(userExistis) {
        return res.status(400).json({
            status: 400,
            message: 'Email already exists!'
        });
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
        res.status(201).json({
            status: 201,
            message: 'User created succefully!'
        });

    } catch (err) {
        res.status(500).json({
            status: 500,
            message: 'Internal server error!'
        });
        console.error(err);
    }
};

module.exports = registerUser;