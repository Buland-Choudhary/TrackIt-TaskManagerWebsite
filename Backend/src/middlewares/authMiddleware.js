const jwt = require('jsonwebtoken');

// Middleware to verify JWT token
const authenticateUser = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Assumes "Bearer <token>"
  if (!token) {
    return res.status(403).json({ message: 'Access denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    //console.log('Decoded user:', decoded);
    req.user = decoded; // Attach decoded user info to the request
    next(); // Proceed to next middleware/route
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

module.exports = { authenticateUser };
