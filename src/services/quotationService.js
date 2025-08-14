const prisma = require("../../prisma/prisma");

// Helper function to create snapshots
async function createSnapshots(data) {
  const snapshots = {};
  
  // Create incoterm snapshot
  if (data.incotermId) {
    const incoterm = await prisma.incoterm.findUnique({
      where: { id: parseInt(data.incotermId) }
    });
    snapshots.incotermSnapshot = incoterm;
  }
  
  // Create currency snapshot
  if (data.currencyId) {
    const currency = await prisma.currency.findUnique({
      where: { id: parseInt(data.currencyId) }
    });
    snapshots.currencySnapshot = currency;
  }
  
  // Create cargo type snapshot
  if (data.cargoTypeId) {
    const cargoType = await prisma.cargoType.findUnique({
      where: { id: parseInt(data.cargoTypeId) }
    });
    snapshots.cargoTypeSnapshot = cargoType;
  }
  
  return snapshots;
}

// Helper function to process cargo data snapshots
async function processCargoData(cargoData) {
  if (!cargoData || !Array.isArray(cargoData)) return [];
  
  const processedCargoData = [];
  
  for (const item of cargoData) {
    const processedItem = { ...item };
    
    // Create container type snapshot
    if (item.containerTypeId) {
      const containerType = await prisma.containerType.findUnique({
        where: { id: parseInt(item.containerTypeId) }
      });
      processedItem.containerTypeSnapshot = containerType;
      delete processedItem.containerTypeId;
    }
    
    // Create cargo type snapshot for this item
    if (item.cargoTypeId) {
      const cargoType = await prisma.cargoType.findUnique({
        where: { id: parseInt(item.cargoTypeId) }
      });
      processedItem.cargoTypeSnapshot = cargoType;
      delete processedItem.cargoTypeId;
    }
    
    processedCargoData.push(processedItem);
  }
  
  return processedCargoData;
}

// Sea Quotation CRUD Operations
async function createSeaQuote(quoteData, userId) {
  const snapshots = await createSnapshots(quoteData);
  
  // Create port snapshots
  if (quoteData.originPortId) {
    const originPort = await prisma.port.findUnique({
      where: { id: quoteData.originPortId }
    });
    snapshots.originPortSnapshot = originPort;
  }
  
  if (quoteData.destinationPortId) {
    const destinationPort = await prisma.port.findUnique({
      where: { id: quoteData.destinationPortId }
    });
    snapshots.destinationPortSnapshot = destinationPort;
  }
  
  // Process cargo data
  const processedCargoData = await processCargoData(quoteData.cargoData);
  
  const seaQuote = await prisma.seaQuote.create({
    data: {
      designatedVendorId: quoteData.designatedVendorId || null,
      designatedOperatorId: quoteData.designatedOperatorId || null,
      lastUpdatedById: userId,
      
      clientType: quoteData.clientType,
      clientString: quoteData.clientString || null,
      clientChileanCompanyId: quoteData.clientChileanCompanyId || null,
      clientContactPersonId: quoteData.clientContactPersonId || null,
      
      incotermSnapshot: snapshots.incotermSnapshot || {},
      originPortSnapshot: snapshots.originPortSnapshot || {},
      destinationPortSnapshot: snapshots.destinationPortSnapshot || {},
      cargoTypeSnapshot: snapshots.cargoTypeSnapshot || {},
      currencySnapshot: snapshots.currencySnapshot || {},
      
      validityDate: quoteData.validityDate ? new Date(quoteData.validityDate) : null,
      localConditions: quoteData.localConditions || null,
      localExpenses: quoteData.localExpenses || null,
      demurrageTime: quoteData.demurrageTime || null,
      dthc: quoteData.dthc || null,
      appliedCurrency: quoteData.appliedCurrency || null,
      localOfficeData: quoteData.localOfficeData || null,
      
      cargoData: processedCargoData,
      
      status: quoteData.status || 'in_progress'
    },
    include: {
      designatedVendor: {
        select: { id: true, firstName: true, lastName: true, username: true }
      },
      designatedOperator: {
        select: { id: true, firstName: true, lastName: true, username: true }
      },
      lastUpdatedBy: {
        select: { id: true, firstName: true, lastName: true, username: true }
      },
      clientChileanCompany: {
        select: { id: true, name: true, rut: true }
      },
      clientContactPerson: {
        select: { id: true, fullName: true, email: true }
      }
    }
  });
  
  return seaQuote;
}

