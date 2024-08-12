const User = require('../models/User');

const homePage = async (req, res) => {
    const id = req.params.id;
    const user = await User.findById(id, '-password');
    if(!user) {
        return res.status(404).json({
            status: 404, 
            message: 'User not found!' 
        });
    }

    res.status(200).json({
        status: 200, 
        message: 'Welcome to your profile!' 
    });
}

module.exports = homePage;