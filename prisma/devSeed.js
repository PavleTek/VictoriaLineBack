const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

const cargoTypeData = [{ name: "General" }, { name: "IMO (Peligrosa)" }];

const purchasClauseData = [
  { name: "EXW" },
  { name: "FCA" },
  { name: "FOB" },
  { name: "DAP" },
];

const cargoConditionData = [
  { name: "FCL/FCL" },
  { name: "FCL/LCL" },
  { name: "LCL/FCL" },
  { name: "LCL/LCL" },
];

const freightConditionData = [
  { name: "Condicion Flete 1" },
  { name: "Condicion Flete 2 " },
];

const serviceTypeData = [
  { name: "Directo" },
  { name: "Transbordo" },
  { name: "Coloader" },
];

const containerStatusData = [
  { name: "CY/CY" },
  { name: "CY/FCS" },
  { name: "CFS/CY" },
  { name: "CFS/CFS" },
];

const houseTypeData = [
  { name: "House Tipo 1" },
  { name: "House Tipo 2" },
  { name: "House Tipo 3" },
];

const incotermData = [
  { name: "Incoterm 1" },
  { name: "Incoterm 2" },
  { name: "incoterm 3" },
];

const containerTypeData = [
  { name: "Tipo A" },
  { name: "Tipo B" },
  { name: "Tipo Z" },
];

const portData = [
  {
    id: "port-001",
    name: "PuertoLoco",
    country: "Chile",
    address: "Mapocho 1",
    type: "Maritime",
    onuCode: "398118",
    countryCode: "SCL",
    portCode: "anm121",
    location: "Santiago",
  },
  {
    id: "port-002",
    name: "PuertoChico",
    country: "Mexico",
    address: "Via de Tacos 22",
    type: "Maritime",
    onuCode: "123125",
    countryCode: "MEX",
    portCode: "mex38112",
    location: "Mexico City",
  },
  {
    id: "port-003",
    name: "Puertecillo",
    country: "Chile",
    address: "Direccion",
    type: "Maritime",
    onuCode: "398118",
    countryCode: "SCL",
    portCode: "surf120",
    location: "Valparaiso",
  },
];

const vesselData = [
  { name: "Barquito1", code: "BRK1", onuCode: "VSL001" },
  { name: "Perla Negra", code: "PN001", onuCode: "VSL002" },
  { name: "Titanic", code: "TIT001", onuCode: "VSL003" },
];

const contactTypeData = [
  { id: 1, name: "Almacenista" },
  { id: 2, name: "Cliente Nacional" },
  { id: 3, name: "Cliente Extranjero" },
  { id: 4, name: "Proveedor Nacional" },
  { id: 5, name: "Proveedor Extranjero" },
  { id: 6, name: "Naviera" },
  { id: 7, name: "AFP" },
  { id: 8, name: "Isapre" },
  { id: 9, name: "Linea Aerea" },
  { id: 10, name: "Empleado" },
  { id: 11, name: "Embarcador" },
  { id: 12, name: "Agente Extranjero" },
  { id: 13, name: "Agente Aduana" },
];

const contactData = [
  {
    contactType: { id: 2, name: "Cliente Nacional" },
    country: "Chile",
    fullName: "Pavle Markovic",
    rut: "21.922.393-5",
    lineOfBussines:
      "ACTIVIDADES DE CONSULTORIA DE INFORMATICA Y DE GESTION DE INSTALACIONES INFORMATICAS",
    address: "Mi Casa",
    email: "Pavle@gmail.com",
    phoneNumber: "+56976681234",
    contactName: "Pavle",
    assignedEmployeeName: "Lucas Berney",
    seaVoucher: "Voucher Maritimo",
    skyVouche: "Vouicher Aereo",
    landVoucher: "Voucher de Tierra",
    invoiceObservations: "Pago en negro",
    invoiceInfo: "Entregado",
  },
  {
    contactType: { id: 10, name: "Empleado" },
    country: "Chile",
    fullName: "Luca Berney",
    rut: "21.303.202-5",
    lineOfBussines: "Pasar el tiempo",
    address: "Su Casa",
    email: "barny@gmail.com",
    phoneNumber: "+56912344321",
    contactName: "Berney",
    assignedEmployeeName: "No tiene, el es empleado",
    seaVoucher: "Voucher Maritimo",
    skyVouche: "Vouicher Aereo",
    landVoucher: "Voucher de Tierra",
    invoiceObservations: "No se le paga",
    invoiceInfo: "0",
  },
  {
    contactType: { id: 5, name: "Proveedor Extranjero" },
    country: "Australia",
    fullName: "Peter Aguirre Cerda",
    rut: "no tienen rut los australianos",
    lineOfBussines:
      "ACTIVIDADES DE CONSULTORIA DE INFORMATICA Y DE GESTION DE INSTALACIONES INFORMATICAS",
    address: "Croc Street 123",
    email: "AusProvider@gmail.com",
    phoneNumber: "+21912344321",
    contactName: "Peter",
    assignedEmployeeName: "Luca Berney",
    seaVoucher: "Voucher Maritimo",
    skyVouche: "Vouicher Aereo",
    landVoucher: "Voucher de Tierra",
    invoiceObservations: "Pago monedas de oro",
    invoiceInfo: "En camino",
  },
];

