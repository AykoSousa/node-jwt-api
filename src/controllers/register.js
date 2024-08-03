const bcrypt = require('bcrypt');
const User = require('../models/User');

const registerUser = async(req, res) => {
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
};

module.exports = registerUser;