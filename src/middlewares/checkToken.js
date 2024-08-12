const jwt = require('jsonwebtoken');

function checkToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];

    if(!token) {
        return res.status(401).json({
            status: 401,
            message: 'Access denied!'
        });
    }

    try {
        const secret = process.env.SECRET;
        jwt.verify(token, secret);
        next();
    } catch (err) {
        res.status(400).json({
            status: 400,
            message: 'Invalid token.'
        });
    }
}

module.exports = checkToken;