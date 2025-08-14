const { getUserRoles } = require('../services/userService');

async function managerMiddleware(req, res, next) {
  try {
    // First check if user is authenticated
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    // Get user roles
    const userRoles = await getUserRoles(req.user.id);
    
    // Check if user has admin or manager (Gerente) role
    const isAdmin = userRoles.roles.some(role => role.name === 'Admin');
    const isGerente = userRoles.roles.some(role => role.name === 'Gerente');
    
    if (!isAdmin && !isGerente) {
      return res.status(403).json({ error: 'Manager access required (Admin or Gerente role)' });
    }

    next();
  } catch (error) {
    console.error('Manager middleware error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = managerMiddleware;