async function getSeaQuotes(options = {}) {
  const {
    page = 1,
    limit = 15,
    userId = null,
    myQuotes = false,
    filters = {}
  } = options;
  
  const skip = (page - 1) * limit;
  
  let whereClause = {};
  
  // Filter for user's quotes
  if (myQuotes && userId) {
    whereClause.OR = [
      { designatedVendorId: userId },
      { designatedOperatorId: userId },
      { lastUpdatedById: userId }
    ];
  }
  
  // Apply filters
  if (filters.status) {
    whereClause.status = filters.status;
  }
  
  if (filters.clientType) {
    whereClause.clientType = filters.clientType;
  }
  
  if (filters.clientChileanCompanyId) {
    whereClause.clientChileanCompanyId = parseInt(filters.clientChileanCompanyId);
  }
  
  if (filters.clientContactPersonId) {
    whereClause.clientContactPersonId = parseInt(filters.clientContactPersonId);
  }
  
  if (filters.designatedVendorId) {
    whereClause.designatedVendorId = parseInt(filters.designatedVendorId);
  }
  
  if (filters.designatedOperatorId) {
    whereClause.designatedOperatorId = parseInt(filters.designatedOperatorId);
  }
  
  const [quotes, total] = await Promise.all([
    prisma.seaQuote.findMany({
      where: whereClause,
      skip,
      take: limit,
      orderBy: { creationDate: 'desc' },
      include: {
        designatedVendor: {
          select: { id: true, firstName: true, lastName: true, username: true }
        },
        designatedOperator: {
          select: { id: true, firstName: true, lastName: true, username: true }
        },
        lastUpdatedBy: {
          select: { id: true, firstName: true, lastName: true, username: true }
        },
        clientChileanCompany: {
          select: { id: true, name: true, rut: true }
        },
        clientContactPerson: {
          select: { id: true, fullName: true, email: true }
        }
      }
    }),
    prisma.seaQuote.count({ where: whereClause })
  ]);
  
  return {
    quotes,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      hasNext: page < Math.ceil(total / limit),
      hasPrev: page > 1
    }
  };
}

async function getSeaQuoteById(id) {
  return prisma.seaQuote.findUnique({
    where: { id: parseInt(id) },
    include: {
      designatedVendor: {
        select: { id: true, firstName: true, lastName: true, username: true }
      },
      designatedOperator: {
        select: { id: true, firstName: true, lastName: true, username: true }
      },
      lastUpdatedBy: {
        select: { id: true, firstName: true, lastName: true, username: true }
      },
      clientChileanCompany: {
        select: { id: true, name: true, rut: true }
      },
      clientContactPerson: {
        select: { id: true, fullName: true, email: true }
      }
    }
  });
}

async function updateSeaQuote(id, quoteData, userId) {
  const snapshots = await createSnapshots(quoteData);
  
  // Create port snapshots if provided
  if (quoteData.originPortId) {
    const originPort = await prisma.port.findUnique({
      where: { id: quoteData.originPortId }
    });
    snapshots.originPortSnapshot = originPort;
  }
  
  if (quoteData.destinationPortId) {
    const destinationPort = await prisma.port.findUnique({
      where: { id: quoteData.destinationPortId }
    });
    snapshots.destinationPortSnapshot = destinationPort;
  }
  
  // Process cargo data
  const processedCargoData = await processCargoData(quoteData.cargoData);
  
  const updateData = {
    lastUpdatedById: userId,
  };
  
  // Only update provided fields
  if (quoteData.designatedVendorId !== undefined) updateData.designatedVendorId = quoteData.designatedVendorId;
  if (quoteData.designatedOperatorId !== undefined) updateData.designatedOperatorId = quoteData.designatedOperatorId;
  if (quoteData.clientType !== undefined) updateData.clientType = quoteData.clientType;
  if (quoteData.clientString !== undefined) updateData.clientString = quoteData.clientString;
  if (quoteData.clientChileanCompanyId !== undefined) updateData.clientChileanCompanyId = quoteData.clientChileanCompanyId;
  if (quoteData.clientContactPersonId !== undefined) updateData.clientContactPersonId = quoteData.clientContactPersonId;
  if (quoteData.validityDate !== undefined) updateData.validityDate = quoteData.validityDate ? new Date(quoteData.validityDate) : null;
  if (quoteData.localConditions !== undefined) updateData.localConditions = quoteData.localConditions;
  if (quoteData.localExpenses !== undefined) updateData.localExpenses = quoteData.localExpenses;
  if (quoteData.demurrageTime !== undefined) updateData.demurrageTime = quoteData.demurrageTime;
  if (quoteData.dthc !== undefined) updateData.dthc = quoteData.dthc;
  if (quoteData.appliedCurrency !== undefined) updateData.appliedCurrency = quoteData.appliedCurrency;
  if (quoteData.localOfficeData !== undefined) updateData.localOfficeData = quoteData.localOfficeData;
  if (quoteData.status !== undefined) updateData.status = quoteData.status;
  if (quoteData.cargoData !== undefined) updateData.cargoData = processedCargoData;
  
  // Update snapshots if new data provided
  Object.assign(updateData, snapshots);
  
  // Set approval date if status changes to approved
  if (quoteData.status === 'approved') {
    updateData.approvalDate = new Date();
  }
  
  return prisma.seaQuote.update({
    where: { id: parseInt(id) },
    data: updateData,
    include: {
      designatedVendor: {
        select: { id: true, firstName: true, lastName: true, username: true }
      },
      designatedOperator: {
        select: { id: true, firstName: true, lastName: true, username: true }
      },
      lastUpdatedBy: {
        select: { id: true, firstName: true, lastName: true, username: true }
      },
      clientChileanCompany: {
        select: { id: true, name: true, rut: true }
      },
      clientContactPerson: {
        select: { id: true, fullName: true, email: true }
      }
    }
  });
}

