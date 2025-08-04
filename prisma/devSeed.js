const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
import { ASL } from "../../mainClasses";

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
    name: "PuertoLoco",
    country: "Chile",
    address: "Mapocho 1",
    onuCode: "398118",
    countryCode: "SCL",
    portCode: "anm121",
  },
  {
    name: "PuertoChico",
    country: "Mexico",
    address: "Via de Tacos 22",
    onuCode: "123125",
    countryCode: "MEX",
    portCode: "mex38112",
  },
  {
    name: "Puertecillo",
    country: "Chile",
    address: "Direccion",
    onuCode: "398118",
    countryCode: "SCL",
    portCode: "surf120",
  },
];

const vesselData = [
  { name: "Barquito1" },
  { name: "Perla Negra" },
  { name: "Titanic" },
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
    ASLType: [ASL.MARITIMO],
    costType: { id: 1, name: "Costos De Servicio" },
  },
  {
    name: "Almacenaje",
    ASLType: [ASL.MARITIMO],
    costType: { id: 1, name: "Costos De Servicio" },
  },
  {
    name: "AWB",
    ASLType: [ASL.MARITIMO],
    costType: { id: 1, name: "Costos De Servicio" },
  },
  {
    name: "Bodegaje",
    ASLType: [ASL.MARITIMO],
    costType: { id: 1, name: "Costos De Servicio" },
  },
  {
    name: "Collect Fee",
    ASLType: [ASL.MARITIMO],
    costType: { id: 1, name: "Costos De Servicio" },
  },
  {
    name: "Courrier",
    ASLType: [ASL.MARITIMO],
    costType: { id: 1, name: "Costos De Servicio" },
  },
  {
    name: "Flete",
    ASLType: [ASL.MARITIMO],
    costType: { id: 1, name: "Costos De Servicio" },
  },
  {
    name: "Custome Clearance",
    ASLType: [ASL.MARITIMO],
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

const templateData = [
  { name: "tempalte" },
  { name: "template" },
  { name: "template" },
];

const landTransportTypeDAta = [
  { name: "Camion" },
  { name: "Tren" },
  { name: "Rapi" },
];

const roleData = [
  { id: 1, name: "Admin" },
  { id: 2, name: "Regular" },
];

const hashedPassword1 = await bcrypt.hash("asdf", 10);

const userData = [
  {
    username: "Admin",
    firstName: "Pavle",
    lastName: "Markovic",
    rut: "21.123.765-3",
    address: "Mi Casa 999",
    email: "mpavle134@gmail.com",
    password: hashedPassword1,
    role: { id: 1, name: "Admin" },
    permissions: [],
  },
  {
    username: "Lucas",
    firstName: "Lucas",
    lastName: "Berney",
    rut: "21.000.111-k",
    address: "Una Casa 222",
    email: "berney@gmail.com",
    password: hashedPassword1,
    role: { id: 2, name: "Regular" },
    permissions: [],
  },
  {
    username: "Berney",
    firstName: "Papa De Lucas",
    lastName: "Bereny",
    rut: "21.555.111-1",
    address: "Una Casa 222",
    email: "BerneyGrande@gmail.com",
    password: hashedPassword1,
    role: { id: 2, name: "Regular" },
    permissions: [],
  },
];

async function main() {
  // Create initial admin user
  await prisma.user.upsert({
    where: { email: "admin@berneyapp.com" },
    update: {},
    create: {
      email: "admin@berneyapp.com",
      username: "admin",
      password: hashedPassword,
      name: "Admin",
      lastName: "User",
      role: "admin",
      permissions: [],
      organization: "BerneyApp",
    },
  });

  // Create some sample Chilean companies
  await prisma.chileanCompany.createMany({
    data: [
      {
        name: "Sample Company 1",
        rut: "123456789",
        // ... other fields
      },
    ],
    skipDuplicates: true,
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
