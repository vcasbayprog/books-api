const passport = require('passport');

// Verificar si el usuario está autenticado
const isAuthenticated = passport.authenticate('jwt', { session: false });

// Verificar si el usuario es administrador
const isAdmin = (req, res, next) => {
  if (req.user.role === 'admin') {
    return next();
  }
  return res.status(403).json({ message: 'Acceso denegado, no eres administrador' });
};

module.exports = { isAuthenticated, isAdmin };
