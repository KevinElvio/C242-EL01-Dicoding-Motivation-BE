const jwt = require('jsonwebtoken');

const accessValidation = (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({
            message: 'Membutuhkan token'
        });
    }

    const parts = authorization.split(' ');
    if (parts[0] !== 'Bearer' || parts.length !== 2) {
        return res.status(401).json({
            message: 'Format token salah'
        });
    }

    const token = parts[1];
    try {
        const secret = process.env.JWT_SECRET;
        const decoded = jwt.verify(token, secret);
        req.userData = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Token tidak valid', error: error.message });
    }
};
module.exports = accessValidation;