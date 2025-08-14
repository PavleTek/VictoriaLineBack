const prisma = require("../../prisma/prisma");

async function getAllRoles() {
  return prisma.role.findMany({
    select: {
      id: true,
      name: true,
      users: {
        select: {
          user: {
            select: {
              id: true,
              username: true,
              firstName: true,
              lastName: true
            }
          }
        }
      }
    },
    orderBy: {
      name: 'asc'
    }
  });
}

async function getRoleById(id) {
  return prisma.role.findUnique({
    where: { id: parseInt(id) },
    select: {
      id: true,
      name: true,
      users: {
        select: {
          user: {
            select: {
              id: true,
              username: true,
              firstName: true,
              lastName: true
            }
          }
        }
      }
    }
  });
}

async function createRole(roleData) {
  return prisma.role.create({
    data: {
      name: roleData.name
    },
    select: {
      id: true,
      name: true
    }
  });
}

async function updateRole(id, roleData) {
  return prisma.role.update({
    where: { id: parseInt(id) },
    data: {
      name: roleData.name
    },
    select: {
      id: true,
      name: true
    }
  });
}

async function deleteRole(id) {
  // First delete all user-role associations
  await prisma.userRole.deleteMany({
    where: { roleId: parseInt(id) }
  });

  // Then delete the role
  await prisma.role.delete({
    where: { id: parseInt(id) }
  });

  return { message: "Role deleted successfully" };
}

module.exports = {
  getAllRoles,
  getRoleById,
  createRole,
  updateRole,
  deleteRole
}; 