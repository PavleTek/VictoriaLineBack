const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create contact types
  const contactTypes = [
    { name: 'Cliente' },
    { name: 'Proveedor' },
    { name: 'Agente' },
    { name: 'Transportista' },
    { name: 'Otro' }
  ];

  for (const contactType of contactTypes) {
    await prisma.contactType.upsert({
      where: { name: contactType.name },
      update: {},
      create: contactType,
    });
  }

  console.log('Contact types seeded successfully');

  // Create some sample contact persons
  const sampleContactPersons = [
    {
      contactTypeId: 1, // Cliente
      country: 'Chile',
      fullName: 'Empresa Ejemplo S.A.',
      rut: '12345678-9',
      lineOfBussines: 'Importación',
      address: 'Av. Providencia 123, Santiago',
      email: 'contacto@empresaejemplo.cl',
      phoneNumber: '+56 2 2345 6789',
      contactName: 'Juan Pérez',
      assignedEmployeeName: 'María González',
      seaVoucher: 'SEA001',
      skyVoucher: 'SKY001',
      landVoucher: 'LAND001',
      invoiceObservations: 'Facturar mensualmente',
      invoiceInfo: 'RUT: 12345678-9, Razón Social: Empresa Ejemplo S.A.'
    },
    {
      contactTypeId: 2, // Proveedor
      country: 'China',
      fullName: 'China Trading Co.',
      rut: '98765432-1',
      lineOfBussines: 'Exportación',
      address: 'Shanghai Port District, China',
      email: 'info@chinatrading.com',
      phoneNumber: '+86 21 1234 5678',
      contactName: 'Li Wei',
      assignedEmployeeName: 'Carlos Rodríguez',
      seaVoucher: 'SEA002',
      skyVoucher: '',
      landVoucher: '',
      invoiceObservations: 'Facturar por embarque',
      invoiceInfo: 'Invoice to: China Trading Co., Shanghai'
    }
  ];

  for (const contactPerson of sampleContactPersons) {
    await prisma.contactPerson.create({
      data: contactPerson,
    });
  }

  console.log('Sample contact persons created successfully');
}

// main()
//   .catch((e) => {
//     console.error(e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   }); 