const currencyData = [
  {
    name: "Dolar Americano",
    alias: "USD",
    parity: 1,
    usdConversion: 1,
    exchangeRateTaxableInvoice: 1,
    tcExemptInvoice: 1,
  },
  {
    name: "Peso Chileno",
    alias: "CLP",
    parity: 1,
    usdConversion: 950,
    exchangeRateTaxableInvoice: 1,
    tcExemptInvoice: 1,
  },
];

const costTypeData = [
  { id: 1, name: "Costos De Servicio" },
  { id: 2, name: "Costos En Destino" },
];

const invoiceConceptData = [
  {
    name: "Apertura",
    ASLType: JSON.stringify(["Maritimo"]),
    costType: { id: 1, name: "Costos De Servicio" },
  },
  {
    name: "Almacenaje",
    ASLType: JSON.stringify(["Maritimo"]),
    costType: { id: 1, name: "Costos De Servicio" },
  },
  {
    name: "AWB",
    ASLType: JSON.stringify(["Maritimo"]),
    costType: { id: 1, name: "Costos De Servicio" },
  },
  {
    name: "Bodegaje",
    ASLType: JSON.stringify(["Maritimo"]),
    costType: { id: 1, name: "Costos De Servicio" },
  },
  {
    name: "Collect Fee",
    ASLType: JSON.stringify(["Maritimo"]),
    costType: { id: 1, name: "Costos De Servicio" },
  },
  {
    name: "Courrier",
    ASLType: JSON.stringify(["Maritimo"]),
    costType: { id: 1, name: "Costos De Servicio" },
  },
  {
    name: "Flete",
    ASLType: JSON.stringify(["Maritimo"]),
    costType: { id: 1, name: "Costos De Servicio" },
  },
  {
    name: "Custome Clearance",
    ASLType: JSON.stringify(["Maritimo"]),
    costType: { id: 1, name: "Costos De Servicio" },
  },
];

const packageTypeData = [
  { name: "Cajon" },
  { name: "Cajas" },
  { name: "Granel" },
  { name: "Barril" },
  { name: "Palets" },
  { name: "Bidon" },
  { name: "Bolsa" },
  { name: "Jaulas" },
  { name: "Otros" },
];

const landTransportTypeData = [
  { name: "Camion" },
  { name: "Tren" },
  { name: "Rapi" },
];

const roleData = [
  { id: 1, name: "Admin" },
  { id: 2, name: "Vendedor" },
  { id: 3, name: "Operador" },
  { id: 4, name: "Gerente" },
];

const chileanCompanyData = [
  {
    name: "Empresa Chilena A",
    rut: "76.123.456-7",
    CodeIATA: "ECA001",
    SiiResNumber: 12345,
    SiiResDate: new Date("2023-01-15"),
    InvoiceEnabledSii: true,
    SocialReason: "Sociedad Anonima",
    email: "contacto@empresaa.cl",
    phoneNumber: "+56912345678",
    representativeName: "Juan Pérez",
    representativeRut: "12.345.678-9",
    bookSendingRut: "76.123.456-7",
    ChecksPP: "Checks PP A",
    Accountantname: "Contador A",
    AccountantRut: "11.111.111-1",
    firstCurrency: "CLP",
    firstMask: "###,###,###",
    firstConversion: "1",
    secondCurrency: "USD",
    secondConversion: "0.001",
    secondMask: "###,###.##",
    thirdCurrencyd: "EUR",
    thirdConversion: "0.0009",
    thirdMask: "###,###.##",
    vat: 19.0,
    retention: 0.0,
  },
  {
    name: "Empresa Chilena B",
    rut: "77.234.567-8",
    CodeIATA: "ECB002",
    SiiResNumber: 23456,
    SiiResDate: new Date("2023-02-20"),
    InvoiceEnabledSii: true,
    SocialReason: "Sociedad de Responsabilidad Limitada",
    email: "info@empresab.cl",
    phoneNumber: "+56923456789",
    representativeName: "María González",
    representativeRut: "13.456.789-0",
    bookSendingRut: "77.234.567-8",
    ChecksPP: "Checks PP B",
    Accountantname: "Contador B",
    AccountantRut: "22.222.222-2",
    firstCurrency: "USD",
    firstMask: "###,###.##",
    firstConversion: "1",
    secondCurrency: "CLP",
    secondConversion: "950",
    secondMask: "###,###,###",
    thirdCurrencyd: "EUR",
    thirdConversion: "0.85",
    thirdMask: "###,###.##",
    vat: 19.0,
    retention: 2.0,
  },
  {
    name: "Empresa Chilena C",
    rut: "78.345.678-9",
    CodeIATA: "ECC003",
    SiiResNumber: 34567,
    SiiResDate: new Date("2023-03-10"),
    InvoiceEnabledSii: false,
    SocialReason: "Empresa Individual de Responsabilidad Limitada",
    email: "ventas@empresac.cl",
    phoneNumber: "+56934567890",
    representativeName: "Carlos Silva",
    representativeRut: "14.567.890-1",
    bookSendingRut: "78.345.678-9",
    ChecksPP: "Checks PP C",
    Accountantname: "Contador C",
    AccountantRut: "33.333.333-3",
    firstCurrency: "EUR",
    firstMask: "###,###.##",
    firstConversion: "1",
    secondCurrency: "USD",
    secondConversion: "1.18",
    secondMask: "###,###.##",
    thirdCurrencyd: "CLP",
    thirdConversion: "1121",
    thirdMask: "###,###,###",
    vat: 19.0,
    retention: 1.5,
  },
];

