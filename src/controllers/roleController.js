const express = require('express');
const { authMiddleware } = require('../auth');
const managerMiddleware = require('../middleware/managerMiddleware');
const {
  getAllRoles,
  getRoleById,
  createRole,
  updateRole,
  deleteRole
} = require('../services/roleService');

const router = express.Router();

// All routes require manager access (Admin or Gerente)
router.use(authMiddleware, managerMiddleware);

// Get all roles
router.get('/', async (req, res) => {
  try {
    const roles = await getAllRoles();
    res.json(roles);
  } catch (error) {
    console.error('Error fetching roles:', error);
    res.status(500).json({ error: 'Failed to fetch roles' });
  }
});

// Get role by ID
router.get('/:id', async (req, res) => {
  try {
    const role = await getRoleById(req.params.id);
    if (!role) {
      return res.status(404).json({ error: 'Role not found' });
    }
    res.json(role);
  } catch (error) {
    console.error('Error fetching role:', error);
    res.status(500).json({ error: 'Failed to fetch role' });
  }
});

// Create new role
router.post('/', async (req, res) => {
  try {
    const role = await createRole(req.body);
    res.status(201).json(role);
  } catch (error) {
    console.error('Error creating role:', error);
    res.status(400).json({ error: 'Failed to create role' });
  }
});

// Update role
router.put('/:id', async (req, res) => {
  try {
    const role = await updateRole(req.params.id, req.body);
    res.json(role);
  } catch (error) {
    console.error('Error updating role:', error);
    res.status(400).json({ error: 'Failed to update role' });
  }
});

// Delete role
router.delete('/:id', async (req, res) => {
  try {
    const result = await deleteRole(req.params.id);
    res.json(result);
  } catch (error) {
    console.error('Error deleting role:', error);
    res.status(400).json({ error: 'Failed to delete role' });
  }
});

module.exports = router; 