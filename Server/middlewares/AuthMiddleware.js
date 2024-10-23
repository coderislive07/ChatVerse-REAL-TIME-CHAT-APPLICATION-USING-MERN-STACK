const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser'); 
const { JWT_KEY } = process.env;

const authenticateToken = (req, res, next) => {
  const token = req.cookies.jwtToken;

  if (!token) return res.status(401).json({ message: 'No token provided' });

  jwt.verify(token, JWT_KEY, (err, user) => {
    if (err) {
      console.error('Token verification failed:', err); // For debugging purpose
      return res.status(403).json({ message: 'Invalid token' });
    }
    
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
