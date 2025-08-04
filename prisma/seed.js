const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  // Create initial admin user
  const hashedPassword = await bcrypt.hash('admin123', 10);
  
  await prisma.user.upsert({
    where: { email: 'admin@berneyapp.com' },
    update: {},
    create: {
      email: 'admin@berneyapp.com',
      username: 'admin',
      password: hashedPassword,
      name: 'Admin',
      lastName: 'User',
      role: 'admin',
      organization: 'BerneyApp'
    }
  });

  // Create some sample Chilean companies
  await prisma.chileanCompany.createMany({
    data: [
      {
        name: 'Sample Company 1',
        rut: '123456789',
        // ... other fields
      }
    ],
    skipDuplicates: true
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 