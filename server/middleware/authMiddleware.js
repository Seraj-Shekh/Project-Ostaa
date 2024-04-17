// middleware/authMiddleware.js
const jwtUtils = require('../utils/jwtUtils');

const authenticateUser = (req, res, next) => {
    // Check if token exists in headers
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ success: false, error: 'Unauthorized' });
    }

    // Verify the token
    const decoded = jwtUtils.verifyToken(token);

    if (!decoded) {
        return res.status(401).json({ success: false, error: 'Invalid token' });
    }

    // Attach user information to request object
    req.user = decoded.user;
    next();
};

module.exports = authenticateUser;
