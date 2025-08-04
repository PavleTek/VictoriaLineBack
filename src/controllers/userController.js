const express = require('express');
const { generateToken, authMiddleware } = require('../auth');
const { authenticateUser, getUserById } = require('../services/userService');

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

module.exports = router; 