async function deleteSeaQuote(id) {
  await prisma.seaQuote.delete({
    where: { id: parseInt(id) }
  });
  return { message: "Sea quote deleted successfully" };
}

// Helper functions for dropdowns
async function getVendorUsers() {
  const vendors = await prisma.user.findMany({
    where: {
      active: true,
      roles: {
        some: {
          role: {
            name: 'Vendedor'
          }
        }
      }
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      username: true,
      profileColor: true
    }
  });
  return vendors;
}

async function getOperatorUsers() {
  const operators = await prisma.user.findMany({
    where: {
      active: true,
      roles: {
        some: {
          role: {
            name: 'Operador'
          }
        }
      }
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      username: true,
      profileColor: true
    }
  });
  return operators;
}

async function getDropdownData() {
  const [
    ports,
    incoterms,
    cargoTypes,
    currencies,
    containerTypes,
    packageTypes,
    chileanCompanies,
    contactPersons,
    vendors,
    operators
  ] = await Promise.all([
    prisma.port.findMany({
      select: { id: true, name: true, country: true }
    }),
    prisma.incoterm.findMany({
      select: { id: true, name: true }
    }),
    prisma.cargoType.findMany({
      select: { id: true, name: true }
    }),
    prisma.currency.findMany({
      select: { id: true, name: true, alias: true }
    }),
    prisma.containerType.findMany({
      select: { id: true, name: true }
    }),
    prisma.packageType.findMany({
      select: { id: true, name: true }
    }),
    prisma.chileanCompany.findMany({
      select: { id: true, name: true, rut: true }
    }),
    prisma.contactPerson.findMany({
      select: { id: true, fullName: true, email: true }
    }),
    getVendorUsers(),
    getOperatorUsers()
  ]);
  
  return {
    ports,
    incoterms,
    cargoTypes,
    currencies,
    containerTypes,
    packageTypes,
    chileanCompanies,
    contactPersons,
    vendors,
    operators
  };
}

// Placeholder functions for Air and Land quotes
async function createAirQuote(quoteData, userId) {
  // Placeholder implementation
  throw new Error("Air quotes not yet implemented");
}

async function getAirQuotes(options = {}) {
  // Placeholder implementation
  return { quotes: [], pagination: { page: 1, limit: 15, total: 0, totalPages: 0, hasNext: false, hasPrev: false } };
}

async function createLandQuote(quoteData, userId) {
  // Placeholder implementation
  throw new Error("Land quotes not yet implemented");
}

async function getLandQuotes(options = {}) {
  // Placeholder implementation
  return { quotes: [], pagination: { page: 1, limit: 15, total: 0, totalPages: 0, hasNext: false, hasPrev: false } };
}

module.exports = {
  // Sea quote operations
  createSeaQuote,
  getSeaQuotes,
  getSeaQuoteById,
  updateSeaQuote,
  deleteSeaQuote,
  
  // Air quote operations (placeholders)
  createAirQuote,
  getAirQuotes,
  
  // Land quote operations (placeholders)
  createLandQuote,
  getLandQuotes,
  
  // Helper functions
  getDropdownData,
  getVendorUsers,
  getOperatorUsers
};
