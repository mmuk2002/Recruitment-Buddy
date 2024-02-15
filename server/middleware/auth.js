// server/middleware/auth.js

const admin = require('../config/firebaseAdmin');

const authMiddleware = async (req, res, next) => {
  const header = req.headers.authorization;

  if (!header) {
    return res.status(401).json({ message: 'Authorization header is missing' });
  }

  if (!header.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authorization header is malformed' });
  }

  const token = header.split('Bearer ')[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    // Attach only the user ID (or other necessary info) to the request object
    req.user = { uid: decodedToken.uid };
    next();
  } catch (error) {
    res.status(403).json({ message: 'Invalid or expired token' });
  }
};

module.exports = authMiddleware;