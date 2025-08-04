const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Get all Chilean companies
async function getAllChileanCompanies() {
  return prisma.chileanCompany.findMany({
    orderBy: {
      name: 'asc'
    }
  });
}

// Get a single Chilean company by ID
async function getChileanCompanyById(id) {
  return prisma.chileanCompany.findUnique({
    where: { id: parseInt(id) }
  });
}

// Get a Chilean company by RUT
async function getChileanCompanyByRut(rut) {
  return prisma.chileanCompany.findUnique({
    where: { rut }
  });
}

// Create a new Chilean company
async function createChileanCompany(companyData) {
  return prisma.chileanCompany.create({
    data: {
      name: companyData.name,
      rut: companyData.rut,
      iataCode: companyData.iataCode,
      siiResolutionNumber: companyData.siiResolutionNumber ? parseInt(companyData.siiResolutionNumber) : null,
      siiResolutionDate: companyData.siiResolutionDate ? new Date(companyData.siiResolutionDate) : null,
      electronicInvoiceEnabled: companyData.electronicInvoiceEnabled || false,
      socialReason: companyData.socialReason,
      address: companyData.address,
      field: companyData.field,
      email: companyData.email,
      phoneNumber: companyData.phoneNumber
    }
  });
}

// Update a Chilean company
async function updateChileanCompany(id, companyData) {
  return prisma.chileanCompany.update({
    where: { id: parseInt(id) },
    data: {
      name: companyData.name,
      rut: companyData.rut,
      iataCode: companyData.iataCode,
      siiResolutionNumber: companyData.siiResolutionNumber ? parseInt(companyData.siiResolutionNumber) : null,
      siiResolutionDate: companyData.siiResolutionDate ? new Date(companyData.siiResolutionDate) : null,
      electronicInvoiceEnabled: companyData.electronicInvoiceEnabled,
      socialReason: companyData.socialReason,
      address: companyData.address,
      field: companyData.field,
      email: companyData.email,
      phoneNumber: companyData.phoneNumber
    }
  });
}

// Delete a Chilean company
async function deleteChileanCompany(id) {
  return prisma.chileanCompany.delete({
    where: { id: parseInt(id) }
  });
}

// Search Chilean companies by name or RUT
async function searchChileanCompanies(searchTerm) {
  return prisma.chileanCompany.findMany({
    where: {
      OR: [
        {
          name: {
            contains: searchTerm,
            mode: 'insensitive'
          }
        },
        {
          rut: {
            contains: searchTerm
          }
        }
      ]
    },
    orderBy: {
      name: 'asc'
    }
  });
}

module.exports = {
  getAllChileanCompanies,
  getChileanCompanyById,
  getChileanCompanyByRut,
  createChileanCompany,
  updateChileanCompany,
  deleteChileanCompany,
  searchChileanCompanies
}; 