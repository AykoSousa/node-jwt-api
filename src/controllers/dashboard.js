const dasboard = async (req, res) => {
    const id = req.params.id;
    const user = await User.findById(id, '-password');
    if(!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'Welcome to the dashboard!' });
}

module.exports = dasboard;