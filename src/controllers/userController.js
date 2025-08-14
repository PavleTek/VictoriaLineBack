const express = require('express');
const { generateToken, authMiddleware } = require('../auth');
const { 
  authenticateUser, 
  getUserById, 
  updateUserProfile,
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  getUserRoles
} = require('../services/userService');
const adminMiddleware = require('../middleware/adminMiddleware');
const managerMiddleware = require('../middleware/managerMiddleware');

const router = express.Router();

// Login route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await authenticateUser(username, password);
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });
  const token = generateToken(user);
  res.json({ token, user: { id: user.id, username: user.username } });
});

// Dummy logout route
router.post('/logout', (req, res) => {
  res.json({ message: 'Logged out' });
});

// Protected route to get user info
router.get('/me', authMiddleware, async (req, res) => {
  const user = await getUserById(req.user.id);
  res.json({ user });
});

// Protected route to update user profile
router.put('/profile', authMiddleware, async (req, res) => {
  try {
    const updatedUser = await updateUserProfile(req.user.id, req.body);
    res.json({ user: updatedUser });
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(400).json({ error: 'Failed to update profile' });
  }
});

// Manager-only routes for users management (Admin or Gerente)
router.get('/users', authMiddleware, managerMiddleware, async (req, res) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

router.get('/users/:id', authMiddleware, managerMiddleware, async (req, res) => {
  try {
    const user = await getUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

router.post('/users', authMiddleware, managerMiddleware, async (req, res) => {
  try {
    const user = await createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(400).json({ error: 'Failed to create user' });
  }
});

router.put('/users/:id', authMiddleware, managerMiddleware, async (req, res) => {
  try {
    const user = await updateUser(req.params.id, req.body);
    res.json(user);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(400).json({ error: 'Failed to update user' });
  }
});

router.delete('/users/:id', authMiddleware, managerMiddleware, async (req, res) => {
  try {
    const result = await deleteUser(req.params.id);
    res.json(result);
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(400).json({ error: 'Failed to delete user' });
  }
});

// Get user roles
router.get('/users/:id/roles', authMiddleware, async (req, res) => {
  try {
    const roles = await getUserRoles(req.params.id);
    res.json(roles);
  } catch (error) {
    console.error('Error fetching user roles:', error);
    res.status(500).json({ error: 'Failed to fetch user roles' });
  }
});

module.exports = router; 