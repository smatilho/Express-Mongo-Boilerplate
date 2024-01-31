const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    return res.unauthorized('Unauthorized'); // No token, unauthorized
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.forbidden('Forbidden'); // Token is invalid
    }

    req.user = user;
    next();
  });
}

module.exports = authenticateToken;