const jwt = require('jsonwebtoken');
const secret = 'super secret string'

function createToken(id) {
    return jwt.sign({ id }, secret, { expiresIn: 60 * 60 });
}

function verifyToken(token) {
    return jwt.verify(token, secret);
}

function checkAuthMiddleware(req, res, next) {
    try {
        const token = req.cookies.token
        if (!token) {
            console.log('No token');
            return res.status(401).json('Token not found');
        }
        try {
            const validatedToken = verifyToken(token);
            res.locals.token = validatedToken;
        } catch (error) {
            console.log('Invalid token');
            return res.status(401).json('Invalid token');
        }
        next();
    } catch (error) {
        res.status(401).json(error.message);
    }
}

module.exports = { createToken, verifyToken, checkAuthMiddleware };