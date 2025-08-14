const prisma = require("../../prisma/prisma");

// Get all Chilean companies
async function getAllChileanCompanies() {
  return prisma.chileanCompany.findMany({
    include: {
      designatedVendor: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          username: true,
        },
      },
      designatedOperator: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          username: true,
        },
      },
    },
    orderBy: {
      id: "asc",
    },
  });
}

// Get a single Chilean company by ID
async function getChileanCompanyById(id) {
  return prisma.chileanCompany.findUnique({
    where: { id: parseInt(id) },
    include: {
      designatedVendor: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          username: true,
        },
      },
      designatedOperator: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          username: true,
        },
      },
    },
  });
}

// Get a Chilean company by RUT
async function getChileanCompanyByRut(rut) {
  return prisma.chileanCompany.findUnique({
    where: { rut },
  });
}

// Create a new Chilean company
async function createChileanCompany(companyData) {
  return prisma.chileanCompany.create({
    data: {
      name: companyData.name || null,
      rut: companyData.rut || null,
      CodeIATA: companyData.CodeIATA || null,
      SiiResNumber: companyData.SiiResNumber
        ? parseInt(companyData.SiiResNumber)
        : null,
      SiiResDate: companyData.SiiResDate
        ? new Date(companyData.SiiResDate)
        : null,
      InvoiceEnabledSii: companyData.InvoiceEnabledSii || false,
      SocialReason: companyData.SocialReason || null,
      email: companyData.email || null,
      phoneNumber: companyData.phoneNumber || null,
      representativeName: companyData.representativeName || null,
      representativeRut: companyData.representativeRut || null,
      bookSendingRut: companyData.bookSendingRut || null,
      ChecksPP: companyData.ChecksPP || null,
      Accountantname: companyData.Accountantname || null,
      AccountantRut: companyData.AccountantRut || null,
      firstCurrency: companyData.firstCurrency || null,
      firstMask: companyData.firstMask || null,
      firstConversion: companyData.firstConversion || null,
      secondCurrency: companyData.secondCurrency || null,
      secondConversion: companyData.secondConversion || null,
      secondMask: companyData.secondMask || null,
      thirdCurrencyd: companyData.thirdCurrencyd || null,
      thirdConversion: companyData.thirdConversion || null,
      thirdMask: companyData.thirdMask || null,
      vat: companyData.vat ? parseFloat(companyData.vat) : null,
      retention: companyData.retention ? parseFloat(companyData.retention) : null,
      designatedVendorId: companyData.designatedVendorId || null,
      designatedOperatorId: companyData.designatedOperatorId || null,
    },
    include: {
      designatedVendor: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          username: true,
        },
      },
      designatedOperator: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          username: true,
        },
      },
    },
  });
}

// Update a Chilean company
async function updateChileanCompany(id, companyData) {
  return prisma.chileanCompany.update({
    where: { id: parseInt(id) },
    data: {
      name: companyData.name || null,
      rut: companyData.rut || null,
      CodeIATA: companyData.CodeIATA || null,
      SiiResNumber: companyData.SiiResNumber
        ? parseInt(companyData.SiiResNumber)
        : null,
      SiiResDate: companyData.SiiResDate
        ? new Date(companyData.SiiResDate)
        : null,
      InvoiceEnabledSii: companyData.InvoiceEnabledSii || false,
      SocialReason: companyData.SocialReason || null,
      email: companyData.email || null,
      phoneNumber: companyData.phoneNumber || null,
      representativeName: companyData.representativeName || null,
      representativeRut: companyData.representativeRut || null,
      bookSendingRut: companyData.bookSendingRut || null,
      ChecksPP: companyData.ChecksPP || null,
      Accountantname: companyData.Accountantname || null,
      AccountantRut: companyData.AccountantRut || null,
      firstCurrency: companyData.firstCurrency || null,
      firstMask: companyData.firstMask || null,
      firstConversion: companyData.firstConversion || null,
      secondCurrency: companyData.secondCurrency || null,
      secondConversion: companyData.secondConversion || null,
      secondMask: companyData.secondMask || null,
      thirdCurrencyd: companyData.thirdCurrencyd || null,
      thirdConversion: companyData.thirdConversion || null,
      thirdMask: companyData.thirdMask || null,
      vat: companyData.vat ? parseFloat(companyData.vat) : null,
      retention: companyData.retention ? parseFloat(companyData.retention) : null,
      designatedVendorId: companyData.designatedVendorId || null,
      designatedOperatorId: companyData.designatedOperatorId || null,
    },
    include: {
      designatedVendor: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          username: true,
        },
      },
      designatedOperator: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          username: true,
        },
      },
    },
  });
}

// Delete a Chilean company
async function deleteChileanCompany(id) {
  return prisma.chileanCompany.delete({
    where: { id: parseInt(id) },
  });
}

// Get companies assigned to a user (as vendor or operator)
async function getUserDesignatedCompanies(userId) {
  return prisma.chileanCompany.findMany({
    where: {
      OR: [
        { designatedVendorId: parseInt(userId) },
        { designatedOperatorId: parseInt(userId) },
      ],
    },
    include: {
      designatedVendor: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          username: true,
        },
      },
      designatedOperator: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          username: true,
        },
      },
    },
    orderBy: {
      id: "asc",
    },
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
            mode: "insensitive",
          },
        },
        {
          rut: {
            contains: searchTerm,
          },
        },
      ],
    },
    include: {
      designatedVendor: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          username: true,
        },
      },
      designatedOperator: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          username: true,
        },
      },
    },
    orderBy: {
      id: "asc",
    },
  });
}

module.exports = {
  getAllChileanCompanies,
  getChileanCompanyById,
  getChileanCompanyByRut,
  createChileanCompany,
  updateChileanCompany,
  deleteChileanCompany,
  getUserDesignatedCompanies,
  searchChileanCompanies,
};
