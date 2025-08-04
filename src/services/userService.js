const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function authenticateUser(username, password) {
  const user = await prisma.user.findUnique({ where: { username } });
  if (!user) return null;
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return null;
  return user;
}

async function getUserById(id) {
  return prisma.user.findUnique({ where: { id }, select: { id: true, username: true, createdAt: true } });
}

async function createUser(username, password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  return prisma.user.create({ data: { username, password: hashedPassword } });
}

module.exports = { authenticateUser, getUserById, createUser }; 