const cargoDataSample = [
  {
    containerNumber: "CONT001",
    sealNumber: "SEAL001",
    packagesQuantity: 10,
    weightKg: 1000.50,
  },
  {
    containerNumber: "CONT002",
    sealNumber: "SEAL002",
    packagesQuantity: 5,
    weightKg: 500.25,
  },
  {
    containerNumber: "CONT003",
    sealNumber: "SEAL003",
    packagesQuantity: 15,
    weightKg: 1500.75,
  },
];

async function main() {
  console.log("Starting database seeding...");

  // Clear existing data
  await prisma.seaQuote.deleteMany();
  await prisma.cargoData.deleteMany();
  await prisma.contactPerson.deleteMany();
  await prisma.chileanCompany.deleteMany();
  await prisma.userRole.deleteMany();
  await prisma.user.deleteMany();
  await prisma.role.deleteMany();
  await prisma.port.deleteMany();
  await prisma.vessel.deleteMany();
  await prisma.contactType.deleteMany();
  await prisma.currency.deleteMany();
  await prisma.costType.deleteMany();
  await prisma.invoiceConcept.deleteMany();
  await prisma.packageType.deleteMany();
  await prisma.landTransportType.deleteMany();
  await prisma.cargoType.deleteMany();
  await prisma.cargoCondition.deleteMany();
  await prisma.containerType.deleteMany();
  await prisma.serviceType.deleteMany();
  await prisma.freightCondition.deleteMany();
  await prisma.purchaseClause.deleteMany();
  await prisma.containerStatus.deleteMany();
  await prisma.houseType.deleteMany();
  await prisma.incoterm.deleteMany();

  console.log("Cleared existing data");

  // Seed Roles
  console.log("Seeding roles...");
  for (const role of roleData) {
    await prisma.role.create({
      data: role,
    });
  }

  // Seed Users
  console.log("Seeding users...");
  const hashedPassword = await bcrypt.hash("asdf", 10);
  
  for (const userData of [
    {
      username: "Admin",
      firstName: "Pavle",
      lastName: "Markovic",
      rut: "21.123.765-3",
      address: "Mi Casa 999",
      email: "mpavle134@gmail.com",
      password: hashedPassword,
      roleId: 1,
    },
    {
      username: "Vendedor",
      firstName: "Lucas",
      lastName: "Berney",
      rut: "21.000.111-k",
      address: "Una Casa 222",
      email: "berney@gmail.com",
      password: hashedPassword,
      roleId: 2,
    },
    {
      username: "Operador",
      firstName: "Lucas",
      lastName: "Berney",
      rut: "21.000.222-k",
      address: "Una Casa 222",
      email: "operador@gmail.com",
      password: hashedPassword,
      roleId: 3,
    },
    {
      username: "Gerente",
      firstName: "Papa De Lucas",
      lastName: "Bereny",
      rut: "21.555.111-1",
      address: "Una Casa 222",
      email: "gerente@gmail.com",
      password: hashedPassword,
      roleId: 4,
    }
  ]) {
    const user = await prisma.user.create({
      data: {
        username: userData.username,
        firstName: userData.firstName,
        lastName: userData.lastName,
        rut: userData.rut,
        address: userData.address,
        email: userData.email,
        password: userData.password,
      },
    });

    await prisma.userRole.create({
      data: {
        userId: user.id,
        roleId: userData.roleId,
      },
    });
  }

  // Seed Contact Types
  console.log("Seeding contact types...");
  for (const contactType of contactTypeData) {
    await prisma.contactType.create({
      data: contactType,
    });
  }

  // Seed Contact Persons
  console.log("Seeding contact persons...");
  for (const contact of contactData) {
    await prisma.contactPerson.create({
      data: {
        contactTypeId: contact.contactType.id,
        country: contact.country,
        fullName: contact.fullName,
        rut: contact.rut,
        lineOfBussines: contact.lineOfBussines,
        address: contact.address,
        email: contact.email,
        phoneNumber: contact.phoneNumber,
        contactName: contact.contactName,
        assignedEmployeeName: contact.assignedEmployeeName,
        seaVoucher: contact.seaVoucher,
        skyVouche: contact.skyVouche,
        landVoucher: contact.landVoucher,
        invoiceObservations: contact.invoiceObservations,
        invoiceInfo: contact.invoiceInfo,
      },
    });
  }

  // Seed Chilean Companies
  console.log("Seeding Chilean companies...");
  for (const company of chileanCompanyData) {
    await prisma.chileanCompany.create({
      data: company,
    });
  }

  // Seed Ports
  console.log("Seeding ports...");
  for (const port of portData) {
    await prisma.port.create({
      data: port,
    });
  }

  // Seed Vessels
  console.log("Seeding vessels...");
  for (const vessel of vesselData) {
    await prisma.vessel.create({
      data: vessel,
    });
  }

  // Seed Container Types
  console.log("Seeding container types...");
  for (const containerType of containerTypeData) {
    await prisma.containerType.create({
      data: containerType,
    });
  }

  // Seed Cargo Types
  console.log("Seeding cargo types...");
  for (const cargoType of cargoTypeData) {
    await prisma.cargoType.create({
      data: cargoType,
    });
  }

  // Seed Cargo Conditions
  console.log("Seeding cargo conditions...");
  for (const cargoCondition of cargoConditionData) {
    await prisma.cargoCondition.create({
      data: cargoCondition,
    });
  }

  // Seed Service Types
  console.log("Seeding service types...");
  for (const serviceType of serviceTypeData) {
    await prisma.serviceType.create({
      data: serviceType,
    });
  }

  // Seed Freight Conditions
  console.log("Seeding freight conditions...");
  for (const freightCondition of freightConditionData) {
    await prisma.freightCondition.create({
      data: freightCondition,
    });
  }

  // Seed Purchase Clauses
  console.log("Seeding purchase clauses...");
  for (const purchaseClause of purchasClauseData) {
    await prisma.purchaseClause.create({
      data: purchaseClause,
    });
  }

  // Seed Container Status
  console.log("Seeding container status...");
  for (const containerStatus of containerStatusData) {
    await prisma.containerStatus.create({
      data: containerStatus,
    });
  }

  // Seed House Types
  console.log("Seeding house types...");
  for (const houseType of houseTypeData) {
    await prisma.houseType.create({
      data: houseType,
    });
  }

  // Seed Incoterms
  console.log("Seeding incoterms...");
  for (const incoterm of incotermData) {
    await prisma.incoterm.create({
      data: incoterm,
    });
  }

  // Seed Land Transport Types
  console.log("Seeding land transport types...");
  for (const landTransportType of landTransportTypeData) {
    await prisma.landTransportType.create({
      data: landTransportType,
    });
  }

  // Seed Package Types
  console.log("Seeding package types...");
  for (const packageType of packageTypeData) {
    await prisma.packageType.create({
      data: packageType,
    });
  }

  // Seed Currencies
  console.log("Seeding currencies...");
  for (const currency of currencyData) {
    await prisma.currency.create({
      data: currency,
    });
  }

  // Seed Cost Types
  console.log("Seeding cost types...");
  for (const costType of costTypeData) {
    await prisma.costType.create({
      data: costType,
    });
  }

  // Seed Invoice Concepts
  console.log("Seeding invoice concepts...");
  for (const invoiceConcept of invoiceConceptData) {
    await prisma.invoiceConcept.create({
      data: {
        name: invoiceConcept.name,
        ASLType: invoiceConcept.ASLType,
        costTypeId: invoiceConcept.costType.id,
      },
    });
  }

  // Seed Cargo Data
  console.log("Seeding cargo data...");
  for (const cargoData of cargoDataSample) {
    await prisma.cargoData.create({
      data: cargoData,
    });
  }

  console.log("Database seeding completed successfully!");
}

// main()
//   .catch((e) => {
//     console.error(e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });
