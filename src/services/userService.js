const prisma = require("../../prisma/prisma");
const bcrypt = require("bcryptjs");

async function authenticateUser(username, password) {
  const user = await prisma.user.findUnique({ where: { username } });
  if (!user) return null;
  
  // Check if user is active
  if (!user.active) return null;
  
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return null;
  
  // Update last access
  await updateLastAccess(user.id);
  
  return user;
}

async function getUserById(id) {
  return prisma.user.findUnique({
    where: { id },
    select: { 
      id: true, 
      username: true, 
      firstName: true,
      lastName: true,
      email: true,
      rut: true,
      address: true,
      profileColor: true,
      active: true,
      createdAt: true,
      lastAccess: true
    },
  });
}

async function getAllUsers() {
  return prisma.user.findMany({
    select: {
      id: true,
      username: true,
      firstName: true,
      lastName: true,
      email: true,
      rut: true,
      address: true,
      profileColor: true,
      active: true,
      createdAt: true,
      lastAccess: true,
      roles: {
        select: {
          role: {
            select: {
              id: true,
              name: true
            }
          }
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  });
}

async function createUser(userData) {
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  
  const user = await prisma.user.create({
    data: {
      username: userData.username,
      password: hashedPassword,
      firstName: userData.firstName || null,
      lastName: userData.lastName || null,
      email: userData.email || null,
      rut: userData.rut || null,
      address: userData.address || null,
      profileColor: userData.profileColor || "#E9D5FF",
      active: userData.active !== undefined ? userData.active : true
    },
    select: {
      id: true,
      username: true,
      firstName: true,
      lastName: true,
      email: true,
      rut: true,
      address: true,
      profileColor: true,
      active: true,
      createdAt: true
    }
  });

  // Assign roles if provided
  if (userData.roleIds && userData.roleIds.length > 0) {
    await assignRolesToUser(user.id, userData.roleIds);
  }

  return user;
}

async function updateUser(id, userData) {
  const updateData = {};
  
  if (userData.firstName !== undefined) updateData.firstName = userData.firstName;
  if (userData.lastName !== undefined) updateData.lastName = userData.lastName;
  if (userData.email !== undefined) updateData.email = userData.email;
  if (userData.rut !== undefined) updateData.rut = userData.rut;
  if (userData.address !== undefined) updateData.address = userData.address;
  if (userData.profileColor !== undefined) updateData.profileColor = userData.profileColor;
  if (userData.active !== undefined) updateData.active = userData.active;
  
  if (userData.password) {
    updateData.password = await bcrypt.hash(userData.password, 10);
  }
  
  const user = await prisma.user.update({
    where: { id: parseInt(id) },
    data: updateData,
    select: {
      id: true,
      username: true,
      firstName: true,
      lastName: true,
      email: true,
      rut: true,
      address: true,
      profileColor: true,
      active: true,
      createdAt: true
    }
  });

  // Update roles if provided
  if (userData.roleIds !== undefined) {
    await updateUserRoles(id, userData.roleIds);
  }

  return user;
}

async function deleteUser(id) {
  // First delete user roles
  await prisma.userRole.deleteMany({
    where: { userId: parseInt(id) }
  });

  // Then delete the user
  await prisma.user.delete({
    where: { id: parseInt(id) }
  });

  return { message: "User deleted successfully" };
}

async function getUserRoles(userId) {
  const userRoles = await prisma.userRole.findMany({
    where: { userId: parseInt(userId) },
    select: {
      role: {
        select: {
          id: true,
          name: true
        }
      }
    }
  });

  return {
    roles: userRoles.map(ur => ur.role)
  };
}

async function assignRolesToUser(userId, roleIds) {
  const userRoles = roleIds.map(roleId => ({
    userId: parseInt(userId),
    roleId: parseInt(roleId)
  }));

  await prisma.userRole.createMany({
    data: userRoles,
    skipDuplicates: true
  });
}

async function updateUserRoles(userId, roleIds) {
  // Remove existing roles
  await prisma.userRole.deleteMany({
    where: { userId: parseInt(userId) }
  });

  // Add new roles
  if (roleIds.length > 0) {
    await assignRolesToUser(userId, roleIds);
  }
}

async function updateLastAccess(userId) {
  await prisma.user.update({
    where: { id: parseInt(userId) },
    data: { lastAccess: new Date() }
  });
}

async function updateUserProfile(id, profileData) {
  const updateData = {};
  
  // Only allow updating specific fields
  if (profileData.firstName) updateData.firstName = profileData.firstName;
  if (profileData.lastName) updateData.lastName = profileData.lastName;
  if (profileData.email) updateData.email = profileData.email;
  if (profileData.rut) updateData.rut = profileData.rut;
  if (profileData.address) updateData.address = profileData.address;
  if (profileData.profileColor) updateData.profileColor = profileData.profileColor;
  
  // Handle password update separately (needs hashing)
  if (profileData.password) {
    updateData.password = await bcrypt.hash(profileData.password, 10);
  }
  
  return prisma.user.update({
    where: { id },
    data: updateData,
    select: { 
      id: true, 
      username: true, 
      firstName: true,
      lastName: true,
      email: true,
      rut: true,
      address: true,
      profileColor: true,
      active: true,
      createdAt: true 
    },
  });
}

async function createUser(username, password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  return prisma.user.create({ data: { username, password: hashedPassword } });
}

module.exports = { 
  authenticateUser, 
  getUserById, 
  updateUserProfile, 
  createUser,
  getAllUsers,
  createUser: createUser,
  updateUser,
  deleteUser,
  getUserRoles,
  assignRolesToUser,
  updateUserRoles,
  updateLastAccess
};
