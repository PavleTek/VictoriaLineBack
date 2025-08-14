const { getUserRoles } = require('../services/userService');

async function adminMiddleware(req, res, next) {
  try {
    // First check if user is authenticated
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    // Get user roles
    const userRoles = await getUserRoles(req.user.id);
    
    // Check if user has admin role
    const isAdmin = userRoles.roles.some(role => role.name === 'Admin');
    
    if (!isAdmin) {
      return res.status(403).json({ error: 'Admin access required' });
    }

    next();
  } catch (error) {
    console.error('Admin middleware error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = adminMiddleware; 